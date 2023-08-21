import { useState, useEffect } from 'react'
import "./App.scss";
import SearchIcon from './assets/search.svg'
import MovieCard from './components/MovieCard';

function App() {
 
  //hook to storage movies
  const [movies, setMovies] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchMovies(searchTerm);
    }
  }

  const searchMovies = async (title) => {

    //Get data from API
    const response = await fetch(`${import.meta.env.VITE_API_URL}&s=${title}`);
      
    //Transform to json.
    const data = await response.json();

    //load movies into hook.
    setMovies(data.Search);
  }

  //useEffect hook charges when the page loads.
  useEffect(() => {
    searchMovies('Avengers');
  }, []);
    
  return (
    <div className='app'>
      <h1>Movie Listings</h1>
      <div className='search'>
        <input 
          placeholder='Search'
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
          onKeyDown={handleKeyDown}
        />
        <img 
          src={SearchIcon} 
          alt="search"
          onClick={() => searchMovies(searchTerm)} 
        />
      </div>
      {
          //if movies is an array an length > 0 then
          movies?.length > 0 ? (
            <div className='container'>
              {movies.map((movie, i) => (
                <MovieCard key={'#'+i} movie={movie} />
              ))}
            </div>
        //else
        ) : (
          <div className='empty'>
              <h2>No movies found</h2>
          </div>
        )
      }
    </div>
  )
}

export default App
