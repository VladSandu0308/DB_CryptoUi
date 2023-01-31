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

  const [goodCurrenciesList, setGoodCurrenciesList] = useState<Currency[]>([]);
  const [goodWatchList, setGoodWatchList] = useState<Currency[]>([]);

  const [search, setSearch] = useState("");

  let cryptoCurrencies: string[] = ['EUR', 'USD', 'GBP', 'RON', 'AED', 'BTC'];

  useEffect(() => {
    axios.get('https://api.exchangerate.host/symbols').then((response) => {
        var data = response.data;
        // console.log(data);

        let tempList: Currency[] = [];

        cryptoCurrencies.map((crypto: string) => {
          tempList.push({symbol: crypto, rate: 0, asset: data['symbols'][crypto]?.description})
        })

        console.log(tempList);
        setCurrenciesList(tempList);
        setGoodCurrenciesList(tempList);
      })
  }, [])

  useEffect(() => {
    if (currenciesList.length > 0 || watchList.length > 0) {
        axios.get(`https://api.exchangerate.host/latest?base=${baseCurrency}&symbols=${cryptoCurrencies.join(',')}`).then((response) => {
            var data = response.data;
            console.log(data);
    
            let tempListCurrencies: Currency[] = [];
            let tempListWatch: Currency[] = [];
    
            goodCurrenciesList.map((crypto) => {
                tempListCurrencies.push({symbol: crypto.symbol, rate: data['rates'][crypto.symbol], asset: crypto.asset});
            })

            console.log(goodWatchList);
    
            goodWatchList.map((crypto) => {
                tempListWatch.push({symbol: crypto.symbol, rate: data['rates'][crypto.symbol], asset: crypto.asset});
            })
    
    
            setGoodCurrenciesList(tempListCurrencies);
            setGoodWatchList(tempListWatch);

            console.log(tempListWatch);

            setCurrenciesList(
                tempListCurrencies.filter((curr) => curr.symbol?.toLowerCase().startsWith(search.toLowerCase()))
            )

            setWatchList(
                tempListWatch.filter((curr) => curr.symbol?.toLowerCase().startsWith(search.toLowerCase()))
            )
            
            // if (search !== '') {
                
            // } else {
            //     setCurrenciesList(tempListCurrencies)
            //     setWatchList(tempListWatch)
            // }
        })
    } 
  }, [baseCurrency])

    useEffect(() => {
        console.log(search);

        setCurrenciesList(
            goodCurrenciesList.filter((curr) => curr.symbol?.toLowerCase().startsWith(search.toLowerCase()))
        )

        setWatchList(
            goodWatchList.filter((curr) => curr.symbol?.toLowerCase().startsWith(search.toLowerCase()))
        )

    }, [search]);

  const handleChange = (event: SelectChangeEvent) => {
    setBaseCurrency(event.target.value as string);
  };

  return (
    <div className="container">
      <div className='search-bar'>
        <TextField value={search} onChange={(e) => setSearch(e.target.value)}  id="outlined-basic" label="Search" variant="outlined" sx={{width: '20vw'}}/>

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

      

      <CustomTable cryptoCurrencies={watchList} goodCryptoCurrencies={goodWatchList} otherList={currenciesList} goodOtherList={goodCurrenciesList} setList={setCurrenciesList} setGoodList={setGoodCurrenciesList} title='Watchlist' lastColumn='Remove'/>
      <CustomTable cryptoCurrencies={currenciesList} goodCryptoCurrencies={goodCurrenciesList} otherList={watchList} goodOtherList={goodWatchList}  setList={setWatchList} setGoodList={setGoodWatchList} title='Other Currencies' lastColumn='Add'/>

    </div>
  );
}