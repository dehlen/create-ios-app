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
    StringUtility.prototype.camelize = function (str) {
        return str
            .replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
            return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
        })
            .replace(/\s+/g, '');
    };
    StringUtility.prototype.capitalize = function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    return StringUtility;
}());
exports.default = StringUtility;
