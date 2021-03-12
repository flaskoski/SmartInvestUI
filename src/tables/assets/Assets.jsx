import React, { Component } from 'react';
import {ArrowUpwardIcon, ArrowDownwardIcon} from '@material-ui/icons/ArrowUpward';
import CrudTable from '../../common/CrudTable/CrudTable';
import Menu from '../../menu/Menu';
import "./assets.css"
import Auth from '@aws-amplify/auth';
import { getAuthorizationHeader } from '../../common/apiCalls/LambdaCallBuilder';

class Assets extends Component {
    constructor(props){
        super(props);
        this.getCurrentAssetPrice = this.getCurrentAssetPrice.bind(this);
        this.getAssets = this.getAssets.bind(this);
        this.state = { 
            assets: [],
            fields: [
                {
                    name: "id",
                    label: "ID",
                    type: "text",
                    isInput: false,
                },{
                    name: "code",
                    label: "Code",
                    type: "text",
                    isRequired: true
                },{
                    name: "type",
                    label: "Type",
                    type: "choice",
                    choices: ["Stocks", "REIT"],
                    isRequired: true
                },{
                    name: "price",
                    label: "Price",
                    type: "Float",
                    isInput: false
                }
            ]
        };
    }
    
    getAssets(){
        return fetch(process.env.REACT_APP_BACKEND_ASSETS+'?page=0&size=80')
        .then(res => res.json())
        .then((data) => {
            // this.setState({ assets: data.content })
            console.log(`Assets loaded ${(data.content? data.content.length :"")}`)
            console.log(data.content)
            this.setState({assets: data.content})
            return data.content
        }).catch(e => console.log("Error loading assets!"))
    }

    getCurrentAssetPrice(asset){
        return getAuthorizationHeader().then(headers =>
            fetch(process.env.REACT_APP_API_GET_CURRENT_QUOTE + '?code='+ asset.code, { ...headers }))
                .then(res => res.json())
                .then(assetLastValues =>{
                    console.log(`${(asset? asset.code: "")} price loaded: ${assetLastValues.currentPrice}`)
                
                    asset.price = (
                    <div className="asset-price">
                        <div style={{"float": "left", "width" : "40%"}}><div  style={{"float": "center"}}> {Math.round(assetLastValues.currentPrice * 100) / 100} </div></div>
                        <div style={{"color": (assetLastValues.change>0? "green" : "red"), "float": "left", "width" : "40%"}}>
                        <p className="quote-change" >{Math.round(assetLastValues.change * 100) / 100}</p>
                            <p className="quote-change-percentage" style={{"color": (assetLastValues.changePercent.split('%')[0]>0? "green" : "red")}}>{Math.round(assetLastValues.changePercent.split("%")[0] * 100) / 100}%</p>
                        </div>
                        <div style={{"float": "left", "width" : "20%"}}><span style={{"color": (assetLastValues.change>0? "green" : "red")}}  className="material-icons">{(assetLastValues.change>0? "arrow_upward" : "arrow_downward")}</span></div>
                    </div>)
                    return asset
                })
                .catch(e => {
                    console.log("error fetching price for asset", asset.code)
                    return asset
                })
        // return asset.price.promise
        // this.setState({ price: "12.34" })
    }



    render() {        
        let assets = this.state.assets 
        assets.forEach(a => {
            if(!a.price)
                a.price = null
        })
        
        return ( 
            <div>
                <Menu assets={this.state.assets} />
                <section className="block_unit-5" 
                    style={{"float": "left", "flex" : "0.5"}}>
                    <CrudTable 
                        key="Table-Assets"
                        itemType={"Asset"}
                        fields={this.state.fields}
                        getItems={this.getAssets}
                        maxRows={8}
                        backendUrl={process.env.REACT_APP_BACKEND_ASSETS}
                        itemUpdateHandler={this.getCurrentAssetPrice}
                    >
                        {/* {this.state.assets.map((asset, i) =>{
                            return (
                                <Asset key={i} id={asset.id} code={asset.code} />
                            );
                        } )} */}
                    </CrudTable>
                    
                </section>
            </div>
         );
    }
}
 
export default Assets;