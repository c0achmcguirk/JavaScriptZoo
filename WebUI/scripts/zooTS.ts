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

this.wireUpEvents(runMe);