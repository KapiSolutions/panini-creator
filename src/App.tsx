import React from "react";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import usePaniniStore from "./stores/usePaniniStore";
import FormContainer from "./components/PaniniForm/FormContainer/FormContainer";
import FormHeader from "./components/PaniniForm/FormHeader/FormHeader";
import BaseForm from "./components/PaniniForm/BaseForm/BaseForm";
import ExtrasForm from "./components/PaniniForm/ExtrasForm/ExtrasForm";
import FinalizeForm from "./components/PaniniForm/FinalizeForm/FinalizeForm";

function App() {
  const { paniniStatus } = usePaniniStore();
  return (
    <div className="main">
      {paniniStatus !== "started" && <SplashScreen />}

      <FormContainer>
        <FormHeader />
        <BaseForm />
        <ExtrasForm />
        <FinalizeForm />
      </FormContainer>
    </div>
  );
}

export default App;
