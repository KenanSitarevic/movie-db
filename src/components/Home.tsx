import {useState} from 'react'
import { ActiveTab } from '../types/activeTab'

import TabButton from "./TabButton"
import SearchBar from './SearchBar'
import MovieCard from './MovieCard'

const Home = () => {
  const [activeTab, setActiveTab] = useState(ActiveTab.Movies)

  return (
    <div className='full-screen'>
      <div className='bg-dark color-white'>
        <h1 className='margin-0 padding-1 font-title'>Movies DB</h1>
      </div>
      <div className='flex'>
        <TabButton name="Movies" isActive={activeTab == ActiveTab.Movies} handleClick={() => {setActiveTab(ActiveTab.Movies)}} />
        <TabButton name="TV Shows" isActive={activeTab == ActiveTab.TVshows} handleClick={() => {setActiveTab(ActiveTab.TVshows)}} />
      </div>
      <div className='flex padding-half full-wdith'>
        <SearchBar />
      </div>

      <div className='flex wrap flex-between gap-1 padding-1'>
        <MovieCard title="Blade" desc="Vampire Hunter" />
        <MovieCard title="Blade" desc="Vampire Hunter" />
        <MovieCard title="Blade" desc="Vampire Hunter" />
        <MovieCard title="Blade" desc="Vampire Hunter" />
        <MovieCard title="Blade" desc="Vampire Hunter" />
      </div>
    </div>
  )
}

export default Home