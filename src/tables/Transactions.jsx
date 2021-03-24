import React, { Component } from 'react';
import { first } from 'react-stockcharts/lib/utils';
import getAssets from '../common/apiCalls/getAssets';
import { getTransactions, getTransactionsWithFilter } from '../common/apiCalls/getTransactions';
import CrudTable from '../common/CrudTable/CrudTable';

class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            removedOptions: [],
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
                    type: "choice",
                    choices: [],
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
        this.getTransactions = this.getTransactions.bind(this)
        this.addFilter = this.addFilter.bind(this)
    }
    componentDidMount(){
        //***TODO get all assets
        getAssets().then(page => {
            let assets = page.content
            let fields = this.state.fields
            fields.find(f => f.name == "asset").choices = (assets? assets.map(a => a.code): [])
            this.setState({fields: fields})
        })
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
                </CrudTable>
            </section>

         );
    }
    getTransactions(removedOptions){ //***TODO */
        if(removedOptions && Object.keys(removedOptions).length > 0)
            return getTransactionsWithFilter(removedOptions)
        else
            return getTransactions()
    }

    addFilter(){
    }
}
 
export default Transactions;