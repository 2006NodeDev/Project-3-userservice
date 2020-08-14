import { auth0BaseClient } from ".";

/*
 * This function gets the Auth0 User Token.
 * The request body contains the specific properties of
 * our Auth0 API. The response returns an access
 * token for a user in Auth0.
 * Env variables should be stored in a .env file inside 
 * of the project folder.
 */
export async function auth0GetUserToken(username:string, password:string) {
    try {
        let body = {
            client_id: process.env['AUTH0_CLIENT_ID'],
            client_secret: process.env['AUTH0_CLIENT_SECRET'],
            audience: "http://companion.revature.net",
            grant_type: "password",
            username,
            password
        }
        let res = await auth0BaseClient.post('/oauth/token', body)
        console.log(res.data.access_token);
        //logger.debug(res.data.access_token)
        return res.data.access_token
        
    } catch (e) {
        console.log(e);
        console.log(e.status);
        //logger.debug(e)
        //errorLogger.error(e)
        //logger.info(e.status)
        let error:any = new Error(e.message) //could be custom error
        error.status = e.status
        throw error
    }
}