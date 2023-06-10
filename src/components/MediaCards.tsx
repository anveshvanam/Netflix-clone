import { useEffect, useState } from "react";
import video from "../assets/video.png";
import Modal from "react-modal";
import ReactPlayer from "react-player";

export function MediaCards(props) {
  const { title, fetchUrl } = props;
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const fetchContent = async () => {
    const url = fetchUrl;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (data.results) {
      setLoading(false);
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
  };

  // ...
  return (
    <div className="flex flex-col  bg-black  w-[65%]">
      <div className="flex justify-start">
        <h1 className="text-white text-2xl font-bold mb-8">{title}</h1>
      </div>
      <div className="flex  px-3 items-start gap-10 w-full overflow-x-scroll mb-7">
        {content.map((media) => (
          <div className="flex flex-col">
            <div
              key={media.id}
              className="h-80 w-52 bg-black text-white flex flex-col items-center justify-center gap-5 flex-shrink-0 rounded-xl relative opacity-100 transition-all duration-500 group"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${media.poster_path})`,
                backgroundSize: "cover",
                cursor: "pointer",
              }}
              onClick={() => setSelectedMedia(media)}
            >
              <div className="overlay absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <img
                src={video}
                alt="play"
                className="h-10 w-10 opacity-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 transition-opacity duration-200"
              />
            </div>
            <h1 className="text-white text-center mt-5 mb-10">
              {media.title ? media.title : media.name}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
  // ...
}

export default MediaCards;
