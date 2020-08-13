import { express } from 'express'

export const associateRouter = express.Router()

associateRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {

    try {
        let allAssociatesInBatch = await getAllAssociatesInBatchService()
        res.json(allAssociatesInBatch)
    } catch (express) {
        next(express)
    }
})
