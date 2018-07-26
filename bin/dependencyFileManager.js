"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DependencyFileManager = /** @class */ (function () {
    function DependencyFileManager(projectPath) {
        this.projectPath = projectPath;
    }
    DependencyFileManager.prototype.carthageDependencies = function () {
        // TODO: fails if folder does not exist
        // const carthageBuildPath = join(this.projectPath, 'Carthage', 'Build', 'iOS')
        // const directoryContents = readdirSync(carthageBuildPath)
        // const frameworks = directoryContents
        //   .filter(file => /.*\.framework/gi.test(file))
        //   .map(file => file.replace(/\.[^/.]+$/, ''))
        //   .map(
        //     framework =>
        //       <CarthageDependency>{
        //         carthage: framework
        //       }
        //   )
        // TODO: how to seperate test frameworks from app frameworks ?
        return {
            testDependencies: [{ carthage: 'Quick' }, { carthage: 'Nimble' }],
            applicationDependencies: []
        };
    };
    return DependencyFileManager;
}());
exports.default = DependencyFileManager;
