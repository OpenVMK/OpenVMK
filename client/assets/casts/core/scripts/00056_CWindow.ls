-- Script
property pTitle
property pClientID
property pProcedures
property pLock
property pLocX
property pLocY
property pLocZ
property pwidth
property pheight
property pModal
property pActive
property pVisible
property pDragFlag
property pDragOffset
property pBoundary
property pScaleFlagH
property pScaleFlagV
property pScaleOffset
property pElemList
property pMemberList
property pGroupData
property pSpriteList
property pSpecialIDList
property pClientRect
property pElemClsList
property pWindowMngr

on construct this
  pTitle = this.getID()
  pLocX = 0
  pLocY = 0
  pLocZ = 0
  pwidth = 0
  pheight = 0
  pVisible = 1
  pActive = 0
  pLock = 0
  pModal = 0
  pSpriteList = [:]
  pScaleFlagH = 0
  pScaleFlagV = 0
  pDragFlag = 0
  pDragOffset = [0, 0]
  pBoundary = rect(0, 0, (the stage).rect.width, (the stage).rect.height) + [-20, -20, 20, 20]
  pClientID = VOID
  pMemberList = [:]
  pElemList = [:]
  pGroupData = []
  pClientRect = [0, 0, 0, 0]
  pSpecialIDList = ["drag", "close", "scale", "scaleh", "scalev"]
  pProcedures = this.createProcListTemplate()
  return 1
