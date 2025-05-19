import React, { useState, useEffect } from "react";

const MoviePage = ({ id, onBack }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailerKey, setTrailerKey] = useState("");

  // Genres list for display
  const genresList = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 18, name: "Drama" },
    { id: 27, name: "Horror" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 53, name: "Thriller" },
  ];

  // Mock fetch movie data - replace with actual API calls
  useEffect(() => {
    // Simulating API fetch for movie details
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch from TMDB API
        // Example: const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);

        // For demo, using mock data
        setTimeout(() => {
          setMovie({
            id: 1,
            title: "Fight Club",
            overview:
              "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground 'fight clubs' forming in every town, until a sensuous eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
            poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
            backdrop_path: "/hZkgoQYus5ve9vM47QvbbSzrmJ0.jpg",
            vote_average: 8.8,
            vote_count: 25000,
            release_date: "1999-10-15",
            runtime: 139,
            genres: [
              { id: 18, name: "Drama" },
              { id: 53, name: "Thriller" },
              { id: 80, name: "Crime" },
            ],
            original_language: "en",
            tagline: "Mischief. Mayhem. Soap.",
            director: "David Fincher",
            cast: [
              {
                name: "Edward Norton",
                character: "The Narrator",
                profile_path: "/5XBzD5WuTyVQZeS4VI25z2moMeY.jpg",
              },
              {
                name: "Brad Pitt",
                character: "Tyler Durden",
                profile_path: "/kU3B75TyRiCgE270EyZnHjfivoq.jpg",
              },
              {
                name: "Helena Bonham Carter",
                character: "Marla Singer",
                profile_path: "/DDeITcCpnBd0CkAIRPhggy9bt3.jpg",
              },
              {
                name: "Meat Loaf",
                character: "Robert 'Bob' Paulson",
                profile_path: "/7gUZUt5WtA5kLFHHW5uiD12DVGs.jpg",
              },
            ],
          });

          // Mock trailer key
          setTrailerKey("BdJKm16Co6M");
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="text-2xl font-bold text-white">Loading...</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="text-2xl font-bold text-white">Movie not found</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <button
          onClick={onBack}
          className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 mr-1"
          >
            <path
              fillRule="evenodd"
              d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
              clipRule="evenodd"
            />
          </svg>
          Back to Movies
        </button>
      </div>

      {/* Hero Section with Backdrop */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(13,17,23,1)), 
          url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="container mx-auto px-4 pt-32 pb-10 flex items-end h-full">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="w-48 h-72 flex-shrink-0 rounded-lg overflow-hidden shadow-lg">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/No-Poster.png"
                }
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Movie Info */}
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
              <div className="flex items-center gap-3 text-sm mb-4">
                <span>{new Date(movie.release_date).getFullYear()}</span>
                <span>•</span>
                <span>
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </span>
                <span>•</span>
                <span className="uppercase">{movie.original_language}</span>
              </div>

              {/* Ratings */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 mr-1 text-yellow-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <span className="font-bold text-xl">
                      {movie.vote_average.toFixed(1)}
                    </span>
                    <span className="text-gray-400 text-sm">/10</span>
                    <div className="text-xs text-gray-400">
                      {(movie.vote_count / 1000).toFixed(1)}K ratings
                    </div>
                  </div>
                </div>

                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-semibold transition-colors">
                  Rate This
                </button>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-gray-800 px-3 py-1 rounded-full text-xs"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <p className="text-gray-300 italic mb-4">{movie.tagline}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Overview & Trailer */}
          <div className="lg:col-span-2">
            {/* Overview */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
            </section>

            {/* Trailer */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Trailer</h2>
              <div className="relative pt-[56.25%] w-full">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  title={`${movie.title} Trailer`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </section>

            {/* Cast */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Top Cast</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {movie.cast.map((person, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 rounded-lg overflow-hidden"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={
                          person.profile_path
                            ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                            : "/no-profile.png"
                        }
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <p className="font-semibold text-sm truncate">
                        {person.name}
                      </p>
                      <p className="text-gray-400 text-xs truncate">
                        {person.character}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Details & More */}
          <div>
            {/* Details */}
            <section className="bg-gray-800 rounded-lg p-4 mb-6">
              <h3 className="text-xl font-bold mb-3">Details</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400 block text-sm">
                    Release Date
                  </span>
                  <span>
                    {new Date(movie.release_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block text-sm">Director</span>
                  <span>{movie.director}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-sm">Language</span>
                  <span>
                    {movie.original_language === "en"
                      ? "English"
                      : movie.original_language === "es"
                      ? "Spanish"
                      : movie.original_language === "fr"
                      ? "French"
                      : movie.original_language}
                  </span>
                </div>
              </div>
            </section>

            {/* Where to Watch */}
            <section className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-xl font-bold mb-3">Where to Watch</h3>
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-gray-700 p-2 rounded flex items-center justify-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-bold">
                    N
                  </div>
                </div>
                <div className="bg-gray-700 p-2 rounded flex items-center justify-center">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center font-bold">
                    H
                  </div>
                </div>
                <div className="bg-gray-700 p-2 rounded flex items-center justify-center">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center font-bold">
                    P
                  </div>
                </div>
                <div className="bg-gray-700 p-2 rounded flex items-center justify-center">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center font-bold">
                    A
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
