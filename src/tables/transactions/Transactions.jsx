import React, { Component } from 'react';
// import CrudTableTitle from '../common/CrudTable/CrudTableTitle/CrudTableTitle';
// import CrudTableHeader from '../common/CrudTable/CrudTableHeader/CrudTableHeader';
// import Transaction from './Transaction';
import CrudTable from '../../common/CrudTable/CrudTable';

class Transactions extends Component {
    constructor(props) {
        super(props);
        this.getTransactions = this.getTransactions.bind(this);
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

    getTransactions(){
        return fetch(process.env.REACT_APP_BACKEND_TRANSACTIONS+'?page=0&size=10&sort=date,desc')
        .then(res => res.json())
        .then((data) => {
            console.log(`Transactions loaded ${(data.content? data.content.length :"")}`)
            console.log(data.content);
            return data.content
        })
        .catch(e => console.log("Error loading transactions!"))
    }

    formatDate(date){
        if(!date || date.length != 3)
            return "";
        // 
        const dd = (date[2]<10 ? "0"+date[2] : date[2]) 
        const mm = (date[1]<10 ? "0"+date[1] : date[1])
        const yy = date[0]
        return `${dd}/${mm}/${yy}`;
    }

    render() { 
        
        return ( 
            <section className="block_unit-7" 
                style={{"float": "left"}}>
                <CrudTable
                    key="Table-Transactions"
                    itemType={"Transaction"}
                    fields={this.state.fields}
                    getItems={this.getTransactions}
                    backendUrl={process.env.REACT_APP_BACKEND_TRANSACTIONS}
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