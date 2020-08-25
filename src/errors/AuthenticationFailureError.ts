import { HttpError } from "./HTTPError";


export class AuthenticationFailureError extends HttpError {
    constructor() {
        super(400, 'Invalid Credentials')
    }
}