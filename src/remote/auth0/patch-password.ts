import axios from 'axios';
import { logger } from "../../util/loggers";
import { auth0BaseClient } from '.';


export async function auth0UpdatePassword(id:number, password:string){
    try {

        let body = {
            password: password, 
            connection: 'Username-Password-Authentication'
        };

        let result = await auth0BaseClient.patch(`/api/v2/users/${id}`, body);
        logger.debug(body);
        return result
        
    } catch (error) {
        logger.error(error);
        throw new Error(error);
    }
}

// let options = {
//   method: 'PATCH',
//   url: 'https://YOUR_DOMAIN/api/v2/users/USER_ID',
//   headers: {'content-type': 'application/json'},
//   body: {password: 'NEW_PASSWORD', connection: 'Username-Password-Authentication'},
//   json: true
// };

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   console.log(body);
// });