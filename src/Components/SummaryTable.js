import React from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';


const SummaryTable = ({historyData}) => {

if (!historyData || historyData.length === 0) {
    return <p>No data available.</p>;
    }

  const maxClosePrice = historyData.reduce((max, history) => {
    return history.close > max ? history.close : max;
  }, -Infinity);

  const minClosePrice = historyData.reduce((min, history) => {
    return history.close < min ? history.close : min;
  }, Infinity);

  const percentGrowth = (historyData[historyData.length - 1].close - historyData[0].close)/historyData[0].close * 100;

  return (
    <Table striped bordered hover>
        <thead colSpan={2} centre>Summary Table</thead>
        <tr><td>Stock Name</td><td>{historyData[0].name} ({historyData[0].symbol})</td></tr>
        <tr><td>Highest Close Price</td><td>$ {maxClosePrice}</td></tr>
        <tr><td>Lowest Close Price</td><td>$ {minClosePrice}</td></tr>
        <tr><td>Percentage growth:</td><td>{percentGrowth.toFixed(2)} %</td></tr>
    </Table>

  );
};

export default SummaryTable;