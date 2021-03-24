import React, { Component } from 'react';
import Assets from './Assets';
import Transactions from './Transactions';
import ChartComponent from '../charts/ChartComponent';
import Auth from '@aws-amplify/auth';

class AssetsTransactions extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount(){
        Auth.currentAuthenticatedUser().then(user => this.setState({
            username: user.username
        }))
    }
    render() { 
        if(this.state.username)
            return (
                <section>
                    <Assets username={this.state.username}/>
                    <Transactions username={this.state.username}/>
                    <ChartComponent/>
                </section>
                );
        else return ("")
    }
}
 
export default AssetsTransactions;