import React, {FunctionComponent, useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Currency } from './Page';

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface CryptoProps {
    cryptoCurrencies: Currency[];
    goodCryptoCurrencies: Currency[];
    title: string;
    lastColumn: string;
    setList: React.Dispatch<React.SetStateAction<Currency[]>>;
    setGoodList: React.Dispatch<React.SetStateAction<Currency[]>>;
    otherList: Currency[];
    goodOtherList: Currency[];
}

export const CustomTable: FunctionComponent<CryptoProps> = ({cryptoCurrencies, goodCryptoCurrencies, title, lastColumn, otherList, goodOtherList, setList, setGoodList}) => {
    const handleChange = (row: Currency) => {
        var index = cryptoCurrencies.indexOf(row);

        goodCryptoCurrencies.splice(index, 1);
        cryptoCurrencies.splice(index, 1);

        setList([...otherList, row]);
        setGoodList([...goodOtherList, row]);
    };

    const getColor = (row: Currency) => {
        if (row.symbol === 'BTC') return '#919cb3';
        return '';
    };

    return(
        <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                {title}
            </Typography>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Symbol</TableCell>
                    <TableCell align="right">Asset</TableCell>
                    <TableCell align="right">Exchange Rate</TableCell>
                    <TableCell align="right">{lastColumn}</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {cryptoCurrencies.map((row) => (
                    <TableRow
                    key={row.symbol}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, background: getColor(row) }}
                    >
                    <TableCell component="th" scope="row">
                        {row.symbol}
                    </TableCell>
                    <TableCell align="right">{row.asset}</TableCell>
                    <TableCell align="right">{row.rate}</TableCell>
                    <TableCell align="right">
                        <IconButton aria-label="upload picture" component="label" onClick={() => handleChange(row)}>
                            {
                                lastColumn === 'Add' ? <AddIcon /> : <RemoveIcon />
                            }
                        </IconButton>
                    </TableCell>


                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Grid>
    );
}