import { createContext, useContext } from "react"
import { ActiveTab } from "../types/activeTab"
import { Movie } from "../types/movies"
import { Show } from "../types/shows"
export type GlobalContent = {
  globalActiveTab: ActiveTab
  setGlobalActiveTab:(tab: ActiveTab) => void

  searchInput: string
  setSearchInput:(search: string) => void

  topMovies: Movie[]
  setTopMovies:(movies: Movie[]) => void

  topShows: Show[]
  setTopShows:(shows: Show[]) => void
}
export const GlobalContext = createContext<GlobalContent>({
  globalActiveTab: ActiveTab.TVshows,
  setGlobalActiveTab: () => {},

  searchInput: '',
  setSearchInput: () => {},

  topMovies: [],
  setTopMovies: () => {},

  topShows: [],
  setTopShows: () => {},
})
export const useGlobalContext = () => useContext(GlobalContext)