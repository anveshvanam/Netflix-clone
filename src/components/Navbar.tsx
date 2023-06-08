import { useState } from "react";
import { Link } from "react-router-dom";

export function Navbar() {
  const [navbar, setNavbar] = useState(false);
  const scrollTop = () => {
    const scrolled = window.scrollY;
    if (scrolled >= 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      /* empty */
    }
  };
  const changeBackground = () => {
    const scroll = window.scrollY;
    if (scroll >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeBackground);

  return (
    <div
      className={`h-20 w-full sticky top-0 flex items-center justify-around transition-all duration-500 z-10 ${
        navbar ? "bg-black" : "bg-slate-600"
      }`}
    >
      <h1
        className="text-white text-3xl font-bold cursor-pointer"
        onClick={scrollTop}
      >
        MovieFlix
      </h1>
      <ul className="flex gap-10 text-white text-lg">
        <Link
          to="/"
          className="group text-white transition duration-300 text-lg"
        >
          <li key="home">Home</li>
          <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-red-600"></span>
        </Link>
        <Link
          to="/movies"
          className="group text-white transition duration-300 text-lg"
        >
          <li key="movies">Movies</li>
          <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-red-600"></span>
        </Link>
        <Link
          to="/tv"
          className="group text-white transition duration-300 text-lg"
        >
          <li key="shows">TV Shows</li>
          <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-red-600"></span>
        </Link>
        <Link
          to="/search"
          className="group text-white transition duration-300 text-lg"
        >
          <li key="search">Search</li>
          <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-red-600"></span>
        </Link>
      </ul>
    </div>
  );
}
