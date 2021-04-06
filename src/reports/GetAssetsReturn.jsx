import getAssets from '../common/apiCalls/getAssets';
import { Component } from 'react';
import { buildPostCall } from '../common/apiCalls/ApiCallBuilder';
import Auth from '@aws-amplify/auth';
import { getTransactions } from '../common/apiCalls/getTransactions';
import { getShortDate } from '../common/convert';

class GetAssetsReturn extends Component {
    constructor(props) {
        super(props);
        this.state = { updatedAssets : [] }
    }
    componentDidMount(){
        getAssets().then( page =>{
            let assets = page.content
            assets.forEach(a =>{
            // let a = {code: "VALE3", type:"Stocks"}
            getTransactions(a.code, 200)    
                .then(data => {
                    let transactions = data.content
                    // console.log(transactions)
                    let body = {
                        asset : a,
                        startDate : "2019-01-01",
                        endDate : getShortDate(new Date()),
                        transactions : transactions
                    }
                    Auth.currentAuthenticatedUser().then(user => 
                        buildPostCall(process.env.REACT_APP_API_GET_ASSET_RETURN, {...body, username: user.username}).then(updated => {
                            this.setState({ updatedAssets: 
                                [...this.state.updatedAssets, updated]
                            })
                    })).catch(e => console.warn(`Error trying to update asset ${a.code}!`))
                }).catch(e => console.warn(`Error getting return from asset ${a.code}!`))
            })
        })
    }
    render() { 
        return ( 
            <div style={{margin:"5px"}}>
                <h4>Updated Assets</h4>
                {this.state.updatedAssets.map((assetInfo, i) =>
                    <p key={`updatedAsset-${i}`}>{JSON.stringify(assetInfo)}</p> 
                )}
            </div>
        );
    }
}
 
export default GetAssetsReturn;