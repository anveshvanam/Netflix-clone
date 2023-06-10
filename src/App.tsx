import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { MediaCards } from "./components/MediaCards";
import RandomMovie from "./components/RandomMovie";
import {
  trendingMovies,
  topRatedMovies,
  trendingTv,
  topRatedTv,
} from "../config";

export function App() {
  const [randomMovie, setRandomMovie] = useState(null);
  /**
   * add loading state
   */
  const [loading, setLoading] = useState(true);

  const fetchTrendingMovies = async () => {
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
    if (data.results) {
      setLoading(false);
      console.log("data.results", data.results);
      getRandomMovie(data.results);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  const getRandomMovie = (movies) => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    setRandomMovie(movies[randomIndex]);
  };

  return (
    <div className="relative bg-black flex flex-col justify-center items-center">
      {loading && <div>Loading...</div>}
      <Navbar />
      {randomMovie && <RandomMovie movie={randomMovie} />}
      <MediaCards title="Trending Movies" fetchUrl={trendingMovies} />
      <MediaCards title="Top Rated Movies" fetchUrl={topRatedMovies} />
      <MediaCards title="Trending Shows" fetchUrl={trendingTv} />
      <MediaCards title="Top Rated Shows" fetchUrl={topRatedTv} />
    </div>
  );
}

export default App;
