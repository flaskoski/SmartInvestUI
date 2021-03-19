
import { tsvParse, csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";
import raw from "raw.macro";
import { dateTimeInDays } from '../common/convert';

// function parseData(parse) {
// 	return function(d) {
// 		d.date = parse(d.date);
// 		d.open = +d.open;
// 		d.high = +d.high;
// 		d.low = +d.low;
// 		d.close = +d.close;
// 		d.volume = +d.volume;

// 		return d;
// 	};
// }
function parseSeriesJson(json, parse){
	let content = json["Time Series (Daily)"];
	if(!content)
		return{};

	let series = [];
	
	let aux = Object.keys(content).reverse().forEach(day => {
		series.push({
			date : parse(day),
			open : parseFloat(content[day]["1. open"]),
			high : parseFloat(content[day]["2. high"]),
			low : parseFloat(content[day]["3. low"]),
			close : parseFloat(content[day]["4. close"]),
			volume : parseFloat(content[day]["6. volume"])
		})
	});
	return {
		'data': series,
		'code': json["Meta Data"]["2. Symbol"]
	};
}

const parseDate = timeParse("%Y-%m-%d");
const API_KEY = process.env.REACT_APP_API_KEY_ALPHA
//OC8AZHP6EZ0ABFIW
export function getData( assetCode) {
	// const promiseMSFT = fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv")
	// 	.then(response => response.text())
	// 	.then(data => csvParse(data, parseData(parseDate)))
	// const dataFile = raw("./data.csv");
	// const promiseMSFT = csvParse(dataFile, parseData(parseDate))
	// const data = raw("./data.json");
	// const promiseMSFT = parseSeriesJson(JSON.parse(data), parseDate);
	const promiseMSFT = fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol="+assetCode+".SA&apikey="+ API_KEY +"&outputsize=compact")
	.then(response => response.text())
	.then(data => parseSeriesJson(JSON.parse(data), parseDate));
	return promiseMSFT;
}

export function appendIndexTimeSeriesPercentage(series = [], assetCode, startDate, endDate = new Date()){
    var outputSize = getAlphaApiOutputSize(startDate);
    const promiseMSFT = fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol="+assetCode+".SA&apikey="+ API_KEY +"&outputsize="+outputSize)
	.then(response => response.json())
	.then(data => {
        let content = data["Time Series (Daily)"]
        if(!content){
            console.info("indexTimeSeries: No content found")
            return{};
        }
        return convertToPercentageAndAppend(series, assetCode, content, parseDate, startDate, endDate)
    });
	return promiseMSFT;
}

function convertToPercentageAndAppend(series, assetCode, content, parse, startDate, endDate){
    let startDay = dateTimeInDays(startDate, true)
    let endDay = dateTimeInDays(endDate, true)

	let firstDayValue = null;
	let aux = Object.keys(content).reverse().forEach(date => {
        let day = dateTimeInDays(new Date(date), true)
        if(day >= startDay && day <= endDay){
            if(!firstDayValue) 
                firstDayValue = parseFloat(content[date]["4. close"])
            if(series[date])
                series[date][assetCode] = parseFloat(content[date]["4. close"])/firstDayValue
            else if(content[date]) 
                series[date] = { [assetCode] : parseFloat(content[date]["4. close"])/firstDayValue}
        }
	});
	return series;
}

function convertToPercentage(content, parse, startDate, endDate){
    let startDay = dateTimeInDays(startDate, true)
    let endDay = dateTimeInDays(endDate, true)
    
	let series = [];
	let firstDayValue = null;
	let aux = Object.keys(content).reverse().forEach(date => {
        let day = dateTimeInDays(new Date(date), true)
        if(day >= startDay && day <= endDay){
            if(!firstDayValue) 
                firstDayValue = parseFloat(content[date]["4. close"])
            series.push({
                date : parse(date),
                close : parseFloat(content[date]["4. close"])/firstDayValue
            })
        }
	});
	return series;
}

function getAlphaApiOutputSize(startDate){
    if( (new Date().getTime() - startDate.getTime()) / (1000 * 3600 * 24) < 100 )
        return "compact";
    return "full";
}

export function downloadJson(json, fileName = "json"){
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(json)], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = fileName+".txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
}

