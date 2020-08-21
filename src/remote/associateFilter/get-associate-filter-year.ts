import { getAllBatchesByYear } from "../batch/get-all-batches-by-year"
import { getAssocInBatch } from "../associate/get-associates-in-batch"

export const getAssociatesWithYear = async (year:string) => {
    try{
        let yearBatches = await getAllBatchesByYear(+year)
        let assocInYearBatches = await getAssocInBatch(yearBatches)
        return assocInYearBatches
    }catch (e){
        console.log(e)
        throw(e)

    }
}