export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      events: {
        Row: {
          category: string
          created_at: string
          date: string
          description: string | null
          id: string
          image_url: string | null
          location: string | null
          max_capacity: number | null
          price: number
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          date: string
          description?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          max_capacity?: number | null
          price?: number
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          max_capacity?: number | null
          price?: number
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
        }
        Relationships: []
      }
      newsletter: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reference: string
          status: string
        }
        Insert: {
          amount: number
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reference: string
          status?: string
        }
        Update: {
          amount?: number
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reference?: string
          status?: string
        }
        Relationships: []
      }
      registrations: {
        Row: {
          amount_paid: number | null
          created_at: string
          email: string
          event_id: string | null
          id: string
          name: string
          payment_reference: string | null
          payment_status: string
          phone: string
          team_color: string | null
          verified: boolean | null
        }
        Insert: {
          amount_paid?: number | null
          created_at?: string
          email: string
          event_id?: string | null
          id?: string
          name: string
          payment_reference?: string | null
          payment_status?: string
          phone: string
          team_color?: string | null
          verified?: boolean | null
        }
        Update: {
          amount_paid?: number | null
          created_at?: string
          email?: string
          event_id?: string | null
          id?: string
          name?: string
          payment_reference?: string | null
          payment_status?: string
          phone?: string
          team_color?: string | null
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      team_scores: {
        Row: {
          created_at: string
          games_played: number
          id: string
          points: number
          team_color: string
          updated_at: string
          wins: number
        }
        Insert: {
          created_at?: string
          games_played?: number
          id?: string
          points?: number
          team_color: string
          updated_at?: string
          wins?: number
        }
        Update: {
          created_at?: string
          games_played?: number
          id?: string
          points?: number
          team_color?: string
          updated_at?: string
          wins?: number
        }
        Relationships: []
      }
      travel_bookings: {
        Row: {
          amount_paid: number | null
          balance_due: number | null
          created_at: string
          email: string
          id: string
          name: string
          num_travelers: number
          payment_reference: string | null
          payment_status: string
          payment_type: string
          phone: string
          trip_name: string
          verified: boolean | null
        }
        Insert: {
          amount_paid?: number | null
          balance_due?: number | null
          created_at?: string
          email: string
          id?: string
          name: string
          num_travelers?: number
          payment_reference?: string | null
          payment_status?: string
          payment_type?: string
          phone: string
          trip_name: string
          verified?: boolean | null
        }
        Update: {
          amount_paid?: number | null
          balance_due?: number | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          num_travelers?: number
          payment_reference?: string | null
          payment_status?: string
          payment_type?: string
          phone?: string
          trip_name?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      trivia_signups: {
        Row: {
          amount_paid: number | null
          created_at: string
          email: string
          id: string
          name: string
          payment_reference: string | null
          payment_status: string
          phone: string
          verified: boolean | null
        }
        Insert: {
          amount_paid?: number | null
          created_at?: string
          email: string
          id?: string
          name: string
          payment_reference?: string | null
          payment_status?: string
          phone: string
          verified?: boolean | null
        }
        Update: {
          amount_paid?: number | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          payment_reference?: string | null
          payment_status?: string
          phone?: string
          verified?: boolean | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
