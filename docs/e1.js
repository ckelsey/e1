var e1 =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var vm = __webpack_require__(2);

var E1 =
/*#__PURE__*/
function () {
  function E1() {
    var _this = this;

    _classCallCheck(this, E1);

    this.bindings = {};
    this.components = {};
    this.models = {};
    this.services = {};
    this.subscriptions = {};
    this.ids = [];
    this.cleanHtml = this.cleanHtml;
    this.generateId = this.generateId;
    this.getModel = this.getModel;
    this.getThis = this.getThis;
    this.registerComponent = this.registerComponent;
    this.registerElement = this.registerElement;
    this.scan = this.scan;
    this.setModel = this.setModel;
    this.setThis = this.setThis;
    this.subscribe = this.subscribe;
    this.updateBindings = this.updateBindings;
    this.observer = new window.MutationObserver(function (records) {
      var components = Object.keys(_this.components);

      var initElement = function initElement(element, componentName) {
        if (!element.hasAttribute || !element.querySelectorAll) {
          return;
        }

        if (element.nodeName && element.nodeName.toLowerCase() === componentName) {
          _this.components[componentName]._initElement(element);
        }

        if (element.hasAttribute(componentName)) {
          _this.components[componentName]._initElement(element);
        }

        var elements = element.querySelectorAll(componentName);

        if (!elements.length) {
          elements = element.querySelectorAll("[".concat(componentName, "]"));
        }

        if (elements.length) {
          for (var j = 0; j < elements.length; j++) {
            _this.components[componentName]._initElement(elements[j]);
          }
        }
      };

      var loopComponents = function loopComponents(node) {
        components.forEach(function (componentName) {
          initElement(node, componentName);
        });
      };

      var loopAddedNodes = function loopAddedNodes(addedNodes) {
        for (var i = 0; i < addedNodes.length; i++) {
          if (addedNodes[i].nodeType !== 3) {
            loopComponents(addedNodes[i]);
          }
        }
      };

      records.forEach(function (record) {
        if (record.addedNodes.length) {
          loopAddedNodes(record.addedNodes);
        }
      });
    });
  }

  _createClass(E1, [{
    key: "cleanHtml",
    value: function cleanHtml(html, contextNode) {
      html = html ? html.toString().replace(/<script[^>]*?>.*?<\/script>/gi, "").replace(/<style[^>]*?>.*?<\/style>/gi, "").replace(/<![\s\S]*?--[ \t\n\r]*>/gi, "") : "";
      var match = /<\s*\w.*?>/g.exec(html);
      var element = window.document.createElement("div");

      if (match !== null) {
        if (contextNode && contextNode.parentNode) {
          var range = window.document.createRange();
          range.selectNode(contextNode);
          element = range.createContextualFragment(html);
        } else {
          element = window.document.createRange().createContextualFragment(html);
        }

        element = element.lastChild;
      } else {
        element.innerHTML = html;
        element = element.lastChild;
      }

      return element;
    }
  }, {
    key: "generateId",
    value: function generateId() {
      var generate = function generate() {
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz";

        for (var i = 0; i < 26; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
      };

      var id = generate();

      while (this.ids.indexOf(id) > -1) {
        id = generate();
      }

      this.ids.push(id);
      return id;
    }
  }, {
    key: "getModel",
    value: function getModel(element, attribute, defaultValue) {
      var path;

      if (!element && !attribute) {
        return defaultValue;
      }

      if (element && attribute) {
        var _path = element.getAttribute(attribute);

        if (_path && _path.substring(0, 1) === "@") {
          path = _path.substring(1, _path.length);
        } else {
          try {
            _path = JSON.parse(_path);
          } catch (error) {}

          return _path ? _path : defaultValue;
        }
      } else if (!element && attribute && attribute.substring(0, 1) === "@") {
        path = attribute.substring(1, attribute.length);
      }

      if (!path) {
        return defaultValue;
      }

      path = path.split(".");
      var service = path.shift();

      if (this.services[service]) {
        service = this.services[service];
      } else {
        path.unshift(service);
        service = window;
      }

      path = path.join(".");
      return this.getThis(service, path, defaultValue);
    }
  }, {
    key: "getThis",
    value: function getThis(el, path, emptyVal) {
      if (path && path.toString().split) {
        path = [el].concat(path.toString().split("."));
      } else {
        path = [el];
      }

      var result = path.reduce(function (accumulator, currentValue) {
        if (accumulator === undefined) {
          return emptyVal;
        }

        if (currentValue.indexOf(".") === -1 && currentValue.indexOf("(") > -1) {
          /* TODO: this gets messed up by the parsing of attrs the have multiple value bindings separated by a comma */
          var argsString = /\((.*?)\)/g.exec(currentValue)[1];
          var args = argsString.split(",").map(function (arg) {
            return arg.trim();
          });
          var functionName = currentValue.split("(")[0];

          if (typeof accumulator[functionName] === "function") {
            var result = accumulator[functionName].apply(accumulator, args);
            return result;
          }
        }

        if (currentValue) {
          return accumulator[currentValue];
        } else {
          return accumulator;
        }
      });

      if (result === undefined) {
        return emptyVal;
      }

      return result;
    }
  }, {
    key: "isTruthy",
    value: function isTruthy(expression) {
      var _this2 = this;

      var values = expression.split(/(?:\(|\)|\|\||&&|<=|<|>=|>|===|!==)+/g).map(function (b) {
        return b.trim();
      }); // Sorting so longest paths first
      // Needed for similar path names

      values.sort(function (a, b) {
        return a.length > b.length ? -1 : a.length < b.length ? 1 : 0;
      });
      values.forEach(function (v) {
        if (v.substring(0, 1) === "@") {
          var model = _this2.getModel(null, v);

          if (isNaN(model)) {
            expression = expression.split(v).join("'".concat(model, "'"));
          } else {
            expression = expression.split(v).join(model);
          }
        }
      });
      return this.eval(expression);
    }
  }, {
    key: "eval",
    value: function _eval(expression) {
      vm.createContext();

      try {
        return vm.runInNewContext(expression);
      } catch (e) {
        return false;
      }
    }
  }, {
    key: "registerComponent",
    value: function registerComponent(name, service) {
      var _this3 = this;

      this.components[name] = {
        service: service,
        _initElement: function _initElement(el) {
          if (_this3.components[name].registeredElements.indexOf(el) === -1) {
            _this3.registerElement(el);

            var thisService = new _this3.components[name].service(el);

            _this3.components[name].registeredElements.push(el);

            if (!el.onUpdate) {
              el.onUpdate = [];
            }

            el.onUpdate.push(thisService.update.bind(thisService));
          } else if (el.onUpdate && Array.isArray(el.onUpdate) && el.onUpdate.length) {
            el.onUpdate.forEach(function (cb) {
              cb();
            });
          }
        },
        registeredElements: [],
        scan: function scan(element) {
          var existingElements = element.querySelectorAll(name);

          if (existingElements.length) {
            for (var i = 0; i < existingElements.length; i++) {
              _this3.components[name]._initElement(existingElements[i]);
            }
          }
        }
      };

      if (window.document.readyState === "complete") {
        this.components[name].scan(window.document.body);
      }
    }
  }, {
    key: "registerAttribute",
    value: function registerAttribute(name, service) {
      var _this4 = this;

      this.components[name] = {
        service: service,
        _initElement: function _initElement(el) {
          if (_this4.components[name].registeredElements.indexOf(el) === -1) {
            _this4.registerElement(el);

            var thisService = new _this4.components[name].service(el);

            _this4.components[name].registeredElements.push(el);

            if (!el.onUpdate) {
              el.onUpdate = [];
            }

            el.onUpdate.push(thisService.update.bind(thisService));
          } else if (el.onUpdate && Array.isArray(el.onUpdate) && el.onUpdate.length) {
            el.onUpdate.forEach(function (cb) {
              cb();
            });
          }
        },
        registeredElements: [],
        scan: function scan(element) {
          var existingElements = element.querySelectorAll("[".concat(name, "]"));

          if (existingElements.length) {
            for (var i = 0; i < existingElements.length; i++) {
              _this4.components[name]._initElement(existingElements[i]);
            }
          }
        }
      };

      if (window.document.readyState === "complete") {
        this.components[name].scan(window.document.body);
      }
    }
  }, {
    key: "registerElement",
    value: function registerElement(el) {
      var _this5 = this;

      if (!el || !el.attributes) {
        return;
      }

      if (!el.hasAttribute("component-id")) {
        el.setAttribute("component-id", this.generateId());
        el["component-id"] = el.getAttribute("component-id");
      }

      var attributes = el.attributes;

      var handleBindings = function handleBindings(bindings, _el) {
        bindings.forEach(function (binding) {
          var conditionalBinding = binding.split(/\?|\:/g).map(function (b) {
            return b.trim();
          })[0];

          if (!_this5.bindings[conditionalBinding]) {
            _this5.bindings[conditionalBinding] = [];
          }

          _this5.bindings[conditionalBinding].push(_el);
        });
      };

      for (var i = 0; i < attributes.length; i++) {
        var attributeValue = attributes[i].value;

        if (attributeValue.substring(0, 1) === "@") {
          var bindings = attributeValue.split(/(?:\(|\)|\|\||&&|<=|<|>=|>|===|!==)+/g).map(function (b) {
            return b.trim();
          });
          handleBindings(bindings, el);
        }
      }
    }
  }, {
    key: "registerService",
    value: function registerService(name, service) {
      this.services[name] = service;
      this.updateBindings("@" + name, service);
    }
  }, {
    key: "scan",
    value: function scan(element) {
      for (var c in this.components) {
        if (this.components[c]) {
          this.components[c].scan(element);
        }
      }
    }
  }, {
    key: "setModel",
    value: function setModel(element, attribute, value) {
      var path;

      if (!element && !attribute) {
        return false;
      }

      if (element && attribute) {
        var _path = element.getAttribute(attribute);

        if (_path && _path.substring(0, 1) === "@") {
          path = _path.substring(1, _path.length);
        }
      } else if (!element && attribute && attribute.substring(0, 1) === "@") {
        path = attribute.substring(1, attribute.length);
      }

      if (!path) {
        return false;
      }

      var boundPath = path;
      path = path.split(".");
      var service = path.shift();

      if (this.services[service]) {
        service = this.services[service];
      } else {
        path.unshift(service);
        service = window;
      }

      path = path.join(".");
      var clone = this.getThis(service, path);

      try {
        clone = JSON.parse(JSON.stringify(clone));
      } catch (e) {}

      if (value && value.substring && value.substring(0, 1) === "@") {
        value = this.getModel(null, value, value);
      }

      this.setThis(service, path, value);
      var newVal = this.getThis(service, path);
      var updated = clone;

      try {
        if (typeof clone === "object" && typeof newVal === "object") {
          updated = Object.assign(clone, newVal);
        } else if (newVal) {
          updated = newVal;
        }
      } catch (e) {}

      this.updateBindings("@" + boundPath, updated);
      return newVal;
    }
  }, {
    key: "setThis",
    value: function setThis(el, path, val) {
      if (path) {
        path = [el].concat(path.split("."));
      } else {
        path = [el];
      }

      var result = path.reduce(function (accumulator, currentValue) {
        if (!accumulator) {
          accumulator = {};
        }

        if (!accumulator[currentValue]) {
          accumulator[currentValue] = {};
        }

        if (currentValue) {
          if (currentValue === path[path.length - 1]) {
            accumulator[currentValue] = val;
          }

          return accumulator[currentValue];
        } else {
          accumulator[currentValue] = null;
          return accumulator;
        }
      });
      return result;
    }
  }, {
    key: "subscribe",
    value: function subscribe(path, callback) {
      if (!this.subscriptions[path]) {
        this.subscriptions[path] = [];
      }

      this.subscriptions[path].push(callback);
    }
  }, {
    key: "updateBindings",
    value: function updateBindings(path, clone) {
      var _this6 = this;

      var elements = this.bindings[path];
      var subscribes = this.subscriptions[path];

      if (subscribes && subscribes.length) {
        subscribes.forEach(function (element) {
          element(clone);
        });
      }

      if (elements && elements.length) {
        elements.forEach(function (element) {
          var isShown = window.document.body.contains(element);

          if (element.hasAttribute("e1-if") && _this6.isTruthy(element.getAttribute("e1-if")) || element.hasAttribute("e1-show") && _this6.isTruthy(element.getAttribute("e1-show"))) {
            isShown = true;
          }

          if (isShown && Array.isArray(element.onUpdate) && element.onUpdate.length) {
            element.onUpdate.forEach(function (callback) {
              callback();
            });
          }
        });
      }

      if (clone && typeof clone === "object") {
        for (var p in clone) {
          if (clone.hasOwnProperty(p)) {
            this.updateBindings("".concat(path, ".").concat(p), clone[p]);
          }
        }
      }
    }
  }]);

  return E1;
}();

window.E1 = new E1();
module.exports = window.E1;

if (window.document.readyState === "complete") {
  window.E1.observer.observe(window.document.body, {
    attributes: true,
    attributeOldValue: true,
    childList: true,
    subtree: true,
    characterData: true
  });
  window.E1.scan(window.document.body);
} else {
  window.document.addEventListener("DOMContentLoaded", function () {
    window.E1.observer.observe(window.document.body, {
      attributes: true,
      attributeOldValue: true,
      childList: true,
      subtree: true,
      characterData: true
    });
    window.E1.scan(window.document.body);
  });
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function () {
  var ImageUtils =
  /*#__PURE__*/
  function () {
    function ImageUtils() {
      _classCallCheck(this, ImageUtils);

      this.loadImage = this.loadImage;
    }

    _createClass(ImageUtils, [{
      key: "initImages",
      value: function initImages(data, mainCB, prevCB, errCB) {
        var _this = this;

        var progressBar = window.document.createElement("div");
        progressBar.classList.add("renderer-progressbar");
        data.element.appendChild(progressBar);

        var loadMain = function loadMain() {
          _this.loadImage(data.url, function (mainimg) {
            progressBar.style.opacity = 0;
            setTimeout(function () {
              var _p = window.document.querySelectorAll(".renderer-progressbar");

              if (_p) {
                for (var p = 0; p < _p.length; p++) {
                  data.element.removeChild(_p[p]);
                }
              }
            }, 600);
            mainCB(mainimg);
          }, function (prog) {
            data.instance.stats.previewProgress = prog;
            progressBar.style.width = prog + "%";
            data.instance.trigger("statsUpdate", data.instance.stats);
          }, function (err) {
            progressBar.style.opacity = 0;
            setTimeout(function () {
              var _p = window.document.querySelectorAll(".renderer-progressbar");

              if (_p) {
                for (var p = 0; p < _p.length; p++) {
                  data.element.removeChild(_p[p]);
                }
              }
            }, 600);

            if (errCB) {
              errCB(err);
            }
          });
        };

        var loadPreview = function loadPreview() {
          _this.loadImage(data.preview, function (previmg) {
            prevCB(previmg);
            data.instance.stats.previewProgress = 100;
            loadMain();
          }, function (prog) {
            data.instance.stats.previewProgress = prog;
            progressBar.style.width = prog + "%";
            data.instance.trigger("statsUpdate", data.instance.stats);
          }, function () {
            loadMain();
          });
        };

        if (data.preview) {
          loadPreview();
        } else {
          loadMain();
        }
      }
    }, {
      key: "canDoVr",
      value: function canDoVr() {
        return new Promise(function (resolve) {
          if (window.navigator.getVRDisplays) {
            try {
              window.navigator.getVRDisplays().then(function (displays) {
                if (displays.length > 0) {
                  var vrDisplay = displays[0];
                  return resolve(vrDisplay.capabilities.canPresent ? vrDisplay : false);
                }

                resolve(false);
              });
            } catch (e) {
              resolve(false);
            }
          } else {
            resolve(false);
          }
        });
      }
    }, {
      key: "loadImage",
      value: function loadImage(url, endCB, progressCB, errorCB) {
        var checkLoaded = function checkLoaded(_img) {
          if (_img.width) {
            endCB(_img);
          } else {
            (function (i) {
              setTimeout(function () {
                checkLoaded(i);
              }, 100);
            })(_img);
          }
        };

        var xmlHTTP = new window.XMLHttpRequest();
        xmlHTTP.open("GET", url, true);
        xmlHTTP.responseType = "arraybuffer";

        xmlHTTP.onload = function (e) {
          if (e.target.status === 200 && e.target.response.byteLength) {
            var blob = new window.Blob([e.target.response]);
            var uri = window.URL.createObjectURL(blob);
            var img = new window.Image();

            img.onload = function (e) {
              checkLoaded(e.target);
            };

            img.src = uri;
          } else if (errorCB) {
            errorCB(e.target.status);
          }
        };

        xmlHTTP.onerror = function (e) {
          if (errorCB) {
            errorCB(e.target.status);
          }
        };

        xmlHTTP.onprogress = function (e) {
          if (progressCB) {
            progressCB(parseInt(e.loaded / e.total * 100), function () {
              xmlHTTP.abort();
            });
          }
        };

        xmlHTTP.send();
      }
    }]);

    return ImageUtils;
  }();

  module.exports = new ImageUtils();
})();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var indexOf = __webpack_require__(6);

var Object_keys = function Object_keys(obj) {
  if (Object.keys) return Object.keys(obj);else {
    var res = [];

    for (var key in obj) {
      res.push(key);
    }

    return res;
  }
};

var forEach = function forEach(xs, fn) {
  if (xs.forEach) return xs.forEach(fn);else for (var i = 0; i < xs.length; i++) {
    fn(xs[i], i, xs);
  }
};

var defineProp = function () {
  try {
    Object.defineProperty({}, '_', {});
    return function (obj, name, value) {
      Object.defineProperty(obj, name, {
        writable: true,
        enumerable: false,
        configurable: true,
        value: value
      });
    };
  } catch (e) {
    return function (obj, name, value) {
      obj[name] = value;
    };
  }
}();

var globals = ['Array', 'Boolean', 'Date', 'Error', 'EvalError', 'Function', 'Infinity', 'JSON', 'Math', 'NaN', 'Number', 'Object', 'RangeError', 'ReferenceError', 'RegExp', 'String', 'SyntaxError', 'TypeError', 'URIError', 'decodeURI', 'decodeURIComponent', 'encodeURI', 'encodeURIComponent', 'escape', 'eval', 'isFinite', 'isNaN', 'parseFloat', 'parseInt', 'undefined', 'unescape'];

function Context() {}

Context.prototype = {};

var Script = exports.Script = function NodeScript(code) {
  if (!(this instanceof Script)) return new Script(code);
  this.code = code;
};

Script.prototype.runInContext = function (context) {
  if (!(context instanceof Context)) {
    throw new TypeError("needs a 'context' argument.");
  }

  var iframe = document.createElement('iframe');
  if (!iframe.style) iframe.style = {};
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  var win = iframe.contentWindow;
  var wEval = win.eval,
      wExecScript = win.execScript;

  if (!wEval && wExecScript) {
    // win.eval() magically appears when this is called in IE:
    wExecScript.call(win, 'null');
    wEval = win.eval;
  }

  forEach(Object_keys(context), function (key) {
    win[key] = context[key];
  });
  forEach(globals, function (key) {
    if (context[key]) {
      win[key] = context[key];
    }
  });
  var winKeys = Object_keys(win);
  var res = wEval.call(win, this.code);
  forEach(Object_keys(win), function (key) {
    // Avoid copying circular objects like `top` and `window` by only
    // updating existing context properties or new properties in the `win`
    // that was only introduced after the eval.
    if (key in context || indexOf(winKeys, key) === -1) {
      context[key] = win[key];
    }
  });
  forEach(globals, function (key) {
    if (!(key in context)) {
      defineProp(context, key, win[key]);
    }
  });
  document.body.removeChild(iframe);
  return res;
};

Script.prototype.runInThisContext = function () {
  return eval(this.code); // maybe...
};

Script.prototype.runInNewContext = function (context) {
  var ctx = Script.createContext(context);
  var res = this.runInContext(ctx);
  forEach(Object_keys(ctx), function (key) {
    context[key] = ctx[key];
  });
  return res;
};

forEach(Object_keys(Script.prototype), function (name) {
  exports[name] = Script[name] = function (code) {
    var s = Script(code);
    return s[name].apply(s, [].slice.call(arguments, 1));
  };
});

exports.createScript = function (code) {
  return exports.Script(code);
};

exports.createContext = Script.createContext = function (context) {
  var copy = new Context();

  if (_typeof(context) === 'object') {
    forEach(Object_keys(context), function (key) {
      copy[key] = context[key];
    });
  }

  return copy;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(4);

__webpack_require__(0);

__webpack_require__(10);

__webpack_require__(13);

__webpack_require__(15);

__webpack_require__(17);

__webpack_require__(19);

__webpack_require__(21);

__webpack_require__(23);

__webpack_require__(25);

__webpack_require__(27);

__webpack_require__(29);

__webpack_require__(31);

__webpack_require__(34);

__webpack_require__(43);

__webpack_require__(46);

__webpack_require__(51);

__webpack_require__(54);

__webpack_require__(63);

__webpack_require__(67);

__webpack_require__(70);

__webpack_require__(75);

__webpack_require__(78);

__webpack_require__(81);

__webpack_require__(83);

__webpack_require__(86);

__webpack_require__(89);

__webpack_require__(91);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(5);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _e = _interopRequireDefault(__webpack_require__(0));

__webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UiRecorder =
/*#__PURE__*/
function () {
  function UiRecorder(el) {
    var _this = this;

    _classCallCheck(this, UiRecorder);

    this.elemensToWatch = [];
    this.pageActions = [];
    this.eventsToWatch = ["mousemove", "mousedown", "mouseup", "mouseenter", "mouseleave", "mouseover", "mouseout", "keydown", "keyup", "input", "focus", "blur", "scroll"];
    this.el = el;
    this.update = this.update;
    this.recording = false;
    this.el.appendChild(_e.default.cleanHtml(__webpack_require__(8)));
    this.el.querySelector(".ui-record-button").addEventListener("mousedown", function () {
      _this.recording = true;
    });
    this.el.querySelector(".ui-stop-button").addEventListener("mousedown", function () {
      _this.recording = false;
    });
    this.el.querySelector(".ui-play-button").addEventListener("mousedown", function () {
      _this.recording = false; // var playback = eval(this.getPageActions())
      // console.log(playback)
    });
    this.el.querySelector(".ui-edit-button").addEventListener("mousedown", function () {
      _this.recording = false;

      _this.el.querySelector(".ui-edit-section").classList.toggle("active");

      _this.el.querySelector(".ui-edit-section").innerHTML = "";

      _this.el.querySelector(".ui-edit-section").appendChild(_e.default.cleanHtml(__webpack_require__(9)));
    });
    this.el.querySelector(".ui-export-button").addEventListener("mousedown", function () {
      _this.recording = false;

      _this.export();
    });
    Object.keys(window).forEach(function (key) {
      if (/on/.test(key)) {
        window.addEventListener(key.slice(2), function (event) {
          if (_this.recording && event.srcElement !== _this.el) {
            if (event.type === "scroll") {
              var scroll = {
                el: window.document,
                evt: event,
                type: event.type,
                time: new Date().getTime(),
                scrollPosition: {
                  x: window.scrollX,
                  y: window.scrollY
                }
              };

              if (_this.pageActions[_this.pageActions.length - 1] && _this.pageActions[_this.pageActions.length - 1].type === "scroll") {
                _this.pageActions[_this.pageActions.length - 1] = scroll;
              } else {
                _this.pageActions.push(scroll);
              }

              _e.default.setModel(null, "@E1UiRecorderService.pageActions", _this.pageActions);

              return;
            }

            if (_this.eventsToWatch.indexOf(event.type) > -1 && event.srcElement.tagName && !_this.el.contains(event.srcElement)) {
              var selector = "".concat(event.srcElement.tagName.toLowerCase());
              var index = 0;
              var els = window.document.querySelectorAll(selector);

              if (els.length > 1) {
                for (var i = 0; i < els.length; i++) {
                  if (els[i] === event.srcElement) {
                    index = i;
                    break;
                  }
                }
              }

              var data = {
                el: event.srcElement,
                evt: event,
                type: event.type,
                time: new Date().getTime(),
                selector: selector,
                index: index,
                value: event.srcElement.value
              };

              if (_this.pageActions[_this.pageActions.length - 1] && _this.pageActions[_this.pageActions.length - 1].type === event.type && _this.pageActions[_this.pageActions.length - 1].el === event.srcElement) {
                _this.pageActions[_this.pageActions.length - 1] = data;
              } else {
                _this.pageActions.push(data);
              }

              _e.default.setModel(null, "@E1UiRecorderService.pageActions", _this.pageActions);
            }
          }
        });
      }
    });

    _e.default.setModel(null, "@E1UiRecorderService.pageActions", this.pageActions);

    _e.default.setModel(null, "@E1UiRecorderService.delete", function (index) {
      _this.pageActions.splice(index, 1);

      _e.default.setModel(null, "@E1UiRecorderService.pageActions", _this.pageActions);
    });

    _e.default.setModel(null, "@E1UiRecorderService.highlight", function (index) {
      var action = _this.pageActions[index];
      var elBox = action.el.getBoundingClientRect();

      var highlighter = _this.el.querySelector(".ui-highlighter");

      highlighter.style.width = elBox.width + "px";
      highlighter.style.height = elBox.height + "px";
      highlighter.style.left = elBox.left + "px";
      highlighter.style.top = elBox.top + "px";
    });

    _e.default.setModel(null, "@E1UiRecorderService.unhighlight", function () {
      var highlighter = _this.el.querySelector(".ui-highlighter");

      highlighter.style.width = "0px";
      highlighter.style.height = "0px";
      highlighter.style.left = "0px";
      highlighter.style.top = "0px";
    });
  }

  _createClass(UiRecorder, [{
    key: "getPageActions",
    value: function getPageActions() {
      var result = "var evt;";
      var lastType = "";
      var lastEl = null;
      var lastTime = this.pageActions[0].time;
      var times = [];
      this.pageActions.forEach(function (action) {
        if (action.type === "scroll") {
          result += "setTimeout(function(){\n                    window.scrollTo(".concat(action.scrollPosition.x, ", ").concat(action.scrollPosition.y, ");\n                ");
          times.push(action.time - lastTime);
          lastTime = action.time;
          return;
        }

        if (action.type === "input") {
          result += "setTimeout(function(){\n                    window.document.querySelectorAll('".concat(action.selector, "')[").concat(action.index, "].value = \"").concat(action.value, "\"\n                    evt = new Event( \"input\", {});\n                    window.document.querySelectorAll('").concat(action.selector, "')[").concat(action.index, "].dispatchEvent(evt);\n                ");
          times.push(action.time - lastTime);
          lastTime = action.time;
          return;
        }

        times.push(action.time - lastTime);
        lastTime = action.time;
        lastType = action.type;
        lastEl = action.el;
        var type = action.evt instanceof window.MouseEvent ? "MouseEvent" : action.evt instanceof window.KeyboardEvent ? "KeyboardEvent" : action.evt instanceof window.WheelEvent ? "WheelEvent" : "Event";
        var evtType = action.type === "mouseover" ? "mouseenter" : action.type === "mouseout" ? "mouseleave" : action.type;
        result += "setTimeout(function(){\n                evt = new ".concat(type, "( \"").concat(evtType, "\", {\n                    bubbles: ").concat(action.evt.bubbles, ",\n                    cancelable: ").concat(action.evt.cancelable, ",\n                    clientX: ").concat(action.evt.clientX, ",\n                    clientY: ").concat(action.evt.clientY, ",\n                    layerX: ").concat(action.evt.layerX, ",\n                    layerY: ").concat(action.evt.layerY, ",\n                    pageX: ").concat(action.evt.pageX, ",\n                    pageY: ").concat(action.evt.pageY, ",\n                    x: ").concat(action.evt.x, ",\n                    y: ").concat(action.evt.y, ",\n                    screenX: ").concat(action.evt.screenX, ",\n                    screenY: ").concat(action.evt.screenY, ",\n                    which: ").concat(action.evt.which, "\n                });\n                window.document.querySelectorAll('").concat(action.selector, "')[").concat(action.index, "].dispatchEvent(evt);\n                ");
      });
      times.forEach(function (time) {
        result += "}, ".concat(time, ")\n            ");
      });
      return result;
    }
  }, {
    key: "export",
    value: function _export() {
      var playback = this.getPageActions();
      var file = new window.Blob([playback], {
        type: "text/javascript"
      });
      var a = window.document.createElement("a"),
          url = window.URL.createObjectURL(file);
      a.href = url;
      a.download = "test.js";
      window.document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        window.document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  }, {
    key: "update",
    value: function update() {}
  }]);

  return UiRecorder;
}();

_e.default.registerComponent("e1-ui-recorder", UiRecorder);

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var indexOf = [].indexOf;

module.exports = function (arr, obj) {
  if (indexOf) return arr.indexOf(obj);

  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }

  return -1;
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = "<div>\n    <div class=\"ui-recorder-wrapper\">\n        <div class=\"ui-recorder-inner\">\n            <button class=\"ui-record-button\">Record</button>\n            <button class=\"ui-stop-button\">Stop</button>\n            <button class=\"ui-play-button\">Play</button>\n            <button class=\"ui-edit-button\">Edit</button>\n            <button class=\"ui-export-button\">Export</button>\n        </div>\n    </div>\n    <div class=\"ui-edit-section\"></div>\n    <div class=\"ui-highlighter\"></div>\n</div>";

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "<div e1-repeat=\"@E1UiRecorderService.pageActions\" delimiter=\"$key\">\n    <div class=\"ui-action\">\n        <div class=\"ui-action-info\" onmouseenter=\"E1UiRecorderService.highlight($key)\" onmouseleave=\"E1UiRecorderService.unhighlight()\">\n            <span e1-content=\"@E1UiRecorderService.pageActions.$key.type\"></span>\n            <span> - </span>\n            <span e1-content=\"@E1UiRecorderService.pageActions.$key.selector\"></span>\n            <span> </span>\n            <span e1-content=\"@E1UiRecorderService.pageActions.$key.index\"></span>\n        </div>\n        <div class=\"ui-delete-action\" onclick=\"E1UiRecorderService.delete($key)\">\n            <e1-icon type=\"delete\"></e1-icon>\n        </div>\n    </div>\n</div>";

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(11);

__webpack_require__(12);

/***/ }),
/* 11 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _e = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AccordianToggle =
/*#__PURE__*/
function () {
  function AccordianToggle(el) {
    _classCallCheck(this, AccordianToggle);

    this.el = el;
    this.el["e1-accordian-toggle-onUpdate"] = this.update;
    this.setup();
  }

  _createClass(AccordianToggle, [{
    key: "setup",
    value: function setup() {
      var _this = this;

      var group = this.el.getAttribute("e1-accordian-toggle-group");
      this.el.addEventListener("mouseup", function () {
        var contentSection = window.document.querySelector("[e1-accordian-toggle-group=\"".concat(group, "\"][e1-accordian-content=\"").concat(_this.el.getAttribute("e1-accordian-toggle"), "\"]"));
        var activeTab = window.document.querySelector("[e1-accordian-toggle-group=\"".concat(group, "\"][e1-accordian-toggle].active-accordian"));
        var activeContent = window.document.querySelector("[e1-accordian-toggle-group=\"".concat(group, "\"][e1-accordian-content].active-accordian"));

        if (contentSection) {
          contentSection.classList.add("active-accordian");

          _this.el.classList.add("active-accordian");

          setTimeout(function () {
            contentSection.style.removeProperty("max-height");
          }, 3000);

          if (activeTab) {
            activeTab.classList.remove("active-accordian");
          }

          if (activeContent) {
            activeContent.classList.remove("active-accordian");
          }
        }
      });
    }
  }, {
    key: "update",
    value: function update() {}
  }]);

  return AccordianToggle;
}();

_e.default.registerAttribute("e1-accordian-toggle", AccordianToggle);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(14);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var E1 = __webpack_require__(0);

var E1Attribute =
/*#__PURE__*/
function () {
  function E1Attribute(el) {
    _classCallCheck(this, E1Attribute);

    this.el = el;
    this.el["e1-attribute-onUpdate"] = this.update;
    this.renderAttributes();
  }

  _createClass(E1Attribute, [{
    key: "renderAttributes",
    value: function renderAttributes() {
      var _this = this;

      var attrString = this.el.getAttribute("e1-attribute");
      var attributes = attrString.split("&&").map(function (c) {
        return c.trim();
      });
      attributes.forEach(function (attr) {
        var valueAttr = attr.split(":").map(function (c) {
          return c.trim();
        });

        if (valueAttr.length > 1) {
          var value = E1.getModel(null, valueAttr[0]);

          if (value) {
            _this.el.setAttribute(valueAttr[1], value);
          } else {
            _this.el.removeAttribute(valueAttr[1]);
          }
        }
      });
    }
  }, {
    key: "update",
    value: function update() {
      this.renderAttributes();
    }
  }]);

  return E1Attribute;
}();

E1.registerAttribute("e1-attribute", E1Attribute);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(16);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var E1 = __webpack_require__(0);

var E1Class =
/*#__PURE__*/
function () {
  function E1Class(el) {
    _classCallCheck(this, E1Class);

    this.el = el;
    this.el["e1-class-onUpdate"] = this.update;
    this.classes = [];
    this.renderClasses();
  }

  _createClass(E1Class, [{
    key: "renderClasses",
    value: function renderClasses() {
      var _this = this;

      var classString = this.el.getAttribute("e1-class");
      var classes = classString.split("&&").map(function (c) {
        return c.trim();
      });
      var classesQueue = [];
      classes.forEach(function (clss) {
        var conditional = clss.split("?").map(function (c) {
          return c.trim();
        });

        if (conditional.length > 1) {
          var cond = E1.getModel(null, conditional[0]);

          if (conditional[1].substring(0, 1) === "@") {
            conditional[1] = E1.getModel(null, conditional[1]);
          }

          if (cond) {
            if (classesQueue.indexOf(conditional[1]) === -1) {
              classesQueue.push(conditional[1]);
            }
          } else {
            if (classesQueue.indexOf(conditional[1]) > -1) {
              classesQueue.splice(classesQueue.indexOf(conditional[1]), 1);
            }
          }
        } else {
          var _clss = E1.getModel(null, conditional[0]);

          if (_clss) {
            classesQueue.push(_clss);
          }
        }
      });
      this.classes.forEach(function (clss) {
        if (classesQueue.indexOf(clss) === -1) {
          _this.el.classList.remove(clss);
        }
      });
      this.classes = classesQueue;
      this.classes.forEach(function (clss) {
        _this.el.classList.add(clss);
      });
    }
  }, {
    key: "update",
    value: function update() {
      this.renderClasses();
    }
  }]);

  return E1Class;
}();

E1.registerAttribute("e1-class", E1Class);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(18);

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var E1 = __webpack_require__(0);

var E1Content =
/*#__PURE__*/
function () {
  function E1Content(el) {
    _classCallCheck(this, E1Content);

    this.el = el;
    this.el["e1-content-onUpdate"] = this.update;
    this.content = E1.cleanHtml(E1.getModel(this.el, "e1-content"), this.el);
    this.el.innerHTML = "";

    if (this.content) {
      this.el.appendChild(this.content);
    }
  }

  _createClass(E1Content, [{
    key: "update",
    value: function update() {
      var content = E1.cleanHtml(E1.getModel(this.el, "e1-content"), this.el);

      if (content !== this.content) {
        this.content = content;
        this.el.innerHTML = "";

        if (this.content) {
          this.el.appendChild(this.content);
        }
      }
    }
  }]);

  return E1Content;
}();

E1.registerAttribute("e1-content", E1Content);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(20);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var E1 = __webpack_require__(0);

var E1If =
/*#__PURE__*/
function () {
  function E1If(el) {
    _classCallCheck(this, E1If);

    this.el = el;
    this.el["e1-if-onUpdate"] = this.update;
    this.parentNode = this.el.parentNode;
    this.index = Array.prototype.indexOf.call(this.el.parentNode.children, this.el);
    this.comment = window.document.createComment(this.el.getAttribute("component-id"));
    this.parentNode.insertBefore(this.comment, this.el);

    if (!this.check()) {
      this.parentNode.removeChild(this.el);
    }

    this.throttle = null;
  }

  _createClass(E1If, [{
    key: "check",
    value: function check() {
      var val = this.el.getAttribute("e1-if");
      var notBoundOrEmpty = val && val[0] !== "@" && val !== "null" && val !== "undefined" && val !== "false";
      return E1.isTruthy(this.el.getAttribute("e1-if")) || notBoundOrEmpty;
    }
  }, {
    key: "update",
    value: function update() {
      var _this = this;

      clearTimeout(this.throttle);
      this.throttle = setTimeout(function () {
        var check = _this.check();

        if (check && !_this.el.parentNode) {
          _this.parentNode.insertBefore(_this.el, _this.comment);
        } else if (!check && _this.parentNode.contains(_this.el)) {
          _this.parentNode.removeChild(_this.el);
        }
      }, 10);
    }
  }]);

  return E1If;
}();

E1.registerAttribute("e1-if", E1If);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(22);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _e = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var E1Proximity =
/*#__PURE__*/
function () {
  function E1Proximity(el) {
    _classCallCheck(this, E1Proximity);

    this.el = el;
    this.el["e1-proximity-onUpdate"] = this.update;
    this.dimension = "top";
    this.target = this.el.parentNode.tagName.toLowerCase() === "body" ? this.el.parentNode : this.el.parentNode.parentNode;
    this.targetDimension = "bottom";
    this.threshold = 0;
    this.isInProximity = false;

    this.inProximity = function () {};

    this.outProximity = function () {};

    this.update();
    var self = this;

    var next = function next() {
      self.check();
      window.requestAnimationFrame(next);
    };

    next();
  }

  _createClass(E1Proximity, [{
    key: "check",
    value: function check() {
      if (!this.target) {
        return;
      }

      var targetDimension = this.target.getBoundingClientRect()[this.targetDimension];
      var dimension = this.el.getBoundingClientRect()[this.dimension];
      var proximity = dimension - targetDimension;

      if (proximity < this.threshold && !this.isInProximity) {
        this.isInProximity = true;
        this.inProximity();
      } else if (proximity > this.threshold && this.isInProximity) {
        this.isInProximity = false;
        this.outProximity();
      }
    }
  }, {
    key: "update",
    value: function update() {
      var dimensionOtions = ["top", "bottom", "left", "right"];

      var dimension = _e.default.getModel(this.el, "e1-proximity");

      var target = _e.default.getModel(this.el, "e1-proximity-target");

      var targetDimension = _e.default.getModel(this.el, "e1-proximity-target-dimension");

      var threshold = _e.default.getModel(this.el, "e1-proximity-threshold");

      if (!isNaN(parseFloat(threshold))) {
        this.threshold = parseFloat(threshold);
      }

      if (dimension && dimensionOtions.indexOf(dimension.toLowerCase())) {
        this.dimension = dimension.toLowerCase();
      }

      if (targetDimension && dimensionOtions.indexOf(targetDimension.toLowerCase())) {
        this.targetDimension = targetDimension.toLowerCase();
      }

      if (target) {
        target = window.document.querySelector(target);

        if (target) {
          this.target = target;
        }
      }

      this.inProximity = _e.default.getModel(this.el, "e1-proximity-in", this.inProximity);
      this.outProximity = _e.default.getModel(this.el, "e1-proximity-out", this.outProximity);
    }
  }]);

  return E1Proximity;
}();

_e.default.registerAttribute("e1-proximity", E1Proximity);

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(24);

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var E1 = __webpack_require__(0);

var E1Repeat =
/*#__PURE__*/
function () {
  function E1Repeat(el) {
    _classCallCheck(this, E1Repeat);

    this.el = el;
    this.template = this.el.innerHTML;
    this.el["e1-repeat-onUpdate"] = this.update;
    this.update();
  }

  _createClass(E1Repeat, [{
    key: "update",
    value: function update() {
      var _this = this;

      var model = E1.getModel(this.el, "e1-repeat");
      this.el.innerHTML = "";

      if (model && model.length) {
        model.forEach(function (item, key) {
          var html = _this.template.split(_this.el.getAttribute("delimiter")).join(key);

          _this.el.innerHTML += html;
        });
      }
    }
  }]);

  return E1Repeat;
}();

E1.registerAttribute("e1-repeat", E1Repeat);

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(26);

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var E1 = __webpack_require__(0);

var E1Style =
/*#__PURE__*/
function () {
  function E1Style(el) {
    _classCallCheck(this, E1Style);

    this.el = el;
    this.el["e1-if-style"] = this.update;
    this.setStyles();
  }

  _createClass(E1Style, [{
    key: "setStyles",
    value: function setStyles() {
      var styles = this.el.getAttribute("e1-style").split("&&").map(function (i) {
        return i.trim();
      });
      var styleString = "";
      styles.forEach(function (style) {
        style = style.split(":").map(function (i) {
          return i.trim();
        });

        if (style.length === 2) {
          var styleVal = E1.getModel(null, style[0]);

          if (styleVal || styleVal === 0) {
            styleString += "".concat(style[1], ":").concat(styleVal, ";");
          }
        } else {
          styleString += E1.getModel(null, style[0]);
        }
      });

      if (styleString !== "") {
        this.el.setAttribute("style", styleString);
      } else {
        this.el.removeAttribute("style");
      }
    }
  }, {
    key: "update",
    value: function update() {
      this.setStyles();
    }
  }]);

  return E1Style;
}();

E1.registerAttribute("e1-style", E1Style);

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28);

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _e = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var E1Show =
/*#__PURE__*/
function () {
  function E1Show(el) {
    _classCallCheck(this, E1Show);

    this.el = el;
    this.el["e1-show-onUpdate"] = this.update;
    this.throttle = null;
    this.update();
  }

  _createClass(E1Show, [{
    key: "check",
    value: function check() {
      var val = this.el.getAttribute("e1-show");
      var notBoundOrEmpty = val && val[0] !== "@" && val !== "null" && val !== "undefined" && val !== "false";
      return _e.default.isTruthy(this.el.getAttribute("e1-show")) || notBoundOrEmpty;
    }
  }, {
    key: "update",
    value: function update() {
      var _this = this;

      clearTimeout(this.throttle);
      this.throttle = setTimeout(function () {
        if (_this.check()) {
          _this.el.style.removeProperty("display");
        } else {
          _this.el.style.display = "none";
        }
      }, 10);
    }
  }]);

  return E1Show;
}();

