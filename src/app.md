import { useState } from 'react'
import './App.css'



function Search({inputValue, setInputValue, sendRequest, handleClick, handleChange}:any) {
  let input = document.querySelector('.input') as HTMLInputElement;
  const []

  function sendInput(event:any) {
    if(input && event.key === "Enter"){
      setInputValue(input.value)
      sendRequest()
    }
  }
  return(
    <div>
      <input className='input' type="text" onKeyDown={sendInput} onChange={handleChange}/>
      {/* This is a button that tells the robot to alert what's in the input field */}
      <button onClick={handleClick}>Show me the message!</button>
    </div>
  );
}
function App() {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState({});
  function handleChange(event:any) {
    setInputValue(event.target.value);
  }
  function handleClick() {
    console.log("The robot says:" + inputValue)
  }
  async function sendRequest() {
    const apiKey = 'd94bcd435b62a031771c35633f9f310a';
    const requestURL = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${inputValue}&units=metric&cnt=7&appid=d94bcd435b62a031771c35633f9f310a`;
    // const requestURL = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${inputValue}&units=metric&cnt=7&appid=253b3dbf181d84b475292aa38452658e`;
    
    // fetch new data
    const resp = await fetch(requestURL)
    const jsonResponse = await resp.json();
    
    setResponse(jsonResponse)
    console.log(jsonResponse);
  }

  
  return(
    <div>
      <Search inputValue={inputValue} setInputValue={setInputValue} sendRequest={sendRequest} handleClick={handleClick} handleChange={handleChange} />
    </div>
  );
}

export default App
