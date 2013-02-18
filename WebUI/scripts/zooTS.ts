/// <reference path="./jquery.d.ts"/>
/*
 * See Douglas Crockford's take on hoisting and scope:
 * http://www.jslint.com/lint.html#scope
 */
var runMe = function () {
  alert(a + "");
  var a = 1;
  alert(a + "");
  a = 2;
  alert(a + "");
};

var runMe2 = function () {
}

$(document).ready(function () {
  $('#btn-run-type').on('click', function () {
    runMe();
  });
  $('#btn-run-type2').on('click', function () {
    runMe2();
  });
});