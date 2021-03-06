import getAssets from '../common/apiCalls/getAssets';
import { Component } from 'react';
import ChartComponent from '../charts/ChartComponent';
import CandleStickChart from '../charts/CandleStickChart';
import LineChart from '../charts/LineChart';
import { appendIndexTimeSeriesPercentage, downloadJson } from '../charts/ParseData';
import { dateObjectToArray, dateTimeInDays } from '../common/convert';
import AssetSelector from '../charts/AssetSelector';

const mockData = {
    "2020-10-02": {
        "cost": 123712.05582010584,
        "return": 0.9485428014440024,
        "profit": 2081.555820105822
    },
    "2020-10-05": {
        "cost": 120596.40582010582,
        "return": 0.9520199148493931,
        "profit": 2068.805820105822
    },
    "2020-10-06": {
        "cost": 120531.43082010583,
        "return": 0.9508965356186698,
        "profit": 2223.9308201058225
    },
    "2020-10-07": {
        "cost": 120531.43082010583,
        "return": 0.9514686685430929,
        "profit": 2223.9308201058225
    },
    "2020-10-08": {
        "cost": 122529.43082010583,
        "return": 0.966201827655709,
        "profit": 2223.9308201058225
    },
    "2020-10-09": {
        "cost": 122529.43082010583,
        "return": 0.961914041476637,
        "profit": 2223.9308201058225
    },
    "2020-10-13": {
        "cost": 122529.43082010583,
        "return": 0.9655148090395562,
        "profit": 2223.9308201058225
    },
    "2020-10-14": {
        "cost": 122529.43082010583,
        "return": 0.9740414135704618,
        "profit": 2223.9308201058225
    },
    "2020-10-15": {
        "cost": 120447.6974867725,
        "return": 0.9744450284148393,
        "profit": 2393.1974867724894
    },
    "2020-10-16": {
        "cost": 120447.6974867725,
        "return": 0.9696376305809074,
        "profit": 2393.1974867724894
    },
    "2020-10-19": {
        "cost": 120447.6974867725,
        "return": 0.9701347758252703,
        "profit": 2393.1974867724894
    },
    "2020-10-20": {
        "cost": 120447.6974867725,
        "return": 0.9775785046694722,
        "profit": 2393.1974867724894
    },
    "2020-10-21": {
        "cost": 130972.09748677252,
        "return": 0.9799720891922232,
        "profit": 2393.1974867724894
    },
    "2020-10-22": {
        "cost": 130972.09748677252,
        "return": 0.9876201304103245,
        "profit": 2393.1974867724894
    },
    "2020-10-23": {
        "cost": 130972.09748677252,
        "return": 0.9836777639833674,
        "profit": 2393.1974867724894
    },
    "2020-10-26": {
        "cost": 130972.09748677252,
        "return": 0.9779389843927305,
        "profit": 2393.1974867724894
    },
    "2020-10-27": {
        "cost": 130972.09748677252,
        "return": 0.9718841069400725,
        "profit": 2393.1974867724894
    },
    "2020-10-28": {
        "cost": 133154.09748677252,
        "return": 0.9462604784844616,
        "profit": 2393.1974867724894
    },
    "2020-10-29": {
        "cost": 132011.4474867725,
        "return": 0.9497430896101849,
        "profit": 2270.9474867724894
    },
    "2020-10-30": {
        "cost": 132011.4474867725,
        "return": 0.9327271410484129,
        "profit": 2270.9474867724894
    },
    "2020-11-03": {
        "cost": 132011.4474867725,
        "return": 0.9389406930972395,
        "profit": 2270.9474867724894
    },
    "2020-11-04": {
        "cost": 132011.4474867725,
        "return": 0.9537559234218367,
        "profit": 2270.9474867724894
    },
    "2020-11-05": {
        "cost": 132011.4474867725,
        "return": 0.9684582847469367,
        "profit": 2270.9474867724894
    },
    "2020-11-06": {
        "cost": 132011.4474867725,
        "return": 0.9723643096396011,
        "profit": 2270.9474867724894
    },
    "2020-11-09": {
        "cost": 137088.34748677252,
        "return": 0.9982213843025859,
        "profit": 2270.9474867724894
    },
    "2020-11-10": {
        "cost": 137532.1474867725,
        "return": 1.007838985523957,
        "profit": 2669.747486772489
    },
    "2020-11-11": {
        "cost": 142575.0474867725,
        "return": 1.0023386456403491,
        "profit": 2669.747486772489
    },
    "2020-11-12": {
        "cost": 140529.5585978836,
        "return": 0.9875122457126254,
        "profit": 2823.2585978836
    },
    "2020-11-13": {
        "cost": 137875.90427689595,
        "return": 0.9964792667765856,
        "profit": 3009.604276895946
    },
    "2020-11-16": {
        "cost": 140375.90427689595,
        "return": 1.0058894418337871,
        "profit": 3009.604276895946
    },
    "2020-11-17": {
        "cost": 140375.90427689595,
        "return": 1.0108694988001241,
        "profit": 3009.604276895946
    },
    "2020-11-18": {
        "cost": 147123.55427689594,
        "return": 1.0122946032128868,
        "profit": 3009.604276895946
    },
    "2020-11-19": {
        "cost": 147123.55427689594,
        "return": 1.0124881140354058,
        "profit": 3009.604276895946
    },
    "2020-11-20": {
        "cost": 147123.55427689594,
        "return": 1.0119171653493648,
        "profit": 3009.604276895946
    },
    "2020-11-23": {
        "cost": 152975.83427689594,
        "return": 1.018324238833894,
        "profit": 3009.604276895946
    },
    "2020-11-24": {
        "cost": 152975.83427689594,
        "return": 1.0267421043489737,
        "profit": 3009.604276895946
    },
    "2020-11-25": {
        "cost": 153052.72570546737,
        "return": 1.0270932404203796,
        "profit": 3227.4957054673746
    },
    "2020-11-26": {
        "cost": 153052.72570546737,
        "return": 1.0299888438665596,
        "profit": 3227.4957054673746
    },
    "2020-11-27": {
        "cost": 153052.72570546737,
        "return": 1.0315113910732552,
        "profit": 3227.4957054673746
    },
    "2020-11-30": {
        "cost": 156218.32570546737,
        "return": 1.0010574578480895,
        "profit": 3227.4957054673746
    },
    "2020-12-01": {
        "cost": 157568.32570546737,
        "return": 1.0088741889480146,
        "profit": 3227.4957054673746
    },
    "2020-12-02": {
        "cost": 161712.22570546737,
        "return": 1.031713460575784,
        "profit": 3201.8557054673747
    },
    "2020-12-03": {
        "cost": 160402.89237213405,
        "return": 1.0335101041407389,
        "profit": 3269.0223721340412
    },
    "2020-12-04": {
        "cost": 163070.89237213405,
        "return": 1.0385970637451512,
        "profit": 3269.0223721340412
    },
    "2020-12-07": {
        "cost": 163070.89237213405,
        "return": 1.0382544520185133,
        "profit": 3269.0223721340412
    },
    "2020-12-08": {
        "cost": 163070.89237213405,
        "return": 1.0371720393485855,
        "profit": 3269.0223721340412
    },
    "2020-12-09": {
        "cost": 170034.89237213405,
        "return": 1.0326505198457476,
        "profit": 3269.0223721340412
    },
    "2020-12-10": {
        "cost": 169440.59237213407,
        "return": 1.0374591326612346,
        "profit": 3516.122372134041
    },
    "2020-12-11": {
        "cost": 169440.59237213407,
        "return": 1.0381718308306012,
        "profit": 3516.122372134041
    },
    "2020-12-14": {
        "cost": 169440.59237213407,
        "return": 1.0371781492243057,
        "profit": 3516.122372134041
    },
    "2020-12-15": {
        "cost": 169440.59237213407,
        "return": 1.0412697897827694,
        "profit": 3516.122372134041
    },
    "2020-12-16": {
        "cost": 167395.10348324516,
        "return": 1.04531588056585,
        "profit": 3843.633483245152
    },
    "2020-12-17": {
        "cost": 170184.10348324516,
        "return": 1.0520648893486526,
        "profit": 3843.633483245152
    },
    "2020-12-18": {
        "cost": 170184.10348324516,
        "return": 1.055678857912177,
        "profit": 3843.633483245152
    },
    "2020-12-21": {
        "cost": 170184.10348324516,
        "return": 1.0458986259990133,
        "profit": 3843.633483245152
    },
    "2020-12-22": {
        "cost": 170184.10348324516,
        "return": 1.0511905421155423,
        "profit": 3843.633483245152
    },
    "2020-12-23": {
        "cost": 167529.57570546737,
        "return": 1.0667037103596506,
        "profit": 3931.1057054673747
    },
    "2020-12-28": {
        "cost": 162642.32570546737,
        "return": 1.0704366114099877,
        "profit": 4669.855705467375
    },
    "2020-12-29": {
        "cost": 171990.32570546737,
        "return": 1.0737189969408238,
        "profit": 4669.855705467375
    },
    "2020-12-30": {
        "cost": 171990.32570546737,
        "return": 1.0710382066224802,
        "profit": 4669.855705467375
    },
    "2021-01-04": {
        "cost": 172284.81356261022,
        "return": 1.061149710293886,
        "profit": 5428.343562610233
    },
    "2021-01-05": {
        "cost": 174720.81356261022,
        "return": 1.0586485732778355,
        "profit": 5428.343562610233
    },
    "2021-01-06": {
        "cost": 174720.81356261022,
        "return": 1.0552674649373097,
        "profit": 5428.343562610233
    },
    "2021-01-07": {
        "cost": 176962.81356261022,
        "return": 1.0597328117957951,
        "profit": 5428.343562610233
    },
    "2021-01-08": {
        "cost": 176962.81356261022,
        "return": 1.0674580506325768,
        "profit": 5428.343562610233
    },
    "2021-01-11": {
        "cost": 176962.81356261022,
        "return": 1.062251250506323,
        "profit": 5428.343562610233
    },
    "2021-01-12": {
        "cost": 176962.81356261022,
        "return": 1.0648842330557056,
        "profit": 5428.343562610233
    },
    "2021-01-13": {
        "cost": 176962.81356261022,
        "return": 1.0600759347309339,
        "profit": 5428.343562610233
    },
    "2021-01-14": {
        "cost": 176962.81356261022,
        "return": 1.0617871982099858,
        "profit": 5428.343562610233
    },
    "2021-01-15": {
        "cost": 177348.92467372134,
        "return": 1.0479231849976816,
        "profit": 5851.854673721344
    },
    "2021-01-18": {
        "cost": 177348.92467372134,
        "return": 1.0463537365191409,
        "profit": 5851.854673721344
    },
    "2021-01-19": {
        "cost": 177348.92467372134,
        "return": 1.0406221539799736,
        "profit": 5851.854673721344
    },
    "2021-01-20": {
        "cost": 177348.92467372134,
        "return": 1.034234294554921,
        "profit": 5851.854673721344
    },
    "2021-01-21": {
        "cost": 177348.92467372134,
        "return": 1.0313318241793774,
        "profit": 5851.854673721344
    },
    "2021-01-22": {
        "cost": 177348.92467372134,
        "return": 1.0210913899430758,
        "profit": 5851.854673721344
    },
    "2021-01-26": {
        "cost": 176717.92467372134,
        "return": 1.0139767107996482,
        "profit": 6265.854673721344
    },
    "2021-01-27": {
        "cost": 176717.92467372134,
        "return": 1.0140334679170633,
        "profit": 6265.854673721344
    },
    "2021-01-28": {
        "cost": 176717.92467372134,
        "return": 1.0219748241919917,
        "profit": 6265.854673721344
    },
    "2021-01-29": {
        "cost": 175861.77467372135,
        "return": 1.0157259036616095,
        "profit": 6507.704673721344
    },
    "2021-02-01": {
        "cost": 177208.1080070547,
        "return": 1.0184646291286796,
        "profit": 6531.038007054676
    },
    "2021-02-02": {
        "cost": 174461.55965020577,
        "return": 1.0249077238476305,
        "profit": 7111.089650205766
    },
    "2021-02-03": {
        "cost": 173080.9729835391,
        "return": 1.0258533155859164,
        "profit": 7546.502983539099
    },
    "2021-02-04": {
        "cost": 177674.9729835391,
        "return": 1.0211818634513572,
        "profit": 7546.502983539099
    },
    "2021-02-05": {
        "cost": 177674.9729835391,
        "return": 1.0269498677053663,
        "profit": 7546.502983539099
    },
    "2021-02-08": {
        "cost": 178065.0929835391,
        "return": 1.020606941849069,
        "profit": 8289.3229835391
    },
    "2021-02-09": {
        "cost": 178065.0929835391,
        "return": 1.0216111251901383,
        "profit": 8289.3229835391
    },
    "2021-02-10": {
        "cost": 178065.0929835391,
        "return": 1.013949432619511,
        "profit": 8289.3229835391
    },
    "2021-02-11": {
        "cost": 179085.0929835391,
        "return": 1.010780835994196,
        "profit": 8289.3229835391
    },
    "2021-02-12": {
        "cost": 179085.0929835391,
        "return": 1.0112560290914119,
        "profit": 8289.3229835391
    },
    "2021-02-17": {
        "cost": 179085.0929835391,
        "return": 1.0120444810929023,
        "profit": 8289.3229835391
    },
    "2021-02-18": {
        "cost": 179085.0929835391,
        "return": 1.0077575246119932,
        "profit": 8289.3229835391
    },
    "2021-02-19": {
        "cost": 179085.0929835391,
        "return": 1.0099492201543803,
        "profit": 8289.3229835391
    },
    "2021-02-22": {
        "cost": 180359.0929835391,
        "return": 0.9826086784333886,
        "profit": 8289.3229835391
    },
    "2021-02-23": {
        "cost": 182245.5929835391,
        "return": 1.0010579515987434,
        "profit": 8289.3229835391
    },
    "2021-02-24": {
        "cost": 182245.5929835391,
        "return": 1.0036514299499195,
        "profit": 8289.3229835391
    },
    "2021-02-25": {
        "cost": 181071.5929835391,
        "return": 0.9888040804737197,
        "profit": 8604.3229835391
    },
    "2021-02-26": {
        "cost": 182392.5929835391,
        "return": 0.9755415891042148,
        "profit": 8604.3229835391
    },
    "2021-03-01": {
        "cost": 183976.35885655502,
        "return": 0.975480171014406,
        "profit": 7930.088856554971
    },
    "2021-03-02": {
        "cost": 178068.15276959847,
        "return": 0.9735455066145735,
        "profit": 9066.98276959845
    },
    "2021-03-03": {
        "cost": 178068.15276959847,
        "return": 0.9690544733356763,
        "profit": 9066.98276959845
    }
}

class GetPortfolioReturn extends Component {
    constructor(props) {
        super(props);
        this.state = { data: {}, startDate: "2020-10-02", endDate: "2021-03-03"}
        this.assetSelectedEvent = this.assetSelectedEvent.bind(this)
        this.removeAssetHandler = this.removeAssetHandler.bind(this)
    }
    componentDidMount(){
        let today = new Date()
        let body = {
            startDate : "2020-10-02",
            endDate : "2021-03-03"
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
            let data = mockData
            let firstPercent = 0
            firstPercent = data[body.startDate].return
            
            //remove unused attributes
            let returnPercentages = {}
            Object.keys(data).forEach(date => returnPercentages[date] = { 'portfolio' : 1 + (data[date].return - firstPercent)   } )
            let codes = ["IBOV", "IFIX"]
            codes.forEach(assetCode =>{
                appendIndexTimeSeriesPercentage(returnPercentages, assetCode, new Date(body.startDate), new Date(body.endDate))
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