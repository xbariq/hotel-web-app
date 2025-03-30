import React from "react";
import logo from "./logo.svg";
import "./App.css";
import HotelList from "./components/HotelList";
import SearchRoom from "./components/SearchRoom";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Hotel Web App</h1>
      {/* <HotelList /> {/* Display the list of hotels */}
      <SearchRoom />
    </div>
  );
};
export default App;
