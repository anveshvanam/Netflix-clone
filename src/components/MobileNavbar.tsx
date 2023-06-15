import { Link } from "react-router-dom";
import home from "../assets/home.svg";
import movies from "../assets/movies.svg";
import tv from "../assets/tv.svg";
import search from "../assets/search.svg";

export function MobileNavbar() {
  return (
    <div className="sticky bottom-0 w-full h-16 lg:hidden flex items-center justify-around transition-all duration-500 bg-black">
      <ul className="flex justify-around w-full text-white text-lg">
        <li>
          <Link to="/" className="group transition duration-300 bg-slate-400 ">
            <img src={home} alt="home" className="w-5 h-5" />
          </Link>
        </li>
        <li>
          <Link to="/movies" className="group transition duration-300">
            <img src={movies} alt="movies" className="w-5 h-5" />
          </Link>
        </li>
        <li>
          <Link to="/tv" className="group transition duration-300">
            <img src={tv} alt="tv" className="w-5 h-5" />
          </Link>
        </li>
        <li>
          <Link to="/search" className="group transition duration-300">
            <img src={search} alt="search" className="w-5 h-5" />
          </Link>
        </li>
      </ul>
    </div>
  );
}
