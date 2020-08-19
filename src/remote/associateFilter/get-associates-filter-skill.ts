import { getAllBatches } from "../batch/get-all-batches"
import { getBatchBySkill } from "../batch/get-batch-by-skill"
import { getAssocInBatch } from "../associate/get-associates-in-batch"

export const getAssocBySkill = async (skill:string) => {
    try{
        let allBatches = await getAllBatches()
        
        let skillBatches = await getBatchBySkill(allBatches, skill)

        let assocInSkillBatches = await getAssocInBatch(skillBatches)

        return assocInSkillBatches


    }catch (e){
        console.log(e)
        throw(e)

    }
}