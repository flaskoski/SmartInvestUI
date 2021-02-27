import React, { Component } from 'react';
import Asset from './asset/Asset';
import CrudTable from '../common/CrudTable/CrudTable';

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
                    name: "price",
                    label: "Price",
                    type: "Float",
                    isInput: false
                }
            ]
        };
    }
    
    getAssets(){
        return fetch(process.env.REACT_APP_BACKEND_ASSETS+'?page=0&size=15')
        .then(res => res.json())
        .then((data) => {
            // this.setState({ assets: data.content })
            console.log(`Assets loaded ${(data.content? data.content.length :"")}`)
            console.log(data.content)
            return data.content
        }).catch(e => console.log("Error loading assets!"))
    }

    getCurrentAssetPrice(asset){
        return fetch(process.env.REACT_APP_API_GET_CURRENT_PRICE + '?code='+ asset.code,
                    {"headers": {"x-api-key": process.env.REACT_APP_API_KEY_AWS}})
        .then(res => res.json())
        .then(price =>{
            console.log(`${(asset? asset.code: "")} price loaded: ${price}`)
            asset.price = price
            return asset
        })
        .catch(e => {
            console.log("error fetching price for asset", asset.code)
            return null
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
            <section className="block_unit-5" 
                style={{"float": "left", "flex" : "0.5"}}>
                <CrudTable 
                    key="Table-Assets"
                    itemType={"Asset"}
                    fields={this.state.fields}
                    getItems={this.getAssets}
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
         );
    }
}
 
export default Assets;