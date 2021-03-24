import React, { Component } from 'react';
import TableFilter from 'react-table-filter';
import "./CrudTableHeader.css";
import "react-table-filter/lib/styles.css";


class CrudTableHeader extends Component {
    constructor(props){
        super(props);
        this.filterUpdated = this.filterUpdated.bind(this);
        this.state = {
            removedOptions: {}
        }
    }
    
    render() { 
        //--make an array with all the possible values options
        let tableData = []
        this.props.headers.forEach(h =>{
            if(h.type == "choice")
                h.choices.forEach((choice, i) =>{
                    if(!tableData[i]) 
                        tableData[i] = {}
                    tableData[i][h.name] = choice
                })
        })
        return (
            <TableFilter rows={tableData} onFilterUpdate={this.filterUpdated} initialFilters={this.state.removedOptions}>
                <th key="checkbox" className="borderWhite">
                    <span className="custom-checkbox">
                        <input className="margin10" type="checkbox" id="selectAll"/>
                        <label htmlFor="selectAll"></label>
                    </span>
                </th>
                {this.props.headers.map((h, i) =>{
                    return (<th key={h.name} filterkey={h.type == "choice"? h.name.toLowerCase(): undefined}>{h.label}</th>);
                })}
                <th key="actions">Actions</th>
            </TableFilter>
        );
    }
    filterUpdated = (newData, removedOptions) => {
        this.setState({removedOptions: removedOptions})
        this.props.onFilterChanged(removedOptions)
	}
}

export default CrudTableHeader;