import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import FlashCard from './FlashCard';
import './App.css';

function App() {
  const [flip, setFlip] = useState(false);
  const [data, setData] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const prevCounter = localStorage.getItem('curItem');
    if (prevCounter) setCounter(parseInt(prevCounter));
    fetch('https://atomyyyy.github.io/flashcard/lyrics.json').then(response => response.json()).then(data => { setData(data) });
  }, []);
  
  const prev = () => {
    const newCounter = (counter + data.length - 1) % data.length;
    setCounter(newCounter);
    localStorage.setItem('curItem', newCounter.toString());
  };

  const next = () => {
    const newCounter = (counter + 1) % data.length;
    setCounter(newCounter);
    localStorage.setItem('curItem', newCounter.toString());
  };

  return (
    <div className="App">
      <header className="App-header">
        <FlashCard
          showBack={flip}
          {...(data ? data[counter] : {})}
        />
        <div style={{ display: 'flex', padding: '20px', width: '320px', justifyContent: 'space-evenly', color: 'white', fontWeight: 'bold' }}>
          <Button
            style={{ color: 'white', fontWeight: 1000 }}
            onClick={prev}
          >
            {'<<'}
          </Button>
          <Button
            style={{ color: 'white', fontWeight: 1000, borderColor: 'white', width: '100px' }}
            variant="outlined"
            onClick={() => setFlip(!flip)}
          >
            {'Flip'}
          </Button>
          <Button
            style={{ color: 'white', fontWeight: 1000 }}
            onClick={next}
          >
            {'>>'}
          </Button>
        </div>
      </header>
    </div>
  );
}

export default App;
