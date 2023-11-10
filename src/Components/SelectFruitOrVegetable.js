export default function SelectFruitOrVegetable(props) {
  const { fruitsAndVeggetablesAPI, setInsideColor, setOutsideColor, setBrachah, setName, setTurn, setCanSelect, setCount } = props;

  function select(fruitsAndVeggetables) {
    setTurn(false)
    setCanSelect(true)
    setCount(0)
    const selection = Math.floor(Math.random() * fruitsAndVeggetables.length);
    const fruitOrVegetableSelection = fruitsAndVeggetables[selection];
    const { insideColor, outsideColor, brachah, name } = fruitOrVegetableSelection;
    setInsideColor(`Inside Color: ${insideColor}`);
    setOutsideColor(`Outside Color: ${outsideColor}`);
    setBrachah(`Brachach: ${brachah}`);
    setName(name);
  }
  
  return (
    <div>
      <h3>Click to begin your challenge</h3>
      <button onClick={() => {select(fruitsAndVeggetablesAPI)}}>Select</button>
    </div>
  )
}