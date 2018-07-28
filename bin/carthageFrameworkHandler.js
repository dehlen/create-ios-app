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
var fs_1 = require("fs");
var path_1 = require("path");
var isEmpty = require("is-empty");
var exit_1 = require("./exit");
var dependencyMap_1 = require("./dependencyMap");
var prompts = require('prompts');
var CarthageFrameworkHandler = /** @class */ (function () {
    function CarthageFrameworkHandler() {
    }
    CarthageFrameworkHandler.prototype.getDependencies = function (filePath, filterForTestDependencies) {
        var dependencies = [];
        var unknownDependencies = [];
        var lines = fs_1.readFileSync(filePath)
            .toString()
            .split(/\r?\n/);
        var _loop_1 = function (line) {
            var value = line.split(/"/)[1];
            var frameworkItem = dependencyMap_1.default.find(function (element) {
                return element.value === value && element.isTestDependency == filterForTestDependencies;
            });
            if (isEmpty(frameworkItem)) {
                if (value === 'Mindera/Alicerce') {
                    dependencies.push({ carthage: 'Alicerce' });
                }
                else if (value === 'jspahrsummers/xcconfigs') {
                    //do nothing since this is not build as a framework
                }
                else if (value !== undefined) {
                    unknownDependencies.push(value);
                }
            }
            else {
                dependencies.push({ carthage: frameworkItem.frameworkName });
            }
        };
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            _loop_1(line);
        }
        return { dependencies: dependencies, unknownDependencies: unknownDependencies };
    };
    CarthageFrameworkHandler.prototype.retrieveDependencies = function (projectPath) {
        return __awaiter(this, void 0, void 0, function () {
            var resolvedAppDependencies, resolvedTestDependencies, appDependencyQuestions, testDependencyQuestions, appDependencyAnswers, testDependencyAnswers, key, value, key, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resolvedAppDependencies = this.getDependencies(path_1.join(projectPath, 'Cartfile'), false);
                        resolvedTestDependencies = this.getDependencies(path_1.join(projectPath, 'Cartfile.private'), true);
                        if (!(resolvedAppDependencies.unknownDependencies.length > 0 ||
                            resolvedTestDependencies.unknownDependencies.length > 0)) return [3 /*break*/, 3];
                        console.log('The resulting framework name of one or more of the entered Carthage dependencies could not be retrieved.');
                        console.log('This is necessary in order to automatically create a Run-Script-Phase in your Xcode project.');
                        console.log('Please enter the correct framework names for the following dependencies.');
                        console.log("Leave blank if this dependency does not build a framework or you don't want to link the framework");
                        appDependencyQuestions = resolvedAppDependencies.unknownDependencies.map(function (dependency, index) {
                            return {
                                type: 'text',
                                name: 'appDependency' + index,
                                message: 'How is the framework called for ' + dependency + '?'
                            };
                        });
                        testDependencyQuestions = resolvedTestDependencies.unknownDependencies.map(function (dependency, index) {
                            return {
                                type: 'text',
                                name: 'testDependency' + index,
                                message: 'How is the framework called for ' + dependency + '?'
                            };
                        });
                        return [4 /*yield*/, prompts(appDependencyQuestions, {
                                onCancel: function () {
                                    exit_1.default();
                                },
                                onSubmit: function () { }
                            })];
                    case 1:
                        appDependencyAnswers = _a.sent();
                        return [4 /*yield*/, prompts(testDependencyQuestions, {
                                onCancel: function () {
                                    exit_1.default();
                                },
                                onSubmit: function () { }
                            })];
                    case 2:
                        testDependencyAnswers = _a.sent();
                        for (key in appDependencyAnswers) {
                            value = appDependencyAnswers[key];
                            if (!isEmpty(value)) {
                                resolvedAppDependencies.dependencies.push({ carthage: value });
                            }
                        }
                        for (key in testDependencyAnswers) {
                            value = testDependencyAnswers[key];
                            if (!isEmpty(value)) {
                                resolvedTestDependencies.dependencies.push({ carthage: value });
                            }
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, {
                            testDependencies: resolvedTestDependencies.dependencies,
                            applicationDependencies: resolvedAppDependencies.dependencies
                        }];
                }
            });
        });
    };
    return CarthageFrameworkHandler;
}());
exports.default = CarthageFrameworkHandler;
