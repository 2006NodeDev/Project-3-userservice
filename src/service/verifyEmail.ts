import { getAllBatches } from "../remote/batch/get-all-batches"
import { logger } from "../loggers";

export const getEmails = async (email:string) => {
    try {
        let batches = await getAllBatches();
        let allEmails:any[] = [];
        for(let i=0; i<batches.length; i++){
            batches[i].associateAssignments.forEach(function (item:any, key:any) {
                allEmails.push(item.associate.email);
            })
        }
        return allEmails.includes(email)
    } catch (error) {
        logger.error(error);
    }
}