
// eslint-disable-next-line react/prop-types
const MovieCard = ({movie}) => {
    
    // eslint-disable-next-line react/prop-types
    const imagenUrl = "http://image.tmdb.org/t/p/w300"+ movie.poster_path;
    
    
    return (
    
    <li>
        <img 
        width={230}
        height={345}
        src={imagenUrl} 
        alt={MovieCard.title} />

        <div>{MovieCard.title}</div>
    </li>
    
  )
}

export default MovieCard

