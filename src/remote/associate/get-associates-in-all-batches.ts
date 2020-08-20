import { Associate } from "../../models/Associate"
import { Batch } from "../../models/Batch"
import { getAssociatesByBatchId } from "./get-associates-by-batch-id"

export const getAssocInAllBatches = async (batchList:Batch[])=>{
    let getAssocInBatch: Associate[] = []

    // for (var i in batchList){
    //     for(var j in batchList[i].associateAssignments)
    //     getAssocInBatch.push(batchList[i].associateAssignments[j].associate)
    // }

    for (var i in batchList){
        // for(var j in batchList[i].associateAssignments)
        // associates = await getAssociatesByBatchId(batchList[i])
        getAssocInBatch = getAssocInBatch.concat(await getAssociatesByBatchId(batchList[i].batchId))
    }

    // console.log(assocArrayinSkillBatch)
    return getAssocInBatch

}