-- Script
property pMember
property pOwnX
property pOwnY
property pOwnW
property pOwnH
property pOffX
property pOffY
property pScrolls
property pUpdateLock
property maxChars

on deconstruct me
  return getResourceManager().removeMember(the name of pMember)
end
on prepare me
  pMember = member(getResourceManager().createMember(me.pProps[#member] & the milliSeconds & numToChar(random(99)), #field))
  pMember.wordWrap = me.pProps[#wordWrap]
  pMember.autoTab = me.pProps[#autoTab]
  pMember.alignment = me.pProps[#alignment]
  pMember.font = me.pProps[#font]
  pMember.fontSize = me.pProps[#fontSize]
  pMember.boxType = me.pProps[#boxType]
  pMember.fontStyle = me.pProps[#fontStyle]
  pMember.editable = 1
  pOffX = 0
  pOffY = 0
  pOwnW = me.pProps[#width]
  pOwnH = me.pProps[#height]
  pScrolls = []
  pUpdateLock = 0
  maxChars = 0
  if me.pProps[#style] = #unique then
    pOwnX = 0
    pOwnY = 0
  else
    pOwnX = me.pProps[#locH]
    pOwnY = me.pProps[#locV]
  end if
  if voidp(me.pProps[#border]) then
    me.pProps[#border] = 0
  end if
  pMember.color = me.pProps[#txtColor]
  pMember.bgColor = me.pProps[#txtBgColor]
  pMember.border = me.pProps[#border]
  if integerp(me.pProps[#boxDropShadow]) then
    pMember.boxDropShadow = me.pProps[#boxDropShadow]
  end if
  if me.pProps[#key] = EMPTY then
    pMember.text = EMPTY
  else
    if textExists(me.pProps[#key]) then
      pMember.text = getText(me.pProps[#key])
    else
      error(me, "Text not found:" && me.pProps[#key], #Define)
      pMember.text = me.pProps[#key]
    end if
  end if
  me.pSprite.member = pMember
  pMember.rect = rect(0, 0, me.pwidth, me.pheight)
  return 1
end
on setMaxChars me, t_MaxChars
  maxChars = t_MaxChars
end
on updateText me
  t_lines = pMember.lineCount
  t_lineh = pMember.lineHeight
  me.pImage = image(me.pImage.rect.width, t_lines * t_lineh, 32)
  me.scrollMe()
  if maxChars > 0 then
    if pMember.char.count > maxChars then
      pMember.text = pMember.char[1..maxChars]
    end if
  end if
  me.render()
  pUpdateLock = 1
  me.registerScroll()
  pUpdateLock = 0
  return 1
end
on scrollMe me
  t_height = me.pSprite.height
  t_cursorOffset = pMember.charPosToLoc(the selStart).locV
  t_offset = pOffY
  t_test = 0
  if t_cursorOffset > t_height then
    t_test = t_cursorOffset - t_height
  end if
  if t_test > t_offset then
    t_offset = t_test
  else
    if t_cursorOffset < t_offset then
      t_offset = t_cursorOffset
    end if
  end if
  if t_test = 0 then
    if t_cursorOffset < 20 then
      t_offset = 0
    end if
  end if
  pOffY = t_offset
  tScrollList = []
  tWndObj = getWindowManager().get(me.pMotherId)
  repeat with tScrollId in pScrolls
    tScrollList.add(tWndObj.getElement(tScrollId))
  end repeat
  call(#sendAdjustOffsetTo, tScrollList, t_offset)
end
on getText me
  return the text of pMember
end
on setText me, tText
  if not stringp(tText) then
    tText = string(tText)
  end if
  pMember.text = tText
  return 1
end
on setEdit me, tBool
  if tBool <> 1 and tBool <> 0 then
    return 0
  end if
  pMember.editable = tBool
  me.pSprite.editable = tBool
  return 1
end
on setFocus me, tBool
  case tBool of
    1:
      the keyboardFocusSprite = me.pSprite.spriteNum
    0:
      the keyboardFocusSprite = 0

  end case
  return 0
  return 1
end
on render me
  me.pLocX = me.pSprite.locH
  me.pLocY = me.pSprite.locV
  me.pwidth = pOwnW
  me.pheight = pOwnH
  me.pMember.rect = rect(0, 0, me.pwidth, me.pheight)
  pMember.scrollTop = pOffY
end
on draw me, tRGB
  if not ilk(tRGB, #color) then
    tRGB = rgb(255, 0, 0)
  end if
  (the stage).image.draw(me.pSprite.rect, [#shapeType: #rect, #color: tRGB])
end
on clearImage me
  tTargetRect = rect(pOwnX, pOwnY, pOwnX + pOwnW, pOwnY + pOwnH)
  return the image of the pBuffer of me.fill(tTargetRect, me.pProps[#bgColor])
end
on clearBuffer me
  return the pImage of me.fill(the rect of the pImage of me, me.pProps[#bgColor])
end
on registerScroll me, tID
  if voidp(pScrolls) then
    me.prepare()
  end if
  if not voidp(tID) then
    if pScrolls.getPos(tID) = 0 then
      pScrolls.add(tID)
    end if
  else
    if pScrolls.count = 0 then
      return 0
    end if
  end if
  tSourceRect = rect(pOffX, pOffY, pOffX + pOwnW, pOffY + pOwnH)
  tScrollList = []
  tWndObj = getWindowManager().get(me.pMotherId)
  repeat with tScrollId in pScrolls
    tScrollList.add(tWndObj.getElement(tScrollId))
  end repeat
  call(#updateData, tScrollList, tSourceRect, me.pImage.rect)
end
on adjustOffsetTo me, tX, tY
  pOffX = tX
  pOffY = tY
  if not pUpdateLock then
    me.clearImage()
    me.render()
  end if
end
on adjustOffsetBy me, tOffX, tOffY
  pOffX = pOffX + tOffX
  pOffY = pOffY + tOffY
  if not pUpdateLock then
    me.clearImage()
    me.render()
  end if
end
on adjustXOffsetTo me, tX
  me.adjustOffsetTo(tX, pOffY)
end
on adjustYOffsetTo me, tY
  me.adjustOffsetTo(pOffX, tY)
end
on setOffsetX me, tX
  me.adjustOffsetTo(tX, pOffY)
end
on setOffsetY me, tY
  me.adjustOffsetTo(pOffX, tY)
end
on getOffsetX me
  return pOffX
end
on getOffsetY me
  return pOffY
end
on ResizeBy me, tOffH, tOffV
  if tOffH <> 0 or tOffV <> 0 then
    if me.pProps[#style] = #unique then
      case me.pScaleH of
        #move:
          me.moveBy(tOffH, 0)
        #scale:
          me.pwidth = me.pwidth + tOffH
        #center:
          me.moveBy(tOffH / 2, 0)

      end case
      case me.pScaleV of
        #move:
          me.moveBy(0, tOffV)
        #scale:
          me.pheight = me.pheight + tOffV
        #center:
          me.moveBy(0, tOffV / 2)

      end case
      if me.pwidth < 1 then
        me.pwidth = 1
      end if
      if me.pheight < 1 then
        me.pheight = 1
      end if
      pOwnW = me.pwidth
      pOwnH = me.pheight
      me.pBuffer.image = image(pOwnW, pOwnH, me.pDepth)
      me.pBuffer.regPoint = point(0, 0)
      me.pSprite.width = pOwnW
      me.pSprite.height = pOwnH
    else
      case me.pScaleH of
        #move:
          pOwnX = pOwnX + tOffH
        #scale:
          pOwnW = pOwnW + tOffH
        #center:
          pOwnX = pOwnX + tOffH / 2

      end case
      case me.pScaleV of
        #move:
          pOwnY = pOwnY + tOffV
        #scale:
          pOwnH = pOwnH + tOffV
        #center:
          pOwnY = pOwnY + tOffV / 2

      end case
    end if
    me.registerScroll()
    me.render()
  end if
end