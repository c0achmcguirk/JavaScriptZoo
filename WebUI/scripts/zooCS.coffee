runMe = ->
  # now we can describe him.
  if penguin?
    alert("This is #{ penguin.name }, " + 
      if penguin.canFly then "he can fly" else "he can't fly")
  else
    alert("There is no penguin.")
  
  # define that lil' guy.
  penguin =
    name: "Pongo"
    canFly: false

  # now we can describe him.
  if penguin?
    alert("This is #{ penguin.name }, " + 
      if penguin.canFly then "he can fly" else "he can't fly")
  else
    alert("There is no penguin.")

  # what did I just see?
  beast = yeti ? "bear" # yeti is undefined, so it will accept bear
  alert "You just saw a #{ beast }"

  # assign it if it is null
  scaryThing = 
    looksLike : "UNSURE"

  alert "Ooh!, that looks like a #{ scaryThing.looksLike }, " +
    "it's covered with #{ scaryThing.coveredWith }"

  scaryThing.coveredWith ?= "hair"     # will assign
  scaryThing.looksLike ?= "sasquatch"  # won't assign

  alert "On closer inspection, it looks like a #{ scaryThing.looksLike }, " +
    "it's covered with #{ scaryThing.coveredWith }"

  scaryThing.coveredWith = "nylon fake hair"
  scaryThing.looksLike = "guy in a gorilla suit"

  alert "I've verified that it's a #{ scaryThing.looksLike }, " +
    "it's covered with #{ scaryThing.coveredWith }"


$(document).ready ->
  $('#btn-run-coffee').on 'click', ->
    runMe()