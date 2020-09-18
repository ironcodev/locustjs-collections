"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.List = void 0;

var _locustjsBase = require("locustjs-base");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var List = /*#__PURE__*/function () {
  function List(x, itemType) {
    _classCallCheck(this, List);

    if ((0, _locustjsBase.isArray)(x)) {
      this._items = [];
      this.type = itemType;

      var _iterator = _createForOfIteratorHelper(x),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var item = _step.value;
          this.add(item);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    } else if (_instanceof(x, List)) {
      this._items = [];
      this.type = x.type;
      this._items = _toConsumableArray(x._items);
    } else {
      this._items = [];
      this.type = x;
    }
  }

  _createClass(List, [{
    key: Symbol.iterator,
    value: /*#__PURE__*/regeneratorRuntime.mark(function value() {
      var _iterator2, _step2, item;

      return regeneratorRuntime.wrap(function value$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _iterator2 = _createForOfIteratorHelper(this._items);
              _context.prev = 1;

              _iterator2.s();

            case 3:
              if ((_step2 = _iterator2.n()).done) {
                _context.next = 9;
                break;
              }

              item = _step2.value;
              _context.next = 7;
              return item;

            case 7:
              _context.next = 3;
              break;

            case 9:
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](1);

              _iterator2.e(_context.t0);

            case 14:
              _context.prev = 14;

              _iterator2.f();

              return _context.finish(14);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, value, this, [[1, 11, 14, 17]]);
    })
  }, {
    key: "canAdd",
    value: function canAdd(item) {
      var result = true;

      if (this.type != undefined) {
        if ((0, _locustjsBase.isSomeString)(this.type)) {
          result = false || this.type == 'number' && (0, _locustjsBase.isNumber)(item) || this.type == 'string' && (0, _locustjsBase.isString)(item) || this.type == 'date' && (0, _locustjsBase.isDate)(item) || this.type == 'object' && (0, _locustjsBase.isObject)(item) || this.type == 'bool' && (0, _locustjsBase.isBool)(item) || this.type == 'array' && (0, _locustjsBase.isArray)(item) || this.type == 'function' && (0, _locustjsBase.isFunction)(item) || this.type == 'primitive' && (0, _locustjsBase.isPrimitive)(item) || (0, _locustjsBase.isObject)(item) && x.constructor && x.constructor.name == this.type;
        } else {
          result = _instanceof(item, this.type);
        }
      }

      return result;
    }
  }, {
    key: "_throwInvalidItemError",
    value: function _throwInvalidItemError() {
      if ((0, _locustjsBase.isFunction)(this.type)) {
        throw "List.add(): invalid item type. expected '".concat(this.type.prototype.constructor.name, "'");
      } else {
        throw "List.add(): invalid item type. expected '".concat(this.type, "'");
      }
    }
  }, {
    key: "add",
    value: function add(item) {
      if (this.canAdd(item)) {
        this._items.push(item);
      } else {
        this._throwInvalidItemError();
      }
    }
  }, {
    key: "addAt",
    value: function addAt(item, index) {
      if (this.canAdd(item)) {
        this._items.splice(index, 0, item);
      } else {
        this._throwInvalidItemError();
      }
    }
  }, {
    key: "insertAt",
    value: function insertAt(item, index) {
      return this.addAt(item, index);
    }
  }, {
    key: "push",
    value: function push(item) {
      this.add(item);
    }
  }, {
    key: "append",
    value: function append(item) {
      this.add(item);
    }
  }, {
    key: "prepend",
    value: function prepend(item) {
      this.addAt(item, 0);
    }
  }, {
    key: "remove",
    value: function remove(item) {
      var index = this._items.indexOf(item);

      var result;

      if (index >= 0) {
        result = this._items.splice(index, 1)[0];
      }

      return result;
    }
  }, {
    key: "removeAt",
    value: function removeAt(index) {
      var result;

      if (index >= 0 && index < this.length) {
        result = this._items.splice(index, 1)[0];
      } else {
        throw new RangeError("index out of range: ".concat(index));
      }

      return result;
    }
  }, {
    key: "elementAt",
    value: function elementAt(index) {
      var result;

      if (index >= 0 && index < this.length) {
        result = this._items[index];
      } else {
        throw new RangeError("index out of range: ".concat(index));
      }

      return result;
    }
  }, {
    key: "find",
    value: function find(x) {
      if ((0, _locustjsBase.isFunction)(x)) {
        return this._items.find(x, this);
      } else {
        return this._items.find(function (a) {
          return a == x;
        }, this);
      }
    }
  }, {
    key: "first",
    value: function first() {
      return this.length > 0 ? this._items[0] : undefined;
    }
  }, {
    key: "last",
    value: function last() {
      return this.length > 0 ? this._items[this.length - 1] : undefined;
    }
  }, {
    key: "indexOf",
    value: function indexOf(x, fromIndex) {
      if ((0, _locustjsBase.isFunction)(x)) {
        var result = -1;

        if (fromIndex == undefined) {
          fromIndex = 0;
        }

        for (var i = fromIndex; i < this.length; i++) {
          if (x(this._items[i], i, this)) {
            result = i;
            break;
          }
        }

        return result;
      } else {
        return this._items.indexOf(x, fromIndex);
      }
    }
  }, {
    key: "lastIndexOf",
    value: function lastIndexOf(x, fromIndex) {
      if ((0, _locustjsBase.isFunction)(x)) {
        var result = -1;

        if (fromIndex == undefined) {
          fromIndex = this.length - 1;
        }

        for (var i = fromIndex; i >= 0; i--) {
          if (x(this._items[i], i, this)) {
            result = i;
            break;
          }
        }

        return result;
      } else {
        return this._items.lastIndexOf(x, fromIndex);
      }
    }
  }, {
    key: "includes",
    value: function includes(x, fromIndex) {
      return this.indexOf(x, fromIndex) >= 0;
    }
  }, {
    key: "exists",
    value: function exists(x, fromIndex) {
      return this.includes(x, fromIndex);
    }
  }, {
    key: "contains",
    value: function contains(x, fromIndex) {
      return this.includes(x, fromIndex);
    }
  }, {
    key: "reverse",
    value: function reverse() {
      return new List(_toConsumableArray(this._items).reverse(), this.type);
    }
  }, {
    key: "filter",
    value: function filter(fn) {
      return new List(this._items.filter(fn, this), this.type);
    }
  }, {
    key: "where",
    value: function where(fn) {
      return new List(this.filter(fn), this.type);
    }
  }, {
    key: "select",
    value: function select(fn) {
      return new List(this.map(fn), this.type);
    }
  }, {
    key: "top",
    value: function top(n) {
      return new List(this.filter(function (x, i) {
        return i < n;
      }), this.type);
    }
  }, {
    key: "skip",
    value: function skip(n) {
      return new List(this.filter(function (x, i) {
        return i > n;
      }), this.type);
    }
  }, {
    key: "sort",
    value: function sort(fn) {
      return new List(_toConsumableArray(this._items).sort(fn), this.type);
    }
  }, {
    key: "sortBy",
    value: function sortBy(fn) {
      return new List(_toConsumableArray(this._items).sort(function (a, b) {
        return fn(a) > fn(b) ? 1 : -1;
      }), this.type);
    }
  }, {
    key: "orderBy",
    value: function orderBy(fn) {
      return this.sortBy(fn);
    }
  }, {
    key: "orderByDescending",
    value: function orderByDescending(fn) {
      return this.reverse().orderBy(fn);
    }
  }, {
    key: "forEach",
    value: function forEach(fn) {
      return this._items.forEach(fn, this);
    }
  }, {
    key: "slice",
    value: function slice(fromIndex, toIndex) {
      return new List(this._items.slice(fromIndex, toIndex), this.type);
    }
  }, {
    key: "map",
    value: function map(fn) {
      return this._items.map(fn);
    }
  }, {
    key: "join",
    value: function join(x, left, right) {
      if ((0, _locustjsBase.isString)(x)) {
        return this._items.join(x);
      }

      if ((0, _locustjsBase.isArray)(x) || _instanceof(x, List)) {
        var result = new List();
        return result;
      }
    }
  }, {
    key: "merge",
    value: function merge(x, ignoreErrors) {
      if (_instanceof(x, List)) {
        if (x.type == this.type) {
          return this._items.concat(x._items);
        } else {
          if (!ignoreErrors) {
            throw "Lists' types are inconsistent. cannot join.";
          }
        }
      } else if ((0, _locustjsBase.isArray)(x)) {
        if (this.type == undefined) {
          return this._items.concat(x);
        } else {
          var _iterator3 = _createForOfIteratorHelper(x),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var item = _step3.value;

              if (!ignoreErrors) {
                this.add(item);
              } else {
                if (this.canAdd(item)) {
                  this.add(item);
                }
              }
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }
      } else {
        throw "invalid argument. expected list or array.";
      }
    }
  }, {
    key: "reduce",
    value: function reduce(fn, initValue) {
      return this._items.reduce(fn, initValue);
    }
  }, {
    key: "all",
    value: function all(fn) {
      return this.every(fn);
    }
  }, {
    key: "every",
    value: function every(fn) {
      return this._items.every(fn, this);
    }
  }, {
    key: "any",
    value: function any(fn) {
      return this.some(fn);
    }
  }, {
    key: "some",
    value: function some(fn) {
      return this._items.some(fn, this);
    }
  }, {
    key: "count",
    value: function count(fn) {
      if (fn == undefined) {
        return this.length;
      } else {
        return this._items.filter(fn).length;
      }
    }
  }, {
    key: "groupBy",
    value: function groupBy(fn) {
      var _this = this;

      var result = new List();

      var _iterator4 = _createForOfIteratorHelper(this._items),
          _step4;

      try {
        var _loop = function _loop() {
          var x = _step4.value;
          var key = fn(x);
          var index = result.indexOf(function (x) {
            return x.key == key;
          });

          if (index < 0) {
            result.push({
              key: key,
              items: new List(_this.type)
            });
            index = result.length - 1;
          }

          result.elementAt(index).items.push(x);
        };

        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      return result;
    }
  }, {
    key: "leftJoin",
    value: function leftJoin(x, leftFn, rightFn) {// to be implemented
    }
  }, {
    key: "rightJoin",
    value: function rightJoin(x, leftFn, rightFn) {// to be implemented
    }
  }, {
    key: "innerJoin",
    value: function innerJoin(x, leftFn, rightFn) {// to be implemented
    }
  }, {
    key: "union",
    value: function union(x, ignoreErrors) {
      return this.merge(x, ignoreErrors);
    }
  }, {
    key: "intersect",
    value: function intersect(x, ignoreErrors) {// to be implemented
    }
  }, {
    key: "clear",
    value: function clear() {
      this._items = [];
    }
  }, {
    key: "toArray",
    value: function toArray() {
      return _toConsumableArray(this._items);
    }
  }, {
    key: "toJson",
    value: function toJson() {
      return JSON.stringify(this._items);
    }
  }, {
    key: "type",
    get: function get() {
      return this._type;
    },
    set: function set(t) {
      if (this.length > 0) {
        throw "List.type can only be set when the list is empty.";
      }

      if (t == undefined) {
        this._type = undefined;
      } else if ((0, _locustjsBase.isSomeString)(t)) {
        if (t != 'any') {
          this._type = t;
        } else {
          this._type = undefined;
        }
      } else if ((0, _locustjsBase.isFunction)(t)) {
        this._type = t;
      } else {
        throw "List: invalid item type ".concat(t);
      }
    }
  }, {
    key: "length",
    get: function get() {
      return this._items.length;
    }
  }]);

  return List;
}();

exports.List = List;