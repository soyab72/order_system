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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var fetchData = function fetchData(query, dataURL, contentType) {
  return $.ajax({
    data: query,
    dataType: contentType,
    url: dataURL,
    type: "POST",
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    beforeSend: function beforeSend() {
      $("#loading").show();
    },
    complete: function complete() {
      $("#loading").hide();
    }
  });
};

$(document).on("click", "#generate-grid", function () {
  var row = $('#row-number').val();
  var column = $('#column-number').val();
  $('#row-validate').text("");
  $('#column-validate').text("");

  if ($.isNumeric(row) && $.isNumeric(column)) {
    var generateGrid = fetchData({
      'column': column,
      'row': row
    }, '/generate-grid', 'html');
    $.when(generateGrid).then(function (gridHtml) {
      $('#order-grid').html(gridHtml);
    });
  } else {
    if (!$.isNumeric(row)) {
      $('#row-validate').text("Please enter valid row number.");
    }

    if (!$.isNumeric(column)) {
      $('#column-validate').text("Please enter valid column number.");
    }
  }
});
$(document).on("click", ".open-menu-modal", function () {
  //$("#menu-form-modal").modal('show');
  var index = $(this).data('index');
  $('#index').val(index);
  var row_number = $(this).data('rowval');
  var column_number = $(this).data('columnval');
  $('#current_row').val(row_number);
  $('#current_column').val(column_number);
});
$(document).on("click", "#make-order", function () {
  var item_name = $('#item-name').val().trim();
  var price = $('#price').val();
  var index = $('#index').val();
  var row_number = $('#current_row').val();
  var column_number = $('#current_column').val();
  $('#price-validate').text("");
  $('#item-validate').text("");

  if (item_name != '' && $.isNumeric(price)) {
    var makeOrder = fetchData({
      'price': price,
      'index': index,
      'item_name': item_name,
      'column': column_number,
      'row': row_number
    }, '/make-order', 'json');
    $.when(makeOrder).then(function (orderData) {
      $('#generate-grid').trigger('click');
      $('#menu-form-modal').modal('hide');
    });
  } else {
    if (!$.isNumeric(price)) {
      $('#price-validate').text("Please enter valid price.");
    }

    if (item_name == '') {
      $('#item-validate').text("Please enter item name.");
    }
  }
});
$('#menu-form-modal').on('hidden.bs.modal', function () {
  $('#index').val('');
  $('#item-name').val('');
  $('#price').val('');
});

/***/ }),

/***/ 0:
/*!***********************************!*\
  !*** multi ./resources/js/app.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /var/www/html/order_system/resources/js/app.js */"./resources/js/app.js");


/***/ })

/******/ });