var runMe = function () {
    var monkey = {
        numLegs: 4,
        type: "monkey"
    };
    alert("The " + monkey.type + " has " + monkey.numLegs + " legs");
};
$(document).ready(function () {
    $('#btn-run-type').on('click', function () {
        runMe();
    });
});
