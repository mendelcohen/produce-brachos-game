import { useState, useEffect } from 'react';

export default function FruitsAndVegetablesSelection(props) {
  const { fruitsAndVeggetablesOptions, playersGuessHandler, selectedFruitOrVeggie, canSelect, turn } = props;
  
  // useEffect(() => {
    
  // }, [ fruitsAndVeggetablesOptions ]) 

  return (
    <div>
      <select
         onChange={playersGuessHandler}
         value={turn ? selectedFruitOrVeggie : ""}
         disabled={!canSelect}
      >
        <option disabled={true} value="">Select a fruit or a vegetable</option>
        {
          fruitsAndVeggetablesOptions &&
          fruitsAndVeggetablesOptions.map(fruitOrVeggie => {
            const { id, name, selectDisabled } = fruitOrVeggie
            return (
              <option 
                key={id}
                value={name}
                disabled={selectDisabled}
              >
                {name}
              </option>
            )
          })
        }
      </select>
    </div>
  )
}