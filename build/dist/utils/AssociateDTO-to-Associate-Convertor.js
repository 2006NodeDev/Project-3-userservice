"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associateDTOtoAssociate = void 0;
function associateDTOtoAssociate(ato) {
    return {
        email: ato.email,
        salesforceId: ato.salesforceId,
        firstName: ato.firstName,
        lastName: ato.lastName,
        flag: ato.flag
    };
}
exports.associateDTOtoAssociate = associateDTOtoAssociate;
//# sourceMappingURL=AssociateDTO-to-Associate-Convertor.js.map