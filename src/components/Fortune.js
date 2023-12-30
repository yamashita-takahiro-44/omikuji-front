import React, { useState } from 'react';
import { Layout, Input, Button, Card } from 'antd';
import logo from './logo.png'; // ロゴ画像のインポート
import fortuneGif from './fortune.gif'; // 占い中のGIF画像のインポート

const { Content } = Layout;

const Fortune = () => {
  const [fortune, setFortune] = useState('');
  const [prayer, setPrayer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const shareUrl = "https://omikujiapp.vercel.app"; // 共有するURL

  const getFortune = () => {
    setIsLoading(true);
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
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <Layout style={{ minHeight: '100vh', position: 'relative' }}>
      <Content style={{ padding: '50px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <Card title="2024年の運勢を占う" bordered={false}>
          <Input
            placeholder="祈願の言葉を入力してください"
            value={prayer}
            onChange={e => setPrayer(e.target.value)}
            style={{ marginBottom: '20px' }}
          />
          <Button type="primary" onClick={getFortune} disabled={isLoading}>占う</Button>
          {fortune && (
            <>
              <p style={{ marginTop: '20px' }}>{fortune}</p>
              <Button type="link" href={`https://twitter.com/intent/tweet?text=祈願の言葉：${encodeURIComponent(prayer)} 結果：${encodeURIComponent(fortune)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer">
                Twitterで共有
              </Button>
            </>
          )}
        </Card>
      </Content>
      {isLoading && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2 }}>
          <img src={fortuneGif} alt="占い中" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </div>
      )}
      <div style={{ position: 'absolute', width: '200%', left: '50%', bottom: 0, transform: 'translateX(-50%)', zIndex: 0 }}>
        <img src={logo} alt="ロゴ"/>
      </div>
    </Layout>
  );
};

export default Fortune;
