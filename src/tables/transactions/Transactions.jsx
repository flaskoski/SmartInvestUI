import React, { Component } from 'react';
import { getTransactions } from '../../common/apiCalls/getTransactions';
import CrudTable from '../../common/CrudTable/CrudTable';

class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            transactions: [],
            fields: [
                {
                    name: "username",
                    label: "Username",
                    type: "text",
                    isInput: true,
                    isReadOnly: true,
                    hide: true,
                    defaultValue: this.props.username
                },{
                    name: "asset",
                    label: "Code",
                    type: "text",
                    isInput: true,
                },{
                    name: "type",
                    label: "Action",
                    type: "choice",
                    choices: ["BUY", "SELL", "DIVIDEND", "JCP"],
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
                    defaultValue: 100,
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
                    getItems={getTransactions}
                    backendUrl={process.env.REACT_APP_BACKEND_TRANSACTIONS}
                >
                </CrudTable>
            </section>

         );
    }
}
 
export default Transactions;