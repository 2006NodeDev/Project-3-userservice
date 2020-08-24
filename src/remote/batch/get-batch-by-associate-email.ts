import {caliberBaseClient} from '..'

export const getBatchByAssociatesEmail = async (email:string) => {
    try{
        let res = await caliberBaseClient.get(`/mock/training/associate/${email}/batch`)
        return res.data.batchId
    }catch(e){
        console.log(e);
    }
}