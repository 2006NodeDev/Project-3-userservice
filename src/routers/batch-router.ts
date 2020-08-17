import express, { Request, Response, NextFunction} from 'express'
import { getBatchByBatchId } from '../remote/caliber-api/get-batch-by-batch-id';
import { getBatchIdByTrainer } from '../remote/caliber-api/get-batch-id-by-trainer';
import { getCurrentBatches } from '../remote/caliber-api/get-current-batches';
import { getBatchBySkills } from '../remote/caliber-api/get-batch-by-skills';

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

batchRouter.get('/:trainerEmail/ids', async (req:Request, res:Response, next:NextFunction) => {
    let {trainerEmail} = req.params;
    try{
        let user = await getBatchIdByTrainer(trainerEmail)
        res.json(user)
    } catch (e){
        next(e)
    }
})

batchRouter.get('/current', async (req:Request, res:Response, next:NextFunction) => {
    console.log("HELLOOOOO")

    try{
        let user = await getCurrentBatches()
        var obj = JSON.parse(user);
        console.log(obj)
        res.json(user)
    } catch (e){
        next(e)
    }
})

batchRouter.get('/skills', async (req:Request, res:Response, next:NextFunction) => {

    try{
        let user = await getBatchBySkills()
        res.json(user)
    } catch (e){
        next(e)
    }
})