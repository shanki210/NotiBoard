import React from 'react';
import GoogleSlidesWidget from '.components/GoogleSlidesWidget';
import PomodoroTimerWidget from '.components/PomodoroTimerWidget';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Digital Notice Board</h1>
      </header>
      <div className="notice-board">
        <GoogleSlidesWidget />
        <PomodoroTimerWidget />
      </div>
    </div>
  );
}

export default App;
