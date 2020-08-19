import { auth0BaseClient } from "."
import { logger, errorLogger } from "../../util/loggers"


//objectname = { email:email@whatever.com, password:myPassword }
export class User {
    email:string; 
    password:string; 
    preferredName:string; 
    lastName: string;
    constructor(email:string, password:string, preferredName: string, lastName: string){
        this.email = email
        this.password = password
        this.preferredName = preferredName
        this.lastName = lastName
    }
}

export async function auth0CreateNewUser(newUser: User){
    try {
        let body = {
            email: newUser.email,
            email_verified: false,
            connection: "Username-Password-Authentication",
            password: newUser.password,
            preferredName:newUser.preferredName,
            lastName:newUser.lastName,
            verify_email: true, 
         
        }
        
        let res = await auth0BaseClient.post('/api/v2/users', body)
        await auth0BaseClient.post(`/api/v2/users/${res.data.user_user_id}/roles`, {
            roles : [
                'rol_CYmNl4fBaIKxFT8Y' 
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