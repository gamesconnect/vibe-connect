import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Gamepad2, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard, { Event } from "@/components/EventCard";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import NewsletterSignup from "@/components/NewsletterSignup";
import StatsCounter from "@/components/StatsCounter";

const upcomingEvents: Event[] = [
  {
    id: "1",
    title: "Game Day: February Edition",
    description: "Join us for our monthly game day extravaganza! Board games, video games, and team competitions await.",
    date: "Sat, Feb 1, 2025",
    location: "Nexus 9, East Legon",
    price: 50,
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
    category: "game-day",
    spotsLeft: 8,
  },
  {
    id: "2",
    title: "Community Hangout",
    description: "A casual meetup for members to connect, network, and have fun together.",
    date: "Fri, Jan 31, 2025",
    location: "Accra Mall",
    price: 20,
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&h=400&fit=crop",
    category: "event",
  },
  {
    id: "3",
    title: "Game Day: March Edition",
    description: "Another exciting game day with new games and challenges. Don't miss out!",
    date: "Sat, Mar 1, 2025",
    location: "Nexus 9, East Legon",
    price: 50,
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop",
    category: "game-day",
    spotsLeft: 15,
  },
];

const features = [
  {
    icon: Gamepad2,
    title: "Game Day",
    description: "Monthly board games and team competitions every first Saturday",
    color: "bg-primary",
    link: "/game-day",
  },
  {
    icon: Calendar,
    title: "Special Events",
    description: "Holiday parties, themed events, and community gatherings",
    color: "bg-secondary",
    link: "/events",
  },
  {
    icon: Users,
    title: "Our Team",
    description: "Meet the passionate people behind Games & Connect",
    color: "bg-brand-blue",
    link: "/team",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-pattern opacity-50" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand-blue/10 blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Ghana's Premier Youth Community</span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="block">Vibes</span>
              <span className="gradient-text">• Games •</span>
              <span className="block">Travel • Community</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join Ghana's most exciting youth community. Games, adventures, and connections that last a lifetime.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="xl">
                <Link to="/events">
                  Explore Events <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="hero-outline" size="xl">
                <Link to="/team">Meet the Teams</Link>
              </Button>
            </div>

            {/* Team Colors Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex justify-center gap-3 mt-12"
            >
              <div className="w-4 h-4 rounded-full bg-primary animate-bounce-subtle" style={{ animationDelay: "0s" }} />
              <div className="w-4 h-4 rounded-full bg-secondary animate-bounce-subtle" style={{ animationDelay: "0.1s" }} />
              <div className="w-4 h-4 rounded-full bg-brand-blue animate-bounce-subtle" style={{ animationDelay: "0.2s" }} />
              <div className="w-4 h-4 rounded-full bg-brand-green animate-bounce-subtle" style={{ animationDelay: "0.3s" }} />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              What We <span className="gradient-text">Offer</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From competitive game nights to adventure travels, we've got something for everyone.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link
                  to={feature.link}
                  className="block p-6 bg-card rounded-2xl border border-border card-hover h-full"
                >
                  <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-4`}>
                    <feature.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsCounter />

      {/* Upcoming Events */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12"
          >
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
                Upcoming <span className="gradient-text">Events</span>
              </h2>
              <p className="text-muted-foreground">Don't miss out on the fun. Register early!</p>
            </div>
            <Button asChild variant="outline">
              <Link to="/events">
                View All Events <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>
      </section>


      {/* Testimonials */}
      <TestimonialsCarousel />

      {/* Newsletter */}
      <NewsletterSignup />

      <Footer />
    </div>
  );
};

export default Index;
