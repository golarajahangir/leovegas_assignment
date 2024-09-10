import Movie from '../components/Movie';
import '../styles/movies.scss';

import { useSelector } from 'react-redux';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

const MoviesPage = ({ viewTrailer }) => {
  const { movies, fetchStatus, error } = useSelector((state) => state.movies);
  useInfiniteScroll();
  return (
    <div data-testid='movies' className='movie-grid'>
      {movies?.map((movie) => {
        return <Movie movie={movie} key={movie.id} viewTrailer={viewTrailer} />;
      })}
      {fetchStatus === 'loading' && <p>Loading more movies...</p>}
      {fetchStatus === 'error' && <p>{error}</p>}
    </div>
  );
};

export default MoviesPage;
