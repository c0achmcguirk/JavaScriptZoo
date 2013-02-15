(function() {
  var runMe;

  runMe = function() {
    var penguin;
    if (typeof penguin !== "undefined" && penguin !== null) {
      alert(("This is " + penguin.name + ", ") + (penguin.canFly ? "he can fly" : "he can't fly"));
    } else {
      alert("There is no penguin.");
    }
    penguin = {
      name: "Pongo",
      canFly: false
    };
    if (penguin != null) {
      return alert(("This is " + penguin.name + ", ") + (penguin.canFly ? "he can fly" : "he can't fly"));
    } else {
      return alert("There is no penguin.");
    }
  };

  $(document).ready(function() {
    return $('#btn-run-coffee').on('click', function() {
      return runMe();
    });
  });

}).call(this);
