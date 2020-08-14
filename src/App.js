import React from "react";
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
    </div>
  );
}

export default App;
