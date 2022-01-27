import React from 'react';
import Auth from '@aws-amplify/auth';
import { buildGetCall, buildPostCall } from './ApiCallBuilder';

//premise: pagination on the api response
export default function getAllTransactions(callback){
    let today = new Date()
    let callInfo = {}
    return buildPostCall(process.env.REACT_APP_BACKEND_TRANSACTIONS+'-get', undefined, undefined, true)
        .then((data) => {
            console.log(`${(data?.items? data.items.length :"0")} transactions loaded.`)
            let transactions = data.items
            let pagesLoaded = 1
            let lastKey = data.lastKey
            if(!lastKey) 
                callback(transactions);
            else{
              //TODO - adjust ddb query pagination
                // for(let page=1; page < totalPages; page++){
                //     buildGetCall(process.env.REACT_APP_BACKEND_TRANSACTIONS, `page=${page}&size=100&sort=date,asc`, true)
                //     .then(data => {
                //         console.log(`${(data.content? data.content.length :"0")} transactions loaded.`)
                //         transactions = [...transactions, ...data.content]
                //         pagesLoaded++
                //         if(pagesLoaded == totalPages)
                //             callback(transactions)
                //     }).catch(e => console.warn(`Error getting transactions from page ${page}: ${e}`))
                // }
            }
        }).catch(e => console.warn(`Error getting transactions from page 0: ${e}`)) 
}

export function getTransactions(assetId=null, size=30, page=0){
    return buildPostCall(process.env.REACT_APP_BACKEND_TRANSACTIONS+'-get', null ,`${assetId?"assetId="+assetId:""}&size=${size}`, true)
    .then(result => {
        console.log(`${assetId? assetId+" " : ""}transactions loaded ${(result.items?.length)}`)
        return result
    }).catch(e => console.log("Error loading transactions: "+ e))
}

export function getTransactionsWithFilter(removedOptions, size=50){
    return buildPostCall(process.env.REACT_APP_BACKEND_TRANSACTIONS+'-get', 
      Object.entries(removedOptions).reduce((ac, [key, val]) => ({
        filters: {...ac, [key]: {notIn: val}} }), {}
      ), 
      `size=${size}`, true)
    .then(page => {
        console.log(`Transactions with filter loaded ${(page.items? page.items?.length :"")}`)
        return page
    })
    .catch(e => console.log("Error loading transactions: "+ e))
}