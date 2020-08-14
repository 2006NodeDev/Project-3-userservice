import {caliberBaseClient} from '.'

export const getBatchByBatchId = async (batchId:string) => {
    try{
        let res = await caliberBaseClient.get(`/mock/training/batch/${batchId}`)
        return res.data
    }catch(e){
        console.log(e);
    }
}