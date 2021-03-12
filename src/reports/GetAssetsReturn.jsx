import getAssets from '../common/apiCalls/getAssets';
import { Component } from 'react';
import { buildPostCall } from '../common/apiCalls/LambdaCallBuilder';

class GetAssetsReturn extends Component {
    constructor(props) {
        super(props);
        this.state = { updatedAssets : [] }
    }
    componentDidMount(){
        let today = new Date()
        getAssets().then( assets =>{
            assets.forEach(a =>{
            // let a = {code: "BBAS3", type:"Stocks"}
                fetch(process.env.REACT_APP_BACKEND_TRANSACTIONS+`?code=${a.code}&page=0&size=100&sort=date,asc`)
                .then(res => res.json())
                .then((data) => {
                    console.log(`${(data.content? data.content.length :"0")} transactions loaded from ${a.code}`)
                    // console.log(data.content)
                    let body = {
                        asset : a,
                        startDate : "2019-01-01",
                        endDate : `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`,
                        transactions : data.content
                    }
                    buildPostCall(process.env.REACT_APP_API_GET_ASSET_RETURN, body).then(updated => {
                        this.setState({ updatedAssets: 
                            [...this.state.updatedAssets, updated]
                        })
                    }).catch(e => console.warn(`Error getting return from asset ${a.code}!`))
                })
                .catch(e => console.warn(`Error getting return from asset ${a.code}!`))
            })
        })
    }
    render() { 
        return ( 
            <div style={{margin:"5px"}}>
                <h4>Updated Assets</h4>
                {this.state.updatedAssets.map((assetInfo, i) =>
                    <p>{JSON.stringify(assetInfo)}</p> 
                )}
            </div>
        );
    }
}
 
export default GetAssetsReturn;

function GetPortfolioReturn(props){
    // let today = new Date()
    let body = {
        startDate : "2021-02-02",
        endDate : "2021-02-10"
    }
    const requestOptions = {
        method: 'POST',
        headers: {  'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    "x-api-key": process.env.REACT_APP_API_KEY_AWS },
        body: JSON.stringify(body)
    };
    fetch("https://5qx8xnn5e4.execute-api.sa-east-1.amazonaws.com/dev/portfolioReturn", requestOptions)
        .then(res => res.json()).then((data) => {
            console.log(data)
        }).catch(e => console.log(e))
    
}