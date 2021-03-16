import getAssets from '../common/apiCalls/getAssets';
import { Component } from 'react';
import { buildPostCall } from '../common/apiCalls/LambdaCallBuilder';
import Auth from '@aws-amplify/auth';
import { getTransactions } from '../common/apiCalls/getTransactions';

class GetAssetsReturn extends Component {
    constructor(props) {
        super(props);
        this.state = { updatedAssets : [] }
    }
    componentDidMount(){
        let today = new Date()
        // getAssets().then( assets =>{
        //     assets.forEach(a =>{
            let a = {code: "VALE3", type:"Stocks"}
            getTransactions(a.code, 200)    
                .then(transactions => 
                    Auth.currentAuthenticatedUser().then(user => {
                        // console.log(transactions)
                        let body = {
                            asset : a,
                            startDate : "2019-01-01",
                            endDate : `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`,
                            transactions : transactions,
                            username: user.username
                        }
                        buildPostCall(process.env.REACT_APP_API_GET_ASSET_RETURN, body).then(updated => {
                            this.setState({ updatedAssets: 
                                [...this.state.updatedAssets, updated]
                            })
                        }).catch(e => console.warn(`Error trying to update asset ${a.code}!`))
                    })
                ).catch(e => console.warn(`Error getting return from asset ${a.code}!`))
        //     })
        // })
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