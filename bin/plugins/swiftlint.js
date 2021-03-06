"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var plugin_1 = require("../plugin");
var path_1 = require("path");
var copy = require("recursive-copy");
var stringUtil_1 = require("../stringUtil");
var replace = require("regex-replace");
var SwiftLintPlugin = /** @class */ (function (_super) {
    __extends(SwiftLintPlugin, _super);
    function SwiftLintPlugin(pluginDirectory) {
        var _this = _super.call(this) || this;
        _this.pluginDirectory = pluginDirectory;
        return _this;
    }
    SwiftLintPlugin.prototype.questions = function () {
        return [
            {
                type: 'toggle',
                name: 'swiftlint',
                message: 'Add SwiftLint as linting mechanism?',
                active: 'yes',
                inactive: 'no',
                initial: 'yes'
            }
        ];
    };
    SwiftLintPlugin.prototype.execute = function (configuration, destination) {
        return __awaiter(this, void 0, void 0, function () {
            var swiftlintConfigurationPath, swiftlintScriptPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!configuration.swiftlint) return [3 /*break*/, 3];
                        swiftlintConfigurationPath = path_1.join(this.pluginDirectory, '.swiftlint.yml');
                        swiftlintScriptPath = path_1.join(this.pluginDirectory, 'scripts', 'swiftlint.sh');
                        return [4 /*yield*/, copy(swiftlintConfigurationPath, path_1.join(destination, '.swiftlint.yml'), {
                                overwrite: true,
                                expand: true,
                                dot: true,
                                junk: true
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, copy(swiftlintScriptPath, path_1.join(destination, 'scripts', 'swiftlint.sh'), {
                                overwrite: true,
                                expand: true,
                                dot: true,
                                junk: true
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SwiftLintPlugin.prototype.postExecute = function (configuration, destination) {
        return __awaiter(this, void 0, void 0, function () {
            var swiftlintLane, stringUtil;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        swiftlintLane = configuration.swiftlint
                            ? "desc \"Check style and conventions\"\n    lane :lint do\n      swiftlint(strict: true)\n    end\n"
                            : '';
                        stringUtil = new stringUtil_1.default();
                        return [4 /*yield*/, replace('{SWIFTLINT_LANE}\n', swiftlintLane, stringUtil.removeTrailingSlash(destination))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, replace('{SWIFTLINT_MINT}\n', configuration.swiftlint ? 'realm/SwiftLint@0.26.0\n' : '', stringUtil.removeTrailingSlash(destination))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, replace('{SWIFTLINT_SCRIPT}\n', configuration.swiftgen ? '* swiftlint.sh: lints all your .swift files\n' : '', stringUtil.removeTrailingSlash(destination))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return SwiftLintPlugin;
}(plugin_1.default));
exports.default = SwiftLintPlugin;
