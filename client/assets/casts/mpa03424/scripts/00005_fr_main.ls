-- Behavior
global gMain

on exitFrame
  gMain.frameEvent()
  go(the frame)
end