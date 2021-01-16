import React from "react";
import "./App.css";
import Header from "./Header.js";
import Home from "./Home.js";


function App() {
  return (
    // BEM
    <div className="app">
      {/* Header */}
      <Header />
      {/* Home */}
      <Home />
    </div>
  );
}

export default App;
