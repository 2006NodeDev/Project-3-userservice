import { getBatchIdByTrainer } from "../batch/get-batch-id-by-trainer"
import { getCurrentBatchesFromTrainerBatches } from "../batch/get-current-batch-from-trainer-batches"
import { getAssociatesByBatchId } from "../associate/get-associates-by-batch-id"

export const getAssociatesInTrainersCurrentBatch = async (email: string) => {
    try{
        let allBatches = await getBatchIdByTrainer(email)
        let currBatch = await getCurrentBatchesFromTrainerBatches(allBatches) 
        let associates = await getAssociatesByBatchId(currBatch)
        return associates
    } catch (e){
        console.log(e)
        throw(e)
    }
}