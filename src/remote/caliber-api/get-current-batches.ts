import {caliberBaseClient} from '.'

export const getCurrentBatches = async () => {
    try{
        console.log("we are in  get Current Batches function")
        let res = await caliberBaseClient.get(`/mock/training/batch/current`)
        return res.data
    }catch(e){
        console.log(e);
    }
}