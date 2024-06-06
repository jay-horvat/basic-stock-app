import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home.js';
import About from './About.js';
import Contact from './Contact.js';
import './assets/styles/App.css'
import DropDownList from './Components/DropDownList.js';

export default function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">Industries</Link></li>
                <ul><DropDownList /></ul>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>
        </header>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <footer className="App-footer">
          <p>&copy; 2024 My Website. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}
