(function() {

  this.wireUpEvents = function(function1, function2) {
    return $(document).ready(function() {
      $('#btn-run').on('click', function() {
        return function1();
      });
      if (function2 != null) {
        return $('#btn-run2').on('click', function() {
          return function2();
        });
      }
    });
  };

}).call(this);
