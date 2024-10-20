import { useEffect, useState } from "react";

const API_KEY = '1oeViSb1Ke71OdGDjnuVF2G8pYJbOmtb313DyxUL';
const baseUrl = "https://aij1hx90oj.execute-api.ap-southeast-2.amazonaws.com/prod/";

export function useCompareHistoryData(symbol, date) {
  const [compareHistoryLoading, setCompareHistoryLoading] = useState(true);
  const [compareHistoryData, setCompareHistoryData] = useState([]);
  const [compareHistoryError, setCompareHistoryError] = useState(null);

  useEffect(() => {
    const fetchCompareHistoryData = async () => {
      try {
        if (!symbol) return;

        let data;
        if (date) {
          data = await getSpecificHistoryStockData(symbol, date);
        } else {
          data = await getHistoryStockData(symbol);
        }

        setCompareHistoryData(data);
        setCompareHistoryLoading(false);
      } catch (error) {
        setCompareHistoryError(error);
        setCompareHistoryLoading(false);
      }
    };

    fetchCompareHistoryData();
  }, [symbol, date]);

  return {
    compareHistoryLoading,
    compareHistoryData,
    compareHistoryError
  };
}
//without date symbol data fetch
async function getHistoryStockData(symbol) {
  const endpoint = `history?symbol=${symbol}`;
  return fetchData(endpoint);
}
//fetch with a date supplied
async function getSpecificHistoryStockData(symbol, date) {
  const endpoint = `history?symbol=${symbol}&from=${date}`;
  return fetchData(endpoint);
}
//generic api fetch function
async function fetchData(endpoint) {
  const url = `${baseUrl}${endpoint}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY
    }
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
