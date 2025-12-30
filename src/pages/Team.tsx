import { motion } from "framer-motion";
import { Trophy, Flame, Target, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamLeaderboard from "@/components/TeamLeaderboard";

const teams = [
  {
    name: "Team Red",
    color: "bg-red-500",
    borderColor: "border-red-500",
    textColor: "text-red-500",
    bgLight: "bg-red-500/10",
    motto: "Burn Bright, Win Right",
    description: "The fiery competitors who bring passion and intensity to every game. Known for their aggressive strategies and never-give-up attitude.",
    icon: Flame,
  },
  {
    name: "Team Blue",
    color: "bg-blue-500",
    borderColor: "border-blue-500",
    textColor: "text-blue-500",
    bgLight: "bg-blue-500/10",
    motto: "Cool Minds, Swift Wins",
    description: "The strategic masterminds who think three steps ahead. Their calm demeanor hides a fierce competitive spirit.",
    icon: Target,
  },
  {
    name: "Team Yellow",
    color: "bg-yellow-500",
    borderColor: "border-yellow-500",
    textColor: "text-yellow-500",
    bgLight: "bg-yellow-500/10",
    motto: "Shine Together, Win Forever",
    description: "The optimistic crew that brings energy and positivity to every event. Their teamwork is legendary.",
    icon: Users,
  },
  {
    name: "Team Green",
    color: "bg-green-500",
    borderColor: "border-green-500",
    textColor: "text-green-500",
    bgLight: "bg-green-500/10",
    motto: "Grow Strong, Last Long",
    description: "The underdogs who always surprise. Known for their resilience and ability to come back from any deficit.",
    icon: TrendingUp,
  },
];

const Team = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-50" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-red-500/20 blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-yellow-500/20 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-green-500/20 blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            {/* Team Colors Preview */}
            <div className="flex justify-center gap-3 mb-8">
              <div className="w-6 h-6 rounded-full bg-red-500 animate-bounce-subtle" style={{ animationDelay: "0s" }} />
              <div className="w-6 h-6 rounded-full bg-blue-500 animate-bounce-subtle" style={{ animationDelay: "0.1s" }} />
              <div className="w-6 h-6 rounded-full bg-yellow-500 animate-bounce-subtle" style={{ animationDelay: "0.2s" }} />
              <div className="w-6 h-6 rounded-full bg-green-500 animate-bounce-subtle" style={{ animationDelay: "0.3s" }} />
            </div>

            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              Choose Your <span className="gradient-text">Team</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              At every Game Day, members are divided into four competitive teams. Pick your colors, build your legacy, and fight for glory!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Live Leaderboard */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Trophy className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Season Standings</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Live <span className="gradient-text">Leaderboard</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Track your team's progress throughout the season. Points are updated after every Game Day!
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <TeamLeaderboard />
          </div>
        </div>
      </section>

      {/* Teams Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Meet the <span className="gradient-text">Teams</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each team has its own identity, strategy, and spirit. Which one will you join?
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teams.map((team, index) => (
              <motion.div
                key={team.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`relative p-8 rounded-3xl border-2 ${team.borderColor} ${team.bgLight} overflow-hidden group`}
              >
                {/* Background glow */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 ${team.color} opacity-20 blur-3xl group-hover:opacity-30 transition-opacity`} />

                <div className="relative z-10">
                  {/* Team Icon & Name */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-16 h-16 ${team.color} rounded-2xl flex items-center justify-center`}>
                      <team.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className={`font-display text-2xl font-bold ${team.textColor}`}>{team.name}</h3>
                      <p className="text-muted-foreground text-sm italic">"{team.motto}"</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground">{team.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              How Teams <span className="gradient-text">Work</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every Game Day is a battle for supremacy between our four teams.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { step: "01", title: "Pick Your Team", description: "Choose your team color when you buy tickets. Your loyalty builds your team's strength!" },
              { step: "02", title: "Compete Together", description: "Join your teammates in various games and challenges throughout the event." },
              { step: "03", title: "Earn Points", description: "Every win adds to your team's score. The team with the most points wins the season!" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center p-6 bg-card rounded-2xl border border-border"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-display font-bold text-primary">{item.step}</span>
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ready to <span className="gradient-text">Compete?</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Join our next Game Day, pick your team, and show everyone what you're made of!
            </p>
            <Button asChild size="lg">
              <Link to="/game-day">Register for Game Day</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;
