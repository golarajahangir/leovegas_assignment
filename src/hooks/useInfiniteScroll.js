import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../data/moviesSlice';
import { ENDPOINT_DISCOVER } from '../constants';

const useInfiniteScroll = () => {
  const dispatch = useDispatch();
  const { currentPage, fetchStatus, hasMore } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        fetchStatus !== 'loading' &&
        hasMore
      ) {
        dispatch(
          fetchMovies(
            `${ENDPOINT_DISCOVER}&page=` + +(parseInt(currentPage, 10) + 1)
          )
        );
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage, fetchStatus, hasMore, dispatch]);
};

export default useInfiniteScroll;
