class Horse
  constructor: (@numberOfLegs, @name, @voice) ->
    @fullName = "the #{ @name } is my full name"

  about: ->
    "Hi, I'm a #{ @name } with #{ @numberOfLegs } legs and I say #{ @voice }"

runMe = ->
  horace = new Horse(4, "horse", "neigh!")
  alert(horace.about())

$(document).ready ->
  $('#btn-run-coffee').on 'click', ->
    runMe()

# splats
# interpolations
# fat arrow, contexts
# == vs. ===
# loops  for name in names
# interpolations