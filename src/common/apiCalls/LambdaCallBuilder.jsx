import Auth from '@aws-amplify/auth';

export function getAuthorizationHeader(){
    return Auth.currentSession().then(sessionInfo => {
            return {"headers": {
                "Authorization": `Bearer ${sessionInfo.getIdToken().getJwtToken()}`,
                "x-api-key": process.env.REACT_APP_API_KEY_AWS}
            }
        })
} 

export function buildPostCall(url, jsonBody = ""){
    return getAuthorizationHeader().then(headers => {
        const requestOptions = {
            ...headers,
            method: 'POST',
            body: JSON.stringify(jsonBody)
        };
        return fetch(url, requestOptions).then(res => res.json())
    })
}