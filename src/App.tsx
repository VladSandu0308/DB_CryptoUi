import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { CustomTable } from './components/CustomTable';

export interface Currency {
  symbol: string;
  rate: number;
  asset: string;
}



function App() {
  const [baseCurrency, setBaseCurrency] = useState('EUR');
  const [currenciesList, setCurrenciesList] = useState<Currency[]>([]);
  const [tempCurrenciesList, setTempCurrenciesList] = useState<Currency[]>([]);

  let cryptoCurrencies: string[] = ['EUR', 'USD', 'GBP', 'RON', 'AED', 'BTC'];
  
  useEffect(() => {
    var requestURLNames = 'https://api.exchangerate.host/symbols';
      
    var requestNames = new XMLHttpRequest();
    requestNames.open('GET', requestURLNames);
    requestNames.responseType = 'json';
    requestNames.send();

    requestNames.onload = function() {
      var response = requestNames.response;
      console.log(response);

      let tempList: Currency[] = [];

      cryptoCurrencies.map((crypto: string) => {
        tempList.push({symbol: crypto, rate: 0, asset: response['symbols'][crypto]?.description})
      })

      console.log(tempList);
      setTempCurrenciesList(tempList);
      console.log(tempCurrenciesList);
    }
        
  }, [])

  useEffect(() => {
    if (currenciesList.length === 0) {
      
    }
    var requestURL = `https://api.exchangerate.host/latest?base=${baseCurrency}&symbols=${cryptoCurrencies.join(',')}`;
      
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
      var response = request.response;
      console.log(response);

      let tempList: Currency[] = [];

      tempCurrenciesList.map((crypto) => {
        tempList.push({symbol: crypto.symbol, rate: response['rates'][crypto.symbol], asset: crypto.asset});
      })

      setCurrenciesList(tempList);
    }
    
  }, [baseCurrency])

  const handleChange = (event: SelectChangeEvent) => {
    setBaseCurrency(event.target.value as string);
  };

  console.log(currenciesList);
  return (
    <div className="container">
      <div className='search-bar'>
        <TextField id="outlined-basic" label="Search" variant="outlined" sx={{width: '20vw'}}/>

        <FormControl sx={{width: '20vw'}}>
          <InputLabel id="demo-simple-select-label">Currency</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={baseCurrency}
            label="Currency"
            onChange={handleChange}
          >
            {cryptoCurrencies.map((crypto) => {
              return <MenuItem value={crypto}>{crypto}</MenuItem>
            })}
          </Select>
        </FormControl>
      </div>

      

      <CustomTable cryptoCurrencies={currenciesList} title='Watchlist' lastColumn='Remove'/>
      <CustomTable cryptoCurrencies={currenciesList} title='Other Currencies' lastColumn='Add'/>

    </div>
  );
}

export default App;
