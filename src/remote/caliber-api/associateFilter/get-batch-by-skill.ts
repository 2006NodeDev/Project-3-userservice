import { Associate } from "../../../models/Associate"
import { Batch } from "../../../models/Batch"

export const getBatchBySkill = async (allBatches:Batch[], skill:string)=>{
    let res:Batch[] = []

    for(var a in allBatches){
            
        if (skill === allBatches[a].skill){
           
            res.push(allBatches[a])

        }
     }

     return res

}