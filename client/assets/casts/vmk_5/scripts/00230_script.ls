-- Behavior
on set puppetTempo, blend, ink, getID, reserveSprite
end
on getVariable puppetTempo, blend, ink, pLogoSpr, getID
  if blend contains "Avatar data" or ink contains "Avatar data" then
    getmemnum("avatar data has indeed been parsed!")
  end if
end
on date
  sprite([#hideLogo, #m_iLoadID])
end