import { getAllAssociates } from "../get-all-associates"
import { Associate } from "../../../models/Associate"
import { getSkillsList } from "../get-skills-list"
import { getCurrentBatches } from "../get-current-batches"
import { getAllBatches } from "../get-all-batches"
import { getBatchBySkill } from "./get-batch-by-skill"
import { Batch } from "../../../models/Batch"
import { getAssocInBatch } from "./get-associates-in-batch"

export const getAssocBySkill = async (skill:string) => {
    try{
        let allBatches = await getAllBatches()
        
        let skillBatches = await getBatchBySkill(allBatches, skill)

        let assocInSkillBatches = await getAssocInBatch(skillBatches)

        return assocInSkillBatches


        // console.log("res array:" + res)

        // let currentSkills = await getSkillsList()
        
        

    }catch (e){
        console.log(e)
        throw(e)

    }
}