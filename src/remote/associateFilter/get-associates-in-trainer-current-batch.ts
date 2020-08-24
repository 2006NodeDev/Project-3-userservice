import { getBatchIdByTrainer } from "../batch/get-batch-id-by-trainer"
import { getCurrentBatchesFromTrainerBatches } from "../batch/get-current-batch-from-trainer-batches"
import { getAssociatesByBatchId } from "../associate/get-associates-by-batch-id"
import { Associate } from "../../models/Associate"
import { CurrentBatchNotFoundError } from "../../errors/CurrentBatchNotFoundError"

export const getAssociatesInTrainersCurrentBatch = async (email: string) => {
    try{
        let allBatches = await getBatchIdByTrainer(email)
        let currBatch = await getCurrentBatchesFromTrainerBatches(allBatches)
        let associates:Associate[]
        if(currBatch){
            associates = await getAssociatesByBatchId(currBatch)
        }
        else{
            throw new Error('You Currently Have No Batches')
        }
        return associates
    } catch (e){
        if (e.message === 'You Currently Have No Batches') {
            throw new CurrentBatchNotFoundError
          }
        console.log(e)
        throw(e)
    }
}