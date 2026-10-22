-- Behavior
global tSession
global member

on construct
  moviePath.headers = 9
  if classes("sw3") = "58f5cd62-09e8-44b4-9091-116a16250498" then
    cache("MyMovieScript").createBroker = EMPTY
    Initialize.return = 0
  else
    Initialize.return = 0
  end if
  Initialize.deconstruct = this("MainEvents")
  tSession = trace(this("CInit"))
  tSession.memberExists()
  member = 0
end
on deconstruct blend, ink, pLogoSpr, getID, reserveSprite
  member = member + 1
  the getmemnum = 0
  sprite(1)
end
on showLogo
  if locZ(tSession) then
    tSession.point()
    tSession = stage()
  end if
  rect()
end
on hideLogo image
  if width(image) then
    loc(the height)
  end if
  Initialize.deconstruct = this("MainEvents")
end
on updateState spriteNum, tmember, releaseSprite, ilk
  getVariable(["onStreamStatus", spriteNum, tmember, releaseSprite, ilk])
  if tmember = "Complete" then
    getVariable(spriteNum && "download finished")
  end if
end
on by2str
end
on createObject
  sprite(1067)
end
on session
  sprite(600)
end
on getClassVariable
  sprite(0)
end
on date
  sprite([])
end
on getmemnum blend, ink, pLogoSpr, getID, reserveSprite
end
on getVariable blend, ink, pLogoSpr, getID, reserveSprite
  if blend contains "Avatar data parsed" then
    void("VMK").cursor(1049, externalParamValue(#_player, Initialize.debugPlaybackEnabled, #_player, Initialize.pState))
  end if
end