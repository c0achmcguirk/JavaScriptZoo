(function() {
  var runMe;

  runMe = function() {
    var beast, penguin, scaryThing, _ref, _ref1;
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
      alert(("This is " + penguin.name + ", ") + (penguin.canFly ? "he can fly" : "he can't fly"));
    } else {
      alert("There is no penguin.");
    }
    beast = typeof yeti !== "undefined" && yeti !== null ? yeti : "bear";
    alert("You just saw a " + beast);
    scaryThing = {
      looksLike: "UNSURE"
    };
    alert(("Ooh!, that looks like a " + scaryThing.looksLike + ", ") + ("it's covered with " + scaryThing.coveredWith));
    if ((_ref = scaryThing.coveredWith) == null) {
      scaryThing.coveredWith = "hair";
    }
    if ((_ref1 = scaryThing.looksLike) == null) {
      scaryThing.looksLike = "sasquatch";
    }
    alert(("On closer inspection, it looks like a " + scaryThing.looksLike + ", ") + ("it's covered with " + scaryThing.coveredWith));
    scaryThing.coveredWith = "nylon fake hair";
    scaryThing.looksLike = "guy in a gorilla suit";
    return alert(("I've verified that it's a " + scaryThing.looksLike + ", ") + ("it's covered with " + scaryThing.coveredWith));
  };

  $(document).ready(function() {
    return $('#btn-run-coffee').on('click', function() {
      return runMe();
    });
  });

}).call(this);
