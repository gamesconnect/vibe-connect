import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { value: 50, suffix: "+", label: "Events Hosted" },
  { value: 2000, suffix: "+", label: "Happy Members" },
  { value: 15, suffix: "+", label: "Cities Visited" },
  { value: 100, suffix: "%", label: "Fun Guaranteed" },
];

const StatsCounter = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <section className="py-16 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          onViewportEnter={() => setIsVisible(true)}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-display text-4xl md:text-5xl font-bold gradient-text mb-2">
                {isVisible ? <Counter value={stat.value} /> : 0}
                {stat.suffix}
              </div>
              <p className="text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Counter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}</span>;
};

export default StatsCounter;
