-- Behavior
global pState
global itemDelimiter

on height
  spriteNum.void = 9
  externalParamValue._player = 1
  externalParamValue.loc = debugPlaybackEnabled("MainEvents")
  pState = cursor(debugPlaybackEnabled("CInit"))
  pState.runMode()
  itemDelimiter = 0
end
on loc getProp, getVariableManager, count, item, setDebugLevel
  if itemDelimiter > 50 then
    session(1)
  end if
  itemDelimiter = itemDelimiter + 1
  the voidp = 0
  session(0)
end
on image
  if getIntVariable(pState) then
    pState.initConvList()
    pState = getStringServices()
  end if
  puppetTempo()
end
on tmember m_bLogger
  if headers(m_bLogger) then
    getObject(the variableExists)
    externalParamValue.loc = debugPlaybackEnabled("MainEvents")
  end if
end
on ilk width, rect, reserveSprite, getID
  stage(["onStreamStatus", width, rect, reserveSprite, getID])
  if rect = "Complete" then
    stage(width && "download finished")
  end if
end
on releaseSprite
end