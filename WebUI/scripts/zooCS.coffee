runMe = ->
  animals = [
      name: "bill"
      type: "horse"
    , 
      name: "prasad"
      type: "eagle"
    ,
      name: "jill"
      type: "antelope"
  ]

  describe(animals)

describe = (animals) ->
  for animal in animals
    alert "This is #{ animal.name }, which is a #{ animal.type }"
  return
  
@wireUpEvents(runMe)