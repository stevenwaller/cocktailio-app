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
      bar_ingredients: {
        Row: {
          bar_id: string | null
          created_at: string
          id: string
          ingredient_id: string | null
        }
        Insert: {
          bar_id?: string | null
          created_at?: string
          id?: string
          ingredient_id?: string | null
        }
        Update: {
          bar_id?: string | null
          created_at?: string
          id?: string
          ingredient_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bar_ingredients_bar_id_fkey"
            columns: ["bar_id"]
            isOneToOne: false
            referencedRelation: "bars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bar_ingredients_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
        ]
      }
      bars: {
        Row: {
          all_ingredients_by_id: Json
          created_at: string
          id: string
          ingredients_by_id: Json
          is_default: boolean | null
          name: string
          user_id: string | null
        }
        Insert: {
          all_ingredients_by_id?: Json
          created_at?: string
          id?: string
          ingredients_by_id?: Json
          is_default?: boolean | null
          name: string
          user_id?: string | null
        }
        Update: {
          all_ingredients_by_id?: Json
          created_at?: string
          id?: string
          ingredients_by_id?: Json
          is_default?: boolean | null
          name?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bars_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      cocktail_component_ingredients: {
        Row: {
          cocktail_component_id: string | null
          created_at: string | null
          id: string
          ingredient_id: string | null
          type:
            | Database["public"]["Enums"]["cocktail_component_ingredient_type"]
            | null
        }
        Insert: {
          cocktail_component_id?: string | null
          created_at?: string | null
          id?: string
          ingredient_id?: string | null
          type?:
            | Database["public"]["Enums"]["cocktail_component_ingredient_type"]
            | null
        }
        Update: {
          cocktail_component_id?: string | null
          created_at?: string | null
          id?: string
          ingredient_id?: string | null
          type?:
            | Database["public"]["Enums"]["cocktail_component_ingredient_type"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "public_cocktail_component_ingredients_cocktail_component_id_fke"
            columns: ["cocktail_component_id"]
            isOneToOne: false
            referencedRelation: "cocktail_components"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_cocktail_component_ingredients_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
        ]
      }
      cocktail_component_or_ingredients: {
        Row: {
          cocktail_component_id: string | null
          created_at: string | null
          id: string
          ingredient_id: string | null
        }
        Insert: {
          cocktail_component_id?: string | null
          created_at?: string | null
          id?: string
          ingredient_id?: string | null
        }
        Update: {
          cocktail_component_id?: string | null
          created_at?: string | null
          id?: string
          ingredient_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_cocktail_component_or_ingredients_cocktail_component_id_"
            columns: ["cocktail_component_id"]
            isOneToOne: false
            referencedRelation: "cocktail_components"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_cocktail_component_or_ingredients_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
        ]
      }
      cocktail_component_pref_ingredients: {
        Row: {
          cocktail_component_id: string | null
          created_at: string | null
          id: string
          ingredient_id: string | null
        }
        Insert: {
          cocktail_component_id?: string | null
          created_at?: string | null
          id?: string
          ingredient_id?: string | null
        }
        Update: {
          cocktail_component_id?: string | null
          created_at?: string | null
          id?: string
          ingredient_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_cocktail_component_pref_ingredients_cocktail_component_i"
            columns: ["cocktail_component_id"]
            isOneToOne: false
            referencedRelation: "cocktail_components"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_cocktail_component_pref_ingredients_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
        ]
      }
      cocktail_components: {
        Row: {
          amount: number | null
          amount_max: number | null
          cocktail_id: string | null
          created_at: string | null
          id: string
          ingredients_array: string[] | null
          measurement_id: string | null
          note: string | null
          optional: boolean
          order: number | null
          sub_ingredients_array: string[] | null
          substitute: string | null
          variation: string | null
        }
        Insert: {
          amount?: number | null
          amount_max?: number | null
          cocktail_id?: string | null
          created_at?: string | null
          id?: string
          ingredients_array?: string[] | null
          measurement_id?: string | null
          note?: string | null
          optional?: boolean
          order?: number | null
          sub_ingredients_array?: string[] | null
          substitute?: string | null
          variation?: string | null
        }
        Update: {
          amount?: number | null
          amount_max?: number | null
          cocktail_id?: string | null
          created_at?: string | null
          id?: string
          ingredients_array?: string[] | null
          measurement_id?: string | null
          note?: string | null
          optional?: boolean
          order?: number | null
          sub_ingredients_array?: string[] | null
          substitute?: string | null
          variation?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_cocktail_components_cocktail_id_fkey"
            columns: ["cocktail_id"]
            isOneToOne: false
            referencedRelation: "cocktails"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_cocktail_components_measurement_id_fkey"
            columns: ["measurement_id"]
            isOneToOne: false
            referencedRelation: "measurements"
            referencedColumns: ["id"]
          },
        ]
      }
      cocktail_related_cocktails: {
        Row: {
          cocktail_id: string | null
          created_at: string
          id: string
          inverse_id: string | null
          related_cocktail_id: string | null
        }
        Insert: {
          cocktail_id?: string | null
          created_at?: string
          id?: string
          inverse_id?: string | null
          related_cocktail_id?: string | null
        }
        Update: {
          cocktail_id?: string | null
          created_at?: string
          id?: string
          inverse_id?: string | null
          related_cocktail_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_cocktail_related_cocktails_cocktail_id_fkey"
            columns: ["cocktail_id"]
            isOneToOne: false
            referencedRelation: "cocktails"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_cocktail_related_cocktails_inverse_id_fkey"
            columns: ["inverse_id"]
            isOneToOne: false
            referencedRelation: "cocktail_related_cocktails"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_cocktail_related_cocktails_related_cocktail_id_fkey"
            columns: ["related_cocktail_id"]
            isOneToOne: false
            referencedRelation: "cocktails"
            referencedColumns: ["id"]
          },
        ]
      }
      cocktail_sources: {
        Row: {
          cocktail_id: string
          created_at: string
          id: string
          source_id: string
        }
        Insert: {
          cocktail_id: string
          created_at?: string
          id?: string
          source_id: string
        }
        Update: {
          cocktail_id?: string
          created_at?: string
          id?: string
          source_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_cocktail_sources_cocktail_id_fkey"
            columns: ["cocktail_id"]
            isOneToOne: false
            referencedRelation: "cocktails"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_cocktail_sources_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      cocktail_steps: {
        Row: {
          cocktail_id: string | null
          created_at: string | null
          description: string
          id: string
          order: number
        }
        Insert: {
          cocktail_id?: string | null
          created_at?: string | null
          description: string
          id?: string
          order: number
        }
        Update: {
          cocktail_id?: string | null
          created_at?: string | null
          description?: string
          id?: string
          order?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_cocktail_steps_cocktail_id_fkey"
            columns: ["cocktail_id"]
            isOneToOne: false
            referencedRelation: "cocktails"
            referencedColumns: ["id"]
          },
        ]
      }
      cocktails: {
        Row: {
          base_ingredient_id: string | null
          created_at: string | null
          description: string | null
          era_id: string | null
          glass_id: string | null
          history: string | null
          id: string
          invention_date: string | null
          method_id: string | null
          name: string
          note: string | null
          slug: string
        }
        Insert: {
          base_ingredient_id?: string | null
          created_at?: string | null
          description?: string | null
          era_id?: string | null
          glass_id?: string | null
          history?: string | null
          id?: string
          invention_date?: string | null
          method_id?: string | null
          name: string
          note?: string | null
          slug: string
        }
        Update: {
          base_ingredient_id?: string | null
          created_at?: string | null
          description?: string | null
          era_id?: string | null
          glass_id?: string | null
          history?: string | null
          id?: string
          invention_date?: string | null
          method_id?: string | null
          name?: string
          note?: string | null
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_cocktails_base_ingredient_uuid_fkey"
            columns: ["base_ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_cocktails_era_id_fkey"
            columns: ["era_id"]
            isOneToOne: false
            referencedRelation: "eras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_cocktails_glass_id_fkey"
            columns: ["glass_id"]
            isOneToOne: false
            referencedRelation: "glasses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_cocktails_method_id_fkey"
            columns: ["method_id"]
            isOneToOne: false
            referencedRelation: "methods"
            referencedColumns: ["id"]
          },
        ]
      }
      collection_cocktails: {
        Row: {
          cocktail_id: string | null
          collection_id: string | null
          created_at: string
          id: string
        }
        Insert: {
          cocktail_id?: string | null
          collection_id?: string | null
          created_at?: string
          id?: string
        }
        Update: {
          cocktail_id?: string | null
          collection_id?: string | null
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "collection_cocktails_cocktail_id_fkey"
            columns: ["cocktail_id"]
            isOneToOne: false
            referencedRelation: "cocktails"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_cocktails_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
        ]
      }
      collections: {
        Row: {
          created_at: string
          id: string
          is_default: boolean | null
          name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_default?: boolean | null
          name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_default?: boolean | null
          name?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "collections_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      eras: {
        Row: {
          created_at: string
          description: string | null
          end_year: number | null
          id: string
          name: string
          start_year: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_year?: number | null
          id?: string
          name: string
          start_year?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          end_year?: number | null
          id?: string
          name?: string
          start_year?: number | null
        }
        Relationships: []
      }
      glasses: {
        Row: {
          created_at: string
          description: string | null
          id: string
          max_amount: number | null
          min_amount: number | null
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          max_amount?: number | null
          min_amount?: number | null
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          max_amount?: number | null
          min_amount?: number | null
          name?: string
        }
        Relationships: []
      }
      ingredients: {
        Row: {
          aka: string | null
          created_at: string | null
          description: string | null
          hierarchy: Json | null
          history: string | null
          id: string
          is_base: boolean | null
          is_brand: boolean | null
          is_category: boolean | null
          name: string
          order: number | null
          parent_ingredient_id: string | null
          slug: string
          website: string | null
        }
        Insert: {
          aka?: string | null
          created_at?: string | null
          description?: string | null
          hierarchy?: Json | null
          history?: string | null
          id?: string
          is_base?: boolean | null
          is_brand?: boolean | null
          is_category?: boolean | null
          name: string
          order?: number | null
          parent_ingredient_id?: string | null
          slug: string
          website?: string | null
        }
        Update: {
          aka?: string | null
          created_at?: string | null
          description?: string | null
          hierarchy?: Json | null
          history?: string | null
          id?: string
          is_base?: boolean | null
          is_brand?: boolean | null
          is_category?: boolean | null
          name?: string
          order?: number | null
          parent_ingredient_id?: string | null
          slug?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_ingredients_parent_ingredient_uuid_fkey"
            columns: ["parent_ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
        ]
      }
      measurements: {
        Row: {
          abbreviation: string
          created_at: string | null
          id: string
          multiplier: number | null
          name: string
          name_plural: string
        }
        Insert: {
          abbreviation: string
          created_at?: string | null
          id?: string
          multiplier?: number | null
          name: string
          name_plural: string
        }
        Update: {
          abbreviation?: string
          created_at?: string | null
          id?: string
          multiplier?: number | null
          name?: string
          name_plural?: string
        }
        Relationships: []
      }
      methods: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      public_collection_cocktails: {
        Row: {
          cocktail_id: string | null
          collection_id: string | null
          created_at: string
          id: string
        }
        Insert: {
          cocktail_id?: string | null
          collection_id?: string | null
          created_at?: string
          id?: string
        }
        Update: {
          cocktail_id?: string | null
          collection_id?: string | null
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_collection_cocktails_cocktail_id_fkey"
            columns: ["cocktail_id"]
            isOneToOne: false
            referencedRelation: "cocktails"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_collection_cocktails_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "public_collections"
            referencedColumns: ["id"]
          },
        ]
      }
      public_collections: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      sources: {
        Row: {
          created_at: string | null
          id: string
          name: string
          sub_title: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          sub_title?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          sub_title?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_cocktail:
        | {
            Args: {
              cocktail_id: number
            }
            Returns: Json
          }
        | {
            Args: {
              start_id: number
              end_id: number
            }
            Returns: Json
          }
      delete_function: {
        Args: {
          _name: string
        }
        Returns: number
      }
      foo: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: number
          name: string
          recipes: Json
        }[]
      }
      get_bars_for_user: {
        Args: Record<PropertyKey, never>
        Returns: string[]
      }
      get_collections_for_user: {
        Args: Record<PropertyKey, never>
        Returns: string[]
      }
      gtrgm_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_options: {
        Args: {
          "": unknown
        }
        Returns: undefined
      }
      gtrgm_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      logging_example: {
        Args: {
          log_message: string
          warning_message: string
          error_message: string
        }
        Returns: undefined
      }
      plv8: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      query_bar_stock: {
        Args: {
          bar_id: string
        }
        Returns: Json
      }
      query_cocktails: {
        Args: {
          bar_id: string
          collection_id: string
          filter_ingredients: Json
          search_value: string
        }
        Returns: {
          created_at: string
          id: string
          method_id: string
          note: string
          description: string
          history: string
          name: string
          slug: string
          era_id: string
          invention_date: string
          base_ingredient_id: string
          glass_id: string
          base_ingredient: Json
          glass: Json
          era: Json
          method: Json
          steps: Json
          sources: Json
          components: Json
          optional_components: Json
          related_cocktails: Json
        }[]
      }
      search_cocktails: {
        Args: {
          search_value: string
        }
        Returns: {
          id: string
          name: string
          description: string
          history: string
          components: Json
        }[]
      }
      set_limit: {
        Args: {
          "": number
        }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: {
          "": string
        }
        Returns: string[]
      }
      update_bar_stock: {
        Args: {
          bar_id: string
          ingredient_id: string
        }
        Returns: {
          all_ingredients_by_id: Json
          created_at: string
          id: string
          ingredients_by_id: Json
          is_default: boolean | null
          name: string
          user_id: string | null
        }[]
      }
    }
    Enums: {
      cocktail_component_ingredient_type: "Default" | "Or" | "Recommended"
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
