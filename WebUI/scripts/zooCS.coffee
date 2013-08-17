# Easy/quick enum
class Type
  [Herbivore, Carnivore, Omnivore] = [0..2]

class Animal
  constructor: (@name, @type) ->
    @hasBeenFedToday = false

  feed: ->
    @hasBeenFedToday = true
    food = ""
    switch @type
      when Type.Carnivore then food = "meat"
      when Type.Herbivore then food = "veggies"
      when Type.Omnivore then food = "meat and veggies"
    alert "#{ @name } is now eating some #{ food }"

class Tiger extends Animal
  constructor: (@name) ->
    super(@name, Type.Carnivore)

class Cage
  constructor: ->
    @animals = []

  add: (animal) ->
    @animals.push(animal)

  getFirst: ->
    @animals[0]

  getAll: ->
    @animals

runMe = ->
  cage = new Cage()
  cage.add new Tiger("Tony")
  cage.add new Tiger("Tigra")

  firstAnimal = cage.getFirst()
  alert "The first animal in the cage is #{ firstAnimal.name }"
  firstAnimal.feed()

$(document).ready ->
  $('#btn-run').on 'click', ->
    runMe()
