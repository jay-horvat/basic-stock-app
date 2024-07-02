import React, { useState } from 'react';
import { useStockData } from './api.js';
import { useHistoryData } from './historyapi.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import LineGraph from './Components/LineGraph.js';
import DateSelector from './Components/DateSelector.js';
import SummaryTable from './Components/SummaryTable.js';
import Card from 'react-bootstrap/Card';

function StockExplorer() {
  const [selectedStock, setSelectedStock] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const {loading, stockData, error} = useStockData();
  const {historyloading, historyData, historyerror} = useHistoryData(selectedStock ? selectedStock.symbol : null, selectedDate ? selectedDate.toISOString().split('T')[0] : null);

  const handleStockSelect = (stock) => {
    setSelectedStock(stock);}

    
  const handleDateChange = (date) => {
    setSelectedDate(date);}

  const filteredStockData = stockData.filter(
    (stock) =>
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <div>
                <h2>{selectedStock.name} ({selectedStock.symbol})</h2>  
              <div>
                <div>
              <p>Show stock price from: <DateSelector onDateChange={handleDateChange} /></p>
              </div>
                <div>
                  <LineGraph historyData={historyData}/>
                </div>
                <div>
                  <SummaryTable historyData={historyData}/>
                </div>
              </div>
              </div>
            ) : (
              <h2>Select a Stock</h2>
            )}
          </div>
          
          <div className="col-md-4" >
          <div>
            <h6>Search: <input
                type="text"
                placeholder="Search a stock"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              /></h6>
            
          </div>
          <div style={{ height: '500px', overflowY: 'auto', border: '3px solid #ccc' }}>  
            <table>
              <tbody>
                {filteredStockData.map((stock) => (
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
    </div>
  );
}

export default StockExplorer;
