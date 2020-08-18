import { Associate } from "../../../models/Associate"
import { getAllAssociates } from "../get-all-associates"
import { getBatchIdByTrainer } from "../get-batch-id-by-trainer"
import { getBatch } from "./get-batches"
import { getAssocInBatch } from "./get-associates-in-batch"


export const getAssociatesByTrainer = async (trainerEmail:string) => {
    
    try{
        let batchIdList= await getBatchIdByTrainer(trainerEmail)
        let batches = await getBatch(batchIdList)        
        let assocBatch = await getAssocInBatch(batches)
        
        return assocBatch   
    }catch (e){
        console.log(e)
        throw(e)

    }
}