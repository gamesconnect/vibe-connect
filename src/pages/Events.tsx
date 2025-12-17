import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard, { Event } from "@/components/EventCard";

const allEvents: Event[] = [
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
    title: "Trivia Friday: Pop Culture",
    description: "Test your knowledge on movies, music, and trending topics. Amazing prizes to be won!",
    date: "Fri, Jan 31, 2025",
    location: "Virtual (Zoom)",
    price: 10,
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&h=400&fit=crop",
    category: "trivia",
  },
  {
    id: "3",
    title: "Cape Coast Adventure Trip",
    description: "Explore the historic Cape Coast Castle, enjoy beach vibes, and create unforgettable memories.",
    date: "Feb 14-16, 2025",
    location: "Cape Coast",
    price: 800,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    category: "travel",
    spotsLeft: 12,
  },
  {
    id: "4",
    title: "Valentine's Day Party",
    description: "Celebrate love and friendship with good music, great vibes, and amazing people.",
    date: "Fri, Feb 14, 2025",
    location: "The View Bar, Osu",
    price: 100,
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop",
    category: "party",
  },
  {
    id: "5",
    title: "Game Day: January Recap",
    description: "Our biggest game day yet with over 100 participants. Check out the highlights!",
    date: "Sat, Jan 4, 2025",
    location: "Nexus 9, East Legon",
    price: 50,
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&h=400&fit=crop",
    category: "game-day",
    status: "past",
  },
  {
    id: "6",
    title: "Trivia Friday: Sports Edition",
    description: "Sports fans united! Test your knowledge on football, basketball, and more.",
    date: "Fri, Feb 7, 2025",
    location: "Virtual (Zoom)",
    price: 10,
    image: "https://images.unsplash.com/photo-1461896836934- voices-537b1b9db5b?w=600&h=400&fit=crop",
    category: "trivia",
  },
];

const filters = ["All", "Upcoming", "Past", "Game Day", "Trivia", "Travel", "Party"];

const Events = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredEvents = allEvents.filter((event) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Upcoming") return !event.status || event.status !== "past";
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
              Discover upcoming events and register to join the fun!
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
          {filteredEvents.length > 0 ? (
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
