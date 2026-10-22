-- Script
property pSprite
property pEventList

on construct this
  pEventList = [:]
  pSprite = sprite(reserveSprite(this.getID()))
  pSprite.member = member(getmemnum("null"))
  pSprite.rect = rect(-90, -90, -80, -80)
  pSprite.locZ = 20000000
  pSprite.blend = 0
  getSpriteManager().setEventBroker(pSprite.spriteNum, this.getID())
  return 1
end
on deconstruct this
  removePrepare(this.getID())
  getSpriteManager().releaseSprite(pSprite.spriteNum)
  return 1
end
on registerEvent this, tObj, tEvent, tMethod
  pEventList[tEvent] = [tObj, tMethod]
  pSprite.registerProcedure(#eventProcDefault, this.getID(), tEvent)
  pSprite.visible = 1
  return receivePrepare(this.getID())
end
on unregisterEvent this, tEvent
  pEventList.deleteProp(tEvent)
  if pEventList.count = 0 then
    removePrepare(this.getID())
    pSprite.visible = 0
    pSprite.rect = rect(-90, -90, -80, -80)
  end if
  return 1
end
on prepare this
  pSprite.loc = the mouseLoc - [5, 5]
end
on eventProcDefault this, tEvent, tSprID, tParam
  tTarget = pEventList[tEvent]
  if voidp(tTarget) then
    return pSprite.removeProcedure(tEvent)
  end if
  return call(tTarget[2], tTarget[1])
end
on null this
end