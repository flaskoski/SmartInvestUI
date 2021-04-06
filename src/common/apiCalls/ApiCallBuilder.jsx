import Auth from '@aws-amplify/auth';

export function getAuthorizationHeader(isLambdaCall = true){
    return Auth.currentSession().then(sessionInfo => {
            return {"headers": {
                "Authorization": `Bearer ${sessionInfo.getIdToken().getJwtToken()}`,
                "x-api-key": (isLambdaCall? process.env.REACT_APP_API_KEY_AWS_LAMBDAS: process.env.REACT_APP_API_KEY_AWS_TRANSACTIONS),
                "Content-Type" : "application/json"}
            }
        })
} 
export function getUserAndAuthorizationHeader(isLambdaCall = true){
    return Auth.currentAuthenticatedUser().then(userInfo => {
        return {
            username: userInfo.username, 
            callConfig: {
                headers: {
                    "Authorization": `Bearer ${userInfo.signInUserSession.idToken.jwtToken}`,
                    "x-api-key": (isLambdaCall? process.env.REACT_APP_API_KEY_AWS_LAMBDAS: process.env.REACT_APP_API_KEY_AWS_TRANSACTIONS),
                    "Content-Type" : "application/json"}
            }
        }
    })
}
export function buildGetCall(url, parameters, withUsername, isLambdaCall){
    if(withUsername)
        return getUserAndAuthorizationHeader(isLambdaCall).then(callInfo =>
            fetch(`${url}?username=${callInfo.username}${parameters && parameters != ''? '&'+parameters : ''}`, callInfo.callConfig)
        ).then(res => {return res.json()})
        .then((page) => {
            if(page && (page.content || page.length))
                return page
            else throw new Error(page.message)
        })
    else return getAuthorizationHeader(isLambdaCall).then(headers =>
        fetch(`${url}?${parameters}`, {...headers})
    ).then(res => {return res.json()})
    .then(page => {
        if(page && (page.content || page.length))
            return page
        else throw new Error(page.message)
    })
}

export function buildPostCall(url, jsonBody = "", parameters = '', withUsername = false, isLambdaCall = true){
    if(withUsername)
        return getUserAndAuthorizationHeader(isLambdaCall)
        .then(callInfo => {
            const requestOptions = {
                ...callInfo.callConfig,
                method: 'POST',
                body: JSON.stringify(jsonBody)
            };
            return fetch(`${url}?username=${callInfo.username}${parameters && parameters != ''? '&'+parameters : ''}`, requestOptions)
        }).then(res => res.json())
    else 
        return getAuthorizationHeader(isLambdaCall).then(headers => {
            const requestOptions = {
                ...headers,
                method: 'POST',
                body: JSON.stringify(jsonBody)
            };
            return fetch(url + (parameters && parameters != ''? '?'+parameters : ''), requestOptions)
        }).then(res => res.json())
}