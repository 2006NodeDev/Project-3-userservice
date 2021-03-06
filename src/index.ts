import express, { Request, Response, NextFunction } from 'express'
import { auth0GetUserServiceToken } from './remote/auth0/get-user-service-token'
import { auth0UpdatePassword } from './remote/auth0/patch-password'
import { logger, errorLogger} from './utils/loggers';
import { auth0UpdateRole } from './remote/auth0/patch-role';
import { auth0CreateNewUser, User } from './remote/auth0/new-user';
import { auth0Login } from './remote/auth0/login';
// import swaggerUi from 'swagger-ui-express';
// import * as swaggerDocument from './swagger.json';
import bodyParser from 'body-parser';
import { corsFilter } from './middleware/cors-filter';
// import { checkJwt } from './middleware/jwt-verification';
import jwt_decode from "jwt-decode";
import { auth0GetRole } from "./remote/auth0/get-user-role";
import { userConverter } from './util/userConverter';
import { roleConverter } from './util/roleConverter';
import { associateRouter } from './routers/associate-router';
import { AuthenticationFailureError } from './errors/AuthenticationFailureError';
import { getEmails } from './service/verifyEmail';
// import { auth0GetUserByEmail } from './remote/auth0/get-user-email';
// import { batchRouter } from './routers/batch-router';


const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

// const jwtAuthz = require('express-jwt-authz');


app.use(express.json())

app.use(corsFilter)

const basePath = process.env['BASE_PATH'] || ''
const basePathRouter = express.Router();
app.use(basePath, basePathRouter);
// basePathRouter.use(checkJwt);
basePathRouter.use('/associates', associateRouter);


//health check! for load balancer and build
app.get('/health', (req: Request, res: Response) => {
    res.sendStatus(200)
})

basePathRouter.post('/login',  async (req:Request, res:Response, next:NextFunction) => {
    let { username } = req.body
    let { password } = req.body

    if (!username || !password) {
        next(new AuthenticationFailureError())
    }
    else {
        try {
            let userToken = await auth0Login(username, password)
            res.header('Authorization', `Bearer ${userToken.access_token}`)
            // let user = await auth0GetUser(userToken);
            // logger.debug(`the getUser result: ${user}`);
            logger.debug(userToken.scopes)
            let result = jwt_decode(userToken.id_token)
            logger.debug(result)
            let user = userConverter(result)
            res.json(user)
        } catch (e) {
            next(e)
        }
    }
})

basePathRouter.post('/register' , async (req:Request, res: Response, next: NextFunction) => {
    let {email, password, user_metadata:{preferredName, lastName}} = req.body
    try {
        let verifyEmail = await getEmails(email);
        logger.debug(`Is email in caliber: ${verifyEmail}`)
  
        if(!email || !password ){
            throw new Error('Please fill out all necessary fields')
        }else if (verifyEmail === false){
            throw new Error('You must use an email that is in Caliber.')
        }else {
        
            let newUser: User ={
                email,
                password,
                user_metadata:{preferredName, lastName},
            } 
            newUser.user_metadata.preferredName = newUser.user_metadata.preferredName
            newUser.user_metadata.lastName = newUser.user_metadata.lastName

            try {
                // newUser, password  inside paranthesis
                let register = await auth0CreateNewUser(newUser) 
                res.json(register)
            } catch (error) {
                logger.error(error)
            }
        }
    } catch (error) {
        logger.error(error)
        next(error)
    }
})

basePathRouter.get('/getRole/:id', async (req:Request, res:Response, next:NextFunction) =>{
    try {
        let { id } = req.params
        let result = await auth0GetRole(id)
        let role = roleConverter(result)
        res.json(role)
    } catch (error) {
        logger.error(error)
        next(error)
    }
})

basePathRouter.patch('/updatePassword', (req:Request, res:Response, next:NextFunction) => {
    let { userId, password } = req.body;
    try {
        let update = auth0UpdatePassword(userId, password);
        res.json(update);
    } catch (error) {
        logger.error('unable to update password')
        logger.error(error);
        next(error)
    }
})

basePathRouter.patch('/updateRole', (req:Request, res:Response, next:NextFunction) => {
    let { currentUserId, userId, role } = req.body;
    try {
        let update = auth0UpdateRole(currentUserId, userId, role);
        res.json(update);
    } catch (error) {
        logger.error(error);
        next(error)
    }
})

// basePathRouter.use(corsFilter)


// app.use('/batches', batchRouter);

app.use((err, req, res, next) => {
    if (err.statusCode){
        res.status(err.statusCode).send(err.message)
        logger.error(err)
    }else{
        logger.error(err)
        errorLogger.error(err)
        res.status(500).send('Something Went Wrong')

    }
})

app.listen(2006, () =>{
    auth0GetUserServiceToken()
    // app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    logger.info('Server has started!')
} )

process.on('uncaughtException', err => {
    logger.fatal(`Uncaught Exception: ${err.message} ${err.stack}`)
    errorLogger.fatal(`Uncaught Exception: ${err.message} ${err.stack}`)
    process.exit(1)
})
