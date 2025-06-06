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
      appointments: {
        Row: {
          appointment_date: string
          appointment_type: string
          car_id: string | null
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          phone: string | null
          status: string
          updated_at: string
        }
        Insert: {
          appointment_date: string
          appointment_type: string
          car_id?: string | null
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          appointment_date?: string
          appointment_type?: string
          car_id?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author: string
          category: string | null
          content: string
          created_at: string
          excerpt: string | null
          featured_image_url: string | null
          id: string
          is_published: boolean | null
          published_at: string | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author: string
          category?: string | null
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          is_published?: boolean | null
          published_at?: string | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          category?: string | null
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          is_published?: boolean | null
          published_at?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      car_images: {
        Row: {
          alt_text: string | null
          car_id: string
          created_at: string
          display_order: number | null
          id: string
          image_url: string
          is_primary: boolean | null
          storage_path: string
          updated_at: string
        }
        Insert: {
          alt_text?: string | null
          car_id: string
          created_at?: string
          display_order?: number | null
          id?: string
          image_url: string
          is_primary?: boolean | null
          storage_path: string
          updated_at?: string
        }
        Update: {
          alt_text?: string | null
          car_id?: string
          created_at?: string
          display_order?: number | null
          id?: string
          image_url?: string
          is_primary?: boolean | null
          storage_path?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "car_images_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
        ]
      }
      car_orders: {
        Row: {
          budget_range: string | null
          car_make: string
          car_model: string
          created_at: string
          email: string
          id: string
          name: string
          phone: string | null
          special_requirements: string | null
        }
        Insert: {
          budget_range?: string | null
          car_make: string
          car_model: string
          created_at?: string
          email: string
          id?: string
          name: string
          phone?: string | null
          special_requirements?: string | null
        }
        Update: {
          budget_range?: string | null
          car_make?: string
          car_model?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string | null
          special_requirements?: string | null
        }
        Relationships: []
      }
      car_specifications: {
        Row: {
          acceleration_0_100: number | null
          boot_capacity: number | null
          car_id: string
          co2_emissions: number | null
          created_at: string
          drivetrain: string | null
          engine_size: string | null
          exterior_color: string | null
          fuel_consumption_city: number | null
          fuel_consumption_combined: number | null
          fuel_consumption_highway: number | null
          height: number | null
          horsepower: number | null
          id: string
          interior_color: string | null
          length: number | null
          number_of_doors: number | null
          number_of_seats: number | null
          top_speed: number | null
          torque: number | null
          updated_at: string
          warranty_years: number | null
          weight: number | null
          wheelbase: number | null
          width: number | null
        }
        Insert: {
          acceleration_0_100?: number | null
          boot_capacity?: number | null
          car_id: string
          co2_emissions?: number | null
          created_at?: string
          drivetrain?: string | null
          engine_size?: string | null
          exterior_color?: string | null
          fuel_consumption_city?: number | null
          fuel_consumption_combined?: number | null
          fuel_consumption_highway?: number | null
          height?: number | null
          horsepower?: number | null
          id?: string
          interior_color?: string | null
          length?: number | null
          number_of_doors?: number | null
          number_of_seats?: number | null
          top_speed?: number | null
          torque?: number | null
          updated_at?: string
          warranty_years?: number | null
          weight?: number | null
          wheelbase?: number | null
          width?: number | null
        }
        Update: {
          acceleration_0_100?: number | null
          boot_capacity?: number | null
          car_id?: string
          co2_emissions?: number | null
          created_at?: string
          drivetrain?: string | null
          engine_size?: string | null
          exterior_color?: string | null
          fuel_consumption_city?: number | null
          fuel_consumption_combined?: number | null
          fuel_consumption_highway?: number | null
          height?: number | null
          horsepower?: number | null
          id?: string
          interior_color?: string | null
          length?: number | null
          number_of_doors?: number | null
          number_of_seats?: number | null
          top_speed?: number | null
          torque?: number | null
          updated_at?: string
          warranty_years?: number | null
          weight?: number | null
          wheelbase?: number | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "car_specifications_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
        ]
      }
      cars: {
        Row: {
          created_at: string
          description: string | null
          fuel_type: string
          id: string
          image_url: string | null
          make: string
          mileage: string | null
          model: string
          price: number
          transmission: string
          updated_at: string
          year: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          fuel_type: string
          id?: string
          image_url?: string | null
          make: string
          mileage?: string | null
          model: string
          price: number
          transmission: string
          updated_at?: string
          year: number
        }
        Update: {
          created_at?: string
          description?: string | null
          fuel_type?: string
          id?: string
          image_url?: string | null
          make?: string
          mileage?: string | null
          model?: string
          price?: number
          transmission?: string
          updated_at?: string
          year?: number
        }
        Relationships: []
      }
      contact_inquiries: {
        Row: {
          car_id: string | null
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
        }
        Insert: {
          car_id?: string | null
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
        }
        Update: {
          car_id?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_inquiries_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
        ]
      }
      faqs: {
        Row: {
          answer: string
          category: string | null
          created_at: string
          display_order: number | null
          id: string
          is_featured: boolean | null
          question: string
          updated_at: string
        }
        Insert: {
          answer: string
          category?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          question: string
          updated_at?: string
        }
        Update: {
          answer?: string
          category?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          question?: string
          updated_at?: string
        }
        Relationships: []
      }
      finance_applications: {
        Row: {
          annual_income: number | null
          car_id: string | null
          created_at: string
          email: string
          employment_status: string | null
          id: string
          loan_amount: number | null
          name: string
          phone: string | null
        }
        Insert: {
          annual_income?: number | null
          car_id?: string | null
          created_at?: string
          email: string
          employment_status?: string | null
          id?: string
          loan_amount?: number | null
          name: string
          phone?: string | null
        }
        Update: {
          annual_income?: number | null
          car_id?: string | null
          created_at?: string
          email?: string
          employment_status?: string | null
          id?: string
          loan_amount?: number | null
          name?: string
          phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "finance_applications_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
        ]
      }
      follow_up_sequences: {
        Row: {
          created_at: string
          id: string
          inquiry_id: string | null
          inquiry_type: string
          message_template: string
          scheduled_for: string
          sent_at: string | null
          sequence_step: number
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          inquiry_id?: string | null
          inquiry_type: string
          message_template: string
          scheduled_for: string
          sent_at?: string | null
          sequence_step?: number
          status?: string
        }
        Update: {
          created_at?: string
          id?: string
          inquiry_id?: string | null
          inquiry_type?: string
          message_template?: string
          scheduled_for?: string
          sent_at?: string | null
          sequence_step?: number
          status?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          car_purchased: string | null
          content: string
          created_at: string
          customer_email: string | null
          customer_name: string
          id: string
          is_approved: boolean | null
          is_featured: boolean | null
          purchase_date: string | null
          rating: number
          title: string | null
          updated_at: string
        }
        Insert: {
          car_purchased?: string | null
          content: string
          created_at?: string
          customer_email?: string | null
          customer_name: string
          id?: string
          is_approved?: boolean | null
          is_featured?: boolean | null
          purchase_date?: string | null
          rating: number
          title?: string | null
          updated_at?: string
        }
        Update: {
          car_purchased?: string | null
          content?: string
          created_at?: string
          customer_email?: string | null
          customer_name?: string
          id?: string
          is_approved?: boolean | null
          is_featured?: boolean | null
          purchase_date?: string | null
          rating?: number
          title?: string | null
          updated_at?: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
