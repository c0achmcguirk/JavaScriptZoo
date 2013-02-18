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

  $(document).ready(function() {
    return $('#btn-run-coffee').on('click', function() {
      return runMe();
    });
  });

}).call(this);
