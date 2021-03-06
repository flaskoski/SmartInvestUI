import getAssets from '../common/apiCalls/getAssets';
import { Component } from 'react';
import ChartComponent from '../charts/ChartComponent';
import CandleStickChart from '../charts/CandleStickChart';
import LineChart from '../charts/LineChart';
import { appendIndexTimeSeriesPercentage, downloadJson } from '../charts/ParseData';
import { dateObjectToArray, dateTimeInDays, getShortDate } from '../common/convert';
import AssetSelector from '../charts/AssetSelector';
import raw from "raw.macro";



class GetPortfolioReturn extends Component {
    constructor(props) {
        super(props);
        this.state = { data: {}, startDate: "2020-08-01", endDate: "2021-03-04"}
        this.assetSelectedEvent = this.assetSelectedEvent.bind(this)
        this.removeAssetHandler = this.removeAssetHandler.bind(this)
    }
    componentDidMount(){
        let today = new Date()
        let body = {
            startDate : this.state.startDate,
            endDate : this.state.endDate
        }
        const requestOptions = {
            method: 'POST',
            headers: {  'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "x-api-key": process.env.REACT_APP_API_KEY_AWS },
            body: JSON.stringify(body)
        };
        // fetch("https://5qx8xnn5e4.execute-api.sa-east-1.amazonaws.com/dev/portfolioReturn", requestOptions)
        // .then(res => res.json()).then((data) => {
        //         console.log(data)
        //     downloadJson(data, "portfolio return")
            let data = JSON.parse(raw("./mockPortfolioReturn.json"))
            let returnPercentages = this.setPortfolioSeries(data)
            
            let codes = ["IBOV", "IFIX"]
            codes.forEach(assetCode =>{
                appendIndexTimeSeriesPercentage(returnPercentages, assetCode, new Date(this.state.startDate), new Date(this.state.endDate))
                .then(returnPercentages => { 
                    // console.log(returnPercentages)
                    console.log(returnPercentages)
                    this.setState({
                        data : returnPercentages,
                        assetCodes: codes
                    })   
                } )
            })
        // }).catch(e => console.log(e))
        // this.setState({data : [
        //     {date: new Date('2021-04-01'), close: 14},
        //     {date: new Date('2021-04-02'), close: 16},
        //     {date: new Date('2021-04-03'), close: 15},
        // ]})
        return ("");
    }
    setPortfolioSeries(data){
        let firstPercent = 0
        let sDate = new Date(this.state.startDate)
        while(!data[getShortDate(sDate)]){
            sDate.setDate(sDate.getDate()+1)
        }
        firstPercent = data[getShortDate(sDate)].return

        //remove unused attributes and set returns in % and considering startDate
        let returnPercentages = {}
        Object.keys(data).forEach(date => returnPercentages[date] = { 'portfolio' : 1 + (data[date].return - firstPercent)   } )
        return returnPercentages
    }
    render() {
        if(Object.keys(this.state.data).length > 0)
            return ( 
                <section>
                    <div style={{"marginLeft": "30px" }} ><AssetSelector assetSelectedHandler={this.assetSelectedEvent} float="none" /></div>
                    <LineChart data={dateObjectToArray(this.state.data)} assetCodes={this.state.assetCodes} removeLine={this.removeAssetHandler} />
                </section>
            );
        return ("")
    }

    assetSelectedEvent(asset){
        appendIndexTimeSeriesPercentage(this.state.data, asset, new Date(this.state.startDate), new Date(this.state.endDate))
                .then(percentages => { 
                    console.log(percentages)
                    this.setState({
                        data : percentages,
                        assetCodes: [...this.state.assetCodes, asset]
                    })   
                } )
    }

    removeAssetHandler(asset){
        // console.log(asset)
        let newData = this.state.data
        Object.keys(this.state.data).map(date => {
            delete newData[date][asset];
        })
        let newAssets = this.state.assetCodes
        newAssets.splice(newAssets.indexOf(asset), 1)
        this.setState({data: newData, assetCodes: newAssets})
    }
}
export default GetPortfolioReturn;

