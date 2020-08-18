//COMMENTED OUT CODE WHILE WE SOLVE ISSUE WITH BATCHROUTER


/*
import express, { Request, Response, NextFunction } from 'express'
import { getBatchByBatchId } from '../remote/caliber-api/get-batch-by-batch-id';
import { getBatchIdByTrainer } from '../remote/caliber-api/get-batch-id-by-trainer';
import { getCurrentBatches } from '../remote/caliber-api/get-current-batches';
import { getBatchBySkills } from '../remote/caliber-api/get-batch-by-skills';
import { Associate } from '../models/Associate';
import axios from 'axios';

export let batchRouter = express.Router()

// auth middleware goes here
// batchRouter.use(authenticationMiddleware);

batchRouter.get('/:batchId', async (req: Request, res: Response, next: NextFunction) => {
    let { batchId } = req.params;
    try {
        let user = await getBatchByBatchId(batchId)
        res.json(user)
    } catch (e) {
        next(e)
    }
})

batchRouter.get('/:trainerEmail/ids', async (req: Request, res: Response, next: NextFunction) => {
    let { trainerEmail } = req.params;
    try {
        let user = await getBatchIdByTrainer(trainerEmail)
        res.json(user)
    } catch (e) {
        next(e)
    }
})

//gets list of currently active batches w/ details
batchRouter.get('/currentBatches', async (req: Request, res: Response, next: NextFunction) => {
    console.log("we hit the batch router!")
    try {
        let batch = await getCurrentBatches()
        res.json(batch)

    } catch (e) {
        console.log("error in batchRouter get request")
        //console.log(e)
        //next(e)
    }
})




//gets the list of skills being taught by currently active batches
batchRouter.get('/skillSet', async (req: Request, res: Response, next: NextFunction) => {

    try {
        let user = await getBatchBySkills()
        res.json(user)
    } catch (e) {
        next(e)
    }
})


*/