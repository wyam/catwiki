import React from "react";
import logo from "./logo.svg";
import "./App.css";

import HeaderSearch from "./Components/HeaderSearch";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>CatWiki</p>
      </header>
      <HeaderSearch />
    </div>
  );
}

export default App;
