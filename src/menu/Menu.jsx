import React, { Component } from 'react';
import { Button } from '@material-ui/core';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.getAssetReturn = this.getAssetReturn.bind(this)
        this.getPortfolioReturn = this.getPortfolioReturn.bind(this)
    }
    render() { 
        return ( 
            <section className="block_unit-2" style={{"float": "left"}}>
                {/* <Button style={{"margin": "3px"}} variant="outlined" color="primary" onClick={this.getAssetReturn} >Load Assets Return</Button> 
                <Button style={{"margin": "3px"}} variant="outlined" color="primary" onClick={this.getPortfolioReturn} >Portfolio Return</Button>          */}
            </section> 
        );
    }

    
    getAssetReturn(){
        let today = new Date()
        // this.props.assets.forEach(a =>{
        let a = {code: "CPTS11", type:"REIT"}
            fetch(process.env.REACT_APP_BACKEND_TRANSACTIONS+`?code=${a.code}&page=0&size=100&sort=date,asc`)
            .then(res => res.json())
            .then((data) => {
                console.log(`${(data.content? data.content.length :"0")} transactions loaded from ${a.code}`)
                console.log(data.content)
                let body = {
                    asset : a,
                    startDate : "2019-01-01",
                    endDate : `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`,
                    transactions : data.content
                }
                const requestOptions = {
                    method: 'POST',
                    headers: {  'Content-Type': 'application/json',
                                "x-api-key": process.env.REACT_APP_API_KEY_AWS },
                    body: JSON.stringify(body)
                };
                fetch(process.env.REACT_APP_API_GET_ASSET_RETURN, requestOptions)
                .then(res => res.json()).then((data) => {
                    console.log(data)
                })
            })
            .catch(e => console.log(`Error getting return from asset ${a.code}!`))
        // })
    }

    getPortfolioReturn(){
        // let today = new Date()
        let body = {
            startDate : "2021-02-02",
            endDate : "2021-02-10"
        }
        const requestOptions = {
            method: 'POST',
            headers: {  'Content-Type': 'application/json',
                        "x-api-key": process.env.REACT_APP_API_KEY_AWS },
            body: JSON.stringify(body)
        };
        fetch("https://5qx8xnn5e4.execute-api.sa-east-1.amazonaws.com/dev/portfolioReturn", requestOptions)
            .then(res => res.json()).then((data) => {
                console.log(data)
            }).catch(e => console.log(e))
    }
}
 
export default Menu;