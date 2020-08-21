import express, { Request, Response, NextFunction } from 'express'
import { auth0GetUserServiceToken } from './remote/auth0/get-user-service-token'
import { auth0UpdatePassword } from './remote/auth0/patch-password'
import { logger} from './utils/loggers';
import { auth0UpdateRole } from './remote/auth0/patch-role';
import { auth0CreateNewUser, User } from './remote/auth0/new-user';
import { auth0Login } from './remote/auth0/login';
//import { checkJwt } from './middleware/jwt-verification';
// import swaggerUi from 'swagger-ui-express';
// import * as swaggerDocument from './swagger.json';
import { corsFilter } from './middleware/cors-filter';
import { associateRouter } from './routers/associate-router';
// import { batchRouter } from './routers/batch-router';


const app = express()

// const jwtAuthz = require('express-jwt-authz');

app.use(express.json())
app.use(corsFilter)

//health check! for load balancer and build
app.get('/health', (req: Request, res: Response) => {
    res.sendStatus(200)
})

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

app.post('/register' , async (req:Request, res: Response, next: NextFunction) => {
    let {email, password, user_metadata:{preferredName, lastName}} = req.body  
    if(!email || !password ){
        throw new Error('Please fill out all necessary fields')
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
})


app.use(corsFilter)


// app.use('/batches', batchRouter);
app.use('/associates', associateRouter);

app.use((err, req, res, next) => {
    if (err.statusCode){
        res.status(err.statusCode).send(err.message)
    }else{
        console.log(err)
        res.status(500).send('Something Went Wrong')

    }
})

app.listen(2006, () =>{
    auth0GetUserServiceToken()
    // app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    logger.info('Server has started!')
} )

