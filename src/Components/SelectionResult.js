export default function SelectionResult(props) {
  const { selectionResult } = props;
  const { responseMessage, fruitVeggieName, triesLeft } = selectionResult;
  
  return (
    <div>
      <p>You answered {fruitVeggieName}</p>
      <p>{responseMessage}</p>
      {
        triesLeft !== 0 ?
          <p>You have {triesLeft} more {triesLeft === 1 ? "guess" : "guesses"}.</p>
          :
          <p>Click on select to play again.</p>
      }
    </div>
  )
}