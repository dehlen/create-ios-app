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
const path = require("path");
const moment = require("moment");
const rename = require("./rename");
const stringUtil = require("./stringUtil");
const carthage = require("./carthage");
const removeTrailingDot = string => {
  return string.replace(/\.$/, "");
};
const swiftlintLane = shouldBeAdded => {
  if (shouldBeAdded) {
    return `desc "Check style and conventions"
        lane :lint do
            swiftlint(strict: true)
        end`;
  } else {
    return "";
  }
};
const gitPushConfiguration = githubURL => {
  if (stringUtil.isEmpty(githubURL)) {
    return "";
  } else {
    return "push_to_git_remote";
  }
};
exports.copyTemplateProject = (projectLocation, name, configuration) =>
  __awaiter(this, void 0, void 0, function*() {
    const replacementMap = {
      "{PROJECT_NAME}": name,
      "{AUTHOR}": configuration.name,
      "{TODAY}": moment().format("LL"),
      "{YEAR}": moment().format("YYYY"),
      "{ORGANIZATION}": configuration.organization,
      "{BUNDLE_IDENTIFIER_PREFIX}": removeTrailingDot(configuration.bundleIdPrefix),
      "{DEPLOYMENT_TARGET}": configuration.deploymentTarget,
      "{SWIFTLINT_LANE}": swiftlintLane(configuration.swiftlint),
      "{GIT_PUSH_CONFIGURATION}": gitPushConfiguration(configuration.githubURL)
    };
    const templateDirectory = path.join(__dirname, "Template");
    yield rename.recusivelyCopy(templateDirectory, projectLocation, replacementMap, configuration);
    yield carthage.handleCartfileBackups(templateDirectory);
  });
