// Functional imports
import React, { useState, useEffect } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Axios from "axios";

// Component imports
import TitleBar from "frameless-titlebar";
import ReactTooltip from "react-tooltip";
import DetailedView from "./components/detailedview";
import SearchBar from "./components/searchbar";
import PlayerList from "./components/playerlist";

// Styling imports
import "./App.css";
import infoIcon from "./assets/icons/info.svg";

const remote = window.require("electron").remote;
const currentWindow = remote.getCurrentWindow();

function App() {
  const [selectedPlayer, setSelectedPlayer] = useState(1); // Selected player ID
  const [players, setPlayers] = useState([]); // Loaded player list

  useEffect(() => {
    // Search for players with empty string on first render
    getPlayers("", setPlayers);
  }, []);

  function getPlayers(search = "") {
    // Search for players with the given substring
    const url =
      "https://www.balldontlie.io/api/v1/players?per_page=100&search=" + search;
    Axios.get(url)
      .then((res) => res.data.data)
      .then((data) => {
        setPlayers(data);
      });
  }

  return (
    <div>
      <header>
        <TitleBar
          currentWindow={currentWindow} // electron window instance
          platform={process.platform} // win32, darwin, linux
          onClose={() => currentWindow.close()}
          onMinimize={() => currentWindow.minimize()}
          onMaximize={() => {
            if (!currentWindow.isMaximized()) {
              currentWindow.maximize();
            } else {
              currentWindow.unmaximize();
            }
          }}
          // when the titlebar is double clicked
          onDoubleClick={() => {
            if (!currentWindow.isMaximized()) {
              currentWindow.maximize();
            } else {
              currentWindow.unmaximize();
            }
          }}
        />
      </header>
      <div className="wrapper">
        <Router>
          <Switch>
            <Route path="/player">
              <DetailedView player={selectedPlayer} />
            </Route>
            <Route path="/">
              <div className="container">
                <ReactTooltip place="bottom" multiline />
                <img
                  id="info-tip"
                  src={infoIcon}
                  height="30px"
                  alt="info-icon"
                  data-tip="This app uses the balldontlie API which updates live every 10 minutes"
                  // The data-tip prop is added by ReactTooltip
                />
                <h1 id="heading">Search for NBA players</h1>
                <SearchBar getPlayers={getPlayers} />
                <PlayerList
                  players={players}
                  setSelectedPlayer={setSelectedPlayer}
                />
              </div>
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
