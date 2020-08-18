import { HttpError } from "./HTTPError";

export class AssociateNotFoundError extends HttpError {
    constructor(){
        super(404, 'Associate Not Found')
    }
}