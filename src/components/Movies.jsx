import Movie from './Movie';
import '../styles/movies.scss';

import { useSelector } from 'react-redux';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

const Movies = ({ viewTrailer, closeCard }) => {
  const { movies, fetchStatus } = useSelector((state) => state.movies);
  useInfiniteScroll();
  return (
    <div data-testid='movies' className='movie-grid'>
      {movies?.map((movie) => {
        return (
          <Movie
            movie={movie}
            key={movie.id}
            viewTrailer={viewTrailer}
            closeCard={closeCard}
          />
        );
      })}
      {fetchStatus === 'loading' && <p>Loading more movies...</p>}
    </div>
  );
};

export default Movies;
