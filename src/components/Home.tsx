import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useGlobalContext } from '../contexts/GlobalContext'
import { ColorRing } from 'react-loader-spinner'

import { ActiveTab } from '../types/activeTab'
import { Movie } from '../types/movies'
import { Show } from '../types/shows'
import { getTopTenMovies, getTopTenShows, searchMovies, searchShows } from '../apis'
import TabButton from "./TabButton"
import SearchBar from './SearchBar'
import MovieCard from './MovieCard'

const Home = () => {
  const { searchInput , globalActiveTab, setGlobalActiveTab} = useGlobalContext()
  const [isTopTenShowsAlreadyFetched, setIsTopTenShowsAlreadyFetched] = useState(false)
  const [isTopTenMoviesAlreadyFetched, setIsTopTenMoviesAlreadyFetched] = useState(false)
  const [activeTab, setActiveTab] = useState(ActiveTab.TVshows)
  const [loading, setLoading] = useState(false)
  const [localSearchInput, setLocalSearchInput] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])
  const [shows, setShows] = useState<Show[]>([])
  const navigate = useNavigate();

  async function fetchMovies() {
    try {
      setLoading(true)
      const response = await getTopTenMovies();
      if (response?.length) setMovies(response)
        console.log(response);
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
    setLocalSearchInput(input)
    if (input.length<3) return;
    
    if (activeTab == ActiveTab.Movies) {
      try {
        setLoading(true)
        const response = await searchMovies(input);
        if (response?.length) setMovies(response)
        console.log(response.length);
        
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
        console.log(response);
      } catch (e) {
        console.error(e)
        setShows([])
      } finally {
        setLoading(false)
      
    }
  }
}

  const changeTab = (newTab: ActiveTab) => {
    setActiveTab(newTab);
    setGlobalActiveTab(newTab)
  }

  const openDetailedView = (type : Movie | Show) => {
    activeTab == ActiveTab.Movies ? navigate("/movie/" + type.id) : navigate("/show/" + type.id)
    
  }
  
  useEffect(() => {
    setActiveTab(globalActiveTab)
    setLocalSearchInput(searchInput)
    
    if (searchInput.length > 2 ) {
      search(searchInput).then(()=>{
        setIsTopTenShowsAlreadyFetched(false)
        setIsTopTenMoviesAlreadyFetched(false)
        setLocalSearchInput(searchInput)
        
      })
    }
    else {
      if (activeTab == ActiveTab.Movies && !isTopTenMoviesAlreadyFetched ){ 
        fetchMovies().then(()=>{
          setIsTopTenMoviesAlreadyFetched(true)
          setIsTopTenShowsAlreadyFetched(false)
        })
        
      }
      else if (activeTab == ActiveTab.TVshows && !isTopTenShowsAlreadyFetched ){
        fetchShows().then(()=>{
          setIsTopTenShowsAlreadyFetched(true)
          setIsTopTenMoviesAlreadyFetched(false)
        })
        
      }
    }
  }, [localSearchInput, activeTab])

  useEffect(() => {
    
    if (searchInput.length < 3)
      setLocalSearchInput(searchInput)
  
  }, [searchInput])
  

  return (
    <div className='full-screen'>
      <div className='bg-dark color-white'>
        <h1 data-test="app-header" className='margin-0 padding-1 font-title'>Movies DB</h1>
      </div>
      <div className='flex'>
        <TabButton name="Movies" isActive={activeTab == ActiveTab.Movies} handleClick={() => {changeTab(ActiveTab.Movies)}} />
        <TabButton name="TV Shows" isActive={activeTab == ActiveTab.TVshows} handleClick={() => {changeTab(ActiveTab.TVshows)}} />
      </div>
      <div className='flex padding-half full-wdith'>
        <SearchBar search={search}/>
      </div>

      {loading && <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={['#1FBAB8', '#1FBAB8', '#1FBAB8', '#1FBAB8', '#1FBAB8']}
                    />}
      
      {!loading && (
      <div className='flex wrap flex-between gap-1 padding-1'>
        {(activeTab === ActiveTab.Movies &&  movies.length > 0) && movies.map((movie, index) => (
          <MovieCard key={index} title={movie.title} desc={movie.overview} img={movie.poster_path} handleClick={() => {openDetailedView(movie)}}/>
        ))}
        
        {activeTab === ActiveTab.TVshows && shows.length > 0 && shows.map((show, index) => (
          <MovieCard key={index} title={show.name} desc={show.overview} img={show.poster_path} handleClick={() => {openDetailedView(show)}} />
        ))}
      </div>

      )}




    </div>
  )
}

export default Home