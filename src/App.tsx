import * as React from "react";
import { WrappedApp } from "./components/Movies";
import { Navbar } from "./components/Navbar";

export function App() {
  return (
    <div>
      <Navbar />
      <WrappedApp />
    </div>
  );
}

export default App;
