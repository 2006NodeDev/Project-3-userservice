import express, { Request, Response, NextFunction} from 'express'
import { getBatchByBatchId } from '../remote/caliber-api/get-batch-by-batch-id';

export let batchRouter = express.Router()

// auth middleware goes here
// batchRouter.use(authenticationMiddleware);

batchRouter.get('/:batchId', async (req:Request, res:Response, next:NextFunction) => {
    let {batchId} = req.params;
    try{
        let user = await getBatchByBatchId(batchId)
        res.json(user)
    } catch (e){
        next(e)
    }
})