import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { siteName } from "../../config";

export function Navbar() {
  const [navbar, setNavbar] = useState<boolean>(false);

  const handleScroll = () => {
    const scrollHeight = window.scrollY;
    if (scrollHeight >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-14 lg:h-20 flex items-center lg:justify-around transition-all duration-500 z-10 ${
        navbar ? "bg-black" : "bg-transparent"
      }`}
    >
      <h1
        className="text-white text-xl font-semibold m-4 lg:m-0 lg:text-3xl lg:font-bold cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        {siteName}
      </h1>
      <ul className="hidden lg:flex gap-10 text-white text-lg">
        <li>
          <Link to="/" className="group transition duration-300">
            Home
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-red-600"></span>
          </Link>
        </li>
        <li>
          <Link to="/movies" className="group transition duration-300">
            Movies
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-red-600"></span>
          </Link>
        </li>
        <li>
          <Link to="/tv" className="group transition duration-300">
            TV Shows
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-red-600"></span>
          </Link>
        </li>
        <li>
          <Link to="/search" className="group transition duration-300">
            Search
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-red-600"></span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
