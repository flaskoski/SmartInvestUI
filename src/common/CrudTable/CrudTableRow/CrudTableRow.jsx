import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import {ArrowUpwardIcon, ArrowDownwardIcon} from '@material-ui/icons/ArrowUpward';
import "./CrudTableRow.css";

class CrudTableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item : props.item
        }
        this.onItemDeleteClickedHandler = this.onItemDeleteClickedHandler.bind(this)
    }
    
    componentDidMount(){
        console.log("row didmount")
        
        if(typeof this.props.itemUpdateHandler === "function")
            this.props.itemUpdateHandler(this.state.item).then(updatedItem =>{
                this.setState({
                    item: updatedItem
                })
            })
        
    }
    shouldComponentUpdate(nextProps, nextState){
        return nextState.item !== undefined
    }
    render() {
        // console.log(this.state.item)
        // Object.entries(this.state.item).forEach(([fieldKey, fieldValue]) => {
        //     fieldValues.push({key: fieldKey,value : fieldValue})
        // });
        return ( 
            <tr key={"row_"+this.props.key} className="crud-table-row">
                <td>
                    <span className="custom-checkbox">
                        <input className="margin10" type="checkbox" id="checkbox5" name="options[]" value="1" />
                        <label htmlFor="checkbox5"></label>
                    </span>
                </td>
                {this.props.fields.map((field, i) =>{
                    if(field.name)
                        return(
                            <td>{this.state.item? this.state.item[field.name] : "" }</td>
                        )
                    else{
                        console.warning(`Parameter 'name' for field number ${i} not informed`)
                        return ("")
                    }
                })}
                <td>
                <a href="#editEmployeeModal" className="edit"  data-tip="Edit"><i className="material-icons"></i></a>
                <ReactTooltip />
                <a onClick={this.onItemDeleteClickedHandler} href="#deleteEmployeeModal" className="delete"  data-tip="Delete"><i className="material-icons"></i></a>
                <ReactTooltip />
                </td>
            </tr>
        );
    }
    onItemDeleteClickedHandler(){
        this.props.onItemDeleteClickedHandler(this.state.item)
    }
}
    
export default CrudTableRow
;