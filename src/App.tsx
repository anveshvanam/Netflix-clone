import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { useState } from "react";
import video from "./assets/video.png";
import Modal from "react-modal";

const queryClient = new QueryClient();

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchMovies = async () => {
    const url =
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YmE1ZTk3OTFhODdmNDIyNDA5N2YyMGU0NTdjYThkZSIsInN1YiI6IjY0N2Y4NDNhMzg1MjAyMDBlOWM0ZDM0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DqDezbnfcWcNTa3KPkvOK6N-H7fx08BKMYFBHtPXPzQ",
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    return data.results;
  };

  const { data: movies, isLoading, isError } = useQuery("movies", fetchMovies);

  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error occurred while fetching movies.</p>;
  }

  return (
    <div className="flex overflow-x-scroll min-h-full w-auto items-center justify-start bg-black gap-5">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="h-80 w-52 bg-black text-white flex flex-col items-center justify-center gap-5 flex-shrink-0 rounded-xl relative opacity-100 transition-all duration-500 group"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
            backgroundSize: "cover",
            cursor: "pointer",
          }}
          onClick={() => handleCardClick(movie)}
        >
          <div className="overlay absolute inset-0 bg-black opacity-0 group-hover:opacity-80 transition-opacity duration-200"></div>
          <img
            src={video}
            alt="play"
            className="h-10 w-10 opacity-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 transition-opacity duration-200"
          />
        </div>
      ))}

      <Modal
        isOpen={selectedMovie !== null}
        onRequestClose={handleCloseModal}
        contentLabel="Movie Details"
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: "70%",
            width: "70%",
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
        {selectedMovie && (
          <div
            className="w-full h-full flex justify-center items-center self-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)), url(https://image.tmdb.org/t/p/w500${selectedMovie.backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div>
              <h2 className="text-white">{selectedMovie.title}</h2>
              <p className="text-white">{selectedMovie.overview}</p>
            </div>
          </div>
        )}
        {/* <button onClick={handleCloseModal}>Close</button> */}
      </Modal>
    </div>
  );
}

function WrappedApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

export default WrappedApp;
