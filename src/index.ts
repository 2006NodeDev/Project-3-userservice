import express, { Request, Response, NextFunction } from 'express'
import { auth0GetUserServiceToken } from './remote/auth0/get-user-service-token'
import { auth0UpdatePassword } from './remote/auth0/patch-password'
import { logger, errorLogger } from './util/loggers';
import { auth0Login } from './remote/auth0/login';
import { auth0UpdateRole } from './remote/auth0/patch-role';
import { checkJwt } from './middleware/jwt-verification';
const app = express()
const jwtAuthz = require('express-jwt-authz');
app.use(express.json())

// const basePath = process.env['AC_BASE_PATH'] || ''

//For a route that needs authentication: include 'checkJwt' in the path
//For a route that needs permissions(scopes): include 'checkJwt, jwtAuthz([ 'read:messages' ])' to the path, similar to the roles array we used before

app.post('/login', async (req:Request, res:Response, next:NextFunction) => {
    let { username } = req.body
    let { password } = req.body

    if (!username || !password) {
        logger.error('Bad Credentials')
    }
    else {
        try {
            let userToken = await auth0Login(username, password)
            res.header('Authorization', `Bearer ${userToken}`)
            res.json(userToken)
        } catch (e) {
            logger.error(e)
        }
    }
})

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