_e.default.registerAttribute("e1-show", E1Show);

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30);

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var E1 = __webpack_require__(0);

var E1Value =
/*#__PURE__*/
function () {
  function E1Value(el) {
    var _this = this;

    _classCallCheck(this, E1Value);

    this.el = el;
    this.el["e1-value-onUpdate"] = this.update;

    if ((this.el.value || this.el.checked && this.el.type === "checkbox" || this.el.innerHTML && this.el.tagName.toLowerCase() === "textarea") && E1.getModel(this.el, "e1-value", undefined) === undefined) {
      this.value = this.el.value;

      if (this.el.type === "checkbox") {
        this.value = true;
      }

      if (this.el.tagName.toLowerCase() === "textarea") {
        this.value = this.el.innerHTML;
      }

      E1.setModel(this.el, "e1-value", this.value);
    }

    this.setValue();

    if (this.el.type === "checkbox") {
      this.el.addEventListener("click", function () {
        E1.setModel(_this.el, "e1-value", _this.el.checked);
      });
      return;
    }

    this.el.addEventListener("input", function () {
      _this.value = _this.el.value;

      if (_this.valueType === "array" || _this.valueType === "object") {
        try {
          _this.value = JSON.parse(_this.el.value);
        } catch (err) {}
      }

      E1.setModel(_this.el, "e1-value", _this.value);
    });
  }

  _createClass(E1Value, [{
    key: "typeOfValue",
    value: function typeOfValue(val) {
      try {
        val = JSON.parse(val);
      } catch (e) {}

      if (val === undefined) {
        return "undefined";
      }

      if (val === null) {
        return "null";
      }

      if (val === true || val === false) {
        return "boolean";
      }

      if (typeof val === "number") {
        return "number";
      }

      if (Object.prototype.toString.call(val) === "[object Date]" || val.indexOf && val.indexOf(":") > -1 && new Date(val) !== "Invalid Date" && !isNaN(new Date(val))) {
        return "date";
      }

      if (typeof val === "string") {
        return "string";
      }

      var string = {}.toString.apply(val);

      if (string === "[object Array]") {
        return "array";
      }

      if (string === "[object Object]") {
        return "object";
      }

      if (string === "[object Function]") {
        return "function";
      }

      return;
    }
  }, {
    key: "setValue",
    value: function setValue() {
      this.el.setAttribute("value", E1.getModel(this.el, "e1-value"));
      this.value = E1.getModel(this.el, "e1-value");
      this.valueType = this.typeOfValue(this.value);

      if (this.valueType === "array" || this.valueType === "object") {
        try {
          this.value = JSON.stringify(this.value);
        } catch (err) {}
      }

      if (this.el.type === "text" && this.value !== undefined && this.value !== null) {
        this.value = this.value.toString();
      }

      if (this.el.nodeName.toLowerCase() === "textarea") {
        this.el.innerHTML = this.value;
      }

      if (this.el.type === "number" && this.value !== undefined && this.value !== null) {
        this.value = parseFloat(this.value);
      }

      if (this.el.type === "checkbox") {
        if (this.value) {
          this.el.checked = true;
          this.el.removeAttribute("value");
        } else {
          this.el.checked = false;
          this.el.removeAttribute("value");
        }
      }

      this.el.value = this.value;
    }
  }, {
    key: "update",
    value: function update() {
      this.setValue();
    }
  }]);

  return E1Value;
}();

E1.registerAttribute("e1-value", E1Value);

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(32);

__webpack_require__(33);

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var E1 = __webpack_require__(0);

var Collapse =
/*#__PURE__*/
function () {
  function Collapse(el) {
    _classCallCheck(this, Collapse);

    this.el = el;
    this.update = this.update;
    this.collapse = parseFloat(E1.getModel(this.el, "collapse", 300));
    this.target = window.document.querySelector(E1.getModel(this.el, "target", "[component-id=".concat(this.el.getAttribute("component-id"), "]")));
    this.toggle = this.el.querySelector('[e1-collapse-toggle]');
    this.content = this.el.querySelector('[e1-collapse-content]');

    if (!this.toggle) {
      this.toggle = window.document.createElement("div");
      this.toggle.setAttribute("e1-collapse-toggle", "");
      this.toggle.appendChild(E1.cleanHtml('<e1-icon type="down"></e1-icon>'));
    }

    if (!this.content) {
      this.content = window.document.createElement("div");
      this.content.setAttribute("e1-collapse-content", "");
      this.content.innerHTML = this.el.innerHTML;
    }

    this.el.innerHTML = "";
    this.el.appendChild(this.toggle);
    this.el.appendChild(this.content);
    var self = this;
    var isMobile = /iPad|iPhone|iPod|Android/.test(window.navigator.userAgent);

    var click = function click() {
      self.el.classList.toggle("open");
    };

    if (isMobile) {
      this.toggle.addEventListener("touch", click);
    } else {
      this.toggle.addEventListener("click", click);
    }

    var next = function next() {
      self.check();
      window.requestAnimationFrame(next);
    };

    next();
  }

  _createClass(Collapse, [{
    key: "check",
    value: function check() {
      if (!this.target) {
        return;
      }

      if (this.target.getBoundingClientRect().width > this.collapse) {
        this.el.classList.remove("collapse");
      } else {
        this.el.classList.add("collapse");
      }
    }
  }, {
    key: "update",
    value: function update() {
      this.collapse = parseFloat(E1.getModel(this.el, "collapse", 300));
      this.target = window.document.querySelector(E1.getModel(this.el, "target", "[component-id=".concat(this.el.getAttribute("component-id"), "]")));
    }
  }]);

  return Collapse;
}();

E1.registerComponent("e1-collapse", Collapse);

/***/ }),
/* 33 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(35);

__webpack_require__(36);

__webpack_require__(38);

__webpack_require__(39);

__webpack_require__(40);

__webpack_require__(42);

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var E1 = __webpack_require__(0);

var ColorPickerService =
/*#__PURE__*/
function () {
  function ColorPickerService() {
    _classCallCheck(this, ColorPickerService);

    this.hues = [75, 85, 95, 105, 115, 125, 135, 145, 155, 165, 175, 185, 195, 205, 215, 225, 235, 245, 255, 265, 275, 285, 295, 305, 315, 325, 335, 345, 355, 5, 15, 25, 35, 45, 55, 65]; // 36 values of hue degrees used on the color wheel background

    this.formats = ["HSL", "HEX", "RGB"];
    this.pickers = {};
  }

  _createClass(ColorPickerService, [{
    key: "hueLightFromPoint",
    value: function hueLightFromPoint(e, wheel) {
      /* Get color wheel dimensions */
      var rect = wheel.getBoundingClientRect();
      var radius = rect.width / 2;
      var left = rect.left;
      var top = rect.top;
      /* Color wheel center points */

      var cx = radius + left;
      var cy = radius + top;
      /* Mouse position distance from color wheel center */

      var dx = e.pageX - cx;
      var dy = e.pageY - cy;
      /* Hue degrees */

      var angle = Math.atan2(dy, dx) * (180 / Math.PI);
      var degrees = angle;

      if (degrees < 0) {
        degrees = degrees + 360;
      }
      /* Lightness */


      var absoluteX = Math.abs(dx);
      var absoluteY = Math.abs(dy);
      var lightness = Math.round(100 - Math.sqrt(absoluteX * absoluteX + absoluteY * absoluteY) * 100 / radius);
      return {
        h: Math.round(degrees) > -1 || Math.round(degrees) < 360 ? Math.round(degrees) : 0,
        l: lightness > -1 ? lightness < 101 ? lightness : 100 : 0
      };
    }
  }, {
    key: "radialXY",
    value: function radialXY(h, l, wheel) {
      /* Get color wheel dimensions */
      var rect = wheel.getBoundingClientRect();
      var outerRadius = rect.width / 2;
      var radius = outerRadius * ((100 - l) / 100);
      var degrees = h;
      var x = outerRadius + radius * Math.cos(degrees * Math.PI / 180);
      var y = outerRadius * 2 - (outerRadius + -(radius * Math.sin(degrees * Math.PI / 180)));
      return {
        x: x,
        y: y
      };
    }
  }, {
    key: "validHex",
    value: function validHex(data) {
      var chars = data.split('');

      if (chars[0] === '#') {
        chars.shift();
      }

      if (chars.length === 3) {
        chars = chars.concat(chars);
      }

      data = '#' + chars.join('');
      return data;
    }
  }, {
    key: "getFormat",
    value: function getFormat(str) {
      if (str.indexOf('#') > -1) {
        return "hex";
      }

      if (str.indexOf('hsla') > -1) {
        return "hsla";
      }

      if (str.indexOf('hsl') > -1) {
        return "hsl";
      }

      if (str.indexOf('rgba') > -1) {
        return "rgba";
      }

      if (str.indexOf('rgb') > -1) {
        return "rgb";
      }

      if (str.indexOf('transparent') > -1) {
        return "transparent";
      }

      return null;
    }
    /* Converts any str to all possible values */

  }, {
    key: "convert",
    value: function convert(str) {
      var result,
          type = this.getFormat(str);

      switch (type) {
        case "hex":
          str = this.validHex(str);
          result = this.hexToRgb(str);
          result = Object.assign(result, this.rgbToHsl(result));
          result.a = result.a || 1;
          result.hex = str;
          return result;

        case "hsla":
          str = str.split('(')[1];
          str = str.substring(0, str.length - 1);
          str = str.split(',');
          result = {
            h: parseInt(str[0]),
            s: parseInt(str[1]),
            l: parseInt(str[2]),
            a: parseFloat(str[3])
          };
          result = Object.assign(result, this.hslToRgb(result));
          result.hex = this.rgbToHex(result);
          return result;

        case "hsl":
          str = str.split('(')[1];
          str = str.substring(0, str.length - 1);
          str = str.split(',');
          result = {
            h: parseInt(str[0]),
            s: parseInt(str[1]),
            l: parseInt(str[2])
          };
          result = Object.assign(result, this.hslToRgb(result));
          result.a = 1;
          result.hex = this.rgbToHex(result);
          return result;

        case "rgba":
          str = str.split('(')[1];
          str = str.substring(0, str.length - 1);
          str = str.split(',');
          result = {
            r: parseInt(str[0]),
            g: parseInt(str[1]),
            b: parseInt(str[2]),
            a: parseFloat(str[3])
          };
          result = Object.assign(result, this.rgbToHsl(result));
          result.hex = this.rgbToHex(result);
          return result;

        case "rgb":
          str = str.split('(')[1];
          str = str.substring(0, str.length - 1);
          str = str.split(',');
          result = {
            r: parseInt(str[0]),
            g: parseInt(str[1]),
            b: parseInt(str[2])
          };
          result = Object.assign(result, this.rgbToHsl(result));
          result.a = 1;
          result.hex = this.rgbToHex(result);
          return result;

        default:
          return {
            h: 0,
            s: 0,
            l: 0,
            a: 0,
            r: 0,
            g: 0,
            b: 0,
            hex: "#000000"
          };
      }
    }
  }, {
    key: "hexToRgb",
    value: function hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex) || /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? result.length === 4 ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: parseInt(result[4], 8) / 100
      } : null;
    }
  }, {
    key: "rgbToHsl",
    value: function rgbToHsl(rgb) {
      var r = rgb.r / 255;
      var g = rgb.g / 255;
      var b = rgb.b / 255;
      var max = Math.max(r, g, b),
          min = Math.min(r, g, b);
      var h,
          s,
          l = (max + min) / 2;

      if (max === min) {
        h = s = 0; // achromatic
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;

          case g:
            h = (b - r) / d + 2;
            break;

          case b:
            h = (r - g) / d + 4;
            break;
        }

        h /= 6;
      }

      if (isNaN(h)) {
        h = 0;
      }

      return {
        h: Math.round(h * 360 * 100) / 100,
        s: Math.round(s * 100 * 100) / 100,
        l: Math.round(l * 100 * 100) / 100
      };
    }
  }, {
    key: "hslToRgb",
    value: function hslToRgb(hsl) {
      var h = hsl.h;
      var s = hsl.s;
      var l = hsl.l;
      var r, g, b, m, c, x;

      if (!isFinite(h)) {
        h = 0;
      }

      if (!isFinite(s)) {
        s = 0;
      }

      if (!isFinite(l)) {
        l = 0;
      }

      h /= 60;

      if (h < 0) {
        h = 6 - -h % 6;
      }

      h %= 6;
      s = Math.max(0, Math.min(1, s / 100));
      l = Math.max(0, Math.min(1, l / 100));
      c = (1 - Math.abs(2 * l - 1)) * s;
      x = c * (1 - Math.abs(h % 2 - 1));

      if (h < 1) {
        r = c;
        g = x;
        b = 0;
      } else if (h < 2) {
        r = x;
        g = c;
        b = 0;
      } else if (h < 3) {
        r = 0;
        g = c;
        b = x;
      } else if (h < 4) {
        r = 0;
        g = x;
        b = c;
      } else if (h < 5) {
        r = x;
        g = 0;
        b = c;
      } else {
        r = c;
        g = 0;
        b = x;
      }

      m = l - c / 2;
      r = Math.round((r + m) * 255);
      g = Math.round((g + m) * 255);
      b = Math.round((b + m) * 255);
      return {
        r: r,
        g: g,
        b: b
      };
    }
  }, {
    key: "intToHex",
    value: function intToHex(i) {
      var hex = parseInt(i).toString(16);
      return hex.length < 2 ? "0" + hex : hex;
    }
  }, {
    key: "rgbToHex",
    value: function rgbToHex(rgb) {
      var result = '#' + this.intToHex(rgb.r) + this.intToHex(rgb.g) + this.intToHex(rgb.b);

      if (rgb.hasOwnProperty("a") && rgb.a < 1) {
        result += this.intToHex(rgb.a * 255);
      }

      return result;
    }
  }]);

  return ColorPickerService;
}();

