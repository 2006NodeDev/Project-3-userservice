import express, { Request, Response, NextFunction } from 'express'
import { auth0GetUserServiceToken } from './remote/auth0/get-user-service-token'
import { auth0UpdatePassword } from './remote/auth0/patch-password'
import { logger} from './util/loggers';
import { auth0UpdateRole } from './remote/auth0/patch-role';
import { auth0CreateNewUser, User } from './remote/auth0/new-user';
import { auth0Login } from './remote/auth0/login';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';
import bodyParser from 'body-parser';
import { corsFilter } from './middleware/cors-filter';
// import { checkJwt } from './middleware/jwt-verification';
import jwt_decode from "jwt-decode";
import { auth0GetRole } from "./remote/auth0/get-user-role";
import { userConverter } from './util/userConverter';
import { roleConverter } from './util/roleConverter';
import { associateRouter } from './routers/associate-router';
import { getEmails } from './service/verifyEmail';
import { auth0GetUserByEmail } from './remote/auth0/get-user-email';
// import { batchRouter } from './routers/batch-router';


const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.json())
app.use(corsFilter)

// const basePath = process.env['AC_BASE_PATH'] || ''

//For a route that needs authentication: include 'checkJwt' in the path
//For a route that needs permissions(scopes): include 'checkJwt, jwtAuthz([ 'read:messages' ])' to the path, similar to the roles array we used before


app.post('/login',  async (req:Request, res:Response, next:NextFunction) => {
    let { username } = req.body
    let { password } = req.body

    if (!username || !password) {
        logger.error('Bad Credentials')
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
            logger.error(e)
        }
    }
})

// app.use(checkJwt);

app.get('/getRole/:id', async (req:Request, res:Response, next:NextFunction) =>{
    try {
        let { id } = req.params
        let result = await auth0GetRole(id)
        let role = roleConverter(result)
        res.json(role)
    } catch (error) {
        logger.error(error)
    }
})

app.patch('/updatePassword', (req:Request, res:Response, next:NextFunction) => {
    let { userId, password } = req.body;
    try {
        let update = auth0UpdatePassword(userId, password);
        res.json(update);
    } catch (error) {
        logger.error('unable to update password')
        logger.error(error);
    }
})

app.patch('/updateRole', (req:Request, res:Response, next:NextFunction) => {
    let { currentUserId, email, role } = req.body;
    try {
        let update = auth0UpdateRole(currentUserId, email, role);
        res.json(update);
    } catch (error) {
        logger.error(error);
    }
})

app.post('/register' , async (req:Request, res: Response, next: NextFunction) => {
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
    }
})


app.use(corsFilter)


// app.use('/batches', batchRouter);
app.use('/associates', associateRouter);

// app.use((err, req, res, next) => {
//     if (err.statusCode){
//         res.status(err.statusCode).send(err.message)
//     }else{
//         console.log(err)
//         res.status(500).send('Something Went Wrong')

//     }
// })

app.listen(2006, () =>{
    auth0GetUserServiceToken()
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    logger.info('Server has started!')
} )
