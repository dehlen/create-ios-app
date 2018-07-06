const copy = require('recursive-copy')
const path = require('path')
const through = require('through2')

const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\\$&");
}

const replaceVariables = (string, replacementMap) => {
    var output = string

    for(var key in replacementMap) {
        const value = replacementMap[key]
        output = output.replace(new RegExp(escapeRegExp(key), 'g'), value);
    }
    return output
}

var options = {
    overwrite: true,
    expand: true,
    dot: true,
    junk: true,
    rename: function(filePath) {
        return replaceVariables(filePath)
    },
    transform: function(src, dest, stats) {
        if (path.extname(src) !== '.swift') { return null; }
        return through(function(chunk, enc, done)  {
            done(null, replaceVariables(chunk.toString()));
        });
    }
};

var renamer = {
    recusivelyCopy: async (from, to, replacementMap) => {
        await copy(from, to, {
            overwrite: true,
            expand: true,
            dot: true,
            junk: true,
            rename: function(filePath) {
                return replaceVariables(filePath, replacementMap)
            },
            transform: function(src, dest, stats) {
                if (path.extname(src) !== '.swift') { return null; }
                return through(function(chunk, enc, done)  {
                    done(null, replaceVariables(chunk.toString(), replacementMap));
                });
            }
        })
    }
}

module.exports = renamer;
 
