import { Response, NextFunction } from "express";
import { logger } from "../loggers";


export function authorizationMiddleware(roles:string[], currentAssoc: Boolean){ 

    return (req: any, res:Response, next:NextFunction) =>{
        let allowed = false
            
        for (const role of roles){//to allow a given role
            if (req.associate.role === role){
                allowed =true
                logger.debug(`role: ${role}, input role:${req.associate.role}`);
            }
        }
        if (currentAssoc){  //if we are checking for current user
            let id = +req.params.associateId //get the id from path
            if (!isNaN(id)){
                if (req.associate.associateId == id) { //watch for type coersion
                    allowed = true
                }
            }
        }
        if (allowed) { //have to wait to make sure both conditions are checked
            next() 
        } else { 
             //if they don't have a matching role or the right id, kick them out
             res.status(403).send("You have insufficient permissions for this endpoint!")
        }

    }

}

