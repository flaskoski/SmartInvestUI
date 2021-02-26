import React, { Component } from 'react';
import Asset from './asset/Asset';
import CrudTable from '../common/CrudTable/CrudTable';

class Assets extends Component {
    constructor(props){
        super(props);
        this.getCurrentAssetPrice = this.getCurrentAssetPrice.bind(this);
    }
    state = { 
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

    componentDidMount(){
        fetch('http://localhost:8080/assets?page=0&size=10')
        .then(res => res.json())
        .then((data) => {
          this.setState({ assets: data.content })
          console.log(`Assets loaded ${(data.content? data.content.length :"")}`)
        })
        .catch(console.log("Error loading assets!"))
    }

    getCurrentAssetPrice(asset){
        return fetch('https://54kwimgt6h.execute-api.sa-east-1.amazonaws.com/prod/quoter?code='+ asset.code,
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
                    itemType={"Asset"}
                    fields={this.state.fields}
                    items={assets}
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