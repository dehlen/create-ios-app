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
var replace = require("regex-replace");
var stringUtil_1 = require("../stringUtil");
var copy = require("recursive-copy");
var path_1 = require("path");
var isEmpty = require("is-empty");
var TabBasedAppPlugin = /** @class */ (function (_super) {
    __extends(TabBasedAppPlugin, _super);
    function TabBasedAppPlugin(pluginDirectory) {
        var _this = _super.call(this) || this;
        _this.pluginDirectory = pluginDirectory;
        return _this;
    }
    TabBasedAppPlugin.prototype.questions = function () {
        return [
            {
                type: 'text',
                name: 'tabs',
                message: 'Enter names of tabs which should be added to the app other than the default home and about tab - Comma separated'
            }
        ];
    };
    TabBasedAppPlugin.prototype.execute = function (configuration, destination) {
        return __awaiter(this, void 0, void 0, function () {
            var stringUtil, tabs, protocolFunctions, localizableStrings, storyboardCases, additionalTabFunctions, additionalTabStrings, _i, tabs_1, tab, tabClassesPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stringUtil = new stringUtil_1.default();
                        tabs = configuration.tabs
                            .split(',')
                            .map(function (tab) { return tab.trim(); })
                            .filter(function (tab) { return !isEmpty(tab); });
                        if (!(tabs.length > 0)) return [3 /*break*/, 15];
                        console.log(tabs);
                        console.log(tabs.length);
                        protocolFunctions = tabs
                            .map(function (tab) {
                            return "func " + stringUtil.camelize(tab) + "() -> (UIViewController, " + stringUtil.capitalize(tab.toLowerCase()) + "ViewRouting)";
                        })
                            .join('\n');
                        localizableStrings = tabs
                            .map(function (tab) { return "\"" + stringUtil.camelize(tab) + "\" = \"" + stringUtil.capitalize(tab) + "\";"; })
                            .join('\n');
                        storyboardCases = tabs
                            .map(function (tab) { return "case " + stringUtil.camelize(tab); })
                            .join('\n');
                        additionalTabFunctions = tabs
                            .map(function (tab) { return stringUtil.camelize(tab) + "()"; })
                            .join(', ');
                        return [4 /*yield*/, replace('{ADDITIONAL_TAB_VIEWFACTORY_FUNCTIONS}\n', protocolFunctions, stringUtil.removeTrailingSlash(destination))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, replace('{ADDITIONAL_TAB_LOCALIZABLE_STRINGS}\n', localizableStrings, stringUtil.removeTrailingSlash(destination))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, replace('{ADDITIONAL_TAB_STORYBOARD_CASES}\n', storyboardCases, stringUtil.removeTrailingSlash(destination))];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, replace('{ADDITIONAL_TAB_FUNCTIONS}', ", " + additionalTabFunctions, stringUtil.removeTrailingSlash(destination))];
                    case 4:
                        _a.sent();
                        if (!!configuration.swiftgen) return [3 /*break*/, 6];
                        additionalTabStrings = tabs
                            .map(function (tab) {
                            return "/// " + stringUtil.capitalize(stringUtil.camelize(tab)) + "\npublic static let " + stringUtil.camelize(tab) + " = L10n.tr(\"Localizable\", \"" + stringUtil.camelize(tab) + "\")";
                        })
                            .join('\n');
                        return [4 /*yield*/, replace('{ADDITIONAL_TAB_STRINGS_WITHOUT_SWIFTGEN}\n', additionalTabStrings, stringUtil.removeTrailingSlash(destination))];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, replace('{ADDITIONAL_TAB_STRINGS_WITHOUT_SWIFTGEN}\n', '', stringUtil.removeTrailingSlash(destination))];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        _i = 0, tabs_1 = tabs;
                        _a.label = 9;
                    case 9:
                        if (!(_i < tabs_1.length)) return [3 /*break*/, 14];
                        tab = tabs_1[_i];
                        tabClassesPath = path_1.join(this.pluginDirectory, '{TABNAME}');
                        return [4 /*yield*/, copy(tabClassesPath, path_1.join(destination, '{PROJECT_NAME}', 'Features'), {
                                overwrite: false,
                                expand: true,
                                dot: true,
                                junk: true
                            })];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, replace('{TABNAME}', stringUtil.capitalize(stringUtil.camelize(tab)), stringUtil.removeTrailingSlash(destination))];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, replace('{TABNAME_CAMEL_CASED}', stringUtil.camelize(tab), stringUtil.removeTrailingSlash(destination))];
                    case 12:
                        _a.sent();
                        _a.label = 13;
                    case 13:
                        _i++;
                        return [3 /*break*/, 9];
                    case 14: return [3 /*break*/, 21];
                    case 15: return [4 /*yield*/, replace('{ADDITIONAL_TAB_VIEWFACTORY_FUNCTIONS}\n', '', stringUtil.removeTrailingSlash(destination))];
                    case 16:
                        _a.sent();
                        return [4 /*yield*/, replace('{ADDITIONAL_TAB_LOCALIZABLE_STRINGS}\n', '', stringUtil.removeTrailingSlash(destination))];
                    case 17:
                        _a.sent();
                        return [4 /*yield*/, replace('{ADDITIONAL_TAB_STORYBOARD_CASES}\n', '', stringUtil.removeTrailingSlash(destination))];
                    case 18:
                        _a.sent();
                        return [4 /*yield*/, replace('{ADDITIONAL_TAB_FUNCTIONS}', '', stringUtil.removeTrailingSlash(destination))];
                    case 19:
                        _a.sent();
                        return [4 /*yield*/, replace('{ADDITIONAL_TAB_STRINGS_WITHOUT_SWIFTGEN}\n', '', stringUtil.removeTrailingSlash(destination))];
                    case 20:
                        _a.sent();
                        _a.label = 21;
                    case 21: return [2 /*return*/];
                }
            });
        });
    };
    TabBasedAppPlugin.prototype.postExecute = function (configuration, destination) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    return TabBasedAppPlugin;
}(plugin_1.default));
exports.default = TabBasedAppPlugin;
