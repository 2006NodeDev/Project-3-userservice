import axios from 'axios';

let baseURL = 'https://revature-net.us.auth0.com';
let userServiceJWT:any;

/*
 * This functions sets the Auth0 Base Client,
 * our connection to the Auth0 API.
 */
export const auth0BaseClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
})
/*
 * This function updates user token for each user.
 */
export function updateUserServiceJWT(newToken:string) {
    userServiceJWT = newToken
}

/*
 * This function modifies every request that goes out from this client,
 * so that if we are not sending a request to get a new token, we add
 * on our Authorization token, then return the config after our modifications.
 */
auth0BaseClient.interceptors.request.use((config) => {
    if(config.url != '/oauth/token') {
        config.headers.Authorization = `Bearer ${userServiceJWT}`
    }
    return config
})