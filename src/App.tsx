import React from "react";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import usePaniniStore from "./stores/usePaniniStore";
import FormContainer from "./components/FormContainer/FormContainer";
import FormHeader from "./components/FormHeader/FormHeader";
import BaseForm from "./components/BaseForm/BaseForm";
import ExtrasForm from "./components/ExtrasForm/ExtrasForm";

function App() {
  const { paniniStatus } = usePaniniStore();
  return (
    <div className="main">
      {paniniStatus !== "started" && <SplashScreen />}

      <FormContainer>
        <FormHeader />
        <BaseForm />
        <ExtrasForm />
      </FormContainer>
    </div>
  );
}

export default App;
