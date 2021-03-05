import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries, LineSeries } from "react-stockcharts/lib/series";
import {MouseCoordinateY} from "react-stockcharts/lib/coordinates";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last, head } from "react-stockcharts/lib/utils";
import CrossHairCursor from 'react-stockcharts/lib/coordinates/CrossHairCursor';
//count only days with data on x axis
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";

import MouseCoordinateX from 'react-stockcharts/lib/coordinates/MouseCoordinateX';

//Y axis markers
import { InteractiveYCoordinate, InteractiveText, DrawingObjectSelector } from "react-stockcharts/lib/interactive";
import { getMorePropsForChart } from "react-stockcharts/lib/interactive/utils";
import {
	getInteractiveNodes,
} from "./interactiveutils";

//exponential average
import { ema } from "react-stockcharts/lib/indicator";

function round(number, precision = 0) {
	const d = Math.pow(10, precision);
	return Math.round(number * d) / d;
}

// const buy = {
// 	...InteractiveYCoordinate.defaultProps.defaultPriceCoordinate,
// 	stroke: "#1F9D55",
// 	textFill: "#1F9D55",
// 	text: "Buy 120",
// 	edge: {
// 		...InteractiveYCoordinate.defaultProps.defaultPriceCoordinate.edge,
// 		stroke: "#1F9D55"
// 	}
// };

class LineChart extends React.Component {
	constructor(props){
		super(props);
		
		this.getInteractiveNodes = getInteractiveNodes.bind(this);

		this.handleChoosePosition = this.handleChoosePosition.bind(this);
		this.handleChooseTextPosition = this.handleChooseTextPosition.bind(this);
		this.onDrawComplete = this.onDrawComplete.bind(this);
		this.handleSelection = this.handleSelection.bind(this);		

		this.state = {
			enableInteractiveObject: false,
			yCoordinateList: [],
			textList: [],
			showModal: false,
				// [{
				// 	...buy,
				// 	yValue: 160.90,
				// 	id: 1,
				// 	draggable: false,
				// }]
			comparingMarkersActive: 0	
		};
	}

	render() {
		const height = 400;
		const { type, data: initialData, width, ratio, assetCodes } = this.props;

		const margin = { left: 70, right: 70, top: 20, bottom: 30 };

		const gridHeight = height - margin.top - margin.bottom;
		const gridWidth = width - margin.left - margin.right;

		const showGrid = true;

		// const candlesAppearance = {
		// 	stroke: function stroke(d) { return d.close > d.open ? "#6BA583" : "#DB0000"},
		// 	wickStroke: function wickStroke(d) { return d.close > d.open ? "#6BA583" : "#DB0000"},
		// 	fill: function fill(d) { return d.close > d.open ? "#6BA583" : "#DB0000"},
		// 	// wickStroke: "#000000",
		// 	// fill: function fill(d) {
		// 	//   return d.close > d.open ? "rgba(11, 196, 15, 0.8)" : "rgba(210, 11, 15, 0.8)";
		// 	// },
		// 	// stroke: "#000000",
		// 	// candleStrokeWidth: 1,
		// 	// widthRatio: 0.8,
		// 	opacity: 0.7,
		// }

		// const ema10 = ema()
		// 	.id(1)
		// 	.options({ windowSize: 10 })
		// 	.merge((d, c) => {d.ema10 = c;})
		// 	.accessor(d => d.ema10);
		// ema10(initialData);

		// const ema20 = ema()
		// 		.id(2)
		// 		.options({ windowSize: 20 })
		// 		.merge((d, c) => {d.ema20 = c;})
		// 		.accessor(d => d.ema20);
		// ema20(initialData);
		// let lineseriesEma10 = '';
		// let lineseriesEma20 = '';
		// if(this.props.indicators){
        //    if(this.props.indicators["ema10"]){	
        //         lineseriesEma10 = <LineSeries yAccessor={ema10.accessor()} stroke={ema10.stroke()}/>
        //     }
        //     if(this.props.indicators["ema20"]){
        //         lineseriesEma20 = <LineSeries yAccessor={ema20.accessor()} stroke={ema20.stroke()}/>
        //     }
        // }

		const calculatedData = initialData;
		const xScaleProvider = discontinuousTimeScaleProvider
			.inputDateAccessor(d => d.date);
		const {
			data,
			xScale,
			xAccessor,
			displayXAccessor,
		} = xScaleProvider(calculatedData);

		// const xAccessor = d => d.date;
		const xExtents = [
			xAccessor(last(data)),
			xAccessor(data[Math.max(0, data.length - 100)])
		];

		return (
			<ChartCanvas height={height}				
					width={width}
					ratio={ratio}
					margin={margin}
					//margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
					type={type}
					seriesName="MSFT"
					data={data}
					xScale={xScale}
					xAccessor={xAccessor}
					displayXAccessor={displayXAccessor}
					xExtents={xExtents}
				>

				<Chart id={1} 
					// yExtents={[d => [d.high, d.low], ema20.accessor(), ema10.accessor()]} 
                    yExtents={[d => Object.keys(d).filter(attr => attr!="date").map(attr => d[attr])]} //[d.portfolio, d["IBOV"]]]} //
					padding={{ top: 10, bottom: 20 }}
					>
					
					<XAxis axisAt="bottom" orient="bottom" ticks={6}/>
					<YAxis axisAt="left" orient="left" ticks={5} />
					
					<MouseCoordinateX
						at="bottom"
						orient="bottom"
						displayFormat={timeFormat("%Y-%m-%d")} />
					<MouseCoordinateY
						at="right"
						orient="right"
						displayFormat={format(".2f")} />

                    <LineSeries
						yAccessor={d => d.portfolio} />
                        
                    {this.props.assetCodes.map((attr, i) => {return (
                        <LineSeries
                            yAccessor={d => d[attr]} />)
                    })}

                    {/* <LineSeries
						yAccessor={d => d['IBOV']} /> */}
					<CrossHairCursor />
					<InteractiveYCoordinate
							yCoordinateList={this.state.yCoordinateList}
						/>
					<InteractiveText
							textList={this.state.textList}
							onDragComplete={this.onDrawComplete}
						/>

				</Chart>
				{/* to add new markers */}
				{/* <DrawingObjectSelector
						enabled
						getInteractiveNodes={this.getInteractiveNodes}
						drawingObjectMap={{
							InteractiveYCoordinate: "yCoordinateList",
							InteractiveText: "textList"
						}}
						onSelect={this.handleSelection}
					/> */}
			</ChartCanvas>
		);
	}

