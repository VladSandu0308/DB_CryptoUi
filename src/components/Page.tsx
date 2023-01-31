import React, { FunctionComponent, useEffect, useState } from "react";
import '../App.css';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { CustomTable } from './CustomTable';

import axios from "axios";

export interface Currency {
    symbol: string;
    rate: number;
    asset: string;
  }
  

export const Page: FunctionComponent = () => {
  const [baseCurrency, setBaseCurrency] = useState('');

  const [currenciesList, setCurrenciesList] = useState<Currency[]>([]);
  const [watchList, setWatchList] = useState<Currency[]>([]);

  const [alfa, setAlfa] = useState('');

  let cryptoCurrencies: string[] = ['EUR', 'USD', 'GBP', 'RON', 'AED', 'BTC'];

  useEffect(() => {
    axios.get('https://api.exchangerate.host/symbols').then((response) => {
        var data = response.data;
        // console.log(data);

        setAlfa(response.data);
        console.log(alfa);

        let tempList: Currency[] = [];

        cryptoCurrencies.map((crypto: string) => {
          tempList.push({symbol: crypto, rate: 0, asset: data['symbols'][crypto]?.description})
        })

        console.log(tempList);
        setCurrenciesList(tempList);
      })
  }, [])

  useEffect(() => {
    if (currenciesList.length > 0) {
        axios.get(`https://api.exchangerate.host/latest?base=${baseCurrency}&symbols=${cryptoCurrencies.join(',')}`).then((response) => {
            var data = response.data;
            console.log(data);
    
            let tempListCurrencies: Currency[] = [];
            let tempListWatch: Currency[] = [];
    
            currenciesList.map((crypto) => {
                tempListCurrencies.push({symbol: crypto.symbol, rate: data['rates'][crypto.symbol], asset: crypto.asset});
            })
    
            watchList.map((crypto) => {
                tempListWatch.push({symbol: crypto.symbol, rate: data['rates'][crypto.symbol], asset: crypto.asset});
            })
    
    
            setCurrenciesList(tempListCurrencies);
            setWatchList(tempListWatch);
        })
    } 
  }, [baseCurrency])

    const dummy = () => {
        setAlfa('alfa');
        console.log(alfa);
    }

    useEffect(() => {
        dummy();
    }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setBaseCurrency(event.target.value as string);
  };

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

      

      <CustomTable cryptoCurrencies={watchList} otherList={currenciesList} setList={setCurrenciesList} title='Watchlist' lastColumn='Remove'/>
      <CustomTable cryptoCurrencies={currenciesList} otherList={watchList} setList={setWatchList} title='Other Currencies' lastColumn='Add'/>

    </div>
  );
}