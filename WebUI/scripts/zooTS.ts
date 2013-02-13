/// <reference path="./jquery.d.ts"/>
var runMe = function () {
  complexMethod(null, null, null, null, "arg5", null, null);

  var aminals = 4;
  if (animals > 0) {
    alert("You have some animals");
  } else {
    alert("No animals for you!");
  }
}

var complexMethod = function (arg1: number, arg2: number,
  arg3: number, arg4: number,
  arg5: string, arg6: number,
  arg7: bool) {
  alert("You called the complex method, arg5 = " + arg5);
}

$(document).ready(function () {
  $('#btn-run-type').on('click', function () {
    runMe();
  });
});