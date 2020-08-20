import {caliberBaseClient} from '..'

export const getBatchIdByTrainer = async (trainerEmail:string) => {
    try{
        let res = await caliberBaseClient.get(`/mock/training/batch/${trainerEmail}/ids`)
        return res.data
    }catch(e){
        console.log(e);
    }
}