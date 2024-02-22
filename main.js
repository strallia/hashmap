/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/hashMap/HashMap.js":
/*!********************************!*\
  !*** ./src/hashMap/HashMap.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HashMap: () => (/* binding */ HashMap)
/* harmony export */ });
/* harmony import */ var _MapLinkedList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MapLinkedList */ "./src/hashMap/MapLinkedList.js");

class HashMap {
  // initialize 16-bucket long hash table by default
  table = function () {
    const table = [];
    for (let i = 0; i < 16; i++) {
      table.push(null);
    }
    return table;
  }();
  capacity = 16;
  loadFactor = 0.75;
  increaseCapacity() {
    this.table.push(null);
    this.capacity++;
    const entries = this.entries();
    this.clear();
    entries.forEach(entry => {
      const [key, value] = entry;
      this.set(key, value);
    });
  }
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = Math.floor((primeNumber * hashCode + key.charCodeAt(i)) % this.capacity);
    }
    if (hashCode < 0 || hashCode >= this.capacity) {
      throw new Error('Trying to access index out of bound');
    }
    return hashCode;
  }
  set(key, value) {
    const hash = this.hash(key);
    const curBucket = this.table[hash];
    if (curBucket === null) {
      const newList = new _MapLinkedList__WEBPACK_IMPORTED_MODULE_0__.LinkedList();
      newList.append(key, value);
      this.table[hash] = newList;
    } else if (curBucket && curBucket.contains(key)) {
      const nodeIndex = curBucket.find(key);
      curBucket.updateValue(nodeIndex, value);
    } else if (curBucket && !curBucket.contains(key)) {
      const totalFilledBuckets = this.table.reduce((total, curValue) => {
        if (curValue) {
          return total + 1;
        }
        return total;
      }, 0);

      // collision so increase hash table capacity if reached load factor
      if (totalFilledBuckets / this.capacity >= this.loadFactor) {
        this.increaseCapacity();
        this.set(key, value);
      } else {
        curBucket.append(key, value);
      }
    }
    return this.table;
  }
  get(key) {
    // returns the value assigned to a given key.
    const index = this.hash(key);
    const curBucket = this.table[index];
    if (curBucket && curBucket.contains(key)) {
      const nodeIndex = curBucket.find(key);
      return curBucket.at(nodeIndex).value;
    }
    return null;
  }
  has(key) {
    // returns boolean based on whether or not given key is in hash map.
    const index = this.hash(key);
    const curBucket = this.table[index];
    return !!(curBucket && curBucket.contains(key));
  }
  remove(key) {
    // removes given key in hash map if present.
    const index = this.hash(key);
    const curBucket = this.table[index];
    if (!curBucket || !curBucket.contains(key)) {
      return false;
    }
    if (curBucket.contains(key) && curBucket.size() === 1) {
      this.table[index] = null;
      return true;
    }
    if (curBucket.contains(key)) {
      const nodeIndex = curBucket.find(key);
      curBucket.removeAt(nodeIndex);
      return true;
    }
  }
  length() {
    // returns the number of stored keys in the hash map.
    let totalNodes = 0;
    this.table.forEach(bucket => {
      if (bucket) totalNodes += bucket.size();
    });
    return totalNodes;
  }
  clear() {
    // removes all entries in the hash map.
    const clearedTable = this.table.map(() => null);
    return this.table = clearedTable;
  }
  keys() {
    // returns an array containing all the keys.
    const filledBuckets = this.table.filter(bucket => bucket !== null);
    const keysArr = [];
    filledBuckets.forEach(list => {
      const totalNodes = list.size();
      let curNodeIndex = 1;
      while (curNodeIndex <= totalNodes) {
        keysArr.push(list.at(curNodeIndex).key);
        curNodeIndex++;
      }
    });
    return keysArr;
  }
  values() {
    // returns an array containing all the values.
    const filledBuckets = this.table.filter(bucket => bucket !== null);
    const valuesArr = [];
    filledBuckets.forEach(list => {
      const totalNodes = list.size();
      let curNodeIndex = 1;
      while (curNodeIndex <= totalNodes) {
        valuesArr.push(list.at(curNodeIndex).value);
        curNodeIndex++;
      }
    });
    return valuesArr;
  }
  entries() {
    // returns an array that contains each key-value pair.
    const filledBuckets = this.table.filter(bucket => bucket !== null);
    const keyValuesArr = [];
    filledBuckets.forEach(list => {
      const totalNodes = list.size();
      let curNodeIndex = 1;
      while (curNodeIndex <= totalNodes) {
        keyValuesArr.push([list.at(curNodeIndex).key, list.at(curNodeIndex).value]);
        curNodeIndex++;
      }
    });
    return keyValuesArr;
  }
}
const myHash = new HashMap();
myHash.set('0', 'val');
myHash.set('1', 'val');
myHash.set('2', 'val');
myHash.set('test', 'val');
console.log(myHash.table);

/***/ }),

/***/ "./src/hashMap/MapLinkedList.js":
/*!**************************************!*\
  !*** ./src/hashMap/MapLinkedList.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LinkedList: () => (/* binding */ LinkedList)
/* harmony export */ });
/* harmony import */ var _MapNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MapNode */ "./src/hashMap/MapNode.js");

class LinkedList {
  list = null;
  append(key, value) {
    if (!this.list) {
      this.list = {
        head: new _MapNode__WEBPACK_IMPORTED_MODULE_0__.Node(key, value)
      };
    } else {
      let tmp = this.list.head;
      while (tmp.next) {
        tmp = tmp.next;
      }
      tmp.next = new _MapNode__WEBPACK_IMPORTED_MODULE_0__.Node(key, value);
    }
    return this.list;
  }
  contains(key) {
    if (!this.list) return 'ERROR: No nodes.';
    let pointer = this.list.head;
    while (pointer) {
      if (pointer.key === key) return true;
      pointer = pointer.next;
    }
    return false;
  }
  find(key) {
    if (!this.list) return null;
    let pointer = this.list.head;
    let counter = 1;
    while (pointer) {
      if (pointer.key === key) return counter;
      pointer = pointer.next;
      counter += 1;
    }
    return null;
  }
  updateValue(nodeIndex, value) {
    let pointer = this.list.head;
    let curNodeIndex = 1;
    while (curNodeIndex < nodeIndex) {
      pointer = pointer.next;
      curNodeIndex += 1;
    }
    pointer.value = value;
    return pointer;
  }
  at(index) {
    if (!this.list) return null;
    let pointer = this.list.head;
    let curIndex = 1;
    while (curIndex < index) {
      pointer = pointer.next;
      curIndex += 1;
    }
    return pointer;
  }
  removeAt(index) {
    if (!this.list) return 'ERROR: Empty list.';
    if (index === 1) {
      this.list.head = this.list.head.next;
      return this.list;
    }
    let prevPointer = null;
    let curPointer = this.list.head;
    let counter = 1;
    while (curPointer) {
      if (counter === index) {
        prevPointer.next = curPointer.next;
        return this.list;
      }
      prevPointer = curPointer;
      curPointer = curPointer.next;
      counter += 1;
    }
    return 'ERROR: Index outside of list range.';
  }
  size() {
    if (!this.list) return 0;
    let pointer = this.list.head;
    let counter = 1;
    while (pointer.next) {
      counter += 1;
      pointer = pointer.next;
    }
    return counter;
  }
}

