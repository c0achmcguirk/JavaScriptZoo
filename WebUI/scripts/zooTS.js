var runMe = function () {
    var animals;
    var animals = [
        {
            name: "harry",
            type: "horse"
        }, 
        {
            name: "edgar",
            type: "eagle"
        }, 
        {
            name: "alice",
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
this.wireUpEvents(runMe);
