import React, { useState } from 'react';

const Fortune = () => {
  const [fortune, setFortune] = useState('');

  const getFortune = () => {
    fetch('https://omikujiapp.fly.dev/fortunes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('API Response:', data); // レスポンスをログに出力
        setFortune(data.fortune); // データをセット
      })
      .catch(error => {
        console.error('Error fetching fortune:', error);
      });
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
