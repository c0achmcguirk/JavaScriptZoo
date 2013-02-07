clean = (type = "ANIMAL", location = "CAGE", usingSoap = true) ->
  msg = "I am washing the #{ type }, in the #{ location }"

  if usingSoap
    msg += ", using soap."
  else
    msg += ", without soap."

  alert msg

runMe = ->
  clean("baboon", "pen", false)
  clean("elephant", null, true)
  clean()

$(document).ready ->
  $('#btn-run-coffee').on 'click', ->
    runMe()