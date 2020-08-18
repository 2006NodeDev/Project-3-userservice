import { getAllAssociates } from "../get-all-associates"
import { Associate } from "../../../models/Associate"

export const getAssociateswithQuarter = async () => {
    try{
        let allAssoc= await getAllAssociates()

        let res:Associate[] = []
       

        

    }catch (e){
        console.log(e)
        throw(e)

    }
}