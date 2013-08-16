runMe = ->
  animals = [
      name: "harry"
      type: "horse"
    , 
      name: "edgar"
      type: "eagle"
    ,
      name: "alice"
      type: "antelope"
  ]

  describe(animals)

describe = (animals) ->
  for animal in animals
    alert "This is #{ animal.name }, which is a #{ animal.type }"
  return
  
@wireUpEvents(runMe)