export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      dao: {
        Row: {
          auction: string | null
          created_at: string
          governor: string | null
          metadata: string | null
          name: string | null
          token: string
          treasury: string | null
        }
        Insert: {
          auction?: string | null
          created_at?: string
          governor?: string | null
          metadata?: string | null
          name?: string | null
          token: string
          treasury?: string | null
        }
        Update: {
          auction?: string | null
          created_at?: string
          governor?: string | null
          metadata?: string | null
          name?: string | null
          token?: string
          treasury?: string | null
        }
        Relationships: []
      }
      editors: {
        Row: {
          created_at: string
          id: number
          proposal: string | null
          user: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          proposal?: string | null
          user?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          proposal?: string | null
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "editors_proposal_fkey"
            columns: ["proposal"]
            isOneToOne: false
            referencedRelation: "proposals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "editors_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["e_address"]
          },
        ]
      }
      likes: {
        Row: {
          created_at: string
          propdate: number
          user: string
        }
        Insert: {
          created_at?: string
          propdate: number
          user: string
        }
        Update: {
          created_at?: string
          propdate?: number
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_propdate_fkey"
            columns: ["propdate"]
            isOneToOne: false
            referencedRelation: "propdates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["e_address"]
          },
        ]
      }
      propdates: {
        Row: {
          author: string
          created_at: string
          id: number
          proposal: string
          text: string
        }
        Insert: {
          author: string
          created_at?: string
          id?: number
          proposal: string
          text: string
        }
        Update: {
          author?: string
          created_at?: string
          id?: number
          proposal?: string
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "propdates_author_fkey"
            columns: ["author"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["e_address"]
          },
          {
            foreignKeyName: "propdates_proposal_fkey"
            columns: ["proposal"]
            isOneToOne: false
            referencedRelation: "proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      proposals: {
        Row: {
          created_at: string
          dao: string
          id: string
          proposer: string
        }
        Insert: {
          created_at?: string
          dao: string
          id: string
          proposer: string
        }
        Update: {
          created_at?: string
          dao?: string
          id?: string
          proposer?: string
        }
        Relationships: [
          {
            foreignKeyName: "proposal_proposer_fkey"
            columns: ["proposer"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["e_address"]
          },
          {
            foreignKeyName: "proposals_dao_fkey"
            columns: ["dao"]
            isOneToOne: false
            referencedRelation: "dao"
            referencedColumns: ["token"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          e_address: string
          f_id: number | null
          f_username: string | null
        }
        Insert: {
          created_at?: string
          e_address: string
          f_id?: number | null
          f_username?: string | null
        }
        Update: {
          created_at?: string
          e_address?: string
          f_id?: number | null
          f_username?: string | null
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