E1.registerService("ColorPickerService", new ColorPickerService());

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var E1 = __webpack_require__(0);

var wheelHtml = __webpack_require__(37);

var ColorWheel =
/*#__PURE__*/
function () {
  function ColorWheel(el) {
    var _this = this;

    _classCallCheck(this, ColorWheel);

    this.el = el;
    this.update = this.update;
    this.el.innerHTML = wheelHtml;
    this.picker = E1.getModel(this.el, "picker");

    this.el.updateColor = function () {
      _this.update();
    };

    var dragging = false;

    var mouseMove = function mouseMove(e) {
      if (!dragging) {
        return;
      }

      var hueLight = E1.services.ColorPickerService.hueLightFromPoint(e, _this.el.querySelector(".c-ckolor__wheel-value"));
      _this.picker.values = E1.services.ColorPickerService.convert("hsla(".concat(hueLight.h, ", ").concat(_this.picker.values.s, "%, ").concat(hueLight.l, "%, ").concat(_this.picker.values.a, ")"));
      E1.setModel(null, "@ColorPickerService.pickers.".concat(_this.picker.name, ".values"), _this.picker.values);

      _this.update();
    };

    var clear = function clear() {
      dragging = false;

      _this.el.removeEventListener("mousemove", mouseMove);
    };

    this.el.addEventListener("mousedown", function (e) {
      e.preventDefault();
      dragging = true;
      mouseMove(e);

      _this.el.addEventListener("mousemove", mouseMove);
    });
    this.el.addEventListener("mouseleave", function () {
      clear();
    });
    window.document.addEventListener("mouseup", function () {
      clear();
    });
    window.document.addEventListener("mouseleave", function () {
      clear();
    });
    window.requestAnimationFrame(function () {
      _this.update();
    });
    E1.subscribe("@ColorPickerService.pickers.".concat(this.picker.name, ".values"), function () {
      _this.update();
    });
  }

  _createClass(ColorWheel, [{
    key: "update",
    value: function update() {
      var _this2 = this;

      window.requestAnimationFrame(function () {
        var scoop = _this2.el.querySelector(".c-ckolor__wheel-scoop");

        var hues = _this2.el.querySelectorAll(".c-ckolor__wheel-color-inner2");

        var h = E1.getModel(_this2.el, "picker").values.h;
        var s = E1.getModel(_this2.el, "picker").values.s;
        var l = E1.getModel(_this2.el, "picker").values.l;
        var radialPoints = E1.services.ColorPickerService.radialXY(h, l, _this2.el.querySelector(".c-ckolor__wheel-value"));

        for (var i = 0; i < hues.length; i++) {
          var color = "hsl(".concat(E1.services.ColorPickerService.hues[i], ", ").concat(s, "%, 50%)");
          hues[i].style.backgroundColor = color;
        }

        scoop.style.backgroundColor = "hsl(".concat(h, ", ").concat(s, "%, ").concat(l, "%)");
        scoop.style.left = radialPoints.x + "px";
        scoop.style.top = radialPoints.y + "px";
      });
    }
  }]);

  return ColorWheel;
}();

E1.registerComponent("e1-color-wheel", ColorWheel);

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = "<div class=\"c-ckolor__wheel\">\n    <div class=\"c-ckolor__wheel-colors\">\n        <div e1-repeat=\"@ColorPickerService.hues\" delimiter=\"$index\">\n            <div class=\"c-ckolor__wheel-color\">\n                <div class=\"c-ckolor__wheel-color-inner1\">\n                    <div class=\"c-ckolor__wheel-color-inner2\"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"c-ckolor__wheel-value\">\n        <span class=\"c-ckolor__wheel-scoop\"></span>\n    </div>\n</div>";

/***/ }),
/* 38 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _e = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ColorSSlider =
/*#__PURE__*/
function () {
  function ColorSSlider(el) {
    var _this = this;

    _classCallCheck(this, ColorSSlider);

    this.el = el;
    this.update = this.update;
    this.el.innerHTML = "<div class=\"input-range\"><div class=\"input-range-handle\"></div></div>";
    this.picker = _e.default.getModel(this.el, "picker");
    this.key = _e.default.getModel(this.el, "key");
    this.max = parseInt(_e.default.getModel(this.el, "max"));
    var dragging = false;

    var mouseMove = function mouseMove(e) {
      if (!dragging) {
        return;
      }

      var box = _this.el.getBoundingClientRect();

      var val = (e.pageX - box.left) / box.width * 100;
      val = val < 0 ? 0 : val > 100 ? 100 : val;
      val = val ? val / 100 * _this.max : val;
      _this.picker.values[_this.key] = val;

      if (["h", "s", "l"].indexOf(_this.key) > -1) {
        _this.picker.values = _e.default.services.ColorPickerService.convert("hsla(".concat(_this.picker.values.h, ", ").concat(_this.picker.values.s, ", ").concat(_this.picker.values.l, ", ").concat(_this.picker.values.a, ")"));
      } else {
        _this.picker.values = _e.default.services.ColorPickerService.convert("rgba(".concat(_this.picker.values.r, ", ").concat(_this.picker.values.g, ", ").concat(_this.picker.values.b, ", ").concat(_this.picker.values.a, ")"));
      }

      _e.default.setModel(null, "@ColorPickerService.pickers.".concat(_this.picker.name), _this.picker);
    };

    var clear = function clear() {
      dragging = false;
      window.document.removeEventListener("mousemove", mouseMove);
    };

    this.el.addEventListener("mousedown", function (e) {
      e.preventDefault();
      dragging = true;
      mouseMove(e);
      window.document.addEventListener("mousemove", mouseMove);
    });
    this.el.addEventListener("mouseleave", function () {
      clear();
    });
    window.document.addEventListener("mouseup", function () {
      clear();
    });
    window.document.addEventListener("mouseleave", function () {
      clear();
    });

    _e.default.subscribe("@ColorPickerService.pickers.".concat(this.picker.name, ".values"), function () {
      _this.update();
    });

    window.requestAnimationFrame(function () {
      _this.update();
    });
  }

  _createClass(ColorSSlider, [{
    key: "update",
    value: function update() {
      this.key = _e.default.getModel(this.el, "key");
      this.max = parseInt(_e.default.getModel(this.el, "max"));
      var handle = this.el.querySelector(".input-range-handle");
      handle.style.left = "calc(".concat(this.picker.values[this.key] / this.max * 100, "% - ").concat(handle.offsetWidth / 2, "px)");
      var rangeBg;

      if (this.key === "a") {
        rangeBg = "linear-gradient(to right, hsla(".concat(this.picker.values.h, ", ").concat(this.picker.values.s, "%, ").concat(this.picker.values.l, "%, 0), hsla(").concat(this.picker.values.h, ", ").concat(this.picker.values.s, "%, ").concat(this.picker.values.l, "%, 1) 100%)");
      } else {
        rangeBg = "linear-gradient(to right, hsl(".concat(this.picker.values.h, ", 0%, ").concat(this.picker.values.l, "%), hsl(").concat(this.picker.values.h, ", 100%, ").concat(this.picker.values.l, "%) 100%)");
      }

      var range = this.el.querySelector(".input-range");
      range.style.background = rangeBg;
    }
  }]);

  return ColorSSlider;
}();

_e.default.registerComponent("e1-color-slider", ColorSSlider);

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _e = _interopRequireDefault(__webpack_require__(0));

var _colorpicker = _interopRequireDefault(__webpack_require__(41));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Colorpicker =
/*#__PURE__*/
function () {
  function Colorpicker(el) {
    var _this = this;

    _classCallCheck(this, Colorpicker);

    this.el = el;
    this.update = this.update;
    this.color = _e.default.getModel(el, "color");
    this.updateTimer = null;
    this.picker = {
      name: this.el.getAttribute("component-id"),
      modal: {
        active: false,
        content: "color"
      },
      values: _e.default.services.ColorPickerService.convert(this.color),
      type: _e.default.services.ColorPickerService.getFormat(this.color) ? _e.default.services.ColorPickerService.getFormat(this.color).split("a").join("").toUpperCase() : _e.default.services.ColorPickerService.formats[0]
    };
    _e.default.services.ColorPickerService.pickers[this.picker.name] = this.picker;
    this.el.innerHTML = _colorpicker.default.split("{{colorAttr}}").join(this.el.getAttribute("color")).split("{{picker}}").join(this.picker.name);
    var input = this.el.querySelector(".color-result");
    var modalInputs = this.el.querySelectorAll(".colorpicker-modal input");
    var saveButton = this.el.querySelector(".save-color");
    var cancelButton = this.el.querySelector(".cancel-color");
    saveButton.addEventListener("click", function () {
      if (_this.picker.type.label === "HEX") {
        _this.color = _this.picker.values.hex;
      } else {
        var start = _this.picker.type.label === "HSL" ? "hsl(" : "rgb(";
        var end = ")";

        if (_this.picker.values.a !== 1) {
          start = _this.picker.type.label === "HSL" ? "hsla(" : "rgba(";
          end = ", ".concat(_this.picker.values.a, ")");
        }

        _this.color = start + (_this.picker.type.label === "HSL" ? "".concat(_this.picker.values.h, ", ").concat(_this.picker.values.s, "%, ").concat(_this.picker.values.l, "%") : "".concat(_this.picker.values.r, ", ").concat(_this.picker.values.g, ", ").concat(_this.picker.values.b)) + end;
      }

      if (!window.localStorage.getItem("ColorpickerColors")) {
        window.localStorage.setItem("ColorpickerColors", JSON.stringify([]));
      }

      var local = JSON.parse(window.localStorage.getItem("ColorpickerColors"));
      local.push(_this.color);

      if (local.length > 21) {
        local.shift();
      }

      window.localStorage.setItem("ColorpickerColors", JSON.stringify(local));

      _e.default.setModel(el, "color", _this.color);

      _e.default.setModel(null, "@ColorPickerService.previousColors", local);

      _e.default.setModel(null, "@ColorPickerService.pickers.".concat(_this.picker.name, ".modal.active"), false);
    });
    cancelButton.addEventListener("click", function () {
      _e.default.setModel(null, "@ColorPickerService.pickers.".concat(_this.picker.name, ".modal.active"), false);
    });
    input.addEventListener("click", function () {
      input.blur();

      _e.default.setModel(null, "@ColorPickerService.pickers.".concat(_this.picker.name, ".modal.active"), true);

      setTimeout(function () {
        _e.default.setModel(null, "@ColorPickerService.pickers.".concat(_this.picker.name, ".values"), _this.picker.values);
      }, 10);
    });

    var handleInput = function handleInput(modalInput) {
      modalInput.addEventListener("input", function (e) {
        var key = e.target.getAttribute("color");
        var val = e.target.value;
        var str = "";

        if (key === "hex" && (!val || val.length < 7)) {
          return;
        }

        if (!val) {
          val = 0;
        }

        if (key === "hex") {
          str = _e.default.services.ColorPickerService.validHex(val);
        } else {
          _this.picker.values[key] = val;
        }

        if (key === "r" || key === "g" || key === "b" || key === "a") {
          str = "rgba(".concat(_this.picker.values.r, ", ").concat(_this.picker.values.g, ", ").concat(_this.picker.values.b, ", ").concat(_this.picker.values.a, ")");
        }

        if (key === "h" || key === "s" || key === "l") {
          str = "hsla(".concat(_this.picker.values.h, ", ").concat(_this.picker.values.s, "%, ").concat(_this.picker.values.l, "%, ").concat(_this.picker.values.a, ")");
        }

        _this.picker.values = _e.default.services.ColorPickerService.convert(str);

        _e.default.setModel(null, "@ColorPickerService.pickers.".concat(_this.picker.name, ".values"), _this.picker.values);

        _this.updateColorSample();
      });
    };

    for (var i = 0; i < modalInputs.length; i++) {
      handleInput(modalInputs[i]);
    }

    _e.default.subscribe("@ColorPickerService.pickers.".concat(this.picker.name, ".values"), function () {
      _this.updateColorSample();
    });

    this.updateColorSample();

    _e.default.setModel(null, "@ColorPickerService.previousColors", JSON.parse(window.localStorage.getItem("ColorpickerColors")) || []);

    window.addEventListener("resize", function () {
      _e.default.setModel(null, "@ColorPickerService.pickers.".concat(_this.picker.name, ".values"), _this.picker.values);
    });
  }

  _createClass(Colorpicker, [{
    key: "updateColorSample",
    value: function updateColorSample() {
      if (this.el.querySelector(".color-sample")) {
        this.el.querySelector(".color-sample").style.background = "hsla(".concat(this.picker.values.h, ", ").concat(this.picker.values.s, "%, ").concat(this.picker.values.l, "%, ").concat(this.picker.values.a, ")");
      }
    }
  }, {
    key: "update",
    value: function update() {
      this.color = _e.default.getModel(this.el, "color");
      this.picker.values = _e.default.services.ColorPickerService.convert(this.color);

      _e.default.setModel(null, "@ColorPickerService.pickers.".concat(this.picker.name, ".values"), this.picker.values);

      this.el.querySelector("e1-color-wheel").updateColor();
      this.updateColorSample();
    }
  }]);

  return Colorpicker;
}();

_e.default.registerComponent("e1-colorpicker", Colorpicker);

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = "<div class=\"color-picker-wrapper\">\n    <div class=\"colorpicker-modal\" e1-show=\"@ColorPickerService.pickers.{{picker}}.modal.active\" style=\"display:none;\">\n        <div class=\"colorpicker-inner\">\n            <div class=\"color-left\">\n                <e1-color-wheel picker=\"@ColorPickerService.pickers.{{picker}}\"></e1-color-wheel>\n            </div>\n            <div class=\"color-right\">\n                <e1-color-slider picker=\"@ColorPickerService.pickers.{{picker}}\" key=\"s\" max=100></e1-color-slider>\n                <e1-color-slider picker=\"@ColorPickerService.pickers.{{picker}}\" key=\"a\" max=1></e1-color-slider>\n                <div class=\"colorpicker-inputs\">\n                    <div class=\"format-selector\">\n                        <label>Format</label>\n                        <e1-select options=\"@ColorPickerService.formats\" value=\"@ColorPickerService.pickers.{{picker}}.type\"></e1-select>\n                    </div>\n                    <div class=\"color-inputs\">\n                        <div e1-show=\"@ColorPickerService.pickers.{{picker}}.type.label === 'HEX'\">\n                            <label>HEX</label>\n                            <input class=\"color-input hex\" type=\"text\" color=\"hex\" e1-value=\"@ColorPickerService.pickers.{{picker}}.values.hex\">\n                        </div>\n                        <div e1-show=\"@ColorPickerService.pickers.{{picker}}.type.label === 'HSL'\">\n                            <label>H</label>\n                            <input class=\"color-input\" type=\"number\" color=\"h\" e1-value=\"@ColorPickerService.pickers.{{picker}}.values.h\" min=0 max=359>\n                        </div>\n                        <div e1-show=\"@ColorPickerService.pickers.{{picker}}.type.label === 'HSL'\">\n                            <label>S</label>\n                            <input class=\"color-input\" type=\"number\" color=\"s\" e1-value=\"@ColorPickerService.pickers.{{picker}}.values.s\" min=0 max=100>\n                        </div>\n                        <div e1-show=\"@ColorPickerService.pickers.{{picker}}.type.label === 'HSL'\">\n                            <label>L</label>\n                            <input class=\"color-input\" type=\"number\" color=\"l\" e1-value=\"@ColorPickerService.pickers.{{picker}}.values.l\" min=0 max=100>\n                        </div>\n                        <div e1-show=\"@ColorPickerService.pickers.{{picker}}.type.label === 'RGB'\">\n                            <label>R</label>\n                            <input class=\"color-input\" type=\"number\" color=\"r\" e1-value=\"@ColorPickerService.pickers.{{picker}}.values.r\" min=0 max=255>\n                        </div>\n                        <div e1-show=\"@ColorPickerService.pickers.{{picker}}.type.label === 'RGB'\">\n                            <label>G</label>\n                            <input class=\"color-input\" type=\"number\" color=\"g\" e1-value=\"@ColorPickerService.pickers.{{picker}}.values.g\" min=0 max=255>\n                        </div>\n                        <div e1-show=\"@ColorPickerService.pickers.{{picker}}.type.label === 'RGB'\">\n                            <label>B</label>\n                            <input class=\"color-input\" type=\"number\" color=\"b\" e1-value=\"@ColorPickerService.pickers.{{picker}}.values.b\" min=0 max=255>\n                        </div>\n                        <div e1-show=\"@ColorPickerService.pickers.{{picker}}.type.label !== 'HEX' && @ColorPickerService.pickers.{{picker}}.values.a !== 1\">\n                            <label>A</label>\n                            <input class=\"color-input\" type=\"number\" color=\"a\" e1-value=\"@ColorPickerService.pickers.{{picker}}.values.a\" min=0 max=1\n                                step=\"0.01\">\n                        </div>\n                    </div>\n                </div>\n                <div class=\"colorpicker-inputs bottom\">\n                    <div class=\"color-sample\"></div>\n                    <div class=\"colorpicker-buttons\">\n                        <div>\n                            <button class=\"save-color\">\n                                <span class=\"btn-spacer\">W</span>\n                                <e1-icon type=\"check\" class=\"color-button\"></e1-icon>\n                            </button>\n                        </div>\n                        <div>\n                            <button class=\"cancel-color\">\n                                <span class=\"btn-spacer\">W</span>\n                                <e1-icon type=\"close\" class=\"color-button\"></e1-icon>\n                            </button>\n                        </div>\n                    </div>\n                </div>\n    \n                <div class=\"previous-colors\" e1-repeat=\"@ColorPickerService.previousColors\" delimiter=\"$key\">\n                    <div class=\"previous-color\" e1-style=\"@ColorPickerService.previousColors.$key:background-color\" onclick=\"E1.setModel(null, '{{colorAttr}}', '@ColorPickerService.previousColors.$key')\"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <input readonly class=\"color-result\" type=\"text\" e1-value=\"{{colorAttr}}\">\n    <font e1-style=\"{{colorAttr}}:background-color\"></font>\n</div>";

/***/ }),
/* 42 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(44);

__webpack_require__(45);

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var E1 = __webpack_require__(0);

var Dropdown =
/*#__PURE__*/
function () {
  function Dropdown(el) {
    var _this = this;

    _classCallCheck(this, Dropdown);

    this.el = el;
    this.update = this.update;
    this.label = E1.getModel(this.el, "label");
    this.list = this.getList();
    var container = window.document.createElement("div");
    container.className = "dropdown-container";

    if (!/iPad|iPhone|iPod|Android/.test(window.navigator.userAgent)) {
      container.classList.add("non-mobile");
    } // Build


    container.appendChild(this.getLabel());
    container.appendChild(this.getOptions());
    this.el.appendChild(container);
    var clickThrottle = false;
    var leaveTimer;

    var mouseenter = function mouseenter() {
      clearTimeout(leaveTimer);

      _this.el.querySelector(".dropdown-container").classList.add("mouseenter");
    };

    if (!/iPad|iPhone|iPod|Android/.test(window.navigator.userAgent)) {
      this.el.addEventListener("mouseenter", function () {
        mouseenter();
      }, false);
      this.el.addEventListener("mouseleave", function () {
        leaveTimer = setTimeout(function () {
          _this.el.querySelector(".dropdown-container").classList.remove("mouseenter");
        }, 380);
      });
    } else {
      window.document.body.addEventListener("click", function (e) {
        clearTimeout(clickThrottle);
        var target = e.path ? e.path[0] : e.originalTarget ? e.originalTarget : e.target;
        clickThrottle = setTimeout(function () {
          var container = _this.el.querySelector(".dropdown-container");

          try {
            if (target === _this.el.querySelector(".dropdown-list-label")) {
              container.classList.toggle("mouseenter");
            } else if (target !== _this.el && !_this.el.contains(target)) {
              container.classList.remove("mouseenter");
            }
          } catch (e) {}
        }, 10);
      });
    }
  }

  _createClass(Dropdown, [{
    key: "getLabel",
    value: function getLabel() {
      var labelHtml = E1.getModel(this.el, "label");
      var labelElement = window.document.createElement("div");
      labelElement.className = "dropdown-list-label";
      labelElement.appendChild(E1.cleanHtml(labelHtml));

      if (this.list && this.list.length) {
        labelElement.classList.add("has-options");
      } else {
        labelElement.classList.remove("has-options");
      }

      return labelElement;
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      var _this2 = this;

      var optionContainer = window.document.createElement("div");
      optionContainer.className = "dropdown-list-options";

      if (this.list && this.list.length) {
        this.list.forEach(function (option, key) {
          var optionWrapper = window.document.createElement("div");
          optionWrapper.className = "dropdown-list-option";
          optionWrapper.appendChild(E1.cleanHtml(option));
          optionWrapper.setAttribute("option-key", key);
          var clickThrottle = false;
          optionWrapper.addEventListener("click", function (e) {
            clearTimeout(clickThrottle);
            clickThrottle = setTimeout(function () {
              var container = _this2.el.querySelector(".dropdown-container");

              if (container.classList.contains("mouseenter")) {
                if (_this2.el.optionClicked && typeof _this2.el.optionClicked === "function") {
                  _this2.el.optionClicked(e, optionWrapper);
                }

                var optionClicked = E1.getModel(_this2.el, "option-clicked");

                if (optionClicked && typeof optionClicked === "function") {
                  optionClicked(e, optionWrapper);
                }

                window.requestAnimationFrame(function () {
                  container.classList.remove("mouseenter");
                });
              }
            }, 10);
          });
          optionContainer.appendChild(optionWrapper);
        });
      }

      return optionContainer;
    }
  }, {
    key: "getList",
    value: function getList() {
      var list = E1.getModel(this.el, "list");

      try {
        list = JSON.parse(list);
      } catch (error) {}

      if (typeof list === "string") {
        list = list.split(",").map(function (option) {
          return option.trim();
        });
      }

      return list;
    }
  }, {
    key: "update",
    value: function update() {
      var container = this.el.querySelector(".dropdown-container");
      var label = E1.getModel(this.el, "label");
      var list = this.getList();

      if (JSON.stringify(list) !== JSON.stringify(this.list)) {
        this.list = list;
        container.replaceChild(this.getOptions(), container.querySelector(".dropdown-list-options"));
      }

      this.label = label;
      container.replaceChild(this.getLabel(), container.querySelector(".dropdown-list-label"));
    }
  }]);

  return Dropdown;
}();

E1.registerComponent("e1-dropdown", Dropdown);

/***/ }),
/* 45 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(47);

__webpack_require__(48);

__webpack_require__(50);

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var E1 = __webpack_require__(0);

var E1EditService = function E1EditService() {
  _classCallCheck(this, E1EditService);

  this.editors = {};
};

E1.registerService("E1EditService", new E1EditService());

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var E1 = __webpack_require__(0);

var Edit =
/*#__PURE__*/
function () {
  function Edit(el) {
    var _this = this;

    _classCallCheck(this, Edit);

    this.el = el;
    this.update = this.update;
    this.editor = {
      name: this.el.getAttribute("component-id"),
      editing: false,
      value: this.stripHtml(E1.getModel(this.el, "content")),
      save: E1.getModel(this.el, "save")
    };
    E1.setModel(null, "@E1EditService.editors.".concat(this.editor.name), this.editor);

    var html = __webpack_require__(49).split("{{editor}}").join(this.editor.name);

    this.el.appendChild(E1.cleanHtml(html));
    var method = "click";

    if (/iPad|iPhone|iPod|Android/.test(window.navigator.userAgent)) {
      method = "touch";
    }

    this.el.querySelector(".edit-content").addEventListener("input", function () {
      var txt = _this.el.querySelector(".edit-content");

      var range = window.document.createRange();
      var sel = window.getSelection();
      var start = sel.anchorOffset;
      txt.textContent = txt.textContent;
      range = window.document.createRange();
      sel = window.getSelection();
      range.setStart(txt.childNodes[0], start);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    });
    this.el.querySelector(".edit-content").addEventListener("keypress", function (e) {
      if (e.key && e.key.toLowerCase() === "enter") {
        E1.setModel(null, "@E1EditService.editors.".concat(_this.editor.name, ".editing"), false);

        _this.el.querySelector(".edit-content").removeAttribute("contenteditable");
      }
    });
    this.el.querySelector('e1-icon[type="edit"]').addEventListener(method, function () {
      E1.setModel(null, "@E1EditService.editors.".concat(_this.editor.name, ".editing"), true);

      _this.el.querySelector(".edit-content").setAttribute("contenteditable", true);
    });
    this.el.querySelector('e1-icon[type="check"]').addEventListener(method, function () {
      E1.setModel(null, "@E1EditService.editors.".concat(_this.editor.name, ".editing"), false);
      E1.setModel(_this.el, "content", _this.el.querySelector(".edit-content").textContent);

      _this.el.querySelector(".edit-content").removeAttribute("contenteditable");

      if (typeof _this.editor.save === "function") {
        _this.editor.save(_this.el.querySelector(".edit-content").textContent);
      }
    });
    this.el.querySelector('e1-icon[type="close"]').addEventListener(method, function () {
      E1.setModel(null, "@E1EditService.editors.".concat(_this.editor.name, ".value"), E1.getModel(_this.el, "content"));
      E1.setModel(null, "@E1EditService.editors.".concat(_this.editor.name, ".editing"), false);

      _this.el.querySelector(".edit-content").removeAttribute("contenteditable");
    });
  }

  _createClass(Edit, [{
    key: "stripHtml",
    value: function stripHtml(str) {
      var txt = window.document.createElement("div");
      txt.appendChild(E1.cleanHtml("<div>".concat(str, "</div>")));
      return txt.textContent;
    }
  }, {
    key: "update",
    value: function update() {
      E1.setModel(null, "@E1EditService.editors.".concat(this.editor.name, ".value"), this.stripHtml(E1.getModel(this.el, "content")));
    }
  }]);

  return Edit;
}();

