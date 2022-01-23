import Auth from '@aws-amplify/auth';

export function getAuthorizationHeader(){
    return Auth.currentSession().then(sessionInfo => {
            return {"headers": {
                "Authorization": `Bearer ${sessionInfo.getIdToken().getJwtToken()}`,
                "x-api-key": process.env.REACT_APP_API_KEY_AWS_LAMBDAS,
                "Content-Type" : "application/json"}
            }
        })
} 
export function getUserAndAuthorizationHeader(){
    return Auth.currentAuthenticatedUser().then(userInfo => {
        return {
            username: userInfo.username, 
            callConfig: {
                headers: {
                    "Authorization": `Bearer ${userInfo.signInUserSession.idToken.jwtToken}`,
                    "x-api-key": process.env.REACT_APP_API_KEY_AWS_LAMBDAS,
                    "Content-Type" : "application/json"}
            }
        }
    })
}
export function buildGetCall(url, parameters, withUsername){
    if(withUsername)
      return getUserAndAuthorizationHeader().then(callInfo =>
          fetch(`${url}?username=${callInfo.username}${parameters && parameters != ''? '&'+parameters : ''}`, callInfo.callConfig)
      ).then(res => {return res.json()})
      .catch(err => console.error(err) || err)
    else return getAuthorizationHeader().then(headers =>
        fetch(`${url}?${parameters}`, {...headers})
      ).then(res => {return res.json()})
      .catch(err => console.error(err) || err)
}

export function buildPostCall(url, jsonBody = "", parameters = '', withUsername = false){
    if(withUsername)
        return getUserAndAuthorizationHeader()
        .then(callInfo => {
            const requestOptions = {
                ...callInfo.callConfig,
                method: 'POST',
                body: JSON.stringify(jsonBody)
            };
            return fetch(`${url}/${callInfo.username}${parameters && parameters != ''? '?'+parameters : ''}`, requestOptions)
        }).then(res => res.json())
    else 
        return getAuthorizationHeader().then(headers => {
            const requestOptions = {
                ...headers,
                method: 'POST',
                body: JSON.stringify(jsonBody)
            };
            return fetch(url + (parameters && parameters != ''? '?'+parameters : ''), requestOptions)
        }).then(res => res.json())
}