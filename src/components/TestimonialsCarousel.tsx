import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    name: "Kofi Mensah",
    role: "Game Day Regular",
    content: "Games & Connect has changed how I spend my weekends. The energy at Game Day is unmatched, and I've made lifelong friends here!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Ama Serwaa",
    role: "Travel Enthusiast",
    content: "The Cape Coast trip was incredible! Everything was well-organized, and the vibes were amazing. Can't wait for the next adventure.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Kwame Asante",
    role: "Trivia Champion",
    content: "Trivia Fridays are my stress relief after a long week. It's fun, competitive, and the prizes are always great!",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Efua Owusu",
    role: "Community Member",
    content: "Being part of this community feels like having a second family. The events bring people together in such a special way.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
];

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="gradient-text">Community</span> Says
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our amazing community members have to say about their experiences.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-3xl p-8 md:p-12 shadow-card border border-border"
          >
            <Quote className="w-12 h-12 text-primary/20 mb-6" />
            <p className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
              "{testimonials[currentIndex].content}"
            </p>
            <div className="flex items-center gap-4">
              <img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-14 h-14 rounded-full object-cover border-2 border-primary"
              />
              <div>
                <h4 className="font-display font-bold">{testimonials[currentIndex].name}</h4>
                <p className="text-sm text-muted-foreground">{testimonials[currentIndex].role}</p>
              </div>
            </div>
          </motion.div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
