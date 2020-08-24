import { auth0BaseClient } from ".";
import { logger } from "../../utils/loggers";

export async function auth0GetUserByEmail(email:string):Promise<any>{

    try {
        let result = await auth0BaseClient.get(`/api/v2/users-by-email?email=${email}`);
        logger.debug(result.data[0])
        if(result.data[0]){
            logger.debug(`User ID: ${result.data[0].identities[0].user_id}`)
            return result.data[0].identities[0].user_id
        }
        else{
            return 'None'
        }
        
    } catch (error) {
        logger.error(error);
        throw new Error(error);
    }
}