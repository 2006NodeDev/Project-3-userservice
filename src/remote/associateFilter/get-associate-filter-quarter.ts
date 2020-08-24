// import { Associate } from "../../models/Associate"
// import { getAllAssociates } from "../associate/get-all-associates"
import { getAllBatchesByQuarter } from "../batch/get-all-batches-by-quarter"
import { getAssocInAllBatches } from "../associate/get-associates-in-all-batches"

export const getAssociateswithQuarter = async (quarter:string) => {
    try{
        let quarterBatches = await getAllBatchesByQuarter(+quarter)
        let assocInQuarterBatches = await getAssocInAllBatches(quarterBatches)
        return assocInQuarterBatches
    }catch (e){
        console.log(e)
        throw(e)

    }
}