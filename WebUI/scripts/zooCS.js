(function() {
  var runMe;

  runMe = function() {
    /*
      See Douglas Crockford's take on hoisting and scope:
      http://www.jslint.com/lint.html#scope
    */

    var a;
    alert(a);
    a = 1;
    alert(a);
    a = 2;
    return alert(a);
  };

  this.wireUpEvents(runMe);

}).call(this);
