const shell = require("shelljs")

exports.fetchDependencies = (projectLocation) => {
    shell.exec("cd " + projectLocation + " && ./scripts/fetch-dependencies.sh")
}