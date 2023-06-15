import ReactPlayer from "react-player";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { apiKey } from "../../config.ts";

const RandomMovie = ({ movie }: any) => {
  const [showTrailer, setShowTrailer] = useState<boolean>(false);
  const [trailerKey, setTrailerKey] = useState(null);

  const handleCloseModal = () => {
    setShowTrailer(false);
  };

  useEffect(() => {
    const fetchTrailer = async () => {
      const trailers = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}&language=en-US`
      );
      const data = await trailers.json();
      console.log(data);
      if (data.results) {
        const trailer = data.results.filter(
          (item: any) => item.type === "Trailer"
        );
        console.log("trailer", trailer);
        if (trailer.length > 0) {
          console.log(`https://www.youtube.com/watch?v=${trailer[0].key}`);

          setTrailerKey(trailer[0].key);
        } else {
          console.log("No trailer found.");
        }
      } else {
        console.log("error");
      }
    };
    fetchTrailer();
  }, []);

  const backgroundImage = `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`;

  return showTrailer == false ? (
    <div
      className={`w-full h-[75vh] lg:h-[95vh] relative flex items-end justify-center bg-no-repeat bg-center bg-cover bg-opacity-30 `}
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,1)), ${backgroundImage}`,
      }}
    >
      <div className="flex justify-center items-center  mb-10 w-[90%] lg:w-2/3">
        <div className="flex justify-center items-center w-full lg:w-3/4 gap-2 lg:gap-8">
          <div className="flex flex-col gap-4 lg:gap-10">
            <h1 className="text-white text-2xl lg:text-4xl font-bold">
              {movie.title}
            </h1>
            <p className="text-white text-sm lg:text-base">{movie.overview}</p>
            <button
              className="bg-transparent border-[1px] border-zinc-400 text-white lg:px-5 px-3 py-2 text-base lg:py-3 rounded-3xl w-36 lg:w-40 hover:bg-red-700 transition-colors duration-100 cursor-pointer"
              onClick={() => setShowTrailer(true)}
            >
              WATCH TRAILER
            </button>
          </div>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt="poster"
            className="h-96 w-64 rounded-xl hidden lg:block"
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen h-full flex w-full justify-center items-center">
      <Modal
        isOpen={showTrailer}
        onRequestClose={handleCloseModal}
        contentLabel="Movie Details"
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.85)",
          },
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: "100%",
            width: "100%",
            border: "0",
            background: "#000",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "0px",
            margin: "0px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <div className="w-full lg:w-[50%] h-full flex flex-col gap-10 justify-center items-center">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailerKey}`}
            playing
            width="100%"
            height="50%"
            controls
          />
          <button
            className="bg-red-700 text-white rounded-3xl p-2 w-7 text-xs h-7  flex justify-center items-center text-center font-bold"
            onClick={handleCloseModal}
          >
            X
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default RandomMovie;
