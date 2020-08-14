import {caliberBaseClient} from '.'

export const getBatchBySkills = async () => {
    try{
        let res = await caliberBaseClient.get(`/mock/training/batch/skills`)
        return res.data
    }catch(e){
        console.log(e);
    }
}