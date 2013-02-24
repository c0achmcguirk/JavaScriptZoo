runMe = ->
  gorilla1 =
    name: "Gwen"

  gorilla2 = 
    name: "Gus"

  gorilla3 =
    name: "Gary"

  gorilla4 =
    name: "Gillian"

  feeding(gorilla1, gorilla2, gorilla3, gorilla4)

feeding = (firstGorilla, secondGorilla, others...) ->
  alert(firstGorilla.name + " gets most of the food.")
  alert(secondGorilla.name + " gets the rest of the food.")
  for g in others
    alert(g.name + " didn't get anything.")
  return

@wireUpEvents(runMe)
