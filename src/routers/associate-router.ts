import express, { Request, Response, NextFunction} from 'express'
import { getAssociatesByBatchId } from '../remote/caliber-api/get-associates-by-batch-id';
import { getAllAssociates } from '../remote/caliber-api/get-all-associates';

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
associateRouter.get('/', async (req:Request, res:Response, next:NextFunction) => {
    let {batchId} = req.params;
    try{
        let user = await getAllAssociates()
        res.json(user)
    } catch (e){
        next(e)
    }
})
//getBatchIdsByTrainer
//As a Trainer, I should be able to view the profiles of all 
//Associates across all my batches so that I can best accommodate
//the preferences of my Associates. 
associateRouter.get('',async (req:Request, res:Response, next:NextFunction) =>{



})



// app.get('/', async ()=>{
//     let apiData = await getAssociatesByBatchId("TR-1077")
//     console.log(apiData)
// })