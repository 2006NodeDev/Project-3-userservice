import express, { Request, Response, NextFunction} from 'express'
import { getAssociatesByBatchId } from '../remote/caliber-api/get-associates-by-batch-id';
import { getAllAssociates } from '../remote/caliber-api/get-all-associates';
import { getCurrentBatches } from '../remote/caliber-api/get-current-batches';
// import { getAssociateswithFilter } from '../remote/caliber-api/get-associates-filter-skill';
import { authorizationMiddleware } from '../middleware/authorization';

export let associateRouter = express.Router()
export let batchRouter = express.Router()

// auth middleware goes here
// associatesRouter.use(authenticationMiddleware);

// associateRouter.get('/:batchId', async (req:Request, res:Response, next:NextFunction) => {
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

associateRouter.get('/test', async (req:Request, res:Response, next:NextFunction) => {
    try{
        let user = await getAllAssociates()
        res.json(user)
        console.log("successful test assoc")
       
        
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



// associateRouter.get('/:skill', authorizationMiddleware(["Admin"], true), async (req: Request, res: Response, next: NextFunction) => {
//     const {skill} = req.params



//     try {
//         let batch = await getAssociateswithFilter(skill)
//         res.json(batch)

//     } catch (e) {
//         console.log(e)
//         next(e)
//     }
// })

// app.get('/', async ()=>{
//     let apiData = await getAssociatesByBatchId("TR-1077")
//     console.log(apiData)
// })