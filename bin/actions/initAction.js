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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var generator_1 = require("../generator");
var name_1 = require("../plugins/name");
var organization_1 = require("../plugins/organization");
var bundleIdPrefix_1 = require("../plugins/bundleIdPrefix");
var deploymentTarget_1 = require("../plugins/deploymentTarget");
var github_1 = require("../plugins/github");
var tabBasedApp_1 = require("../plugins/tabBasedApp");
var swiftlint_1 = require("../plugins/swiftlint");
var fastlane_1 = require("../plugins/fastlane");
var swiftgen_1 = require("../plugins/swiftgen");
var settingsBundle_1 = require("../plugins/settingsBundle");
var networkStack_1 = require("../plugins/networkStack");
var loggingDependency_1 = require("../plugins/loggingDependency");
var analyticsDependency_1 = require("../plugins/analyticsDependency");
var themingDependency_1 = require("../plugins/themingDependency");
var curatedDependency_1 = require("../plugins/curatedDependency");
var dependencyEditor_1 = require("../plugins/dependencyEditor");
var templateHandler_1 = require("../templateHandler");
var xcodegen_1 = require("../plugins/xcodegen");
var author_1 = require("../plugins/author");
var year_1 = require("../plugins/year");
var today_1 = require("../plugins/today");
var carthage_1 = require("../plugins/carthage");
var directoryHandler_1 = require("../directoryHandler");
var openXcodeProject_1 = require("../plugins/openXcodeProject");
var fetchLicenses_1 = require("../plugins/fetchLicenses");
var bootstrapPlugin_1 = require("../plugins/bootstrapPlugin");
exports.default = (function (name, destination, skipInstall) { return __awaiter(_this, void 0, void 0, function () {
    var projectPath, generator, templateHandler, directoryHandler, configuration;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                projectPath = path_1.join(destination, name);
                generator = new generator_1.default(name, projectPath, skipInstall);
                templateHandler = new templateHandler_1.default(path_1.join(__dirname, '../../Template'));
                directoryHandler = new directoryHandler_1.default();
                generator.register([
                    new name_1.default(name),
                    new year_1.default(),
                    new today_1.default(),
                    new author_1.default(),
                    new organization_1.default(),
                    new bundleIdPrefix_1.default(),
                    new deploymentTarget_1.default(),
                    new tabBasedApp_1.default(),
                    new bootstrapPlugin_1.default(),
                    new swiftlint_1.default(),
                    new fastlane_1.default(),
                    new swiftgen_1.default(),
                    new carthage_1.default(skipInstall),
                    new settingsBundle_1.default(),
                    new networkStack_1.default(),
                    new loggingDependency_1.default(),
                    new analyticsDependency_1.default(),
                    new themingDependency_1.default(),
                    new curatedDependency_1.default(),
                    new dependencyEditor_1.default(),
                    new fetchLicenses_1.default(),
                    new xcodegen_1.default(name),
                    new github_1.default(),
                    new openXcodeProject_1.default()
                ]);
                return [4 /*yield*/, directoryHandler.handleProjectFolderGeneration(projectPath)];
            case 1:
                _a.sent();
                return [4 /*yield*/, generator.ask()];
            case 2:
                configuration = _a.sent();
                return [4 /*yield*/, templateHandler.copyTo(projectPath, configuration)];
            case 3:
                _a.sent();
                return [4 /*yield*/, generator.run(configuration)];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
