import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle, Phone, User, Mail, Palette } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PaymentFormProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  eventPrice: number;
  eventId?: string;
  type: "event" | "trivia" | "travel";
}

const teamColors = [
  { name: "Red", color: "bg-primary", border: "border-primary" },
  { name: "Yellow", color: "bg-secondary", border: "border-secondary" },
  { name: "Blue", color: "bg-brand-blue", border: "border-brand-blue" },
  { name: "Green", color: "bg-brand-green", border: "border-brand-green" },
];

const networks = [
  { id: "mtn", name: "MTN Mobile Money", color: "bg-yellow-400" },
  { id: "vodafone", name: "Vodafone Cash", color: "bg-red-600" },
  { id: "airteltigo", name: "AirtelTigo Money", color: "bg-blue-600" },
];

const PaymentForm = ({ isOpen, onClose, eventTitle, eventPrice, eventId, type }: PaymentFormProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState<"form" | "payment" | "success">("form");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    teamColor: "",
    network: "mtn",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.phone.match(/^0[235][0-9]{8}$/)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid Ghana phone number (e.g., 0599975352).",
        variant: "destructive",
      });
      return;
    }

    setStep("payment");
  };

  const processPayment = async () => {
    setLoading(true);

    try {
      // Format phone number to international format
      const phoneNumber = "233" + formData.phone.substring(1);

      // First, create the registration record
      let registrationId: string | undefined;

      if (type === "event") {
        // Only include event_id if it's a valid UUID (not a sample/hardcoded ID)
        const isValidUUID = eventId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(eventId);
        
        const { data, error } = await supabase
          .from("registrations")
          .insert({
            event_id: isValidUUID ? eventId : null,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            team_color: formData.teamColor,
            payment_status: "pending",
            amount_paid: 0,
          })
          .select("id")
          .single();

        if (error) throw error;
        registrationId = data.id;
      } else if (type === "trivia") {
        const { data, error } = await supabase
          .from("trivia_signups")
          .insert({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            payment_status: "pending",
            amount_paid: 0,
          })
          .select("id")
          .single();

        if (error) throw error;
        registrationId = data.id;
      }

      // Call the payment edge function
      const { data, error } = await supabase.functions.invoke("process-payment", {
        body: {
          accountNumber: phoneNumber,
          amount: eventPrice.toString(),
          narration: `Ticket for ${eventTitle}`,
          network: formData.network,
          email: formData.email,
          metadata: {
            type: type === "event" ? "registration" : type,
            registration_id: type === "event" ? registrationId : undefined,
            signup_id: type === "trivia" ? registrationId : undefined,
          },
        },
      });

      if (error) throw error;

      if (data.success) {
        setStep("success");
        toast({
          title: "Payment Successful!",
          description: `Your ticket for ${eventTitle} has been confirmed.`,
        });
      } else {
        throw new Error(data.message || "Payment failed");
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep("form");
    setFormData({
      name: "",
      email: "",
      phone: "",
      teamColor: "",
      network: "mtn",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-card rounded-2xl shadow-xl border border-border w-full max-w-md overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="font-display font-bold text-xl">Buy Ticket</h2>
              <p className="text-sm text-muted-foreground">{eventTitle}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {step === "form" && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Mensah"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    Phone Number (Mobile Money)
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="0599975352"
                    required
                  />
                </div>

                {type === "event" && (
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Palette className="w-4 h-4 text-primary" />
                      Team Color Preference
                    </Label>
                    <div className="grid grid-cols-4 gap-2">
                      {teamColors.map((team) => (
                        <button
                          key={team.name}
                          type="button"
                          onClick={() => setFormData({ ...formData, teamColor: team.name })}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            formData.teamColor === team.name
                              ? team.border
                              : "border-border"
                          }`}
                        >
                          <div className={`w-6 h-6 ${team.color} rounded-full mx-auto`} />
                          <span className="text-xs mt-1 block">{team.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-muted-foreground">Total Amount</span>
                    <span className="font-display font-bold text-2xl text-primary">
                      GHS {eventPrice}
                    </span>
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    Continue to Payment
                  </Button>
                </div>
              </form>
            )}

            {step === "payment" && (
              <div className="space-y-5">
                <div className="text-center mb-6">
                  <p className="text-muted-foreground mb-2">Select Payment Network</p>
                  <p className="font-display font-bold text-2xl text-primary">
                    GHS {eventPrice}
                  </p>
                </div>

                <div className="space-y-3">
                  {networks.map((network) => (
                    <button
                      key={network.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, network: network.id })}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                        formData.network === network.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className={`w-10 h-10 ${network.color} rounded-full`} />
                      <span className="font-medium">{network.name}</span>
                    </button>
                  ))}
                </div>

                <div className="bg-muted rounded-xl p-4 text-sm text-muted-foreground">
                  <p>📱 You will receive a payment prompt on <strong>{formData.phone}</strong></p>
                  <p className="mt-2">Please approve the transaction to complete your purchase.</p>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep("form")}
                    className="flex-1"
                    disabled={loading}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={processPayment}
                    className="flex-1"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Pay GHS ${eventPrice}`
                    )}
                  </Button>
                </div>
              </div>
            )}

            {step === "success" && (
              <div className="text-center py-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                >
                  <CheckCircle className="w-20 h-20 text-brand-green mx-auto mb-4" />
                </motion.div>
                <h3 className="font-display font-bold text-2xl mb-2">Ticket Confirmed!</h3>
                <p className="text-muted-foreground mb-6">
                  Thank you, {formData.name}! Your ticket for {eventTitle} has been confirmed. Check your email for details.
                </p>
                <Button onClick={resetForm} className="w-full">
                  Done
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaymentForm;
