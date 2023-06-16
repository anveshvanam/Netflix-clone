import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import { Media } from "./Media";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import { Search } from "./Search";
import { NotFound } from "./components/NotFound";
import { MobileNavbar } from "./components/MobileNavbar";
import "./App.css";

function App(): JSX.Element {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Media mediaType="movie" />} />
        <Route path="tv" element={<Media mediaType="tv" />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <MobileNavbar />
    </>
  );
}

export default App;
