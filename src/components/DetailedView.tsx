import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { ColorRing } from 'react-loader-spinner'

import { ActiveTab } from '../types/activeTab'

import { getMovieDetails, getShowDetails, getMovieVideos, getShowVideos } from '../apis'
import { MovieDetailed } from '../types/movieDetailed'
import { ShowDetailed } from '../types/showDetailed'

const DetailedView = () => {
  const [type, setType] = useState(ActiveTab.TVshows)
  const [loading, setLoading] = useState(false)
  const [movie, setMovie] = useState<MovieDetailed>()
  const [show, setShow] = useState<ShowDetailed>()
  const location = useLocation();

  const [movieVideo, setMovieVideo] = useState();
  const [showVideo, setShowVideo] = useState();

  const fetchMovieDetails = async (id:string) => {
    try {
      setLoading(true)
      const response = await getMovieDetails(id);
      if (response) {
        await fetchMovieVideo(id)
        setMovie(response)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const fetchMovieVideo = async (id:string) => {
    try {
      setLoading(true)
      const response = await getMovieVideos(id)
      if (response) setMovieVideo(response.results)
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
      if (response) {
        await fetchShowVideo(id)
        setShow(response)
      }
    } catch (e) {
      console.error("heej majmunee")
    } finally {
      setLoading(false)
    }
  }

  const fetchShowVideo = async (id:string) => {
    try {
      setLoading(true)
      const response = await getShowVideos(id);
      if (response.results.length > 0) setShowVideo(response.results)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
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
      {loading && <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={['#1FBAB8', '#1FBAB8', '#1FBAB8', '#1FBAB8', '#1FBAB8']}
                    />}

      { type == ActiveTab.TVshows && !loading && <div className='full-width text-center'>
        <h2 data-test={show?.title}>{show?.name} ({new Date(show?.first_air_date).getFullYear()})</h2>
        {show?.name != show?.original_name && <h3>Original title: {show?.original_name}</h3>}
        <h4 className='italic color-light font-thin'>{movie?.tagline}</h4>
        <h3>Rating: {show?.vote_average}</h3>
        {showVideo ?
          <div className='flex flex-center'>
            <ReactPlayer url={'https://www.youtube.com/watch?v=' + showVideo[0]?.key} />
          </div>
          :
           <img src={"https://image.tmdb.org/t/p/w500/" + show?.poster_path} alt="" />
        }
        <p>{show?.overview}</p>
      </div>}

      
      { type == ActiveTab.Movies && !loading && <div className='full-width text-center'>
        <h2 data-test={movie?.title} >{movie?.title} ({new Date(movie?.release_date).getFullYear()})</h2>
        {movie?.title != movie?.original_title && <h3>Original title: {movie?.original_title}</h3>}
        <h4 className='italic color-light font-thin'>{movie?.tagline}</h4>
        <h3>Rating: {movie?.vote_average}</h3>
        {movieVideo ?
          <div className='flex flex-center'>
            <ReactPlayer url={'https://www.youtube.com/watch?v=' + movieVideo[0].key} />
          </div>
          :
          <img src={"https://image.tmdb.org/t/p/w500/" + movie?.poster_path} alt="" />
        }
        <p>{movie?.overview}</p>
      </div>}
    

    
    </div>
    
  
  )
}

export default DetailedView