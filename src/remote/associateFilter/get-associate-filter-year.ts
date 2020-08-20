// import { getAllBatches } from "../batch/get-all-batches"
import { getAllBatchesByYear } from "../batch/get-all-batches-by-year"
import { getAssocInYearBatch } from "../associate/get-associates-in-year-batch"
import { getAssocInBatch } from "../associate/get-associates-in-batch"

export const getAssociatesWithYear = async (year:string) => {
    try{
        // let allBatches = await getAllBatches()
        // let yearBatches = await getBatchByYear(allBatches, year)
        let yearBatches = await getAllBatchesByYear(+year)
        let assocInYearBatches = await getAssocInBatch(yearBatches)
        return assocInYearBatches
    }catch (e){
        console.log(e)
        throw(e)

    }
}