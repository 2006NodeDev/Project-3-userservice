import express, { Request, Response, NextFunction } from 'express'
import { auth0GetUserServiceToken } from './remote/auth0/get-user-service-token'
import { auth0UpdatePassword } from './remote/auth0/patch-password'
import { logger, errorLogger } from './util/loggers';
import { auth0UpdateRole } from './remote/auth0/patch-role';
import { auth0CreateNewUser, User } from './remote/auth0/new-user';
import { auth0Login } from './remote/auth0/login';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';

const app = express()

app.use(express.json())

// const basePath = process.env['AC_BASE_PATH'] || ''

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

app.post('/register' , async (req:Request, res: Response, next: NextFunction) => {
    let {email, password, preferredName, lastName} = req.body  
    if(!email || !password || !preferredName || !lastName){
        throw new Error('Please fill out all necessary fields')
    }else {
    
        let newUser: User ={
            email,
            password,
            preferredName,
            lastName
        } 
        try {
            // newUser, password  inside paranthesis
            let register = await auth0CreateNewUser(newUser) 
            res.json(register)
        } catch (error) {
            logger.error(error)
        }
    }
})


app.listen(2006, () =>{
    auth0GetUserServiceToken()
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    logger.info('Server has started!')
} )