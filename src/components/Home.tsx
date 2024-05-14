import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"

import { ActiveTab } from '../types/activeTab'
import { Movie } from '../types/movies'
import { Show } from '../types/shows'
import { getTopTenMovies, getTopTenShows, searchMovies, searchShows } from '../apis'
import TabButton from "./TabButton"
import SearchBar from './SearchBar'
import MovieCard from './MovieCard'

const Home = () => {
  const [activeTab, setActiveTab] = useState(ActiveTab.TVshows)
  const [loading, setLoading] = useState(false)
  const [searchInput, setsearchInput] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])
  const [shows, setShows] = useState<Show[]>([])
  const navigate = useNavigate();

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

  async function search(input: string) {
    setsearchInput(input)
    if (input.length<3) return;
    if (activeTab == ActiveTab.Movies) {
      try {
        setLoading(true)
        const response = await searchMovies(input);
        if (response?.length) setMovies(response)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }}
    else {
      try {
        setLoading(true)
        const response = await searchShows(input);
        if (response?.length) setShows(response)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      
    }
  }
}

  const changeTab = (newTab: ActiveTab) => {
    setActiveTab(newTab);
  }

  const openDetailedView = (type : Movie | Show) => {
    activeTab == ActiveTab.Movies ? navigate("/movie/" + type.id) : navigate("/show/" + type.id)
    
  }
  
  useEffect(() => {
    if (searchInput.length > 2) {
      search(searchInput)
    }
    else {
      if (activeTab == ActiveTab.Movies) fetchMovies() 
      else fetchShows()
    }
  }, [searchInput, activeTab])

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
        <SearchBar search={search}/>
      </div>

      {!loading && (
      <div className='flex wrap flex-between gap-1 padding-1'>
        {activeTab === ActiveTab.Movies && movies.map((movie, index) => (
          <MovieCard key={index} title={movie.title} desc={movie.overview} img={movie.poster_path} handleClick={() => {openDetailedView(movie)}}/>
        ))}
        {activeTab === ActiveTab.TVshows && shows.map((show, index) => (
          <MovieCard key={index} title={show.name} desc={show.overview} img={show.poster_path} handleClick={() => {openDetailedView(show)}} />
        ))}
      </div>
      )}
    </div>
  )
}

export default Home