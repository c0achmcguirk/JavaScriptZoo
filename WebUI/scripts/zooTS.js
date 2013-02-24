var runMe = function () {
    var animal = "Rhino";
    var numberOfLegs = 4;
    var rhino = {
        type: animal,
        numLegs: numberOfLegs
    };
    alert("The " + rhino.type + " has " + rhino.numLegs + " legs.");
};
this.wireUpEvents(runMe);
