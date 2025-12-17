import { motion } from "framer-motion";
import { Brain, Trophy, Calendar, Clock, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const howItWorks = [
  {
    step: 1,
    title: "Register & Pay",
    description: "Sign up and pay GHS 10 entry fee to secure your spot",
    icon: Users,
  },
  {
    step: 2,
    title: "Join the Session",
    description: "We'll send you the Zoom link before the event",
    icon: Clock,
  },
  {
    step: 3,
    title: "Compete & Win",
    description: "Answer questions, rack up points, and win prizes!",
    icon: Trophy,
  },
];

const upcomingThemes = [
  { date: "Jan 31", theme: "Pop Culture", emoji: "🎬" },
  { date: "Feb 7", theme: "Sports Mania", emoji: "⚽" },
  { date: "Feb 14", theme: "Love Edition", emoji: "💕" },
  { date: "Feb 21", theme: "Science & Tech", emoji: "🔬" },
];

const leaderboard = [
  { rank: 1, name: "Kofi Quiz Master", wins: 8, points: 450 },
  { rank: 2, name: "Ama Brainiac", wins: 6, points: 380 },
  { rank: 3, name: "Kwame Trivia King", wins: 5, points: 340 },
  { rank: 4, name: "Efua Smart", wins: 5, points: 320 },
  { rank: 5, name: "Yaw Scholar", wins: 4, points: 290 },
];

const Trivia = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-50" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-secondary/30 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-brand-blue/30 blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 mb-8">
              <Brain className="w-4 h-4 text-secondary-foreground" />
              <span className="text-sm font-medium">Every Friday Night</span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Trivia Friday</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Put your knowledge to the test in our weekly virtual trivia night! Compete, learn, and win amazing prizes from the comfort of your home.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-5 h-5 text-secondary" />
                <span>Every Friday at 8 PM</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Zap className="w-5 h-5 text-secondary" />
                <span>Virtual via Zoom</span>
              </div>
            </div>

            <div className="inline-block bg-card rounded-2xl p-6 border border-border">
              <span className="text-4xl font-display font-bold text-primary">GHS 10</span>
              <span className="text-muted-foreground">/person</span>
              <p className="text-sm text-muted-foreground mt-2">Individual or team entry</p>
            </div>

            <div className="mt-8">
              <Button asChild variant="yellow" size="xl">
                <Link to="/events">Join This Friday</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Themes */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Upcoming <span className="gradient-text">Themes</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each week brings a new exciting theme!
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {upcomingThemes.map((item, index) => (
              <motion.div
                key={item.date}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-card rounded-2xl p-6 text-center border border-border card-hover ${index === 0 ? "ring-2 ring-primary" : ""}`}
              >
                {index === 0 && (
                  <span className="text-xs font-semibold text-primary mb-2 block">NEXT UP</span>
                )}
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="font-display font-bold text-lg mb-1">{item.theme}</h3>
                <p className="text-sm text-muted-foreground">{item.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Getting started is easy!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {howItWorks.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative">
                  <div className="w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-10 h-10 text-secondary-foreground" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Leaderboard</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our top trivia champions this season
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              {leaderboard.map((player, index) => (
                <motion.div
                  key={player.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-4 p-4 ${index !== leaderboard.length - 1 ? "border-b border-border" : ""}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    player.rank === 1 ? "bg-secondary text-secondary-foreground" :
                    player.rank === 2 ? "bg-muted-foreground/20 text-foreground" :
                    player.rank === 3 ? "bg-primary/20 text-primary" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {player.rank === 1 ? "🥇" : player.rank === 2 ? "🥈" : player.rank === 3 ? "🥉" : player.rank}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{player.name}</h4>
                    <p className="text-sm text-muted-foreground">{player.wins} wins</p>
                  </div>
                  <div className="text-right">
                    <span className="font-display font-bold text-lg gradient-text">{player.points}</span>
                    <span className="text-sm text-muted-foreground"> pts</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">
              Think You're Smart?
            </h2>
            <p className="text-secondary-foreground/80 mb-8 max-w-xl mx-auto">
              Prove it this Friday! Join hundreds of trivia enthusiasts and compete for amazing prizes.
            </p>
            <Button asChild size="xl" className="bg-foreground text-background hover:bg-foreground/90">
              <Link to="/events">Register for Trivia Friday</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Trivia;
