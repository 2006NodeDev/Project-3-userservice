import { logger, errorLogger } from "../../util/loggers";
import { auth0BaseClient } from ".";
import { UserNotFoundError } from "../../errors/UserNotFoundError";
require('dotenv').config()
/*
 * This function gets the Auth0 User Token at login.
 * The request body contains the specific properties of
 * our Auth0 API. The response returns an access
 * token for a user in Auth0.
 * Env variables should be stored in a .env file inside 
 * of the project folder.
 */
export async function auth0Login(username:string, password:string) {
    try {
        let body = {
            client_id: process.env['AUTH0_CLIENT_ID'],
            client_secret: process.env['AUTH0_CLIENT_SECRET'],
            audience: 'http://companion.revature.net',
            grant_type: 'password',
            username,
            password,
            scope: "openid"
        }
        let res = await auth0BaseClient.post('/oauth/token', body)
        // logger.debug(res.data)
        return res.data
    } catch(e) {
        if(e.message == 'Request failed with status code 403') {
            throw new UserNotFoundError()
        }
        errorLogger.error(e)
        logger.error(e)
    }
}