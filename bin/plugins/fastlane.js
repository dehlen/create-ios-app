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
var copy = require("recursive-copy");
var path_1 = require("path");
var shelljs_1 = require("shelljs");
var stringUtil_1 = require("../stringUtil");
var replace = require("regex-replace");
var FastlanePlugin = /** @class */ (function (_super) {
    __extends(FastlanePlugin, _super);
    function FastlanePlugin(pluginDirectory, name) {
        var _this = _super.call(this) || this;
        _this.pluginDirectory = pluginDirectory;
        _this.name = name;
        return _this;
    }
    FastlanePlugin.prototype.questions = function () {
        return [
            {
                type: 'toggle',
                name: 'fastlane',
                message: '🚘 Should we add fastlane support?',
                active: 'yes',
                inactive: 'no',
                initial: 'yes'
            },
            {
                type: function (prev) { return prev && 'toggle'; },
                name: 'match',
                message: 'Should we add match for code signing support?',
                active: 'yes',
                inactive: 'no',
                initial: 'yes'
            },
            {
                type: function (prev) { return prev && 'text'; },
                name: 'matchGitUrl',
                message: 'Enter a git url to  a privat repository where your certificates and profile will be stored:'
            },
            {
                type: function (prev) { return prev && 'text'; },
                name: 'matchAppleDeveloper',
                message: 'Enter the E-Mail address of your Apple Developer username:'
            }
        ];
    };
    FastlanePlugin.prototype.execute = function (configuration, destination) {
        return __awaiter(this, void 0, void 0, function () {
            var fastlanePath, gemfilePath, gemfileLockPath, filter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!configuration.fastlane) return [3 /*break*/, 4];
                        fastlanePath = path_1.join(this.pluginDirectory, 'fastlane');
                        gemfilePath = path_1.join(this.pluginDirectory, 'Gemfile');
                        gemfileLockPath = path_1.join(this.pluginDirectory, 'Gemfile.lock');
                        filter = ['**/*'];
                        if (!configuration.match) {
                            filter.push('!**/*Matchfile');
                        }
                        return [4 /*yield*/, copy(fastlanePath, path_1.join(destination, 'fastlane'), {
                                overwrite: true,
                                expand: true,
                                dot: true,
                                junk: true,
                                filter: filter
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, copy(gemfilePath, path_1.join(destination, 'Gemfile'), {
                                overwrite: true,
                                expand: true,
                                dot: true,
                                junk: true
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, copy(gemfileLockPath, path_1.join(destination, 'Gemfile.lock'), {
                                overwrite: true,
                                expand: true,
                                dot: true,
                                junk: true
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FastlanePlugin.prototype.postExecute = function (configuration, destination) {
        return __awaiter(this, void 0, void 0, function () {
            var stringUtil, betaString, bundleIdentifier;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stringUtil = new stringUtil_1.default();
                        betaString = configuration.match
                            ? '\n* beta : Increment build number and build the app'
                            : '';
                        return [4 /*yield*/, replace('{FASTLANE_README}\n', configuration.fastlane
                                ? "## Fastlane\n      You can run all available options via `bundle exec fastlane ios <action>`.\n      Possible actions are:\n      * version_bump patch/minor/major: Increment the version of your app\n      * tests: Run test target\n      * lint : Lint via swiftlint if a configuration is specified. This is only added if you enabled swiftlint support." + betaString + "\n"
                                : '', stringUtil.removeTrailingSlash(destination))];
                    case 1:
                        _a.sent();
                        if (!configuration.match) return [3 /*break*/, 5];
                        return [4 /*yield*/, replace('{MATCH_GIT_URL}', configuration.matchGitUrl, stringUtil.removeTrailingSlash(destination))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, replace('{MATCH_APPLE_DEVELOPER}', configuration.matchAppleDeveloper, stringUtil.removeTrailingSlash(destination))];
                    case 3:
                        _a.sent();
                        bundleIdentifier = stringUtil.removeTrailingDot(configuration.bundleIdPrefix) + '.' + this.name;
                        return [4 /*yield*/, replace('{BETA_LANE}', "#### Build ####\n  lane :beta do\n    increment_build_number_in_plist(\n      xcodeproj: './" + this.name + ".xcodeproj',\n      scheme: '" + this.name + "'\n    )\n    produce(\n      app_name: '" + this.name + "',\n      username: '" + configuration.matchAppleDeveloper + "',\n      app_identifier: '" + bundleIdentifier + "'\n    )\n    match(type: 'appstore')\n    automatic_code_signing(\n      use_automatic_signing: false,\n      profile_name: ENV['sigh_" + bundleIdentifier + "_appstore_profile-name'],\n      team_id: ENV['sigh_" + bundleIdentifier + "_appstore_team-id'],\n      code_sign_identity: 'iPhone Distribution'\n    )\n    build_app(\n      scheme: '" + this.name + "',\n      configuration: 'Release'\n    )\n  end", stringUtil.removeTrailingSlash(destination))];
                    case 4:
                        _a.sent();
                        console.log("Since you configured match for your project you might need to update your Xcode project to Manual Code Signing\n      and update the targets provision profiles accordingly in order for the beta lane to work.");
                        _a.label = 5;
                    case 5:
                        if (configuration.fastlane) {
                            console.log('Installing ruby gems needed for fastlane configuration');
                            shelljs_1.exec('cd ' + destination + ' && bundle install --path vendor/bundle', { silent: true });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return FastlanePlugin;
}(plugin_1.default));
exports.default = FastlanePlugin;
