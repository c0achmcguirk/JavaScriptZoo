class Horse
  constructor: (@name, @numLegs, @age, @hasHorseshoes) ->

class Duck
  constructor: (@name, @numLegs, @age) ->

class Snake
  constructor: (@name, @age) ->

runMe = ->
  horace = new Horse("Horace", 4, 8, true)
  donald = new Duck("Donald", 2, 1)
  sammy = new Snake("Sammy", 2)

  # will work
  getDescription(horace)
  getDescription(donald)
  getDescription(sammy)

  getDescription2(horace)
  # will not work
  getDescription2(donald)
  getDescription2(sammy)


getDescription = (animal) ->
  alert "#{ animal.name } is #{ animal.age } years old."

getDescription2 = (animal) ->
  alert "#{ animal.name } is #{ animal.age } years old and " +
    "has #{ animal.numLegs } legs. Horseshoes? #{ animal.hasHorseshoes }."

$(document).ready ->
  $('#btn-run-coffee').on 'click', ->
    runMe()