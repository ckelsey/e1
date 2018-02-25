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
/******/ 	return __webpack_require__(__webpack_require__.s = 85);
/******/ })
/************************************************************************/
/******/ ({

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_service__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_service___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__app_service__);


/***/ }),

/***/ 86:
/***/ (function(module, exports) {

// import E1 from "./../src/e1.js"
// var E1 = window.E1
// class AppService{
// 	constructor(){
// 		console.log("APPSERVICE CONSTRUCT")
// 	}
// 	init(){
// 		// E1.services.ConstantsService.get().then(function(){
// 		// 	window.swgf.UserService.init()
// 		// 	if(window.location.href.indexOf("/user") > -1){
// 		// 		window.E1.setModel(null, "@swgf.GalleryService.models.hideFilter", true)
// 		// 		window.swgf.GalleryService.init()
// 		// 		window.swgf.UserService.getUser()
// 		// 		return
// 		// 	}
// 		// 	if(window.location.href.indexOf("/products") > -1){
// 		// 		window.swgf.ImageService.init()
// 		// 		return
// 		// 	}
// 		// 	window.E1.setModel(null, "@swgf.GalleryService.models.hideFilter", false)
// 		// 	window.swgf.GalleryService.init()
// 		// 	window.swgf.GalleryService.requestImages()
// 		// })
// 	}
// }
// E1.registerService("AppService", new AppService())
// (function () {
// 	if (!window.swgf) { window.swgf = {} }
// 	window.swgf.AppService = {
// 		init: function(){
// 			window.swgf.ConstantsService.get().then(function(){
// 				window.swgf.UserService.init()
// 				if(window.location.href.indexOf("/user") > -1){
// 					window.E1.setModel(null, "@swgf.GalleryService.models.hideFilter", true)
// 					window.swgf.GalleryService.init()
// 					window.swgf.UserService.getUser()
// 					return
// 				}
// 				if(window.location.href.indexOf("/products") > -1){
// 					window.swgf.ImageService.init()
// 					return
// 				}
// 				window.E1.setModel(null, "@swgf.GalleryService.models.hideFilter", false)
// 				window.swgf.GalleryService.init()
// 				window.swgf.GalleryService.requestImages()
// 			})
// 		}
// 	}
// })();
// $(document).ready(function () {
//     window.swgf.AppService.init()
// });

/***/ })

/******/ });