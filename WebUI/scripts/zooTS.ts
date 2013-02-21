/// <reference path="./jquery.d.ts"/>
var runMe = function () {
  // penguin is not defined yet.
  if (penguin !== null && typeof penguin !== "undefined") {
    alert(("This is " + penguin.name + ", ") +
      (penguin.canFly ? "he can fly" : "he can't fly"));
  } else {
    alert("There is no penguin");
  }

  // define that lil' guy.
  var penguin: any = {
    name: "Pongo",
    canFly: false
  }

  // now we can describe him.
  if (penguin !== null) {
    alert(("This is " + penguin.name + ", ") +
      (penguin.canFly ? "he can fly" : "he can't fly"));
  } else {
    alert("There is no penguin");
  }
}

var runMe2 = function() {
  // This doesn't work because TypeScript won't allow
  // us to use an undefined yeti variable.
  /*
  var beast = typeof yeti !== "undefined" && yeti !== null ? yeti : "bear";
  alert("You just saw a " +beast);
  */

  var scaryThing = {
    looksLike: "UNSURE"
  };


  // this doesn't work because TypeScript won't allow
  // us to use an undefined member of scaryThing: coveredWith
  /*
  alert(("Ooh!, that looks like a " + scaryThing.looksLike + ", ") +
    ("it's covered with " + scaryThing.coveredWith));
  if ((scaryThing.coveredWith) == null) {
    scaryThing.coveredWith = "hair";
  }
  */

  // TypeScript allows this...because looksLike is defined above.
  if ((scaryThing.looksLike) == null) {
    scaryThing.looksLike = "sasquatch";
  }

  // This won't work because TypeScript doesn't like the undefined
  // coveredWith
  /*
  alert("On closer inspection, it looks like a " +
    scaryThing.looksLike + ", " +
    "it's covered with " + scaryThing.coveredWith);
  scaryThing.coveredWith = "nylon fake hair";
  scaryThing.looksLike = "guy in a gorilla suit";
  return alert("I've verified that it's a " + scaryThing.looksLike + ", "
     + "it's covered with " + scaryThing.coveredWith;
  */
};

this.wireUpEvents(runMe, runMe2);