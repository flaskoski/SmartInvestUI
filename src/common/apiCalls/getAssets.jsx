import { buildPostCall } from './ApiCallBuilder';


export default function getAssets(size=null){
    return buildPostCall(`${process.env.REACT_APP_BACKEND_ASSETS}-get`, '', (size? `size=${size}`: ''), true)
    .then(result =>{
        console.log(`Assets loaded ${(result?.items? result.items.length : result?.length)}`)
        return result
    })
    .catch(e => console.log("Error loading assets: " + e))
}
