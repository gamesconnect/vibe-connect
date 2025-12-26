import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard, { Event } from "@/components/EventCard";
import { supabase } from "@/integrations/supabase/client";

const filters = ["All", "Upcoming", "Past", "Game Day", "Trivia", "Travel", "Party"];

const Events = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (error) throw error;

      return data.map((event) => ({
        id: event.id,
        title: event.title,
        description: event.description || "",
        date: new Date(event.date).toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        location: event.location || "",
        price: Number(event.price),
        image: event.image_url || "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
        category: event.category,
        maxCapacity: event.max_capacity || undefined,
        status: event.status as "upcoming" | "past",
      })) as Event[];
    },
  });

  const filteredEvents = events.filter((event) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Upcoming") return event.status !== "past";
    if (activeFilter === "Past") return event.status === "past";
    return event.category === activeFilter.toLowerCase().replace(" ", "-");
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-50" />
        <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-secondary/20 blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Events</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover upcoming events and buy your tickets!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 bg-background/80 backdrop-blur-lg border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No events found for this filter.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;