/***/ }),

/***/ "./src/hashMap/MapNode.js":
/*!********************************!*\
  !*** ./src/hashMap/MapNode.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Node: () => (/* binding */ Node)
/* harmony export */ });
class Node {
  constructor() {
    let key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    let value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    let nextNode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    this.key = key;
    this.value = value;
    this.next = nextNode;
  }
}

/***/ }),

/***/ "./src/hashSet/HashSet.js":
/*!********************************!*\
  !*** ./src/hashSet/HashSet.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HashMap: () => (/* binding */ HashMap)
/* harmony export */ });
/* harmony import */ var _SetLinkedList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SetLinkedList */ "./src/hashSet/SetLinkedList.js");

class HashMap {
  // initialize 16-bucket long hash table by default
  table = function () {
    const table = [];
    for (let i = 0; i < 16; i++) {
      table.push(null);
    }
    return table;
  }();
  capacity = 16;
  loadFactor = 0.75;
  increaseCapacity() {
    this.table.push(null);
    this.capacity++;
    const keys = this.keys();
    this.clear();
    keys.forEach(key => this.set(key));
  }
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = Math.floor((primeNumber * hashCode + key.charCodeAt(i)) % this.capacity);
    }
    if (hashCode < 0 || hashCode >= this.capacity) {
      throw new Error('Trying to access index out of bound');
    }
    return hashCode;
  }
  set(key) {
    const hash = this.hash(key);
    const curBucket = this.table[hash];
    if (curBucket === null) {
      const newList = new _SetLinkedList__WEBPACK_IMPORTED_MODULE_0__.LinkedList();
      newList.append(key);
      this.table[hash] = newList;
    } else if (curBucket && !curBucket.contains(key)) {
      const totalFilledBuckets = this.table.reduce((total, filledBucket) => {
        if (filledBucket) {
          return total + 1;
        }
        return total;
      }, 0);

      // collision so increase hash table capacity if reached load factor
      if (totalFilledBuckets / this.capacity >= this.loadFactor) {
        this.increaseCapacity();
        this.set(key);
      } else {
        curBucket.append(key);
      }
    }
    return this.table;
  }
  has(key) {
    // returns boolean based on whether or not given key is in hash set.
    const index = this.hash(key);
    const curBucket = this.table[index];
    return !!(curBucket && curBucket.contains(key));
  }
  remove(key) {
    // removes given key in hash set if present.
    const index = this.hash(key);
    const curBucket = this.table[index];
    if (!curBucket || !curBucket.contains(key)) {
      return false;
    }
    if (curBucket.contains(key) && curBucket.size() === 1) {
      this.table[index] = null;
      return true;
    }
    if (curBucket.contains(key)) {
      const nodeIndex = curBucket.find(key);
      curBucket.removeAt(nodeIndex);
      return true;
    }
  }
  length() {
    // returns the number of stored keys in the hash set.
    let totalNodes = 0;
    this.table.forEach(bucket => {
      if (bucket) totalNodes += bucket.size();
    });
    return totalNodes;
  }
  clear() {
    // removes all entries in the hash set.
    const clearedTable = this.table.map(() => null);
    return this.table = clearedTable;
  }
  keys() {
    // returns an array containing all the keys inside the hash set.
    const filledBuckets = this.table.filter(bucket => bucket !== null);
    const keysArr = [];
    filledBuckets.forEach(list => {
      const totalNodes = list.size();
      let curNodeIndex = 1;
      while (curNodeIndex <= totalNodes) {
        keysArr.push(list.at(curNodeIndex).key);
        curNodeIndex++;
      }
    });
    return keysArr;
  }
}
const myHash = new HashMap();
myHash.set('0');
myHash.set('1');
myHash.set('2');
myHash.set('3');
myHash.set('4');
myHash.set('5');
myHash.set('6');
myHash.set('7');
myHash.set('8');
myHash.set('9');
myHash.set('10');
myHash.set('20');
myHash.set('test');
console.log(myHash.table);

/***/ }),

/***/ "./src/hashSet/SetLinkedList.js":
/*!**************************************!*\
  !*** ./src/hashSet/SetLinkedList.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LinkedList: () => (/* binding */ LinkedList)
/* harmony export */ });
/* harmony import */ var _SetNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SetNode */ "./src/hashSet/SetNode.js");

class LinkedList {
  list = null;
  append(key) {
    if (!this.list) {
      this.list = {
        head: new _SetNode__WEBPACK_IMPORTED_MODULE_0__.Node(key)
      };
    } else {
      let tmp = this.list.head;
      while (tmp.next) {
        tmp = tmp.next;
      }
      tmp.next = new _SetNode__WEBPACK_IMPORTED_MODULE_0__.Node(key);
    }
    return this.list;
  }
  contains(key) {
    if (!this.list) return 'ERROR: No nodes.';
    let pointer = this.list.head;
    while (pointer) {
      if (pointer.key === key) return true;
      pointer = pointer.next;
    }
    return false;
  }
  find(key) {
    if (!this.list) return null;
    let pointer = this.list.head;
    let counter = 1;
    while (pointer) {
      if (pointer.key === key) return counter;
      pointer = pointer.next;
      counter += 1;
    }
    return null;
  }
  at(index) {
    if (!this.list) return null;
    let pointer = this.list.head;
    let curIndex = 1;
    while (curIndex < index) {
      pointer = pointer.next;
      curIndex += 1;
    }
    return pointer;
  }
  removeAt(index) {
    if (!this.list) return 'ERROR: Empty list.';
    if (index === 1) {
      this.list.head = this.list.head.next;
      return this.list;
    }
    let prevPointer = null;
    let curPointer = this.list.head;
    let counter = 1;
    while (curPointer) {
      if (counter === index) {
        prevPointer.next = curPointer.next;
        return this.list;
      }
      prevPointer = curPointer;
      curPointer = curPointer.next;
      counter += 1;
    }
    return 'ERROR: Index outside of list range.';
  }
  size() {
    if (!this.list) return 0;
    let pointer = this.list.head;
    let counter = 1;
    while (pointer.next) {
      counter += 1;
      pointer = pointer.next;
    }
    return counter;
  }
}

