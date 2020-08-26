import { User } from "../models/User";

export function userConverter(user:any):User{
    let name = user.name.split(' ');
    let first = name[0];
    let last = undefined;
    if (name.length > 1){
        last = name[1];
    }
    return{
        userId:user.sub,
        username:user.email,
        email:user.email,
        preferredName:first,
        lastName:last,
        picture:user.picture,        
    }
}