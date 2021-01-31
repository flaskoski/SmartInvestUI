import React, { Component } from 'react';

class AssetSelector extends Component {
    state = { assetCode:'' }
    constructor(props) {
        super(props);
        this.changeAssetValue = this.changeAssetValue.bind(this);
        this.confirmChange = this.confirmChange.bind(this);
    }

    render() { 
        return ( 
        <section>
            <label>Choose an asset:</label>
            <input style={{margin: "10px"}} onChange={this.changeAssetValue} type="text" maxLength="6" id="input_asset" />
            <button className="btn-primary" onClick={this.confirmChange} >Confirm</button> 
        </section>);
    }
    changeAssetValue(event){
        this.setState({assetCode : event.target.value});
    }

    confirmChange(){
        this.props.assetSelectedHandler(this.state.assetCode)
        // this.setState({value: event.target.value});
    }
}
 
export default AssetSelector;