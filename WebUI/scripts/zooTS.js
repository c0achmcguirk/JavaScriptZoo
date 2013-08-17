var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="./jquery.d.ts"/>
var Type;
(function (Type) {
    Type[Type["Herbivore"] = 0] = "Herbivore";
    Type[Type["Carnivore"] = 1] = "Carnivore";
    Type[Type["Omnivore"] = 2] = "Omnivore";
})(Type || (Type = {}));

var Animal = (function () {
    function Animal(name, type) {
        this.name = name;
        this.type = type;
        this.hasBeenFedToday = false;
    }
    Animal.prototype.feed = function () {
        this.hasBeenFedToday = true;
        var food = "";
        switch (this.type) {
            case Type.Carnivore:
                food = "meat";
                break;
            case Type.Herbivore:
                food = "veggies";
                break;
            case Type.Omnivore:
                food = "meat and veggies";
                break;
        }

        alert(this.name + " is now eating some " + food);
    };
    return Animal;
})();

var Tiger = (function (_super) {
    __extends(Tiger, _super);
    function Tiger(name) {
        _super.call(this, name, Type.Carnivore);
        this.name = name;
    }
    return Tiger;
})(Animal);

var Cage = (function () {
    function Cage() {
        this.animals = [];
    }
    Cage.prototype.Add = function (animal) {
        this.animals.push(animal);
    };

    Cage.prototype.GetFirst = function () {
        return this.animals[0];
    };

    Cage.prototype.GetAll = function () {
        return this.animals;
    };
    return Cage;
})();

var runMe = function () {
    var cage = new Cage();
    cage.Add(new Tiger("Tony"));
    cage.Add(new Tiger("Tigra"));

    var firstAnimal = cage.GetFirst();
    alert("The first animal in the cage is " + firstAnimal.name);
    firstAnimal.feed();
};

$(document).ready(function () {
    $('#btn-run').on('click', function () {
        return runMe();
    });
});
