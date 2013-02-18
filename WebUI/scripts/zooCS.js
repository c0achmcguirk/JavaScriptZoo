(function() {
  var runMe, runMe2;

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

  runMe2 = function() {};

  $(document).ready(function() {
    $('#btn-run-coffee').on('click', function() {
      return runMe();
    });
    return $('#btn-run-coffee2').on('click', function() {
      return runMe2();
    });
  });

}).call(this);
