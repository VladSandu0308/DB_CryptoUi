import React, {FunctionComponent} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Currency } from '../App';

interface CryptoProps {
    cryptoCurrencies: Currency[];
    title: string;
    lastColumn: string;
}

export const CustomTable: FunctionComponent<CryptoProps> = ({cryptoCurrencies, title, lastColumn}) => {
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
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.symbol}
                    </TableCell>
                    <TableCell align="right">{row.asset}</TableCell>
                    <TableCell align="right">{row.rate}</TableCell>

                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Grid>
    );
}