runMe = ->
  animal = "Rhino"
  numberOfLegs = 4
  rhino =
    type: animal
    numLegs: numberOfLegs

  if rhino.numLegs == 4
    alert("Has 4")
  else
    alert("Not 4")

  alert "Not correct" unless rhino.numLegs == 4

@wireUpEvents(runMe)
