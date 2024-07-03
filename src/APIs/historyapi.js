import { useEffect } from "react";
import {useState} from 'react';
// API key
const API_KEY = '1oeViSb1Ke71OdGDjnuVF2G8pYJbOmtb313DyxUL';

// Function that returns appropriate data to App.js
export function useHistoryData (symbol, date) {
    const [historyloading, setLoading] = useState(true);
    const [historyData, setHistoryData] = useState([]);
    const [historyerror, setError] = useState(null);

    //Asynchronously assign values to setLoading, setStockData and setError based on updated values of search.
    useEffect(() => {
            if (!symbol) return;
        
            (async () => {
                try {
                    let data;
                    // Based on if there is a search term for industry, load appropriate data.
                    if (date) {
                        data = await getSpecificHistoryStockData(symbol, date);}
                    else {
                        data = await getHistoryStockData(symbol);}
                    setHistoryData(data);
                    setLoading(false);
                } catch (err) {
                    setError(err);
                    setLoading(false);
                }
            })();
        }, [symbol, date]);

    return {
        historyloading,
        historyData,
        historyerror: null,
    }
}

//Fetch stock data from a certain date
async function getHistoryStockData (symbol) {
    const baseUrl = "https://aij1hx90oj.execute-api.ap-southeast-2.amazonaws.com/prod/";
    const endpoint = `history?symbol=${symbol}`;

    const url = `${baseUrl}${endpoint}`;

    const options = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'x-api-key' : API_KEY
        }
    }

    let res = await fetch(url, options);
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    let stocks = await res.json();

    return stocks;
}
//Fetch all stock data
async function getSpecificHistoryStockData (symbol, date) {
    const baseUrl = "https://aij1hx90oj.execute-api.ap-southeast-2.amazonaws.com/prod/";
    const endpoint = `history?symbol=${symbol}&from=${date}`;

    const url = `${baseUrl}${endpoint}`;

    const options = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'x-api-key' : API_KEY
        }
    }

    let res = await fetch(url, options);
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    let stocks = await res.json();

    return stocks;
}
