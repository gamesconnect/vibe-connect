import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PaymentRequest {
  accountNumber: string;
  amount: string;
  narration: string;
  network: string;
  email: string;
  metadata?: {
    type: string;
    registration_id?: string;
    booking_id?: string;
    signup_id?: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const paymentData: PaymentRequest = await req.json();
    
    console.log("Processing payment request:", {
      accountNumber: paymentData.accountNumber,
      amount: paymentData.amount,
      network: paymentData.network,
      narration: paymentData.narration
    });

    // Call the payment API
    const paymentResponse = await fetch("http://54.86.149.215/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Partner-Code": Deno.env.get("DCM_PARTNER_CODE") || "MSH",
      },
      body: JSON.stringify({
        accountNumber: paymentData.accountNumber,
        amount: paymentData.amount,
        narration: paymentData.narration,
        network: paymentData.network,
      }),
    });

    const paymentResult = await paymentResponse.json();
    console.log("Payment API response:", paymentResult);

    // Determine payment status from API response
    // The API returns success:true when initiated, but status can be:
    // - "failed" with collection status "200" = payment pending (awaiting user approval on phone)
    // - actual failure would have different indicators
    const collectionStatus = paymentResult.data?.collection?.message?.status;
    const collectionDescription = paymentResult.data?.collection?.message?.description;
    
    // Payment is pending if collection was initiated successfully
    const paymentPending = collectionStatus === "200" && collectionDescription?.includes("Awaiting processing");
    // Payment is successful if the API explicitly says so without pending indicators
    const paymentSuccessful = paymentResult.success === true && paymentResult.status !== "failed";
    
    console.log("Payment status - pending:", paymentPending, "successful:", paymentSuccessful);

    // Generate a reference
    const reference = `GC-${Date.now()}-${Math.random().toString(36).substring(7)}`;

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Determine final status
    const finalStatus = paymentSuccessful ? "completed" : (paymentPending ? "pending" : "failed");

    // Log the payment transaction
    const { error: paymentLogError } = await supabase.from("payments").insert({
      reference,
      email: paymentData.email,
      amount: parseFloat(paymentData.amount),
      status: finalStatus,
      metadata: {
        ...paymentData.metadata,
        api_response: paymentResult,
        network: paymentData.network,
        account_number: paymentData.accountNumber,
      },
    });

    if (paymentLogError) {
      console.error("Error logging payment:", paymentLogError);
    }

    // Update the relevant table based on payment type (for pending or successful payments)
    if ((paymentSuccessful || paymentPending) && paymentData.metadata) {
      const { type, registration_id, booking_id, signup_id } = paymentData.metadata;
      const updateStatus = paymentSuccessful ? "completed" : "pending";
      
      if (type === "registration" && registration_id) {
        await supabase
          .from("registrations")
          .update({
            payment_status: updateStatus,
            payment_reference: reference,
            amount_paid: parseFloat(paymentData.amount),
            verified: paymentSuccessful,
          })
          .eq("id", registration_id);
      } else if (type === "booking" && booking_id) {
        await supabase
          .from("travel_bookings")
          .update({
            payment_status: updateStatus,
            payment_reference: reference,
            amount_paid: parseFloat(paymentData.amount),
            verified: paymentSuccessful,
          })
          .eq("id", booking_id);
      } else if (type === "trivia" && signup_id) {
        await supabase
          .from("trivia_signups")
          .update({
            payment_status: updateStatus,
            payment_reference: reference,
            amount_paid: parseFloat(paymentData.amount),
            verified: paymentSuccessful,
          })
          .eq("id", signup_id);
      }
    }

    // For pending payments, return success so the UI shows pending state
    const responseSuccess = paymentSuccessful || paymentPending;
    let message = "Payment failed";
    if (paymentSuccessful) {
      message = "Payment processed successfully";
    } else if (paymentPending) {
      message = "Payment initiated - please check your phone and approve the payment prompt";
    }

    return new Response(
      JSON.stringify({
        success: responseSuccess,
        pending: paymentPending,
        reference,
        message,
        data: paymentResult,
      }),
      {
        status: responseSuccess ? 200 : 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in process-payment function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
