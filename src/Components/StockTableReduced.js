import React, {useState} from 'react';

export default function StockTableReduced(name, symbol, onClick) { 

  const handleRowClick = () => {
    onClick({ name, symbol });
  };
  
  return (
  <tr onClick={handleRowClick} style={{ cursor: 'pointer' }}>
    <td>{name}</td>
    <td>{symbol}</td>
  </tr>
)
}