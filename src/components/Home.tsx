import { useState, useEffect } from 'react'

import { ActiveTab } from '../types/activeTab'
import { Movie } from '../types/movies'
import { Show } from '../types/shows'

import { getTopTenMovies, getTopTenShows } from '../apis'

import TabButton from "./TabButton"
import SearchBar from './SearchBar'
import MovieCard from './MovieCard'

const Home = () => {
  const [activeTab, setActiveTab] = useState(ActiveTab.TVshows)
  const [loading, setLoading] = useState(false)
  const [movies, setMovies] = useState<Movie[]>([])
  const [shows, setShows] = useState<Show[]>([])
  
  async function fetchMovies() {
    try {
      setLoading(true)
      const response = await getTopTenMovies();
      if (response?.length) setMovies(response)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  async function fetchShows() {
    try {
      setLoading(true)
      const response = await getTopTenShows();
      if (response?.length) setShows(response)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const changeTab = (newTab: ActiveTab) => {
    setActiveTab(newTab);
    if (newTab === ActiveTab.Movies) return fetchMovies();
    else if (newTab === ActiveTab.TVshows) return fetchShows();
  }
  
  useEffect(() => {
    fetchShows();
  }, [])

  return (
    <div className='full-screen'>
      <div className='bg-dark color-white'>
        <h1 className='margin-0 padding-1 font-title'>Movies DB</h1>
      </div>
      <div className='flex'>
        <TabButton name="Movies" isActive={activeTab == ActiveTab.Movies} handleClick={() => {changeTab(ActiveTab.Movies)}} />
        <TabButton name="TV Shows" isActive={activeTab == ActiveTab.TVshows} handleClick={() => {changeTab(ActiveTab.TVshows)}} />
      </div>
      <div className='flex padding-half full-wdith'>
        <SearchBar />
      </div>

      {!loading && (
      <div className='flex wrap flex-between gap-1 padding-1'>
        {activeTab === ActiveTab.Movies && movies.map((movie, index) => (
          <MovieCard key={index} title={movie.title} desc={movie.overview} img={movie.poster_path} />
        ))}
        {activeTab === ActiveTab.TVshows && shows.map((show, index) => (
          <MovieCard key={index} title={show.name} desc={show.overview} img={show.poster_path} />
        ))}
      </div>
      )}
    </div>
  )
}

export default Home