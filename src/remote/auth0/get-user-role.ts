// import axios from 'axios';
// import { logger } from "../../util/loggers";
// import { auth0BaseClient } from '.';
// import { Auth0User } from './patch-role';


// export async function auth0GetRole(id:number){

//     try {
//         let result = await auth0BaseClient.get(`/api/v2/users/${id}/roles`);
//         logger.debug(result.data);
//         let user:Auth0User = result.data[0]
//         logger.debug(user)
//         return user.name
        
//     } catch (error) {
//         logger.error(error);
//         throw new Error(error);
//     }
// }
