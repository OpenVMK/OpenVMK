-- Script
property pTotalSprList
property pFreeSprList
property pClientList
property pEventBroker

on construct me
  pTotalSprList = VOID
  pFreeSprList = VOID
  pClientList = VOID
  pEventBroker = script(getVariable("event.broker.class"))
  return me.preIndexChannels()
end
on deconstruct me
  return 1
end
on getProperty me, tPropID
  case tPropID of
    #totalSprCount:
      return the count of pTotalSprList
    #freeSprCount:
      return the count of pFreeSprList

  end case
  return 0
end
on setProperty me, tPropID, tvalue
  -- ERROR: Could not identify jmp
  return 0
end
on reserveSprite me, tClientID
  if pFreeSprList.count = 0 then
    return error(me, "Out of free sprite channels!", #reserveSprite)
  end if
  tSprNum = pFreeSprList[1]
  tSprite = sprite(tSprNum)
  pFreeSprList.deleteAt(1)
  tSprite.puppet = 1
  me.resetSpriteProps(tSprNum)
  tSprite.locZ = tSprNum
  tSprite.locV = -1000
  tSprite.visible = 1
  pClientList[tSprNum] = tClientID
  return tSprNum
end
on releaseSprite me, tSprNum
  if pTotalSprList.getPos(tSprNum) < 1 then
    return error(me, "Sprite not marked as usable:" && tSprNum, #releaseSprite)
  end if
  if pFreeSprList.getPos(tSprNum) > 0 then
    return error(me, "Attempting to release free sprite!" && tSprNum, #releaseSprite)
  end if
  tSprite = sprite(tSprNum)
  me.resetSpriteProps(tSprNum)
  tSprite.puppet = 0
  pFreeSprList.append(tSprNum)
  pClientList[tSprNum] = 0
  return 1
end
on resetSpriteProps me, a_iSpriteNum
  tSprite = sprite(a_iSpriteNum)
  tSprite.visible = 0
  tSprite.ink = 0
  tSprite.castNum = 0
  tSprite.color = rgb(0, 0, 0)
  tSprite.foreColor = 255
  tSprite.backColor = 0
  tSprite.type = 0
  tSprite.loc = point(0, 0)
  tSprite.locZ = tSprite.spriteNum
  tSprite.top = 0
  tSprite.left = 0
  tSprite.bottom = 0
  tSprite.right = 0
  tSprite.blend = 100
  tSprite.rotation = 0
  tSprite.skew = 0
  tSprite.stretch = 0
  tSprite.flipH = 0
  tSprite.flipV = 0
  tSprite.cursor = 0
  tSprite.constraint = 0
  tSprite.width = 0
  tSprite.height = 0
  tSprite.rect = rect(0, 0, 0, 0)
  tSprite.quad = [point(0, 0), point(0, 0), point(0, 0), point(0, 0)]
  tSprite.moveableSprite = 0
  tSprite.scriptInstanceList = []
  tSprite.member = VOID
end
on releaseAllSprites me
  pFreeSprList = []
  repeat with tSprNum in pTotalSprList.count
    me.releaseSprite(tSprNum)
  end repeat
  return 1
end
on setEventBroker me, tSprNum, tID
  if pTotalSprList.getPos(tSprNum) < 1 then
    return error(me, "Sprite not marked as usable:" && tSprNum, #setEventBroker)
  end if
  if pFreeSprList.getPos(tSprNum) > 0 then
    return error(me, "Attempted to modify non-reserved sprite!", #setEventBroker)
  end if
  tSprite = sprite(tSprNum)
  tSprite.scriptInstanceList = [new(pEventBroker)]
  tSprite.setID(tID)
  return 1
end
on removeEventBroker me, tSprNum
  if pTotalSprList.getPos(tSprNum) < 1 then
    return error(me, "Sprite not marked as usable:" && tSprNum, #removeEventBroker)
  end if
  if pFreeSprList.getPos(tSprNum) > 0 then
    return error(me, "Attempted to modify non reserved sprite!", #removeEventBroker)
  end if
  sprite(tSprNum).scriptInstanceList = []
  return 1
end
on print me, tCount
  if integerp(tCount) then
    if tCount > the lastChannel then
      tCount = the lastChannel
    end if
    repeat with i = 1 to tCount
      put sprite(i).spriteNum && "--" && sprite(i).member.name && "--" && sprite(i).locZ && "--" && sprite(i).rect && "--" && pClientList[sprite(i).spriteNum]
    end repeat
  else
    repeat with tNum in pTotalSprList
      if pFreeSprList.getPos(tNum) < 1 then
        tSymbol = "#"
      else
        tSymbol = SPACE
      end if
      put tSymbol & tNum && sprite(tNum).member.name && "--" && sprite(tNum).locZ && "--" && sprite(tNum).rect && "--" && pClientList[tNum] && "--" && sprite(tNum).puppet && "--" && sprite(tNum).type && "--" && sprite(tNum).member.number
    end repeat
  end if
end
on unregisterMembers me, a_iCastNum
  repeat with tNum in pTotalSprList
    if pFreeSprList.getPos(tNum) < 1 then
      t_rMem = sprite(tNum).member
      if t_rMem.castLibNum = a_iCastNum then
        error(me, "Un-linking member attached to sprite" && [sprite(tNum), t_rMem.name], #unregisterMembers)
        if member("null").number > 0 then
          sprite(tNum).member = member("null")
        end if
      end if
    end if
  end repeat
end
on preIndexChannels me
  pTotalSprList = []
  pFreeSprList = []
  pClientList = []
  repeat with i = 1 to the lastChannel
    pTotalSprList.add(i)
    pClientList.add(0)
    puppetSprite(i, 1)
    me.resetSpriteProps(i)
  end repeat
  pFreeSprList = pTotalSprList.duplicate()
  pTotalSprList.sort()
  return 1
end