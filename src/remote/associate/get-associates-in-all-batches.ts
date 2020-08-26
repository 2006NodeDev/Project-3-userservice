import { Associate } from "../../models/Associate"
import { Batch } from "../../models/Batch"
import { getAssociatesByBatchId } from "./get-associates-by-batch-id"

export const getAssocInAllBatches = async (batchList:Batch[])=>{
    let getAssocInBatch: Associate[] = []

    for (var i in batchList){
        getAssocInBatch = getAssocInBatch.concat(await getAssociatesByBatchId(batchList[i].batchId))
    }
    return getAssocInBatch

}