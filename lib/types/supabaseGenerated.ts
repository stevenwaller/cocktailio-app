export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      cocktails: {
        Row: {
          base_ingredient_id: string | null
          created_at: string | null
          description: string | null
          history: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          base_ingredient_id?: string | null
          created_at?: string | null
          description?: string | null
          history?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          base_ingredient_id?: string | null
          created_at?: string | null
          description?: string | null
          history?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: 'public_cocktails_base_ingredient_uuid_fkey'
            columns: ['base_ingredient_id']
            isOneToOne: false
            referencedRelation: 'ingredients'
            referencedColumns: ['id']
          }
        ]
      }
      ingredients: {
        Row: {
          created_at: string | null
          description: string | null
          hierarchy: string[] | null
          history: string | null
          id: string
          ingredient_type: Database['public']['Enums']['ingredient_types'] | null
          name: string
          order: number | null
          parent_ingredient_id: string | null
          slug: string
          type: Database['public']['Enums']['ingredient_type']
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          hierarchy?: string[] | null
          history?: string | null
          id?: string
          ingredient_type?: Database['public']['Enums']['ingredient_types'] | null
          name: string
          order?: number | null
          parent_ingredient_id?: string | null
          slug: string
          type: Database['public']['Enums']['ingredient_type']
        }
        Update: {
          created_at?: string | null
          description?: string | null
          hierarchy?: string[] | null
          history?: string | null
          id?: string
          ingredient_type?: Database['public']['Enums']['ingredient_types'] | null
          name?: string
          order?: number | null
          parent_ingredient_id?: string | null
          slug?: string
          type?: Database['public']['Enums']['ingredient_type']
        }
        Relationships: [
          {
            foreignKeyName: 'public_ingredients_parent_ingredient_uuid_fkey'
            columns: ['parent_ingredient_id']
            isOneToOne: false
            referencedRelation: 'ingredients'
            referencedColumns: ['id']
          }
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
      recipe_component_ingredients: {
        Row: {
          created_at: string | null
          id: string
          ingredient_id: string | null
          recipe_component_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          ingredient_id?: string | null
          recipe_component_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          ingredient_id?: string | null
          recipe_component_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'public_recipe_component_ingredients_ingredient_id_fkey'
            columns: ['ingredient_id']
            isOneToOne: false
            referencedRelation: 'ingredients'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_recipe_component_ingredients_recipe_component_id_fkey'
            columns: ['recipe_component_id']
            isOneToOne: false
            referencedRelation: 'recipe_components'
            referencedColumns: ['id']
          }
        ]
      }
      recipe_component_or_ingredients: {
        Row: {
          created_at: string | null
          id: string
          ingredient_id: string | null
          recipe_component_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          ingredient_id?: string | null
          recipe_component_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          ingredient_id?: string | null
          recipe_component_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'public_recipe_component_or_ingredients_ingredient_id_fkey'
            columns: ['ingredient_id']
            isOneToOne: false
            referencedRelation: 'ingredients'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_recipe_component_or_ingredients_recipe_component_uuid_fk'
            columns: ['recipe_component_id']
            isOneToOne: false
            referencedRelation: 'recipe_components'
            referencedColumns: ['id']
          }
        ]
      }
      recipe_component_pref_ingredients: {
        Row: {
          created_at: string | null
          id: string
          ingredient_id: string | null
          recipe_component_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          ingredient_id?: string | null
          recipe_component_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          ingredient_id?: string | null
          recipe_component_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'public_recipe_component_pref_ingredients_ingredient_id_fkey'
            columns: ['ingredient_id']
            isOneToOne: false
            referencedRelation: 'ingredients'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_recipe_component_pref_ingredients_recipe_component_uuid_'
            columns: ['recipe_component_id']
            isOneToOne: false
            referencedRelation: 'recipe_components'
            referencedColumns: ['id']
          }
        ]
      }
      recipe_components: {
        Row: {
          amount: number | null
          amount_max: number | null
          created_at: string | null
          description: string | null
          id: string
          measurement_id: string | null
          optional: boolean | null
          recipe_id: string | null
        }
        Insert: {
          amount?: number | null
          amount_max?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          measurement_id?: string | null
          optional?: boolean | null
          recipe_id?: string | null
        }
        Update: {
          amount?: number | null
          amount_max?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          measurement_id?: string | null
          optional?: boolean | null
          recipe_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'public_recipe_components_measurement_uuid_fkey'
            columns: ['measurement_id']
            isOneToOne: false
            referencedRelation: 'measurements'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_recipe_components_recipe_uuid_fkey'
            columns: ['recipe_id']
            isOneToOne: false
            referencedRelation: 'recipes'
            referencedColumns: ['id']
          }
        ]
      }
      recipe_garnishes: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          ingredient_id: string | null
          name: string
          recipe_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          ingredient_id?: string | null
          name: string
          recipe_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          ingredient_id?: string | null
          name?: string
          recipe_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'public_recipe_garnishes_ingredient_uuid_fkey'
            columns: ['ingredient_id']
            isOneToOne: false
            referencedRelation: 'ingredients'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_recipe_garnishes_recipe_uuid_fkey'
            columns: ['recipe_id']
            isOneToOne: false
            referencedRelation: 'recipes'
            referencedColumns: ['id']
          }
        ]
      }
      recipe_steps: {
        Row: {
          created_at: string | null
          description: string
          id: string
          order: number
          recipe_id: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          order: number
          recipe_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          order?: number
          recipe_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'public_recipe_steps_recipe_uuid_fkey'
            columns: ['recipe_id']
            isOneToOne: false
            referencedRelation: 'recipes'
            referencedColumns: ['id']
          }
        ]
      }
      recipes: {
        Row: {
          base_ingredient_hierarchy: number[] | null
          cocktail_id: string | null
          created_at: string | null
          description: string | null
          id: string
          ingredient_brands: number[] | null
          ingredient_categories: number[] | null
          ingredient_kinds: number[] | null
          ingredient_types: number[] | null
          source_id: string | null
        }
        Insert: {
          base_ingredient_hierarchy?: number[] | null
          cocktail_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          ingredient_brands?: number[] | null
          ingredient_categories?: number[] | null
          ingredient_kinds?: number[] | null
          ingredient_types?: number[] | null
          source_id?: string | null
        }
        Update: {
          base_ingredient_hierarchy?: number[] | null
          cocktail_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          ingredient_brands?: number[] | null
          ingredient_categories?: number[] | null
          ingredient_kinds?: number[] | null
          ingredient_types?: number[] | null
          source_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'public_recipes_cocktail_uuid_fkey'
            columns: ['cocktail_id']
            isOneToOne: false
            referencedRelation: 'cocktails'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_recipes_source_uuid_fkey'
            columns: ['source_id']
            isOneToOne: false
            referencedRelation: 'sources'
            referencedColumns: ['id']
          }
        ]
      }
      sources: {
        Row: {
          created_at: string | null
          id: string
          sub_title: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          sub_title?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          id?: string
          sub_title?: string | null
          title?: string
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
      foo: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: number
          name: string
          recipes: Json
        }[]
      }
      plv8: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      query_cocktails: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
    }
    Enums: {
      ingredient_type: 'Category' | 'Base Ingredient' | 'Ingredient' | 'Brand'
      ingredient_types: 'Category' | 'Kind' | 'Type' | 'Brand'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
        Database['public']['Views'])
    ? (Database['public']['Tables'] &
        Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends keyof Database['public']['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never
