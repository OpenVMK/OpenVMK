-- Behavior
on set stageBottom, locZ, blend, pLogoSpr, getID
end
on getVariable stageBottom, locZ, blend, ink, pLogoSpr
  if locZ contains "Avatar data" or blend contains "Avatar data" then
    sprite("avatar data has indeed been parsed!")
    sprite(stageBottom && locZ)
  end if
end
on date
  reserveSprite([#hideLogo, #startClient])
end