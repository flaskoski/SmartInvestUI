import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';

import { timeParse } from "d3-time-format";

class Transaction extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    formatDate(date){
        if(!date || date.length != 3)
            return "";
        
        const dd = (date[2]<10 ? "0"+date[2] : date[2]) 
        const mm = (date[1]<10 ? "0"+date[1] : date[1])
        const yy = date[0]
        return `${dd}/${mm}/${yy}`;
    }
    
    render() { 
        return ( 
            <tr>
                <td>
                    <span className="custom-checkbox">
                        <input className="margin10" type="checkbox" id="checkbox5" name="options[]" value="1" />
                        <label htmlFor="checkbox5"></label>
                    </span>
                </td>
                    <td>{this.props.asset}</td>
                    <td>{this.props.type}</td>
                    <td>{this.props.price}</td>
                    <td>{this.props.shares_number}</td>
                    <td>{this.formatDate(this.props.date)}</td>
                    <td>
                    <a href="#editEmployeeModal" className="edit"  data-tip="Edit"><i className="material-icons"></i></a>
                    <ReactTooltip />
                    <a href="#deleteEmployeeModal" className="delete"  data-tip="Delete"><i className="material-icons"></i></a>
                    <ReactTooltip />
                </td>
            </tr>
         );
    }
}
 
export default Transaction;