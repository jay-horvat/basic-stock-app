import React, { useState } from 'react';
import { useStockData } from './APIs/api.js';
import { useHistoryData } from './APIs/historyapi.js';
import { useCompareHistoryData } from './APIs/comparehistoryapi.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import LineGraph from './Components/LineGraph.js';
import DateSelector from './Components/DateSelector.js';
import SummaryTable from './Components/SummaryTable.js';

function StockExplorer() {
  const [selectedStock, setSelectedStock] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [compareStock, setCompareStock] = useState(null);
  const [wantToCompare, setWantToCompare] = useState(false);

  const {loading, stockData, error} = useStockData();
  const {historyloading, historyData, historyerror} = useHistoryData(selectedStock ? selectedStock.symbol : null, selectedDate ? selectedDate.toISOString().split('T')[0] : null);
  const { compareHistoryLoading, compareHistoryData, compareHistoryError } = useCompareHistoryData(compareStock ? compareStock.symbol : null, selectedDate ? selectedDate.toISOString().split('T')[0] : null); 

  const handleStockSelect = (stock) => {
    setSelectedStock(stock);}

  const handleCompareStock = (stock) => {
    setCompareStock(stock);}

  const handleDateChange = (date) => {
    setSelectedDate(date);}

  const toggleCompare = () => {
    setWantToCompare(prevState => !prevState);
  };

  const filteredStockData = stockData.filter(
    (stock) =>
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.industry.toLowerCase().includes(searchTerm.toLowerCase())
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
                      <button onClick={toggleCompare}>Compare another stock</button>
                    </div>
                    <div>
                      {wantToCompare && compareHistoryData ? (
                        <div>
                          <div>
                            <LineGraph historyData={historyData}/>
                            <SummaryTable historyData={historyData}/>
                          </div>
                          <div>
                            <LineGraph historyData={compareHistoryData}/>
                            <SummaryTable historyData={compareHistoryData}/>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <LineGraph historyData={historyData} />
                          <SummaryTable historyData={historyData}/>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <h2>Select a Stock</h2>
              )}
            </div>
            {wantToCompare ? (
            <div className="col-md-4" >
            <div>
              <h6>Search: <input
                  type="text"
                  placeholder="'CVX','Energy','Chevron'"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}/>
              </h6>
            </div>
            <div style={{ height: '500px', overflowY: 'auto', border: '3px solid #ccc' }}>  
              <table>
                <tbody>
                  {filteredStockData.map((stock) => (
                    <tr key={stock.symbol} onClick={() => handleCompareStock(stock)} className="stock-table-row">
                    <td style={{ color: 'red' }}>{stock.name}</td>
                    <td style={{ color: 'red' }}>{stock.symbol}</td>
                    </tr>
                  ))} 
                </tbody>
              </table>
            </div>
          </div> 
          ) : (
          <div className="col-md-4" >
            <div>
              <h6>Search: <input
                  type="text"
                  placeholder="'CVX','Energy','Chevron'"
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
          )}
        </div>
      </div>
    </div>
  );
}

export default StockExplorer;
