export interface Category { id: string; name: string }
export interface LeanFunction {
  id: string
  created_at: string
  name: string
  title: string
  language: string
  code: string
  description: string
  difficulty: "easy" | "medium" | "hard"
  categories: string[]
  likes_count: number
  views_count: number
  use_count: number
  time_complexity: string
  space_complexity: string
  for_run: string
  version: string
  file_end: string
}