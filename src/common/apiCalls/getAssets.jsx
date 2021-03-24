import Auth from '@aws-amplify/auth';


export default function getAssets(page=0, size=80){
    return Auth.currentAuthenticatedUser().then(user => fetch(process.env.REACT_APP_BACKEND_ASSETS+`?username=${user.username}&page=${page}&size=${size}&sort=code`))
    .then(res => res.json())
    .then((page) => {
        console.log(`Assets loaded ${(page.content? page.content.length :"")}`)
        return page
    }).catch(e => console.log("Error loading assets!"))
}
