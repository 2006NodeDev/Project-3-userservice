import { getAssocInBatch } from "./get-associates-in-batch"
import { getBatchIdByTrainer } from "../batch/get-batch-id-by-trainer"
import { getBatch } from "../batch/get-batches"


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