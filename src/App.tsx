import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import { Media } from "./Media";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import { Search } from "./Search";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Media mediaType="movie" />} />
        <Route path="tv" element={<Media mediaType="tv" />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
