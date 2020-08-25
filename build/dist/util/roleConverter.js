"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleConverter = void 0;
function roleConverter(role) {
    return {
        id: role.id,
        role: role.name,
        description: role.description,
    };
}
exports.roleConverter = roleConverter;
//# sourceMappingURL=roleConverter.js.map