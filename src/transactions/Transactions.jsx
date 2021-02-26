import React, { Component } from 'react';
// import CrudTableTitle from '../common/CrudTable/CrudTableTitle/CrudTableTitle';
// import CrudTableHeader from '../common/CrudTable/CrudTableHeader/CrudTableHeader';
// import Transaction from './Transaction';
import CrudTable from '../common/CrudTable/CrudTable';

class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            transactions: [],
            fields: [
                {
                    name: "asset",
                    label: "Code",
                    type: "text",
                    isInput: true,
                },{
                    name: "type",
                    label: "Action",
                    type: "text",
                    isRequired: true
                },{
                    name: "price",
                    label: "Price",
                    type: "float",
                    isInput: true
                },{
                    name: "shares_number",
                    label: "Amount",
                    type: "int",
                    isInput: true
                },{
                    name: "date",
                    label: "Date",
                    type: "date",
                    isInput: true
                }
            ]
        };
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
        
        return ( 
            <section className="block_unit-7" 
                style={{"float": "left"}}>
                <CrudTable
                    itemType={"Transaction"}
                    fields={this.state.fields}
                    items={this.state.transactions}
                >
                    {/* {this.state.assets.map((asset, i) =>{
                        return (
                            <Asset key={i} id={asset.id} code={asset.code} />
                        );
                    } )} */}
                </CrudTable>
            </section>

            // <section className="block_unit-7" style={{"float": "left"}}>
            //     <CrudTableTitle title="Transactions" />
            //     <div id="table-scroll" style={{"float": "left"}}>
            //         <table className="custom-table table-striped table-hover">
            //         <CrudTableHeader headers={["Code", "Action", "Price", "Amount", "Date"]}/>
            //         <tbody>
            //             {this.state.transactions.map((transaction, i) =>{
            //                 return (
            //                     <Transaction key={i} {...transaction} />
            //                 );
            //             } )}
            //         </tbody>
            //         </table>
            //     </div>
            //     {/* <div style={{"height" : "200px","width" : "200px", "background-color": "red", float: "left" }}></div> */}
            // </section>
         );
    }
}
 
export default Transactions;