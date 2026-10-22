-- Script
property pTitle
property pLayout
property pLocX
property pLocY
property pLocZ
property pwidth
property pheight
property pVisible
property pSpriteList
property pSpriteData
property pActSprList
property pDragFlag
property pDragOffset
property pBoundary
property pElementGroups
property pEnterLeaveStack

on construct me
  pTitle = me.getID()
  pLayout = []
  pLocX = 0
  pLocY = 0
  pLocZ = 0
  pwidth = 0
  pheight = 0
  pVisible = 1
  pSpriteList = []
  pSpriteData = []
  pActSprList = [:]
  pDragFlag = 0
  pDragOffset = [0, 0]
  pBoundary = rect(0, 0, (the stage).rect.width, (the stage).rect.height) + [-1000, -1000, 1000, 1000]
  pElementGroups = [:]
  pEnterLeaveStack = [:]
  receiveUpdate(me.getID())
  return 1
end
on deconstruct me
  removeUpdate(me.getID())
  tSprMgr = getSpriteManager()
  repeat with i = 1 to pElementGroups.count
    repeat with tstate in pElementGroups[i][#states]
      repeat with tElement in tstate
        tElement.sprite.removeProcedure()
        removeEventBroker(tElement.sprite.spriteNum)
      end repeat
    end repeat
  end repeat
  repeat with i = 1 to pSpriteList.count
    releaseSprite(pSpriteList[i].spriteNum)
  end repeat
  pSpriteList = []
  pSpriteData = []
  pActSprList = [:]
  pBoundary = []
  return 1
end
on Define me, tProps
  if voidp(tProps) then
    return 0
  end if
  if not voidp(tProps[#locX]) then
    pLocX = tProps[#locX]
  end if
  if not voidp(tProps[#locY]) then
    pLocY = tProps[#locY]
  end if
  if not voidp(tProps[#locZ]) then
    pLocZ = tProps[#locZ]
  end if
  if not voidp(tProps[#layout]) then
    pLayout = tProps[#layout]
  end if
  if not voidp(tProps[#boundary]) then
    pBoundary = tProps[#boundary]
  end if
  return me.open(pLayout)
end
on open me, tLayout
  if voidp(tLayout) then
    tLayout = pLayout
  end if
  pLayout = tLayout
  if pSpriteList.count > 0 then
    repeat with i = 1 to pSpriteList.count
      releaseSprite(pSpriteList[i].spriteNum)
    end repeat
    pSpriteList = []
  end if
  return me.buildVisual(pLayout)
end
on close me
  return me.Remove(the getID of me)
end
on moveTo me, tX, tY
  me.moveBy(tX - pLocX, tY - pLocY)
end
on moveBy me, tOffX, tOffY
  if pLocX + tOffX < pBoundary[1] then
    tOffX = pBoundary[1] - pLocX
  end if
  if pLocY + tOffY < pBoundary[2] then
    tOffY = pBoundary[2] - pLocY
  end if
  if pLocX + pwidth + tOffX > pBoundary[3] then
    tOffX = pBoundary[3] - pLocX - pwidth
  end if
  if pLocY + pheight + tOffY > pBoundary[4] then
    tOffY = pBoundary[4] - pLocY - pheight
  end if
  pLocX = pLocX + tOffX
  pLocY = pLocY + tOffY
  me.moveXY(tOffX, tOffY)
end
on moveZ me, tZ
  if not integerp(tZ) then
    return error(me, "Integer expected:" && tZ, #moveZ)
  end if
  repeat with i = 1 to pSpriteList.count
    pSpriteList[i].locZ = tZ + i - 1
  end repeat
  pLocZ = tZ
end
on getSprite me, tID
  return pActSprList[tID]
end
on getSprById me, tID
  return pActSprList[tID]
end
on getSpriteByID me, tID
  return pActSprList[tID]
end
on spriteExists me, tID
  return not voidp(pActSprList[tID])
end
on moveSprBy me, tID, tX, tY
  tSprite = pActSprList[tID]
  if voidp(tSprite) then
    return error(me, "Sprite not found:" && tID, #moveSprBy)
  end if
  tSprite.loc = tSprite.loc + [tX, tY]
  return me.Refresh()
end
on moveSprTo me, tID, tX, tY
  tSprite = pActSprList[tID]
  if voidp(tSprite) then
    return error(me, "Sprite not found:" && tID, #moveSprTo)
  end if
  tSprite.loc = point(tX, tY)
  return me.Refresh()
end
on setActive me
  return 1
end
on setDeactive me
  return 1
end
on hide me
  if pVisible = 1 then
    pVisible = 0
    me.moveX(10000)
    return 1
  end if
  return 0
end
on show me
  if pVisible = 0 then
    pVisible = 1
    me.moveX(-10000)
    return 1
  end if
  return 0
end
on drag me, tBoolean
  if tBoolean = 1 and pDragFlag = 0 then
    pDragOffset = the mouseLoc - [pLocX, pLocY]
    pDragFlag = 1
  else
    if tBoolean = 0 and pDragFlag = 1 then
      pDragFlag = 0
    end if
  end if
  return 1
end
on getProperty me, tProp
  case tProp of
    #layout:
      return pLayout
    #locX:
      return pLocX
    #locY:
      return pLocY
    #locZ:
      return pLocZ
    #boundary:
      return pBoundary
    #width:
      return pwidth
    #height:
      return pheight
    #sprCount:
      return the count of pSpriteList
    #spriteList:
      return pSpriteList
    #spriteData:
      return pSpriteData
    #visible:
      return pVisible
    #title:
      return pTitle
    #id:
      return me.getID()

  end case
  return 0
end
on setProperty me, tProp, tvalue
  case tProp of
    #layout:
      return me.open(tvalue)
    #locX:
      return me.moveX(tvalue)
    #locY:
      return me.moveY(tvalue)
    #locZ:
      return me.moveZ(tvalue)
    #boundary:
      pBoundary = tvalue
      return 1
    #visible:
      if tvalue then
        return me.show()
      else
        return me.hide()
      end if
    #title:
      pTitle = tvalue
      return 1

  end case
  return 0
end
on moveX me, tOffX
  repeat with i = 1 to pSpriteList.count
    pSpriteList[i].locH = pSpriteList[i].locH + tOffX
  end repeat
end
on moveY me, tOffY
  repeat with i = 1 to pSpriteList.count
    pSpriteList[i].locV = pSpriteList[i].locV + tOffY
  end repeat
end
on moveXY me, tOffX, tOffY
  repeat with i = 1 to pSpriteList.count
    pSpriteList[i].loc = pSpriteList[i].loc + [tOffX, tOffY]
  end repeat
end
on update me
  if pDragFlag then
    me.moveTo(the mouseH - pDragOffset[1], the mouseV - pDragOffset[2])
  end if
  tProcessedGroups = [:]
  if pEnterLeaveStack.count > 0 then
    repeat with i = 1 to pEnterLeaveStack.count
      tEvent = pEnterLeaveStack.getPropAt(i)
      tGroup = pEnterLeaveStack[i]
      if voidp(tProcessedGroups.getaProp(tGroup)) then
        tProcessedGroups.setaProp(tGroup, [])
      end if
      tProcessedGroups[tGroup].add(tEvent)
    end repeat
    repeat with g = 1 to tProcessedGroups.count
      tGroup = tProcessedGroups.getPropAt(g)
      if tProcessedGroups[tGroup].getPos(#mouseUp) <> 0 then
        me.setElementGroupState(tGroup, 1)
        next repeat
      end if
      if tProcessedGroups[tGroup].getPos(#mouseDown) <> 0 then
        me.setElementGroupState(tGroup, 2)
        next repeat
      end if
      if tProcessedGroups[tGroup].getPos(#mouseWithin) <> 0 then
        me.setElementGroupState(tGroup, 1)
        next repeat
      end if
      me.setElementGroupState(tGroup, 0)
    end repeat
    pEnterLeaveStack = [:]
  end if
  repeat with g = 1 to pElementGroups.count
    tGroup = pElementGroups.getPropAt(g)
    if voidp(tProcessedGroups.getaProp(tGroup)) then
      me.setElementGroupState(tGroup, 0)
    end if
  end repeat
end
on Refresh me
  tRect = rect(100000, 100000, -100000, -100000)
  repeat with tSpr in pSpriteList
    if tSpr.locH < tRect[1] then
      tRect[1] = tSpr.locH
    end if
    if tSpr.locV < tRect[2] then
      tRect[2] = tSpr.locV
    end if
    if tSpr.locH + tSpr.width > tRect[3] then
      tRect[3] = tSpr.locH + tSpr.width
    end if
    if tSpr.locV + tSpr.height > tRect[4] then
      tRect[4] = tSpr.locV + tSpr.height
    end if
  end repeat
  pLocX = tRect[1]
  pLocY = tRect[2]
  pwidth = tRect.width
  pheight = tRect.height
  if pSpriteData.count > 0 then
    repeat with i = 1 to pSpriteList.count
      pSpriteData[i][#loc] = pSpriteList[i].loc - [tRect[1], tRect[2]]
    end repeat
  end if
  return 1
end
on buildVisual me, tLayout
  tResMgr = getResourceManager()
  tSprMgr = getSpriteManager()
  tLayout = getObjectManager().get(#layout_parser_xml).parse(tLayout)
  if not listp(tLayout) then
    return error(me, "Invalid visualizer definition:" && tLayout, #buildVisual)
  end if
  if not voidp(tLayout[#rect]) then
    if tLayout[#rect].count > 0 then
      pLocX = pLocX + tLayout[#rect][1][1]
      pLocY = pLocY + tLayout[#rect][1][2]
    end if
  end if
  tLayout = tLayout[#elements]
  repeat with i = 1 to tLayout.count
    tMemNum = tResMgr.getmemnum(tLayout[i][#member])
    if tMemNum < 1 then
      error(me, "Member" && tLayout[i][#member] && "required by visualizer:" && me.getID() && "not found!", #buildVisual)
      pSpriteData[i] = [:]
      next repeat
    end if
    tElem = tLayout[i]
    tSpr = sprite(tSprMgr.reserveSprite(me.getID()))
    tSpr.castNum = tMemNum
    tSpr.ink = tElem[#ink]
    tSpr.locH = tElem[#locH] + pLocX
    tSpr.locV = tElem[#locV] + pLocY
    tSpr.width = tElem[#width]
    tSpr.height = tElem[#height]
    tSpr.blend = tElem[#blend]
    tSpr.rotation = tElem[#rotation]
    tSpr.skew = tElem[#skew]
    tSpr.flipH = tElem[#flipH]
    tSpr.flipV = tElem[#flipV]
    tSpr.color = rgb(tElem[#color])
    tSpr.bgColor = rgb(tElem[#bgColor])
    if tElem[#media] = #text or tElem[#media] = #field then
      tTxtMem = member(tMemNum)
      if not voidp(tElem[#txtColor]) then
        tTxtMem.color = rgb(tElem[#txtColor])
      end if
      if not voidp(tElem[#txtBgColor]) then
        tTxtMem.bgColor = rgb(tElem[#txtBgColor])
      end if
      if tTxtMem.font <> tElem[#font] then
        tTxtMem.font = tElem[#font]
      end if
      if tTxtMem.fontSize <> tElem[#fontSize] then
        tTxtMem.fontSize = tElem[#fontSize]
      end if
      if tTxtMem.fontStyle <> tElem[#fontStyle] then
        tTxtMem.fontStyle = tElem[#fontStyle]
      end if
      if tElem[#media] = #text then
        if tTxtMem.fixedLineSpace <> tElem[#fixedLineSpace] then
          tTxtMem.fixedLineSpace = tElem[#fixedLineSpace]
        end if
      else
        if tElem[#media] = #field then
          if tTxtMem.lineHeight <> tElem[#lineHeight] then
            tTxtMem.lineHeight = tElem[#lineHeight]
          end if
        end if
      end if
    end if
    if voidp(tElem[#locZ]) then
      tSpr.locZ = pLocZ + i - 1
    else
      tSpr.locZ = integer(tElem[#locZ]) + pLocZ
    end if
    if not voidp(tElem[#id]) then
      if tElem[#Active] = 1 or voidp(tElem[#Active]) and voidp(tElem[#type]) then
        tSprMgr.setEventBroker(tSpr.spriteNum, tElem[#id])
        if not voidp(tElem[#cursor]) then
          tSpr.setcursor(tElem[#cursor])
        end if
        if not voidp(tElem[#link]) then
          tSpr.setLink(tElem[#link])
        end if
      end if
      pActSprList[tLayout[i][#id]] = tSpr
    end if
    pSpriteData[i] = [:]
    pSpriteList.append(tSpr)
    if not voidp(tElem.getaProp(#ElementGroup)) then
      t_sGroup = tElem.getaProp(#ElementGroup)
      if voidp(pElementGroups.getaProp(t_sGroup)) then
        pElementGroups.setaProp(t_sGroup, [#state: 0, #states: [:]])
      end if
      tstate = value(tElem.getaProp(#state))
      if voidp(pElementGroups[t_sGroup].getaProp(tstate)) then
        pElementGroups[t_sGroup][#states].setaProp(tstate, [])
      end if
      pElementGroups[t_sGroup][#states].getaProp(tstate).add([#sprite: tSpr, #element: tElem])
      if tstate <> 0 then
        tSpr.visible = 0
      end if
      tSprMgr.setEventBroker(tSpr.spriteNum, t_sGroup)
      tSpr.registerProcedure(#eventProcElementGroup, me.getID(), #mouseWithin)
      tSpr.registerProcedure(#eventProcElementGroup, me.getID(), #mouseDown)
      tSpr.registerProcedure(#eventProcElementGroup, me.getID(), #mouseUp)
    end if
  end repeat
  return me.Refresh()
end
on eventProcElementGroup this, tEvent, tID, tParam
  pEnterLeaveStack.addProp(tEvent, tID)
end
on setElementGroupState this, a_sID, a_iState
  if pElementGroups[a_sID][#state] <> a_iState then
    tStates = pElementGroups[a_sID][#states]
    repeat with t = 1 to tStates.count
      tstate = tStates.getPropAt(t)
      tList = tStates[t]
      if tstate = a_iState then
        repeat with tElement in tList
          tElement.sprite.visible = 1
        end repeat
        next repeat
      end if
      if tstate <> 0 then
        repeat with tElement in tList
          tElement.sprite.visible = 0
        end repeat
      end if
    end repeat
    pElementGroups[a_sID][#state] = a_iState
  end if
end