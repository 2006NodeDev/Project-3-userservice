import { HttpError } from "./HTTPError";

export class BatchNotFoundError extends HttpError {
    constructor(){
        super(404, 'Batch Not Found')
    }
}