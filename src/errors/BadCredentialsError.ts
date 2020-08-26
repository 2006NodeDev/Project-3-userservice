import { HttpError } from "./HTTPError";


export class BadCredentialsError extends HttpError {
    constructor() {
        super(400, 'Please Include a Username and Password')
    }
}