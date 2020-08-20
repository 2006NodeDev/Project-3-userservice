// import { Associate } from "../../models/Associate"
// import { getAllAssociates } from "../associate/get-all-associates"
import { getAllBatchesByQuarter } from "../batch/get-all-batches-by-quarter"
import { getAssocInBatch } from "../associate/get-associates-in-batch"

export const getAssociateswithQuarter = async (quarter:string) => {
    try{
        let quarterBatches = await getAllBatchesByQuarter(+quarter)
        let assocInQuarterBatches = await getAssocInBatch(quarterBatches)
        return assocInQuarterBatches
    }catch (e){
        console.log(e)
        throw(e)

    }
}