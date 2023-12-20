import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import Background from "./assets/background/background.jpg";
import rainy from "./assets/background/rain-clouds.mp4";

function App() {
  const [apiKey, setApiKey] = useState("d94bcd435b62a031771c35633f9f310a");
  function formatDate(timestamp) {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const date = new Date(timestamp * 1000); // Assuming timestamp is in seconds
    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];

    return `${dayOfWeek} ${dayOfMonth} ${month}`;
  }
  const [backgroundImg, setBackgroundImg] = useState("url(" + Background + ")");
  let input = document.querySelector(".input") as HTMLInputElement;
  function handleChange(event: any) {
    setInputValue(event.target.value);
  }
  async function sendInput(event: any) {
    if (input && event.key === "Enter") {
      setInputValue(input.value);
      if(inputValue !== "") {
        try {
          setLoading(true);
          await sendRequest();
        } finally {
          setShowBlock(true);
          if (jsonResponse.cod !== "200") {
            displayError();
          }
          console.log(jsonResponse)
          setTimeout(() => {
            setLoading(false);
          }, 1000);
          input.value = "";
        }
      }else if(input.value == "") {
        window.alert("AT LEAST ONE CHARACTER FGS")
      }
    }
  }
  function displayError() {
    setErrorMsg(true);
    // console.log(errorMsg)
    console.log(jsonResponse);
    setTimeout(() => {
      setErrorMsg(false);
      setShowBlock(false);
    }, 1500);
  }
  async function sendRequest() {
    const requestURL = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${inputValue}&units=metric&cnt=7&appid=${apiKey}`;

    // fetch new data
    const resp = await fetch(requestURL);
    jsonResponse = await resp.json();
    await setResponse(jsonResponse);
  }
  const handleSearchIconClick = () => {
    sendInput({ key: 'Enter' });
  };

  let jsonResponse: any;
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState({});
  const [showBlock, setShowBlock] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isApiVisible, setIsApiVisible] = useState(false);

  const toggleApi = () => {
    setIsApiVisible(!isApiVisible);
  };
  const hom = () => {
    setShowBlock(false);
  };
  const handleApiInputChange = (event) => {
    let input = document.querySelector(".apiInput") as HTMLInputElement;
    if (event.key === 'Enter') {
      setApiKey(event.target.value);
      input.value = "";
    }
  }

  return (
    <div className="cont">
      {loading ? <div className="loading">Loading...</div> : null}
      {showBlock ? (
        errorMsg == true ? (
          <div className="errmsgdiv">
            {/* <video autoPlay loop muted className="videoErr" src="src/assets/background/11n.mp4"></video> */}
            <div className="errmsg">
              <p className="invinp">Invalid Input</p>
              <p>{response.message}</p>
            </div>
          </div>
        ) : (
          <div className="aftersearchcont">
            <video
              className="bg-clip"
              src={`src/assets/background/${response.list[0].weather[0].icon}.mp4`}
              loop
              autoPlay
              muted
            ></video>
            <div className="hom" onClick={hom}>
              <p>Home</p>
            </div>
            <div className="searchCont">
              
            <div className="inpContAct">
              <input
                className="input"
                type="text"
                onKeyDown={sendInput}
                onChange={handleChange}
                placeholder="Search"/>
            </div>
            <div className="searchIcoNext" onClick={handleSearchIconClick}>
                <img src="src/assets/search.svg" alt="" />
              </div>
            </div>
            {response.city && (
              <div className="blocks">
                <div className="block block1">
                  <p className="city">
                    {response.city.name}, {response.city.country}
                  </p>
                  <p className="time">{formatDate(response.list[0].dt)}</p>
                  <p className="pop">Population: {response.city.population}</p>
                </div>
                <div className="block block2">
                  <div className="temp">
                    <img
                      src={`src/assets/icons/${response.list[0].weather[0].icon}.svg`}
                      alt=""
                    />
                    <p className="p1">{response.list[0].temp.day}°C</p>
                    <p className="p1">
                      {response.list[0].weather[0].main}, &#160;
                      {response.list[0].weather[0].description}
                    </p>
                  </div>
                  <div className="hupress">
                    <div className="div div1">
                      <img src="src/assets/wind.svg" alt="" />
                      <p>{response.list[0].speed} m/s N</p>
                    </div>
                    <div className="div">
                      <img src="src/assets/pressure.svg" alt="" />
                      <p>{response.list[0].pressure} hpa</p>
                    </div>
                    <div className="div">
                      <img src="src/assets/humidity.svg" />
                      <p>{response.list[0].humidity}%</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      ) : (
        <div className="introcont" style={{ backgroundImage: backgroundImg }}>
          <div className="head">
            <div className="searchCont">
              <div className="inpCont">
                <input
                  className="input"
                  type="text"
                  onKeyDown={sendInput}
                  onChange={handleChange}
                  placeholder="Search"
                  />
              </div>
              <div className="searchIco" onClick={handleSearchIconClick}>
                <img src="src/assets/search.svg" alt="" />
              </div>
            </div>
            <div className="apiButtDiv">
              <button className="apiButt" type="button" onClick={toggleApi}>
                Custom Key
              </button>
            </div>
            <div className={`api ${isApiVisible ? "apiSlideDown" : ""}`}>
              <input
                className="apiInput"
                type="text"
                placeholder="Insert Key Here"
                onKeyDown={handleApiInputChange}
              />
            </div>
          </div>
          <div className="blocks">
            <p className="intro">
              WELCOME TO WEATHERDY <br />
              <span>START BY SEARCHING A COUNTRY</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
