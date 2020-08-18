import { Flag } from "../models/Flag"

export class AssociateDTO{
    email!: string
    salesforceId!: string
    firstName!: string
    lastName!: string
    flag!: Flag
}