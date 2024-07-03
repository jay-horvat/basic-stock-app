import { useEffect } from "react";
import {useState} from 'react';
// API key
const API_KEY = '1oeViSb1Ke71OdGDjnuVF2G8pYJbOmtb313DyxUL';

// Function that returns appropriate data to App.js
export function useStockData (search) {
    const [loading, setLoading] = useState(true);
    const [stockData, setStockData] = useState([]);
    const [error, setError] = useState(null);

    //Asynchronously assign values to setLoading, setStockData and setError based on updated values of search.
    useEffect(() => {
            (async () => {
                try {
                    // Based on if there is a search term for industry, load appropriate data.
                    const data = await getInitialStockData();
                    setStockData(data);
                    setLoading(false);
                } catch (err) {
                    setError(err);
                    setLoading(false);
                }
            })();
        }, [search]);

    return {
        loading,
        stockData,
        error: null,
    }
}

//Fetch all stock data
async function getInitialStockData () {
    const baseUrl = "https://aij1hx90oj.execute-api.ap-southeast-2.amazonaws.com/prod/";
    const endpoint = `all`;

    const url = `${baseUrl}${endpoint}`;

    const options = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'x-api-key' : API_KEY
        }
    }

    let res = await fetch(url, options);
    let stocks = await res.json();

    return stocks.map((stock) => ({
        name: stock.name,
        symbol: stock.symbol,
        industry: stock.industry,
    }))
}

//Potential upgrades:
// fix case sensitive, respond to "enter", error of "industry doesnt exist" and then return base data. 