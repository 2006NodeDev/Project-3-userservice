import { getAllAssociates } from "./get-all-associates"
import { Associate } from "../../models/Associate"

export const getAssociateswithFilter = async (filter:string) => {
    try{
        let allAssoc= await getAllAssociates()

        let res:Associate[] = []


//maybe use a switch statement here instead?

        if(filter === 'Skill'){
            for(const a in allAssoc){
                if(a.skill === 'Skill'){
                    res.concat(a)
                }
                
            }

        }else if (filter === 'Year'){
            for(const a in allAssoc){
                if(a.skill === 'Skill'){
                    res.concat(a)
                }
                
            }

        }else if (filter === 'Quarter'){
            for(const a in allAssoc){
                if(a.skill === 'Skill'){
                    res.concat(a)
                }
                
            }

        }

        

    }catch (e){
        console.log(e)
        throw(e)

    }
}