import React from "react";
import "./App.css";
import PageView from "./components/PageView";
import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };


  return <PageView darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>;
}

export default App;
