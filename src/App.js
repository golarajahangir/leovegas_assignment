import { Routes, Route, useSearchParams } from 'react-router-dom';
import Header from './components/Header';
import MoviesPage from './pages/MoviesPage';
import StarredPage from './pages/StarredPage';
import WatchLaterPage from './pages/WatchLaterPage';
import YouTubePlayer from './components/YoutubePlayer';
import { Modal } from './components/Modal';
import './app.scss';
import useMovies from './hooks/useMovies';

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchMovies, viewTrailer, videoKey, isOpen, closeModal } = useMovies(
    searchParams,
    setSearchParams
  );

  return (
    <div className='App'>
      <Header
        searchMovies={searchMovies}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      <div className='container'>
        {isOpen && (
          <Modal closeModal={closeModal}>
            {videoKey ? (
              <YouTubePlayer videoKey={videoKey} />
            ) : (
              <div style={{ padding: '30px' }}>
                <h6>No trailer available. Try another movie.</h6>
              </div>
            )}
          </Modal>
        )}

        <Routes>
          <Route path='/' element={<MoviesPage viewTrailer={viewTrailer} />} />
          <Route
            path='/starred'
            element={<StarredPage viewTrailer={viewTrailer} />}
          />
          <Route
            path='/watch-later'
            element={<WatchLaterPage viewTrailer={viewTrailer} />}
          />
          <Route
            path='*'
            element={<h1 className='not-found'>Page Not Found</h1>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
