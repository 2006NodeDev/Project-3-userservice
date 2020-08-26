import { HttpError } from "./HTTPError";

export class CurrentBatchNotFoundError extends HttpError {
    constructor(){
        super(404, 'Batch Not Found')
    }
}