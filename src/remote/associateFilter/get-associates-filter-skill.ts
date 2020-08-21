import { getAllBatches } from "../batch/get-all-batches"
import { getBatchBySkill } from "../batch/get-batch-by-skill"
import { getAssocInAllBatches } from "../associate/get-associates-in-all-batches"

export const getAssocBySkill = async (skill:string) => {
    try{
        let allBatches = await getAllBatches()
        let skillBatches = await getBatchBySkill(allBatches, skill)
        let assocInSkillBatches = await getAssocInAllBatches(skillBatches)
        return assocInSkillBatches
    } catch (e){
        console.log(e)
        throw(e)

    }
}