import {caliberBaseClient} from '.'

export const getCurrentBatches = async () => {
    try{
        let res = await caliberBaseClient.get(`/mock/training/batch/current`)
        
        return res.data
    }catch(e){
        console.log(e);
    }
}