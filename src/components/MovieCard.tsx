const MovieCard = (props) => {
  return (
    <div className="flex column padding-1 movie-card">
      <div className="movie-card-image" style={{backgroundImage: 'url(https://image.tmdb.org/t/p/w500/' + props.img + ')'}} />
      <h5>{props.title}</h5>
      <p>{props.desc.length > 100 ? props.desc.slice(0,100) + '...' : props.desc}</p>
    </div>
  )
}

export default MovieCard