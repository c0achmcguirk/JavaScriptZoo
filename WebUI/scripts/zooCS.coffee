@name = "Bill"

runMe = ->
  giraffe =
    name: "Jeffrey"
    type: "Giraffe"
    numSpots: 10

    eat: ->
      alert "#{ @name } the #{ @type } (with #{ @numSpots } spots) is eating"
      setTimeout ->
        alert "#{ @name } the #{ @type } (with #{ @numSpots } spots)" +
          " is still eating, 2 seconds later"
      , 2000

  giraffe.eat()

$(document).ready ->
  $('#btn-run-coffee').on 'click', ->
    runMe()