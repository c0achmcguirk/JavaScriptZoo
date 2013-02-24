(function() {
  var feeding, runMe,
    __slice = [].slice;

  runMe = function() {
    var gorilla1, gorilla2, gorilla3, gorilla4;
    gorilla1 = {
      name: "Gwen"
    };
    gorilla2 = {
      name: "Gus"
    };
    gorilla3 = {
      name: "Gary"
    };
    gorilla4 = {
      name: "Gillian"
    };
    return feeding(gorilla1, gorilla2, gorilla3, gorilla4);
  };

  feeding = function() {
    var firstGorilla, g, others, secondGorilla, _i, _len;
    firstGorilla = arguments[0], secondGorilla = arguments[1], others = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
    alert(firstGorilla.name + " gets most of the food.");
    alert(secondGorilla.name + " gets the rest of the food.");
    for (_i = 0, _len = others.length; _i < _len; _i++) {
      g = others[_i];
      alert(g.name + " didn't get anything.");
    }
  };

  this.wireUpEvents(runMe);

}).call(this);
