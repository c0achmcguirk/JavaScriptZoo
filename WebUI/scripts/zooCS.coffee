class Horse
  constructor: (@numberOfLegs, @name, @voice) ->

  about: ->
    "This is a #{ @name } with #{ @numberOfLegs } legs, he says #{ @voice }"

horace = new Horse(4, "horsee", "neigh!")
alert(horace.about())