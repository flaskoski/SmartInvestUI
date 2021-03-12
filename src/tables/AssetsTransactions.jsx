import React, { Component } from 'react';
import Assets from '../tables/assets/Assets';
import Transactions from '../tables/transactions/Transactions';
import ChartComponent from '../charts/ChartComponent';

class AssetsTransactions extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <section>
                <Assets />
                <Transactions/>
                <ChartComponent/>
            </section>
         );
    }
}
 
export default AssetsTransactions;