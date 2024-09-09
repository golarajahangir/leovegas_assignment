import Movie from '../components/Movie';
import '../styles/movies.scss';

import { useSelector } from 'react-redux';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

const MoviesPage = ({ viewTrailer }) => {
  const { movies, fetchStatus } = useSelector((state) => state.movies);
  useInfiniteScroll();
  return (
    <div data-testid='movies' className='movie-grid'>
      {movies?.map((movie) => {
        return <Movie movie={movie} key={movie.id} viewTrailer={viewTrailer} />;
      })}
      {fetchStatus === 'loading' && <p>Loading more movies...</p>}
    </div>
  );
};

export default MoviesPage;
