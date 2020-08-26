import { Role } from "../models/Role";

export function roleConverter(role:any):Role{
    return{
        id:role.id,
        role:role.name,
        description:role.description,
    }
}