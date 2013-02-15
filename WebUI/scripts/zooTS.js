var Horse = (function () {
    function Horse(name, age, numLegs, hasHorseShoes) {
        this.name = name;
        this.age = age;
        this.numLegs = numLegs;
        this.hasHorseShoes = hasHorseShoes;
    }
    return Horse;
})();
var Duck = (function () {
    function Duck(name, age, numLegs) {
        this.name = name;
        this.age = age;
        this.numLegs = numLegs;
    }
    return Duck;
})();
var Snake = (function () {
    function Snake(name, age) {
        this.name = name;
        this.age = age;
    }
    return Snake;
})();
var runMe = function () {
    var horace = new Horse("Horace", 4, 8, true);
    var donald = new Duck("Donald", 2, 1);
    var sammy = new Snake("Sammy", 2);
    getDescription(horace);
    getDescription(donald);
    getDescription(sammy);
    getDescription2(horace);
};
function getDescription(animal) {
    alert(animal.name + " is " + animal.age + " years old.");
}
function getDescription2(animal) {
    alert(animal.name + " is " + animal.age + " years old and " + "has " + animal.numLegs + " legs. Horseshoes? " + animal.hasHorseShoes + ".");
}
$(document).ready(function () {
    $('#btn-run-type').on('click', function () {
        runMe();
    });
});
