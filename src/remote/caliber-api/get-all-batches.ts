import {caliberBaseClient} from '.'

export const getAllBatches = async () => {
    try{
        let res = await caliberBaseClient.get(`/mock/training/batch`)
        return res.data
    }catch(e){
        console.log(e);
    }
}