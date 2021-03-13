import Auth from '@aws-amplify/auth';


export default function getAssets(page=0, size=80){
    return Auth.currentAuthenticatedUser().then(user => fetch(process.env.REACT_APP_BACKEND_ASSETS+`?username=${user.username}&page=${page}&size=${size}`))
    .then(res => res.json())
    .then((data) => {
        console.log(`Assets loaded ${(data.content? data.content.length :"")}`)
        return data.content
    }).catch(e => console.log("Error loading assets!"))
}