end
on deconstruct this
  removeUpdate(this.getID())
  removePrepare(this.getID())
  repeat with i = 1 to pSpriteList.count
    tSprNum = pSpriteList[i].spriteNum
    releaseSprite(tSprNum)
  end repeat
  call(#deconstruct, pElemList)
  repeat with i = 1 to pMemberList.count
    removeMember(pMemberList[i].name)
  end repeat
  pElemList = [:]
  pSpriteList = [:]
  pMemberList = [:]
  pGroupData = []
  pClientID = EMPTY
  pWindowMngr = VOID
  return 1
end
on Define this, tProps
  pLocX = tProps[#locX]
  pLocY = tProps[#locY]
  pLocZ = tProps[#locZ]
  pBoundary = tProps[#boundary]
  pElemClsList = tProps[#elements]
  pWindowMngr = tProps[#manager]
  return 1
end
on close this
  return removeWindow(this.getID())
end
on merge this, tLayout
  this.setDeactive()
  if not this.buildVisual(tLayout) then
    return 0
  end if
  pSpecialIDList.add("drag" & pGroupData.count)
  pSpecialIDList.add("close" & pGroupData.count)
  pWindowMngr.Activate(this.getID())
  return 1
end
on unmerge this
  if pGroupData.count = 0 then
    return error(this, "Cant't unmerge window without content!", #unmerge)
  end if
  tGroupData = pGroupData.getLast()
  call(#deconstruct, tGroupData[#items])
  pClientRect = pClientRect - tGroupData[#border]
  repeat with tItem in tGroupData[#items]
    pElemList.deleteProp(pElemList.getOne(tItem))
  end repeat
  repeat with tSprite in tGroupData[#sprites]
    pSpriteList.deleteProp(pSpriteList.getOne(tSprite))
    releaseSprite(tSprite.spriteNum)
  end repeat
  repeat with tmember in tGroupData[#members]
    pMemberList.deleteProp(pMemberList.getOne(tmember))
    removeMember(tmember.name)
  end repeat
  pSpecialIDList.deleteOne("drag" & pGroupData.count)
  pSpecialIDList.deleteOne("drag" & pGroupData.count)
  pGroupData.deleteAt(pGroupData.count)
  return 1
end
on lock this, a_bBool
  if voidp(a_bBool) then
    a_bBool = 1
  end if
  pLock = a_bBool
  return 1
end
on hide this
  if pVisible = 1 then
    pVisible = 0
    this.moveX(10000)
    return 1
  end if
  return 0
end
on show this
  if pVisible = 0 then
    pVisible = 1
    this.moveX(-10000)
    return 1
  end if
  return 0
end
on moveTo this, a_iX, a_iY
  this.moveBy(a_iX - pLocX, a_iY - pLocY)
end
on moveBy this, a_iOffX, a_iOffY
  if pLocX + a_iOffX < pBoundary[1] then
    a_iOffX = pBoundary[1] - pLocX
  end if
  if pLocY + a_iOffY < pBoundary[2] then
    a_iOffY = pBoundary[2] - pLocY
  end if
  if pLocX + pwidth + a_iOffX > pBoundary[3] then
    a_iOffX = pBoundary[3] - pLocX - pwidth
  end if
  if pLocY + pheight + a_iOffY > pBoundary[4] then
    a_iOffY = pBoundary[4] - pLocY - pheight
  end if
  pLocX = pLocX + a_iOffX
  pLocY = pLocY + a_iOffY
  this.moveXY(a_iOffX, a_iOffY)
end
on moveZ this, a_iZ
  if not integerp(a_iZ) then
    return error(this, "Integer expected:" && a_iZ, #moveZ)
  end if
  repeat with i = 1 to pSpriteList.count
    pSpriteList[i].locZ = a_iZ + i - 1
  end repeat
  pLocZ = a_iZ
end
on center this
  t_iX = (the stageRight - the stageLeft) / 2 - pwidth / 2
  t_iY = (the stageBottom - the stageTop) / 2 - pheight / 2
  return this.moveTo(t_iX, t_iY)
end
on ResizeBy this, a_iOffX, a_iOffY
  if a_iOffX <> 0 or a_iOffY <> 0 then
    pwidth = pwidth + a_iOffX
    pheight = pheight + a_iOffY
    call(#ResizeBy, pElemList, a_iOffX, a_iOffY)
  end if
end
on ResizeTo this, a_iX, a_iY
  t_iOffW = a_iX - pwidth
  t_iOffH = a_iY - pheight
  this.ResizeBy(t_iOffW, t_iOffH)
end
on BringUpFront this
  pWindowMngr.Activate(this.getID())
end
on setActive this
  if not pActive then
    pActive = 1
    return 1
  else
    return 0
  end if
end
on setDeactive this
  if pLock then
    return 0
  else
    if pActive then
      pActive = 0
      return 1
    else
      return 0
    end if
  end if
end
on getClientRect this
  return rect(pLocX, pLocY, pLocX + pwidth, pLocY + pheight)
end
on getElement this, a_sID
  tElement = pElemList[a_sID]
  if voidp(tElement) then
    return 0
  end if
  return tElement
end
on elementExists this, a_sID
  return not voidp(pElemList[a_sID])
end
on registerClient this, tClientID
  if not objectExists(tClientID) then
    return error(this, "Object not found:" && tClientID, #registerClient)
  end if
  pClientID = tClientID
  return 1
end
on removeClient this
  pClientID = VOID
  return 1
end
on registerProcedure this, tMethod, tClientID, tEvent
  if not symbolp(tMethod) then
    return error(this, "Symbol expected:" && tMethod, #registerProcedure)
  end if
  if not objectExists(tClientID) then
    return error(this, "Object not found:" && tClientID, #registerProcedure)
  end if
  if voidp(tEvent) then
    repeat with i = 1 to pProcedures.count
      pProcedures[i] = [tMethod, tClientID]
    end repeat
  else
    pProcedures[tEvent] = [tMethod, tClientID]
  end if
  return 1
end
on removeProcedure this, tEvent
  if voidp(tEvent) then
    pProcedures = this.createProcListTemplate()
  else
    if pProcedures.getaProp(tEvent) <> VOID then
      pProcedures[tEvent] = [#null, this.getID()]
    end if
  end if
  return 1
end
on getProperty this, a_kProp
  case a_kProp of
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
    #visible:
      return pVisible
    #title:
      return pTitle
    #id:
      return this.getID()
    #modal:
      return pModal
    #spriteList:
      return pSpriteList
    #client:
      return pClientID

  end case
  return 0
end
on setProperty this, a_kProp, tvalue
  case a_kProp of
    #locX:
      this.moveX(tvalue)
    #locY:
      this.moveY(tvalue)
    #locZ:
      this.moveZ(tvalue)
    #boundary:
      pBoundary = tvalue
    #title:
      pTitle = tvalue
    #modal:
      pModal = tvalue
    #visible:
      if tvalue then
        this.show()
      else
        this.hide()
      end if
    #otherwise:
      return 0

  end case
  return 1
end
on minimize this, a_rcRect
  t_rcOld = rect(0, 0, pwidth, pheight)
  this.ResizeTo(a_rcRect.width, a_rcRect.height)
  repeat with t_rElem in pElemList
    t_rSprite = t_rElem.getProperty(#sprite)
    t_iX = t_rSprite.locH - pLocX
    t_iY = t_rSprite.locV - pLocY
    t_iW = t_rSprite.width
    t_iH = t_rSprite.height
    t_rcElem = rect(t_iX, t_iY, t_iX + t_iW, t_iY + t_iH)
    if a_rcRect.union(t_rcElem) <> a_rcRect then
      t_rElem.hide()
    end if
  end repeat
  return t_rcOld
end
on restore this, a_rcRect
  t_rcOld = rect(0, 0, pwidth, pheight)
  call(#show, pElemList)
  this.ResizeTo(a_rcRect.width, a_rcRect.height)
  return t_rcOld
end
on mouseEnter me, tNull, tSprID
  return me.redirectEvent(#mouseEnter, tSprID)
end
on mouseLeave me, tNull, tSprID
  return me.redirectEvent(#mouseLeave, tSprID)
end
on mouseWithin me, tNull, tSprID
  return me.redirectEvent(#mouseWithin, tSprID)
end
on mouseDown me, tNull, tSprID
  if not pActive and not pLock then
    pWindowMngr.Activate(me.getID())
  end if
  if pSpecialIDList.getPos(tSprID) <> 0 then
    if tSprID contains "drag" then
      me.drag(1)
    else
      if tSprID contains "scaleh" then
        me.scale(1, 0)
      else
        if tSprID contains "scalev" then
          me.scale(0, 1)
        else
          if tSprID contains "scale" then
            me.scale(1, 1)
          end if
        end if
      end if
    end if
  end if
  return me.redirectEvent(#mouseDown, tSprID)
end
on mouseUp me, tNull, tSprID
  if pSpecialIDList.getPos(tSprID) <> 0 then
    if tSprID contains "drag" then
      me.drag(0)
    else
      if tSprID contains "scale" then
        me.scale(0, 0)
      else
        if tSprID contains "close" then
          if voidp(pClientID) then
            return pWindowMngr.Remove(me.getID())
          else
            tSprID = "close"
          end if
        end if
      end if
    end if
  end if
  return me.redirectEvent(#mouseUp, tSprID)
end
on mouseUpOutSide me, tNull, tSprID
  if tSprID contains "drag" then
    me.drag(0)
  end if
  if tSprID contains "scale" then
    me.scale(0, 0)
  end if
  return me.redirectEvent(#mouseUpOutSide, tSprID)
end
on keyDown me, tNull, tSprID
  return me.redirectEvent(#keyDown, tSprID)
end
on keyUp me, tNull, tSprID
  return me.redirectEvent(#keyUp, tSprID)
end
on supportedEvents me
  tList = []
  tList.add(#mouseEnter)
  tList.add(#mouseLeave)
  tList.add(#mouseWithin)
  tList.add(#mouseDown)
  tList.add(#mouseUp)
  tList.add(#mouseUpOutSide)
  tList.add(#keyDown)
  tList.add(#keyUp)
  return tList
end
on redirectEvent me, tEvent, tSprID
  tMethod = pProcedures[tEvent][1]
  tTarget = pProcedures[tEvent][2]
  tParam = call(tEvent, [pElemList[tSprID]], tSprID)
  if tParam = 0 then
    return 0
  end if
  tClient = getObject(tTarget)
  if tClient <> 0 then
    return call(tMethod, tClient, tEvent, tSprID, tParam, me.getID())
  else
    return me.removeProcedure(tEvent)
  end if
end
on buildVisual me, tLayout
  tLayout = getObject(#layout_parser).parse(tLayout)
  if not listp(tLayout) then
    return error(me, "Invalid window definition:" && tLayout, #buildVisual)
  end if
  tGroupNum = pGroupData.count
  tElemList = [:]
  tmemberlist = [:]
  tSpriteList = [:]
  tGroupData = [#members: [], #sprites: [], #items: [], #rect: [], #border: []]
  tSprManager = getSpriteManager()
  tResManager = getResourceManager()
  repeat with tElement in tLayout[#elements]
    tID = tElement[1][#id]
    if not voidp(pElemList[tID]) then
      tID = tID & tGroupNum
    end if
    tmember = member(tResManager.createMember(me.getID() & "_" & tID, #bitmap))
    tSprite = sprite(tSprManager.reserveSprite(me.getID()))
    if tSprite.spriteNum < 1 then
      repeat with t_rSpr in tSpriteList
        releaseSprite(t_rSpr.spriteNum, me.getID())
      end repeat
      tSpriteList = [:]
      repeat with t_rMem in tmemberlist
        removeMember(t_rMem.name)
      end repeat
      tmemberlist = [:]
      return error(me, "Failed to build window. System out of sprites!", #buildVisual)
    end if
    tmemberlist[tID] = tmember
    tSpriteList[tID] = tSprite
    tSprite.castNum = tmember.number
    tSprite.ink = 8
    tElemRect = rect(2000, 2000, -2000, -2000)
    tGroupData[#members].add(tmember)
    tGroupData[#sprites].add(tSprite)
    tSprManager.setEventBroker(tSprite.spriteNum, tID)
    tSprite.registerProcedure(VOID, me.getID(), VOID)
    tBlend = tElement[1][#blend]
    tInk = tElement[1][#ink]
    tColor = tElement[1][#color]
    tBgColor = tElement[1][#bgColor]
    tPalette = tElement[1][#palette]
    tIsBlendShared = 1
    tIsColorShared = 1
    tIsBgColorShared = 1
    tIsInkShared = 1
    tIsPaletteShared = 1
    repeat with tItem in tElement
      tItem[#id] = tID
      tItem[#mother] = me.getID()
      tItem[#buffer] = tmember
      tItem[#sprite] = tSprite
      if tItem[#blend] <> tBlend then
        tIsBlendShared = 0
      end if
      if tItem[#ink] <> tInk then
        tIsInkShared = 0
      end if
      if tItem[#color] <> tColor then
        tIsColorShared = 0
      end if
      if tItem[#bgColor] <> tBgColor then
        tIsBgColorShared = 0
      end if
      if tItem[#palette] <> tPalette then
        tIsPaletteShared = 0
      end if
      if tItem[#type] = "image" then
        tIsPaletteShared = 0
      end if
      if tItem[#flipH] then
        tItem.locH = tItem.locH - tItem.width
      end if
      if tItem[#flipV] then
        tItem.locV = tItem.locV - tItem.height
      end if
      if tItem[#locH] < tElemRect[1] then
        tElemRect[1] = tItem[#locH]
      end if
      if tItem[#locV] < tElemRect[2] then
        tElemRect[2] = tItem[#locV]
      end if
      if tItem[#locH] + tItem[#width] > tElemRect[3] then
        tElemRect[3] = tItem[#locH] + tItem[#width]
      end if
      if tItem[#locV] + tItem[#height] > tElemRect[4] then
        tElemRect[4] = tItem[#locV] + tItem[#height]
      end if
      if not voidp(tItem[#cursor]) then
        tSprite.setcursor(tItem[#cursor])
        next repeat
      end if
      tSprite.setcursor(#arrow)
    end repeat
    if tIsPaletteShared and not voidp(tPalette) then
      if stringp(tPalette) then
        tPalette = member(tResManager.getmemnum(tPalette))
      end if
      tmember.image = image(tElemRect.width, tElemRect.height, 8, tPalette)
    else
      tmember.image = image(tElemRect.width, tElemRect.height, the colorDepth)
    end if
    tmember.regPoint = point(0, 0)
    if tElement.count = 1 then
      tItem = tElement[1]
      tItem[#style] = #unique
      if tIsBlendShared then
        tItem[#blend] = 100
      end if
      tWrapper = me.CreateElement(tItem)
    else
      tProps = [#id: tID, #type: #wrapper, #style: #wrapper, #buffer: tmember, #sprite: tSprite, #locX: tElemRect[1], #locY: tElemRect[2]]
      tWrapper = me.CreateElement(tProps)
      repeat with tItem in tElement
        tItem[#locH] = tItem[#locH] - tElemRect[1]
        tItem[#locV] = tItem[#locV] - tElemRect[2]
        tItem[#style] = #grouped
        if tIsBlendShared then
          tItem[#blend] = 100
        end if
        tWrapper.add(me.CreateElement(tItem))
      end repeat
    end if
    if objectp(tWrapper) then
      tElemList.addProp(tID, tWrapper)
      tGroupData[#items].add(tWrapper)
    end if
    if tIsBlendShared then
      tSprite.blend = tBlend
    end if
    if tIsInkShared then
      tSprite.ink = tInk
    end if
    if tIsColorShared then
      tSprite.color = tColor
    end if
    if tIsBgColorShared then
      tSprite.bgColor = tBgColor
    end if
    tSprite.locH = tElemRect[1] + pClientRect[1]
    tSprite.locV = tElemRect[2] + pClientRect[2]
    tSprite.width = tElemRect.width
    tSprite.height = tElemRect.height
  end repeat
  tGroupData[#rect] = tLayout[#rect][1]
  tGroupData[#border] = tLayout[#border][1]
  if tGroupNum = 0 then
    pLocX = pLocX + tGroupData[#rect][1]
    pLocY = pLocY + tGroupData[#rect][2]
    pwidth = tGroupData[#rect].width
    pheight = tGroupData[#rect].height
  else
    tNewW = pClientRect[1] + pClientRect[3] + tGroupData[#rect].width
    tNewH = pClientRect[2] + pClientRect[4] + tGroupData[#rect].height
    if tNewW <> pwidth or tNewH <> pheight then
      me.ResizeTo(tNewW, tNewH)
    end if
  end if
  pClientRect = pClientRect + tGroupData[#border]
  repeat with i = 1 to tSpriteList.count
    tloc = tSpriteList[i].loc - [tGroupData[#rect][1], tGroupData[#rect][2]]
    tSpriteList[i].loc = point(pLocX, pLocY) + tloc
    tID = tmemberlist.getPropAt(i)
    pMemberList.addProp(tID, tmemberlist[tID])
    pSpriteList.addProp(tID, tSpriteList[tID])
  end repeat
  repeat with i = 1 to tElemList.count
    pElemList.addProp(tElemList.getPropAt(i), tElemList[i])
  end repeat
  pGroupData.add(tGroupData)
  call(#prepare, tGroupData[#items])
  call(#render, tGroupData[#items])
  return 1
end
on prepare this
  if pScaleFlagH then
    tOffX = the mouseH - pScaleOffset[1]
  else
    tOffX = 0
  end if
  if pScaleFlagV then
    tOffY = the mouseV - pScaleOffset[2]
  else
    tOffY = 0
  end if
  pScaleOffset = the mouseLoc
  if pwidth + tOffX < 64 then
    tOffX = 64 - pwidth
  end if
  if pheight + tOffY < 64 then
    tOffY = 64 - pheight
  end if
  this.ResizeBy(tOffX, tOffY)
end
on update this
  this.moveTo(the mouseH - pDragOffset[1], the mouseV - pDragOffset[2])
end
on CreateElement this, tProps
  tTemplate = pElemClsList[tProps[#style]]
  ttype = tProps[#type]
  tmodel = tProps[#model]
  tClass = "window." & ttype & tmodel & ".class"
  if not voidp(pElemClsList[tClass]) then
    tClsStruct = pElemClsList[tClass]
  else
    if variableExists(tClass) then
      tClsStruct = GetClsVariable(tClass)
      pElemClsList[tClass] = tClsStruct
    else
      tClsStruct = VOID
    end if
  end if
  if voidp(tClsStruct) then
    tElement = createObject(#temp, tTemplate)
  else
    tElement = createObject(#temp, tTemplate, tClsStruct)
  end if
  if not tElement then
    return error(this, "Illegal element type:" && tProps[#id] && tClass, #CreateElement)
  end if
  tElement.setID(tProps[#id])
  if tElement.Define(tProps) then
    return tElement
  else
    return VOID
  end if
end
on createProcListTemplate this
  tList = [:]
  repeat with tEvent in this.supportedEvents()
    tList[tEvent] = [#null, this.getID()]
  end repeat
  return tList
end
on scale this, a_bScaleH, a_bScaleV
  if voidp(a_bScaleV) then
    a_bScaleH = 1
  end if
  if (a_bScaleH = 1 or a_bScaleV = 1) and (pScaleFlagH = 0 or pScaleFlagV = 0) then
    pScaleOffset = the mouseLoc
    receivePrepare(this.getID())
    pScaleFlagH = a_bScaleH
    pScaleFlagV = a_bScaleV
  else
    if a_bScaleH = 0 and a_bScaleV = 0 and (pScaleFlagH = 1 or pScaleFlagV = 1) then
      removePrepare(this.getID())
      pScaleFlagH = a_bScaleH
      pScaleFlagV = a_bScaleV
    end if
  end if
  return 1
end
on drag this, a_bBool
  if a_bBool = 1 and pDragFlag = 0 then
    pDragOffset = the mouseLoc - [pLocX, pLocY]
    receiveUpdate(this.getID())
    pDragFlag = 1
  else
    if a_bBool = 0 and pDragFlag = 1 then
      removeUpdate(this.getID())
      pDragFlag = 0
    end if
  end if
  return 1
end
on draw me, tRGB
  call(#draw, pElemList, tRGB)
end
on moveX this, a_iOffX
  repeat with i = 1 to pSpriteList.count
    pSpriteList[i].locH = pSpriteList[i].locH + a_iOffX
  end repeat
end
on moveY this, a_iOffY
  repeat with i = 1 to pSpriteList.count
    pSpriteList[i].locV = pSpriteList[i].locV + a_iOffY
  end repeat
end
on moveXY this, a_iOffX, a_iOffY
  repeat with i = 1 to pSpriteList.count
    pSpriteList[i].loc = pSpriteList[i].loc + [a_iOffX, a_iOffY]
  end repeat
end
on null this
  return 0
end