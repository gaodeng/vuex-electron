"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;var _deepmerge=_interopRequireDefault(require("deepmerge")),_electronStore=_interopRequireDefault(require("electron-store")),_electron=_interopRequireDefault(require("electron")),_lodash=_interopRequireDefault(require("lodash"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}function _createClass(a,b,c){return b&&_defineProperties(a.prototype,b),c&&_defineProperties(a,c),a}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}var STORAGE_NAME="vuex",STORAGE_KEY="state",STORAGE_TEST_KEY="test",PersistedState=function(){function a(b,c){var d=this;_classCallCheck(this,a),_defineProperty(this,"setState",_lodash["default"].debounce(function(a){d.options.storage.set(d.options.storageKey,a)},1e3)),this.options=b,this.store=c}return _createClass(a,[{key:"loadOptions",value:function loadOptions(){this.options.storage||(this.options.storage=this.createStorage()),this.options.storageKey||(this.options.storageKey=STORAGE_KEY),this.whitelist=this.loadFilter(this.options.whitelist,"whitelist"),this.blacklist=this.loadFilter(this.options.blacklist,"blacklist")}},{key:"createStorage",value:function createStorage(){return new _electronStore["default"]({name:this.options.storageName||STORAGE_NAME})}},{key:"getState",value:function getState(){return this.options.storage.get(this.options.storageKey)}},{key:"loadFilter",value:function loadFilter(a,b){if(!a)return null;if(a instanceof Array)return this.filterInArray(a);if("function"==typeof a)return a;throw new Error("[Vuex Electron] Filter \"".concat(b,"\" should be Array or Function. Please, read the docs.")+JSON.stringify(error))}},{key:"filterInArray",value:function filterInArray(a){return function(b){return a.includes(b.type)}}},{key:"checkStorage",value:function checkStorage(){try{this.options.storage.set(STORAGE_TEST_KEY,STORAGE_TEST_KEY),this.options.storage.get(STORAGE_TEST_KEY),this.options.storage["delete"](STORAGE_TEST_KEY)}catch(a){throw new Error("[Vuex Electron] Storage is not valid. Please, read the docs."+JSON.stringify(a))}}},{key:"combineMerge",value:function combineMerge(a,b,c){var d=function(a){return Array.isArray(a)?[]:{}},f=function(a,b){return(0,_deepmerge["default"])(d(a),a,b)},g=a.slice();return b.forEach(function(b,d){if("undefined"==typeof g[d]){var e=!1!==c.clone,h=e&&c.isMergeableObject(b);g[d]=h?f(b,c):b}else c.isMergeableObject(b)?g[d]=(0,_deepmerge["default"])(a[d],b,c):-1===a.indexOf(b)&&g.push(b)}),g}},{key:"loadInitialState",value:function loadInitialState(){var a=this.getState(this.options.storage,this.options.storageKey);if(a){var b=(0,_deepmerge["default"])(this.store.state,a,{arrayMerge:this.combineMerge});this.store.replaceState(b)}}},{key:"subscribeOnChanges",value:function subscribeOnChanges(){var a=this;this.store.subscribe(function(b,c){a.blacklist&&a.blacklist(b)||a.whitelist&&!a.whitelist(b)||a.setState(c)})}}]),a}(),_default=function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:{};return function(b){var c=new PersistedState(a,b);c.loadOptions(),c.checkStorage(),c.loadInitialState(),_electron["default"].remote||c.subscribeOnChanges()}};exports["default"]=_default,module.exports=exports["default"];