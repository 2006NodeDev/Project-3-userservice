import express, { Request, Response, NextFunction} from 'express'
import { getAssociatesByBatchId } from '../remote/caliber-api/get-associates-by-batch-id';
import { getAllAssociates } from '../remote/caliber-api/get-all-associates';
import { getCurrentBatches } from '../remote/caliber-api/get-current-batches';

export let associateRouter = express.Router()

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
    console.log("send help")
    try{
        let user = await getAllAssociates()

        res.json(user)
    } catch (e){
        next(e)
    }
})

associateRouter.get('/test', async (req:Request, res:Response, next:NextFunction) => {
    console.log("HELLOOOOO")
    try{
        let user = await getCurrentBatches()
        console.log(res.json(user))
        // var obj = JSON.parse(user);
        // console.log(obj)
       
        
    } catch (e){
        next(e)
    }
})

// app.get('/', async ()=>{
//     let apiData = await getAssociatesByBatchId("TR-1077")
//     console.log(apiData)
// })