-- Behavior
on PiratesKeyDown
  getThread("piratesminigame").getInterface().keyDown(the keyCode)
  pass()
end
on PiratesMouseDown
  getThread("piratesminigame").getInterface().mouseDown(the mouseLoc)
  pass()
end