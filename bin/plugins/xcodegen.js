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
var yaml = require("write-yaml");
var exit_1 = require("../exit");
var shelljs_1 = require("shelljs");
var carthageFrameworkHandler_1 = require("../carthageFrameworkHandler");
var XcodeGenPlugin = /** @class */ (function (_super) {
    __extends(XcodeGenPlugin, _super);
    function XcodeGenPlugin(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        return _this;
    }
    XcodeGenPlugin.prototype.questions = function () {
        return [];
    };
    XcodeGenPlugin.prototype.createUnitTestConfiguration = function (configuration, testTargetName, carthageFrameworks) {
        var testTargetConfiguration = {
            platform: 'iOS',
            type: 'bundle.unit-test',
            configFiles: {
                Debug: 'Configurations/Tests.xcconfig',
                Release: 'Configurations/Tests.xcconfig'
            },
            sources: testTargetName,
            dependencies: [
                {
                    target: this.name
                }
            ],
            scheme: {
                testTargets: [testTargetName],
                gatherCoverageData: true
            }
        };
        testTargetConfiguration.dependencies = carthageFrameworks;
        return testTargetConfiguration;
    };
    XcodeGenPlugin.prototype.createRunScriptPhases = function (configuration) {
        var runScriptPhases = [];
        if (configuration.swiftlint) {
            runScriptPhases.push({
                script: 'sh "$PROJECT_DIR/scripts/swiftlint.sh"',
                name: 'Lint with Swiftlint'
            });
        }
        if (configuration.swiftgen) {
            runScriptPhases.push({
                script: 'sh "$PROJECT_DIR/scripts/swiftgen.sh"',
                name: 'Generate with SwiftGen'
            });
        }
        return runScriptPhases;
    };
    XcodeGenPlugin.prototype.createApplicationConfiguration = function (configuration, testTargetName, carthageFrameworks) {
        var targetConfiguration = {
            type: 'application',
            platform: 'iOS',
            deploymentTarget: configuration.deploymentTarget,
            configFiles: {
                Debug: 'Configurations/Application.xcconfig',
                Release: 'Configurations/Application.xcconfig'
            },
            sources: [this.name],
            scheme: {
                testTargets: [testTargetName],
                gatherCoverageData: true
            }
        };
        targetConfiguration.dependencies = carthageFrameworks;
        var runScriptPhases = this.createRunScriptPhases(configuration);
        if (runScriptPhases !== undefined && runScriptPhases.length > 0) {
            targetConfiguration['postbuildScripts'] = runScriptPhases;
        }
        return targetConfiguration;
    };
    XcodeGenPlugin.prototype.generateProjectConfiguration = function (configuration, carthageFrameworks) {
        var testTargetName = this.name + 'Tests';
        var yamlConfiguration = {
            name: this.name,
            options: {
                bundleIdPrefix: configuration.bundleIdPrefix
            },
            targets: {},
            configFiles: {
                Debug: 'Configurations/Debug.xcconfig',
                Release: 'Configurations/Release.xcconfig'
            }
        };
        yamlConfiguration.targets[this.name] = this.createApplicationConfiguration(configuration, testTargetName, carthageFrameworks.applicationDependencies);
        yamlConfiguration.targets[testTargetName] = this.createUnitTestConfiguration(configuration, testTargetName, carthageFrameworks.testDependencies);
        return yamlConfiguration;
    };
    XcodeGenPlugin.prototype.writeProjectConfiguration = function (configuration, destination, carthageFrameworks) {
        var specLocation = path_1.join(destination, '/project.yml');
        try {
            yaml.sync(specLocation, this.generateProjectConfiguration(configuration, carthageFrameworks));
            console.log('✅ Created project spec at ' + specLocation);
        }
        catch (err) {
            console.log('Could not create project spec.');
            console.error(err);
            exit_1.default();
        }
    };
    XcodeGenPlugin.prototype.execute = function (configuration, destination) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    XcodeGenPlugin.prototype.postExecute = function (configuration, destination) {
        return __awaiter(this, void 0, void 0, function () {
            var frameworkHandler, carthageFrameworks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        frameworkHandler = new carthageFrameworkHandler_1.default();
                        return [4 /*yield*/, frameworkHandler.retrieveDependencies(destination)];
                    case 1:
                        carthageFrameworks = _a.sent();
                        this.writeProjectConfiguration(configuration, destination, carthageFrameworks);
                        console.log('🛠 Generating Xcode project...');
                        shelljs_1.exec('xcodegen --spec ' + path_1.join(destination, 'project.yml') + ' --project ' + destination);
                        return [2 /*return*/];
                }
            });
        });
    };
    return XcodeGenPlugin;
}(plugin_1.default));
exports.default = XcodeGenPlugin;
