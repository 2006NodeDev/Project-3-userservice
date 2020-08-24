import { caliberBaseClient } from "..";

export const getAssociatesByEmail = async (assocEmail:string) => {
    try{
        let res = await caliberBaseClient.get(`/mock/training/associate/${assocEmail}`)
        return res.data
    }catch(e){
        console.log(e);
    }
}