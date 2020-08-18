import {caliberBaseClient} from '.'

export const getCurrentBatches = async () => {
    console.log("we are in  get Current Batches function")

    try{
        let res = await caliberBaseClient.get(`/mock/training/batch/current`)
        return res.data
    }catch(e){
        console.log("error in getCurrentBatches function")
        throw (e)

    }
}