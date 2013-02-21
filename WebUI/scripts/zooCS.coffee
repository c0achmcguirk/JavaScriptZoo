runMe = ->
  animal = "Rhino"
  numberOfLegs = 4
  rhino =
    type: animal
    numLegs: numberOfLegs
  alert("The " + rhino.type + " has " + rhino.numLegs + " legs.")

@wireUpEvents(runMe)