runMe = ->
  complexMethod(null, null, null, null, null, "arg5", null, null)

  aminals = 4
  if animals > 0
    alert "You have some animals"
  else
    alert "No animals for you!"
  
complexMethod = (arg1, arg2, arg3, arg4, arg5, arg6, arg7) ->
  alert "You called the complex method, arg5 = #{ arg5 }"

@wireUpEvents(runMe)