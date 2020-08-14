import {caliberBaseClient} from '.'

export const getAllAssociateProf = async () => {
    try{
        let all_assoc = await caliberBaseClient.get(`/mock/training/associate`)

        return res.data
    }catch(e){
        console.log(e);
    }
}