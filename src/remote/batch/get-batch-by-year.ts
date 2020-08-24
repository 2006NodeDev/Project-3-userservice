// import { Associate } from "../../models/Associate"
import { Batch } from "../../models/Batch"

export const getBatchByYear = async (allBatches:Batch[], year:string)=>{
    let res:Batch[] = []

    for(var a in allBatches){
        let batchDate = allBatches[a].endDate.split("-")
        let batchYear = batchDate[0]

        if (batchYear === year){
            res.push(allBatches[a])
        }
     }
     // console.log(res)
     return res

}