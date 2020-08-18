import { auth0BaseClient } from "."
import { logger, errorLogger } from "../../util/loggers"
import e from "express"




export async function auth0CreateNewUser(newUser: User , password: string){
    try {
        let body = {
            email: newUser.email,
            email_verified: false,
            connection: "Username-Password-Authentication",
            password,
            verify_email: true, 
        }
        
        let res = await auth0BaseClient.post('/api/v2/users', body)
        await auth0BaseClient.post(`/api/v2/users/${res.data.user_user_id}/roles`, {
            roles : [
                'rol_H0U7poZ5OgwKHCsL'  // find out your own version this is from Alec 
            ]
        })
        
        return res.data.user_user_id
    } catch (e) {
        logger.debug(e)
        errorLogger.error(e)
        let error: any = new Error (e.message)
        error.status = e.status
        throw error     
    }
}