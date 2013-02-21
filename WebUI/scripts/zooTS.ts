/// <reference path="./jquery.d.ts"/>
var clean = function (type: string = "ANIMAL",
  location: string = "LOCATION",
  usingSoap: bool = true) {
  var msg = "I am washing the " + type + ", in the " + location;
  if (usingSoap)
    msg += ", using soap.";
  else
    msg += ", without soap.";
  alert(msg);
}

var runMe = function () {
  clean("baboon", "pen", false);
  clean("elephant", null, true);
  clean();
}

this.wireUpEvents(runMe);
