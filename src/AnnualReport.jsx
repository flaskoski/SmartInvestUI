import React, { Component } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import getAllTransactions from './common/apiCalls/getTransactions';

class AnnualReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { field: 'year', headerName: 'Year', type: 'number', width: 100 },
                { field: 'month', headerName: 'Month', type: 'number',  width: 100 },
                { field: 'stocksSales', headerName: 'Stocks - Sales', type: 'number',  width: 150 },
                { field: 'stocksProfit', headerName: 'Profit', type: 'number',  width: 150 },
                { field: 'stocksFees', headerName: 'Fees', type: 'number',  width: 150 },
                { field: 'reitSales', headerName: 'REIT - Sales', type: 'number',  width: 150 },
                { field: 'reitProfit', headerName: 'Profit', type: 'number',  width: 150 },
                { field: 'reitFees', headerName: 'Fees', type: 'number',  width: 150 },
                // {
                //     field: 'age',
                //     headerName: 'Age',
                //     type: 'number',
                //     width: 90,
                // },
            ],
            rows: []
        }
        this.getTotalsPerMonth = this.getTotalsPerMonth.bind(this)
    }
    componentDidMount(){
        getAllTransactions(this.getTotalsPerMonth)
    }


        
            // let a = {code: "ITUB4"}
            
        // fetch("https://5qx8xnn5e4.execute-api.sa-east-1.amazonaws.com/dev/.....", requestOptions)
        // .then(res => res.json()).then((data) => {
        //     console.log(data)
        // })
    // }

    getTotalsPerMonth(transactions){
        let today = new Date()
        // this.setState({ transactions: transactions })
        console.log("terminou:"+ transactions.length)
        //TODO call lambda with transactions    
        let body = {
            startDate : "2019-01-01",
            endDate : `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`,
            transactions : transactions
        }
        const requestOptions = {
            method: 'POST',
            headers: {  'Content-Type': 'application/json',
                        "x-api-key": process.env.REACT_APP_API_KEY_AWS },
            body: JSON.stringify(body)
        };
        fetch("https://5qx8xnn5e4.execute-api.sa-east-1.amazonaws.com/dev/totalsPerMonth", requestOptions)
        .then(res => res.json()).then((totals) => {
            console.log(totals)
            let rows = [] 
            Object.keys(totals).forEach(year => {
                Object.keys(totals[year]).sort((a,b)=> parseInt(a)-parseInt(b)).forEach(mon => {
                    rows.push({
                        'id': year+"-"+mon,
                        'year': year,
                        'month': mon,
                        'stocksSales': totals[year][mon].stocks.sales,
                        'stocksProfit': Math.round(totals[year][mon].stocks.profit * 100)/100,
                        "stocksFees" : Math.round(totals[year][mon].stocks.fees * 100)/100,
                        'reitSales': totals[year][mon].reit.sales,
                        'reitProfit': Math.round(totals[year][mon].reit.profit * 100)/100 ,
                        'reitFees' : Math.round(totals[year][mon].reit.fees * 100)/100,
                    })
                })
            })
            console.log(rows)
            this.setState({ rows: rows })
        })
    }

    render() {
        if(this.state.rows.length)
            return ( 
                <div style={{ height: '700px' }}>
                    <DataGrid rows={this.state.rows} columns={this.state.columns} pageSize={20} />
                </div>
            );
        return ("")
    }
    //total sales swing / total profit
    //total sales day / total profit
}
 
export default AnnualReport;