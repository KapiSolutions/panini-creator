import React from "react";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import usePaniniStore from "./stores/usePaniniStore";
import FormContainer from "./components/FormContainer/FormContainer";
import FormHeader from "./components/FormHeader/FormHeader";

function App() {
  const { paniniStatus } = usePaniniStore();
  return (
    <div className="main">
      {paniniStatus !== "started" && <SplashScreen />}

      <FormContainer>
        <FormHeader />
      </FormContainer>
    </div>
  );
}

export default App;
