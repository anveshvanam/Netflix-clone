import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import { Media } from "./Media";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Media mediaType="movie" />} />
        <Route path="tv" element={<Media mediaType="tv" />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
