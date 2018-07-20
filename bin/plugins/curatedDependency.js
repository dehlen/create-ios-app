"use strict";
var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function(d, b) {
          d.__proto__ = b;
        }) ||
      function(d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
    };
  })();
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
var __generator =
  (this && this.__generator) ||
  function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function() {
          return this;
        }),
      g
    );
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, "__esModule", { value: true });
var plugin_1 = require("../plugin");
var CuratedDependencyPlugin = /** @class */ (function(_super) {
  __extends(CuratedDependencyPlugin, _super);
  function CuratedDependencyPlugin() {
    return _super.call(this) || this;
  }
  CuratedDependencyPlugin.prototype.questions = function() {
    return [
      {
        type: "multiselect",
        name: "testDependencies",
        message: "Do you want to add one or more of this curated testing dependencies?",
        choices: [
          { title: "Quick", value: "Quick/Quick", selected: true },
          { title: "Nimble", value: "Quick/Nimble", selected: true }
        ],
        hint: "- Space to select. Return to submit"
      },
      {
        type: "multiselect",
        name: "dependencies",
        message: "Do you want to add one or more of this curated other dependencies?",
        choices: [
          { title: "Nuke (Image Caching)", value: "kean/Nuke", selected: true },
          { title: "Shallows (Persistence)", value: "dreymonde/Shallows", selected: true },
          {
            title: "SwiftEntryKit (Context menus)",
            value: "huri000/SwiftEntryKit",
            selected: true
          },
          { title: "PromiseKit (Promises)", value: "mxcl/PromiseKit", selected: true },
          {
            title: "ViewAnimator (Animations)",
            value: "marcosgriselli/ViewAnimator",
            selected: true
          },
          { title: "Layoutless (Layouting)", value: "DeclarativeHub/Layoutless", selected: true },
          { title: "Texture (Async Rendering)", value: "texturegroup/texture" },
          { title: "Spruce (Transitions)", value: "willowtreeapps/spruce-ios" },
          { title: "Hero", value: "HeroTransitions/Hero" },
          { title: "EasyTransitions (Transitions)", value: "marcosgriselli/EasyTransitions" }
        ],
        hint: "- Space to select. Return to submit"
      }
    ];
  };
  CuratedDependencyPlugin.prototype.execute = function(configuration, destination) {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        return [2 /*return*/];
      });
    });
  };
  CuratedDependencyPlugin.prototype.postExecute = function(configuration, destination) {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        return [2 /*return*/];
      });
    });
  };
  return CuratedDependencyPlugin;
})(plugin_1.default);
exports.default = CuratedDependencyPlugin;
