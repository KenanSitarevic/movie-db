const MovieCard = (props) => {
  return (
    <div className="flex column padding-1 movie-card">
      <div className="movie-card-image" style={{backgroundImage: 'url(https://rukminim2.flixcart.com/image/416/416/jf8khow0/poster/a/u/h/small-hollywood-movie-poster-blade-runner-2049-ridley-scott-original-imaf3qvx88xenydd.jpeg?q=70&crop=false)'}} />
      <h5>{props.title}</h5>
      <p>{props.desc}</p>
    </div>
  )
}

export default MovieCard