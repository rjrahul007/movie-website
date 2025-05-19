// import React, { useState, useEffect } from "react";

// // API configuration - assuming these are the same as your App.jsx
// const API_BASE_URL = "https://api.themoviedb.org/3";
// const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
// const API_OPTIONS = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization: `Bearer ${API_KEY}`,
//   },
// };

// const MoviePage = ({ id, onBack }) => {
//   const [movie, setMovie] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [trailerKey, setTrailerKey] = useState("");

//   // Fetch real movie data from TMDB API
//   useEffect(() => {
//     const fetchMovieDetails = async () => {
//       try {
//         setLoading(true);

//         // Fetch movie details
//         const movieResponse = await fetch(
//           `${API_BASE_URL}/movie/${id}?append_to_response=credits`,
//           API_OPTIONS
//         );

//         if (!movieResponse.ok) {
//           throw new Error("Failed to fetch movie details");
//         }

//         const movieData = await movieResponse.json();

//         // Fetch movie videos to get trailer
//         const videosResponse = await fetch(
//           `${API_BASE_URL}/movie/${id}/videos`,
//           API_OPTIONS
//         );

//         if (videosResponse.ok) {
//           const videosData = await videosResponse.json();
//           // Find YouTube trailer
//           const trailer = videosData.results.find(
//             (video) => video.type === "Trailer" && video.site === "YouTube"
//           );

//           if (trailer) {
//             setTrailerKey(trailer.key);
//           }
//         }

//         // Get director from credits
//         let director = "Unknown";
//         if (movieData.credits && movieData.credits.crew) {
//           const directorInfo = movieData.credits.crew.find(
//             (person) => person.job === "Director"
//           );
//           if (directorInfo) {
//             director = directorInfo.name;
//           }
//         }

//         // Format the movie data
//         setMovie({
//           ...movieData,
//           director,
//           cast: movieData.credits?.cast?.slice(0, 8) || [],
//         });

//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching movie details:", error);
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchMovieDetails();
//     }
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-2xl font-bold">Loading...</div>
//       </div>
//     );
//   }

//   if (!movie) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-2xl font-bold">Movie not found</div>
//       </div>
//     );
//   }

//   return (
//     <div className="movie-page">
//       {/* Back Button */}
//       <div className="container mx-auto px-4 py-4">
//         <button onClick={onBack} className="back-button">
//           ← Back to Movies
//         </button>
//       </div>

//       {/* Hero Section with Backdrop */}
//       <div
//         className="hero-backdrop"
//         style={{
//           backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(13,17,23,1)),
//           url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
//         }}
//       >
//         <div className="container mx-auto px-4 pt-32 pb-10 flex items-end h-full">
//           <div className="movie-hero-content">
//             {/* Poster */}
//             <div className="movie-poster">
//               <img
//                 src={
//                   movie.poster_path
//                     ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
//                     : "/No-Poster.png"
//                 }
//                 alt={movie.title}
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             {/* Movie Info */}
//             <div className="movie-info">
//               <h1>{movie.title}</h1>
//               <div className="movie-meta">
//                 <span>{new Date(movie.release_date).getFullYear()}</span>
//                 <span>•</span>
//                 <span>
//                   {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
//                 </span>
//                 <span>•</span>
//                 <span className="uppercase">{movie.original_language}</span>
//               </div>

//               {/* Ratings */}
//               <div className="movie-rating">
//                 <div className="rating-display">
//                   <img src="/star.svg" alt="Star Icon" className="star-icon" />
//                   <div>
//                     <span className="rating-value">
//                       {movie.vote_average.toFixed(1)}
//                     </span>
//                     <span className="max-rating">/10</span>
//                     <div className="vote-count">
//                       {(movie.vote_count / 1000).toFixed(1)}K ratings
//                     </div>
//                   </div>
//                 </div>

//                 <button className="rate-button">Rate This</button>
//               </div>

//               {/* Genres */}
//               <div className="genres">
//                 {movie.genres.map((genre) => (
//                   <span key={genre.id} className="genre-pill">
//                     {genre.name}
//                   </span>
//                 ))}
//               </div>

//               {movie.tagline && <p className="tagline">{movie.tagline}</p>}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="movie-content">
//         <div className="content-grid">
//           {/* Left Column - Overview & Trailer */}
//           <div className="main-column">
//             {/* Overview */}
//             <section className="section">
//               <h2>Overview</h2>
//               <p>{movie.overview}</p>
//             </section>

