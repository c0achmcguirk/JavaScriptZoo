var runMe = function () {
    var animals = [
        {
            name: "bill",
            type: "horse"
        }, 
        {
            name: "prasad",
            type: "eagle"
        }, 
        {
            name: "jill",
            type: "antelope"
        }
    ];
    describe(animals);
};
var describe = function (animals) {
    for(var i = 0; i < animals.length; i++) {
        alert("This is " + animals[i].name + ", which " + "is a " + animals[i].type);
    }
};
$(document).ready(function () {
    $('#btn-run-type').on('click', function () {
        runMe();
    });
});
