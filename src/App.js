import { useState, useEffect } from 'react';
import './App.css';
import fruitsAndVeggetablesAPI from './Components/FruitColorApi';
import SelectFruitOrVegetable from './Components/SelectFruitOrVegetable';
import FruitsAndVegetablesSelection from './Components/FruitsAndVegetablesSelection';
import SelectionResult from './Components/SelectionResult';

function App() {
  const [ fruitsAndVeggetablesOptions, setFruitsAndVeggetablesOptions ] = useState()
  const [ insideColor, setInsideColor] = useState("");
  const [ outsideColor, setOutsideColor ] = useState("");
  const [ brachah, setBrachah ] = useState("");
  const [ name, setName ] = useState("");
  const [ canSelect, setCanSelect ] = useState(true);
  const [ selectedFruitOrVeggie, setSelectedFruitOrVeggie ] = useState("");
  const [ selectionResult, setSelectionResult ] = useState({});
  const [ turn, setTurn ] = useState()
  const [ count, setCount ] = useState(0);

  useEffect(() => {
    const fruitsAndVeggetables = fruitsAndVeggetablesAPI.map((fruitOrVeggetable)  => { 
      return {
        id: fruitOrVeggetable.id,
        name: fruitOrVeggetable.name,
        selectDisabled: false
      }
    });
    setFruitsAndVeggetablesOptions(fruitsAndVeggetables)
  }, [name]) 
  
  const playersGuessHandler = (e) => {
    const fruitVeggieName = e.target.value;
    setSelectedFruitOrVeggie(fruitVeggieName);
    setTurn(true);
    setCount(count + 1);
    disableSelectHandler(fruitVeggieName);
    selectionResultHandler(fruitVeggieName);
  }
  
  function disableSelectHandler(fruitVeggieName) {
    fruitsAndVeggetablesOptions.forEach(fruitOrVeggie => {
      if (fruitOrVeggie.name === fruitVeggieName) {
        const index = fruitsAndVeggetablesOptions.indexOf(fruitOrVeggie);
        fruitsAndVeggetablesOptions[index].selectDisabled = true;
      }
    });
  }

  function selectionResultHandler(fruitVeggieName) {
    const correctAnswer = { responseMessage: "Great job!", fruitVeggieName, triesLeft: 0 };
    const inCorrectAnswer = { responseMessage: "Try again!", fruitVeggieName, triesLeft: 2 - count };
    const inCorrectAnswersCompleted = { responseMessage: "You tried 3 times and answered incorrectly.", fruitVeggieName, triesLeft: "no" };
    if (fruitVeggieName !== name && count > 1) {
      setSelectionResult(inCorrectAnswersCompleted);
      setCanSelect(false);
    } else if (fruitVeggieName === name) {
      setSelectionResult(correctAnswer);
      setCanSelect(false);
    } else {
      setSelectionResult(inCorrectAnswer);
    } 
  }

  return (
    <div className="App">
      <SelectFruitOrVegetable
        fruitsAndVeggetablesAPI={fruitsAndVeggetablesAPI} 
        setInsideColor={setInsideColor}
        setOutsideColor={setOutsideColor}
        setBrachah={setBrachah}
        setName={setName}
        setTurn={setTurn}
        setCanSelect={setCanSelect}
        setCount={setCount}
      /> 
     
      <h4 className="fruit-veggie-detail">{insideColor}</h4>
      <h4 className="fruit-veggie-detail">{outsideColor}</h4>
      <h4 className="fruit-veggie-detail">{brachah}</h4>

      {
        name &&
        <FruitsAndVegetablesSelection 
          fruitsAndVeggetablesOptions={fruitsAndVeggetablesOptions} 
          playersGuessHandler={playersGuessHandler} 
          selectedFruitOrVeggie={selectedFruitOrVeggie}
          canSelect={canSelect}
          turn={turn}
          name={name}
        />
      }

      {
        selectedFruitOrVeggie && turn &&
        <SelectionResult 
          selectionResult={selectionResult} 
          setSelectionResult={setSelectionResult}
        />
      }

    </div>
  );
}

export default App;