	handleSelection(interactives, moreProps, e) {
		if (this.state.enableInteractiveObject) {
			if(this.state.comparingMarkersActive > 1){
				this.setState({ 
					enableInteractiveObject: true,
					yCoordinateList: [],
					textList: [],
					comparingMarkersActive: 0
				 });
			}
			else{
				const independentCharts = moreProps.currentCharts.filter(d => d !== 2);
				if (independentCharts.length > 0) {
					const first = head(independentCharts);

					const morePropsForChart = getMorePropsForChart(moreProps, first);
					const {
						mouseXY: [, mouseY],
						chartConfig: { yScale },
						xAccessor,
						currentItem,
					} = morePropsForChart;

					let yValue = round(yScale.invert(mouseY), 2);
					
					//get the difference between the markers
					if(this.state.yCoordinateList.length == 1){
						const percentDiff = 100 * ( (yValue / this.state.yCoordinateList[0].yValue)-1 );

						const position = [xAccessor(currentItem), yScale.invert(mouseY)];
						const newText = {
							...InteractiveText.defaultProps.defaultText,
							position,
							text: round(percentDiff, 2) + '%',
							//textFill: (percentDiff >= 0? "#10A015" : "#A01015"),
							textFill: (percentDiff >= 0? "#50F055" : "#FFA5A5"),
							bgFill: "#303030",
							opacity: 0.2
						};
						this.handleChooseTextPosition(newText, percentDiff, e);
					}
					const newMarker = {
						...InteractiveYCoordinate.defaultProps.defaultPriceCoordinate,
						yValue,
						id: this.state.comparingMarkersActive + 1,
						text: (this.state.yCoordinateList.length == 0? "Start" : "End"),
						stroke: (this.state.yCoordinateList.length == 0? "#6574CD" : "#202020"),
						textFill: (this.state.yCoordinateList.length == 0? "#6574CD" : "#202020"),
					};
					newMarker.edge.stroke = (this.state.yCoordinateList.length == 0? "#6574CD" : "#202020");
					this.handleChoosePosition(newMarker, morePropsForChart, e);
				}
			}
		} 
	}

	handleChooseTextPosition(text, value) {
		// this.componentWillUnmount();
		// const { id: chartId } = moreProps.chartConfig;
		this.setState({
			[`textList`]: [
				...this.state[`textList`],
				text
			],
			showModal: true,
			text: value,
			chartId: 1
		});
	}

	handleChoosePosition(marker, moreProps) {
		
		// const { id: chartId } = moreProps.chartConfig;
		this.setState({
			// [`yCoordinateList_${chartId}`]: [
			// 	...this.state[`yCoordinateList_${chartId}`],
			// 	marker
			// ],
			['yCoordinateList']: [
				...this.state['yCoordinateList'],
				marker
			],
			comparingMarkersActive: this.state.comparingMarkersActive + 1
		});
		
	}
	onDrawComplete(textList, moreProps) {
		// this gets called on
		// 1. draw complete of drawing object
		// 2. drag complete of drawing object
		// const { id: chartId } = moreProps.chartConfig;
	
		this.setState({
		  enableInteractiveObject: false,
		  [`textList`]: textList
		});
	  }
}

LineChart.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

LineChart.defaultProps = {
	type: "svg",
};
LineChart = fitWidth(LineChart);

export default LineChart;
