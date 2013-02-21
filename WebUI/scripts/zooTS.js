var clean = function (type, location, usingSoap) {
    if (typeof type === "undefined") { type = "ANIMAL"; }
    if (typeof location === "undefined") { location = "LOCATION"; }
    if (typeof usingSoap === "undefined") { usingSoap = true; }
    var msg = "I am washing the " + type + ", in the " + location;
    if(usingSoap) {
        msg += ", using soap.";
    } else {
        msg += ", without soap.";
    }
    alert(msg);
};
var runMe = function () {
    clean("baboon", "pen", false);
    clean("elephant", null, true);
    clean();
};
this.wireUpEvents(runMe);
