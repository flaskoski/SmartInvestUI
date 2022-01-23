import React, { Component } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import getAllTransactions from '../common/apiCalls/getTransactions';
import Auth from '@aws-amplify/auth';
import { buildPostCall } from '../common/apiCalls/ApiCallBuilder';

class AnnualReport extends Component {
    constructor(props) {
        super(props);
        let defaultWidth = 120
        this.state = {
            columns: [
                { field: 'year', headerName: 'Year', type: 'number', width: 90 },
                { field: 'month', headerName: 'Month', type: 'number',  width: 100 },
                { field: 'stocksSales', headerName: 'Stocks.Sales', type: 'number',  width: defaultWidth+30 },
                { field: 'stocksProfit', headerName: 'Profit', type: 'number',  width: defaultWidth - 20 },
                { field: 'stocksTaxes', headerName: 'Taxes', type: 'number',  width: defaultWidth - 30 },
                { field: 'reitSales', headerName: 'REIT.Sales', type: 'number',  width: defaultWidth+10 },
                { field: 'reitProfit', headerName: 'Profit', type: 'number',  width: defaultWidth -30 },
                { field: 'reitTaxes', headerName: 'Taxes', type: 'number',  width: defaultWidth -30 },
                { field: 'bdrSales', headerName: 'BDR.Sales', type: 'number',  width: defaultWidth +10  },
                { field: 'bdrProfit', headerName: 'BDR.Profit', type: 'number',  width: defaultWidth },
                { field: 'bdrTaxes', headerName: 'BDR.Taxes', type: 'number',  width: defaultWidth },
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

    getTotalsPerMonth(transactions){
        let today = new Date()
        console.log("Transactions loaded:"+ transactions.length)
        //TODO call lambda with transactions    
        Auth.currentAuthenticatedUser().then(user => {
            let body = {
                startDate : "2019-01-01",
                endDate : `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`,
                transactions : transactions,
                username: user.username
            }
            buildPostCall(process.env.REACT_APP_API_GET_TOTALS_PER_MONTH, body).then((totals) => {
                console.log(totals)
                let rows = [] 
                Object.keys(totals).forEach(year => {
                    Object.keys(totals[year]).sort((a,b)=> parseInt(a)-parseInt(b)).forEach(mon => {
                        //separate fees from taxes
                        let stocksFee = totals[year][mon].stocks.fees - totals[year][mon].stocks.sales*0.00005
                        let reitFee = totals[year][mon].reit.fees - totals[year][mon].reit.sales*0.00005
                        let bdrFee = totals[year][mon].bdr.fees - totals[year][mon].bdr.sales*0.00005
                        rows.push({
                            'id': year+"-"+mon,
                            'year': year,
                            'month': mon,
                            'stocksSales': totals[year][mon].stocks.sales,
                            'stocksProfit': Math.round(  (totals[year][mon].stocks.profit - stocksFee) * 100 )/100 ,
                            "stocksTaxes" : Math.round(totals[year][mon].stocks.sales*0.00005 * 100)/100,
                            'reitSales': totals[year][mon].reit.sales,
                            'reitProfit': Math.round(  (totals[year][mon].reit.profit - reitFee) * 100 )/100,
                            "reitTaxes" : Math.round(totals[year][mon].reit.sales*0.00005 * 100)/100,
                            'bdrSales': totals[year][mon].bdr.sales,
                            'bdrProfit': Math.round(  (totals[year][mon].bdr.profit - bdrFee) * 100 )/100,
                            "bdrTaxes" : Math.round(totals[year][mon].bdr.sales*0.00005 * 100)/100,
                        })
                    })
                })
                // console.log(rows)
                this.setState({ rows: rows })
            })
        })
    }

    render() {
        if(this.state.rows.length)
            return ( 
                <div style={{ height: '700px' }}>
                    <DataGrid rows={this.state.rows} columns={this.state.columns} pageSize={12} />
                </div>
            );
        return ("")
    }
    //total sales swing / total profit
    //total sales day / total profit
}
 
export default AnnualReport;