E1.registerComponent("e1-edit", Edit);

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = "<span class=\"edit-wrapper\">\n    <span class=\"edit-content\" e1-content=\"@E1EditService.editors.{{editor}}.value\"></span>\n    <span class=\"edit-buttons\">\n        <span e1-show=\"@E1EditService.editors.{{editor}}.editing !== true\">\n            <e1-icon type=\"edit\"></e1-icon>\n        </span>\n        <span e1-show=\"@E1EditService.editors.{{editor}}.editing === true\"><e1-icon type=\"check\"></e1-icon></span><span e1-show=\"@E1EditService.editors.{{editor}}.editing === true\"><e1-icon type=\"close\"></e1-icon></span>\n    </span>\n</span>";

/***/ }),
/* 50 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(52);

__webpack_require__(53);

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var E1 = __webpack_require__(0);

var Icon =
/*#__PURE__*/
function () {
  function Icon(el) {
    _classCallCheck(this, Icon);

    this.el = el;
    this.update = this.update;
    this.templates = {
      "360": '<svg type="360" class="filled-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 186.99 186.99"><defs><style>.38a1d1ab-6ec1-4287-a4df-5e1ad8465b2c{opacity:0.3;}</style></defs><title>360_2</title><path d="M100,194.3a93.5,93.5,0,1,1,93.5-93.5A93.6,93.6,0,0,1,100,194.3Zm0-182.42a88.92,88.92,0,1,0,88.92,88.92A89,89,0,0,0,100,11.89Z" transform="translate(-6.52 -7.31)"></path><path d="M101.42,193.7c-27.6,0-50.06-41.55-50.06-92.62S73.82,8.45,101.42,8.45,151.48,50,151.48,101.08,129,193.7,101.42,193.7Zm0-183c-26.34,0-47.77,40.52-47.77,90.33s21.43,90.33,47.77,90.33,47.77-40.52,47.77-90.33S127.76,10.74,101.42,10.74Z" transform="translate(-6.52 -7.31)"></path><path d="M100.45,149.81c-50.37,0-91.34-22-91.34-49.11s41-49.11,91.34-49.11,91.34,22,91.34,49.11S150.82,149.81,100.45,149.81Zm0-97.08c-49.74,0-90.2,21.52-90.2,48s40.46,48,90.2,48,90.2-21.52,90.2-48S150.19,52.73,100.45,52.73Z" transform="translate(-6.52 -7.31)"></path><ellipse style="opacity:0.3;" class="38a1d1ab-6ec1-4287-a4df-5e1ad8465b2c" cx="93.93" cy="93.39" rx="90.77" ry="48.54"></ellipse><path d="M84,116.33a9,9,0,0,1-6.26,2.25,9.21,9.21,0,0,1-6.32-2.31c-1.54-1.48-2.42-3.35-2.42-6.48v-2.31h5.82V110c0,2.25,1.32,3.35,2.91,3.35a2.63,2.63,0,0,0,2.09-1c.82-1,.93-3.35.93-5.77,0-2.64-.05-4.61-.88-5.71a2.55,2.55,0,0,0-2.2-1H75.76V95h1.92a2.36,2.36,0,0,0,1.87-.77c.88-1,.88-2.91.88-4.94s-.05-3.68-.77-4.61a2.3,2.3,0,0,0-1.92-.88c-1.48,0-2.64,1-2.64,3.13v2.75H69.28V87.32a8.36,8.36,0,0,1,2.42-6.48,8.48,8.48,0,0,1,6-2.25,8.22,8.22,0,0,1,6,2.2c1.76,1.76,2.53,4.28,2.53,8.13,0,2.64-.11,4.5-1,6.21a6.17,6.17,0,0,1-2.14,2.31,7.09,7.09,0,0,1,2.25,2.36c1,1.87,1.21,3.85,1.21,7.2C86.58,111.17,86.47,113.91,84,116.33Z" transform="translate(-6.52 -7.31)"></path><path d="M106.74,115.45c-1.54,2.2-4.12,3.13-7,3.13-3.13,0-5.44-1.15-6.81-3.13-1.54-2.2-2-4.45-2-9.17A26.94,26.94,0,0,1,92.57,97l6.87-18h6L99,94.85a4.11,4.11,0,0,1,2.42-.66,6.23,6.23,0,0,1,5.16,2.42c1.43,1.81,2,3.9,2,9.67C108.61,111.49,108,113.64,106.74,115.45ZM101.9,100a2.55,2.55,0,0,0-2.09-1,2.66,2.66,0,0,0-2.14,1c-.93,1.21-.88,3.9-.88,6.26s-.05,4.89.88,6.15a2.66,2.66,0,0,0,2.14,1,2.48,2.48,0,0,0,2.09-1c.93-1.21.88-3.79.88-6.15S102.84,101.17,101.9,100Z" transform="translate(-6.52 -7.31)"></path><path d="M128,116.27a8.93,8.93,0,0,1-6.21,2.31,9.06,9.06,0,0,1-6.26-2.31,8.22,8.22,0,0,1-2.47-6.48V87.38a8.22,8.22,0,0,1,2.47-6.48,9.06,9.06,0,0,1,6.26-2.31A8.93,8.93,0,0,1,128,80.9a8.22,8.22,0,0,1,2.47,6.48v22.41A8.23,8.23,0,0,1,128,116.27ZM124.7,87.16c0-2.25-1.26-3.35-2.86-3.35s-2.91,1.1-2.91,3.35V110c0,2.25,1.32,3.35,2.91,3.35s2.86-1.1,2.86-3.35Z" transform="translate(-6.52 -7.31)"></path></svg>',
      binoculars: '<svg type="binoculars" class="filled-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 193.67 141.33"><path d="M196.31,123.36v9.59c-.17.75-.38,1.5-.5,2.26A41,41,0,0,1,187.19,155c-10.7,13-24.55,17.94-41.05,15s-29.9-17-32.83-33.83c-.8-4.61-.57-9.24-.67-13.88s-3.12-10.76-8.75-11.43a35.76,35.76,0,0,0-6.47-.33c-3.83.24-7.23,1.3-9.15,5a15.31,15.31,0,0,0-2,7.23,72.18,72.18,0,0,1-.42,12.19c-3,18.34-16.79,32.62-35,35.39A41.75,41.75,0,0,1,5.29,143.41a98.65,98.65,0,0,1-2.65-10.47v-9.59c.18-.75.38-1.5.52-2.25a36,36,0,0,1,5.58-14.26c1.14-1.63,6-9.38,14.76-13.35A61.57,61.57,0,0,1,37.67,89c3.12-.61,7.38-.19,9.66-.19a56.9,56.9,0,0,0-12.5-2c-5.67-.17-13.36,2.65-13.36,2.65s10.95-16.7,17.29-26.14c4.36-6.49,9.94-10.8,17.61-12.21a30.75,30.75,0,0,1,16.46,1.19C80.4,55.13,86.94,59.08,88.5,68c.06.34.15.76.57.84s.62-.29.84-.57c.82-1.06,1.63-2.12,2.46-3.18,4.12-5.22,10.21-5.32,14.48-.25.7.84,1.23,1.78,1.84,2.66.36.52.59,1.45,1.34,1.31s.65-1.07.79-1.7A13.94,13.94,0,0,1,112,62.81a18.42,18.42,0,0,1,5.18-5.87c9.19-6.63,19.21-8,29.91-4.47a20.54,20.54,0,0,1,10.14,7.07c4.71,6.32,9.08,12.89,13.58,19.36,2.91,4.19,6.71,9.58,6.71,9.58s-7.89-2.33-14.06-2.49c-7.1-.19-12.58,1.84-11.89,2.84.35.5,3.23-.29,7.6-.07,6.28.32,12.69,3,16.58,4.69,3.58,1.56,11.46,9.18,12,10,2.48,3.6,5.2,7,6.48,11.35C195.14,117.61,195.57,120.52,196.31,123.36ZM75.94,128.19a30.59,30.59,0,1,0-30.62,30.53A30.6,30.6,0,0,0,75.94,128.19Zm108.32-.83a29.4,29.4,0,1,0-29.54,29.36A29.45,29.45,0,0,0,184.26,127.36Zm-84.8-30.3a10.87,10.87,0,0,0,7.23-2.45c2.12-1.83,2.12-4.12,0-5.92a11.29,11.29,0,0,0-14.75-.06c-2.25,1.82-2.21,4.33.07,6.13A11.64,11.64,0,0,0,99.46,97.05Z" transform="translate(-2.64 -29.49)"></path><path d="M147.64,47.1c-12.32-3.13-23.79-1.6-34.09,6.15-.16-.29-.26-.4-.24-.47,1-3.51.13-6.9-.41-10.36-.68-4.35,1.63-7.57,5-10a14,14,0,0,1,12.9-2.26A8.51,8.51,0,0,1,137,38.46a2,2,0,0,0,1.6,2.22,20.52,20.52,0,0,1,8,4.79A2.63,2.63,0,0,1,147.64,47.1Z" transform="translate(-2.64 -29.49)"></path><path d="M51.37,47c1.13-2.23,3.1-3.43,5.11-4.54a18.12,18.12,0,0,1,4.22-1.89,1.45,1.45,0,0,0,1.24-1.67c-.31-4.59,3.08-8.21,7.74-9.13,6.74-1.33,14,2.8,16,9.18a6.44,6.44,0,0,1,.06,4,15.29,15.29,0,0,0-.19,9.27c.1.32.32.75-.09,1s-.68-.16-.95-.37a35.54,35.54,0,0,0-11.42-5.68,37.65,37.65,0,0,0-12.21-1.44A39.8,39.8,0,0,0,51.37,47Z" transform="translate(-2.64 -29.49)"></path></svg>',
      bookmark: '<svg type="bookmark" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-5 0 220 230"><path d="M145,20H64.8C42.5,20,20,30.7,20,48v154c0,6.6,7,12,15.4,12c0,0,11.5,0.2,14.1-2c16.6-13.5,41-42.5,54.1-42.5 c13.1,0,43.4,33.1,62.2,43.5c1.7,1,8.4,1,8.4,1c8.5,0,15.4-5.4,15.4-12c0,0,0-142.8,0-158.2C189.6,28.4,175.6,20,145,20z"></path></svg>',
      "bookmark-filled": '<svg type="bookmark-filled" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-5 0 220 230" class="fill"><path d="M145,20H64.8C42.5,20,20,30.7,20,48v154c0,6.6,7,12,15.4,12c0,0,11.5,0.2,14.1-2c16.6-13.5,41-42.5,54.1-42.5 c13.1,0,43.4,33.1,62.2,43.5c1.7,1,8.4,1,8.4,1c8.5,0,15.4-5.4,15.4-12c0,0,0-142.8,0-158.2C189.6,28.4,175.6,20,145,20z"></path></svg>',
      cardboard: '<svg type="cardboard" class="filled-svg" xmlns="http://www.w3.org/2000/svg" data-name="Layer 86" viewBox="0 0 196.33 123.31"><path d="M194.33 14a12 12 0 0 0-12-12s-63.12-2-84.17-2-84.17 2-84.17 2a12 12 0 0 0-12 12S0 57.73 0 70.33c0 11.76 2 41 2 41a12 12 0 0 0 12 12h56.33s15.31-41.21 27.67-41c12.09.21 25.67 41 25.67 41h58.67a12 12 0 0 0 12-12s2-36.48 2-48.65S194.33 14 194.33 14zM46.67 86.66A28.33 28.33 0 1 1 75 58.33a28.33 28.33 0 0 1-28.33 28.33zm102 0A28.33 28.33 0 1 1 177 58.33a28.33 28.33 0 0 1-28.33 28.33z"/></svg>',
      check: '<svg type="check" class="filled-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160"><path d="M0 70.68c1.91-3.47 5.27-5.54 8-8.16 3.52-3.35 7.22-6.52 10.83-9.77s6.88-3.17 10.24.26q19.18 19.51 38.33 39c3.81 3.88 6.8 3.88 10.68 0q34.95-34.83 69.89-69.66c6.66-6.64 13.38-13.22 20-19.88a9.63 9.63 0 0 1 4.44-2.51h1.54a10.29 10.29 0 0 1 4.45 2.87c5.25 5.34 10.55 10.62 15.83 15.93 3.46 3.48 3.49 7 .06 10.37L77.95 145.43c-3.37 3.37-6.93 3.4-10.24.11C45.28 123.28 23.56 100.3 1.8 77.38A22.65 22.65 0 0 1 0 74.91z"></path></svg>',
      "close-thin": '<svg type="close-thin" class="filled-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 612 612"><g><g id="cross"><g><polygon points="612,36.004 576.521,0.603 306,270.608 35.478,0.603 0,36.004 270.522,306.011 0,575.997 35.478,611.397 306,341.411 576.521,611.397 612,575.997 341.459,306.011 "/></g></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>',
      close: '<svg type="close" class="filled-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 166.27 166.27"><defs><style>.0c386ab7-d9dc-414a-9885-42400d221628{fill:#231f20;}</style></defs><path d="M109.29 83.13l55.53-55.53a5 5 0 0 0 0-7.07L145.74 1.46a5 5 0 0 0-7.07 0L83.14 56.99 27.61 1.46a5 5 0 0 0-7.07 0L1.46 20.53a5 5 0 0 0 0 7.07l55.53 55.53-55.53 55.54a5 5 0 0 0 0 7.07l19.08 19.07a5 5 0 0 0 7.07 0l55.53-55.53 55.53 55.53a5 5 0 0 0 7.07 0l19.07-19.07a5 5 0 0 0 0-7.07z" class="0c386ab7-d9dc-414a-9885-42400d221628"/></svg>',
      contest: '<svg type="contest" class="filled-svg" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><title>cont</title><path d="M157.69,0c.53,8.6-.14,17.17-.92,25.71A199.65,199.65,0,0,1,146.3,74.63c-5.65,15.84-13.81,30.05-22.26,44.09-4.1,6.82-8.12,13.73-10.74,21.5-.62,1.85-.37,4.36-1.76,5.47-1.65,1.33-3.92.48-5.92.51-5,.07-10,0-15,0-1.38,0-2.47-.19-2.93-2C85.36,134.85,80.76,126.84,76,119c-9.1-15.1-17.75-30.48-23.45-47.65A201,201,0,0,1,43,22.47,183.16,183.16,0,0,1,42.24,0ZM86.17,74c3.92-2.35,7.28-4.11,10.48-6.25a5.26,5.26,0,0,1,6.69,0c3.2,2.17,6.61,4,10.41,6.21-.85-5.46-1.54-10.25-2.38-15a3.73,3.73,0,0,1,1-3.59q3.48-3.6,6.84-7.31c.83-.93,2.53-1.85,2.24-2.92-.41-1.48-2.26-.7-3.47-1a17.32,17.32,0,0,0-2.15-.4c-9-1.17-9-1.17-12.88-10.21-.91-2.14-1.54-4.47-3.14-6.58-2,4.69-4,9-5.8,13.43a3.31,3.31,0,0,1-3,2.34c-3.69.44-7.33,1.06-11,1.63-.61.1-1.45,0-1.62.82-.14.66.56,1,1,1.46,2.67,2.89,5.33,5.86,8.07,8.61a4.15,4.15,0,0,1,1.16,4.08C87.68,63.88,87,68.6,86.17,74Z"/><path d="M0,14.16,29.82,14a1.62,1.62,0,0,1,1.83,1.47,1.78,1.78,0,0,1,0,.46c.13,2.7.27,5.41.53,8.11.21,2.07-.57,2.73-2.38,2.73-4.69-.07-9.42,0-14.06,0-2.09,0-2.69.55-2.09,3C18.33,50,27,67.25,42.78,79.43a5.54,5.54,0,0,1,1.84,2.45c2,5.23,4.09,10.44,6.57,15.42a11.53,11.53,0,0,1,.42,1.45,5.08,5.08,0,0,1-3.28-1.08C29.48,87.53,16.47,71.19,8,50.08A119.93,119.93,0,0,1,.31,19.81,11.19,11.19,0,0,0,0,18.54Z"/><path d="M100,200c-10.83,0-21.65-.06-32.47,0-2.35,0-3.43-.64-3.22-3.52q.18-3.93,0-7.86c0-1.56.5-2.35,1.94-2.43,12.41-.53,19.25-10.47,21.37-23.2.92-5.54.85-5.55,5.94-5.55h14.29c3.75,0,3.78,0,4.28,4.24a36.91,36.91,0,0,0,4.44,14.22c3.81,6.55,9.43,9.8,16.25,10.2,2.28.13,3.21,1,3.08,3.51a63.59,63.59,0,0,0,0,7c.13,2.48-.75,3.29-3,3.28C122,200,111,200,100,200Z"/><path d="M148.5,98.61c2.52-6,4.9-11.73,7.19-17.65a5.12,5.12,0,0,1,1.89-2c15.48-12.43,24.27-29.65,28.75-50,.48-2.18-.58-2.26-1.93-2.25-4.6,0-9.21-.08-13.82,0-2.18,0-3.14-.74-2.85-3.29s.4-4.87.5-7.3c.08-1.63.81-2.15,2.19-2.15,9.13,0,18.28.07,27.41,0,2.23,0,2.3,1.33,2.09,3.14a126.51,126.51,0,0,1-7.13,30.34c-6.93,18.45-17.49,33.72-32.64,44.69A46.27,46.27,0,0,1,148.5,98.61Z"/></svg>',
      delete: '<svg type="delete" class="filled-svg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 197 197" style="enable-background:new 0 0 197 197;" xml:space="preserve"><path d="M167.1,197H29.9c-0.6-1.6-1-3.1-1.3-4.8c-1.8-22.2-3.5-44.4-5.2-66.6C21.7,105.1,20,84.6,18.5,64c-0.2-3.3-1.8-4.8-6-4.7S4.1,59.2,0,59.1V40.4c2.3-0.1,4.5-0.3,6.8-0.3c61.1,0,122.3,0,183.4,0c2.3,0,4.5,0.2,6.8,0.3v18.7c-3.9,0.1-7.9,0.3-11.8,0.2c-4.3-0.1-6.4,1.1-6.7,4.8c-1,13.6-2.4,27.2-3.5,40.7c-1.9,23.9-3.3,47.8-5.6,71.7C168.8,183.3,169.9,190.3,167.1,197z M133.2,169.4h-0.5c0,1.3,0.1,2.6,0,3.9c-0.4,3.7,1.9,4.9,6.3,4.9c4.4,0,6.4-1.2,6.5-4.9c0.2-6.2,0.8-12.4,1.3-18.6c1.5-18.6,3.1-37.3,4.7-55.9c0.9-11.3,1.7-22.6,2.7-33.8c0.4-3.9-1.3-5.6-6.6-5.6c-11,0-11-0.2-11.9,8.7c-0.2,2-0.4,3.9-0.5,5.9C134.5,105.8,133.9,137.6,133.2,169.4L133.2,169.4z M62.1,122.1c0-6.1,0.1-12.1,0-18.2C61.7,91,62.5,78,61,65.1c-0.2-1.9,0.5-4.5-2.4-5.1c-4.6-1-9.7-1.5-13.9,0.2c-3.4,1.4-1.7,4.8-1.5,7.3c1,13.6,2.3,27.1,3.4,40.7c1.7,21.9,3.4,43.8,5.1,65.8c0.2,2.8,1.7,4.1,5.3,4.3c5.1,0.2,7.9-0.9,7.6-5.4C63.1,155.9,63.1,139,62.1,122.1z M106,118.7c1.8-18.2-0.1-36.4,1.9-54.5c0.2-1.6,0.5-3.7-1.9-4.2c-4.8-1-10.1-1.4-14.7,0c-4.2,1.3-1.7,4.9-1.8,7.5c0,2.1,0.3,4.2,0.4,6.4c0.6,27.5,1.1,55.1,1.7,82.6c0.1,5.7,0.7,11.4,0.9,17.2c0.1,3.4,2.3,4.5,6.3,4.5c5.5,0,5.6-2.7,5.9-5.9C105.9,154.5,105.3,136.6,106,118.7L106,118.7z"/><path d="M117.2,0C118,12.6,118,12.6,134,12.6c13.1,0,26.1,0.1,39.2,0c5.1,0,7,1.4,6.9,5.5c-0.5,16,2.7,13.7-16.8,13.8c-45.6,0.1-91.3,0-137,0c-9.3,0-9.4,0-9.3-7.4c0.2-13-2.4-11.8,14.9-11.8c13.1-0.1,26.1,0,39.2,0c8.1,0,8.4-0.3,8.5-6.7c0-2,0.1-3.9,0.2-5.9L117.2,0z"/></svg>',
      down: '<svg type="down" class="filled-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 166.3 166.3"><path transform="rotate(90, 83, 83)" d="M137.1,83.1c0-1.5-3.5-4.9-3.5-4.9L112.4,57L56.8,1.5c-2-2-5.1-2-7.1,0L30.7,20.5c-2,2-2,5.1,0,7.1l55.5,55.5l-55.5,55.5 c-2,2-2,5.1,0,7.1l19.1,19.1c2,2,5.1,2,7.1,0l55.5-55.5l21.5-21.5C133.8,87.8,137.1,84.5,137.1,83.1z"/></svg>',
      edit: '<svg type="edit" class="filled-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 193.1 193.1"><rect x="40.65" y="74.65" width="104.64" height="65.55" rx="12" ry="12" transform="translate(-52.31 93.49) rotate(-45)"></rect><rect x="130.53" y="19.31" width="35.57" height="65.55" rx="12" ry="12" transform="translate(3.03 116.41) rotate(-45)"></rect><rect x="157.57" y="-1.96" width="24.04" height="65.55" rx="11.04" ry="11.04" transform="translate(24.3 125.22) rotate(-45)"></rect><path d="M65.85,180.9,3.58,196.82,19.5,134.55a10.29,10.29,0,0,1,14.51,0l31.84,31.84A10.29,10.29,0,0,1,65.85,180.9Z" transform="translate(-3.58 -3.72)"></path></svg>',
      facebook: '<span class="svg-bg""></span><svg type="facebook" class="filled-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1024 1024"><g><g id="svg_1" transform="translate(0,1024) scale(0.10000000149011612,-0.10000000149011612) "><path id="svg_2" class="st0" d="M4812.2,10230.6c-660-39-1316.4-210.2-1910.2-495.9C1460.4,9040.5,420.3,7705.2,102.7,6140.9c-223.1-1096.8-79.1-2243.2,406.1-3246.7C1204.2,1455,2537.1,418.4,4099.1,102c1096.8-223.1,2243.2-79.1,3246.7,406.1c1036.6,500.6,1885.5,1349.5,2386,2386c238.5,493.5,395.5,1021.2,465.2,1563.1c128.7,991.7-33.1,1995.3-465.2,2887.8c-500.6,1036.6-1349.5,1885.5-2386,2386C6560.7,10111.3,5684.7,10283.7,4812.2,10230.6z M6900.7,7443.1l-3.5-558.4l-543.1-5.9c-613.9-7.1-576.1,0-642.3-103.9c-67.3-107.4-72-144-72-583.2v-399.1h631.6h631.6v-525.4v-525.4h-631.6h-631.6V3171.6V1601.4h-608h-608v1570.2v1570.2h-543.1h-543.1v525.4v525.4h543.1h543.1v379c0,412,11.8,539.5,66.1,727.3c148.8,512.4,545.4,924.4,1011.8,1048.4c170,46,243.2,49.6,844.1,51.9l557.3,1.2L6900.7,7443.1z"/></g></g></svg>',
      fullscreen: '<svg type="fullscreen" class="filled-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 193.57 193.57"><path d="M69.2.04q.06 13.21.12 26.43c0 1.05-.49 1.49-1.48 1.5H30.66c-2.59 0-2.64 0-2.64 2.64v35.88c0 2.8 0 2.81-2.84 2.8L.04 69.16V1.6C.04.24.32-.04 1.68-.04Q35.42.08 69.2.04zM193.54 69.16q-13.21.06-26.43.12c-1.05 0-1.49-.49-1.5-1.48v-1.89V30.6c0-2.59 0-2.64-2.64-2.64h-35.91c-2.8 0-2.81 0-2.8-2.84q0-12.55.12-25.11h67.65c1.29 0 1.55.25 1.55 1.55q-.08 33.81-.04 67.6zM.04 124.38q13.21-.06 26.43-.12c1.05 0 1.49.49 1.5 1.48v37.2c0 2.59 0 2.64 2.64 2.64h35.91c2.8 0 2.81 0 2.8 2.84q0 12.55-.12 25.11H1.55c-1.29 0-1.55-.25-1.55-1.55q.08-33.82.04-67.6zM124.38 193.54q-.06-13.21-.12-26.43c0-1.05.49-1.49 1.48-1.5h37.2c2.59 0 2.64 0 2.64-2.64v-35.88c0-2.8 0-2.81 2.84-2.8l25.11.12v67.65c0 1.29-.25 1.55-1.55 1.55q-33.78-.11-67.6-.07z"></path></svg>',
      "heart-filled": '<svg type="heart-filled" xmlns="http://www.w3.org/2000/svg" viewBox="-20 -20 230 220" class="fill"><path d="M.95 66.82a86.23 86.23 0 0 1 0-25.54C4.3 19.34 20.85 3.57 43.01.72a76.42 76.42 0 0 1 21 0A51.09 51.09 0 0 1 93.28 16.4c2.61 2.73 5 2.73 7.6 0A51.09 51.09 0 0 1 130.13.73a77.6 77.6 0 0 1 21 0c37.7 4.67 51.3 44.65 37.75 77.62-4.44 10.97-11.24 20.61-18.77 29.61-20.7 24.91-46.78 44.3-69.31 67.34-3.63 3.71-6.05 1.28-8.77-1.25-13.7-12.76-27.59-25.35-41.18-38.24C29.9 115.96 5.36 96.51.95 66.82z"></path></svg>',
      heart: '<svg type="heart" xmlns="http://www.w3.org/2000/svg" viewBox="-20 -20 230 220"><path d="M.95 66.82a86.23 86.23 0 0 1 0-25.54C4.3 19.34 20.85 3.57 43.01.72a76.42 76.42 0 0 1 21 0A51.09 51.09 0 0 1 93.28 16.4c2.61 2.73 5 2.73 7.6 0A51.09 51.09 0 0 1 130.13.73a77.6 77.6 0 0 1 21 0c37.7 4.67 51.3 44.65 37.75 77.62-4.44 10.97-11.24 20.61-18.77 29.61-20.7 24.91-46.78 44.3-69.31 67.34-3.63 3.71-6.05 1.28-8.77-1.25-13.7-12.76-27.59-25.35-41.18-38.24C29.9 115.96 5.36 96.51.95 66.82z"></path></svg>',
      image: '<svg type="image" class="filled-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 196.61 141"><path d="M186.61,29.67H14a12,12,0,0,0-12,12v117a12,12,0,0,0,12,12H186.61a12,12,0,0,0,12-12v-117A12,12,0,0,0,186.61,29.67ZM54.5,59.33A14.83,14.83,0,1,1,39.67,74.17,14.83,14.83,0,0,1,54.5,59.33ZM180.33,156H17.67l8.67-16.48,18-4.94,17.33-22.53,28.67,13.74,53.33-51.64,36.67,30.49Z" transform="translate(-2 -29.67)"/></svg>',
      minus: '<svg type="minus" class="filled-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35"><path d="M0,0V35H35V0ZM30,22H5V13H30Z"></path></svg>',
      next: '<svg type="next" class="filled-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 166.3 166.3"><path d="M137.1,83.1c0-1.5-3.5-4.9-3.5-4.9L112.4,57L56.8,1.5c-2-2-5.1-2-7.1,0L30.7,20.5c-2,2-2,5.1,0,7.1l55.5,55.5l-55.5,55.5 c-2,2-2,5.1,0,7.1l19.1,19.1c2,2,5.1,2,7.1,0l55.5-55.5l21.5-21.5C133.8,87.8,137.1,84.5,137.1,83.1z"/></svg>',
      plus: '<svg type="plus" class="filled-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35"><path d="M0,0V35H35V0ZM30,22H22v8H13V22H5V13h8V5h9v8h8Z"></path></svg>',
      previous: '<svg type="previous" class="filled-svg" style="transform:rotate(180deg);" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 166.3 166.3"><path d="M137.1,83.1c0-1.5-3.5-4.9-3.5-4.9L112.4,57L56.8,1.5c-2-2-5.1-2-7.1,0L30.7,20.5c-2,2-2,5.1,0,7.1l55.5,55.5l-55.5,55.5 c-2,2-2,5.1,0,7.1l19.1,19.1c2,2,5.1,2,7.1,0l55.5-55.5l21.5-21.5C133.8,87.8,137.1,84.5,137.1,83.1z"/></svg>',
      search: '<svg type="search" class="filled-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000"><g><path d="M932.8,850l-201-201c56.4-67.6,90.3-154.5,90.3-249.5C822.2,184.2,647.9,10,432.7,10C217.4,10,43.2,184.2,43.2,399.5C43.2,614.7,217.4,789,432.7,789c61.1,0,119-14.1,170.5-39.1c3,4.7,6.6,9.1,10.7,13.2l203,203c32,32,84,32,116,0C964.8,934,964.8,882,932.8,850z M125.2,399.5C125.2,229.7,262.9,92,432.7,92s307.5,137.7,307.5,307.5c0,169.8-137.8,307.5-307.5,307.5C262.9,707,125.2,569.3,125.2,399.5z"/></g></svg>',
      share: '<svg type="share" class="filled-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 181 197"><path d="M140.4,127c-8.7,0-16.6,3.6-22.2,9.4l-50.3-27c2.9-7.3,2.8-15,0.3-21.9l49.1-28.4c10.4,13.7,30,16.4,43.7,6 c13.7-10.4,16.4-30,6-43.7C161.1,13.6,152,9,142.2,9C125,9,111,23,111,40.3c0,1.6,0.1,3.2,0.4,4.7L59.8,74.9 c-2.7-2.5-5.9-4.5-9.6-5.9c-16-6.3-34.1,1.6-40.4,17.7c-3.6,9.1-2.7,19.4,2.4,27.7h0c9,14.7,28.3,19.3,42.9,10.3 c1.4-0.8,2.6-1.8,3.9-2.8l51.6,27.7c-0.7,2.7-1.2,5.5-1.2,8.4c0,8.5,3.4,16.2,9,21.7c6.7,6.8,16.3,10.5,26.5,9.2 c9.7-1.3,18.2-7.1,23-15.6h0c1.7-3,2.4-5.9,2.5-8.7c0.5-2.2,0.7-4.4,0.7-6.7C171.3,140.8,157.4,127,140.4,127z"></path></svg>',
      twitter: '<span class="svg-bg""></span><svg type="twitter" class="filled-svg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 36 36"><g><path d="M18,0C8.1,0,0,8.1,0,18c0,9.9,8.1,18,18,18s18-8.1,18-18C36,8.1,27.9,0,18,0z M22.8,28.5c-0.7,0-4.8-0.1-5.9-0.1c-1,0-6.5-1.7-6.5-7.7c0-1.1,0-2.1,0-3.2c0-1,0-2,0-3c0-0.3,0-0.6,0-0.9c0-1.5-0.1-3.2,0.4-4.7c0.4-1.1,1.3-1.6,2.3-1.6c2.6,0,2.8,2.7,2.8,5.4h7.6c1.2,0,2.1,1.2,2.1,3.1c0,1.9-1.9,2.3-3,2.3h-6.8c0,1.1-0.1,2.1-0.1,2.6c0,1.2,0.5,2.5,3.4,2.5h4.1c1,0,2.5,0.8,2.5,2.9C25.7,28.3,23.6,28.5,22.8,28.5z"/></g></svg>',
      up: '<svg type="up" class="filled-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 166.3 166.3"><path transform="rotate(-90, 83, 83)" d="M137.1,83.1c0-1.5-3.5-4.9-3.5-4.9L112.4,57L56.8,1.5c-2-2-5.1-2-7.1,0L30.7,20.5c-2,2-2,5.1,0,7.1l55.5,55.5l-55.5,55.5 c-2,2-2,5.1,0,7.1l19.1,19.1c2,2,5.1,2,7.1,0l55.5-55.5l21.5-21.5C133.8,87.8,137.1,84.5,137.1,83.1z"/></svg>',
      upload: '<svg type="upload" class="filled-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000"><g><path d="M800.1,420.4c-28.6-140.9-151.1-247-300.1-247c-118.4,0-220.5,67.4-271.5,165.4C106,351,10,455.1,10,581.7c0,134.7,110.2,245,245,245h530.8c112.3,0,204.2-91.9,204.2-204.2C990,514.3,906.3,426.5,800.1,420.4z M565.3,540.8V696H434.7V540.8H295.8L500,336.7l204.2,204.2H565.3z"/></g></svg>',
      vr: '<svg type="vr" class="filled-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.67 115.59"><path id="ab1411b6-2959-43b4-84ec-5dd51f0958e3" data-name="VR-Icon.svg" class="a1408e72-2ac4-42c0-af79-d05768ae3026" d="M99.33,42.81c-67.45,0-96.33,58-96.33,58S31.89,158.4,99.33,158.4s96.33-57.62,96.33-57.62S166.76,42.81,99.33,42.81Zm-.18,112.68a54.89,54.89,0,1,1,54.73-55c0,.05,0,.1,0,.16a54.8,54.8,0,0,1-54.72,54.89h0Zm41.4-56.86V84.3a8.71,8.71,0,0,0-9.16-8.16h-33L84.37,112.25,69.74,76.13h-12L78.5,125.08H89.44L105.85,84.8H127a2.65,2.65,0,0,1,2.75,2.51v8.37A2.58,2.58,0,0,1,127,98.12H109L128.31,125H139.8l-13.26-18.22H132A8.19,8.19,0,0,0,140.54,99Q140.55,98.82,140.55,98.63Z" transform="translate(-3 -42.81)"></path></svg>',
      weibo: '<span class="svg-bg""></span><svg type="weibo" class="filled-svg" version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512"><g><path class="st0" d="M256.2,0C114.9,0,0.4,114.5,0.4,255.8s114.5,255.8,255.8,255.8S512,397.1,512,255.8S397.5,0,256.2,0z M226.9,395.4c-65.6,0-132.6-35.6-132.6-88.8c0-27.8,17.3-60,47.2-90.4c39.9-40.5,86.3-59,103.7-41.2c7.7,7.8,8.4,21.4,3.5,37.6c-2.6,8.2,7.6,3.6,7.6,3.7c32.2-13.8,60.2-14.5,70.5,0.4c5.5,7.9,5,19.1-0.1,32c-2.4,6,0.7,6.8,5.2,8.2c18.1,5.7,38.4,19.6,38.4,44C370.1,341.2,312.8,395.4,226.9,395.4z M363.1,225.4c-6.1,1.2-12.2-2.7-13.4-8.8c-3.4-16.5-16.4-29.4-32.8-32.8c-6.1-1.2-10.1-7.3-8.8-13.4c1.2-6.1,7.3-10.1,13.4-8.8c25.3,5.2,45.3,25.2,50.5,50.5C373.3,218.1,369.3,224,363.1,225.4z M417.1,213.6c0,6.3-5.1,11.3-11.3,11.3c-6.2,0-11.3-5.1-11.3-11.3c0-41.2-33.4-74.6-74.6-74.6c-6.3,0-11.3-5.1-11.3-11.3c0-6.3,5.1-11.3,11.3-11.3C373.5,116.2,417.1,159.8,417.1,213.6L417.1,213.6z"/><path class="st0" d="M214.7,246.4c-52.3,5.2-92,37.4-88.7,72c3.4,34.5,48.6,58.4,101,53.1s92-37.4,88.7-72C312.3,265,267.1,241.1,214.7,246.4z M213,343.8c-21.1,4.2-41.1-6.6-44.6-24.1c-3.5-17.5,10.7-35.3,31.8-39.5c21.1-4.2,41.1,6.6,44.6,24.1C248.4,321.9,234.1,339.6,213,343.8z"/></g></svg>'
    };
    this.update();
  }

  _createClass(Icon, [{
    key: "update",
    value: function update() {
      if (this.el) {
        this.el.innerHTML = "<span class=\"svg-icon\"><span class=\"svg-icon-inner\">".concat(this.templates[E1.getModel(this.el, "type")], "</span></span>");
      }
    }
  }]);

  return Icon;
}();

