import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { useState } from "react";
import Lap from "./Lap";
function App() {
  const [continueTimer, setContinueTimer] = useState(false);
  const [timer, setTimer] = useState(0);
  const [laps, setLaps] = useState(() => {
        const savedLaps = localStorage.getItem("laps");
        return savedLaps ? JSON.parse(savedLaps) : []; //returns savedLaps as an array because "laps" was already an array
    });

  function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  useEffect(() => {
    let time;

    // use setInterval to create a timer
    if (continueTimer) {
      time = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
        //function to convert timer into hh:mm:ss
      }, 1000);
    }

    // cleanup function to clear the timer created by setInterval
    return () => {
      //remember, this needs to return a function, hence the arrow function syntax
      clearInterval(time);
    };
  }, [continueTimer]);

    useEffect(() => {
        localStorage.setItem("laps", JSON.stringify(laps)); //converts laps into "laps", which is just laps and its original data type but JSON'ified
    }, [laps]);

  return (
    <div>
      <h1>Timer:</h1>
      <button onClick={() => setContinueTimer(true)}>Start Timer!</button>
      <button onClick={() => setContinueTimer(false)}>Stop Timer!</button>{" "}
      {/* everytime we press stop, we don't want the timer to reset to 0 */}
      <button
        onClick={() => {
          setContinueTimer(false);
          setTimer(0);
        }}
      >
        Reset Timer!
      </button>{" "}
      {/* resetting continueTimer from false to false doesn't trigger the useEffect */}
      <button onClick={() => setLaps([...laps, timer])}>Lap</button>
      {laps ? (
        laps.map((time, index) => (
          <Lap key={index} index={index} time={time} formatTime={formatTime} />
        ))
      ) : (
        <></>
      )}
      <p>{formatTime(timer)}</p>
    </div>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);