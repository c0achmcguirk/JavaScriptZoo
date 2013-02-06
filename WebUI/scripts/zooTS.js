var runMe = function () {
    var animal = "Rhino";
    var numberOfLegs = 4;
    var rhino = {
        type: animal,
        numLegs: numberOfLegs
    };
    if(rhino.numLegs === 4) {
        alert("Has 4");
    } else {
        alert("Not 4");
    }
    if(rhino.numLegs != 4) {
        alert("Not correct");
    }
};
$(document).ready(function () {
    $('#btn-run-type').on('click', function () {
        runMe();
    });
});
