import { useEffect, useState } from "react";
import { apiKey } from "../config";
import search from "./assets/search.png";
import GenreMediaCards from "./components/GenreMediaCards";

export function Search() {
  const [searchText, setSearchText] = useState("");
  const [mediaType, setMediaType] = useState("movie");
  const [fetchedMedia, setFetchedMedia] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = async (e) => {
    event?.preventDefault();
    if (searchText.trim() === "") {
      return;
    }

    const url = `https://api.themoviedb.org/3/search/${mediaType}?api_key=${apiKey}&language=en-US&query=${searchText}&page=${pageNo}&include_adult=false`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setFetchedMedia(data.results);
    setTotalPages(data.total_pages);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    handleSearch();
    console.log("triggered ");
  }, [mediaType, pageNo]);

  const handlePrevPage = () => {
    setPageNo((prevPageNo) => prevPageNo - 1);
    scrollToTop();
  };

  const handleNextPage = () => {
    setPageNo((prevPageNo) => prevPageNo + 1);
    scrollToTop();
  };

  return (
    <div className="bg-black flex flex-col justify-content-center items-center h-full pb-20">
      <form className="flex pt-20 items-center" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-800 text-white p-2 rounded-l h-12 w-96 focus:border-blue-600 focus:border-2  outline-none"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          type="submit"
          className=" text-white rounded bg-blue-600 w-12 h-12 flex justify-center items-center"
        >
          <img src={search} alt="search" className="w-7 h-7" />
        </button>
      </form>
      <div className="flex mt-10">
        <button
          className={`${
            mediaType === "movie" ? "border-b-blue-700" : "border-b-transparent"
          } w-52 h-20 text-white border-b-2 transition-all duration-300 p-2`}
          onClick={(e) => {
            setMediaType("movie");
            if (searchText.trim() !== "") {
              handleSearch();
            }
          }}
        >
          Movies
        </button>
        <button
          className={`${
            mediaType === "tv" ? "border-b-blue-700" : "border-b-transparent "
          } text-white w-52 h-20 border-b-2 p-2 transition-all duration-300`}
          onClick={(e) => {
            setMediaType("tv");
            if (searchText.trim() !== "") {
              handleSearch();
            }
          }}
        >
          TV Shows
        </button>
      </div>
      <div className="flex flex-wrap gap-10 mt-10">
        {fetchedMedia.length > 0 ? (
          <GenreMediaCards media={fetchedMedia} mediaType={mediaType} />
        ) : (
          <p className="text-white">No {mediaType} found.</p>
        )}
      </div>
      {fetchedMedia.length > 0 && (
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
      )}
    </div>
  );
}
