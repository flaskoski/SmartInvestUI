import React, { Component } from 'react';
import "./ChartOptions.css"

class ChartOptions extends Component {
    constructor(props) {
        super(props);
        this.toggleEma10 = this.toggleEma10.bind(this);
        this.toggleEma20 = this.toggleEma20.bind(this);
        console.log(props);

    }

    toggleEma10(event){
        this.props.toggle("ema10", event.target.checked);
    }
    toggleEma20(event){
        this.props.toggle("ema20", event.target.checked);
    }

    render() { 
        return ( 
            <section id="chart_options" style={{float: "left"}}>
                <label htmlFor="ema10" ><b>Chart Options:</b></label>
                <input type="checkbox" defaultChecked id="ema10" onClick={this.toggleEma10} name="ema10" value="ema10" />
                <label htmlFor="ema10">EMA10</label>
                <input type="checkbox" defaultChecked id="ema20" onClick={this.toggleEma20} name="ema20" value="ema20" />
                <label htmlFor="ema10">EMA20</label>
            </section>

         );
    }
}
 
export default ChartOptions;