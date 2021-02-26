import React, { Component } from 'react';
import "./style.css"

class CrudTableTitle extends Component {
    constructor(props){
        super(props);

        this.addClicked = this.addClicked.bind(this);
    }
    state = {  }
    render() { 
        return (
        <div className="custom-table-title">
            <div className="custom-row">
                <div style={{"width": "25%"}}>
                    <h2>{this.props.title}</h2>
                </div>
                <div style={{"width": "75%"}}>
                    <a href="#add" onClick={this.addClicked} className="btn btn-success" data-toggle="modal"><i className="material-icons"></i> <span>Add New {this.props.title}</span></a>
                    <a href="#deleteSelected" className="btn btn-danger" data-toggle="modal"><i className="material-icons"></i> <span>Delete</span></a>						
                </div>
            </div>
        </div>
        );
    }
    addClicked(){
        this.props.onAddClickedHandler();
    }
}
 
export default CrudTableTitle;