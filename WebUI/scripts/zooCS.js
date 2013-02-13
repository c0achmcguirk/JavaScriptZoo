(function() {
  var complexMethod, runMe;

  runMe = function() {
    var aminals;
    complexMethod(null, null, null, null, null, "arg5", null, null);
    aminals = 4;
    if (animals > 0) {
      return alert("You have some animals");
    } else {
      return alert("No animals for you!");
    }
  };

  complexMethod = function(arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    return alert("You called the complex method, arg5 = " + arg5);
  };

  $(document).ready(function() {
    return $('#btn-run-coffee').on('click', function() {
      return runMe();
    });
  });

}).call(this);
