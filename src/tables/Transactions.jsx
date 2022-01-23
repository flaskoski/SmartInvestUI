import React, { Component } from 'react';
import { first } from 'react-stockcharts/lib/utils';
import { getAuthorizationHeader } from '../common/apiCalls/ApiCallBuilder';
import getAssets from '../common/apiCalls/getAssets';
import { getTransactions, getTransactionsWithFilter } from '../common/apiCalls/getTransactions';
import CrudTable from '../common/CrudTable/CrudTable';
import { AssetsContext } from './Assets';

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
          defaultValue: this.props.username,
          validate: (value) => (value.match(/^\w+$/) == null? "Only letters/numbers allowed": "" )
        },{
          name: "assetId",
          label: "Code",
          type: "lookup",
          choices: {},
          isInput: true
        // validate: (value) => (choices.indexOf(value) < 0? "Only options from the list are allowed": "" )
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
          isInput: true,
          validate: (value) => (isNaN(value) ? "Only decimal numbers allowed": "" )
        },{
          name: "sharesNumber",
          label: "Amount",
          type: "int",
          defaultValue: 100,
          isInput: true,
          validate: (value) => (isNaN(value) || value.indexOf(".") >= 0 ? "Only integer numbers allowed": "" )
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
    this.getTransactionAsset = this.getTransactionAsset.bind(this)
  }
  componentDidMount(){
      //***TODO get all assets
      getAssets().then(result => {
          // if(page && (page.content || page.length)){
              let assets = (result?.items ? result.items : result)
              let fields = this.state.fields
              fields.find(f => f.name == "assetId").choices = (assets?.length > 0 ? assets.reduce((ac, a) => ({...ac, [a.code]: a.id}), {}): {})
              this.setState({fields: fields})
          // }
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
                  backendHeaders={getAuthorizationHeader()}
                  formatItem={this.getTransactionAsset}
              >
              </CrudTable>
          </section>

        );
  }
  getTransactionAsset(transaction){ 
    const code = this.context?.assets?.find(asset => asset.id === transaction.assetId)?.code
    const id = transaction.assetId
    const newTransaction = {
      assetId: {[code]: id}
    }
    Object.keys(transaction).forEach(key => {
      if(key !== 'assetId')
        newTransaction[key] = transaction[key]
    })
    return newTransaction
  }
  getTransactions(removedOptions){ //***TODO */
      return (removedOptions && Object.keys(removedOptions).length > 0 
      ? getTransactionsWithFilter(removedOptions)
      : getTransactions())
      .then(result => ({
        items: result.items.map(this.getTransactionAsset)
      })).then(result => result)
  }
  addFilter(){
  }
} 
Transactions.contextType = AssetsContext

export default Transactions;