import { Associate } from "../../models/Associate"
import { Batch } from "../../models/Batch"
import { getBatchByBatchId } from "./get-batch-by-batch-id"

export const getBatch = async (allBatchIds:string[])=>{
    let res:Batch[] = []
    let batch

    for(var a in allBatchIds){  
       batch = await getBatchByBatchId(allBatchIds[a])
       res.push(batch)
     }
     
     return res

}