//             {/* Trailer */}
//             {trailerKey && (
//               <section className="section">
//                 <h2>Trailer</h2>
//                 <div className="trailer-container">
//                   <iframe
//                     className="trailer-frame"
//                     src={`https://www.youtube.com/embed/${trailerKey}`}
//                     title={`${movie.title} Trailer`}
//                     frameBorder="0"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowFullScreen
//                   ></iframe>
//                 </div>
//               </section>
//             )}

//             {/* Cast */}
//             {movie.cast && movie.cast.length > 0 && (
//               <section className="section">
//                 <h2>Top Cast</h2>
//                 <div className="cast-grid">
//                   {movie.cast.map((person, index) => (
//                     <div key={person.id || index} className="cast-card">
//                       <div className="cast-image">
//                         <img
//                           src={
//                             person.profile_path
//                               ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
//                               : "/no-profile.png"
//                           }
//                           alt={person.name}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                       <div className="cast-info">
//                         <p className="cast-name">{person.name}</p>
//                         <p className="cast-character">{person.character}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </section>
//             )}
//           </div>

//           {/* Right Column - Details & More */}
//           <div className="side-column">
//             {/* Details */}
//             <section className="details-card">
//               <h3>Details</h3>
//               <div className="details-content">
//                 <div className="detail-item">
//                   <span className="detail-label">Release Date</span>
//                   <span className="detail-value">
//                     {new Date(movie.release_date).toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric",
//                     })}
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span className="detail-label">Director</span>
//                   <span className="detail-value">{movie.director}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span className="detail-label">Language</span>
//                   <span className="detail-value">
//                     {movie.original_language === "en"
//                       ? "English"
//                       : movie.original_language === "es"
//                       ? "Spanish"
//                       : movie.original_language === "fr"
//                       ? "French"
//                       : movie.original_language}
//                   </span>
//                 </div>
//                 {movie.budget > 0 && (
//                   <div className="detail-item">
//                     <span className="detail-label">Budget</span>
//                     <span className="detail-value">
//                       ${(movie.budget / 1000000).toFixed(1)}M
//                     </span>
//                   </div>
//                 )}
//                 {movie.revenue > 0 && (
//                   <div className="detail-item">
//                     <span className="detail-label">Revenue</span>
//                     <span className="detail-value">
//                       ${(movie.revenue / 1000000).toFixed(1)}M
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </section>

//             {/* Where to Watch */}
//             <section className="watch-card">
//               <h3>Where to Watch</h3>
//               <div className="streaming-grid">
//                 <div className="streaming-logo netflix">N</div>
//                 <div className="streaming-logo hulu">H</div>
//                 <div className="streaming-logo prime">P</div>
//                 <div className="streaming-logo apple">A</div>
//               </div>
//             </section>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MoviePage;

import React, { useState, useEffect } from "react";
import {
  Star,
  ArrowLeft,
  Info,
  Clock,
  Calendar,
  User,
  DollarSign,
  TrendingUp,
  Film,
} from "lucide-react";

// API configuration
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

// Streaming service components with proper branding colors
const StreamingService = ({ service }) => {
  const services = {
    netflix: { bg: "bg-red-600", letter: "N" },
    hulu: { bg: "bg-green-500", letter: "H" },
    prime: { bg: "bg-blue-500", letter: "P" },
    apple: { bg: "bg-zinc-700", letter: "A" },
    disney: { bg: "bg-blue-700", letter: "D" },
    hbo: { bg: "bg-purple-800", letter: "H" },
  };

  const { bg, letter } = services[service] || {
    bg: "bg-gray-600",
    letter: "?",
  };

  return (
    <div
      className={`${bg} h-12 flex items-center justify-center rounded-md font-bold text-white shadow-md`}
    >
      {letter}
    </div>
  );
};

// Card component for cast
const CastCard = ({ person }) => (
  <div className="bg-zinc-800 rounded-lg overflow-hidden shadow-lg hover:bg-zinc-700 transition-all duration-300 transform hover:-translate-y-1">
    <div className="aspect-w-2 aspect-h-3">
      <img
        src={
          person.profile_path
            ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
            : "/no-profile.png"
        }
        alt={person.name}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
    <div className="p-3">
      <p className="font-medium text-sm truncate text-white">{person.name}</p>
      <p className="text-gray-400 text-xs truncate">{person.character}</p>
    </div>
  </div>
);

