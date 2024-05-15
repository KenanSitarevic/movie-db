import { useState } from 'react'
import { RouterProvider } from 'react-router-dom';
import { router } from './routes'
import { GlobalContext } from './contexts/GlobalContext';
import { Movie } from './types/movies';
import { Show } from './types/shows';
import { ActiveTab } from './types/activeTab';
function App() {
  const [globalActiveTab, setGlobalActiveTab] = useState<ActiveTab>(ActiveTab.TVshows)
  const [searchInput, setSearchInput] = useState('')
  const [topMovies, setTopMovies] = useState<Movie[]>([])
  const [topShows, setTopShows] = useState<Show[]>([])

  const data = {globalActiveTab, setGlobalActiveTab, searchInput, setSearchInput, topMovies, setTopMovies, topShows, setTopShows}
  
  return (
    <GlobalContext.Provider value={data}>
      <RouterProvider router={router} />
    </GlobalContext.Provider>
  )
}

export default App;