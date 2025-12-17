import { motion } from "framer-motion";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
  image: string;
  category: string;
  maxCapacity?: number;
  spotsLeft?: number;
  status?: "upcoming" | "past";
}

interface EventCardProps {
  event: Event;
  index?: number;
}

const EventCard = ({ event, index = 0 }: EventCardProps) => {
  const categoryColors: Record<string, string> = {
    "game-day": "bg-primary",
    "trivia": "bg-secondary text-secondary-foreground",
    "travel": "bg-brand-blue",
    "party": "bg-brand-green",
    "default": "bg-muted text-foreground",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group bg-card rounded-2xl overflow-hidden shadow-card card-hover border border-border"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[event.category] || categoryColors.default} text-primary-foreground`}>
            {event.category.replace("-", " ").toUpperCase()}
          </span>
        </div>
        {event.spotsLeft && event.spotsLeft < 10 && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
              {event.spotsLeft} spots left!
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="font-display font-bold text-xl line-clamp-1">{event.title}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2">{event.description}</p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{event.location}</span>
          </div>
          {event.maxCapacity && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4 text-primary" />
              <span>{event.maxCapacity} max capacity</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <span className="text-2xl font-display font-bold text-primary">GHS {event.price}</span>
            <span className="text-sm text-muted-foreground">/person</span>
          </div>
          <Button asChild size="sm">
            <Link to={`/events/${event.id}`}>
              Register <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
