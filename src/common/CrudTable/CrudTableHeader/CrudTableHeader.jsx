import React, { Component } from 'react';
import TableFilter from 'react-table-filter';
import "./CrudTableHeader.css";
import "react-table-filter/lib/styles.css";


class CrudTableHeader extends Component {
    constructor(props){
        super(props);
        this._filterUpdated = this._filterUpdated.bind(this);
        this.state = {
            data : this.props.tableData
        }
    }
    
    render() { 
        return (
            <thead className="crud-table">
                <TableFilter rows={this.state.data} onFilterUpdate={this._filterUpdated}>
                    <th className="borderWhite">
                        <span className="custom-checkbox">
                            <input className="margin10" type="checkbox" id="selectAll"/>
                            <label htmlFor="selectAll"></label>
                        </span>
                    </th>
                    {this.props.headers.map((h, i) =>{
                        return (<th key={h} filterkey={h.toLowerCase() }>{h}</th>);
                    })}
                    <th>Actions</th>
                </TableFilter>
            </thead>
        );
    }
    _filterUpdated = (newData, filterConfiguration) => {
		this.setState({
			data : newData
		});
	}
}

export default CrudTableHeader;