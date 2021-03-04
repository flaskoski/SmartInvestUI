import React from 'react';

export default function getAssets(page=0, size=80){
    return fetch(process.env.REACT_APP_BACKEND_ASSETS+`?page=${page}&size=${size}`)
    .then(res => res.json())
    .then((data) => {
        console.log(`Assets loaded ${(data.content? data.content.length :"")}`)
        return data.content
    }).catch(e => console.log("Error loading assets!"))
}