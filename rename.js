const copy = require('recursive-copy')
const path = require('path')
const through = require('through2')

const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const replaceVariables = (string, replacementMap) => {
    var output = string

    for(var key in replacementMap) {
        const value = replacementMap[key]
        output = output.replace(new RegExp(escapeRegExp(key), 'g'), value);
    }
    return output
}


const filteredFiles = (configuration) => {
    var filteredFiles = ['**/*']
    if (!configuration.swiftlint) {
        filteredFiles.push('!.swiftlint.yml')
    }

    if (!configuration.swiftgen) {
        filteredFiles.push('!swiftgen.yml')
        filteredFiles.push('!**/Resources')
    }

    return filteredFiles
}

const supportedExtensions = ['.swift', '.yml', '.yaml']

var renamer = {
    recusivelyCopy: async (from, to, replacementMap, configuration) => {
        await copy(from, to, {
            overwrite: true,
            expand: true,
            dot: true,
            junk: true,
            filter: filteredFiles(configuration),
            rename: function(filePath) {
                return replaceVariables(filePath, replacementMap)
            },
            transform: function(src, dest, stats) {
                if (!supportedExtensions.includes(path.extname(src))) { return null; }
                return through(function(chunk, enc, done)  {
                    done(null, replaceVariables(chunk.toString(), replacementMap));
                });
            }
        })
    }
}

module.exports = renamer;
 
