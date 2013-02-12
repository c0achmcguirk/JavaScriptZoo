(function() {
  var Animal, Horse, Snake, runMe,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Animal = (function() {

    function Animal(name) {
      this.name = name;
    }

    Animal.prototype.move = function(meters) {
      return alert("" + this.name + " moved " + meters + " meters.");
    };

    return Animal;

  })();

  Horse = (function(_super) {

    __extends(Horse, _super);

    function Horse() {
      return Horse.__super__.constructor.apply(this, arguments);
    }

    Horse.prototype.move = function() {
      alert("Galloping...");
      return Horse.__super__.move.call(this, 45);
    };

    return Horse;

  })(Animal);

  Snake = (function(_super) {

    __extends(Snake, _super);

    function Snake() {
      return Snake.__super__.constructor.apply(this, arguments);
    }

    Snake.prototype.move = function() {
      alert("Slithering...");
      return Snake.__super__.move.call(this, 5);
    };

    return Snake;

  })(Animal);

  runMe = function() {
    var harry, sammy;
    harry = new Horse("Harry the Horse");
    harry.move();
    sammy = new Snake("Sammy the Snake");
    return sammy.move();
  };

  $(document).ready(function() {
    return $('#btn-run-coffee').on('click', function() {
      return runMe();
    });
  });

}).call(this);
