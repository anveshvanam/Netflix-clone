import React from "react";

const RandomMovie = ({ movie }) => {
  const backgroundImage = `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`;

  return (
    <div
      className={`w-full h-[95vh] relative flex items-end justify-center bg-no-repeat bg-center bg-cover bg-opacity-30 `}
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,1)), ${backgroundImage}`,
      }}
    >
      <div className="flex justify-center items-center  mb-10 w-2/3">
        <div className="flex justify-center items-center w-3/4 gap-8">
          <div className="flex flex-col gap-10">
            <h1 className="text-white text-4xl font-bold">{movie.title}</h1>
            <p className="text-white text-md">{movie.overview}</p>
            <a className="bg-transparent border-[1px] border-zinc-400 text-white px-5 py-3 rounded-3xl w-40 hover:bg-red-700 transition-colors duration-100 cursor-pointer">
              WATCH TRAILER
            </a>
          </div>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt="poster"
            className="h-96 w-64 rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default RandomMovie;
