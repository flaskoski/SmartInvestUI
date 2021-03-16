import React from 'react';
import Auth from '@aws-amplify/auth';

// export default function getAssets(page=0, size=80){
//     return fetch(process.env.REACT_APP_BACKEND_ASSETS+`?page=${page}&size=${size}`)
//     .then(res => res.json())
//     .then((data) => {
//         console.log(`Assets loaded ${(data.content? data.content.length :"")}`)
//         return data.content
//     }).catch(e => console.log("Error loading assets!"))
// }


export default function getAllTransactions(callback){
    let today = new Date()
    let username = ""
    return Auth.currentAuthenticatedUser().then(user => { username = user.username;
        return fetch(process.env.REACT_APP_BACKEND_TRANSACTIONS+`?username=${username}&page=0&size=100&sort=date,asc`)})
        .then(res => res.json())
        .then((data) => {
            console.log(`${(data.content? data.content.length :"0")} transactions loaded.`)
            let transactions = data.content
            let pagesLoaded=1
            let totalPages = data.totalPages
            if(totalPages == 1) 
                callback(transactions);
            else{
                for(let page=1; page < totalPages; page++){
                    fetch(process.env.REACT_APP_BACKEND_TRANSACTIONS+`?username=${username}&page=${page}&size=100&sort=date,asc`)
                    .then(res => res.json()).then((data) => {
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
    return Auth.currentAuthenticatedUser().then(user => 
        fetch(process.env.REACT_APP_BACKEND_TRANSACTIONS+`?username=${user.username}&${code?"code="+code:""}&page=${page}&size=${size}&sort=date,desc`))
        .then(res => res.json())
        .then((data) => {
            console.log(`${code? code+" " : ""}transactions loaded ${(data.content? data.content.length :"")}`)
            return data.content
        })
        .catch(e => console.log("Error loading transactions: "+ e))
}