E1.registerComponent("e1-icon", Icon);
module.exports = Icon;

/***/ }),
/* 53 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(55);

__webpack_require__(62);

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var E1 = __webpack_require__(0);

var ImageRenderer = __webpack_require__(56);

var vm = __webpack_require__(2);

var E1ImageViewer =
/*#__PURE__*/
function () {
  function E1ImageViewer(el) {
    _classCallCheck(this, E1ImageViewer);

    this.el = el;
    this.update = this.update;
    this.throttle = null;
    this.el.innerHTML = '<span class="image-renderer"></span>';
    this.el.renderer = false;
    this.update();
  }

  _createClass(E1ImageViewer, [{
    key: "update",
    value: function update() {
      var _this = this;

      clearTimeout(this.throttle);
      this.throttle = setTimeout(function () {
        if (_this.el.renderer) {
          _this.el.renderer.destroy();
        }

        var data = {
          url: E1.getModel(_this.el, "url"),
          preview: E1.getModel(_this.el, "preview"),
          type: E1.getModel(_this.el, "type"),
          crop: E1.getModel(_this.el, "crop"),
          element: _this.el.querySelector(".image-renderer")
        };

        if (!data.url) {
          return;
        }

        _this.el.renderer = new ImageRenderer(data);

        _this.el.takeScreenshot = function () {
          return _this.el.renderer.data.cropper.takeScreenshot();
        };

        _this.el.downloadScreenshot = function () {
          return _this.el.renderer.data.cropper.downloadScreenshot();
        };

        _this.el.download = function () {
          return _this.el.renderer.download();
        };

        var hasScanned = false;

        _this.el.renderer.subscribe("statsUpdate", function (stats) {
          if (stats.ready && !hasScanned) {
            if (_this.el.onready && typeof _this.el.onready === "function") {
              _this.el.onready();
            }

            if (!_this.el.imageready && _this.el.getAttribute("imageready")) {
              vm.createContext();

              try {
                return vm.runInNewContext(_this.el.getAttribute("imageready"));
              } catch (e) {}
            }

            hasScanned = true;
            var iOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent);

            if (iOS) {
              var canvasWrapper = _this.el.querySelector("canvas").parentNode;

              if (canvasWrapper) {
                canvasWrapper.requestFullscreen = function () {
                  _this.el.classList.add("fake-fullscreen");
                };

                var exit = window.document.webkitExitFullscreen;

                window.document.exitFullscreen = function () {
                  _this.el.classList.remove("fake-fullscreen");

                  if (exit && typeof exit === "function") {
                    exit();
                  }
                };
              }
            }
          }
        });
      }, 10);
    }
  }]);

  return E1ImageViewer;
}();

E1.registerComponent("e1-image-viewer", E1ImageViewer);

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

if (!window.HTMLCanvasElement.prototype.toBlob) {
  Object.defineProperty(window.HTMLCanvasElement.prototype, 'toBlob', {
    value: function value(callback, type, quality) {
      var canvas = this;
      setTimeout(function () {
        var binStr = window.atob(canvas.toDataURL(type, quality).split(',')[1]),
            len = binStr.length,
            arr = new Uint8Array(len);

        for (var i = 0; i < len; i++) {
          arr[i] = binStr.charCodeAt(i);
        }

        callback(new window.Blob([arr], {
          type: type || 'image/png'
        }));
      });
    }
  });
}

