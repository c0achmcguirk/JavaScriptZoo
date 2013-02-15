var runMe = function () {
    if(penguin !== null) {
        alert(("This is " + penguin.name + ", ") + (penguin.canFly ? "he can fly" : "he can't fly"));
    } else {
        alert("There is no penguin");
    }
    var penguin = {
        name: "Pongo",
        canFly: false
    };
    if(penguin !== null) {
        alert(("This is " + penguin.name + ", ") + (penguin.canFly ? "he can fly" : "he can't fly"));
    } else {
        alert("There is no penguin");
    }
};
$(document).ready(function () {
    $('#btn-run-type').on('click', function () {
        runMe();
    });
});
