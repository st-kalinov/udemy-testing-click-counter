import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  const incrementCount = () => {
    if (errorMessage) {
      setErrorMessage(null);
    }

    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
    } else {
      setErrorMessage("Cannot decrement below 0");
    }
  }

  return (
    <div className="App" data-test="component-app">
      <h1 data-test="counter-display">
        The counter is currently
        <span data-test="count">{ count }</span>
      </h1>
      {
        errorMessage
          ? <p
            style={{ color: 'red' }}
            data-test="error-message"
          >
            {errorMessage}
          </p>
          : null
      }
      <button data-test="increment-button" onClick={incrementCount}>Increment counter</button>
      <button data-test="decrement-button" onClick={decrementCount}>Decrement button</button>
    </div>
  );
}

export default App;
