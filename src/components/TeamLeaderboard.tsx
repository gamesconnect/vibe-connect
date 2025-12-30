import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, TrendingUp, Flame, Target, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface TeamScore {
  id: string;
  team_color: string;
  wins: number;
  points: number;
  games_played: number;
}

const teamConfig: Record<string, { color: string; bgLight: string; textColor: string; icon: typeof Trophy }> = {
  Red: { color: "bg-red-500", bgLight: "bg-red-500/10", textColor: "text-red-500", icon: Flame },
  Blue: { color: "bg-blue-500", bgLight: "bg-blue-500/10", textColor: "text-blue-500", icon: Target },
  Yellow: { color: "bg-yellow-500", bgLight: "bg-yellow-500/10", textColor: "text-yellow-500", icon: Users },
  Green: { color: "bg-green-500", bgLight: "bg-green-500/10", textColor: "text-green-500", icon: TrendingUp },
};

const TeamLeaderboard = () => {
  const [teams, setTeams] = useState<TeamScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial data
    const fetchTeams = async () => {
      const { data, error } = await supabase
        .from("team_scores")
        .select("*")
        .order("points", { ascending: false });

      if (!error && data) {
        setTeams(data);
      }
      setLoading(false);
    };

    fetchTeams();

    // Subscribe to realtime updates
    const channel = supabase
      .channel("team_scores_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "team_scores",
        },
        (payload) => {
          // Refetch all data on any change to maintain sort order
          fetchTeams();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-20 bg-muted rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {teams.map((team, index) => {
        const config = teamConfig[team.team_color] || teamConfig.Red;
        const Icon = config.icon;
        const rank = index + 1;

        return (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className={`relative flex items-center gap-4 p-4 rounded-2xl border-2 ${
              rank === 1 ? "border-yellow-400 bg-yellow-400/5" : "border-border bg-card"
            }`}
          >
            {/* Rank Badge */}
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-xl ${
                rank === 1
                  ? "bg-yellow-400 text-yellow-900"
                  : rank === 2
                  ? "bg-gray-300 text-gray-700"
                  : rank === 3
                  ? "bg-amber-600 text-amber-100"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {rank === 1 ? <Trophy className="w-6 h-6" /> : `#${rank}`}
            </div>

            {/* Team Color Dot */}
            <div className={`w-10 h-10 ${config.color} rounded-full flex items-center justify-center`}>
              <Icon className="w-5 h-5 text-white" />
            </div>

            {/* Team Info */}
            <div className="flex-1">
              <h4 className={`font-display font-bold text-lg ${config.textColor}`}>
                Team {team.team_color}
              </h4>
              <p className="text-sm text-muted-foreground">
                {team.games_played} games played
              </p>
            </div>

            {/* Stats */}
            <div className="text-right">
              <div className={`font-display font-bold text-2xl ${config.textColor}`}>
                {team.points.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                {team.wins} wins
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Live Indicator */}
      <div className="flex items-center justify-center gap-2 pt-4 text-sm text-muted-foreground">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        Live updates enabled
      </div>
    </div>
  );
};

export default TeamLeaderboard;
