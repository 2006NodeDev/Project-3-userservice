"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userConverter = void 0;
function userConverter(user) {
    var name = user.name.split(' ');
    var first = name[0];
    var last = undefined;
    if (name.length > 1) {
        last = name[1];
    }
    return {
        userId: user.sub,
        username: user.email,
        email: user.email,
        preferredName: first,
        lastName: last,
        picture: user.picture,
    };
}
exports.userConverter = userConverter;
//# sourceMappingURL=userConverter.js.map