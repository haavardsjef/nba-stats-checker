import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TitleBar from "frameless-titlebar";

const remote = window.require("electron").remote;
const currentWindow = remote.getCurrentWindow();

function App() {
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
            <Route path="/player"></Route>
            <Route path="/"></Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
