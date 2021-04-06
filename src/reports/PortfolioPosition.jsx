import React, { Component } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Auth from '@aws-amplify/auth';
import { buildPostCall, getAuthorizationHeader } from '../common/apiCalls/ApiCallBuilder';

class PortfolioPosition extends Component {
    constructor(props) {
        super(props);
        let defaultWidth = 120
        this.state = {
            columns: [
                // { field: 'asset', headerName: 'Asset', type: 'number', width: 100 },
                { field: 'description', headerName: 'Description', type: 'text',  width: defaultWidth + 400 },
                // { field: 'shares', headerName: '# Shares', type: 'number',  width: defaultWidth + 10 },
                // { field: 'averagePrice', headerName: 'Average Price', type: 'number',  width: defaultWidth + 30 },
                { field: 'totalCost', headerName: 'Total cost', type: 'number',  width: defaultWidth + 20 },
                { field: 'return', headerName: '% Return', type: 'number',  width: defaultWidth },
            ],
            rows: []
        }
    }
    componentDidMount(){
        Auth.currentAuthenticatedUser().then(user => getAuthorizationHeader().then(headers =>
            fetch(process.env.REACT_APP_API_GET_PORTFOLIO_POSITION + '?username='+user.username+'&year='+ "2020", { ...headers })))
            .then(res => res.json()).then(portfolio =>{
                console.log(portfolio)
                let totalCost = 0
                let rows = Object.keys(portfolio).sort().map( (asset, i) => {
                    totalCost += portfolio[asset].cost
                    return {
                        id: i,
                        // asset: asset,
                        // shares: portfolio[asset].shares,
                        // averagePrice: Math.round(portfolio[asset].averagePrice * 100) / 100,
                        description: `${portfolio[asset].shares} ações de ${asset} adquiridas ao preço médio de ${Math.round(portfolio[asset].averagePrice * 100) / 100}`,
                        totalCost: Math.round(portfolio[asset].cost* 100) / 100,
                        return: Math.round( (portfolio[asset].return-1) * 10000) / 100,
                    }
                })
                rows.push({id: "total", description: "Total", totalCost: totalCost  })
                this.setState({ rows: rows })
            })
    }
    render() {
        if(this.state.rows.length)
            return ( 
                <div style={{ height: '700px' }}>
                    <DataGrid rows={this.state.rows} columns={this.state.columns} pageSize={30} />
                </div>
            );
        return ("")
    }
}
 
export default PortfolioPosition;