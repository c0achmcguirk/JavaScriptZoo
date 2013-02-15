/// <reference path="./jquery.d.ts"/>
var runMe = function () {
  // penguin is not defined yet.
  if (penguin !== null) {
    alert(("This is " + penguin.name + ", ") +
      (penguin.canFly ? "he can fly" : "he can't fly"));
  } else {
    alert("There is no penguin");
  }

  // define that lil' guy.
  var penguin: any = {
    name: "Pongo",
    canFly: false
  }

  // now we can describe him.
  if (penguin !== null) {
    alert(("This is " + penguin.name + ", ") +
      (penguin.canFly ? "he can fly" : "he can't fly"));
  } else {
    alert("There is no penguin");
  }

}

$(document).ready(function () {
  $('#btn-run-type').on('click', function () {
    runMe();
  });
});