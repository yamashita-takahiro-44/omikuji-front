// src/components/Fortune.js
import React, { useState } from 'react';
import axios from 'axios';

const Fortune = () => {
  const [fortune, setFortune] = useState('');

  const getFortune = async () => {
    const response = await axios.get('https://omikujiapp.fly.dev/fortunes');
    setFortune(response.data.prediction);
  };

  return (
    <div>
      <div>
        <button onClick={getFortune}>Get Your Fortune</button>
        {fortune && <p>{fortune}</p>}
      </div>
      <div>
        <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(fortune)}`} target="_blank" rel="noopener noreferrer">Share on Twitter</a>
      </div>
    </div>
  );
};

export default Fortune;
