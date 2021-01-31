
import { tsvParse, csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";
import raw from "raw.macro";

function parseData(parse) {
	return function(d) {
		d.date = parse(d.date);
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;
		d.volume = +d.volume;

		return d;
	};
}
function parseSeriesJson(json, parse){
	let content = json["Time Series (Daily)"];
	if(!content)
		return{};

	let series = [];
	
	let aux = Object.keys(content).reverse().forEach(day => {
		series.push({
			date : parse(day),
			open : content[day]["1. open"],
			high : content[day]["2. high"],
			low : content[day]["3. low"],
			close : content[day]["4. close"],
			volume : content[day]["6. volume"]
		})
	});
	return {
		'data': series,
		'code': json["Meta Data"]["2. Symbol"]
	};
}

const parseDate = timeParse("%Y-%m-%d");

//OC8AZHP6EZ0ABFIW
export function getData(apiKey, assetCode) {
	// const promiseMSFT = fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv")
	// 	.then(response => response.text())
	// 	.then(data => csvParse(data, parseData(parseDate)))
	// const dataFile = raw("./data.csv");
	// const promiseMSFT = csvParse(dataFile, parseData(parseDate))
	// const data = raw("./data.json");
	// const promiseMSFT = parseSeriesJson(JSON.parse(data), parseDate);
	const promiseMSFT = fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol="+assetCode+".SA&apikey="+ apiKey +"&outputsize=compact")
	.then(response => response.text())
	.then(data => parseSeriesJson(JSON.parse(data), parseDate));
	return promiseMSFT;
}
