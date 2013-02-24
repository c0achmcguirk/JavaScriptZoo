runMe = ->
  animal =
      type: "monkey"
 numLegs: 4
  
    if animal.type == "monkey" 
  alert("The " + animal.type + " has " + animal.numLegs + " legs.")
  else
    alert("This is no monkey, what are you trying to pull?")

@wireUpEvents(runMe)
