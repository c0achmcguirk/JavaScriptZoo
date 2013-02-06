var Horse = (function () {
    function Horse(numberOfLegs, name, voice) {
        this.numberOfLegs = numberOfLegs;
        this.name = name;
        this.voice = voice;
        this.fullName = name + " is my name";
    }
    Horse.prototype.about = function () {
        return "This is a " + this.name + " with " + this.numberOfLegs + " legs, he says " + this.voice;
    };
    return Horse;
})();
var runMe = function () {
    var horace = new Horse(4, "horse", "neigh!");
    alert(horace.about());
};
$(document).ready(function () {
    $('#btn-run-type').on('click', function () {
        runMe();
    });
});
