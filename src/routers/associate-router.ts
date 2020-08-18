import express, { Request, Response, NextFunction} from 'express'
import { getAssociatesByBatchId } from '../remote/caliber-api/get-associates-by-batch-id';
import { getAllAssociates } from '../remote/caliber-api/get-all-associates';
import { getCurrentBatches } from '../remote/caliber-api/get-current-batches';
// import { getAssociateswithFilter } from '../remote/caliber-api/get-associates-filter-skill';
import { authorizationMiddleware } from '../middleware/authorization';
import { getBatchBySkills } from '../remote/caliber-api/get-batch-by-skills';
import { getBatchIdByTrainer } from '../remote/caliber-api/get-batch-id-by-trainer';
import { getBatchByBatchId } from '../remote/caliber-api/get-batch-by-batch-id';

export let associateRouter = express.Router()
export let batchRouter = express.Router()

// auth middleware goes here
// associatesRouter.use(authenticationMiddleware);

// associateRouter.get('/batches/:batchId', async (req:Request, res:Response, next:NextFunction) => {
//     let {batchId} = req.params;
//     try{
//         let user = await getAssociatesByBatchId(batchId)
//         res.json(user)
//     } catch (e){
//         next(e)
//     }
// })

associateRouter.get('/', async (req:Request, res:Response, next:NextFunction) => {
    try{
        let user = await getAllAssociates()
        res.json(user)
        console.log("return length = " + user.length)
        console.log(user[0].email)

    } catch (e){
        next(e)
    }
})


// get associates by batch id
associateRouter.get('/:batchId', async (req:Request, res:Response, next:NextFunction) => {
    let {batchId} = req.params;
    try{
        let user = await getAssociatesByBatchId(batchId)
        res.json(user)

    } catch (e){
        next(e)
    }
})


associateRouter.get('/currentBatches', async (req: Request, res: Response, next: NextFunction) => {
    console.log("we hit the batch router!")
    try {
        let batch = await getCurrentBatches()
        res.json(batch)

    } catch (e) {
        console.log(e)
        next(e)
    }
})

associateRouter.get('/batches/:batchId', async (req: Request, res: Response, next: NextFunction) => {
    let { batchId } = req.params;
    try {
        let user = await getBatchByBatchId(batchId)
        res.json(user)
    } catch (e) {
        next(e)
    }
})

associateRouter.get('/:trainerEmail/ids', async (req: Request, res: Response, next: NextFunction) => {
    let { trainerEmail } = req.params;
    try {
        let user = await getBatchIdByTrainer(trainerEmail)
        res.json(user)
    } catch (e) {
        next(e)
    }
})

//gets list of currently active batches w/ details
associateRouter.get('/currentBatches', async (req: Request, res: Response, next: NextFunction) => {
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
associateRouter.get('/batch/skills', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let user = await getBatchBySkills()
        res.json(user)
    } catch (e) {
        next(e)
    }
})