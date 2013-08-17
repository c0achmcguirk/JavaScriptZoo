this.name = "Bill";

var runMe = function () {
    var giraffe = {
        name: "Jeffrey",
        type: "Giraffe",
        numSpots: 10,
        eat: function () {
            var _this = this;
            alert(this.name + " the " + this.type + " (with " + this.numSpots + " spots) is eating.");
            setTimeout(function () {
                alert(_this.name + " the " + _this.type + " (with " + _this.numSpots + " spots) is still eating, 2 seconds later.");
            }, 2000);
        }
    };

    giraffe.eat();
};

this.wireUpEvents(runMe);
