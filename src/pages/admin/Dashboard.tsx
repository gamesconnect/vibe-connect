import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, DollarSign, Trophy, Loader2 } from "lucide-react";

const Dashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: async () => {
      const [registrations, events, payments, teamScores] = await Promise.all([
        supabase.from("registrations").select("*", { count: "exact", head: true }),
        supabase.from("events").select("*", { count: "exact", head: true }),
        supabase.from("payments").select("amount, status"),
        supabase.from("team_scores").select("*"),
      ]);

      const totalRevenue = payments.data
        ?.filter((p) => p.status === "successful")
        .reduce((sum, p) => sum + Number(p.amount), 0) || 0;

      const pendingPayments = payments.data?.filter((p) => p.status === "pending").length || 0;

      return {
        totalRegistrations: registrations.count || 0,
        totalEvents: events.count || 0,
        totalRevenue,
        pendingPayments,
        teamScores: teamScores.data || [],
      };
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Registrations",
      value: stats?.totalRegistrations || 0,
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Active Events",
      value: stats?.totalEvents || 0,
      icon: Calendar,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Total Revenue",
      value: `GH₵ ${(stats?.totalRevenue || 0).toLocaleString()}`,
      icon: DollarSign,
      color: "text-accent-green",
      bgColor: "bg-accent/10",
    },
    {
      title: "Pending Payments",
      value: stats?.pendingPayments || 0,
      icon: Trophy,
      color: "text-brand-blue",
      bgColor: "bg-brand-blue/10",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Team Standings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Team Standings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats?.teamScores
              .sort((a, b) => b.points - a.points)
              .map((team, index) => {
                const teamColorClasses: Record<string, string> = {
                  Red: "bg-primary",
                  Blue: "bg-brand-blue",
                  Yellow: "bg-secondary",
                  Green: "bg-brand-green",
                };
                return (
                  <div
                    key={team.id}
                    className="p-4 rounded-xl bg-muted flex items-center gap-3"
                  >
                    <div className="text-lg font-bold text-muted-foreground">
                      #{index + 1}
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full ${teamColorClasses[team.team_color] || "bg-gray-400"}`}
                    />
                    <div className="flex-1">
                      <div className="font-semibold">Team {team.team_color}</div>
                      <div className="text-sm text-muted-foreground">
                        {team.points} pts • {team.wins} wins
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