(function () {
  var Utils = __webpack_require__(1);

  var RendererFlat = __webpack_require__(57);

  var Renderer360 = __webpack_require__(58);

  var Cropper = __webpack_require__(60);

  var ImageRenderer =
  /*#__PURE__*/
  function () {
    function ImageRenderer(data) {
      var _this = this;

      _classCallCheck(this, ImageRenderer);

      var self = this;

      var doKeyPress = function doKeyPress(e) {
        self.keyDown(self, e);
      };

      var doFullscreenChange = function doFullscreenChange() {
        if (self.isFullscreen()) {
          self.exitFullscreen();
        }
      };

      this.destroy = function () {
        window.removeEventListener('keydown', doKeyPress, false);
        window.document.removeEventListener('webkitfullscreenchange', doFullscreenChange, false);
        window.document.removeEventListener('mozfullscreenchange', doFullscreenChange, false);
        window.document.removeEventListener('fullscreenchange', doFullscreenChange, false);
        window.document.removeEventListener('MSFullscreenChange', doFullscreenChange, false);

        if (_this.renderer) {
          _this.renderer.destroy();
        }
      };

      this.destroy();
      this.data = data;
      this.data.instance = this;
      this.stats = {};
      this.subscriptions = {};
      this.utils = Utils;
      this.showControls = this.data.crop ? false : true;
      this.fullscreen = false;

      if (!this.data.type || this.data.type.indexOf("360") === -1) {
        this.renderer = new RendererFlat(this.data);
      } else {
        this.renderer = new Renderer360(this.data);
      }

      if (this.data.crop) {
        this.data.cropper = new Cropper(this.data);
      }

      window.addEventListener('keydown', doKeyPress, false);
      window.document.addEventListener('webkitfullscreenchange', doFullscreenChange, false);
      window.document.addEventListener('mozfullscreenchange', doFullscreenChange, false);
      window.document.addEventListener('fullscreenchange', doFullscreenChange, false);
      window.document.addEventListener('MSFullscreenChange', doFullscreenChange, false);
    }

    _createClass(ImageRenderer, [{
      key: "download",
      value: function download() {
        var canvas = this.data.element.querySelector("canvas");
        canvas.toBlob(function (file) {
          var a = window.document.createElement("a");
          a.download = true;
          a.href = window.URL.createObjectURL(file);
          a.click();
        });
      }
    }, {
      key: "isFullscreen",
      value: function isFullscreen() {
        return this.fullscreen;
      }
    }, {
      key: "exitFullscreen",
      value: function exitFullscreen() {
        var canvasWrapper = this.data.element;
        canvasWrapper.parentNode.classList.remove("fullscreen");

        if (window.document.exitFullscreen) {
          window.document.exitFullscreen();
        } else if (window.document.webkitExitFullscreen) {
          window.document.webkitExitFullscreen();
        } else if (window.document.mozCancelFullScreen) {
          window.document.mozCancelFullScreen();
        } else if (window.document.msExitFullscreen) {
          window.document.msExitFullscreen();
        }
      }
    }, {
      key: "enterFullscreen",
      value: function enterFullscreen() {
        var canvasWrapper = this.data.element;
        canvasWrapper.parentNode.classList.add("fullscreen");

        if (canvasWrapper.requestFullscreen) {
          canvasWrapper.requestFullscreen();
        } else if (canvasWrapper.webkitRequestFullscreen) {
          canvasWrapper.webkitRequestFullscreen();
        } else if (canvasWrapper.mozRequestFullScreen) {
          canvasWrapper.mozRequestFullScreen();
        } else if (canvasWrapper.msRequestFullscreen) {
          canvasWrapper.msRequestFullscreen();
        }
      }
    }, {
      key: "toggleFullscreen",
      value: function toggleFullscreen() {
        if (this.isFullscreen()) {
          this.exitFullscreen();
        } else {
          this.enterFullscreen();
        }

        this.fullscreen = !this.fullscreen; // var iOS = !!window.navigator.platform && /iPad|iPhone|iPod/.test(window.navigator.platform);
        // if (iOS) {
        // 	this.fullscreen = !this.fullscreen
        // }
      }
    }, {
      key: "keyDown",
      value: function keyDown(self, e) {
        if (e.key.toLowerCase() === 'escape' || e.key.toLowerCase() === 'esc' || e.keyCode === 27) {
          self.exitFullscreen();
        }
      }
    }, {
      key: "subscribe",
      value: function subscribe(event, callback) {
        if (!this.subscriptions[event]) {
          this.subscriptions[event] = [];
        }

        this.subscriptions[event].push(callback);
      }
    }, {
      key: "trigger",
      value: function trigger(event, data) {
        if (!this.subscriptions[event]) {
          return;
        }

        for (var i = 0; i < this.subscriptions[event].length; i++) {
          this.subscriptions[event][i](data);
        }
      }
    }, {
      key: "updateZoomHandle",
      value: function updateZoomHandle(invert) {
        var zoomRangeHandle = this.data.element.querySelector(".zoom-range-handle");

        if (!zoomRangeHandle) {
          return;
        }

        var range = this.stats.maxZoom - this.stats.minZoom;
        var currentPosition = this.stats.z - this.stats.minZoom;
        var percent = currentPosition / range;
        zoomRangeHandle.style.bottom = (invert ? 100 - percent * 100 : percent * 100) + "%";
      }
    }, {
      key: "createControls",
      value: function createControls(options) {
        var self = this;

        var exitHandler = function exitHandler() {
          self.fullscreen = !self.fullscreen;

          if (!self.fullscreen) {
            var canvasWrapper = self.data.element;
            canvasWrapper.classList.remove("fullscreen");

            if (options.onExitFullscreen) {
              options.onExitFullscreen(options.self);
            }
          }
        };

        var isMobile = /iPad|iPhone|iPod|Android/.test(window.navigator.userAgent);
        var buttonWrapper = this.data.element.querySelectorAll(".buttonWrapper");
        var zoomControlsWrapper;

        if (buttonWrapper && buttonWrapper.length) {
          for (var b = 0; b < buttonWrapper.length; b++) {
            buttonWrapper[b].parentNode.removeChild(buttonWrapper[b]);
          }
        }

        buttonWrapper = window.document.createElement("div");
        buttonWrapper.classList.add("buttonWrapper");
        this.data.element.appendChild(buttonWrapper);
        var vr = options.vr;
        var fullscreen = options.fullscreen;
        var zoom = options.zoom;
        var zoomSelf = options.self;

        var zoomMouseDown = function zoomMouseDown(e) {
          e.preventDefault();
          e.stopPropagation();
          zoomControlsWrapper.classList.add("active");
          var isDragging = true;
          var y = 0;
          var lastY = e.clientY;

          var mouseMove = function mouseMove(e) {
            e.preventDefault();
            e.stopPropagation();

            if (isDragging === true) {
              y = -(e.clientY - lastY);
              zoom(y / 20, zoomSelf);
              lastY = e.clientY;
            }
          };

          var mouseUp = function mouseUp() {
            zoomControlsWrapper.classList.remove("active");
            window.document.removeEventListener("mousemove", mouseMove, false);
            window.document.removeEventListener("mouseup", mouseUp, false);
          };

          window.document.addEventListener("mousemove", mouseMove, false);
          window.document.addEventListener("mouseup", mouseUp, false);
        };

        if (vr) {
          var vrButton = window.document.createElement("button");
          vrButton.innerHTML = '<e1-icon type="cardboard"></e1-icon>';
          vrButton.addEventListener('click', function () {
            vr(options.self);
          }, false);
          buttonWrapper.appendChild(vrButton);
        }

        if (fullscreen) {
          window.document.removeEventListener('webkitfullscreenchange', exitHandler, false);
          window.document.removeEventListener('mozfullscreenchange', exitHandler, false);
          window.document.removeEventListener('fullscreenchange', exitHandler, false);
          window.document.removeEventListener('MSFullscreenChange', exitHandler, false);
          var fullscreenButton = window.document.createElement("button");
          fullscreenButton.className = "fullscreen-button";
          fullscreenButton.innerHTML = '<e1-icon type="fullscreen"></e1-icon>';
          fullscreenButton.addEventListener('click', fullscreen.bind(options.self), false);
          buttonWrapper.appendChild(fullscreenButton);
          window.document.addEventListener('webkitfullscreenchange', exitHandler, false);
          window.document.addEventListener('mozfullscreenchange', exitHandler, false);
          window.document.addEventListener('fullscreenchange', exitHandler, false);
          window.document.addEventListener('MSFullscreenChange', exitHandler, false);
        }

        if (zoom) {
          zoomControlsWrapper = window.document.createElement("div");
          zoomControlsWrapper.className = isMobile ? "zoom-controls mobile" : "zoom-controls";
          var zoomPlus = window.document.createElement("button");
          zoomPlus.className = "zoom-plus";
          zoomPlus.innerHTML = '<e1-icon type="plus"></e1-icon>';
          zoomPlus.addEventListener("click", function () {
            zoom(1, options.self);
          }, false);
          var zoomMinus = window.document.createElement("button");
          zoomMinus.className = "zoom-minus";
          zoomMinus.innerHTML = '<e1-icon type="minus"></e1-icon>';
          zoomMinus.addEventListener("click", function () {
            zoom(-1, options.self);
          }, false);
          var zoomRange = window.document.createElement("div");
          zoomRange.className = "zoom-range";
          zoomRange.addEventListener("mousedown", zoomMouseDown.bind(this), false);
          var zoomRangeHandle = window.document.createElement("div");
          zoomRangeHandle.className = "zoom-range-handle";
          zoomRangeHandle.addEventListener("mousedown", zoomMouseDown.bind(this), false);
          zoomRange.appendChild(zoomRangeHandle);
          zoomControlsWrapper.appendChild(zoomPlus);
          zoomControlsWrapper.appendChild(zoomRange);
          zoomControlsWrapper.appendChild(zoomMinus);
          buttonWrapper.appendChild(zoomControlsWrapper);
        }
      }
    }]);

    return ImageRenderer;
  }();

  module.exports = ImageRenderer;
  window.ImageRenderer = ImageRenderer;
})();

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function () {
  var Utils = __webpack_require__(1);

  var RendererFlat =
  /*#__PURE__*/
  function () {
    function RendererFlat(data) {
      var _this = this;

      _classCallCheck(this, RendererFlat);

      var self = this;

      var resize = function resize() {
        self.setTransforms();
      };

      this.destroy = function () {
        window.removeEventListener("resize", resize, false); // window.onorientationchange = null

        if (_this.canvasWrapper) {
          _this.canvasWrapper.innerHTML = "";
        }
      };

      this.destroy();
      this.data = data;
      this.canDoVR = false;
      this.is3D = data.type && data.type.toLowerCase().indexOf("stereo") > -1;
      this.isMobile = /iPad|iPhone|iPod|Android/.test(window.navigator.userAgent);
      this.cache = {};
      this.cacheSize = this.isMobile ? 4000 : 6000;
      this.cacheId = 0;
      this.previousCache = null;
      this.originalImage = {};
      this.activeCache = null;
      this.image = null;
      this.zoomMin = null;
      this.zoomMax = 1;
      this.zoomQueue = [];
      this.zoom = null;
      this.translateX = 0;
      this.translateY = 0;
      this.canvas = null;
      this.canvasWrapper = data.element;
      this.canvasWrapper.innerHTML = "";
      this.hasLoadedControls = false;
      this.controlOptions = {};
      this.resize = this.setTransforms;

      this.reset = function () {
        _this.setCanvasImage(_this.cache);

        _this.zoomMin = _this.getMinZoom(_this.cache.width, _this.cache.height);
        _this.zoomMax = _this.getMaxZoom();
        _this.zoom = _this.zoomMin;

        _this.setTransforms();
      };

      Utils.canDoVr().then(function (res) {
        _this.canDoVr = res;
        _this.controlOptions = {
          fullscreen: _this.toggleFullscreen,
          onExitFullscreen: _this.onExitFullscreen,
          zoom: _this.doZoom,
          self: _this
        };

        if (_this.is3D && _this.canDoVR) {
          _this.controlOptions.vr = _this.toggleVr;
        }

        _this.run();

        window.addEventListener("resize", resize, false); // window.onorientationchange = resize
      });
    }

    _createClass(RendererFlat, [{
      key: "setImage",
      value: function setImage(_img, ready) {
        this.image = _img;

        if (this.is3D) {
          this.originalImage = this.setCache(true);
        }

        this.activeCache = this.cache = this.setCache();
        this.setCanvasImage(this.cache);
        this.zoomMin = this.getMinZoom(this.cache.width, this.cache.height);
        this.zoomMax = this.getMaxZoom();

        if (!this.zoom) {
          this.zoom = this.zoomMin;
        }

        this.setTransforms();

        if (!this.hasLoadedControls && this.data.instance.showControls) {
          this.data.instance.createControls(this.controlOptions);
          this.hasLoadedControls = true;
        }

        this.sendUpdate(ready);
      }
    }, {
      key: "doZoom",
      value: function doZoom(amount, self) {
        amount = amount / 4;
        var queueCount = 8;

        while (queueCount--) {
          self.zoomQueue.push(amount / 8);
        }

        var runZoom = function runZoom() {
          window.requestAnimationFrame(function () {
            if (self.zoomQueue.length) {
              self.setZoom(self.zoomQueue.shift());
              self.setTransforms();
              runZoom();
            }
          });
        };

        runZoom();
      }
    }, {
      key: "toggleVr",
      value: function toggleVr() {
        if (this.is3D && this.canDoVR) {
          if (this.data.instance.isFullscreen()) {
            this.activeCache = this.cache;
            this.setCanvasImage(this.cache);
            this.zoomMin = this.getMinZoom(this.cache.width, this.cache.height);
          } else {
            this.activeCache = this.originalImage;
            this.setCanvasImage(this.originalImage);
            this.zoomMin = this.getMinZoom(this.originalImage.width, this.originalImage.height);
          }

          this.zoomMax = this.getMaxZoom();
          this.zoom = this.zoomMin;
          this.setZoom(0);
          this.setTransforms();
          this.sendUpdate();
        }

        this.data.instance.toggleFullscreen();
      }
    }, {
      key: "onExitFullscreen",
      value: function onExitFullscreen(self) {
        setTimeout(function () {
          self.zoom = self.zoomMin;
          self.setTransforms();
        }, 200);
      }
    }, {
      key: "toggleFullscreen",
      value: function toggleFullscreen() {
        var _this2 = this;

        this.data.instance.toggleFullscreen();
        setTimeout(function () {
          _this2.setTransforms();
        }, 200);
      }
    }, {
      key: "setCanvasImage",
      value: function setCanvasImage(_imgCache) {
        if (!this.previousCache || _imgCache.id !== this.previousCache.id) {
          this.canvas.width = _imgCache.width;
          this.canvas.height = _imgCache.height;
          this.canvas.getContext("2d").drawImage(_imgCache.canvas, 0, 0);
          this.previousCache = _imgCache;
        }
      }
    }, {
      key: "setCache",
      value: function setCache(allow3D) {
        return {
          id: this.cacheId++,
          canvas: this.proxyImg(this.cacheSize, allow3D),
          width: this.cacheSize,
          height: this.image.height * (this.cacheSize / this.image.width)
        };
      }
    }, {
      key: "getMinZoom",
      value: function getMinZoom(w, h) {
        return Math.min(this.canvasWrapper.offsetWidth / w, this.canvasWrapper.offsetHeight / h);
      }
    }, {
      key: "getMaxZoom",
      value: function getMaxZoom() {
        return Math.min(this.canvasWrapper.offsetWidth / this.activeCache.width, this.canvasWrapper.offsetHeight / this.activeCache.height) * (this.data.type === "Super resolution" ? 10 : 5);
      }
    }, {
      key: "proxyImg",
      value: function proxyImg(width, allow3D) {
        if (this.is3D && !allow3D) {
          this.image.width = this.image.width / 2;
        }

        var height = this.image.height * (width / this.image.width);
        var pCtx = window.document.createElement("canvas").getContext("2d");
        pCtx.canvas.width = width;
        pCtx.canvas.height = height;
        pCtx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, width, height);
        return pCtx.canvas;
      }
    }, {
      key: "setTransforms",
      value: function setTransforms() {
        this.canvas.style.left = -((this.activeCache.width - this.canvasWrapper.offsetWidth) / 2) + "px";
        this.canvas.style.top = -((this.activeCache.height - this.canvasWrapper.offsetHeight) / 2) + "px";
        this.setBounds();
        this.canvas.style.transform = "" + "scale(" + this.zoom + ") " + "translateX(" + this.translateX + "px)" + "translateY(" + this.translateY + "px)" + "translateZ(0px)";
        this.sendUpdate();
      }
    }, {
      key: "sendUpdate",
      value: function sendUpdate(ready) {
        this.data.instance.stats.x = this.translateX;
        this.data.instance.stats.y = this.translateY;
        this.data.instance.stats.z = this.zoom;
        this.data.instance.stats.cropZ = this.zoom;
        this.data.instance.stats.viewWidth = this.canvasWrapper.offsetWidth * window.devicePixelRatio;
        this.data.instance.stats.viewHeight = this.canvasWrapper.offsetHeight * window.devicePixelRatio;
        this.data.instance.stats.renderWidth = Math.round(Math.min(this.cache.width * this.zoom, this.canvasWrapper.offsetWidth)) * window.devicePixelRatio;
        this.data.instance.stats.renderHeight = Math.round(Math.min(this.cache.height * this.zoom, this.canvasWrapper.offsetHeight)) * window.devicePixelRatio;
        this.data.instance.stats.status = "drawing";
        this.data.instance.stats.minZoom = this.zoomMin;
        this.data.instance.stats.maxZoom = this.zoomMax;
        this.data.instance.stats.type = "flat";
        this.data.instance.stats.canvas = this.canvas;

        if (ready) {
          this.data.instance.stats.ready = 1;
        }

        this.data.instance.updateZoomHandle();
        this.data.instance.trigger("statsUpdate", this.data.instance.stats);
      }
    }, {
      key: "setZoom",
      value: function setZoom(amount) {
        var z = this.zoom + amount;
        var ratio = (z - this.zoomMin) / (this.zoomMax - this.zoomMin);
        this.zoomMin = this.getMinZoom(this.activeCache.width, this.activeCache.height);
        this.zoomMax = this.getMaxZoom();
        z = (this.zoomMax - this.zoomMin) * ratio + this.zoomMin; // z = (this.zoomMax * ratio)

        if (z < this.zoomMin) {
          z = this.zoomMin;
        }

        if (z > this.zoomMax) {
          z = this.zoomMax;
        }

        this.zoom = z;
      }
    }, {
      key: "mouseDown",
      value: function mouseDown(e) {
        var _this3 = this;

        e.preventDefault();
        var self = this;
        var box = this.canvas.getBoundingClientRect();
        var originalX = (e.pageX || e.targetTouches[0].pageX) - box.left;
        var originalY = (e.pageY || e.targetTouches[0].pageY) - box.top;

        var mouseMove = function mouseMove(e) {
          box = _this3.canvas.getBoundingClientRect();
          var distanceX = (e.pageX || e.targetTouches[0].pageX) - box.left - originalX;
          var distanceY = (e.pageY || e.targetTouches[0].pageY) - box.top - originalY;
          self.translateX = self.translateX + distanceX;
          self.translateY = self.translateY + distanceY;
          self.setTransforms();
        };

        var mouseUp = function mouseUp() {
          self.canvas.removeEventListener("mousemove", mouseMove, false);
          window.document.body.removeEventListener("mouseleave", mouseUp, false);
          window.document.body.removeEventListener("mouseup", mouseUp, false);
          self.canvas.removeEventListener("touchmove", mouseMove, false);
          window.document.body.removeEventListener("touchend", mouseUp, false);
          window.document.body.removeEventListener("touchcancel", mouseUp, false);
        };

        self.canvas.addEventListener("mousemove", mouseMove, false);
        window.document.body.addEventListener("mouseleave", mouseUp, false);
        window.document.body.addEventListener("mouseup", mouseUp, false);
        self.canvas.addEventListener("touchmove", mouseMove, false);
        window.document.body.addEventListener("touchend", mouseUp, false);
        window.document.body.addEventListener("touchcancel", mouseUp, false);
      }
    }, {
      key: "setBounds",
      value: function setBounds() {
        this.setZoom(0);
        var maxLeft = (this.activeCache.width - this.canvasWrapper.offsetWidth / this.zoom) / 2;
        var maxRight = -maxLeft;
        var maxTop = (this.activeCache.height - this.canvasWrapper.offsetHeight / this.zoom) / 2;
        var maxBottom = -maxTop;

        if (this.translateX > maxLeft) {
          this.translateX = maxLeft;
        }

        if (this.translateX < maxRight) {
          this.translateX = maxRight;
        }

        if (this.translateY > maxTop) {
          this.translateY = maxTop;
        }

        if (this.translateY < maxBottom) {
          this.translateY = maxBottom;
        }

        var renderHeight = this.activeCache.height * this.zoom;

        if (renderHeight < this.canvasWrapper.offsetHeight) {
          this.translateY = this.translateY - (this.canvasWrapper.offsetHeight - renderHeight) / 2 / this.zoom;
        }

        var renderWidth = this.activeCache.width * this.zoom;

        if (renderWidth < this.canvasWrapper.offsetWidth) {
          this.translateX = this.translateX - (this.canvasWrapper.offsetWidth - renderWidth) / 2 / this.zoom;
        }

        this.translateX = Math.round(this.translateX * 100) / 100;
        this.translateY = Math.round(this.translateY * 100) / 100;
      }
    }, {
      key: "run",
      value: function run() {
        var _this4 = this;

        this.canvas = window.document.createElement("canvas");
        this.canvas.style.position = "relative";
        this.canvasWrapper.appendChild(this.canvas);
        this.canvasWrapper.classList.add("flat-render");
        this.canvasWrapper.parentNode.style.paddingTop = '5px;';
        Utils.initImages(this.data, function (_img) {
          _this4.originalImage = _img;
          _this4.canvasWrapper.parentNode.style.display = "block";
          _this4.canvasWrapper.parentNode.style.height = "0px";
          _this4.canvasWrapper.parentNode.style.width = "100%";
          _this4.canvasWrapper.parentNode.style.paddingTop = _img.height / (_this4.is3D ? _img.width / 2 : _img.width) * 100 + "%";

          _this4.setImage(_img, true);
        }, function (_img) {
          _this4.canvasWrapper.parentNode.style.display = "block";
          _this4.canvasWrapper.parentNode.style.height = "0px";
          _this4.canvasWrapper.parentNode.style.width = "100%";
          _this4.canvasWrapper.parentNode.style.paddingTop = _img.height / (_this4.is3D ? _img.width / 2 : _img.width) * 100 + "%";

          _this4.setImage(_img);
        }, this.reject);
        this.canvas.addEventListener("mousedown", this.mouseDown.bind(this), false);
        this.canvas.addEventListener("touchstart", this.mouseDown.bind(this), false);
        this.data.instance.subscribe("resize", this.setTransforms.bind(this));
        this.data.instance.subscribe("reset", function () {
          _this4.zoom = _this4.zoomMin = _this4.getMinZoom(_this4.cache.width, _this4.cache.height);

          _this4.setTransforms();
        });
      }
    }]);

    return RendererFlat;
  }();

  module.exports = RendererFlat;
})();

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function () {
  var Utils = __webpack_require__(1);

  var RenderVR = __webpack_require__(59);

  var Renderer360 =
  /*#__PURE__*/
  function () {
    function Renderer360(data) {
      var _this = this;

      _classCallCheck(this, Renderer360);

      var self = this;

      var resize = function resize(e) {
        _this._resize(self, e);
      };

      var onDocumentMouseUp = function onDocumentMouseUp(e) {
        _this.onDocumentMouseUp(self, e);
      };

      var onDocumentMouseDown = function onDocumentMouseDown(e) {
        _this.onDocumentMouseDown(self, e);
      };

      var onDocumentMouseMove = function onDocumentMouseMove(e) {
        _this.onDocumentMouseMove(self, e);
      };

      this.destroy = function () {
        window.cancelAnimationFrame(_this.animationFrame);
        window.document.removeEventListener("mouseup", onDocumentMouseUp, false);
        window.document.removeEventListener("mousemove", onDocumentMouseMove, false);
        window.removeEventListener("resize", resize, true);

        if (_this.canvasWrapper) {
          _this.canvasWrapper.removeEventListener("mousedown", onDocumentMouseDown, false);

          _this.canvasWrapper.innerHTML = "";
        }
      };

      this.destroy();
      this.data = data;
      this.canDoVr = false;
      this.is3D = data.type.toLowerCase().indexOf("stereo") > -1;
      this.zoomQueue = [];
      this.minZoom = 5;
      this.maxZoom = 50;
      this.zoom = 40;
      this.distance = 50;
      this.ready = false;
      this.lon = 270;
      this.lat = 0;
      this.phi = 0;
      this.theta = 0;
      this.renderer = null;
      this.scene = null;
      this.camera = null;
      this.texture = null;
      this.material = null;
      this.isUserInteracting = null;
      this.originalImage = null;
      this.ctxTop = window.document.createElement("canvas").getContext("2d"); // for 3d photospheres

      this.onPointerDownPointerX = 0;
      this.onPointerDownPointerY = 0;
      this.onPointerDownLon = 0;
      this.onPointerDownLat = 0;
      this.animationFrame = null;
      this.canvasWrapper = this.data.element;
      this.hasLoadedControls = false;
      this.resize = resize;
      this.reset = resize;
      Utils.canDoVr().then(function (res) {
        _this.canDoVr = res;

        if (_this.canDoVr) {
          _this.data.instance.renderer = new RenderVR(_this.data);
          return;
        }

        _this.run();

        window.document.addEventListener("mouseup", onDocumentMouseUp, false);
        window.addEventListener("resize", resize, true);

        _this.canvasWrapper.addEventListener("mousedown", onDocumentMouseDown, false);

        window.document.addEventListener("mousemove", onDocumentMouseMove, false);
      });
    }

    _createClass(Renderer360, [{
      key: "onDocumentMouseDown",
      value: function onDocumentMouseDown(self, event) {
        event.preventDefault();
        self.isUserInteracting = true;
        self.onPointerDownPointerX = event.clientX;
        self.onPointerDownPointerY = event.clientY;
        self.onPointerDownLon = self.lon;
        self.onPointerDownLat = self.lat;
      }
    }, {
      key: "onDocumentMouseMove",
      value: function onDocumentMouseMove(self, event) {
        if (self.isUserInteracting === true) {
          self.lon = (self.onPointerDownPointerX - event.clientX) * 0.1 + self.onPointerDownLon;
          self.lat = (self.onPointerDownPointerY - event.clientY) * 0.1 + self.onPointerDownLat;
        }
      }
    }, {
      key: "onDocumentMouseUp",
      value: function onDocumentMouseUp(self) {
        self.isUserInteracting = false;
      }
    }, {
      key: "_resize",
      value: function _resize(self) {
        if (self.data.instance.isFullscreen()) {
          self.canvasWrapper.parentNode.classList.add("fullscreen");
        } else {
          self.canvasWrapper.parentNode.classList.remove("fullscreen");
        }

        if (self.renderer) {
          self.renderer.setSize(self.canvasWrapper.offsetWidth, self.canvasWrapper.offsetHeight);
          self.camera.aspect = self.renderer.domElement.clientWidth / self.renderer.domElement.clientHeight;
          self.camera.updateProjectionMatrix();
        }
      }
    }, {
      key: "setImages",
      value: function setImages(_img) {
        if (this.is3D) {
          this.ctxTop.canvas.width = _img.width;
          this.ctxTop.canvas.height = _img.height / 2;
          this.ctxTop.drawImage(_img, 0, 0);
          _img = this.ctxTop.canvas;
        }

        return _img;
      }
    }, {
      key: "sendUpdate",
      value: function sendUpdate() {
        if (this.data.instance.stats.ready !== this.ready || this.data.instance.stats.x !== this.lon || this.data.instance.stats.y !== this.lat || this.data.instance.stats.z !== this.distance || this.data.instance.stats.viewWidth !== this.canvasWrapper.offsetWidth * window.devicePixelRatio || this.data.instance.stats.viewHeight !== this.canvasWrapper.offsetHeight * window.devicePixelRatio) {
          this.data.instance.stats.ready = this.ready;
          this.data.instance.stats.x = this.lon;
          this.data.instance.stats.y = this.lat;
          this.data.instance.stats.z = this.distance;
          this.data.instance.stats.viewWidth = this.data.instance.stats.renderWidth = this.canvasWrapper.offsetWidth * window.devicePixelRatio;
          this.data.instance.stats.viewHeight = this.data.instance.stats.renderHeight = this.canvasWrapper.offsetHeight * window.devicePixelRatio;
          this.data.instance.stats.status = "drawing";
          this.data.instance.stats.minZoom = this.minZoom;
          this.data.instance.stats.maxZoom = this.maxZoom;
          this.data.instance.stats.type = "360";
          this.data.instance.stats.canvas = this.renderer.domElement;
          this.data.instance.stats.originalImage = this.originalImage;
          this.data.instance.updateZoomHandle(true);
          this.data.instance.trigger("statsUpdate", this.data.instance.stats);
        }
      }
    }, {
      key: "draw",
      value: function draw() {
        this.lat = Math.max(-85, Math.min(85, this.lat));
        this.phi = window.THREE.Math.degToRad(90 - this.lat);
        this.theta = window.THREE.Math.degToRad(this.lon - 180);
        this.camera.position.x = this.distance * Math.sin(this.phi) * Math.cos(this.theta);
        this.camera.position.y = this.distance * Math.cos(this.phi);
        this.camera.position.z = this.distance * Math.sin(this.phi) * Math.sin(this.theta);
        this.camera.lookAt(this.scene.position);
        this.renderer.render(this.scene, this.camera);
        this.sendUpdate();
      }
    }, {
      key: "animate",
      value: function animate() {
        this.animationFrame = window.requestAnimationFrame(this.animate.bind(this));
        this.draw();
      }
    }, {
      key: "fullscreen",
      value: function fullscreen(e) {
        var _this2 = this;

        this.data.instance.toggleFullscreen(e);
        setTimeout(function () {
          _this2._resize(_this2);
        }, 200);
      }
    }, {
      key: "onExitFullscreen",
      value: function onExitFullscreen(self) {
        setTimeout(function () {
          self._resize(self);
        }, 200);
      }
    }, {
      key: "doZoom",
      value: function doZoom(amount, self) {
        var queueCount = 11;
        amount = -amount * 1.5;

        while (queueCount--) {
          self.zoomQueue.push(amount);
        }

        var runZoom = function runZoom() {
          window.requestAnimationFrame(function () {
            if (self.zoomQueue.length) {
              var queueAmount = self.zoomQueue.shift();
              self.distance = self.distance + queueAmount;

              if (self.distance < self.minZoom) {
                self.distance = self.minZoom;
              }

              if (self.distance > self.maxZoom) {
                self.distance = self.maxZoom;
              }

              runZoom();
            }
          });
        };

        runZoom();
      }
    }, {
      key: "finish",
      value: function finish(_img, ready) {
        var i = this.setImages(_img);
        this.texture.image = i;
        this.texture.needsUpdate = true;
        this.draw();

        if (!this.hasLoadedControls && this.data.instance.showControls) {
          var controlOptions = {
            fullscreen: this.fullscreen,
            onExitFullscreen: this.onExitFullscreen,
            zoom: this.doZoom,
            self: this
          };
          this.data.instance.createControls(controlOptions);
        }

        this.hasLoadedControls = true;

        this._resize(this);

        if (ready) {
          this.ready = true;
          this.sendUpdate();
        }
      }
    }, {
      key: "resolve",
      value: function resolve() {}
    }, {
      key: "reject",
      value: function reject() {}
    }, {
      key: "run",
      value: function run() {
        var _this3 = this;

        this.renderer = new window.THREE.WebGLRenderer({
          antialiasing: false,
          preserveDrawingBuffer: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.canvasWrapper.offsetWidth, this.canvasWrapper.offsetHeight);
        this.canvasWrapper.appendChild(this.renderer.domElement);
        this.renderer.domElement.preserveDrawingBuffer = true;
        this.renderer.domElement.id = "viewer-canvas";
        this.renderer.domElement.setAttribute("type", "360");
        this.scene = new window.THREE.Scene();
        this.camera = new window.THREE.PerspectiveCamera(this.zoom, this.canvasWrapper.offsetWidth / this.canvasWrapper.offsetHeight, 1, 2000);
        this.camera.layers.enable(1); // render left view when no stereo available

        this.camera.target = new window.THREE.Vector3(0, 0, 0);
        this.camera.lookAt(this.camera.target);
        this.camera.aspect = this.renderer.domElement.clientWidth / this.renderer.domElement.clientHeight;
        this.camera.updateProjectionMatrix();
        var geometry = new window.THREE.SphereGeometry(100, 100, 40);
        geometry.applyMatrix(new window.THREE.Matrix4().makeScale(-1, 1, 1));
        geometry.applyMatrix(new window.THREE.Matrix4().makeRotationY(-Math.PI / 2));
        this.texture = new window.THREE.Texture();
        this.texture.format = 1022;
        this.material = new window.THREE.MeshBasicMaterial({
          transparent: true,
          map: this.texture
        });
        var mesh = new window.THREE.Mesh(geometry, this.material);
        this.scene.add(mesh);
        this.animate();
        this.canvasWrapper.parentNode.style.paddingTop = '5px;';
        Utils.initImages(this.data, function (_img) {
          _this3.originalImage = _img;
          _this3.canvasWrapper.parentNode.style.display = "block";
          _this3.canvasWrapper.parentNode.style.height = "0px";
          _this3.canvasWrapper.parentNode.style.width = "100%";
          _this3.canvasWrapper.parentNode.style.paddingTop = 9 / 16 * 100 + "%";

          _this3.finish(_img, true);

          _this3.resolve();
        }, function (_img) {
          _this3.canvasWrapper.parentNode.style.display = "block";
          _this3.canvasWrapper.parentNode.style.height = "0px";
          _this3.canvasWrapper.parentNode.style.width = "100%";
          _this3.canvasWrapper.parentNode.style.paddingTop = 9 / 16 * 100 + "%";

          _this3.finish(_img);
        }, this.reject);
      }
    }]);

    return Renderer360;
  }();

  module.exports = Renderer360;
})();

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function () {
  var Utils = __webpack_require__(1);

  var RendererVR =
  /*#__PURE__*/
  function () {
    function RendererVR(data) {
      var _this = this;

      _classCallCheck(this, RendererVR);

      var self = this;

      var resize = function resize() {
        self.positionCanvas(self);
      };

      this.destroy = function () {
        window.removeEventListener("resize", positionCanvas, false);
        window.removeEventListener("vrdisplaypresentchange", presentChange, false);
      };

      var positionCanvas = function positionCanvas() {
        self.positionCanvas(self);
      };

      var presentChange = function presentChange() {
        self.presentChange(self);
      };

      this.destroy();
      this.data = data;
      this.canDoVR = false;
      this.is3D = data.type.toLowerCase().indexOf("stereo") > -1;
      this.canvasWrapper = data.element;
      this.glAttribs = {
        antialias: true
      };

      if (this.data.crop) {
        this.glAttribs.preserveDrawingBuffer = true;
      }

      this.frameData = new window.VRFrameData();
      this.vrDisplay = null;
      this.vrSceneFrame = null;
      this.panorama = null;
      this.panorama2 = null;
      this.viewMat = window.mat4.create();
      this.canvas = window.document.createElement("canvas");
      this.img1 = null;
      this.img2 = null;
      this.originalImage = null;
      this.ctxTop = window.document.createElement("canvas").getContext("2d");
      this.ctxBottom = window.document.createElement("canvas").getContext("2d");
      this.gl = this.canvas.getContext("webgl", this.glAttribs);
      this.isPresenting = false;
      this.normalSceneFrame = null;
      this.resize = resize;
      this.hasLoadedControls = false;
      Utils.canDoVr().then(function (res) {
        _this.canDoVR = res ? true : false;
        _this.vrDisplay = res;

        _this.run();

        window.addEventListener("resize", positionCanvas, false);
        window.addEventListener("vrdisplaypresentchange", presentChange, false);
      });
    }

    _createClass(RendererVR, [{
      key: "present",
      value: function present(self) {
        self.vrDisplay.requestPresent([{
          source: self.canvas
        }]).then(function () {
          self.onPresent();
        });
      }
    }, {
      key: "setImages",
      value: function setImages(img) {
        this.ctxTop.canvas.width = this.ctxBottom.canvas.width = 4096;
        this.ctxTop.canvas.height = this.ctxBottom.canvas.height = 2048;

        if (img.width > 4096) {
          var height = img.height * (4096 / img.width);
          var pCtx = window.document.createElement("canvas").getContext("2d");
          pCtx.canvas.width = 4096;
          pCtx.canvas.height = height;
          pCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 4096, height);
          img = pCtx.canvas;
        }

        if (this.is3D || img.width === img.height) {
          this.ctxTop.drawImage(img, 0, 0, img.width, img.height / 2, 0, 0, this.ctxTop.canvas.width, this.ctxTop.canvas.height);
          this.ctxBottom.drawImage(img, 0, img.height / 2, img.width, img.height / 2, 0, 0, this.ctxBottom.canvas.width, this.ctxBottom.canvas.height);
          this.img1 = this.ctxTop.canvas;
          this.img2 = this.ctxBottom.canvas;
        } else {
          this.ctxTop.drawImage(img, 0, 0, img.width, img.height, 0, 0, this.ctxTop.canvas.width, this.ctxTop.canvas.height);
          this.img1 = this.ctxTop.canvas;
          this.img2 = this.ctxTop.canvas;
        }
      }
    }, {
      key: "getPoseMatrix",
      value: function getPoseMatrix(out, pose) {
        var orientation = pose.orientation;

        if (!orientation) {
          orientation = [0, 0, 0, 1];
        }

        window.mat4.fromQuat(out, orientation);
        window.mat4.invert(out, out);
      }
    }, {
      key: "sendUpdate",
      value: function sendUpdate() {
        if (this.data.instance.stats.ready !== this.ready || this.data.instance.stats.viewWidth !== this.canvasWrapper.offsetWidth * window.devicePixelRatio || this.data.instance.stats.viewHeight !== this.canvasWrapper.offsetHeight * window.devicePixelRatio) {
          this.data.instance.stats.x = 0;
          this.data.instance.stats.y = 0;
          this.data.instance.stats.z = 0;
          this.data.instance.stats.viewWidth = this.data.instance.stats.renderWidth = this.canvasWrapper.offsetWidth * window.devicePixelRatio;
          this.data.instance.stats.viewHeight = this.data.instance.stats.renderHeight = this.canvasWrapper.offsetHeight * window.devicePixelRatio;
          this.data.instance.stats.status = "drawing";
          this.data.instance.stats.type = "vr";
          this.data.instance.stats.canvas = this.canvas;
          this.data.instance.stats.originalImage = this.originalImage;
          this.data.instance.stats.ready = this.ready;
          this.data.instance.trigger("statsUpdate", this.data.instance.stats);
        }
      }
    }, {
      key: "drawVRScene",
      value: function drawVRScene() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT || this.gl.DEPTH_BUFFER_BIT);
        this.vrSceneFrame = this.vrDisplay.requestAnimationFrame(this.drawVRScene.bind(this));
        this.vrDisplay.getFrameData(this.frameData);
        this.getPoseMatrix(this.viewMat, this.frameData.pose);
        this.gl.viewport(0, 0, this.canvas.width * 0.5, this.canvas.height);
        this.panorama.render(this.frameData.leftProjectionMatrix, this.viewMat);
        this.gl.viewport(this.canvas.width * 0.5, 0, this.canvas.width * 0.5, this.canvas.height);
        this.panorama2.render(this.frameData.rightProjectionMatrix, this.viewMat);
        this.vrDisplay.submitFrame();
        this.sendUpdate();
      }
    }, {
      key: "drawScene",
      value: function drawScene() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT || this.gl.DEPTH_BUFFER_BIT);
        this.normalSceneFrame = window.requestAnimationFrame(this.drawScene.bind(this));
        this.vrDisplay.getFrameData(this.frameData);
        this.getPoseMatrix(this.viewMat, this.frameData.pose);
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.panorama.render(this.frameData.leftProjectionMatrix, this.viewMat);
        this.vrDisplay.submitFrame();
        this.sendUpdate();
      }
    }, {
      key: "onPresent",
      value: function onPresent() {
        var _this2 = this;

        try {
          window.cancelAnimationFrame(this.normalSceneFrame);
        } catch (e) {}

        var btnWrapper = window.document.querySelector(".buttonWrapper");

        if (btnWrapper) {
          btnWrapper.parentElement.removeChild(btnWrapper);
        }

        this.canvasWrapper.parentNode.classList.add("fullscreen");
        setTimeout(function () {
          _this2.isPresenting = true;

          _this2.positionCanvas(_this2);

          if (!_this2.panorama) {
            _this2.panorama = new window.VRPanorama(_this2.gl);
          }

          _this2.panorama.useImage(_this2.img1);

          if (!_this2.panorama2) {
            _this2.panorama2 = new window.VRPanorama(_this2.gl);
          }

          _this2.panorama2.useImage(_this2.img2);

          _this2.drawVRScene();
        }, 500);
      }
    }, {
      key: "fullscreen",
      value: function fullscreen(e) {
        var _this3 = this;

        this.data.instance.toggleFullscreen(e);
        setTimeout(function () {
          _this3.positionCanvas(_this3);
        }, 200);
      }
    }, {
      key: "onNormalScene",
      value: function onNormalScene() {
        this.canvasWrapper.parentNode.classList.remove("fullscreen");

        try {
          this.vrDisplay.cancelAnimationFrame(this.vrSceneFrame);
        } catch (e) {}

        this.positionCanvas(this);

        if (!this.panorama) {
          this.panorama = new window.VRPanorama(this.gl);
        }

        this.panorama.useImage(this.img1);

        if (!this.panorama2) {
          this.panorama2 = new window.VRPanorama(this.gl);
        }

        this.panorama2.useImage(this.img2);
        return this.drawScene();
      }
    }, {
      key: "presentChange",
      value: function presentChange(self) {
        if (!self.vrDisplay.isPresenting) {
          self.isPresenting = false;
          self.run();
        }
      }
    }, {
      key: "positionCanvas",
      value: function positionCanvas(self) {
        if (self.isPresenting) {
          var leftEye = self.vrDisplay.getEyeParameters("left");
          var rightEye = self.vrDisplay.getEyeParameters("right");
          self.canvas.width = Math.max(leftEye.renderWidth, rightEye.renderWidth) * 2;
          self.canvas.height = Math.max(leftEye.renderHeight, rightEye.renderHeight);
          self.canvas.style.width = "100%";
          self.canvas.style.height = "100%";
          self.canvas.style.top = "0px";
          self.canvas.style.left = "0px";
        } else {
          self.canvas.style.position = "relative";
          self.canvas.width = Math.max(self.canvasWrapper.offsetWidth, self.canvasWrapper.offsetHeight) * window.devicePixelRatio;
          self.canvas.height = Math.max(self.canvasWrapper.offsetWidth, self.canvasWrapper.offsetHeight) * window.devicePixelRatio;
          self.canvas.style.width = self.canvas.width / window.devicePixelRatio + "px";
          self.canvas.style.height = self.canvas.height / window.devicePixelRatio + "px";
          self.canvas.style.top = (self.canvasWrapper.offsetHeight - self.canvas.height / window.devicePixelRatio) / 2 + "px";
          self.canvas.style.left = (self.canvasWrapper.offsetWidth - self.canvas.width / window.devicePixelRatio) / 2 + "px";
        }
      }
    }, {
      key: "reject",
      value: function reject() {}
    }, {
      key: "onExitFullscreen",
      value: function onExitFullscreen(self) {
        setTimeout(function () {
          self.positionCanvas(self);
        }, 200);
      }
    }, {
      key: "run",
      value: function run() {
        var _this4 = this;

        this.canvasWrapper.appendChild(this.canvas);
        this.canvas.setAttribute("type", "vr");

        if (!this.gl) {
          this.gl = this.canvas.getContext("experimental-webgl", this.glAttribs);
        }

        if (this.img1) {
          this.originalImage = this.img1;
          this.onNormalScene();
          this.data.instance.createControls({
            fullscreen: this.fullscreen,
            onExitFullscreen: this.onExitFullscreen,
            vr: this.present,
            self: this
          });
          this.hasLoadedControls = true;
          this.ready = true;
          window.E1.scan(this.canvasWrapper);
          return;
        }

        this.img1 = new window.Image();
        this.img2 = new window.Image();
        Utils.initImages(this.data, function (_img) {
          _this4.originalImage = _img;

          _this4.setImages(_img);

          _this4.canvasWrapper.parentNode.style.display = "block";
          _this4.canvasWrapper.parentNode.style.height = "0px";
          _this4.canvasWrapper.parentNode.style.width = "100%";
          _this4.canvasWrapper.parentNode.style.paddingTop = 9 / 16 * 100 + "%";

          if (_this4.vrDisplay.isPresenting) {
            _this4.onPresent();
          } else {
            _this4.onNormalScene();
          }

          if (!_this4.hasLoadedControls) {
            _this4.data.instance.createControls({
              vr: _this4.present,
              self: _this4
            });

            _this4.hasLoadedControls = true;
            _this4.ready = true;
          }
        }, function (_img) {
          _this4.canvasWrapper.parentNode.style.display = "block";
          _this4.canvasWrapper.parentNode.style.height = "0px";
          _this4.canvasWrapper.parentNode.style.width = "100%";
          _this4.canvasWrapper.parentNode.style.paddingTop = 9 / 16 * 100 + "%";

          _this4.setImages(_img);

          _this4.onNormalScene();
        }, this.reject);
      }
    }]);

    return RendererVR;
  }();

  module.exports = RendererVR;
})();

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function () {
  var Cropper =
  /*#__PURE__*/
  function () {
    function Cropper(data) {
      _classCallCheck(this, Cropper);

      this.element = data.element;
      this._data = data;
      this.data = {
        mousemove: false,
        positions: {
          y1: 0,
          y2: 0,
          x1: 0,
          x2: 0
        },
        elements: {}
      };
      this.container = null;
      this.onUpdateCallbacks = [];
      this.canvas = data.element.querySelector("canvas") || data.element.querySelector("img");
      this.sizeWatcher = null;
      this.takeScreenshot = this.takeScreenshot;
      this.init();
    }

    _createClass(Cropper, [{
      key: "init",
      value: function init() {
        var _this = this;

        var isMobile = /iPad|iPhone|iPod|Android/.test(window.navigator.userAgent);
        this.container = window.document.createElement("div");
        this.container.id = "crop-positioner";
        this.container.innerHTML = this.createHtml();
        this.element.appendChild(this.container);
        this.data.elements = {
          north: this.container.querySelector("#north-handle"),
          south: this.container.querySelector("#south-handle"),
          east: this.container.querySelector("#east-handle"),
          west: this.container.querySelector("#west-handle"),
          northeast: this.container.querySelector("#north-east-handle"),
          northwest: this.container.querySelector("#north-west-handle"),
          southeast: this.container.querySelector("#south-east-handle"),
          southwest: this.container.querySelector("#south-west-handle")
        };
        var self = this;

        var mouseDown = function mouseDown(e) {
          e.preventDefault();
          e.stopPropagation();

          if (self.data.mousemove) {
            return;
          }

          self.data.mousemove = true;
          var target = e.path ? e.path[0] : e.originalTarget ? e.originalTarget : e.target;
          var mode = target.id;

          var move = function move(e) {
            if (!self.data.mousemove) {
              return;
            }

            e.stopPropagation();
            e.preventDefault();
            var x = e.pageX;
            var y = e.pageY;

            if (x === undefined) {
              x = e.changedTouches[0].clientX;
            }

            if (y === undefined) {
              y = e.changedTouches[0].clientY;
            }

            var box = self.container.getBoundingClientRect(),
                x1 = self.data.positions.x1,
                x2 = self.data.positions.x2,
                y1 = self.data.positions.y1,
                y2 = self.data.positions.y2,
                scrollTop = window.pageYOffset || window.document.documentElement.scrollTop,
                scrollLeft = window.pageXOffset || window.document.documentElement.scrollLeft;

            if (mode.toString().indexOf("north") > -1 || mode.toString().indexOf("south") > -1) {
              if (mode.toString().indexOf("north") > -1) {
                y1 = y - (box.top + scrollTop) - 10;
              } else {
                y2 = y - (box.top + scrollTop);
              }
            }

            if (mode.toString().indexOf("west") > -1 || mode.toString().indexOf("east") > -1) {
              if (mode.toString().indexOf("west") > -1) {
                x1 = x - (box.left + scrollLeft) - 10;
              } else {
                x2 = x - (box.left + scrollLeft);
              }
            }

            self.setPositions(x1, x2, y1, y2);
          };

          var clearMove = function clearMove() {
            self.data.mousemove = false;
            self.container.parentNode.removeEventListener('mousemove', move);
            self.container.parentNode.removeEventListener('mouseleave', clearMove);
            window.document.removeEventListener('mouseup', clearMove);
            window.document.removeEventListener('mouseleave', clearMove);
          };

          if (isMobile) {
            self.container.ontouchmove = move;
          } else {
            self.container.parentNode.addEventListener('mousemove', move);
            self.container.parentNode.addEventListener('mouseleave', clearMove);
            window.document.addEventListener('mouseup', clearMove);
            window.document.addEventListener('mouseleave', clearMove);
          }
        };

        for (var handle in self.data.elements) {
          if (self.data.elements[handle]) {
            if (isMobile) {
              self.container.ontouchstart = mouseDown;
            } else {
              self.data.elements[handle].addEventListener("mousedown", mouseDown, false);
            }
          }
        }

        this.position(this);
        var revealedSpace = this.element.querySelector("#revealed-space");

        var moveRevealedSpace = function moveRevealedSpace(e) {
          e.preventDefault();
          e.stopPropagation();

          if (self.data.mousemove) {
            return;
          }

          self.data.mousemove = true;
          var _x = e.x;
          var _y = e.y;

          if (_x === undefined) {
            _x = e.changedTouches[0].clientX;
          }

          if (_y === undefined) {
            _y = e.changedTouches[0].clientY;
          }

          var box = self.container.getBoundingClientRect();
          var distanceX1 = _x - self.data.elements.west.getBoundingClientRect().left + self.data.elements.west.offsetWidth / 2.2;

          var distanceX2 = self.data.elements.east.getBoundingClientRect().left + self.data.elements.east.offsetWidth / 2.2 - _x;

          var distanceY1 = _y - self.data.elements.north.getBoundingClientRect().top + self.data.elements.north.offsetHeight / 2.2;

          var distanceY2 = self.data.elements.south.getBoundingClientRect().top + self.data.elements.south.offsetHeight / 2.2 - _y;

          var mousemove = function mousemove(e) {
            e.preventDefault();
            e.stopPropagation();

            if (!self.data.mousemove) {
              return;
            }

            var x = e.x;
            var y = e.y;

            if (x === undefined) {
              x = e.changedTouches[0].clientX;
            }

            if (y === undefined) {
              y = e.changedTouches[0].clientY;
            }

            self.setPositions(x - box.left + self.data.elements.west.offsetWidth / 2.2 - distanceX1, x - box.left + self.data.elements.east.offsetWidth / 2.2 + distanceX2, y - box.top + self.data.elements.north.offsetHeight / 2.2 - distanceY1, y - box.top + self.data.elements.south.offsetHeight / 2.2 + distanceY2);
          };

          var clear = function clear() {
            self.data.mousemove = false;
            revealedSpace.removeEventListener("mousemove", mousemove);
            window.document.removeEventListener('mouseup', clear);
            window.document.removeEventListener('mouseleave', clear);
          };

          if (isMobile) {
            self.container.ontouchmove = mousemove;
          } else {
            revealedSpace.addEventListener("mousemove", mousemove);
            window.document.addEventListener('mouseup', clear);
            window.document.addEventListener('mouseleave', clear);
          }
        };

        if (isMobile) {
          revealedSpace.addEventListener('touchstart', moveRevealedSpace);
          window.document.addEventListener('touchend', function () {
            self.data.mousemove = false;

            self.container.ontouchmove = function () {
              return false;
            };
          });
          window.document.addEventListener('touchleave', function () {
            self.data.mousemove = false;

            self.container.ontouchmove = function () {
              return false;
            };
          });
        } else {
          revealedSpace.addEventListener("mousedown", moveRevealedSpace, true);
        }

        var initCropper = function initCropper() {
          var stats = _this._data.instance.stats;
          _this.canvas = _this._data.element.querySelector("canvas") || _this._data.element.querySelector("img");

          if (_this.canvas && stats.ready) {
            var canvasBox = _this.canvas.getBoundingClientRect();

            var x = canvasBox.width / 4;
            var y = canvasBox.height / 4;

            _this.setPositions(x, x + x + x, y, y + y + y);

            _this.container.classList.add("active");

            var buttons = _this.container.parentNode.querySelector(".buttonWrapper");

            if (buttons) {
              buttons.style.display = "none";
            }
          } else {
            window.requestAnimationFrame(initCropper);
          }
        };

        initCropper();
      }
    }, {
      key: "setPositions",
      value: function setPositions(x1, x2, y1, y2) {
        var _this2 = this;

        var minWidth = 200;
        var minHeight = 200;

        var checkPositions = function checkPositions() {
          if (x1 < 5) {
            x1 = 5;
          }

          if (x2 > _this2.container.offsetWidth - 5) {
            x2 = _this2.container.offsetWidth - 5;
          }

          if (y1 < 5) {
            y1 = 5;
          }

          if (y2 > _this2.container.offsetHeight - 5) {
            y2 = _this2.container.offsetHeight - 5;
          }
        };

        checkPositions();

        if (minWidth && x2 - x1 < minWidth) {
          x2 = x1 + minWidth;

          if (x2 > this.container.offsetWidth - 5) {
            x2 = this.container.offsetWidth - 5;
            x1 = this.container.offsetWidth - 5 - minWidth;
          }
        }

        if (minHeight && y2 - y1 < minHeight) {
          y2 = y1 + minHeight;

          if (y2 > this.container.offsetHeight - 5) {
            y2 = this.container.offsetHeight - 5;
            y1 = y2 - minHeight > 5 ? y2 - minHeight : 5;
          }
        }

        this.data.positions.x1 = x1;
        this.data.positions.x2 = x2;
        this.data.positions.y1 = y1;
        this.data.positions.y2 = y2;
        this.container.querySelector("#north-space").style.height = this.data.positions.y1 / this.container.offsetHeight * 100 + "%";
        this.container.querySelector("#south-space").style.height = (this.container.offsetHeight - this.data.positions.y2) / this.container.offsetHeight * 100 + "%";
        this.container.querySelector("#west-space").style.width = this.data.positions.x1 / this.container.offsetWidth * 100 + "%";
        this.container.querySelector("#east-space").style.width = (this.container.offsetWidth - this.data.positions.x2) / this.container.offsetWidth * 100 + "%";
        this.onUpdateCallbacks.forEach(function (cb) {
          cb(_this2.getCoordinates());
        });
      }
    }, {
      key: "position",
      value: function position(self) {
        if (!this.container || !this.element) {
          return;
        }

        var currentCoords = this.getCoordinates();
        var currentW = parseInt(this.container.style.width);
        var currentH = parseInt(this.container.style.height);
        var currentL = parseInt(this.container.style.left);
        var currentT = parseInt(this.container.style.top);
        var newW = Math.min(currentCoords.viewWidth, currentCoords.renderWidth) / currentCoords.pixelRatio;
        var newH = Math.min(currentCoords.viewHeight, currentCoords.renderHeight) / currentCoords.pixelRatio;
        var newL = Math.min(currentCoords.viewWidth, currentCoords.renderWidth) === currentCoords.viewWidth ? 0 : (currentCoords.viewWidth - currentCoords.renderWidth) / 2 / currentCoords.pixelRatio;
        var newT = Math.min(currentCoords.viewHeight, currentCoords.renderHeight) === currentCoords.viewHeight ? 0 : (currentCoords.viewHeight - currentCoords.renderHeight) / 2 / currentCoords.pixelRatio;

        if (currentH !== newH || currentW !== newW || currentL !== newL || currentT !== newT) {
          this.container.style.width = newW + "px";
          this.container.style.height = newH + "px";
          this.container.style.left = newL + "px";
          this.container.style.top = newT + "px";
        }

        var runPosition = function runPosition() {
          self.position(self);
        };

        this.sizeWatcher = window.requestAnimationFrame(runPosition);
      }
    }, {
      key: "getCoordinates",
      value: function getCoordinates() {
        var data = {
          x: this.data.positions.x1,
          y: this.data.positions.y1,
          width: this.data.positions.x2 - this.data.positions.x1,
          height: this.data.positions.y2 - this.data.positions.y1
        };

        for (var p in data) {
          if (data[p]) {
            data[p] = data[p] * window.devicePixelRatio;
          }
        }

        data.viewWidth = this._data.instance.stats.viewWidth;
        data.viewHeight = this._data.instance.stats.viewHeight;
        data.renderWidth = this._data.instance.stats.renderWidth;
        data.renderHeight = this._data.instance.stats.renderHeight;
        data.pan = this._data.instance.stats.x;
        data.tilt = this._data.instance.stats.y;
        data.zoom = this._data.instance.stats.z;
        data.pixelRatio = window.devicePixelRatio;
        return data;
      }
    }, {
      key: "createHtml",
      value: function createHtml() {
        return __webpack_require__(61);
      }
    }, {
      key: "screenshotCanvas",
      value: function screenshotCanvas() {
        var self = this;

        try {
          var coords = self.getCoordinates();
          var ctx = window.document.createElement("canvas").getContext("2d");
          var w = 600;
          var h = coords.height * (600 / coords.width);

          if (h < 300) {
            w = w * (300 / h);
            h = 300;
          }

          ctx.canvas.width = w;
          ctx.canvas.height = h;
          var x = coords.x;
          var y = coords.y;
          var width = coords.width;
          var height = coords.height;

          var revealed = self._data.element.querySelector("#revealed-space");

          var westHandle = self._data.element.querySelector("#west-handle");

          var northHandle = self._data.element.querySelector("#north-handle");

          x = (westHandle.getBoundingClientRect().left - self.canvas.getBoundingClientRect().left) / self.canvas.getBoundingClientRect().width * self.canvas.offsetWidth;
          y = (northHandle.getBoundingClientRect().top - self.canvas.getBoundingClientRect().top) / self.canvas.getBoundingClientRect().height * self.canvas.offsetHeight;
          width = (westHandle.getBoundingClientRect().width * 2 + revealed.getBoundingClientRect().width) / self.canvas.getBoundingClientRect().width * self.canvas.offsetWidth;
          height = (northHandle.getBoundingClientRect().height * 2 + revealed.getBoundingClientRect().height) / self.canvas.getBoundingClientRect().height * self.canvas.offsetHeight;
          var tmp = self.canvas;

          var normalScreen = function normalScreen(tmp, x, y, width, height, w, h) {
            ctx.drawImage(tmp, x, y, width, height, 0, 0, w, h);
            return ctx.canvas;
          };

          var alternateScreen = function alternateScreen(tmp, x, y, width, height, w, h) {
            var glAttribs = {
              antialias: true,
              preserveDrawingBuffer: true
            };
            var tmpCtx = window.document.createElement("canvas").getContext("2d");
            var gl = tmp.getContext("webgl", glAttribs) || tmp.getContext("experimental-webgl");

            var _width = tmpCtx.canvas.width = tmp.width;

            var _height = tmpCtx.canvas.height = tmp.height;

            var size = _width * _height * 4;
            var pixels = new Uint8Array(size);
            var image = tmpCtx.createImageData(_width, _height);
            gl.readPixels(0, 0, _width, _height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

            for (var i = 0; i < size; i++) {
              image.data[i] = pixels[i];
            }

            tmpCtx.putImageData(image, 0, 0);
            ctx.drawImage(tmpCtx.canvas, x, y, width, height, 0, 0, w, h);

            var _imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

            var flipped = window.document.createElement("canvas");
            var flippedCTX = flipped.getContext('2d');
            flipped.width = _imageData.width;
            flipped.height = _imageData.height;
            flippedCTX.putImageData(_imageData, 0, 0); // flippedCTX.globalCompositeOperation = 'copy';

            flippedCTX.scale(1, -1); // Y flip

            flippedCTX.translate(0, -_imageData.height); // so we can draw at 0,0

            flippedCTX.drawImage(flipped, 0, 0);
            flippedCTX.setTransform(1, 0, 0, 1, 0, 0);
            flippedCTX.globalCompositeOperation = 'source-over';
            return flipped;
          };

          var testForBlank = function testForBlank(c) {
            var pixels = c.getContext("2d").getImageData(0, 0, c.width, c.height).data;
            var isNotBlank = false;

            for (var i = 0, n = pixels.length; i < n; i += 4) {
              if (pixels[i] !== 0 || pixels[i + 1] !== 0 || pixels[i + 2] !== 0) {
                isNotBlank = true;
                break;
              }
            }

            if (!isNotBlank) {
              return false;
            }

            return true;
          };

          var canvas = normalScreen(tmp, x, y, width, height, w, h);
          var isGood = testForBlank(canvas);

          if (!isGood) {
            canvas = alternateScreen(tmp, x, y, width, height, w, h);
            isGood = testForBlank(canvas);

            if (isGood) {
              return canvas;
            } else {
              return false;
            }
          } else {
            return canvas;
          }
        } catch (err) {
          return false;
        }
      }
    }, {
      key: "takeScreenshot",
      value: function takeScreenshot() {
        var _this3 = this;

        return new Promise(function (resolve, reject) {
          var type = "image/jpeg";
          var quality = 0.92;
          var scaledWidth = 1500;
          var parent = _this3.container.parentElement.parentElement.parentElement;
          var renderer = _this3._data.instance.renderer;
          parent.style.opacity = "0";
          parent.style.minWidth = scaledWidth + "px";
          parent.style.maxWidth = scaledWidth + "px";
          parent.style.height = "auto";
          setTimeout(function () {
            renderer.resize();
            setTimeout(function () {
              var screenshotCanvas = _this3.screenshotCanvas();

              if (!screenshotCanvas) {
                return reject();
              }

              return screenshotCanvas.toBlob(function (file) {
                setTimeout(function () {
                  parent.style.removeProperty("opacity");
                  parent.style.removeProperty("min-width");
                  parent.style.removeProperty("max-width");
                  parent.style.removeProperty("height");
                  renderer.resize();
                  return resolve(file);
                }, 10);
              }, type, quality);
            }, 10);
          }, 10);
        });
      }
    }, {
      key: "downloadScreenshot",
      value: function downloadScreenshot() {
        this.takeScreenshot().then(function (file) {
          var a = window.document.createElement("a");
          a.download = true;
          a.href = window.URL.createObjectURL(file);
          a.click();
        });
      }
    }]);

    return Cropper;
  }();

  module.exports = Cropper;
})();

