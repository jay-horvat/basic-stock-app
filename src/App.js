import './assets/styles/App.css';
import React, { useState } from 'react';
import { useStockData} from './api.js';
import StockTable from './Components/StockTable.js';
import SearchBar from './Components/SearchBar.js';
import Header from './Components/Header.js';
import Footer from './Components/Footer.js';

export default function App() {
    const [search, setSearch] = useState("");  
    const {loading, stockData, error} = useStockData(search);
    
  
    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>Something went wrong: {error.message}</p>;
    }

    return (
      
        <div className="App">
        <Header/>

          <div class="container-fluid p-5 my-5 bg-dark text-white">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Symbol</th>
                  <th>Industry<div class="container-fluid">
                    <SearchBar onSubmit={setSearch} /></div></th>
                </tr>
              </thead>
              <tbody>
                {stockData.map((stock) => (<StockTable name={stock.name} 
                symbol={stock.symbol} industry={stock.industry} />))}
              </tbody>
            </table>
          </div>
          <div>
            <Footer/>
          </div>
        </div>        
    );
  }

