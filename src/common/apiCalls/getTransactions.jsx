import React from 'react';

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
    fetch(process.env.REACT_APP_BACKEND_TRANSACTIONS+`?page=0&size=100&sort=date,asc`)
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
                fetch(process.env.REACT_APP_BACKEND_TRANSACTIONS+`?page=${page}&size=100&sort=date,asc`)
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