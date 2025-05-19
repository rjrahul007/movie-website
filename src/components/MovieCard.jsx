// import React from "react";

// const MovieCard = ({ movie }) => {
//   const {
//     title,
//     backdrop_path,
//     poster_path,
//     vote_average,
//     vote_count,
//     release_date,
//     original_language,
//   } = movie;
//   const handleClick = () => {
//     if (onClick) {
//       onClick(movie);
//     }
//   };

//   return (
//     <div
//       className="movie-card cursor-pointer transition-transform hover:scale-105"
//       onClick={handleClick}
//     >
//       <img
//         src={
//           poster_path
//             ? `https://image.tmdb.org/t/p/w500/${poster_path}`
//             : "/No-Poster.png"
//         }
//         alt={title}
//       />
//       <div className="mt-4">
//         <h3>{title}</h3>
//         <div className="content">
//           <div className="rating">
//             <img src="star.svg" alt="Star Icon" />
//             <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
//           </div>
//           <span>.</span>
//           <p className="lang">{original_language}</p>
//           <span>.</span>
//           <p className="year">
//             {release_date ? release_date.split("-")[0] : "N/A"}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieCard;

import React from "react";

const MovieCard = ({ movie }) => {
  const { title, poster_path, vote_average, release_date, original_language } =
    movie;

  return (
    <div className="movie-card cursor-pointer transition-transform hover:scale-105">
      {/* Movie Poster */}
      <div className="h-64 overflow-hidden">
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : "/No-Poster.png"
          }
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Movie Info */}
      <div className="mt-4">
        <h3>{title}</h3>
        <div className="content">
          <div className="rating">
            <img src="/star.svg" alt="Star Icon" />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>
          <span>•</span>
          <p className="lang">{original_language}</p>
          <span>•</span>
          <p className="year">
            {release_date ? release_date.split("-")[0] : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
