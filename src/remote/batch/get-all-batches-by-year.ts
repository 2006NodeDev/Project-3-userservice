import {caliberBaseClient} from '..'

export const getAllBatchesByYear = async (year:number) => {
    try{
        let res = await caliberBaseClient.get(`/mock/training/batch?year=${year}`)
        return res.data
    }catch(e){
        console.log(e);
    }
}