/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = "<table>\n    <tr>\n        <td></td>\n        <td style=\"width:10px;\"></td>\n        <td id=\"north-space\"></td>\n        <td style=\"width:10px\"></td>\n        <td></td>\n    </tr>\n    <tr>\n        <td style=\"height:10px\"></td>\n        <td id=\"north-west-handle\" style=\"height:10px;cursor: nwse-resize;border-top: 1px dotted rgba(255, 255, 255, 0.25);background: transparent;border-left: 1px dotted rgba(255, 255, 255, 0.25);\">\n            <div class=\"handle\" style=\"left: -5px; top: -5px;\"></div>\n        </td>\n        <td id=\"north-handle\" style=\"height:10px; background: transparent; cursor: ns-resize; border-top: 1px dotted rgba(255, 255, 255, 0.25);\">\n            <div class=\"handle\" style=\"left: 50%; top: -5px; margin-left: -5px;\"></div>\n        </td>\n        <td id=\"north-east-handle\" style=\"height:10px;cursor: nesw-resize;border-top: 1px dotted rgba(255, 255, 255, 0.25);background: transparent;border-right: 1px dotted rgba(255, 255, 255, 0.25);\">\n            <div class=\"handle\" style=\"left: 5px; top: -5px;\"></div>\n        </td>\n        <td style=\"height:10px\"></td>\n    </tr>\n    <tr>\n        <td id=\"west-space\"></td>\n        <td id=\"west-handle\" style=\"cursor: ew-resize;border-left: 1px dotted rgba(255, 255, 255, 0.25);background: transparent;\">\n            <div class=\"handle\" style=\"left: -5px; top: 50%; margin-top: -5px;\"></div>\n        </td>\n        <td id=\"revealed-space\" style=\"background: transparent;\"></td>\n        <td id=\"east-handle\" style=\"cursor: ew-resize;border-right: 1px dotted rgba(255, 255, 255, 0.25);background: transparent;\">\n            <div class=\"handle\" style=\"right: -5px;top: 50%; margin-top: -5px;\"></div>\n        </td>\n        <td id=\"east-space\"></td>\n    </tr>\n    <tr>\n        <td style=\"height:10px\"></td>\n        <td id=\"south-west-handle\" style=\"height:10px;cursor: nesw-resize; background: transparent; border-bottom: 1px dotted rgba(255, 255, 255, 0.25); border-left: 1px dotted rgba(255, 255, 255, 0.25);\">\n            <div class=\"handle\" style=\"left: -5px; top: 5px;\"></div>\n        </td>\n        <td id=\"south-handle\" style=\"height:10px; cursor: ns-resize; border-bottom: 1px dotted rgba(255, 255, 255, 0.25);background: transparent;\">\n            <div class=\"handle\" style=\"left: 50%; top: 5px; margin-left: -5px;\"></div>\n        </td>\n        <td id=\"south-east-handle\" style=\"height:10px;cursor: nwse-resize;background: transparent; border-bottom: 1px dotted rgba(255, 255, 255, 0.25); border-right: 1px dotted rgba(255, 255, 255, 0.25);\">\n            <div class=\"handle\" style=\"left: 5px; top: 5px;\"></div>\n        </td>\n        <td style=\"height:10px\"></td>\n    </tr>\n    <tr>\n        <td></td>\n        <td></td>\n        <td id=\"south-space\"></td>\n        <td></td>\n        <td></td>\n    </tr>\n</table>";

