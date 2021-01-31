import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';

class Asset extends Component {
    // constructor(props){
    //     super(props);
    // }
    componentDidMount(){
        fetch('https://54kwimgt6h.execute-api.sa-east-1.amazonaws.com/prod/quoter?code='+ this.props.code,
                    {"headers": {"x-api-key": "JgRB8Tw1sn4fcSBZYdOlh7fAigKOKji48Yt6n8vW"}})
        .then(res => res.json())
        .then((data) => {
          this.setState({ price: data })
          console.log(this.state.price);
        })
        .catch(console.log)
    }
    state = {  }
    render() { 
        return ( 
            <tr>
                <td>
                    <span className="custom-checkbox">
                        <input type="checkbox" id="checkbox5" name="options[]" value="1" />
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