"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringUtility = /** @class */ (function () {
    function StringUtility() {
    }
    StringUtility.prototype.removeTrailingDot = function (string) {
        return string.replace(/\.$/, '');
    };
    StringUtility.prototype.removeTrailingSlash = function (string) {
        return string.replace(/\/$/, '');
    };
    return StringUtility;
}());
exports.default = StringUtility;
