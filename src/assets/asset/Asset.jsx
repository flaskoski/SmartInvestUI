import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';

class Asset extends Component {
    // constructor(props){
    //     super(props);
    // }
    componentDidMount(){
        // fetch(''+ this.props.code,
        //             {"headers": {"x-api-key": ""}})
        // .then(res => res.json())
        // .then((data) => {
        //   this.setState({ price: data })
        //   console.log(this.state.price);
        // })
        // .catch(console.log)
        // // this.setState({ price: "12.34" })
    }
    state = {  }
    render() { 
        return ( 
            <tr key={"row_"+this.props.code}>
                <td>
                    <span className="custom-checkbox">
                        <input className="margin10" type="checkbox" id="checkbox5" name="options[]" value="1" />
                        <label htmlFor="checkbox5"></label>
                    </span>
                </td>
                    <td>{this.props.id}</td>
                    <td>{this.props.code}</td>
                    <td>{this.state.price}</td>
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
 

export default Asset;