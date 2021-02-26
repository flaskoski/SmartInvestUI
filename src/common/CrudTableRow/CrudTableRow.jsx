import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';

class CrudTableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item : props.item
        }
    }
    
    componentDidMount(){
        console.log("row didmount")
        
        if(typeof this.props.itemUpdateHandler === "function")
            // console.log("chegou", this.props.item.code)
            this.props.itemUpdateHandler(this.state.item).then(price =>{
                console.log("async finished")
                let updatedItem = this.state.item
                updatedItem.price = price
                this.setState({
                    item: updatedItem
                })
            })
        
    }
    shouldComponentUpdate(nextProps, nextState){
        console.log(nextState)
        return nextState.item != undefined
    }
    render() {
        let fieldValues = []; 
        // console.log(this.state.item)
        Object.entries(this.state.item).forEach(([fieldKey, fieldValue]) => {
            fieldValues.push({key: fieldKey,value : fieldValue})
        });
        return ( 
            <tr key={"row_"+this.props.itemKey}>
                <td>
                    <span className="custom-checkbox">
                        <input className="margin10" type="checkbox" id="checkbox5" name="options[]" value="1" />
                        <label htmlFor="checkbox5"></label>
                    </span>
                </td>
                {fieldValues.map((fieldValue, i) =>{
                    return(
                        <td>{fieldValue.value}</td>
                    )
                })}
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
    
export default CrudTableRow
;