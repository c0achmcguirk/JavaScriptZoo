runMe = ->
  animal =
    type: "monkey"
    numLegs: 4
    other: -> "other"

  # animal = {}
  animal.type = 5
  animal.numLegs = "4"
  animal.numLegs = null
  animal.other = -> "other2"
  
  if animal.type == "monkey" 
    alert "The #{animal.type} has #{animal.numLegs} legs. #{ animal.other() }"
  else
    alert "This is no monkey, what are you trying to pull?"

@wireUpEvents(runMe)
