var feed = function (animal) {
    alert("Just fed " + animal.food + " to " + animal.name + " the " + animal.type + ".");
};
var runMe = function () {
    var animal1 = {
        name: "Ziggy",
        type: "Zebra",
        food: "leaves"
    };
    var animal2 = {
        name: "Leo",
        type: "Lion",
        food: "steak"
    };
    feed(animal1);
    feed(animal2);
};
$(document).ready(function () {
    $('#btn-run-type').on('click', function () {
        runMe();
    });
});
