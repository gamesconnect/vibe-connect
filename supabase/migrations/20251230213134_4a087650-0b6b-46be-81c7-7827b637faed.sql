-- Create team_scores table to track team performance
CREATE TABLE public.team_scores (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_color text NOT NULL UNIQUE,
  wins integer NOT NULL DEFAULT 0,
  points integer NOT NULL DEFAULT 0,
  games_played integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Insert initial data for the four teams
INSERT INTO public.team_scores (team_color, wins, points, games_played) VALUES
  ('Red', 12, 2450, 18),
  ('Blue', 10, 2180, 18),
  ('Yellow', 11, 2320, 18),
  ('Green', 9, 1980, 18);

-- Enable RLS
ALTER TABLE public.team_scores ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (everyone can see the leaderboard)
CREATE POLICY "Anyone can view team scores" 
ON public.team_scores 
FOR SELECT 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_team_scores_updated_at
BEFORE UPDATE ON public.team_scores
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.team_scores;