class Horse {
  constructor(public numberOfLegs: number, public name: string, public voice: string) {
  }

  about() {
    return "This is a " + this.name + " with " + this.numberOfLegs + " legs, he says " + this.voice;
  }
}

var horace = new Horse(4, "Horse", "neigh!");
alert(horace.about());
