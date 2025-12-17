import { motion } from "framer-motion";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  color: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Emmanuel Addo",
    role: "Founder & Lead",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    color: "border-primary",
  },
  {
    name: "Adwoa Boateng",
    role: "Events Manager",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
    color: "border-secondary",
  },
  {
    name: "Kelvin Owusu",
    role: "Travel Coordinator",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
    color: "border-brand-blue",
  },
  {
    name: "Nana Ama",
    role: "Community Manager",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    color: "border-brand-green",
  },
];

const TeamGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {teamMembers.map((member, index) => (
        <motion.div
          key={member.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="text-center group"
        >
          <div className={`relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 ${member.color} transition-transform duration-300 group-hover:scale-105`}>
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h4 className="font-display font-bold text-lg">{member.name}</h4>
          <p className="text-muted-foreground text-sm">{member.role}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default TeamGrid;
