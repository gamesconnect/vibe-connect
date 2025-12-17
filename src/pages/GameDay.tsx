import { motion } from "framer-motion";
import { Clock, Trophy, Users, Calendar, MapPin, Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryPreview from "@/components/GalleryPreview";

const schedule = [
  { time: "2:00 PM", activity: "Arrival & Registration", description: "Check-in, get your team color, meet new friends" },
  { time: "2:30 PM", activity: "Team Formation", description: "Get sorted into Red, Yellow, Blue, or Green teams" },
  { time: "3:00 PM", activity: "Games Begin!", description: "Board games, video games, and team challenges" },
  { time: "5:30 PM", activity: "Refreshments Break", description: "Snacks, drinks, and networking time" },
  { time: "6:00 PM", activity: "Final Rounds", description: "Championship matches and bonus challenges" },
  { time: "7:00 PM", activity: "Awards Ceremony", description: "Prizes for winners, MVP recognition" },
];

const teams = [
  { name: "Team Red", color: "bg-primary", icon: "🔴", wins: 15 },
  { name: "Team Yellow", color: "bg-secondary", icon: "🟡", wins: 12 },
  { name: "Team Blue", color: "bg-brand-blue", icon: "🔵", wins: 14 },
  { name: "Team Green", color: "bg-brand-green", icon: "🟢", wins: 13 },
];

const GameDay = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-50" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-secondary/30 blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Gamepad2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Every First Saturday</span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Game Day</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              The ultimate monthly gaming experience at Nexus 9, East Legon. Board games, video games, team competitions, and unforgettable fun!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-5 h-5 text-primary" />
                <span>First Saturday of every month</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Nexus 9, East Legon</span>
              </div>
            </div>

            <div className="inline-block bg-card rounded-2xl p-6 border border-border">
              <span className="text-4xl font-display font-bold text-primary">GHS 50</span>
              <span className="text-muted-foreground">/person</span>
              <p className="text-sm text-muted-foreground mt-2">Includes entry, games & refreshments</p>
            </div>

            <div className="mt-8">
              <Button asChild variant="hero" size="xl">
                <Link to="/events">Register Now</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Colors */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Choose Your <span className="gradient-text">Team</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get assigned to one of our four legendary teams and compete for glory!
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teams.map((team, index) => (
              <motion.div
                key={team.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 text-center border border-border card-hover"
              >
                <div className={`w-20 h-20 ${team.color} rounded-full flex items-center justify-center mx-auto mb-4 text-4xl`}>
                  {team.icon}
                </div>
                <h3 className="font-display font-bold text-lg mb-1">{team.name}</h3>
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                  <Trophy className="w-4 h-4 text-secondary" />
                  <span>{team.wins} Wins</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Event <span className="gradient-text">Schedule</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Here's what a typical Game Day looks like
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto space-y-4">
            {schedule.map((item, index) => (
              <motion.div
                key={item.time}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 items-start bg-card rounded-xl p-6 border border-border"
              >
                <div className="flex-shrink-0 w-20">
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <Clock className="w-4 h-4" />
                    {item.time}
                  </div>
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg mb-1">{item.activity}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Past <span className="gradient-text">Game Days</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See the action from our previous events
            </p>
          </motion.div>

          <GalleryPreview />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-bg">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Join the Fun?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Don't miss the next Game Day! Register now and secure your spot.
            </p>
            <Button asChild size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Link to="/events">Register for Next Game Day</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GameDay;
