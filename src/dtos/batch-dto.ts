import { EmployeeAssignment } from "../models/EmployeeAssignment"

export class BatchDTO {
    
    batchId!: string
    name!: string
    startDate!: Date
    endDate!: Date
    skill!: string
    location!: string
    type!: string
    goodGrade!: number
    passingGrade!: number
    employeeAssignments!:EmployeeAssignment
}