import React, { useEffect, useState } from 'react';
const API_KEY = '1oeViSb1Ke71OdGDjnuVF2G8pYJbOmtb313DyxUL';

// Get all data from API
async function GetAllStockData () {
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

//Once all data received, make list of unique industry names
async function MakeList () {
    const allData = await GetAllStockData();

    const uniqueIndustries = [...new Set(allData.map(allData => allData.industry))];
    return uniqueIndustries;
}

//Once lsit formed, populate DROPDOWNlist with list items
export default function DropDownList() { 
    const [industries, setIndustries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const industriesToList = await MakeList();
            setIndustries(industriesToList);
        };

        fetchData();
    }, []);

    return (
    <ul>
        {industries.map((industry) => (
            <li>{industry}</li>
        ))}
    </ul>
    )
  }