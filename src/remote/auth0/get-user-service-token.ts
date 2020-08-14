import { auth0BaseClient, updateUserServiceJWT } from ".";

/*
 * This function gets the Auth0 User Service Token.
 * The request body contains the specific properties of
 * our Auth0 application. The response returns an access
 * token for our Auth0 Management API.
 * Env variables should be stored in a .env file inside 
 * of the project folder.
 */
export async function auth0GetUserServiceToken() {
    try {
        let body = {
            client_id: process.env['AUTH0_CLIENT_ID'],
            client_secret: process.env['AUTH0_CLIENT_SECRET'],
            audience: "https://revature-net.us.auth0.com/api/v2/",
            grant_type: "client_credentials"
        }
        let res = await auth0BaseClient.post('/oauth/token', body)
        updateUserServiceJWT(res.data.access_token)
        //console.log(res.data.access_token); //used to test connection to auth, can delete after testing
        
    } catch(e) {
        console.log((e));
        //logger.debug(e)
        //errorLogger.error(e)
        let error:any = new Error(e.message) //could be custom error
        error.status = e.status
        throw error
    }
}