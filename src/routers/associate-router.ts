import express, { Request, Response, NextFunction} from 'express'
import { getAssociatesByBatchId } from '../remote/caliber-api/get-associates-by-batch-id';

export let associateRouter = express.Router()

// auth middleware goes here
// associatesRouter.use(authenticationMiddleware);

associateRouter.get('/:batchId', async (req:Request, res:Response, next:NextFunction) => {
    let {batchId} = req.params;
    try{
        let user = await getAssociatesByBatchId(batchId)
        res.json(user)
    } catch (e){
        next(e)
    }
})

// app.get('/', async ()=>{
//     let apiData = await getAssociatesByBatchId("TR-1077")
//     console.log(apiData)
// })