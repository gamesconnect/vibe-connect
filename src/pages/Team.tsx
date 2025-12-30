import { motion } from "framer-motion";
import { Users, Heart, Target, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamGrid from "@/components/TeamGrid";

const values = [
  {
    icon: Heart,
    title: "Community First",
    description: "We believe in creating genuine connections and fostering a supportive environment for all members.",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "We strive to deliver exceptional experiences in everything we do, from events to adventures.",
  },
  {
    icon: Users,
    title: "Inclusivity",
    description: "Everyone is welcome here. We celebrate diversity and create spaces where all can thrive.",
  },
  {
    icon: Sparkles,
    title: "Fun & Creativity",
    description: "Life is meant to be enjoyed. We bring creativity and excitement to every gathering.",
  },
];

const Team = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-50" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-secondary/20 blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              Meet Our <span className="gradient-text">Team</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              The passionate individuals behind Games & Connect who work tirelessly to create unforgettable experiences for our community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Leadership <span className="gradient-text">Team</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the dedicated team that makes the magic happen.
            </p>
          </motion.div>

          <TeamGrid />
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="p-6 bg-card rounded-2xl border border-border text-center"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-bold text-xl mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join the Team CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Want to <span className="gradient-text">Join Us?</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              We're always looking for passionate individuals to join our team. If you love building community and creating memorable experiences, we'd love to hear from you.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;
