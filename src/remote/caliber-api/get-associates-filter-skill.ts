import { getAllAssociates } from "./get-all-associates"
import { Associate } from "../../models/Associate"
import { getSkillsList } from "./get-skills-list"
import { getCurrentBatches } from "./get-current-batches"

export const getAssocBySkill = async (skill:string) => {
    try{
        let allBatches = await getCurrentBatches()
        let currentSkills = await getSkillsList()
        
        
        let res:Associate[] = []


       

        

    }catch (e){
        console.log(e)
        throw(e)

    }
}