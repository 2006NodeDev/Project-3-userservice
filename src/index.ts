import express, { Request, Response, NextFunction } from 'express'
import { auth0GetUserServiceToken } from './remote/auth0/get-user-service-token'
import { auth0UpdatePassword } from './remote/auth0/patch-password'
import { logger } from './util/loggers';
import { auth0UpdateRole } from './remote/auth0/patch-role';

const app = express()

app.use(express.json())

// const basePath = process.env['AC_BASE_PATH'] || ''

app.patch('/updatePassword', (req:Request, res:Response, next:NextFunction) => {
    let { userId, password } = req.body;
    try {
        let update = auth0UpdatePassword(userId, password);
        res.json(update);
    } catch (error) {
        logger.error(error);
    }
})

app.patch('/updateRole', (req:Request, res:Response, next:NextFunction) => {
    let { userId, role } = req.body;
    try {
        let update = auth0UpdateRole(userId, role);
        res.json(update);
    } catch (error) {
        logger.error(error);
    }
})

app.listen(2006, () =>{
    auth0GetUserServiceToken()
    logger.info('Server has started!')
} )