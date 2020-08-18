import { getAllAssociates } from "../get-all-associates"
import { Associate } from "../../../models/Associate"
import { getAllBatches } from "../get-all-batches"
import { getBatchByYear } from "./get-batch-by-year"
import { getAssocInYearBatch } from "./get-associates-in-year-batch"

export const getAssociatesWithYear = async (year:string) => {
    try{
        let allBatches = await getAllBatches()
        let yearBatches = await getBatchByYear(allBatches, year)
        let assocInYearBatches = await getAssocInYearBatch(yearBatches)
        // console.log(allBatches[0].startDate.split("-"))
        // console.log(typeof(allBatches[0].startDate))
        // let allAssoc= await getAllAssociates()
        // let res:Associate[] = [] 
        return assocInYearBatches
    }catch (e){
        console.log(e)
        throw(e)

    }
}