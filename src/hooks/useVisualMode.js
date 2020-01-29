import { React, useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  function transition(view, change) {
    if(!change){
      setHistory(prev => ([...prev, mode]));
    }
    setMode(view); 
  }
  
  function back() {
    if (history.length >= 1) {
      setMode(history[history.length - 1]);
      setHistory(prev => [...prev.slice(0, -1)]);
    }
  }

  
  return { mode, transition, back };
}

// const [history, setHistory] = useState([initial]);
