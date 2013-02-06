runMe = ->
  animal = "Rhino"
  numberOfLegs = 4
  alert("The " + animal + " has " + numberOfLegs + " legs.")

$(document).ready ->
  $('#btn-run-coffee').on 'click', ->
    runMe()