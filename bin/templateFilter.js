"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TemplateFilter = /** @class */ (function() {
  function TemplateFilter(templateDirectory) {
    this.templateDirectory = templateDirectory;
  }
  TemplateFilter.prototype.filteredFiles = function() {
    return ["**/*", "!**/.gitkeep", "!**/plugins"];
  };
  return TemplateFilter;
})();
exports.default = TemplateFilter;
