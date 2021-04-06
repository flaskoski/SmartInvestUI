import { buildGetCall, getUserAndAuthorizationHeader } from './ApiCallBuilder';


export default function getAssets(page=0, size=80){
    return buildGetCall(process.env.REACT_APP_BACKEND_ASSETS, `page=${page}&size=${size}&sort=code`, true, false)
    .then(page =>{
        console.log(`Assets loaded ${(page.content? page.content.length :page.length)}`)
        return page
    })
    .catch(e => console.log("Error loading assets: " + e))
}
