import { Batch } from "../../models/Batch"
import { getBatchByBatchId } from "./get-batch-by-batch-id"

export const getCurrentBatchesFromTrainerBatches = async (allBatches:string[])=>{
    let res:string
    let batch:Batch 
    let batchEnd

    for(var i in allBatches){
        batch = await getBatchByBatchId(allBatches[i])
        batchEnd = new Date(batch.endDate)
        if(batchEnd >= Date.now()){
            res = batch.batchId
            console.log(res)
        }
     }
     return res
}