import React, { useState } from 'react';
import { Input, Button, Card } from 'antd';
import 'antd/dist/antd.css'; // AntDのスタイルをインポート

const Fortune = () => {
  const [fortune, setFortune] = useState('');
  const [prayer, setPrayer] = useState('');

  const getFortune = () => {
    fetch('https://omikujiapp.fly.dev/fortunes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prayer })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setFortune(data.fortune);
    })
    .catch(error => {
      console.error('Error fetching fortune:', error);
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <Card title="2024年の運勢を占う" bordered={false} style={{ textAlign: 'center' }}>
        <Input
          placeholder="祈願の言葉を入力してください"
          value={prayer}
          onChange={e => setPrayer(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        <Button type="primary" onClick={getFortune}>2024年の運勢を占う</Button>
        {fortune && <p style={{ marginTop: '20px' }}>{fortune}</p>}
      </Card>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        {fortune && (
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(fortune + 'https://omikuji-front.vercel.app/')}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Share on Twitter
          </a>
        )}
      </div>
    </div>
  );
};

export default Fortune;
