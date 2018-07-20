var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : new P(function(resolve) {
              resolve(result.value);
            }).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
const copy = require("recursive-copy");
const path = require("path");
const through = require("through2");
const supportedExtensions = [".swift", ".yml", ".yaml", ".xcconfig", ".strings", ""];
const escapeRegExp = string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
const replaceVariables = (string, replacementMap) => {
  var output = string;
  for (var key in replacementMap) {
    const value = replacementMap[key];
    output = output.replace(new RegExp(escapeRegExp(key), "g"), value);
  }
  return output;
};
const filteredFiles = configuration => {
  var filteredFiles = ["**/*", "!**/.gitkeep", "!**/*.bak"];
  if (!configuration.swiftlint) {
    filteredFiles.push("!.swiftlint.yml");
  }
  if (!configuration.swiftgen) {
    filteredFiles.push("!swiftgen.yml");
    filteredFiles.push("!**/Resources");
  }
  if (!configuration.fastlane) {
    filteredFiles.push("!**/fastlane");
    filteredFiles.push("!Gemfile");
    filteredFiles.push("!Gemfile.lock");
  }
  return filteredFiles;
};
var renamer = {
  recusivelyCopy: (from, to, replacementMap, configuration) =>
    __awaiter(this, void 0, void 0, function*() {
      yield copy(from, to, {
        overwrite: true,
        expand: true,
        dot: true,
        junk: true,
        filter: filteredFiles(configuration),
        rename: function(filePath) {
          return replaceVariables(filePath, replacementMap);
        },
        transform: function(src, dest, stats) {
          if (!supportedExtensions.includes(path.extname(src))) {
            return null;
          }
          return through(function(chunk, enc, done) {
            done(null, replaceVariables(chunk.toString(), replacementMap));
          });
        }
      });
    })
};
module.exports = renamer;
