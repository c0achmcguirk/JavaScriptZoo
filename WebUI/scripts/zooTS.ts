/// <reference path="./jquery.d.ts"/>
class Animal {
  constructor(public name: string) { }

  move(meters: number) {
    alert(this.name + " moved " + meters + " meters.");
  }
}

class Horse extends Animal {
  constructor(name: string) {
    super(name);
  }

  move() {
    alert("Galloping...");
    super.move(45);
  }
}

class Snake extends Animal {
  constructor(name: string) {
    super(name);
  }

  move() {
    alert("Slithering...");
    super.move(5);
  }
}

var runMe = function () {
  var harry = new Horse("Harry the Horse");
  harry.move();

  var sammy = new Snake("Sammy the Snake");
  sammy.move();
}

this.wireUpEvents(runMe);
