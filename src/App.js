import React from 'react';
import './App.css';
import Fortune from './components/Fortune'; // Fortuneコンポーネントをインポート

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Fortune />
      </header>
    </div>
  );
}

export default App;
