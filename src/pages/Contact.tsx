import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare, Instagram, Facebook, Send, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [volunteerData, setVolunteerData] = useState({ name: "", email: "", phone: "", skills: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast({
      title: "Message Sent! 📬",
      description: "We'll get back to you as soon as possible.",
    });
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast({
      title: "Application Received! 🎉",
      description: "Thanks for wanting to volunteer! We'll be in touch soon.",
    });
    setVolunteerData({ name: "", email: "", phone: "", skills: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-50" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-brand-green/20 blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Have questions? Want to join the community? We'd love to hear from you!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info + WhatsApp CTA */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Mail, label: "Email", value: "hello@gamesandconnect.com" },
              { icon: Phone, label: "Phone", value: "+233 XX XXX XXXX" },
              { icon: MapPin, label: "Location", value: "Accra, Ghana" },
              { icon: MessageSquare, label: "WhatsApp", value: "Join Community", isButton: true },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 text-center border border-border"
              >
                <div className="w-12 h-12 bg-brand-green rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-1">{item.label}</h3>
                {item.isButton ? (
                  <a
                    href="https://wa.me/233XXXXXXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-muted-foreground text-sm">{item.value}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Big CTA */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.a
            href="https://wa.me/233XXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="block bg-brand-green rounded-3xl p-8 md:p-12 text-center hover:bg-brand-green/90 transition-colors"
          >
            <MessageSquare className="w-16 h-16 text-primary-foreground mx-auto mb-4" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
              Join Our WhatsApp Community
            </h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto">
              Get instant updates, connect with members, and never miss an event. Click to join!
            </p>
          </motion.a>
        </div>
      </section>

      {/* Forms Grid */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-3xl p-8 border border-border"
            >
              <h2 className="font-display text-2xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help?"
                    rows={4}
                    required
                  />
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </motion.div>

            {/* Volunteer Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-3xl p-8 border border-border"
            >
              <div className="flex items-center gap-2 mb-6">
                <Heart className="w-6 h-6 text-primary" />
                <h2 className="font-display text-2xl font-bold">Volunteer With Us</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Want to help make our events amazing? Join our volunteer team!
              </p>
              <form onSubmit={handleVolunteerSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Name</label>
                  <Input
                    value={volunteerData.name}
                    onChange={(e) => setVolunteerData({ ...volunteerData, name: e.target.value })}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input
                    type="email"
                    value={volunteerData.email}
                    onChange={(e) => setVolunteerData({ ...volunteerData, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Phone</label>
                  <Input
                    value={volunteerData.phone}
                    onChange={(e) => setVolunteerData({ ...volunteerData, phone: e.target.value })}
                    placeholder="+233 XX XXX XXXX"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Skills & Interests</label>
                  <Textarea
                    value={volunteerData.skills}
                    onChange={(e) => setVolunteerData({ ...volunteerData, skills: e.target.value })}
                    placeholder="Tell us about your skills and what areas you'd like to help with"
                    rows={3}
                    required
                  />
                </div>
                <Button type="submit" disabled={isSubmitting} variant="green" className="w-full">
                  {isSubmitting ? "Submitting..." : "Apply to Volunteer"}
                  <Heart className="w-4 h-4" />
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-bold mb-6">Follow Us</h2>
          <div className="flex justify-center gap-4">
            {[
              { icon: Instagram, href: "https://instagram.com", label: "Instagram", color: "bg-gradient-to-br from-purple-500 to-pink-500" },
              { icon: Facebook, href: "https://facebook.com", label: "Facebook", color: "bg-brand-blue" },
              { icon: MessageSquare, href: "https://wa.me/233XXXXXXXXX", label: "WhatsApp", color: "bg-brand-green" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-14 h-14 ${social.color} rounded-2xl flex items-center justify-center text-primary-foreground hover:scale-110 transition-transform`}
              >
                <social.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
