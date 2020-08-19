import { Associate } from "../../models/Associate"
import { getAllAssociates } from "../associate/get-all-associates"

export const getAssociateswithQuarter = async () => {
    try{
        let allAssoc= await getAllAssociates()
        let res:Associate[] = []
       
    }catch (e){
        console.log(e)
        throw(e)

    }
}