/***/ }),

/***/ "./src/hashSet/SetNode.js":
/*!********************************!*\
  !*** ./src/hashSet/SetNode.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Node: () => (/* binding */ Node)
/* harmony export */ });
class Node {
  constructor() {
    let key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    let nextNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    this.key = key;
    this.next = nextNode;
  }
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* outline: 1px solid red; */
}
`, "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAAA;EACE,SAAS;EACT,UAAU;EACV,sBAAsB;EACtB,4BAA4B;AAC9B","sourcesContent":["* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  /* outline: 1px solid red; */\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");
/* harmony import */ var _hashMap_HashMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hashMap/HashMap */ "./src/hashMap/HashMap.js");
/* harmony import */ var _hashSet_HashSet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hashSet/HashSet */ "./src/hashSet/HashSet.js");



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7Ozs7Ozs7Ozs7OztBQ0FzQjtBQUNLIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaGFzaG1hcC8uL3NyYy9oYXNoTWFwL0hhc2hNYXAuanMiLCJ3ZWJwYWNrOi8vaGFzaG1hcC8uL3NyYy9oYXNoTWFwL01hcExpbmtlZExpc3QuanMiLCJ3ZWJwYWNrOi8vaGFzaG1hcC8uL3NyYy9oYXNoTWFwL01hcE5vZGUuanMiLCJ3ZWJwYWNrOi8vaGFzaG1hcC8uL3NyYy9oYXNoU2V0L0hhc2hTZXQuanMiLCJ3ZWJwYWNrOi8vaGFzaG1hcC8uL3NyYy9oYXNoU2V0L1NldExpbmtlZExpc3QuanMiLCJ3ZWJwYWNrOi8vaGFzaG1hcC8uL3NyYy9oYXNoU2V0L1NldE5vZGUuanMiLCJ3ZWJwYWNrOi8vaGFzaG1hcC8uL3NyYy9zdHlsZXMuY3NzIiwid2VicGFjazovL2hhc2htYXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2hhc2htYXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9oYXNobWFwLy4vc3JjL3N0eWxlcy5jc3M/NDRiMiIsIndlYnBhY2s6Ly9oYXNobWFwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2hhc2htYXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2hhc2htYXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vaGFzaG1hcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9oYXNobWFwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vaGFzaG1hcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2hhc2htYXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vaGFzaG1hcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9oYXNobWFwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9oYXNobWFwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vaGFzaG1hcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2hhc2htYXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2hhc2htYXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGlua2VkTGlzdCB9IGZyb20gJy4vTWFwTGlua2VkTGlzdCc7XG5cbmV4cG9ydCBjbGFzcyBIYXNoTWFwIHtcbiAgLy8gaW5pdGlhbGl6ZSAxNi1idWNrZXQgbG9uZyBoYXNoIHRhYmxlIGJ5IGRlZmF1bHRcbiAgdGFibGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHRhYmxlID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNjsgaSsrKSB7XG4gICAgICB0YWJsZS5wdXNoKG51bGwpO1xuICAgIH1cbiAgICByZXR1cm4gdGFibGU7XG4gIH0pKCk7XG5cbiAgY2FwYWNpdHkgPSAxNjtcblxuICBsb2FkRmFjdG9yID0gMC43NTtcblxuICBpbmNyZWFzZUNhcGFjaXR5KCkge1xuICAgIHRoaXMudGFibGUucHVzaChudWxsKTtcbiAgICB0aGlzLmNhcGFjaXR5Kys7XG5cbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5lbnRyaWVzKCk7XG4gICAgdGhpcy5jbGVhcigpO1xuICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IGVudHJ5O1xuICAgICAgdGhpcy5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgfSk7XG4gIH1cblxuICBoYXNoKGtleSkge1xuICAgIGxldCBoYXNoQ29kZSA9IDA7XG5cbiAgICBjb25zdCBwcmltZU51bWJlciA9IDMxO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBoYXNoQ29kZSA9IE1hdGguZmxvb3IoXG4gICAgICAgIChwcmltZU51bWJlciAqIGhhc2hDb2RlICsga2V5LmNoYXJDb2RlQXQoaSkpICUgdGhpcy5jYXBhY2l0eSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGhhc2hDb2RlIDwgMCB8fCBoYXNoQ29kZSA+PSB0aGlzLmNhcGFjaXR5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyeWluZyB0byBhY2Nlc3MgaW5kZXggb3V0IG9mIGJvdW5kJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhhc2hDb2RlO1xuICB9XG5cbiAgc2V0KGtleSwgdmFsdWUpIHtcbiAgICBjb25zdCBoYXNoID0gdGhpcy5oYXNoKGtleSk7XG5cbiAgICBjb25zdCBjdXJCdWNrZXQgPSB0aGlzLnRhYmxlW2hhc2hdO1xuICAgIGlmIChjdXJCdWNrZXQgPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IG5ld0xpc3QgPSBuZXcgTGlua2VkTGlzdCgpO1xuICAgICAgbmV3TGlzdC5hcHBlbmQoa2V5LCB2YWx1ZSk7XG4gICAgICB0aGlzLnRhYmxlW2hhc2hdID0gbmV3TGlzdDtcbiAgICB9IGVsc2UgaWYgKGN1ckJ1Y2tldCAmJiBjdXJCdWNrZXQuY29udGFpbnMoa2V5KSkge1xuICAgICAgY29uc3Qgbm9kZUluZGV4ID0gY3VyQnVja2V0LmZpbmQoa2V5KTtcbiAgICAgIGN1ckJ1Y2tldC51cGRhdGVWYWx1ZShub2RlSW5kZXgsIHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKGN1ckJ1Y2tldCAmJiAhY3VyQnVja2V0LmNvbnRhaW5zKGtleSkpIHtcbiAgICAgIGNvbnN0IHRvdGFsRmlsbGVkQnVja2V0cyA9IHRoaXMudGFibGUucmVkdWNlKCh0b3RhbCwgY3VyVmFsdWUpID0+IHtcbiAgICAgICAgaWYgKGN1clZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIHRvdGFsICsgMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG90YWw7XG4gICAgICB9LCAwKTtcblxuICAgICAgLy8gY29sbGlzaW9uIHNvIGluY3JlYXNlIGhhc2ggdGFibGUgY2FwYWNpdHkgaWYgcmVhY2hlZCBsb2FkIGZhY3RvclxuICAgICAgaWYgKHRvdGFsRmlsbGVkQnVja2V0cyAvIHRoaXMuY2FwYWNpdHkgPj0gdGhpcy5sb2FkRmFjdG9yKSB7XG4gICAgICAgIHRoaXMuaW5jcmVhc2VDYXBhY2l0eSgpO1xuICAgICAgICB0aGlzLnNldChrZXksIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1ckJ1Y2tldC5hcHBlbmQoa2V5LCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMudGFibGU7XG4gIH1cblxuICBnZXQoa2V5KSB7XG4gICAgLy8gcmV0dXJucyB0aGUgdmFsdWUgYXNzaWduZWQgdG8gYSBnaXZlbiBrZXkuXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmhhc2goa2V5KTtcbiAgICBjb25zdCBjdXJCdWNrZXQgPSB0aGlzLnRhYmxlW2luZGV4XTtcblxuICAgIGlmIChjdXJCdWNrZXQgJiYgY3VyQnVja2V0LmNvbnRhaW5zKGtleSkpIHtcbiAgICAgIGNvbnN0IG5vZGVJbmRleCA9IGN1ckJ1Y2tldC5maW5kKGtleSk7XG4gICAgICByZXR1cm4gY3VyQnVja2V0LmF0KG5vZGVJbmRleCkudmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaGFzKGtleSkge1xuICAgIC8vIHJldHVybnMgYm9vbGVhbiBiYXNlZCBvbiB3aGV0aGVyIG9yIG5vdCBnaXZlbiBrZXkgaXMgaW4gaGFzaCBtYXAuXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmhhc2goa2V5KTtcbiAgICBjb25zdCBjdXJCdWNrZXQgPSB0aGlzLnRhYmxlW2luZGV4XTtcbiAgICByZXR1cm4gISEoY3VyQnVja2V0ICYmIGN1ckJ1Y2tldC5jb250YWlucyhrZXkpKTtcbiAgfVxuXG4gIHJlbW92ZShrZXkpIHtcbiAgICAvLyByZW1vdmVzIGdpdmVuIGtleSBpbiBoYXNoIG1hcCBpZiBwcmVzZW50LlxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5oYXNoKGtleSk7XG4gICAgY29uc3QgY3VyQnVja2V0ID0gdGhpcy50YWJsZVtpbmRleF07XG4gICAgaWYgKCFjdXJCdWNrZXQgfHwgIWN1ckJ1Y2tldC5jb250YWlucyhrZXkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChjdXJCdWNrZXQuY29udGFpbnMoa2V5KSAmJiBjdXJCdWNrZXQuc2l6ZSgpID09PSAxKSB7XG4gICAgICB0aGlzLnRhYmxlW2luZGV4XSA9IG51bGw7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGN1ckJ1Y2tldC5jb250YWlucyhrZXkpKSB7XG4gICAgICBjb25zdCBub2RlSW5kZXggPSBjdXJCdWNrZXQuZmluZChrZXkpO1xuICAgICAgY3VyQnVja2V0LnJlbW92ZUF0KG5vZGVJbmRleCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBsZW5ndGgoKSB7XG4gICAgLy8gcmV0dXJucyB0aGUgbnVtYmVyIG9mIHN0b3JlZCBrZXlzIGluIHRoZSBoYXNoIG1hcC5cbiAgICBsZXQgdG90YWxOb2RlcyA9IDA7XG4gICAgdGhpcy50YWJsZS5mb3JFYWNoKChidWNrZXQpID0+IHtcbiAgICAgIGlmIChidWNrZXQpIHRvdGFsTm9kZXMgKz0gYnVja2V0LnNpemUoKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdG90YWxOb2RlcztcbiAgfVxuXG4gIGNsZWFyKCkge1xuICAgIC8vIHJlbW92ZXMgYWxsIGVudHJpZXMgaW4gdGhlIGhhc2ggbWFwLlxuICAgIGNvbnN0IGNsZWFyZWRUYWJsZSA9IHRoaXMudGFibGUubWFwKCgpID0+IG51bGwpO1xuICAgIHJldHVybiAodGhpcy50YWJsZSA9IGNsZWFyZWRUYWJsZSk7XG4gIH1cblxuICBrZXlzKCkge1xuICAgIC8vIHJldHVybnMgYW4gYXJyYXkgY29udGFpbmluZyBhbGwgdGhlIGtleXMuXG4gICAgY29uc3QgZmlsbGVkQnVja2V0cyA9IHRoaXMudGFibGUuZmlsdGVyKChidWNrZXQpID0+IGJ1Y2tldCAhPT0gbnVsbCk7XG4gICAgY29uc3Qga2V5c0FyciA9IFtdO1xuICAgIGZpbGxlZEJ1Y2tldHMuZm9yRWFjaCgobGlzdCkgPT4ge1xuICAgICAgY29uc3QgdG90YWxOb2RlcyA9IGxpc3Quc2l6ZSgpO1xuICAgICAgbGV0IGN1ck5vZGVJbmRleCA9IDE7XG4gICAgICB3aGlsZSAoY3VyTm9kZUluZGV4IDw9IHRvdGFsTm9kZXMpIHtcbiAgICAgICAga2V5c0Fyci5wdXNoKGxpc3QuYXQoY3VyTm9kZUluZGV4KS5rZXkpO1xuICAgICAgICBjdXJOb2RlSW5kZXgrKztcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4ga2V5c0FycjtcbiAgfVxuXG4gIHZhbHVlcygpIHtcbiAgICAvLyByZXR1cm5zIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIHRoZSB2YWx1ZXMuXG4gICAgY29uc3QgZmlsbGVkQnVja2V0cyA9IHRoaXMudGFibGUuZmlsdGVyKChidWNrZXQpID0+IGJ1Y2tldCAhPT0gbnVsbCk7XG4gICAgY29uc3QgdmFsdWVzQXJyID0gW107XG4gICAgZmlsbGVkQnVja2V0cy5mb3JFYWNoKChsaXN0KSA9PiB7XG4gICAgICBjb25zdCB0b3RhbE5vZGVzID0gbGlzdC5zaXplKCk7XG4gICAgICBsZXQgY3VyTm9kZUluZGV4ID0gMTtcbiAgICAgIHdoaWxlIChjdXJOb2RlSW5kZXggPD0gdG90YWxOb2Rlcykge1xuICAgICAgICB2YWx1ZXNBcnIucHVzaChsaXN0LmF0KGN1ck5vZGVJbmRleCkudmFsdWUpO1xuICAgICAgICBjdXJOb2RlSW5kZXgrKztcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdmFsdWVzQXJyO1xuICB9XG5cbiAgZW50cmllcygpIHtcbiAgICAvLyByZXR1cm5zIGFuIGFycmF5IHRoYXQgY29udGFpbnMgZWFjaCBrZXktdmFsdWUgcGFpci5cbiAgICBjb25zdCBmaWxsZWRCdWNrZXRzID0gdGhpcy50YWJsZS5maWx0ZXIoKGJ1Y2tldCkgPT4gYnVja2V0ICE9PSBudWxsKTtcbiAgICBjb25zdCBrZXlWYWx1ZXNBcnIgPSBbXTtcbiAgICBmaWxsZWRCdWNrZXRzLmZvckVhY2goKGxpc3QpID0+IHtcbiAgICAgIGNvbnN0IHRvdGFsTm9kZXMgPSBsaXN0LnNpemUoKTtcbiAgICAgIGxldCBjdXJOb2RlSW5kZXggPSAxO1xuICAgICAgd2hpbGUgKGN1ck5vZGVJbmRleCA8PSB0b3RhbE5vZGVzKSB7XG4gICAgICAgIGtleVZhbHVlc0Fyci5wdXNoKFtcbiAgICAgICAgICBsaXN0LmF0KGN1ck5vZGVJbmRleCkua2V5LFxuICAgICAgICAgIGxpc3QuYXQoY3VyTm9kZUluZGV4KS52YWx1ZSxcbiAgICAgICAgXSk7XG4gICAgICAgIGN1ck5vZGVJbmRleCsrO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBrZXlWYWx1ZXNBcnI7XG4gIH1cbn1cblxuY29uc3QgbXlIYXNoID0gbmV3IEhhc2hNYXAoKTtcbm15SGFzaC5zZXQoJzAnLCAndmFsJyk7XG5teUhhc2guc2V0KCcxJywgJ3ZhbCcpO1xubXlIYXNoLnNldCgnMicsICd2YWwnKTtcbm15SGFzaC5zZXQoJ3Rlc3QnLCAndmFsJyk7XG5jb25zb2xlLmxvZyhteUhhc2gudGFibGUpO1xuIiwiaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4vTWFwTm9kZSc7XG5cbmV4cG9ydCBjbGFzcyBMaW5rZWRMaXN0IHtcbiAgbGlzdCA9IG51bGw7XG5cbiAgYXBwZW5kKGtleSwgdmFsdWUpIHtcbiAgICBpZiAoIXRoaXMubGlzdCkge1xuICAgICAgdGhpcy5saXN0ID0geyBoZWFkOiBuZXcgTm9kZShrZXksIHZhbHVlKSB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgdG1wID0gdGhpcy5saXN0LmhlYWQ7XG4gICAgICB3aGlsZSAodG1wLm5leHQpIHtcbiAgICAgICAgdG1wID0gdG1wLm5leHQ7XG4gICAgICB9XG4gICAgICB0bXAubmV4dCA9IG5ldyBOb2RlKGtleSwgdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5saXN0O1xuICB9XG5cbiAgY29udGFpbnMoa2V5KSB7XG4gICAgaWYgKCF0aGlzLmxpc3QpIHJldHVybiAnRVJST1I6IE5vIG5vZGVzLic7XG4gICAgbGV0IHBvaW50ZXIgPSB0aGlzLmxpc3QuaGVhZDtcbiAgICB3aGlsZSAocG9pbnRlcikge1xuICAgICAgaWYgKHBvaW50ZXIua2V5ID09PSBrZXkpIHJldHVybiB0cnVlO1xuICAgICAgcG9pbnRlciA9IHBvaW50ZXIubmV4dDtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZmluZChrZXkpIHtcbiAgICBpZiAoIXRoaXMubGlzdCkgcmV0dXJuIG51bGw7XG4gICAgbGV0IHBvaW50ZXIgPSB0aGlzLmxpc3QuaGVhZDtcbiAgICBsZXQgY291bnRlciA9IDE7XG4gICAgd2hpbGUgKHBvaW50ZXIpIHtcbiAgICAgIGlmIChwb2ludGVyLmtleSA9PT0ga2V5KSByZXR1cm4gY291bnRlcjtcbiAgICAgIHBvaW50ZXIgPSBwb2ludGVyLm5leHQ7XG4gICAgICBjb3VudGVyICs9IDE7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdXBkYXRlVmFsdWUobm9kZUluZGV4LCB2YWx1ZSkge1xuICAgIGxldCBwb2ludGVyID0gdGhpcy5saXN0LmhlYWQ7XG4gICAgbGV0IGN1ck5vZGVJbmRleCA9IDE7XG4gICAgd2hpbGUgKGN1ck5vZGVJbmRleCA8IG5vZGVJbmRleCkge1xuICAgICAgcG9pbnRlciA9IHBvaW50ZXIubmV4dDtcbiAgICAgIGN1ck5vZGVJbmRleCArPSAxO1xuICAgIH1cbiAgICBwb2ludGVyLnZhbHVlID0gdmFsdWU7XG4gICAgcmV0dXJuIHBvaW50ZXI7XG4gIH1cblxuICBhdChpbmRleCkge1xuICAgIGlmICghdGhpcy5saXN0KSByZXR1cm4gbnVsbDtcbiAgICBsZXQgcG9pbnRlciA9IHRoaXMubGlzdC5oZWFkO1xuICAgIGxldCBjdXJJbmRleCA9IDE7XG4gICAgd2hpbGUgKGN1ckluZGV4IDwgaW5kZXgpIHtcbiAgICAgIHBvaW50ZXIgPSBwb2ludGVyLm5leHQ7XG4gICAgICBjdXJJbmRleCArPSAxO1xuICAgIH1cbiAgICByZXR1cm4gcG9pbnRlcjtcbiAgfVxuXG4gIHJlbW92ZUF0KGluZGV4KSB7XG4gICAgaWYgKCF0aGlzLmxpc3QpIHJldHVybiAnRVJST1I6IEVtcHR5IGxpc3QuJztcbiAgICBpZiAoaW5kZXggPT09IDEpIHtcbiAgICAgIHRoaXMubGlzdC5oZWFkID0gdGhpcy5saXN0LmhlYWQubmV4dDtcbiAgICAgIHJldHVybiB0aGlzLmxpc3Q7XG4gICAgfVxuICAgIGxldCBwcmV2UG9pbnRlciA9IG51bGw7XG4gICAgbGV0IGN1clBvaW50ZXIgPSB0aGlzLmxpc3QuaGVhZDtcbiAgICBsZXQgY291bnRlciA9IDE7XG4gICAgd2hpbGUgKGN1clBvaW50ZXIpIHtcbiAgICAgIGlmIChjb3VudGVyID09PSBpbmRleCkge1xuICAgICAgICBwcmV2UG9pbnRlci5uZXh0ID0gY3VyUG9pbnRlci5uZXh0O1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0O1xuICAgICAgfVxuICAgICAgcHJldlBvaW50ZXIgPSBjdXJQb2ludGVyO1xuICAgICAgY3VyUG9pbnRlciA9IGN1clBvaW50ZXIubmV4dDtcbiAgICAgIGNvdW50ZXIgKz0gMTtcbiAgICB9XG4gICAgcmV0dXJuICdFUlJPUjogSW5kZXggb3V0c2lkZSBvZiBsaXN0IHJhbmdlLic7XG4gIH1cblxuICBzaXplKCkge1xuICAgIGlmICghdGhpcy5saXN0KSByZXR1cm4gMDtcblxuICAgIGxldCBwb2ludGVyID0gdGhpcy5saXN0LmhlYWQ7XG4gICAgbGV0IGNvdW50ZXIgPSAxO1xuICAgIHdoaWxlIChwb2ludGVyLm5leHQpIHtcbiAgICAgIGNvdW50ZXIgKz0gMTtcbiAgICAgIHBvaW50ZXIgPSBwb2ludGVyLm5leHQ7XG4gICAgfVxuICAgIHJldHVybiBjb3VudGVyO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgTm9kZSB7XG4gIGNvbnN0cnVjdG9yKGtleSA9IG51bGwsIHZhbHVlID0gbnVsbCwgbmV4dE5vZGUgPSBudWxsKSB7XG4gICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMubmV4dCA9IG5leHROb2RlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBMaW5rZWRMaXN0IH0gZnJvbSAnLi9TZXRMaW5rZWRMaXN0JztcblxuZXhwb3J0IGNsYXNzIEhhc2hNYXAge1xuICAvLyBpbml0aWFsaXplIDE2LWJ1Y2tldCBsb25nIGhhc2ggdGFibGUgYnkgZGVmYXVsdFxuICB0YWJsZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgdGFibGUgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyBpKyspIHtcbiAgICAgIHRhYmxlLnB1c2gobnVsbCk7XG4gICAgfVxuICAgIHJldHVybiB0YWJsZTtcbiAgfSkoKTtcblxuICBjYXBhY2l0eSA9IDE2O1xuXG4gIGxvYWRGYWN0b3IgPSAwLjc1O1xuXG4gIGluY3JlYXNlQ2FwYWNpdHkoKSB7XG4gICAgdGhpcy50YWJsZS5wdXNoKG51bGwpO1xuICAgIHRoaXMuY2FwYWNpdHkrKztcblxuICAgIGNvbnN0IGtleXMgPSB0aGlzLmtleXMoKTtcbiAgICB0aGlzLmNsZWFyKCk7XG4gICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHRoaXMuc2V0KGtleSkpO1xuICB9XG5cbiAgaGFzaChrZXkpIHtcbiAgICBsZXQgaGFzaENvZGUgPSAwO1xuXG4gICAgY29uc3QgcHJpbWVOdW1iZXIgPSAzMTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleS5sZW5ndGg7IGkrKykge1xuICAgICAgaGFzaENvZGUgPSBNYXRoLmZsb29yKFxuICAgICAgICAocHJpbWVOdW1iZXIgKiBoYXNoQ29kZSArIGtleS5jaGFyQ29kZUF0KGkpKSAlIHRoaXMuY2FwYWNpdHksXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChoYXNoQ29kZSA8IDAgfHwgaGFzaENvZGUgPj0gdGhpcy5jYXBhY2l0eSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcnlpbmcgdG8gYWNjZXNzIGluZGV4IG91dCBvZiBib3VuZCcpO1xuICAgIH1cblxuICAgIHJldHVybiBoYXNoQ29kZTtcbiAgfVxuXG4gIHNldChrZXkpIHtcbiAgICBjb25zdCBoYXNoID0gdGhpcy5oYXNoKGtleSk7XG5cbiAgICBjb25zdCBjdXJCdWNrZXQgPSB0aGlzLnRhYmxlW2hhc2hdO1xuICAgIGlmIChjdXJCdWNrZXQgPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IG5ld0xpc3QgPSBuZXcgTGlua2VkTGlzdCgpO1xuICAgICAgbmV3TGlzdC5hcHBlbmQoa2V5KTtcbiAgICAgIHRoaXMudGFibGVbaGFzaF0gPSBuZXdMaXN0O1xuICAgIH0gZWxzZSBpZiAoY3VyQnVja2V0ICYmICFjdXJCdWNrZXQuY29udGFpbnMoa2V5KSkge1xuICAgICAgY29uc3QgdG90YWxGaWxsZWRCdWNrZXRzID0gdGhpcy50YWJsZS5yZWR1Y2UoKHRvdGFsLCBmaWxsZWRCdWNrZXQpID0+IHtcbiAgICAgICAgaWYgKGZpbGxlZEJ1Y2tldCkge1xuICAgICAgICAgIHJldHVybiB0b3RhbCArIDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvdGFsO1xuICAgICAgfSwgMCk7XG5cbiAgICAgIC8vIGNvbGxpc2lvbiBzbyBpbmNyZWFzZSBoYXNoIHRhYmxlIGNhcGFjaXR5IGlmIHJlYWNoZWQgbG9hZCBmYWN0b3JcbiAgICAgIGlmICh0b3RhbEZpbGxlZEJ1Y2tldHMgLyB0aGlzLmNhcGFjaXR5ID49IHRoaXMubG9hZEZhY3Rvcikge1xuICAgICAgICB0aGlzLmluY3JlYXNlQ2FwYWNpdHkoKTtcbiAgICAgICAgdGhpcy5zZXQoa2V5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1ckJ1Y2tldC5hcHBlbmQoa2V5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy50YWJsZTtcbiAgfVxuXG4gIGhhcyhrZXkpIHtcbiAgICAvLyByZXR1cm5zIGJvb2xlYW4gYmFzZWQgb24gd2hldGhlciBvciBub3QgZ2l2ZW4ga2V5IGlzIGluIGhhc2ggc2V0LlxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5oYXNoKGtleSk7XG4gICAgY29uc3QgY3VyQnVja2V0ID0gdGhpcy50YWJsZVtpbmRleF07XG4gICAgcmV0dXJuICEhKGN1ckJ1Y2tldCAmJiBjdXJCdWNrZXQuY29udGFpbnMoa2V5KSk7XG4gIH1cblxuICByZW1vdmUoa2V5KSB7XG4gICAgLy8gcmVtb3ZlcyBnaXZlbiBrZXkgaW4gaGFzaCBzZXQgaWYgcHJlc2VudC5cbiAgICBjb25zdCBpbmRleCA9IHRoaXMuaGFzaChrZXkpO1xuICAgIGNvbnN0IGN1ckJ1Y2tldCA9IHRoaXMudGFibGVbaW5kZXhdO1xuICAgIGlmICghY3VyQnVja2V0IHx8ICFjdXJCdWNrZXQuY29udGFpbnMoa2V5KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoY3VyQnVja2V0LmNvbnRhaW5zKGtleSkgJiYgY3VyQnVja2V0LnNpemUoKSA9PT0gMSkge1xuICAgICAgdGhpcy50YWJsZVtpbmRleF0gPSBudWxsO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChjdXJCdWNrZXQuY29udGFpbnMoa2V5KSkge1xuICAgICAgY29uc3Qgbm9kZUluZGV4ID0gY3VyQnVja2V0LmZpbmQoa2V5KTtcbiAgICAgIGN1ckJ1Y2tldC5yZW1vdmVBdChub2RlSW5kZXgpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgbGVuZ3RoKCkge1xuICAgIC8vIHJldHVybnMgdGhlIG51bWJlciBvZiBzdG9yZWQga2V5cyBpbiB0aGUgaGFzaCBzZXQuXG4gICAgbGV0IHRvdGFsTm9kZXMgPSAwO1xuICAgIHRoaXMudGFibGUuZm9yRWFjaCgoYnVja2V0KSA9PiB7XG4gICAgICBpZiAoYnVja2V0KSB0b3RhbE5vZGVzICs9IGJ1Y2tldC5zaXplKCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRvdGFsTm9kZXM7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICAvLyByZW1vdmVzIGFsbCBlbnRyaWVzIGluIHRoZSBoYXNoIHNldC5cbiAgICBjb25zdCBjbGVhcmVkVGFibGUgPSB0aGlzLnRhYmxlLm1hcCgoKSA9PiBudWxsKTtcbiAgICByZXR1cm4gKHRoaXMudGFibGUgPSBjbGVhcmVkVGFibGUpO1xuICB9XG5cbiAga2V5cygpIHtcbiAgICAvLyByZXR1cm5zIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIHRoZSBrZXlzIGluc2lkZSB0aGUgaGFzaCBzZXQuXG4gICAgY29uc3QgZmlsbGVkQnVja2V0cyA9IHRoaXMudGFibGUuZmlsdGVyKChidWNrZXQpID0+IGJ1Y2tldCAhPT0gbnVsbCk7XG4gICAgY29uc3Qga2V5c0FyciA9IFtdO1xuICAgIGZpbGxlZEJ1Y2tldHMuZm9yRWFjaCgobGlzdCkgPT4ge1xuICAgICAgY29uc3QgdG90YWxOb2RlcyA9IGxpc3Quc2l6ZSgpO1xuICAgICAgbGV0IGN1ck5vZGVJbmRleCA9IDE7XG4gICAgICB3aGlsZSAoY3VyTm9kZUluZGV4IDw9IHRvdGFsTm9kZXMpIHtcbiAgICAgICAga2V5c0Fyci5wdXNoKGxpc3QuYXQoY3VyTm9kZUluZGV4KS5rZXkpO1xuICAgICAgICBjdXJOb2RlSW5kZXgrKztcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4ga2V5c0FycjtcbiAgfVxufVxuXG5jb25zdCBteUhhc2ggPSBuZXcgSGFzaE1hcCgpO1xubXlIYXNoLnNldCgnMCcpO1xubXlIYXNoLnNldCgnMScpO1xubXlIYXNoLnNldCgnMicpO1xubXlIYXNoLnNldCgnMycpO1xubXlIYXNoLnNldCgnNCcpO1xubXlIYXNoLnNldCgnNScpO1xubXlIYXNoLnNldCgnNicpO1xubXlIYXNoLnNldCgnNycpO1xubXlIYXNoLnNldCgnOCcpO1xubXlIYXNoLnNldCgnOScpO1xubXlIYXNoLnNldCgnMTAnKTtcbm15SGFzaC5zZXQoJzIwJyk7XG5teUhhc2guc2V0KCd0ZXN0Jyk7XG5jb25zb2xlLmxvZyhteUhhc2gudGFibGUpO1xuIiwiaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4vU2V0Tm9kZSc7XG5cbmV4cG9ydCBjbGFzcyBMaW5rZWRMaXN0IHtcbiAgbGlzdCA9IG51bGw7XG5cbiAgYXBwZW5kKGtleSkge1xuICAgIGlmICghdGhpcy5saXN0KSB7XG4gICAgICB0aGlzLmxpc3QgPSB7IGhlYWQ6IG5ldyBOb2RlKGtleSkgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHRtcCA9IHRoaXMubGlzdC5oZWFkO1xuICAgICAgd2hpbGUgKHRtcC5uZXh0KSB7XG4gICAgICAgIHRtcCA9IHRtcC5uZXh0O1xuICAgICAgfVxuICAgICAgdG1wLm5leHQgPSBuZXcgTm9kZShrZXkpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5saXN0O1xuICB9XG5cbiAgY29udGFpbnMoa2V5KSB7XG4gICAgaWYgKCF0aGlzLmxpc3QpIHJldHVybiAnRVJST1I6IE5vIG5vZGVzLic7XG4gICAgbGV0IHBvaW50ZXIgPSB0aGlzLmxpc3QuaGVhZDtcbiAgICB3aGlsZSAocG9pbnRlcikge1xuICAgICAgaWYgKHBvaW50ZXIua2V5ID09PSBrZXkpIHJldHVybiB0cnVlO1xuICAgICAgcG9pbnRlciA9IHBvaW50ZXIubmV4dDtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZmluZChrZXkpIHtcbiAgICBpZiAoIXRoaXMubGlzdCkgcmV0dXJuIG51bGw7XG4gICAgbGV0IHBvaW50ZXIgPSB0aGlzLmxpc3QuaGVhZDtcbiAgICBsZXQgY291bnRlciA9IDE7XG4gICAgd2hpbGUgKHBvaW50ZXIpIHtcbiAgICAgIGlmIChwb2ludGVyLmtleSA9PT0ga2V5KSByZXR1cm4gY291bnRlcjtcbiAgICAgIHBvaW50ZXIgPSBwb2ludGVyLm5leHQ7XG4gICAgICBjb3VudGVyICs9IDE7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgYXQoaW5kZXgpIHtcbiAgICBpZiAoIXRoaXMubGlzdCkgcmV0dXJuIG51bGw7XG4gICAgbGV0IHBvaW50ZXIgPSB0aGlzLmxpc3QuaGVhZDtcbiAgICBsZXQgY3VySW5kZXggPSAxO1xuICAgIHdoaWxlIChjdXJJbmRleCA8IGluZGV4KSB7XG4gICAgICBwb2ludGVyID0gcG9pbnRlci5uZXh0O1xuICAgICAgY3VySW5kZXggKz0gMTtcbiAgICB9XG4gICAgcmV0dXJuIHBvaW50ZXI7XG4gIH1cblxuICByZW1vdmVBdChpbmRleCkge1xuICAgIGlmICghdGhpcy5saXN0KSByZXR1cm4gJ0VSUk9SOiBFbXB0eSBsaXN0Lic7XG4gICAgaWYgKGluZGV4ID09PSAxKSB7XG4gICAgICB0aGlzLmxpc3QuaGVhZCA9IHRoaXMubGlzdC5oZWFkLm5leHQ7XG4gICAgICByZXR1cm4gdGhpcy5saXN0O1xuICAgIH1cbiAgICBsZXQgcHJldlBvaW50ZXIgPSBudWxsO1xuICAgIGxldCBjdXJQb2ludGVyID0gdGhpcy5saXN0LmhlYWQ7XG4gICAgbGV0IGNvdW50ZXIgPSAxO1xuICAgIHdoaWxlIChjdXJQb2ludGVyKSB7XG4gICAgICBpZiAoY291bnRlciA9PT0gaW5kZXgpIHtcbiAgICAgICAgcHJldlBvaW50ZXIubmV4dCA9IGN1clBvaW50ZXIubmV4dDtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdDtcbiAgICAgIH1cbiAgICAgIHByZXZQb2ludGVyID0gY3VyUG9pbnRlcjtcbiAgICAgIGN1clBvaW50ZXIgPSBjdXJQb2ludGVyLm5leHQ7XG4gICAgICBjb3VudGVyICs9IDE7XG4gICAgfVxuICAgIHJldHVybiAnRVJST1I6IEluZGV4IG91dHNpZGUgb2YgbGlzdCByYW5nZS4nO1xuICB9XG5cbiAgc2l6ZSgpIHtcbiAgICBpZiAoIXRoaXMubGlzdCkgcmV0dXJuIDA7XG5cbiAgICBsZXQgcG9pbnRlciA9IHRoaXMubGlzdC5oZWFkO1xuICAgIGxldCBjb3VudGVyID0gMTtcbiAgICB3aGlsZSAocG9pbnRlci5uZXh0KSB7XG4gICAgICBjb3VudGVyICs9IDE7XG4gICAgICBwb2ludGVyID0gcG9pbnRlci5uZXh0O1xuICAgIH1cbiAgICByZXR1cm4gY291bnRlcjtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIE5vZGUge1xuICBjb25zdHJ1Y3RvcihrZXkgPSBudWxsLCBuZXh0Tm9kZSA9IG51bGwpIHtcbiAgICB0aGlzLmtleSA9IGtleTtcbiAgICB0aGlzLm5leHQgPSBuZXh0Tm9kZTtcbiAgfVxufVxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCoge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIC8qIG91dGxpbmU6IDFweCBzb2xpZCByZWQ7ICovXG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsU0FBUztFQUNULFVBQVU7RUFDVixzQkFBc0I7RUFDdEIsNEJBQTRCO0FBQzlCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIioge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAvKiBvdXRsaW5lOiAxcHggc29saWQgcmVkOyAqL1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vc3R5bGVzLmNzcyc7XG5pbXBvcnQgJy4vaGFzaE1hcC9IYXNoTWFwJztcbmltcG9ydCAnLi9oYXNoU2V0L0hhc2hTZXQnO1xuIl0sIm5hbWVzIjpbIkxpbmtlZExpc3QiLCJIYXNoTWFwIiwidGFibGUiLCJpIiwicHVzaCIsImNhcGFjaXR5IiwibG9hZEZhY3RvciIsImluY3JlYXNlQ2FwYWNpdHkiLCJlbnRyaWVzIiwiY2xlYXIiLCJmb3JFYWNoIiwiZW50cnkiLCJrZXkiLCJ2YWx1ZSIsInNldCIsImhhc2giLCJoYXNoQ29kZSIsInByaW1lTnVtYmVyIiwibGVuZ3RoIiwiTWF0aCIsImZsb29yIiwiY2hhckNvZGVBdCIsIkVycm9yIiwiY3VyQnVja2V0IiwibmV3TGlzdCIsImFwcGVuZCIsImNvbnRhaW5zIiwibm9kZUluZGV4IiwiZmluZCIsInVwZGF0ZVZhbHVlIiwidG90YWxGaWxsZWRCdWNrZXRzIiwicmVkdWNlIiwidG90YWwiLCJjdXJWYWx1ZSIsImdldCIsImluZGV4IiwiYXQiLCJoYXMiLCJyZW1vdmUiLCJzaXplIiwicmVtb3ZlQXQiLCJ0b3RhbE5vZGVzIiwiYnVja2V0IiwiY2xlYXJlZFRhYmxlIiwibWFwIiwia2V5cyIsImZpbGxlZEJ1Y2tldHMiLCJmaWx0ZXIiLCJrZXlzQXJyIiwibGlzdCIsImN1ck5vZGVJbmRleCIsInZhbHVlcyIsInZhbHVlc0FyciIsImtleVZhbHVlc0FyciIsIm15SGFzaCIsImNvbnNvbGUiLCJsb2ciLCJOb2RlIiwiaGVhZCIsInRtcCIsIm5leHQiLCJwb2ludGVyIiwiY291bnRlciIsImN1ckluZGV4IiwicHJldlBvaW50ZXIiLCJjdXJQb2ludGVyIiwiY29uc3RydWN0b3IiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJuZXh0Tm9kZSIsImZpbGxlZEJ1Y2tldCJdLCJzb3VyY2VSb290IjoiIn0=