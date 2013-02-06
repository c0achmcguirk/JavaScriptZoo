var runMe = function () {
    var animal = "Rhino";
    var numberOfLegs = 4;
    alert("The " + animal + " has " + numberOfLegs + " legs.");
};
$(document).ready(function () {
    $('#btn-run-type').on('click', function () {
        runMe();
    });
});
