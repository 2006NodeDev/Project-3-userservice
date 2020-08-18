import express, { Request, Response, NextFunction } from 'express'
import { auth0GetUserServiceToken } from './remote/auth0/get-user-service-token'
import { auth0UpdatePassword } from './remote/auth0/patch-password'
<<<<<<< HEAD
import { logger, errorLogger } from './util/loggers';
=======
import { logger } from './util/loggers';
<<<<<<< HEAD
import { auth0Login } from './remote/auth0/login';
=======
import { auth0UpdateRole } from './remote/auth0/patch-role';
>>>>>>> 9559092f16f6e0deabe723364cda9b1016fc01e0
>>>>>>> 6eec4ec05673db02cf81f82ef961b71ef3627a4d

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

<<<<<<< HEAD
=======
app.patch('/updateRole', (req:Request, res:Response, next:NextFunction) => {
    let { userId, role } = req.body;
    try {
        let update = auth0UpdateRole(userId, role);
        res.json(update);
    } catch (error) {
        logger.error(error);
    }
})
>>>>>>> 9559092f16f6e0deabe723364cda9b1016fc01e0

app.listen(2006, () =>{
    auth0GetUserServiceToken()
    logger.info('Server has started!')
} )