-- Movie Script
property pSpeed
property pAngle
property pImg
property vx
property vy
property pOrigin
property pTranslation
property pScale
property pMaxSpeed
property pWait
property pSprite

on construct me
  pSprite = 0
  return 1
end
on deconstruct me
end
on Init me, iType
  case iType of
    1:
      pSpeed = random(10) + 10
      pImg = member("viuh_faded").image.duplicate()
    otherwise:
      pSpeed = random(6) + 6
      pImg = member("viuh").image.duplicate()

  end case
  pMaxSpeed = pSpeed
  pAngle = 28 * PI / 180.0
  me.reset()
  me.setSpeed(0)
end
on setSprite me, iSprite
  pSprite = iSprite
end
on setSpeed me, iSpeed
  pSpeed = iSpeed * pMaxSpeed
  vx = pSpeed * cos(pAngle)
  vy = pSpeed * sin(pAngle)
end
on accelerate me, iDirection
  pSpeed = pSpeed + 0.5 * iDirection
end
on update me
  pWait = pWait - 1
  if pWait < 0 then
    pTranslation = pTranslation + point(vx, vy)
    if pTranslation.locH > 800 and pTranslation.locV > 600 then
      me.reset()
    end if
  end if
end
on reset me
  pWait = random(60)
  pTranslation = point(-pImg.rect.width, -pImg.rect.height)
  case random(2) of
    1:
      pOrigin = point(random(450) + 350, 0)
    2:
      pOrigin = point(0, random(250) + 350)

  end case
end
on render me, g
  if pWait < 0 then
    if pSprite <> 0 then
      pSprite.loc = pOrigin + pTranslation
    end if
  end if
end