import { Batch } from "../../../models/Batch";
import { Associate } from "../../../models/Associate";

export const getAssocInSkillBatch = async (skillBatch:Batch[])=>{
    let assocArrayinSkillBatch: Associate[] = []

    for (var i in skillBatch){
        for(var j in skillBatch[i].associateAssignments)
            assocArrayinSkillBatch.push(skillBatch[i].associateAssignments[j].associate)
    }

    // console.log(assocArrayinSkillBatch)
    return assocArrayinSkillBatch

}