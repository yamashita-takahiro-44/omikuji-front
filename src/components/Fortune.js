// src/components/Fortune.js
import React, { useState } from 'react';
import axios from 'axios';

const Fortune = () => {
  const [fortune, setFortune] = useState('');

  const getFortune = async () => {
    try {
      const response = await axios.get('https://omikujiapp.fly.dev/fortunes');
      setFortune(response.data.fortune); // ここを修正
    } catch (error) {
      console.error('Error fetching fortune:', error);
    }
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
