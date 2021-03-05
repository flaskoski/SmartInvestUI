import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';

class AssetSelector extends Component {
    state = { assetCode:'', hasValue : true }
    constructor(props) {
        super(props);
        this.changeAssetValue = this.changeAssetValue.bind(this);
        this.confirmChange = this.confirmChange.bind(this);
    }


    render() { 
        return ( 
        <section style={{float: (this.props.float? this.props.float : "left") }}>
            {/* <label>Choose an asset:</label> */}
            {/* <input style={{margin: "5px"}} onChange={this.changeAssetValue} type="text" maxLength="6" id="input_asset" /> */}
            <TextField style={{margin: "5px"}} label="Choose an Asset" onChange={this.changeAssetValue} type="text" maxLength="6" id="input_asset"></TextField>
            <Button style={{"marginTop": "15px"}} disabled={this.state.hasValue} variant="outlined" color="primary" onClick={this.confirmChange} >Confirm</Button> 
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