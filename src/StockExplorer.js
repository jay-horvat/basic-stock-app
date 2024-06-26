import React, { useState } from 'react';
import { useStockData} from './api.js';
import StockTableReduced from './Components/StockTableReduced.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function StockExplorer() {
  const [selectedStock, setSelectedStock] = useState(null);
  
  const [search, setSearch] = useState("");  
  const {loading, stockData, error} = useStockData(search);
  

  const handleStockSelect = (stock) => {
    setSelectedStock(stock);}

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  return (
    
    <div>
      <div className="text-center py-3">
        <h1>Stock Explorer</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            {selectedStock ? (
              <p>{selectedStock.symbol}</p>
            ) : (
              <h2>Select a Stock</h2>
            )}
          </div>
          <div className="col-md-4" style={{ height: '300px', overflowY: 'auto', border: '1px solid #ccc' }}>
            <table>
              <tbody>
                {stockData.map((stock) => (
                  <tr key={stock.symbol} onClick={() => handleStockSelect(stock)} className="stock-table-row">
                  <td>{stock.name}</td>
                  <td>{stock.symbol}</td>
                  </tr>
                ))} 
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockExplorer;
