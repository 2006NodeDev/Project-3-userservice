import {caliberBaseClient} from '..'

export const getAllBatchesByQuarter = async (quarter:number) => {
    try{
        let res = await caliberBaseClient.get(`/mock/training/batch?quarter=${quarter}`)
        return res.data
    }catch(e){
        console.log(e);
    }
}