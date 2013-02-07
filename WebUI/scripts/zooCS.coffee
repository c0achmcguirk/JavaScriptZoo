feed = (animal) ->
  alert "Just fed #{ animal.food } to #{ animal.name } the #{ animal.type }."

runMe = ->
  animal1 =
    name: "Ziggy"
    type: "Zebra"
    food: "leaves"
  
  animal2 = 
    name: "Leo"
    type: "Lion"
    food: "steak" 

  feed(animal1)
  feed(animal2)

$(document).ready ->
  $('#btn-run-coffee').on 'click', ->
    runMe()