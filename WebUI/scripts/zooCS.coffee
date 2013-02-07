runMe = ->
  monkey =
      type: "monkey"
numLegs: 4

  alert("The " + monkey.type + " has " + monkey.numLegs + " legs.")

$(document).ready ->
  $('#btn-run-coffee').on 'click', ->
    runMe()