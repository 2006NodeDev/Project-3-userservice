import {caliberBaseClient} from '.'

export const getAssociatesByBatchId = async (batchId:string) => {
    try{
        let res = await caliberBaseClient.get(`/mock/training/batch/${batchId}/associates`)
        return res.data
    }catch(e){
        console.log(e);
    }
}