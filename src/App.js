import { useEffect, useState } from 'react';
import './App.css';

function App() {
const [breakLength, setBreakLength] = useState(5);
const [sessionLength, setSessionLength] = useState(25);
const [time,setTime] = useState(5*60)
const [breakOn,setBreakOn] = useState(false)
const [timerOn,setTimerOn] = useState(false)

const changeBreak = (button) => {
  if (button =='down') {
    breakLength > 1? setBreakLength(breakLength - 1): setBreakLength(breakLength);
  } else {  
    breakLength < 60 ? setBreakLength(breakLength + 1): setBreakLength(breakLength);
  } 
}

const changeSession = (button) => {
    if (button =='down') {
      sessionLength > 1 ? setSessionLength(sessionLength - 1) : setSessionLength(sessionLength);
      sessionLength > 1 ? setTime((sessionLength - 1) * 60) : setTime(sessionLength * 60);
    } else {  
      sessionLength < 60 ? setSessionLength(sessionLength + 1) : setSessionLength(sessionLength);
      sessionLength < 60 ? setTime((sessionLength + 1) * 60) : setTime(sessionLength * 60);
    }   
}

const reset = () => {   
    setBreakOn(false);
    setTimerOn(false);
    setBreakLength(5);
    setSessionLength(25);
    setTime(25*60);
    let audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;   
  }

const playAudio = () => {      
    let audio = document.getElementById('beep');
    let playPromise = audio.play();
    if(playPromise !== undefined) {
        playPromise.then(_ => {           
          })
          .catch(error => {          
          });
    }
  } 

const startStopTimer = () => {
  setTimerOn(!timerOn);
 } 

useEffect(() => {
  if (time === 0) {
    playAudio();
    setBreakOn(!breakOn);
    breakOn !== true ? setTime(breakLength*60) : setTime(sessionLength*60);
  } 
  if (timerOn)
  var timeout = setTimeout(() => setTime(time-1),1000); 
  return () => clearTimeout(timeout);
  },[time,timerOn]); 

const pausePlay = timerOn == true? 'bi bi-pause-circle-fill' : 'bi bi-play-circle-fill';   

const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return (`${minutes < 10? '0' + minutes:minutes}:${seconds < 10? '0' + seconds:seconds}`);
  } 

  return (
    <div className="App container">
     <div id='break-container'>
     <h5 id='break-label'>Break Length</h5>
     <h5 id='break-length'>{breakLength}</h5>
     <button id='break-decrement'className="bi bi-arrow-down-circle-fill" onClick={() => changeBreak('down')}/>
     <button id='break-increment'className="bi bi-arrow-up-circle-fill" onClick={() => changeBreak('up')}/>
     </div>

     <div id='session-container'>
     <h5 id='session-label'>Session Length</h5>
     <h5 id='session-length'>{sessionLength}</h5>
     <button id='session-decrement'className="bi bi-arrow-down-circle-fill" onClick={() => changeSession('down')}/>
     <button id='session-increment'className="bi bi-arrow-up-circle-fill" onClick={() => changeSession('up')}/>
     </div>

     <div id='timer-container'>
     <h5 id='timer-label'>{breakOn == false ? 'Session':'Break'}</h5>     
     <h1 id='time-left'>{formatTime()}</h1>
     <button id='start_stop'className={pausePlay} onClick={startStopTimer}></button>     
     <button id='reset'className="bi bi-arrow-repeat" onClick={reset}/>
     </div>

     <audio id='beep' preload='auto' src="http://soundbible.com/grab.php?id=1766&type=mp3"/>
     
    </div>
  );
}

export default App;
