import React, { Component } from 'react';
import Assets, { AssetsContext } from './Assets';
import ChartComponent from '../charts/ChartComponent';
import Auth from '@aws-amplify/auth';
import Transactions from './Transactions';

class AssetsTransactions extends Component {
  constructor(props) {
      super(props);
      console.log("constructor assettransaction")
      this.state = { 
        assets: []
      }
      this.onAssetsChange = this.onAssetsChange.bind(this)
  }
  componentDidMount(){
      Auth.currentAuthenticatedUser().then(user => this.setState({
          username: user.username
      }))
  }

  //for the assets context
  onAssetsChange(newAssets){
    this.setState({
      assets: newAssets
    })
  }
  render() { 
    if(this.state.username)
      return (
        <section>
          <AssetsContext.Provider value={{assets: this.state.assets}}>
            <Assets username={this.state.username} onChange={this.onAssetsChange}/>
            {this.state.assets?.length
            ? <Transactions username={this.state.username}/> 
            : ""}
            <ChartComponent/>
          </AssetsContext.Provider>
        </section>
        );
    else return ("")
  }
            
}


 
export default AssetsTransactions;