import React, { Component } from 'react';

class AssetSelector extends Component {
    state = { assetCode:'', hasValue : true }
    constructor(props) {
        super(props);
        this.changeAssetValue = this.changeAssetValue.bind(this);
        this.confirmChange = this.confirmChange.bind(this);
    }

    render() { 
        return ( 
        <section style={{float: "left"}}>
            <label>Choose an asset:</label>
            <input style={{margin: "5px"}} onChange={this.changeAssetValue} type="text" maxLength="6" id="input_asset" />
            <button disabled={this.state.hasValue} className="btn-primary" onClick={this.confirmChange} >Confirm</button> 
        </section>);
    }
    changeAssetValue(event){
        let _hasValue = event.target.value == "" 
        this.setState({assetCode : event.target.value, hasValue : _hasValue});

    }

    confirmChange(){
        console.log(this.props.assetSelectedHandler);
        this.props.assetSelectedHandler(this.state.assetCode)
        // this.setState({value: event.target.value});
    }
}
 
export default AssetSelector;