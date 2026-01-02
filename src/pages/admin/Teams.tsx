import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Edit, Loader2, Trophy, Award, Gamepad2 } from "lucide-react";

const teamScoreSchema = z.object({
  wins: z.coerce.number().min(0, "Wins must be positive"),
  points: z.coerce.number().min(0, "Points must be positive"),
  games_played: z.coerce.number().min(0, "Games played must be positive"),
});

type TeamScoreFormData = z.infer<typeof teamScoreSchema>;

const Teams = () => {
  const [editingTeam, setEditingTeam] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<TeamScoreFormData>({
    resolver: zodResolver(teamScoreSchema),
    defaultValues: {
      wins: 0,
      points: 0,
      games_played: 0,
    },
  });

  const { data: teamScores, isLoading } = useQuery({
    queryKey: ["admin-team-scores"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("team_scores")
        .select("*")
        .order("points", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: TeamScoreFormData }) => {
      const { error } = await supabase
        .from("team_scores")
        .update(data)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-team-scores"] });
      toast({
        title: "Team Updated",
        description: "Team scores have been updated successfully.",
      });
      setIsDialogOpen(false);
      setEditingTeam(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update team scores.",
        variant: "destructive",
      });
    },
  });

  const openEditDialog = (team: any) => {
    setEditingTeam(team);
    form.reset({
      wins: team.wins,
      points: team.points,
      games_played: team.games_played,
    });
    setIsDialogOpen(true);
  };

  const onSubmit = (data: TeamScoreFormData) => {
    if (editingTeam) {
      updateMutation.mutate({ id: editingTeam.id, data });
    }
  };

  const teamColorStyles: Record<string, { bg: string; border: string; text: string }> = {
    Red: { bg: "bg-primary/10", border: "border-primary", text: "text-primary" },
    Blue: { bg: "bg-brand-blue/10", border: "border-brand-blue", text: "text-brand-blue" },
    Yellow: { bg: "bg-secondary/10", border: "border-secondary", text: "text-secondary" },
    Green: { bg: "bg-brand-green/10", border: "border-brand-green", text: "text-brand-green" },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-bold">Team Scores</h1>
        <p className="text-muted-foreground">Update team standings after each Game Day</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-32">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teamScores?.map((team, index) => {
            const styles = teamColorStyles[team.team_color] || {
              bg: "bg-muted",
              border: "border-border",
              text: "text-foreground",
            };
            return (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`border-2 ${styles.border}`}>
                  <CardHeader className={styles.bg}>
                    <div className="flex items-center justify-between">
                      <CardTitle className={`flex items-center gap-2 ${styles.text}`}>
                        <Trophy className="w-5 h-5" />
                        Team {team.team_color}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">#{index + 1}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openEditDialog(team)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-4 bg-muted rounded-xl">
                        <Award className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                        <div className="text-2xl font-bold">{team.wins}</div>
                        <div className="text-sm text-muted-foreground">Wins</div>
                      </div>
                      <div className="p-4 bg-muted rounded-xl">
                        <Trophy className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                        <div className="text-2xl font-bold">{team.points}</div>
                        <div className="text-sm text-muted-foreground">Points</div>
                      </div>
                      <div className="p-4 bg-muted rounded-xl">
                        <Gamepad2 className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                        <div className="text-2xl font-bold">{team.games_played}</div>
                        <div className="text-sm text-muted-foreground">Games</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Update Team {editingTeam?.team_color} Scores
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="wins"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wins</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min={0} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="points"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Points</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min={0} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="games_played"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Games Played</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min={0} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                Update Scores
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Teams;
