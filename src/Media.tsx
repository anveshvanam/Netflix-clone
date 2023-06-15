import { useEffect, useState } from "react";
import { movieGenre, apiKey, tvGenre } from "../config";
import cancel from "./assets/cancel.png";
import GenreMediaCards from "./components/GenreMediaCards";

interface MediaProps {
  mediaType: "movie" | "tv";
}

interface Genre {
  id: number;
  name: string;
}

export function Media({ mediaType }: MediaProps): JSX.Element {
  const [mediaGenres, setMediaGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<Array<number>>([]);
  const [fetchedMedia, setFetchedMedia] = useState<any[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const handleSelectedGenres = (id: number) => {
    const alreadySelected = selectedGenres.includes(id);
    if (alreadySelected) {
      setSelectedGenres(selectedGenres.filter((genreId) => genreId !== id));
    } else {
      setSelectedGenres([...selectedGenres, id]);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePrevPage = () => {
    setPageNo((prevPageNo) => prevPageNo - 1);
    scrollToTop();
  };

  const handleNextPage = () => {
    setPageNo((prevPageNo) => prevPageNo + 1);
    scrollToTop();
  };

  useEffect(() => {
    const fetchMediaGenres = async () => {
      try {
        const response = await fetch(
          mediaType === "movie" ? movieGenre : tvGenre
        );
        const data = await response.json();
        console.log("data", data);
        setMediaGenres(data.genres);
      } catch (error) {
        console.error(`Error fetching ${mediaType} genres:`, error);
      }
    };
    fetchMediaGenres();
  }, [mediaType]);

  useEffect(() => {
    const sortedMediaGenres = [...mediaGenres];
    sortedMediaGenres.sort((a, b) => {
      const isSelectedA = selectedGenres.includes(a.id);
      const isSelectedB = selectedGenres.includes(b.id);

      if (isSelectedA && !isSelectedB) {
        return -1;
      } else if (!isSelectedA && isSelectedB) {
        return 1;
      } else {
        return 0;
      }
    });
    setMediaGenres(sortedMediaGenres);
  }, [selectedGenres]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const genreIds = selectedGenres.join(",");
        const url = `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNo}&with_genres=${genreIds}`;
        const response = await fetch(url);
        const data = await response.json();
        setTotalPages(data.total_pages);
        setFetchedMedia(data.results);
      } catch (error) {
        console.error(`Error fetching ${mediaType}:`, error);
      }
    };
    console.log("totalPages", totalPages);
    fetchMedia();
  }, [selectedGenres, pageNo, mediaType]);

  return (
    <>
      <div className="bg-black flex flex-col min-h-screen py-20 p-3 lg:p-10 w-full">
        <h1 className="text-white text-3xl">
          {mediaType === "movie" ? "Movies" : "TV Shows"}
        </h1>
        <ul className="flex gap-2 lg:gap-10 text-black text-lg mt-4 lg:mt-10 w-full flex-wrap">
          {mediaGenres.map((genre) => (
            <li
              key={genre.id}
              className={`${
                selectedGenres.includes(genre.id) ? "bg-blue-600" : "bg-white"
              } ${
                selectedGenres.includes(genre.id) ? "text-white" : "text-black"
              } text-sm rounded-xl p-1 transition-colors duration-100 px-2`}
            >
              <button
                className="flex items-center gap-3"
                onClick={() => handleSelectedGenres(genre.id)}
              >
                {genre.name}
                {selectedGenres.includes(genre.id) && (
                  <img
                    src={cancel}
                    alt="cancel"
                    className="w-4 h-4 bg-red-600 rounded-full"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-10 mt-10">
          {fetchedMedia.length > 0 ? (
            <GenreMediaCards media={fetchedMedia} mediaType={mediaType} />
          ) : (
            <p className="text-white text-center w-full">
              No {mediaType} found.
            </p>
          )}
        </div>
        <div className="flex justify-center items-center gap-5 mt-5">
          <button
            className="px-4 py-2 mr-2 bg-blue-600 text-white rounded"
            onClick={handlePrevPage}
            disabled={pageNo === 1}
          >
            Prev
          </button>
          <span className="text-white">
            Page {pageNo} of {totalPages}
          </span>
          <button
            className="px-4 py-2 ml-2 bg-blue-600 text-white rounded"
            onClick={handleNextPage}
            disabled={pageNo === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
