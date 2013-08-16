var runMe = function () {
    var gorilla1 = {
        name: "Gwen"
    };
    var gorilla2 = {
        name: "Gus"
    };
    var gorilla3 = {
        name: "Gary"
    };
    var gorilla4 = {
        name: "Gillian"
    };
    feeding(gorilla1, gorilla2, gorilla3, gorilla4);
};
var feeding = function (gorilla1, gorilla2) {
    var others = [];
    for (var _i = 0; _i < (arguments.length - 2); _i++) {
        others[_i] = arguments[_i + 2];
    }
    alert(gorilla1.name + " gets most of the food.");
    alert(gorilla2.name + " gets the rest of the food.");
    for(var i = 0; i < others.length; i++) {
        alert(others[i].name + " didn't get any food.");
    }
};
this.wireUpEvents(runMe);
