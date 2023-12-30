import React, { useState } from 'react';
import { Layout, Input, Button, Card } from 'antd';

const { Content } = Layout;

const Fortune = () => {
  const [fortune, setFortune] = useState('');
  const [prayer, setPrayer] = useState('');
  const shareUrl = "https://omikujiapp.vercel.app"; // 共有するURL

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
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '50px', textAlign: 'center' }}>
        <Card title="2024年の運勢を占う" bordered={false}>
          <Input
            placeholder="祈願の言葉を入力してください"
            value={prayer}
            onChange={e => setPrayer(e.target.value)}
            style={{ marginBottom: '20px' }}
          />
          <Button type="primary" onClick={getFortune}>占う</Button>
          {fortune && (
            <>
              <p style={{ marginTop: '20px' }}>{fortune}</p>
              <Button type="link" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(fortune)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer">
                Twitterで共有
              </Button>
            </>
          )}
        </Card>
      </Content>
    </Layout>
  );
};

export default Fortune;
