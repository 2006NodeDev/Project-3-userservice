import { getAllBatchesByYear } from "../batch/get-all-batches-by-year"
import { getAssocInAllBatches } from "../associate/get-associates-in-all-batches"

export const getAssociatesWithYear = async (year:string) => {
    try{
        let yearBatches = await getAllBatchesByYear(+year)
        let assocInYearBatches = await getAssocInAllBatches(yearBatches)
        return assocInYearBatches
    }catch (e){
        console.log(e)
        throw(e)

    }
}