/***/ }),
/* 62 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(64);

__webpack_require__(66);

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _e = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var E1Message =
/*#__PURE__*/
function () {
  function E1Message(el) {
    _classCallCheck(this, E1Message);

    this.el = el;
    this.update = this.update;
    this.el.innerHTML = __webpack_require__(65);
    this.update();
  }

  _createClass(E1Message, [{
    key: "update",
    value: function update() {
      var container = this.el.querySelector(".popup");
      var iconElement = this.el.querySelector(".message-icon");
      var messageElement = this.el.querySelector(".message-container");
      var buttonsElement = this.el.querySelector(".popup-buttons");
      var icon = window.E1.getModel(this.el, "icon");
      var type = window.E1.getModel(this.el, "type");
      var message = window.E1.getModel(this.el, "message");
      var active = window.E1.getModel(this.el, "active");
      var buttons = window.E1.getModel(this.el, "buttons");

      if (active && active.toString() === "true") {
        container.classList.add("active");
        messageElement.innerHTML = "";
        iconElement.innerHTML = "";
        buttonsElement.innerHTML = "";
        messageElement.appendChild(_e.default.cleanHtml("<div>".concat(message, "</div>")));
        iconElement.appendChild(_e.default.cleanHtml("<div>".concat(icon, "</div>")));
        iconElement.className = "message-icon" + (type ? " " + type : "");
        var buttonHtml = "";

        if (buttons && buttons.length) {
          buttons.forEach(function (element) {
            buttonHtml += '<button onclick="' + element.click + '">' + element.text + '</button>';
          });
        } else {
          buttonHtml = '<button onclick="window.E1.setModel(null, \'' + this.el.getAttribute('active') + '\', false)">Ok</button>';
        }

        buttonsElement.appendChild(_e.default.cleanHtml("<div>".concat(buttonHtml, "</div>")));
      } else {
        container.classList.remove("active");
      }
    }
  }]);

  return E1Message;
}();

_e.default.registerComponent("e1-message", E1Message);

/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = "<div class=\"popup\">\n    <div class=\"popup-component-wrapper\">\n        <div class=\"popup-component\">\n            <div class=\"popup-component-inner\">\n                <div class=\"message-icon\"></div>\n                <div class=\"message\">\n                    <div class=\"message-container\"></div>\n                    <div class=\"popup-buttons\"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>";

/***/ }),
/* 66 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(68);

__webpack_require__(69);

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var E1 = __webpack_require__(0);

var Modal =
/*#__PURE__*/
function () {
  function Modal(el) {
    var _this = this;

    _classCallCheck(this, Modal);

    this.el = el;
    this.update = this.update;
    this.el.innerHTML = "\n        <div class=\"modal\">\n            <div class=\"modal-wrapper\">\n                <div class=\"modal-content\"></div>\n                <div class=\"modal-close\">\n                    <e1-icon type=\"close-thin\"></e1-icon>\n                </div>\n            </div>\n        </div>";
    var modal = this.el.querySelector(".modal");
    var closeButton = modal.querySelector(".modal-close");
    closeButton.addEventListener("click", function () {
      E1.setModel(_this.el, "active", false);
    }, false);
    this.update();
  }

  _createClass(Modal, [{
    key: "update",
    value: function update() {
      var modal = this.el.querySelector(".modal");
      var modalContent = modal.querySelector(".modal-content");
      var active = E1.getModel(this.el, "active");

      if (active && active.toString() === 'true') {
        modalContent.innerHTML = "";
        modalContent.appendChild(E1.cleanHtml("<div>" + E1.getModel(this.el, "content") + "</div>"));
        setTimeout(function () {
          modal.classList.add("active");
        }, 10);
      } else {
        modal.classList.remove("active");
        setTimeout(function () {
          modalContent.innerHTML = "";
        }, 200);
      }
    }
  }]);

  return Modal;
}();

E1.registerComponent("e1-modal", Modal);

/***/ }),
/* 69 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(71);

__webpack_require__(74);

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var E1 = __webpack_require__(0);

var templates = {
  circle: __webpack_require__(72),
  bar: __webpack_require__(73)
};

var Progress =
/*#__PURE__*/
function () {
  function Progress(el) {
    _classCallCheck(this, Progress);

    this.el = el;
    this.update = this.update;
    this.update();
  }

  _createClass(Progress, [{
    key: "update",
    value: function update() {
      this.progress = E1.getModel(this.el, "progress", 0);
      this.type = E1.getModel(this.el, "type", "circle");
      this.el.innerHTML = "";
      this.el.appendChild(E1.cleanHtml(templates[this.type]));

      if (this.progress < 0) {
        this.progress = 0;
      } else if (this.progress > 100) {
        this.progress = 100;
      }

      if (this.type === "circle") {
        var text = this.el.querySelector("text");
        var circle = this.el.querySelector("ellipse");
        var percent = 1 - parseFloat(this.progress) / 100;
        var width = parseFloat(circle.getAttribute("stroke-dasharray"));
        circle.setAttribute("stroke-dashoffset", percent * width);
        text.textContent = this.progress + "%";
      } else if (this.type === "bar") {
        var textEl = this.el.querySelector(".progress-text");
        var bar = this.el.querySelector(".progress-bar");
        bar.style.width = this.progress + "%";
        textEl.textContent = this.progress + "%";
      }
    }
  }]);

  return Progress;
}();

E1.registerComponent("e1-progress", Progress);

/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = "<div class=\"circle-container\">\n    <div class=\"circle-inner\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\">\n            <ellipse cx=\"100\" cy=\"100\" rx=\"100\" ry=\"100\" stroke-dasharray=\"628\" stroke-dashoffset=\"628\"></ellipse>\n            <text x=\"100\" y=\"100\" text-anchor=\"middle\" alignment-baseline=\"central\" transform=\"rotate(90, 100, 100)\" font-size=\"42px\" fill=\"currentColor\"></text>\n        </svg>\n    </div>\n</div>";

/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = "<div class=\"progress-bar-container\">\n    <div class=\"progress-text\"></div>\n    <div class=\"progress-bar\"></div>\n</div>";

/***/ }),
/* 74 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(76);

__webpack_require__(77);

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var E1 = __webpack_require__(0);

var Search =
/*#__PURE__*/
function () {
  function Search(el) {
    var _this = this;

    _classCallCheck(this, Search);

    this.el = el;
    this.update = this.update;
    this.data = E1.getModel(el, "model");
    this.value = E1.getModel(el, "value");
    this.results = E1.getModel(el, "results");
    this.placeholder = E1.getModel(el, "placeholder");
    this.paths = E1.getModel(el, "paths");
    this.el.getResults = this.getResults;
    this.el.results = this.results;

    if (typeof this.paths === "string") {
      this.paths = this.paths.split(",").map(function (path) {
        return path.trim();
      });
    }

    this.el.innerHTML = "<div class=\"search\"><input type=\"text\" placeholder=\"".concat(this.placeholder, "\" /><button class=\"search-button\"><span style=\"color:transparent !important; pointer-events:none;\">W</span><e1-icon type=\"search\"></e1-icon></button><button e1-if=\"").concat(el.getAttribute("value"), "\" class=\"cancel-search-button\"><span style=\"color:transparent !important; pointer-events:none;\">W</span><e1-icon type=\"close-thin\"></e1-icon></button></div>");
    this.el.querySelector(".search-button").addEventListener("click", function () {
      _this.getResults();
    });
    this.el.querySelector(".cancel-search-button").addEventListener("click", function () {
      _this.el.querySelector("input").value = "";
      _this.value = "";
      E1.setModel(_this.el, "value", "");

      _this.getResults();
    });
    this.el.querySelector("input").addEventListener("input", function () {
      var val = _this.el.querySelector("input").value;

      _this.value = val;
      E1.setModel(_this.el, "value", val);
    });
    this.el.querySelector("input").addEventListener("keyup", function (e) {
      if (e.key === "Enter") {
        _this.getResults();
      }
    });
    this.getResults();
  }

  _createClass(Search, [{
    key: "getResults",
    value: function getResults() {
      var _this2 = this;

      var val = this.value ? this.value.toString().toLowerCase() : this.value;

      var reportResults = function reportResults() {
        if (!_this2.results) {
          _this2.results = [];
        }

        _this2.el.results = _this2.results;
        E1.setModel(_this2.el, "results", _this2.results);

        if (_this2.el.onresults && typeof _this2.el.onresults === "function") {
          _this2.el.onresults(_this2.results);
        }
      };

      if (!val || !this.data || !this.data.length) {
        this.el.results = this.results = this.data;
        return reportResults();
      }

      if (!this.paths || !this.paths.length) {
        this.results = this.data[this.data.toString().toLowerCase().indexOf(val)];
        return reportResults();
      }

      this.results = [];
      this.data.forEach(function (item) {
        for (var i = 0; i < _this2.paths.length; i++) {
          if (E1.getThis(item, _this2.paths[i]).toString().toLowerCase().indexOf(val) > -1) {
            _this2.results.push(item);

            break;
          }
        }
      });
      return reportResults();
    }
  }, {
    key: "update",
    value: function update() {
      var doSearch = false;
      var value = E1.getModel(this.el, "value");
      var data = E1.getModel(this.el, "model");
      var paths = E1.getModel(this.el, "paths");
      var input = this.el.querySelector("input");

      if (typeof paths === "string") {
        paths = paths.split(",").map(function (path) {
          return path.trim();
        });
      }

      this.placeholder = E1.getModel(this.el, "placeholder");
      input.setAttribute("placeholder", this.placeholder);

      if (JSON.stringify(data) !== JSON.stringify(this.data)) {
        this.data = data;
        doSearch = true;
      }

      if (JSON.stringify(paths) !== JSON.stringify(this.paths)) {
        this.paths = paths;
        doSearch = true;
      }

      if (value !== input.value) {
        this.value = input.value = value;
        doSearch = true;
      }

      if (doSearch) {
        this.getResults();
      }
    }
  }]);

  return Search;
}();

E1.registerComponent("e1-search", Search);

/***/ }),
/* 77 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(79);

__webpack_require__(80);

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _e = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Select =
/*#__PURE__*/
function () {
  function Select(el) {
    _classCallCheck(this, Select);

    this.el = el;
    this.update = this.update;
    var html = "\n        <div class=\"select-container\">\n\t\t\t<span class=\"select-menu-label\" e1-if=\"".concat(el.getAttribute("label"), "\"></span>\n\t\t\t<input readonly tabindex=\"-1\" type=\"text\" class=\"select-menu-selected-text\" e1-value=\"").concat(el.getAttribute("value") + ".label", "\">\n\t\t\t<span class=\"select-menu-options\"></span>\n\t\t\t<button class=\"select-menu-arrow\"><span style=\"color:transparent !important; pointer-events:none;\">V</span></button>\n        </div>");
    this.el.innerHTML = html;
    var selectContainer = el.querySelector(".select-container");
    var clickThrottle = false;
    window.document.body.addEventListener("mousedown", function (e) {
      clearTimeout(clickThrottle);
      clickThrottle = setTimeout(function () {
        var target = e.path ? e.path[0] : e.originalTarget ? e.originalTarget : e.target;

        try {
          if (target !== el && !el.contains(target)) {
            selectContainer.classList.remove("mouseenter");
          }
        } catch (error) {}
      }, 10);
    });
    var leaveTimer;

    var mouseenter = function mouseenter(e) {
      clearTimeout(leaveTimer);
      e.preventDefault();
      selectContainer.classList.add("mouseenter");
    };

    if (!/iPad|iPhone|iPod|Android/.test(window.navigator.userAgent)) {
      el.addEventListener("mouseenter", mouseenter, false);
      el.addEventListener("mouseleave", function () {
        leaveTimer = setTimeout(function () {
          selectContainer.classList.remove("mouseenter");
        }, 10);
      });
    } else {
      el.addEventListener("touchstart", function (e) {
        clearTimeout(leaveTimer);
        e.preventDefault();
        selectContainer.classList.toggle("mouseenter");
      }, false);
    }

    this.update();
  }

  _createClass(Select, [{
    key: "handleSelect",
    value: function handleSelect(e) {
      e.preventDefault();
      e.stopPropagation();

      var options = _e.default.getModel(this.el, "options");

      var optionElements = this.el.querySelector(".select-menu-option");
      var target = e.path ? e.path[0] : e.originalTarget ? e.originalTarget : e.target;
      var valueKey = target.getAttribute("option-key");
      var value = options[valueKey];

      for (var i = 0; i < optionElements.length; i++) {
        if (i === parseInt(valueKey)) {
          optionElements[i].setAttribute("selected", true);
        } else {
          optionElements[i].setAttribute("selected", false);
        }
      }

      _e.default.setModel(this.el, "value", value);

      var onselected = _e.default.getModel(this.el, "onselected");

      if (onselected && typeof onselected === "function") {
        onselected(value, this.el);
      }

      if (this.el.onselected && typeof this.el.onselected === "function") {
        this.el.onselected(value, this.el);
      }
    }
  }, {
    key: "optionFromString",
    value: function optionFromString(option) {
      return {
        value: option.trim(),
        label: option.trim()
      };
    }
  }, {
    key: "update",
    value: function update() {
      var _this = this;

      if (!this.el.getAttribute("value")) {
        var id = _e.default.getModel(this.el, "component-id");

        this.el.setAttribute("value", "@bound.models." + id + ".value");

        _e.default.setModel(this.el, "value");
      }

      var selectContainer = this.el.querySelector(".select-container");

      var options = _e.default.getModel(this.el, "options");

      var value = _e.default.getModel(this.el, "value");

      if (value && typeof value === "string") {
        value = this.optionFromString(value);

        _e.default.setModel(this.el, "value", value);
      }

      var label = this.el.querySelector(".select-menu-label");

      var labelText = _e.default.getModel(this.el, "label");

      if (label && labelText) {
        label.innerHTML = "";
        label.appendChild(_e.default.cleanHtml(labelText));
      }

      try {
        options = JSON.parse(options);
      } catch (error) {}

      if (options && typeof options === "string") {
        options = options.split(",").map(function (option) {
          return _this.optionFromString(option);
        });
      }

      var optionsContainer = this.el.querySelector(".select-menu-options");
      optionsContainer.innerHTML = "";

      if (options && Array.isArray(options) && options.length) {
        options.forEach(function (element, key) {
          if (typeof element === "string") {
            element = _this.optionFromString(element);
          }

          var option = window.document.createElement("span");
          option.className = "select-menu-option";
          option.textContent = element.label;
          option.setAttribute("option-key", key);
          option.setAttribute("selected", value && value === element.value ? true : false);
          optionsContainer.appendChild(option);
          var clickThrottle = false;

          if (!/iPad|iPhone|iPod|Android/.test(window.navigator.userAgent)) {
            option.addEventListener("mousedown", function (e) {
              clearTimeout(clickThrottle);
              clickThrottle = setTimeout(function () {
                if (selectContainer.classList.contains("mouseenter")) {
                  window.requestAnimationFrame(function () {
                    _this.handleSelect(e);

                    selectContainer.classList.remove("mouseenter");
                  });
                }
              }, 10);
            });
          } else {
            option.addEventListener("touchstart", function (e) {
              _this.handleSelect(e);

              selectContainer.classList.remove("mouseenter");
            });
          }
        });
      }

      this.el.ready = true;
    }
  }]);

  return Select;
}();

_e.default.registerComponent("e1-select", Select);

/***/ }),
/* 80 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(82);

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var E1 = __webpack_require__(0);

var E1ShortNumber =
/*#__PURE__*/
function () {
  function E1ShortNumber(el) {
    _classCallCheck(this, E1ShortNumber);

    this.el = el;
    this.el["e1-short-number-onUpdate"] = this.update;
    this.update();
  }

  _createClass(E1ShortNumber, [{
    key: "getString",
    value: function getString(num) {
      if (isNaN(num) || num === 0) {
        return 0;
      }

      var sizes = ['', 'K', 'M', 'B', 'G'];
      var i = parseInt(Math.floor(Math.log(num) / Math.log(1000)));
      return num / Math.pow(1000, i) + sizes[i]; // var i = (Math.log(num) / Math.log(1000)).toFixed(2)
      // return Math.round(num / Math.pow(1000, i), 2) + ' ' + sizes[i];
    }
  }, {
    key: "update",
    value: function update() {
      var num = parseInt(E1.getModel(this.el, "number"));
      this.el.textContent = this.getString(num);
    }
  }]);

  return E1ShortNumber;
}();

E1.registerAttribute("e1-short-number", E1ShortNumber);

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(84);

__webpack_require__(85);

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _e = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var E1SocialButtons =
/*#__PURE__*/
function () {
  function E1SocialButtons(el) {
    _classCallCheck(this, E1SocialButtons);

    this.el = el;
    this.update = this.update;
    this.el.innerHTML = '<div class="share"></div>';
    this.update();
  }

  _createClass(E1SocialButtons, [{
    key: "open",
    value: function open() {
      this.el.classList.toggle("tooltip-active");
    }
  }, {
    key: "update",
    value: function update() {
      var components = _e.default.getModel(this.el, "components");

      var url = _e.default.getModel(this.el, "url");

      var text = _e.default.getModel(this.el, "text");

      var hashtags = _e.default.getModel(this.el, "hashtags");

      if (!components) {
        return;
      }

      if (typeof components === "string") {
        components = components.split(",").map(function (component) {
          return component.trim();
        });
      }

      var html = '<div class="share">';

      var generate = function generate(type, onclick) {
        html += '<div class="share-button ' + type + '"><a class="icon-wrapper" onclick="' + onclick + '"><e1-icon type="' + type + '"></e1-icon></a></div>';
      };

      components.forEach(function (component) {
        var elBtn;

        switch (component) {
          case "facebook":
            generate("facebook", "window.open('https://www.facebook.com/sharer/sharer.php?u=" + url + "&src=sdkpreparse', null, 'menubar=no,width=600,height=300')");
            break;

          case "twitter":
            var params = [];

            if (text) {
              text = "text=" + text;
              params.push(text);
            }

            if (hashtags) {
              hashtags = "hashtags=" + hashtags;
              params.push(hashtags);
            }

            if (params.length) {
              params = params.join("&") + "&";
            } else {
              params = "";
            }

            elBtn = generate("twitter", "window.open('https://twitter.com/share?" + params + "via=NVIDIAGeForce&url=" + encodeURIComponent(url) + "', null, 'menubar=no,width=600,height=300')");
            break;

          case "weibo":
            elBtn = generate("weibo", "window.open('http://service.weibo.com/share/share.php?url=" + encodeURIComponent(url) + "&title=" + window.document.title + "', null, 'menubar=no,width=600,height=300')");
            break;
        }
      });
      html += '</div>';
      this.el.appendChild(_e.default.cleanHtml(html));
    }
  }]);

  return E1SocialButtons;
}();

_e.default.registerComponent("e1-social-buttons", E1SocialButtons);

/***/ }),
/* 85 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(87);

__webpack_require__(88);

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var E1 = __webpack_require__(0);

var E1Tooltip =
/*#__PURE__*/
function () {
  function E1Tooltip(el) {
    _classCallCheck(this, E1Tooltip);

    this.el = el;
    this.el["e1-tooltip-onUpdate"] = this.update;
    this.update();
  }

  _createClass(E1Tooltip, [{
    key: "open",
    value: function open() {
      this.el.classList.toggle("tooltip-active");
    }
  }, {
    key: "update",
    value: function update() {
      var _this = this;

      var display = E1.getModel(this.el, "e1-tooltip", false);

      var open = function open() {
        _this.open();
      };

      if (this.el.parentNode) {
        this.el.parentNode.style.cursor = "pointer";
        this.el.parentNode.style.position = "relative";
        this.el.parentNode.style.display = display ? display : "inline-block";
        this.el.parentNode.removeEventListener("click", open);
        this.el.parentNode.addEventListener("click", open);
      }
    }
  }]);

  return E1Tooltip;
}();

E1.registerAttribute("e1-tooltip", E1Tooltip);

/***/ }),
/* 88 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(90);

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var E1 = __webpack_require__(0);

var TranslationService =
/*#__PURE__*/
function () {
  function TranslationService() {
    var _this = this;

    _classCallCheck(this, TranslationService);

    this.strings = {};
    this.locale = "en";
    this.locales = ["en"];
    this.serviceUrl = null;
    var fetchTimer = null;
    var lastUpdate = null;
    E1.subscribe("@TranslationService.locale", function (res) {
      for (var s in _this.strings) {
        if (_this.strings[s]) {
          _this.strings[s].default = _this.strings[s][res];
        }
      }

      E1.setModel(null, "@TranslationService.strings", _this.strings);
      window.localStorage.setItem("e1Locale", res);
    });
    E1.subscribe("@TranslationService.strings", function () {
      clearTimeout(fetchTimer);
      fetchTimer = setTimeout(function () {
        if (lastUpdate && new Date().getTime() - lastUpdate < 1000) {
          return;
        }

        _this.updateTranslations();
      }, 1000);
    });

    if (window.localStorage.getItem("e1Locale")) {
      this.locale = window.localStorage.getItem("e1Locale");
    }

    if (window.localStorage.getItem("e1Translations")) {
      var data = JSON.parse(window.localStorage.getItem("e1Translations"));

      if (new Date().getTime() < data.expires) {
        this.strings = data.strings;
      }
    }
  }

  _createClass(TranslationService, [{
    key: "get",
    value: function get(key) {
      return E1.getThis(E1.services.TranslationService.strings, "".concat(key, ".").concat(this.locale), key);
    }
  }, {
    key: "getTranslation",
    value: function getTranslation(key, code) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        if (code === "en") {
          return resolve(key);
        }

        if (!_this2.serviceUrl) {
          return resolve(key);
        }

        var url = "".concat(_this2.serviceUrl).concat(_this2.serviceUrl.indexOf("?") > -1 ? "&" : "?", "q=").concat(key, "&source=en&target=").concat(code);

        var response = function response() {
          try {
            var res = JSON.parse(req.responseText);
            resolve(res.translation);
          } catch (error) {
            return reject();
          }
        };

        var req = new window.XMLHttpRequest();
        req.addEventListener("load", response);
        req.open("GET", url);
        req.send();
      });
    }
  }, {
    key: "updateTranslations",
    value: function updateTranslations() {
      var _this3 = this;

      var checkIfDone = function checkIfDone() {
        var done = true;

        for (var s in _this3.strings) {
          if (_this3.strings[s] && _this3.strings[s].completed !== _this3.locales.length) {
            done = false;
            break;
          }
        }

        if (done) {
          E1.setModel(null, "@TranslationService.strings", _this3.strings);
          window.localStorage.setItem("e1Translations", JSON.stringify({
            expires: new Date().getTime() + 3600000,
            strings: _this3.strings
          }));
        }
      };

      var getTranslations = function getTranslations(s) {
        _this3.locales.forEach(function (code) {
          if (!_this3.strings[s][code]) {
            _this3.getTranslation(_this3.strings[s].en, code).then(function (translation) {
              _this3.strings[s][code] = translation;
              _this3.strings[s].completed++;
              checkIfDone();
            }, function () {
              _this3.strings[s][code] = _this3.strings[s].default;
              _this3.strings[s].completed++;
              checkIfDone();
            });
          } else {
            _this3.strings[s].completed++;
            checkIfDone();
          }
        });
      };

      for (var s in this.strings) {
        if (this.strings[s]) {
          if (!this.strings[s].completed) {
            this.strings[s].completed = 0;
          }

          getTranslations(s);
        }
      }
    }
  }, {
    key: "setLocales",
    value: function setLocales(locales) {
      E1.setModel(null, "@TranslationService.locales", locales);
      this.updateTranslations();
    }
  }]);

  return TranslationService;
}();

E1.registerService("TranslationService", new TranslationService());

var E1Translate =
/*#__PURE__*/
function () {
  function E1Translate(el) {
    _classCallCheck(this, E1Translate);

    this.el = el;
    this.el["e1-translate"] = this.update;
    this.el.translationKey = this.el.textContent.split(".").join("&period;");

    if (!this.el.getAttribute("e1-translate")) {
      this.el.setAttribute("e1-translate", "@TranslationService.strings.".concat(this.el.translationKey, ".default"));
      E1.setModel(null, "@TranslationService.strings.".concat(this.el.translationKey, ".en"), this.el.textContent);
      E1.setModel(null, "@TranslationService.strings.".concat(this.el.translationKey, ".default"), this.el.textContent);
      var newEl = this.el.cloneNode(true);
      this.el.parentNode.insertBefore(newEl, this.el);
      this.el.parentNode.removeChild(this.el);
    } else {
      this.update();
    }
  }

  _createClass(E1Translate, [{
    key: "update",
    value: function update() {
      this.el.innerHTML = "";
      this.el.appendChild(E1.cleanHtml("<span>".concat(E1.services.TranslationService.get(this.el.translationKey), "</span>")));
    }
  }]);

  return E1Translate;
}();

E1.registerAttribute("e1-translate", E1Translate);

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(92);

__webpack_require__(93);

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _e = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var E1UploadZone =
/*#__PURE__*/
function () {
  function E1UploadZone(el) {
    _classCallCheck(this, E1UploadZone);

    this.el = el;
    this.update = this.update;
    this.el.appendChild(_e.default.cleanHtml(['<div class="upload-wrapper">', '<div class="upload-wrapper-inner">', _e.default.getModel(this.el, "content", ""), '</div>', '<input class="file-input" type="file">', '</div>'].join("")));

    function handleDrag(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    function handleDragOver(e) {
      e.preventDefault();
      e.stopPropagation();
      el.classList.add("dragging");
    }

    function handleDragOut(e) {
      e.preventDefault();
      e.stopPropagation();
      el.classList.remove("dragging");
    }

    function handleDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      el.classList.remove("dragging");
      handleFile((e.dataTransfer.files || e.originalEvent.dataTransfer.files)[0]);
    }

    function handleSelect(e) {
      handleFile(e.target.files[0]);
    }

    function handleFile(file) {
      if (file) {
        _e.default.setModel(el, "file", file);

        var validator = _e.default.getModel(el, "validator");

        if (validator && typeof validator === "function") {
          validator(file, el);
        }
      }
    }

    el.addEventListener('drag', handleDrag, false);
    el.addEventListener('dragstart', handleDrag, false);
    el.addEventListener('dragover', handleDragOver, false);
    el.addEventListener('dragenter', handleDragOver, false);
    el.addEventListener('dragleave', handleDragOut, false);
    el.addEventListener('dragend', handleDragOut, false);
    el.addEventListener('drop', handleDrop, false);
    el.querySelector("input.file-input").addEventListener('change', handleSelect, false);

    el.clear = function () {
      _e.default.setModel(el, el.getAttribute("file"), "");

      el.querySelector("input.file-input").value = null;
    };
  }

  _createClass(E1UploadZone, [{
    key: "update",
    value: function update() {
      var content = _e.default.getModel(this.el, "content", "");

      var inner = this.el.querySelector(".upload-wrapper-inner");

      if (!inner) {
        return;
      }

      inner.innerHTML = "";
      inner.appendChild(_e.default.cleanHtml("<div>".concat(content, "</div>")));
    }
  }]);

  return E1UploadZone;
}();

_e.default.registerComponent("e1-upload-zone", E1UploadZone);

/***/ }),
/* 93 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ])["umd"];