"use strict";
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
var prompts = require('prompts');
var exit_1 = require("./exit");
var Generator = /** @class */ (function () {
    function Generator(name, destination, skipInstall) {
        this.name = name;
        this.destination = destination;
        this.plugins = [];
    }
    Generator.prototype.register = function (plugins) {
        var _a;
        (_a = this.plugins).push.apply(_a, plugins);
    };
    Generator.prototype.ask = function () {
        return __awaiter(this, void 0, void 0, function () {
            var questions, configuration, isConfirmed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        questions = [];
                        this.plugins.forEach(function (plugin) {
                            questions.push.apply(questions, plugin.questions());
                        });
                        return [4 /*yield*/, prompts(questions, {
                                onCancel: function () {
                                    exit_1.default();
                                },
                                onSubmit: function () { }
                            })];
                    case 1:
                        configuration = _a.sent();
                        return [4 /*yield*/, this.confirm(configuration)];
                    case 2:
                        isConfirmed = _a.sent();
                        if (isConfirmed) {
                            return [2 /*return*/, configuration];
                        }
                        else {
                            exit_1.default();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Generator.prototype.confirm = function (configuration) {
        return __awaiter(this, void 0, void 0, function () {
            var confirmationQuestion, confirmation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        confirmationQuestion = [
                            {
                                type: 'toggle',
                                name: 'shouldProceed',
                                message: 'Proceed? ✅',
                                active: 'yes',
                                inactive: 'no',
                                initial: 'yes'
                            }
                        ];
                        console.log('The project will be generated with the following parameters: ');
                        console.log('Name: ', this.name);
                        console.log('Destination: ', this.destination);
                        console.log('Configuration: ', configuration);
                        return [4 /*yield*/, prompts(confirmationQuestion, {
                                onCancel: function () {
                                    exit_1.default();
                                },
                                onSubmit: function () { }
                            })];
                    case 1:
                        confirmation = _a.sent();
                        return [2 /*return*/, confirmation.shouldProceed];
                }
            });
        });
    };
    Generator.prototype.processPlugins = function (plugins, configuration) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, plugins_1, plugin;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, plugins_1 = plugins;
                        _a.label = 1;
                    case 1:
                        if (!(_i < plugins_1.length)) return [3 /*break*/, 4];
                        plugin = plugins_1[_i];
                        return [4 /*yield*/, plugin.execute(configuration, this.destination)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Generator.prototype.postProcessPlugins = function (plugins, configuration) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, plugins_2, plugin;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, plugins_2 = plugins;
                        _a.label = 1;
                    case 1:
                        if (!(_i < plugins_2.length)) return [3 /*break*/, 4];
                        plugin = plugins_2[_i];
                        return [4 /*yield*/, plugin.postExecute(configuration, this.destination)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Generator.prototype.run = function (configuration) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('🚀 Please hold tight while create-ios-app generates the project for you');
                        return [4 /*yield*/, this.processPlugins(this.plugins, configuration)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.postProcessPlugins(this.plugins, configuration)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Generator;
}());
exports.default = Generator;
