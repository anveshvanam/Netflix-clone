import React, { useEffect, useState } from "react";
import { movieGenre, apiKey } from "../config";
import cancel from "./assets/cancel.png";
import GenreMediaCards from "./components/GenreMediaCards";

export function Media({ mediaType }) {
  const [mediaGenres, setMediaGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [fetchedMedia, setFetchedMedia] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSelectedGenres = (id) => {
    const alreadySelected = selectedGenres.includes(id);
    if (alreadySelected) {
      setSelectedGenres(selectedGenres.filter((genreId) => genreId !== id));
    } else {
      setSelectedGenres([...selectedGenres, id]);
    }
  };

  const handlePrevPage = () => {
    setPageNo((prevPageNo) => prevPageNo - 1);
  };

  const handleNextPage = () => {
    setPageNo((prevPageNo) => prevPageNo + 1);
  };

  useEffect(() => {
    const fetchMediaGenres = async () => {
      try {
        const response = await fetch(
          mediaType === "movie" ? movieGenre : tvGenre
        );
        const data = await response.json();
        setMediaGenres(data.genres);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error(`Error fetching ${mediaType} genres:`, error);
      }
    };
    fetchMediaGenres();
  }, [mediaType]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const genreIds = selectedGenres.join(",");
        const url = `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNo}&with_genres=${genreIds}`;
        const response = await fetch(url);
        const data = await response.json();
        setFetchedMedia(data.results);
      } catch (error) {
        console.error(`Error fetching ${mediaType}:`, error);
      }
    };

    fetchMedia();
  }, [selectedGenres, pageNo, mediaType]);

  return (
    <>
      <div className="bg-black flex flex-col min-h-screen py-20 p-10 w-full">
        <h1 className="text-white text-3xl">
          {mediaType === "movie" ? "Movies" : "TV Shows"}
        </h1>
        <ul className="flex gap-10 text-black text-lg mt-10 w-full flex-wrap">
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
            <GenreMediaCards
              type={mediaType}
              media={fetchedMedia}
              mediaType={mediaType}
            />
          ) : (
            <p className="text-white">No {mediaType} found.</p>
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
          <span className="text-white">Page {pageNo}</span>
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
