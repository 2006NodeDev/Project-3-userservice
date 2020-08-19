import { getAllBatches } from "../batch/get-all-batches"
import { getBatchByYear } from "../batch/get-batch-by-year"
import { getAssocInYearBatch } from "../associate/get-associates-in-year-batch"

export const getAssociatesWithYear = async (year:string) => {
    try{
        let allBatches = await getAllBatches()
        let yearBatches = await getBatchByYear(allBatches, year)
        let assocInYearBatches = await getAssocInYearBatch(yearBatches)
        return assocInYearBatches
    }catch (e){
        console.log(e)
        throw(e)

    }
}