// Detail item component
const DetailItem = ({ icon, label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-zinc-700 last:border-0">
    <div className="flex items-center text-gray-400 gap-2">
      {icon}
      <span>{label}</span>
    </div>
    <span className="text-white font-medium">{value}</span>
  </div>
);

const MoviePage = ({ id, onBack }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailerKey, setTrailerKey] = useState("");
  const [error, setError] = useState(null);

  // Fetch movie data from TMDB API
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch movie details with credits
        const movieResponse = await fetch(
          `${API_BASE_URL}/movie/${id}?append_to_response=credits,recommendations`,
          API_OPTIONS
        );

        if (!movieResponse.ok) {
          throw new Error(
            `Failed to fetch movie details: ${movieResponse.status}`
          );
        }

        const movieData = await movieResponse.json();

        // Fetch movie videos to get trailer
        const videosResponse = await fetch(
          `${API_BASE_URL}/movie/${id}/videos`,
          API_OPTIONS
        );

        if (videosResponse.ok) {
          const videosData = await videosResponse.json();

          // Find YouTube trailer - prioritize official trailers
          const trailers = videosData.results.filter(
            (video) => video.type === "Trailer" && video.site === "YouTube"
          );

          const officialTrailer = trailers.find((trailer) =>
            trailer.name.toLowerCase().includes("official")
          );

          setTrailerKey(
            officialTrailer ? officialTrailer.key : trailers[0]?.key || ""
          );
        }

        // Get director from credits
        let director = "Unknown";
        if (movieData.credits?.crew) {
          const directorInfo = movieData.credits.crew.find(
            (person) => person.job === "Director"
          );
          if (directorInfo) {
            director = directorInfo.name;
          }
        }

        // Format the movie data
        setMovie({
          ...movieData,
          director,
          cast: movieData.credits?.cast?.slice(0, 8) || [],
        });
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError("Failed to load movie data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  // Loading state with shimmer effect
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-900">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-32 h-32 bg-zinc-800 rounded-full mb-4"></div>
          <div className="w-48 h-6 bg-zinc-800 rounded mb-2"></div>
          <div className="w-32 h-4 bg-zinc-800 rounded"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-900">
        <div className="text-center p-6 bg-zinc-800 rounded-lg shadow-lg max-w-md">
          <Info size={48} className="mx-auto mb-4 text-red-500" />
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p className="text-gray-300">{error}</p>
          <button
            onClick={onBack}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors duration-200 font-medium"
          >
            Back to Movies
          </button>
        </div>
      </div>
    );
  }

  // Not found state
  if (!movie) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-900">
        <div className="text-center p-6 bg-zinc-800 rounded-lg shadow-lg max-w-md">
          <Info size={48} className="mx-auto mb-4 text-yellow-500" />
          <h2 className="text-2xl font-bold mb-2">Movie Not Found</h2>
          <p className="text-gray-300">
            The movie you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={onBack}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors duration-200 font-medium"
          >
            Back to Movies
          </button>
        </div>
      </div>
    );
  }

  // Format time from minutes to hours and minutes
  const formatRuntime = (minutes) => {
    if (!minutes) return "N/A";
    return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  };

  // Format language codes to full names
  const formatLanguage = (code) => {
    const languages = {
      en: "English",
      es: "Spanish",
      fr: "French",
      ja: "Japanese",
      ko: "Korean",
      de: "German",
      it: "Italian",
      zh: "Chinese",
      ru: "Russian",
    };
    return languages[code] || code;
  };

  return (
    <div className="bg-zinc-900 min-h-screen text-white">
      {/* Fixed gradient overlay for better text readability */}
      <div className="pattern -z-1" />
      <div className="fixed inset-0 bg-gradient-to-b from-zinc-900/70 via-zinc-900/20 to-zinc-900 pointer-events-none z-10" />

      {/* Hero Section with Backdrop */}
      <div
        className="relative h-[70vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: movie.backdrop_path
            ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
            : "none",
          backgroundColor: !movie.backdrop_path ? "#1e1e1e" : undefined,
        }}
      >
        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <div className="container mx-auto px-4 py-6">
            <button
              onClick={onBack}
              className="flex items-center gap-2 bg-zinc-800/80 hover:bg-zinc-700 px-4 py-2 rounded-full backdrop-blur-sm transition-all duration-300"
            >
              <ArrowLeft size={16} />
              <span>Back to Movies</span>
            </button>
          </div>
        </div>

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="container mx-auto px-4 pb-8">
            <div className="flex flex-col md:flex-row gap-8 items-end md:items-center">
              {/* Poster */}
              <div className="w-48 md:w-64 flex-shrink-0 rounded-lg overflow-hidden shadow-2xl transform translate-y-16 md:translate-y-0">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : "/No-Poster.png"
                  }
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Movie basic info */}
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  {movie.title}
                </h1>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm text-zinc-300">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} className="opacity-70" />
                    {new Date(movie.release_date).getFullYear()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} className="opacity-70" />
                    {formatRuntime(movie.runtime)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Film size={14} className="opacity-70" />
                    {formatLanguage(movie.original_language)}
                  </span>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-zinc-800/90 backdrop-blur-sm text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                {/* Ratings */}
                <div className="flex items-center mt-6 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-500 rounded-full p-2">
                      <Star
                        className="w-6 h-6 text-zinc-900"
                        fill="currentColor"
                      />
                    </div>
                    <div>
                      <div className="flex items-baseline">
                        <span className="text-2xl font-bold">
                          {movie.vote_average.toFixed(1)}
                        </span>
                        <span className="text-zinc-400 text-sm ml-1">/10</span>
                      </div>
                      <div className="text-xs text-zinc-400">
                        {(movie.vote_count / 1000).toFixed(1)}K ratings
                      </div>
                    </div>
                  </div>

                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 font-medium">
                    Rate This
                  </button>
                </div>

                {/* Tagline */}
                {movie.tagline && (
                  <p className="mt-4 text-xl text-zinc-300 italic font-light">
                    "{movie.tagline}"
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-24 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Overview & Trailer */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-zinc-800 flex items-center gap-2">
                <Info size={20} className="text-blue-500" />
                Overview
              </h2>
              <p className="text-zinc-300 leading-relaxed text-lg">
                {movie.overview}
              </p>
            </section>

            {/* Trailer */}
            {trailerKey && (
              <section>
                <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-zinc-800 flex items-center gap-2">
                  <Film size={20} className="text-blue-500" />
                  Official Trailer
                </h2>
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-zinc-800 shadow-lg">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${trailerKey}`}
                    title={`${movie.title} Trailer`}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </section>
            )}

            {/* Cast */}
            {movie.cast && movie.cast.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-zinc-800 flex items-center gap-2">
                  <User size={20} className="text-blue-500" />
                  Top Cast
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {movie.cast.map((person) => (
                    <CastCard key={person.id || person.name} person={person} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column - Details & More */}
          <div className="space-y-8">
            {/* Details */}
            <section className="bg-zinc-800/70 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4 pb-2 border-b border-zinc-700">
                Movie Details
              </h3>
              <div className="space-y-1">
                <DetailItem
                  icon={<Calendar size={16} />}
                  label="Release Date"
                  value={new Date(movie.release_date).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                />
                <DetailItem
                  icon={<User size={16} />}
                  label="Director"
                  value={movie.director}
                />
                <DetailItem
                  icon={<Film size={16} />}
                  label="Language"
                  value={formatLanguage(movie.original_language)}
                />
                {movie.runtime > 0 && (
                  <DetailItem
                    icon={<Clock size={16} />}
                    label="Runtime"
                    value={formatRuntime(movie.runtime)}
                  />
                )}
                {movie.budget > 0 && (
                  <DetailItem
                    icon={<DollarSign size={16} />}
                    label="Budget"
                    value={`$${(movie.budget / 1000000).toFixed(1)}M`}
                  />
                )}
                {movie.revenue > 0 && (
                  <DetailItem
                    icon={<TrendingUp size={16} />}
                    label="Revenue"
                    value={`$${(movie.revenue / 1000000).toFixed(1)}M`}
                  />
                )}
                {movie.status && (
                  <DetailItem
                    icon={<Info size={16} />}
                    label="Status"
                    value={movie.status}
                  />
                )}
              </div>
            </section>

            {/* Where to Watch */}
            <section className="bg-zinc-800/70 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4 pb-2 border-b border-zinc-700">
                Where to Watch
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <StreamingService service="netflix" />
                <StreamingService service="hulu" />
                <StreamingService service="prime" />
                <StreamingService service="disney" />
                <StreamingService service="hbo" />
                <StreamingService service="apple" />
              </div>
              <p className="text-xs text-zinc-400 mt-4 text-center">
                Availability may vary by region
              </p>
            </section>

            {/* Production Companies */}
            {movie.production_companies &&
              movie.production_companies.length > 0 && (
                <section className="bg-zinc-800/70 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold mb-4 pb-2 border-b border-zinc-700">
                    Production
                  </h3>
                  <div className="space-y-4">
                    {movie.production_companies.slice(0, 3).map((company) => (
                      <div key={company.id} className="flex items-center gap-3">
                        {company.logo_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                            alt={company.name}
                            className="h-8 w-auto object-contain bg-white rounded p-1"
                          />
                        ) : (
                          <div className="h-8 w-8 bg-zinc-700 rounded flex items-center justify-center font-bold">
                            {company.name.charAt(0)}
                          </div>
                        )}
                        <span className="text-sm">{company.name}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
