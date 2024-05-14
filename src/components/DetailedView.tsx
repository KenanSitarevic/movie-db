import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { ActiveTab } from '../types/activeTab'
import { Movie } from '../types/movies'
import { Show } from '../types/shows'

import { getMovieDetails, getShowDetails } from '../apis'

const DetailedView = () => {
  const [type, setType] = useState(ActiveTab.TVshows)
  const [loading, setLoading] = useState(false)
  const [movie, setMovie] = useState<Movie>()
  const [show, setShow] = useState<Show>()
  const location = useLocation();

  const fetchMovieDetails = async (id:string) => {
    try {
      setLoading(true)
      const response = await getMovieDetails(id);
      if (response) setMovie(response)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const fetchShowDetails = async (id:string) => {
    try {
      setLoading(true)
      const response = await getShowDetails(id);
      if (response) setShow(response)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log(location);
    const routePaths = location.pathname.split('/')
    if (routePaths[1] === 'movie') {
      setType(ActiveTab.Movies)
      fetchMovieDetails(routePaths[2]);

    }
    if (routePaths[1] === 'show') {
      setType(ActiveTab.TVshows)
      fetchShowDetails(routePaths[2]);
    }
  }, [])
  

  return (
    <div className='full-screen'>
      <div className='bg-dark color-white'>
        <h1 className='margin-0 padding-1 font-title'>Movies DB</h1>
      </div>

      { type == ActiveTab.TVshows && <div className='full-width text-center'>
        <h2>{show?.name}</h2>
        {show?.name != show?.original_name && <h3>Original title: {show?.name}</h3>}
        <h3>Rating: {show?.vote_average}</h3>
        <div className="movie-card-image" style={{backgroundImage: 'url(https://image.tmdb.org/t/p/w500/' + show?.poster_path + ')'}} />
        <p>{show?.overview}</p>

      </div>}


      { type == ActiveTab.Movies && <div className='full-width text-center'>
        <h2>{movie?.title}</h2>
        {movie?.title != movie?.original_title && <h3>Original title: {movie?.original_title}</h3>}
        <h3>Rating: {movie?.vote_average}</h3>
        <div className="movie-detail-image " style={{backgroundImage: 'url(https://image.tmdb.org/t/p/w500/' + movie?.poster_path + ')'}} />
        <p>{movie?.overview}</p>
      </div>}
    

    
    </div>
    
  
  )
}

export default DetailedView