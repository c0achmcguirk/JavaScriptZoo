interface Gorilla {
  name: string;
}

var runMe = function () {
  var gorilla1 : Gorilla = {
    name: "Gwen"
  };

  var gorilla2: Gorilla = {
    name: "Gus"
  };

  var gorilla3 : Gorilla = {
    name: "Gary"
  };

  var gorilla4 : Gorilla = {
    name: "Gillian"
  };

  feeding(gorilla1, gorilla2, gorilla3, gorilla4);
}

var feeding = function (gorilla1: Gorilla,
  gorilla2: Gorilla,
  ...others: Gorilla[])
{
  alert(gorilla1.name + " gets most of the food.");
  alert(gorilla2.name + " gets the rest of the food.");
  for (var i = 0; i < others.length; i++) {
    alert(others[i].name + " didn't get any food.");
  }
}

this.wireUpEvents(runMe);