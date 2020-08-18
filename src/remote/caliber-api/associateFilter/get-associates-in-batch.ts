import { Batch } from "../../../models/Batch";
import { Associate } from "../../../models/Associate";

export const getAssocInBatch = async (batchList:Batch[])=>{
    let getAssocInBatch: Associate[] = []

    for (var i in batchList){
        for(var j in batchList[i].associateAssignments)
        getAssocInBatch.push(batchList[i].associateAssignments[j].associate)
    }

    // console.log(assocArrayinSkillBatch)
    return getAssocInBatch

}