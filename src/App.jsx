import InputComponent from "./components/InputComponent";
import SummaryComponent from "./components/SummaryComponent";
import EmiBreakupComponent from "./components/EmiBreakupComponent";
import { EmiCalCulationHelper } from "./HelperComponents/EmiCalCulationHelper.js";
import { useState } from "react";

function App() {
  const [userInput, setUserInput] = useState({
    amount: 1000,
    month: 12,
    processingFees: 199,
    intRate: 18,
    shouldGenerate: true
  });
  function handleChange(curInputField, val) {
    setUserInput((prevUserInput) => {
      return { ...prevUserInput, [curInputField]: val };
    });
  }
  let emiResults = EmiCalCulationHelper(+userInput.amount, +userInput.intRate, +userInput.month);


  return (
    <>
      <div className="bg-[#000814] min-w-screen min-h-screen">
        <h1 className="text-center p-3 text-white">EMI-WISE</h1>
        <div className="grid md:grid-rows-2 md:grid-flow-col gap-2 p-10 mx-auto">
          <InputComponent
            handleInputChange={handleChange}
            userInputProps={userInput}
          />
          <SummaryComponent userInputProps={(userInput.shouldGenerate === false)?{}:userInput} emiBreakup={(userInput.shouldGenerate === false)?[]:emiResults}/>
          <EmiBreakupComponent emiBreakup={(userInput.shouldGenerate === false)?[]:emiResults} />
        </div>
      </div>
    </>
  );
}

export default App;
