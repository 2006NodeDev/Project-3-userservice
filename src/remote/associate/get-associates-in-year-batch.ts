import { Batch } from "../../models/Batch";
import { Associate } from "../../models/Associate";

export const getAssocInYearBatch = async (yearBatch:Batch[])=>{
    let assocArrayinYearBatch: Associate[] = []

    for (var i in yearBatch){
        for(var j in yearBatch[i].associateAssignments)
            assocArrayinYearBatch.push(yearBatch[i].associateAssignments[j].associate)
    }

    // console.log(assocArrayinYearBatch)
    return assocArrayinYearBatch

}