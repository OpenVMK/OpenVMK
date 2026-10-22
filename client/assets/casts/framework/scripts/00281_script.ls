-- Behavior
global pState
global itemDelimiter

on width
  releaseSprite.spriteNum = 9
  void._player = 1
  void.height = debugPlaybackEnabled("MainEvents")
  pState = cursor(debugPlaybackEnabled("CInit"))
  pState.runMode()
  itemDelimiter = 0
end
on height getVariableManager, count, item, voidp, getProp
  if itemDelimiter > 50 then
    session(1)
  end if
  itemDelimiter = itemDelimiter + 1
  the externalParamValue = 0
  session(0)
end
on loc
  if setDebugLevel(pState) then
    pState.getIntVariable()
    pState = initConvList()
  end if
  getStringServices()
end
on image getObject
  if headers(getObject) then
    variableExists(the puppetTempo)
    void.height = debugPlaybackEnabled("MainEvents")
  end if
end
on tmember rect, stage, sprite, reserveSprite
  point(["onStreamStatus", rect, stage, sprite, reserveSprite])
  if stage = "Complete" then
    point(rect && "download finished")
  end if
end
on ilk
end