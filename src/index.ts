import express, { Request, Response, NextFunction } from 'express'
import { auth0GetUserServiceToken } from './remote/auth0/get-user-service-token'

const app = express()

app.use(express.json())

app.listen(2006, () =>{
    auth0GetUserServiceToken()
    console.log('Server has started!')
} )