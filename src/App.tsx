import React from "react";
import SplashScreen from "./components/SplashScreen";
import usePaniniStore from "./stores/usePaniniStore";

function App() {
  const { paniniStatus } = usePaniniStore();
  return (
    <div className="main">
      {paniniStatus !== "started" && <SplashScreen />
      
      }
      <div style={{zIndex:0, position: "absolute", top: 0, left:0, width:"100vw", height:"100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <h1>started</h1>
      </div>
    </div>
  );
}

export default App;
