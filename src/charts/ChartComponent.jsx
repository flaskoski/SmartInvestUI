
import React from 'react';
import ReactDOM from 'react-dom';
import CandleStickChart from './CandleStickChart';
import { getData } from "./ParseData";

import { TypeChooser } from "react-stockcharts/lib/helper";
import AssetSelector from './AssetSelector';

class ChartComponent extends React.Component {
    constructor(props){
        super(props)
        this.assetSelectedEvent = this.assetSelectedEvent.bind(this);
    }
    state = {}
	componentDidMount() {
        // if (this.state != null && this.state.assetCode != null)
        //     getData(this.state.assetCode).then(assetData => {
        //         this.setState({ 
        //             data: assetData.data})
        //     });
            // this.setState({data : getData()});
	}
	render() {
		if (this.state == null || this.state.data == null) {
            if(this.state.assetCode)
                getData(process.env.REACT_APP_API_KEY_ALPHA, this.state.assetCode).then(assetData => {
                    if(Object.keys(assetData).length === 0)
                        this.setState({ message: "Error: Asset not found!" });
                    else
                        this.setState({ 
                            data: assetData.data})
                });
			return (
            <section>
                <AssetSelector assetSelectedHandler={this.assetSelectedEvent} />
                <div>{this.state.message}</div>
            </section>
            )
        }
        
		return (
			// <TypeChooser>
			// 	{type => <CandleStickChart type={type} data={this.state.data} />}
            // </TypeChooser>
            <section>
                <AssetSelector assetSelectedHandler={this.assetSelectedEvent} />
                <h3 align="center"> {this.state.assetCode} </h3>
                <CandleStickChart type="hybrid" data={this.state.data} />
            </section>
        )
    }
    
    assetSelectedEvent(newAssetCode){
         console.log("valor:" + newAssetCode);
        this.setState({ assetCode: newAssetCode,
                        data: null,
                        message : ''});
        // ReactDOM.render(
        //     <ChartComponent assetCode={this.state.assetCode}/>,
        //         document.getElementById('chart')
        // )
    }
}

export default ChartComponent;

ReactDOM.render(
    <ChartComponent />,
        document.getElementById('chart')
)
