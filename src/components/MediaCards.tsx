import { useEffect, useState } from "react";
import video from "../assets/video.png";
import Modal from "react-modal";
import ReactPlayer from "react-player";
import { apiKey } from "../../config";
import { Media, MediaCardsProps } from "./GenreMediaCards";

export function MediaCards(props: MediaCardsProps) {
  const { title, fetchUrl, mediaType } = props;
  const [content, setContent] = useState<Media[]>([]);
  const [showTrailer, setShowTrailer] = useState<boolean>(false);
  const [trailerKey, setTrailerKey] = useState<string>("");
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

  const fetchContent = async () => {
    const url: string = fetchUrl || "";

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (data.results) {
      console.log("data.results", data.results);
      setContent(data.results);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleCloseModal = () => {
    setSelectedMedia(null);
    setShowTrailer(false);
  };

  useEffect(() => {
    const fetchTrailer = async () => {
      if (selectedMedia) {
        const trailers = await fetch(
          `https://api.themoviedb.org/3/${mediaType}/${selectedMedia.id}/videos?api_key=${apiKey}&language=en-US`
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
      }
    };
    fetchTrailer();
  }, [selectedMedia]);

  // ...
  return (
    <div className="flex flex-col  bg-black w-full lg:w-[65%]">
      <div className="flex justify-start">
        <h1 className="text-white text-xl lg:text-2xl mx-3 lg:mx-0 font-bold mb-8">
          {title}
        </h1>
      </div>
      <div className="flex  px-3 items-start gap-5 lg:gap-10 w-full overflow-x-scroll mb-7">
        {content.map((media) => (
          <div className="flex flex-col">
            <div
              key={media.id}
              className="h-52 w-36  lg:h-80 lg:w-52 bg-black text-white flex flex-col items-center justify-center gap-2 lg:gap-5 flex-shrink-0 rounded-xl relative opacity-100 transition-all duration-500 group border-[1px] border-neutral-400"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${media.poster_path})`,
                backgroundSize: "cover",
                cursor: "pointer",
              }}
              onClick={() => setSelectedMedia(media)}
            >
              <div className="overlay absolute inset-0 bg-white opacity-0 group-hover:opacity-20 group-active:opacity-20 transition-opacity duration-500"></div>
              <img
                src={video}
                alt="play"
                className="w-7 h-7 lg:h-10 lg:w-10 opacity-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 transition-opacity duration-200"
              />
            </div>
            <h1 className="text-white text-sm lg:text-base text-center mt-5 lg:mb-10 mb-5">
              {media.title ? media.title : media.name}
            </h1>
          </div>
        ))}
      </div>
      <Modal
        isOpen={selectedMedia !== null}
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
        <div className="w-full h-full bg-black flex flex-col justify-center items-center">
          {selectedMedia &&
            (showTrailer ? (
              <div className="w-full lg:w-[60%] lg:h-[60%] h-full flex flex-col  bg-black  justify-center items-center">
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${trailerKey}`}
                  controls
                  width="100%"
                  height="100%"
                />
                <button
                  className="bg-red-900 text-black rounded-3xl p-2 w-7 text-xs h-7  flex justify-center items-center text-center"
                  onClick={handleCloseModal}
                >
                  X
                </button>
              </div>
            ) : (
              <div
                className="w-full h-[80%] lg:w-[70%] lg:h-[60%] flex justify-center items-end self-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)), url(https://image.tmdb.org/t/p/w500${selectedMedia.backdrop_path})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="flex justify-center items-center w-[90%] lg:w-[60%] gap-8">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${selectedMedia.poster_path}`}
                    alt="poster"
                    className="h-80 w-56 rounded-xl hidden lg:block"
                  />
                  <div className="flex flex-col gap-10">
                    <h1 className="text-white text-xl lg:text-4xl font-bold">
                      {selectedMedia.title
                        ? selectedMedia.title
                        : selectedMedia.name}
                    </h1>
                    <p className="text-white text-sm lg:text-md">
                      {selectedMedia.overview}
                    </p>
                    <button
                      className="bg-transparent border-[1px] border-zinc-400 text-white py-2 lg:px-5 lg:py-3 rounded-3xl w-32 text-sm lg:w-40 hover:bg-red-700 transition-colors duration-100 cursor-pointer"
                      onClick={() =>
                        showTrailer
                          ? setShowTrailer(false)
                          : setShowTrailer(true)
                      }
                    >
                      WATCH TRAILER
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Modal>
    </div>
  );
  // ...
}

export default MediaCards;
