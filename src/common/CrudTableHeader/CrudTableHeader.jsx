import React, { Component } from 'react';

class CrudTableHeader extends Component {
    state = {  }
    render() { 
        return ( 
            <thead>
                <tr>
                    <th>
                        <span className="custom-checkbox">
                            <input type="checkbox" id="selectAll"/>
                            <label htmlFor="selectAll"></label>
                        </span>
                    </th>
                    {this.props.headers.map((h, i) =>{
                        return (<th>{h}</th>);
                    })}
                    <th>Actions</th>
                </tr>
            </thead>
        );
    }
}

export default CrudTableHeader;