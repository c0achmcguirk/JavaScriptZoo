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
var testMethod = function (val1, val2) {
    if (typeof val1 === "undefined") { val1 = "val1"; }
    if (typeof val2 === "undefined") { val2 = "val2"; }
    alert("" + val1 + " " + val2);
};
var runMe = function () {
    var horace = new Horse(4, "horse", "neigh!");
    var horace2 = new Horse(5, "horace", "blah");
    alert(horace.about());
    testMethod();
    testMethod(void 0, null);
};
$(document).ready(function () {
    $('#btn-run-type').on('click', function () {
        runMe();
    });
});
