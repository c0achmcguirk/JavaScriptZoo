class Horse
  constructor: (@numberOfLegs, @name, @voice) ->
    @fullName = "the #{ @name } is my full name"

  about: ->
    "Hi, I'm a #{ @name } with #{ @numberOfLegs } legs and I say #{ @voice }"


testMethod = (val1 = "one", val2 = "two") ->
  alert "#{val1} #{val2}"

runMe = ->
  horace = new Horse(4, "horse", "neigh!")
  alert(horace.about())
  testMethod(null, null);

$(document).ready ->
  $('#btn-run-coffee').on 'click', ->
    runMe()