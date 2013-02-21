var runMe = function () {
    if(penguin !== null && typeof penguin !== "undefined") {
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
var runMe2 = function () {
    var scaryThing = {
        looksLike: "UNSURE"
    };
    if((scaryThing.looksLike) == null) {
        scaryThing.looksLike = "sasquatch";
    }
};
this.wireUpEvents(runMe, runMe2);
