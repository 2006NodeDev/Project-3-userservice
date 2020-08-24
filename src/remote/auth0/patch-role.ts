// import axios from 'axios';
import { logger } from "../../utils/loggers";
import { auth0BaseClient } from '.';
// import { auth0GetRole } from './get-user-role';

// export class Auth0User{
//     id!:string
//     name!:string
//     description!:string
//     sources!:any[]
// }



export async function auth0UpdateRole(id:number, role:string){
    //delete previous role and update to new role
    //const currentUserRole = await auth0GetRole(12345)       //currentUser Id
    // if(currentUserRole!="Admin"){
    //     throw new Error('Unauthorized')
    // }

    const associateRoleId = "rol_CYmNl4fBaIKxFT8Y"
    const trainerRoleId = "rol_N4hP8nXeE5QgxYHf"
    const adminRoleId = "rol_feLElhAtqbyRRgeq"
    let roleId:string = ''
    switch (role) {
    case 'Associate':
        roleId = associateRoleId;
        break;
    case 'Trainer':
        roleId = trainerRoleId;
        break;
    case 'Admin':
        roleId = adminRoleId;
        break;
    default:
        logger.error(`No matching role found`);
    }
    try {
        const body1={
            data: {"roles": [associateRoleId, trainerRoleId, adminRoleId]}
        }
        await auth0BaseClient.delete(`/api/v2/users/${id}/roles`, body1);    //weired

        let body2 = {
            "roles": [roleId]
        };
        let result = await auth0BaseClient.post(`/api/v2/users/${id}/roles`, body2);
        logger.debug(body2);

        let bodyMetadata = {
            app_metadata: {
                role: {
                  role: role,
                  role_id: roleId
                }
              }
        }
        await auth0BaseClient.patch(`/api/v2/users/${id}`, bodyMetadata);

        return result
        
    } catch (error) {
        logger.error(error);
        throw new Error(error);
    }
}


// var request = require("request");

// var options = {
//   method: 'POST',
//   url: 'https://YOUR_DOMAIN/api/v2/users/USER_ID/roles',
//   headers: {
//     'content-type': 'application/json',
//     authorization: 'Bearer MGMT_API_ACCESS_TOKEN',
//     'cache-control': 'no-cache'
//   },
//   body: {roles: ['ROLE_ID', 'ROLE_ID']},
//   json: true
// };

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   console.log(body);
// });