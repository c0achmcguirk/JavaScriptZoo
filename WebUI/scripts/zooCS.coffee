runMe = ->
  ###
  See Douglas Crockford's take on hoisting and scope:
  http://www.jslint.com/lint.html#scope
  ###
  alert a
  a = 1
  alert a
  a = 2
  alert a

runMe2 = ->
  

$(document).ready ->
  $('#btn-run-coffee').on 'click', ->
    runMe()
  $('#btn-run-coffee2').on 'click', ->
    runMe2()