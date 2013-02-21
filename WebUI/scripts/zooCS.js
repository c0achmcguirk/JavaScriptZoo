(function() {
  var clean, runMe;

  clean = function(type, location, usingSoap) {
    var msg;
    if (type == null) {
      type = "ANIMAL";
    }
    if (location == null) {
      location = "CAGE";
    }
    if (usingSoap == null) {
      usingSoap = true;
    }
    msg = "I am washing the " + type + ", in the " + location;
    if (usingSoap) {
      msg += ", using soap.";
    } else {
      msg += ", without soap.";
    }
    return alert(msg);
  };

  runMe = function() {
    clean("baboon", "pen", false);
    clean("elephant", null, true);
    return clean();
  };

  this.wireUpEvents(runMe);

}).call(this);
