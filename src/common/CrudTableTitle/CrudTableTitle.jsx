import React, { Component } from 'react';
import "./style.css"

class CrudTableTitle extends Component {
    state = {  }
    render() { 
        return (
        <div className="table-title">
            <div className="row">
                <div className="col-sm-6">
                    <h2>Manage <b>{this.props.title}</b></h2>
                </div>
                <div className="col-sm-6">
                    <a href="#add" className="btn btn-success" data-toggle="modal"><i className="material-icons"></i> <span>Add New {this.props.title}</span></a>
                    <a href="#deleteSelected" className="btn btn-danger" data-toggle="modal"><i className="material-icons"></i> <span>Delete</span></a>						
                </div>
            </div>
        </div>
        );
    }
}
 
export default CrudTableTitle;