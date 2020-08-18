import express, { Request, Response, NextFunction } from 'express'
import { getAssociatesByBatchId } from '../remote/caliber-api/get-associates-by-batch-id';
import { getAllAssociates } from '../remote/caliber-api/get-all-associates';
import { getCurrentBatches } from '../remote/caliber-api/get-current-batches';
// import { getAssociateswithFilter } from '../remote/caliber-api/get-associates-filter-skill';
import { authorizationMiddleware } from '../middleware/authorization';
import { getSkillsList } from '../remote/caliber-api/get-skills-list';
import { getBatchIdByTrainer } from '../remote/caliber-api/get-batch-id-by-trainer';
import { getBatchByBatchId } from '../remote/caliber-api/get-batch-by-batch-id';
import { getAssociatesWithYear } from '../remote/caliber-api/associateFilter/get-associate-filter-year';
import { getAssociateswithQuarter } from '../remote/caliber-api/associateFilter/get-associate-filter-quarter';
import { getAssocBySkill } from '../remote/caliber-api/associateFilter/get-associates-filter-skill';

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

associateRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let user = await getAllAssociates()
        res.json(user)
        console.log("return length = " + user.length)
        console.log(user[0].email)

    } catch (e) {
        next(e)
    }
})


//getBatchIdsByTrainer
//As a Trainer, I should be able to view the profiles of all 
//Associates across all my batches so that I can best accommodate
//the preferences of my Associates. 
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



associateRouter.get('/skill/:skillname', async (req: Request, res: Response, next: NextFunction) => {
    let  skillName = req.params.skillname
    try {
        let assocBySkill = await getAssocBySkill(skillName)
        res.json(assocBySkill)
    } catch (e) {
        console.log(e)
        next(e)
    }
})

associateRouter.get('/year/:yearValue', async (req: Request, res: Response, next: NextFunction) => {
    let  year = req.params.yearValue
    try {
        let assocByYear = await getAssociatesWithYear(year)
        console.log(assocByYear)
        res.json(assocByYear)
    } catch (e) {
        console.log(e)
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


//gets the list of skills being taught by currently active batches
associateRouter.get('/batch/skills', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let user = await getSkillsList()
        res.json(user)
    } catch (e) {
        next(e)
    }
})