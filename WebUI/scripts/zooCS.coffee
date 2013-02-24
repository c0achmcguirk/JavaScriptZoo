runMe = ->
  animals = ["giraffe", "lion", "horse", "sloth"]
  animalText = ""

  # put them all in there
  for animal in animals
    animalText += "Putting #{ animal } into the cage.\r"

  alert "Caged ALL:\r\r#{ animalText }"

  # wait, we won't allow lions in there!
  animalText = ""
  for animal in animals when animal isnt "lion"
  #for animal in animals when animal.length < 5 
    animalText += "Putting #{ animal } into the cage.\r"

  alert "Caged Some:\r\r#{ animalText }"

runMe2 = ->
  # countup
  age = ""
  for x in [1..35]
    age += "#{x}.."
    
  alert "How the elephant has aged: #{ age }" 

  # weird countdown
  numberOfPeacocks = ""
  for i in [97..14] by -3
    numberOfPeacocks += "#{i}.."
  
  alert "Number of peacocks:\r\r#{ numberOfPeacocks }"

@wireUpEvents(runMe, runMe2)