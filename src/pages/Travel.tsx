import { motion } from "framer-motion";
import { Plane, Calendar, MapPin, Users, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const trips = [
  {
    id: "1",
    destination: "Cape Coast",
    tagline: "History & Beaches",
    dates: "Feb 14-16, 2025",
    price: 800,
    deposit: 400,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    spots: 20,
    spotsLeft: 12,
    inclusions: ["Transport", "Accommodation", "Meals", "Castle Tour", "Beach Access"],
  },
  {
    id: "2",
    destination: "Kumasi",
    tagline: "Culture & Heritage",
    dates: "Mar 7-9, 2025",
    price: 650,
    deposit: 325,
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop",
    spots: 25,
    spotsLeft: 18,
    inclusions: ["Transport", "Accommodation", "Meals", "Palace Tour", "Market Visit"],
  },
  {
    id: "3",
    destination: "Ada Foah",
    tagline: "River & Adventure",
    dates: "Mar 21-23, 2025",
    price: 550,
    deposit: 275,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
    spots: 30,
    spotsLeft: 25,
    inclusions: ["Transport", "Accommodation", "Meals", "Boat Cruise", "Water Sports"],
  },
];

const Travel = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-50" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-brand-blue/30 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-brand-green/30 blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/20 border border-brand-blue/30 mb-8">
              <Plane className="w-4 h-4 text-brand-blue" />
              <span className="text-sm font-medium">Adventure Awaits</span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Travel Adventures</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Explore Ghana with us! Curated group trips to amazing destinations with great company and unforgettable memories.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trips Grid */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Upcoming <span className="gradient-text">Trips</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Book your next adventure! Deposit secures your spot.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-3xl overflow-hidden border border-border card-hover"
              >
                {/* Image */}
                <div className="relative h-56">
                  <img
                    src={trip.image}
                    alt={trip.destination}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="font-display text-2xl font-bold text-primary-foreground">{trip.destination}</h3>
                    <p className="text-primary-foreground/80">{trip.tagline}</p>
                  </div>
                  {trip.spotsLeft < 15 && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-primary rounded-full text-xs font-semibold text-primary-foreground">
                      {trip.spotsLeft} spots left!
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-brand-blue" />
                      {trip.dates}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-brand-blue" />
                      {trip.spots} spots
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">What's Included:</h4>
                    <div className="flex flex-wrap gap-2">
                      {trip.inclusions.map((item) => (
                        <span key={item} className="inline-flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-full">
                          <Check className="w-3 h-3 text-brand-green" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between items-end mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Full Price</p>
                        <span className="text-2xl font-display font-bold text-primary">GHS {trip.price}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Deposit</p>
                        <span className="text-lg font-semibold">GHS {trip.deposit}</span>
                      </div>
                    </div>
                    <Button asChild className="w-full" variant="blue">
                      <Link to={`/travel/${trip.id}`}>
                        Book Now <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Travel With Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Why Travel <span className="gradient-text">With Us?</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "All-Inclusive Packages",
                description: "Transport, accommodation, meals, and activities all covered. Just show up!",
                icon: "📦",
              },
              {
                title: "Flexible Payments",
                description: "Pay 50% deposit to secure your spot, balance before the trip.",
                icon: "💳",
              },
              {
                title: "Amazing Company",
                description: "Travel with like-minded young people who love adventure.",
                icon: "👫",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-display font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-blue">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready for Your Next Adventure?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Don't miss out! Spots fill up fast. Book your trip today.
            </p>
            <Button asChild size="xl" className="bg-primary-foreground text-brand-blue hover:bg-primary-foreground/90">
              <Link to="/contact">Contact Us for Custom Trips</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Travel;
