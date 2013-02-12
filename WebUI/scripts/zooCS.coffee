class Animal
  constructor: (@name) ->

  move: (meters) ->
    alert "#{ @name } moved #{ meters } meters."

class Horse extends Animal
  move: ->
    alert "Galloping..."
    super(45)

class Snake extends Animal
  move: ->
    alert "Slithering..."
    super(5)

runMe = ->
  harry = new Horse("Harry the Horse")
  harry.move()

  sammy = new Snake("Sammy the Snake")
  sammy.move()
  
$(document).ready ->
  $('#btn-run-coffee').on 'click', ->
    runMe()