import React, { Component } from 'react';
import CrudTableTitle from '../common/CrudTableTitle/CrudTableTitle';
import CrudTableHeader from '../common/CrudTableHeader/CrudTableHeader';
import Transaction from './Transaction';

class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        fetch('http://localhost:8080/transactions?page=0&size=10&sort=date,desc')
        .then(res => res.json())
        .then((data) => {
          this.setState({ transactions: data.content })
          console.log(this.state.transactions);
        })
        .catch(console.log)
    }
    render() { 
        if(!this.state.transactions)
            return null;
        return ( 
            <section className="block_unit-7" style={{"float": "left"}}>
                <CrudTableTitle title="Transactions" />
                <div id="table-scroll" style={{"float": "left"}}>
                    <table className="table table-striped table-hover">
                    <CrudTableHeader headers={["Code", "Action", "Price", "Amount", "Date"]}/>
                    <tbody>
                        {this.state.transactions.map((transaction, i) =>{
                            return (
                                <Transaction key={i} {...transaction} />
                            );
                        } )}
                    </tbody>
                    </table>
                </div>
                {/* <div style={{"height" : "200px","width" : "200px", "background-color": "red", float: "left" }}></div> */}
            </section>
         );
    }
}
 
export default Transactions;