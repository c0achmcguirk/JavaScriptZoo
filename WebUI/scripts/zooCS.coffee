runMe = ->
  # not defined yet
  if penguin?
    alert("This is #{ penguin.name }, " + 
      if penguin.canFly then "he can fly" else "he can't fly")
  else
    alert("There is no penguin.")
  
  # defined
  penguin =
    name: "Pongo"
    canFly: false

  # now we can describe the penguin
  if penguin?
    alert("This is #{ penguin.name }, " + 
      if penguin.canFly then "he can fly" else "he can't fly")
  else
    alert("There is no penguin.")

$(document).ready ->
  $('#btn-run-coffee').on 'click', ->
    runMe()