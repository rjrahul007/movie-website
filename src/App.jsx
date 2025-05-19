import { useEffect, useState } from "react";
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite.js";
import MoviePage from "./components/MoviePage.jsx";
import Footer from "./components/Footer.jsx";
const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  // Router state
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  // Search state
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Movies state
  const [movieList, setMovieList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);

  // Check URL for movie ID on component mount
  useEffect(() => {
    const path = window.location.pathname;
    const match = path.match(/\/movie\/(\d+)/);
    if (match && match[1]) {
      setSelectedMovieId(parseInt(match[1]));
    }
  }, []);

  // Debounce the search term to prevent making too many API requests
  // by waiting for the user to stop typing for 500ms
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();

      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error Fetching Trending Movies: ${error}`);
    }
  };

  // Handle movie selection
  const handleMovieClick = (movieId) => {
    setSelectedMovieId(movieId);
    // window.history.pushState({}, "", `/movie/${movieId}`);
    window.location.href = `/movie/${movieId}`;
    window.scrollTo(0, 0);
  };

  // Handle back to list
  const handleBackToList = () => {
    setSelectedMovieId(null);
    window.location.href = "/";
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  if (selectedMovieId) {
    return <MoviePage id={selectedMovieId} onBack={handleBackToList} />;
  }

  return (
    <main className="overflow-hidden">
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero-img.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) => (
                <li
                  key={movie.$id}
                  onClick={() => handleMovieClick(movie.id)}
                  style={{ cursor: "pointer" }}
                >
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2>
            {debouncedSearchTerm
              ? `Results for "${debouncedSearchTerm}"`
              : "All Movies"}
          </h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <div key={movie.id} onClick={() => handleMovieClick(movie.id)}>
                  <MovieCard movie={movie} />
                </div>
              ))}
            </ul>
          )}
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default App;
