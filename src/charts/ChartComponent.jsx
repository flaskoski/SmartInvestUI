
import React from 'react';
import ReactDOM from 'react-dom';
import CandleStickChart from './CandleStickChart';
import { getData } from "./ParseData";

import { TypeChooser } from "react-stockcharts/lib/helper";
import AssetSelector from './AssetSelector';
import ChartOptions from './ChartOptions/ChartOptions';

class ChartComponent extends React.Component {
    state = {
        indicators : {
            "ema10" : true,
            "ema20" : true} 
    };
    constructor(props){
        super(props)
        this.assetSelectedEvent = this.assetSelectedEvent.bind(this);
        this.toggleOption = this.toggleOption.bind(this);
    }
    
    toggleOption(indicator, isChecked){
        this.setState({
            indicators : {
                ...this.state.indicators,
                [indicator] : isChecked} })

    }

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
			return (
            <section>
                <AssetSelector assetSelectedHandler={this.assetSelectedEvent}/>
                <ChartOptions toggle={this.toggleOption} />
                <div>{this.state.message}</div>
            </section>
            )
        }
		return (
            <section>
                <AssetSelector assetSelectedHandler={this.assetSelectedEvent} />
                <ChartOptions toggle={this.toggleOption}  />
                <div style={{"clear": "both"}}></div>
                <h5 align="center" style={{"margin": "0"}}> {this.state.assetCode} </h5>
                <CandleStickChart type="hybrid" data={this.state.data} indicators={this.state.indicators} />
            </section>
        )
    }

    assetSelectedEvent(newAssetCode){
        this.setState({ assetCode: newAssetCode,
                        data: null,
                        message : ''});

        getData(process.env.REACT_APP_API_KEY_ALPHA, newAssetCode).then(assetData => {
            if(Object.keys(assetData).length === 0)
                this.setState({ message: "Error: Asset not found!" });
            else
                this.setState({ 
                    data: assetData.data})
        });
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
