import React from "react"
import { string } from "yup";

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

export interface PokemonAbility {
  ability: {
    name: string
    url: string
  }
}
export interface PokemonStat {
  base_stat: number
  stat: {
    name: string
    url: string
  }
}

export interface PokemonListResponse {
  results: Pokemon[]
}

export interface PokemonDetailResponse {
  abilities: PokemonAbility[]
  height: number
  sprites: {
    front_default: string
  },
  stats: PokemonStat[],
  weight: number
}

export interface PaginationFCProps {
  next: () => void
  prev: () => void
  jump: (target: number) => void
  currentPage: number
  maxPage: number
}

export interface PokemonDetail {
  name: string
  url: string
  abilities: PokemonAbility[]
  height: number
  stats: PokemonStat[],
  weight: number
}

export interface PokemonModalProps {
  data?: PokemonDetail
  isOpen: boolean
  onDismiss?: () => void
  onClick?: () => void
}