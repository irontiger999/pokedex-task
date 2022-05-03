import React from "react"

export interface AuthProviderProps {
  children: React.ReactNode
}
export interface User {
  name?: string
  dob?: number
}

export interface PaginationProps {
  data: any[];
  itemsPerPage: number;
}

export interface Pokemon {
  name: string
  url: string
}

export interface PokemonListResponse {
  results: Pokemon[]
}

export interface PokemonDetailResponse {
  sprites: {
    front_default: string
  }
}

export interface PaginationFCProps {
  next: () => void
  prev: () => void
  jump: (target: number) => void
  currentPage: number
  maxPage: number
}