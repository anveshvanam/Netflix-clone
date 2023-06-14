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
            <a
              className="bg-transparent border-[1px] border-zinc-400 text-white px-5 py-3 rounded-3xl w-40 hover:bg-red-700 transition-colors duration-100 cursor-pointer"
              onClick={() => setShowTrailer(true)}
            >
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
  ) : (
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
          height: "70%",
          width: "75%",
          border: "0",
          background: "#fff",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "4px",
          outline: "none",
          padding: "0px",
          margin: "0px",
        },
      }}
    >
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${trailerKey}`}
        playing
        width="100%"
        height="100%"
      />
    </Modal>
  );
};

export default RandomMovie;
