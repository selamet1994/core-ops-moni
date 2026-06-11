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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      daily_checklists: {
        Row: {
          checked_at: string
          created_at: string
          created_by: string | null
          data: Json
          equipment_code: string
          equipment_name: string
          id: string
          pic: string | null
          remarks: string | null
          shift: string | null
          updated_at: string
        }
        Insert: {
          checked_at?: string
          created_at?: string
          created_by?: string | null
          data?: Json
          equipment_code: string
          equipment_name: string
          id?: string
          pic?: string | null
          remarks?: string | null
          shift?: string | null
          updated_at?: string
        }
        Update: {
          checked_at?: string
          created_at?: string
          created_by?: string | null
          data?: Json
          equipment_code?: string
          equipment_name?: string
          id?: string
          pic?: string | null
          remarks?: string | null
          shift?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      equipment_history: {
        Row: {
          asset_code: string | null
          asset_name: string
          brand_type: string | null
          capacity: string | null
          category: string
          created_at: string
          created_by: string | null
          description: string | null
          documentation_url: string | null
          id: string
          location: string | null
          pic: string | null
          po_url: string | null
          serial_number: string | null
          status: string | null
          updated_at: string
          work_date: string
          year_acquired: number | null
        }
        Insert: {
          asset_code?: string | null
          asset_name: string
          brand_type?: string | null
          capacity?: string | null
          category: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          documentation_url?: string | null
          id?: string
          location?: string | null
          pic?: string | null
          po_url?: string | null
          serial_number?: string | null
          status?: string | null
          updated_at?: string
          work_date?: string
          year_acquired?: number | null
        }
        Update: {
          asset_code?: string | null
          asset_name?: string
          brand_type?: string | null
          capacity?: string | null
          category?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          documentation_url?: string | null
          id?: string
          location?: string | null
          pic?: string | null
          po_url?: string | null
          serial_number?: string | null
          status?: string | null
          updated_at?: string
          work_date?: string
          year_acquired?: number | null
        }
        Relationships: []
      }
      preventive_maintenance: {
        Row: {
          asset_name: string
          assigned_to: string | null
          completed_date: string | null
          created_at: string
          created_by: string
          description: string | null
          id: string
          location: string | null
          notes: string | null
          priority: string
          scheduled_date: string
          status: Database["public"]["Enums"]["work_status"]
          ticket_no: string
          updated_at: string
        }
        Insert: {
          asset_name: string
          assigned_to?: string | null
          completed_date?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          priority?: string
          scheduled_date: string
          status?: Database["public"]["Enums"]["work_status"]
          ticket_no?: string
          updated_at?: string
        }
        Update: {
          asset_name?: string
          assigned_to?: string | null
          completed_date?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          priority?: string
          scheduled_date?: string
          status?: Database["public"]["Enums"]["work_status"]
          ticket_no?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          division: Database["public"]["Enums"]["division"] | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          division?: Database["public"]["Enums"]["division"] | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          division?: Database["public"]["Enums"]["division"] | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      spare_part_movements: {
        Row: {
          arrival_date: string | null
          brand_type: string | null
          created_at: string
          created_by: string | null
          id: string
          movement_type: string
          notes: string | null
          occurred_at: string
          part_code: string | null
          part_name: string
          pic: string | null
          quantity: number
          request_date: string | null
          unit: string | null
          updated_at: string
        }
        Insert: {
          arrival_date?: string | null
          brand_type?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          movement_type: string
          notes?: string | null
          occurred_at?: string
          part_code?: string | null
          part_name: string
          pic?: string | null
          quantity?: number
          request_date?: string | null
          unit?: string | null
          updated_at?: string
        }
        Update: {
          arrival_date?: string | null
          brand_type?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          movement_type?: string
          notes?: string | null
          occurred_at?: string
          part_code?: string | null
          part_name?: string
          pic?: string | null
          quantity?: number
          request_date?: string | null
          unit?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      spare_parts: {
        Row: {
          barcode: string | null
          code: string
          created_at: string
          created_by: string | null
          id: string
          name: string
          stock_final: number | null
          stock_in: number
          stock_initial: number
          stock_out: number
          unit: string | null
          updated_at: string
        }
        Insert: {
          barcode?: string | null
          code: string
          created_at?: string
          created_by?: string | null
          id?: string
          name: string
          stock_final?: number | null
          stock_in?: number
          stock_initial?: number
          stock_out?: number
          unit?: string | null
          updated_at?: string
        }
        Update: {
          barcode?: string | null
          code?: string
          created_at?: string
          created_by?: string | null
          id?: string
          name?: string
          stock_final?: number | null
          stock_in?: number
          stock_initial?: number
          stock_out?: number
          unit?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      utility_tests: {
        Row: {
          asset_name: string | null
          created_at: string
          created_by: string | null
          data: Json
          id: string
          location: string | null
          notes: string | null
          technician: string | null
          test_date: string
          test_type: string
          updated_at: string
        }
        Insert: {
          asset_name?: string | null
          created_at?: string
          created_by?: string | null
          data?: Json
          id?: string
          location?: string | null
          notes?: string | null
          technician?: string | null
          test_date?: string
          test_type: string
          updated_at?: string
        }
        Update: {
          asset_name?: string | null
          created_at?: string
          created_by?: string | null
          data?: Json
          id?: string
          location?: string | null
          notes?: string | null
          technician?: string | null
          test_date?: string
          test_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      vehicle_monitoring: {
        Row: {
          check_date: string
          condition: string | null
          created_at: string
          created_by: string
          driver_name: string | null
          fuel_level: number | null
          id: string
          mileage: number | null
          notes: string | null
          status: Database["public"]["Enums"]["work_status"]
          updated_at: string
          vehicle_plate: string
        }
        Insert: {
          check_date: string
          condition?: string | null
          created_at?: string
          created_by: string
          driver_name?: string | null
          fuel_level?: number | null
          id?: string
          mileage?: number | null
          notes?: string | null
          status?: Database["public"]["Enums"]["work_status"]
          updated_at?: string
          vehicle_plate: string
        }
        Update: {
          check_date?: string
          condition?: string | null
          created_at?: string
          created_by?: string
          driver_name?: string | null
          fuel_level?: number | null
          id?: string
          mileage?: number | null
          notes?: string | null
          status?: Database["public"]["Enums"]["work_status"]
          updated_at?: string
          vehicle_plate?: string
        }
        Relationships: []
      }
      waste_monitoring: {
        Row: {
          category: string
          created_at: string
          created_by: string
          disposal_method: string | null
          id: string
          log_date: string
          notes: string | null
          source_location: string | null
          status: Database["public"]["Enums"]["work_status"]
          updated_at: string
          waste_type: string
          weight_kg: number
        }
        Insert: {
          category?: string
          created_at?: string
          created_by: string
          disposal_method?: string | null
          id?: string
          log_date: string
          notes?: string | null
          source_location?: string | null
          status?: Database["public"]["Enums"]["work_status"]
          updated_at?: string
          waste_type: string
          weight_kg?: number
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string
          disposal_method?: string | null
          id?: string
          log_date?: string
          notes?: string | null
          source_location?: string | null
          status?: Database["public"]["Enums"]["work_status"]
          updated_at?: string
          waste_type?: string
          weight_kg?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "super_admin" | "admin" | "member"
      division: "fms" | "ga" | "k3l"
      work_status:
        | "pending"
        | "in_progress"
        | "completed"
        | "overdue"
        | "approved"
        | "rejected"
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
    Enums: {
      app_role: ["super_admin", "admin", "member"],
      division: ["fms", "ga", "k3l"],
      work_status: [
        "pending",
        "in_progress",
        "completed",
        "overdue",
        "approved",
        "rejected",
      ],
    },
  },
} as const
