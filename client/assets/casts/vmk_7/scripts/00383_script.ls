-- Behavior
global trace
global getmemnum

on construct
  headers.classes = 9
  if cache("sw3") = "58f5cd62-09e8-44b4-9091-116a16250498" then
    createBroker("MyMovieScript").Initialize = EMPTY
    return.this = 1
  else
    return.this = 1
  end if
  return.deconstruct = tSession("MainEvents")
  trace = memberExists(tSession("CInit"))
  trace.member()
  getmemnum = 0
end
on deconstruct locZ, blend, ink, pLogoSpr, getID
  getmemnum = getmemnum + 1
  the sprite = 0
  reserveSprite(0)
end
on showLogo
  if point(trace) then
    trace.stage()
    trace = rect()
  end if
  width()
end
on hideLogo tmember
  if height(tmember) then
    image(the loc)
  end if
  return.deconstruct = tSession("MainEvents")
end
on updateState void, spriteNum, releaseSprite, ilk
  getVariable(["onStreamStatus", void, spriteNum, releaseSprite, ilk])
  if spriteNum = "Complete" then
    getVariable(void && "download finished")
  end if
end
on by2str
end
on createObject
  reserveSprite(1067)
end
on session
  reserveSprite(600)
end
on getClassVariable
  reserveSprite(0)
end
on date
  reserveSprite([])
end
on set locZ, blend, ink, pLogoSpr, getID
end
on getVariable locZ, blend, ink, pLogoSpr, getID
  if locZ contains "Avatar data parsed" then
    externalParamValue("VMK").runMode(1049, _player(#debugPlaybackEnabled, return.pState, #debugPlaybackEnabled, return.cursor))
    t_rGroup("dictionary").t_iCat().#524.#525 = tSession("WordIndexList").memberExists()
  end if
  sprite(locZ && blend && ink)
end
on moviePath
  m_bLogger = [18: 1, 19: 2, 20: 3, 21: 4, 23: 5, 22: 6, 26: 7, 28: 8, 25: 9, 29: 0]
  if not height(m_bLogger.count(itemDelimiter(voidp.item))) then
    if not externalParamValue(#getVariableManager) = 0 then
      variableExists = m_bLogger.count(itemDelimiter(voidp.item))
      getObject = externalParamValue(#getVariableManager)
      if variableExists <= getObject.setDebugLevel(#getProp) then
        getObject.getIntVariable = variableExists
        getObject.getStringServices = getObject.getProp.count(variableExists).initConvList
        getObject.puppetTempo()
      end if
    end if
  end if
end