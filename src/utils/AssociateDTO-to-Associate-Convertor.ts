import { Associate } from "../models/Associate";
import { AssociateDTO } from "../dtos/associate-dto";


export function associateDTOtoAssociate(ato: AssociateDTO): Associate {

    return {
        email: ato.email,
        salesforceId: ato.salesforceId,
        firstName: ato.firstName,
        lastName: ato.lastName,
        flag: ato.flag
    }

}