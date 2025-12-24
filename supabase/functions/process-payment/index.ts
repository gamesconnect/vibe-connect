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

    // Generate a reference
    const reference = `GC-${Date.now()}-${Math.random().toString(36).substring(7)}`;

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Log the payment transaction
    const { error: paymentLogError } = await supabase.from("payments").insert({
      reference,
      email: paymentData.email,
      amount: parseFloat(paymentData.amount),
      status: paymentResponse.ok ? "completed" : "failed",
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

    // Update the relevant table based on payment type
    if (paymentResponse.ok && paymentData.metadata) {
      const { type, registration_id, booking_id, signup_id } = paymentData.metadata;
      
      if (type === "registration" && registration_id) {
        await supabase
          .from("registrations")
          .update({
            payment_status: "completed",
            payment_reference: reference,
            amount_paid: parseFloat(paymentData.amount),
            verified: true,
          })
          .eq("id", registration_id);
      } else if (type === "booking" && booking_id) {
        await supabase
          .from("travel_bookings")
          .update({
            payment_status: "completed",
            payment_reference: reference,
            amount_paid: parseFloat(paymentData.amount),
            verified: true,
          })
          .eq("id", booking_id);
      } else if (type === "trivia" && signup_id) {
        await supabase
          .from("trivia_signups")
          .update({
            payment_status: "completed",
            payment_reference: reference,
            amount_paid: parseFloat(paymentData.amount),
            verified: true,
          })
          .eq("id", signup_id);
      }
    }

    return new Response(
      JSON.stringify({
        success: paymentResponse.ok,
        reference,
        message: paymentResponse.ok ? "Payment processed successfully" : "Payment failed",
        data: paymentResult,
      }),
      {
        status: paymentResponse.ok ? 200 : 400,
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
