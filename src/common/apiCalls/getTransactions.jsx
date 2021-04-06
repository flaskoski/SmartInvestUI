import React from 'react';
import Auth from '@aws-amplify/auth';
import { buildGetCall, buildPostCall, getUserAndAuthorizationHeader } from './ApiCallBuilder';

//premise: pagination on the api response
export default function getAllTransactions(callback){
    let today = new Date()
    let callInfo = {}
    return buildGetCall(process.env.REACT_APP_BACKEND_TRANSACTIONS, `page=0&size=100&sort=date,asc`, true, false)
        .then((data) => {
            console.log(`${(data.content? data.content.length :"0")} transactions loaded.`)
            let transactions = data.content
            let pagesLoaded = 1
            let totalPages = data.totalPages
            if(totalPages == 1) 
                callback(transactions);
            else{
                for(let page=1; page < totalPages; page++){
                    buildGetCall(process.env.REACT_APP_BACKEND_TRANSACTIONS, `page=${page}&size=100&sort=date,asc`, true, false)
                    .then(data => {
                        console.log(`${(data.content? data.content.length :"0")} transactions loaded.`)
                        transactions = [...transactions, ...data.content]
                        pagesLoaded++
                        if(pagesLoaded == totalPages)
                            callback(transactions)
                    }).catch(e => console.warn(`Error getting transactions from page ${page}: ${e}`))
                }
            }
        }).catch(e => console.warn(`Error getting transactions from page 0: ${e}`)) 
}

export function getTransactions(code=null, size=30, page=0){
    return buildGetCall(process.env.REACT_APP_BACKEND_TRANSACTIONS, `${code?"code="+code:""}&page=${page}&size=${size}&sort=date,desc`, true, false)
    .then(page => {
        console.log(`${code? code+" " : ""}transactions loaded ${(page.content? page.content.length : page.length)}`)
        return page
    }).catch(e => console.log("Error loading transactions: "+ e))
}

export function getTransactionsWithFilter(removedOptions, size=50, page=0){
    return buildPostCall(process.env.REACT_APP_BACKEND_TRANSACTIONS_WITH_FILTER, removedOptions, `page=${page}&size=${size}`, true, false)
    .then(page => {
        console.log(`Transactions with filter loaded ${(page.content? page.content.length :"")}`)
        return page
    })
    .catch(e => console.log("Error loading transactions: "+ e))
}