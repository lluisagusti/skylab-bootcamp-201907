function MovieItem({ movie, onToggle }) {

    return <>
    {/* Only displayed after query search or click on a collection. 
    Composed by a grid of movie items with title, rating, poster and a fav button */}
        <img className="mosaic" src={`http://image.tmdb.org/t/p/w342/${movie.poster_path}`} />
        <div className="mosaicFooter">
        <h3>{ movie.original_title }</h3>
        <span>{movie.vote_average}</span>
        <span>{ movie.release_date }</span>
        <FavButton active={movie.favorite} onToggle={() => onToggle(movie.id.toString())} />
        </div>
    </>
}
