import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home.js';
import StockExplorer from './StockExplorer.js';
import AboutContact from './AboutContact.js';
import './assets/styles/App.css';

export default function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/stockexplorer">Stock Explorer</Link></li>
              <li><Link to="/aboutcontact">About Stock Spotter</Link></li>
            </ul>
          </nav>
        </header>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stockexplorer" element={<StockExplorer />} />
            <Route path="/aboutcontact" element={<AboutContact />} />
          </Routes>
        </main>
        <footer className="App-footer">
          <p>&copy; 2024 My Website. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}
