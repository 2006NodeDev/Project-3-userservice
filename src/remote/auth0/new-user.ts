import { auth0BaseClient } from "."
import { logger, errorLogger } from "../../util/loggers"



export class User {
    email:string; 
    password:string;
    user_metadata!: {preferredName: string, lastName: string};
    constructor(email:string, password:string, user_metadata: any){
        this.email = email
        this.password = password
        this.user_metadata.preferredName = user_metadata.preferredName
        this.user_metadata.lastName = user_metadata.lastName
    }
}


export async function auth0CreateNewUser(newUser:User){
    try {
        let body = {
            email: newUser.email,
            email_verified: false,
            connection: "Username-Password-Authentication",
            password: newUser.password,
            user_metadata: newUser.user_metadata,
            app_metadata:{
                role: {
                  role: "Associate",
                  role_id: "rol_CYmNl4fBaIKxFT8Y"
                }
            },
            //{newUser.app_metadata.preferredName, newUser.user_metadata.preferredName},
            verify_email: true, 
         
        }
        
        let res = await auth0BaseClient.post('/api/v2/users', body)
        await auth0BaseClient.post(`/api/v2/users/${res.data.user_id}/roles`, {
            roles : [
                'rol_CYmNl4fBaIKxFT8Y' 
            ]
        })
        
        return res.data.user_id
    } catch (e) {
        logger.debug(e)
        errorLogger.error(e)
        let error: any = new Error (e.message)
        error.status = e.status
        throw error     
    }
}