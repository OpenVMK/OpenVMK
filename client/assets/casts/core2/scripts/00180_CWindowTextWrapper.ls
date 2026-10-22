-- Script
property pFontData
property pTextMem
property pNeedFill

on prepare this
  this.pOffX = 0
  this.pOffY = 0
  this.pOwnW = this.pProps[#width]
  this.pOwnH = this.pProps[#height]
  this.pScrolls = []
  if this.pProps[#style] = #unique then
    this.pOwnX = 0
    this.pOwnY = 0
  else
    this.pOwnX = this.pProps[#locH]
    this.pOwnY = this.pProps[#locV]
  end if
  pFontData = [:]
  pFontData[#color] = this.pProps[#txtColor]
  pFontData[#bgColor] = this.pProps[#txtBgColor]
  pFontData[#key] = this.pProps[#key]
  pFontData[#wordWrap] = this.pProps[#wordWrap]
  pFontData[#alignment] = symbol(this.pProps[#alignment])
  pFontData[#font] = this.pProps[#font]
  pFontData[#fontSize] = this.pProps[#fontSize]
  pFontData[#fontStyle] = this.pProps[#fontStyle]
  pFontData[#antialias] = this.pProps[#antialias]
  case pFontData[#antialias] of
    VOID, 0:
      pFontData[#antialias] = 0
      pFontData[#antiAliasThreshold] = 1
    1:
      pFontData[#antialias] = 1
      pFontData[#antiAliasThreshold] = 1

  end case
  if integerp(this.pProps[#fixedLineSpace]) then
    pFontData[#fixedLineSpace] = this.pProps[#fixedLineSpace]
  else
    pFontData[#fixedLineSpace] = this.pProps[#fontSize]
  end if
  if voidp(pFontData[#key]) then
    pFontData[#key] = EMPTY
  end if
  if pFontData[#bgColor] <> rgb(255, 255, 255) then
    pNeedFill = 1
  else
    pNeedFill = 0
  end if
  this.initResources(pFontData)
  return this.createImgFromTxt()
end
on setText this, a_sText
  a_sText = string(a_sText)
  pFontData[#text] = a_sText
  tRect = rect(this.pOwnX, this.pOwnY, this.pOwnX + this.pOwnW, this.pOwnY + this.pOwnH)
  this.pBuffer.image.fill(tRect, rgb(255, 255, 255))
  this.createImgFromTxt()
  this.render()
  this.registerScroll()
  return 1
end
on getText this
  return pFontData[#text]
end
on setFont this, tStruct
  pFontData.font = tStruct.getaProp(#font)
  pFontData.fontStyle = tStruct.getaProp(#fontStyle)
  pFontData.fontSize = tStruct.getaProp(#fontSize)
  pFontData.color = tStruct.getaProp(#color)
  pFontData.fixedLineSpace = tStruct.getaProp(#lineHeight)
  tRect = rect(this.pOwnX, this.pOwnY, this.pOwnX + this.pOwnW, this.pOwnY + this.pOwnH)
  this.pBuffer.image.fill(tRect, rgb(255, 255, 255))
  this.createImgFromTxt()
  this.render()
  this.registerScroll()
  return 1
end
on getFont this
  tStruct = getStructVariable("struct.font.empty")
  tStruct.setaProp(#font, pFontData.font)
  tStruct.setaProp(#fontStyle, pFontData.fontStyle)
  tStruct.setaProp(#fontSize, pFontData.fontSize)
  tStruct.setaProp(#color, pFontData.color)
  tStruct.setaProp(#lineHeight, pFontData.fixedLineSpace)
  return tStruct
end
on registerScroll this, tID
  if voidp(this.pScrolls) then
    this.prepare()
  end if
  if not voidp(tID) then
    if this.pScrolls.getPos(tID) = 0 then
      this.pScrolls.add(tID)
    end if
  else
    if this.pScrolls.count = 0 then
      return 0
    end if
  end if
  tSourceRect = rect(this.pOffX, this.pOffY, this.pOffX + this.pOwnW, this.pOffY + this.pOwnH)
  tScrollList = []
  tWndObj = getWindowManager().get(this.pMotherId)
  repeat with tScrollId in this.pScrolls
    tScrollList.add(tWndObj.getElement(tScrollId))
  end repeat
  this.createImgFromTxt()
  call(#updateData, tScrollList, tSourceRect, this.pImage.rect)
end
on initResources this, tFontProps
  tMemNum = getResourceManager().getmemnum("visual window text")
  if tMemNum = 0 then
    tMemNum = getResourceManager().createMember("visual window text", #text)
    pTextMem = member(tMemNum)
    pTextMem.boxType = #adjust
  else
    pTextMem = member(tMemNum)
  end if
  return 1
end
on createImgFromTxt me
  pTextMem.rect = rect(0, 0, me.pOwnW, me.pOwnH)
  if not listp(pFontData[#fontStyle]) then
    tList = []
    tDelim = the itemDelimiter
    the itemDelimiter = ","
    repeat with i = 1 to pFontData[#fontStyle].item.count
      tList.add(symbol(pFontData[#fontStyle].item[i]))
    end repeat
    the itemDelimiter = tDelim
    pFontData[#fontStyle] = tList
  end if
  if not voidp(pFontData[#text]) then
    pTextMem.text = pFontData[#text]
    pFontData[#text] = VOID
  else
    if pFontData[#key] = EMPTY then
      pTextMem.text = EMPTY
    else
      if pFontData[#key].char[1] = "%" then
        tKey = symbol(pFontData[#key].char[2..length(pFontData[#key])])
        pTextMem.text = string(getObject(me.pMotherId).getProperty(tKey))
      else
        if textExists(pFontData[#key]) then
          pTextMem.text = getTextManager().get(pFontData[#key])
        else
          error(me, "Text not found:" && pFontData[#key], #createImgFromTxt)
          pTextMem.text = pFontData[#key]
        end if
      end if
    end if
  end if
  pFontData[#text] = pTextMem.text
  if pTextMem.fontStyle <> pFontData[#fontStyle] then
    pTextMem.fontStyle = pFontData[#fontStyle]
  end if
  if pTextMem.wordWrap <> pFontData[#wordWrap] then
    pTextMem.wordWrap = pFontData[#wordWrap]
  end if
  if pTextMem.alignment <> pFontData[#alignment] then
    pTextMem.alignment = pFontData[#alignment]
  end if
  if pTextMem.bgColor <> pFontData[#bgColor] then
    pTextMem.bgColor = pFontData[#bgColor]
  end if
  if pTextMem.font <> pFontData[#font] then
    pTextMem.font = pFontData[#font]
  end if
  if pTextMem.fontSize <> pFontData[#fontSize] then
    pTextMem.fontSize = pFontData[#fontSize]
  end if
  if pTextMem.color <> pFontData[#color] then
    pTextMem.color = pFontData[#color]
  end if
  if pTextMem.fixedLineSpace <> pFontData[#fixedLineSpace] then
    pTextMem.fixedLineSpace = pFontData[#fixedLineSpace]
  end if
  if pTextMem.antialias <> pFontData[#antialias] then
    pTextMem.antialias = pFontData[#antialias]
    pTextMem.antiAliasThreshold = pFontData[#antiAliasThreshold]
  end if
  if me.pScaleH = #center then
    tWidth = pTextMem.charPosToLoc(pTextMem.char.count).locH + 16
    if me.pProps[#style] = #unique then
      me.pLocX = me.pLocX + (me.pwidth - tWidth) / 2
      me.pwidth = tWidth
      me.pOwnW = tWidth
    else
      me.pOwnX = me.pOwnX + (me.pOwnW - tWidth) / 2
      me.pOwnW = tWidth
    end if
    pTextMem.rect = rect(0, 0, tWidth, pTextMem.height)
  else
    if me.pProps[#style] = #unique then
      me.pwidth = pTextMem.image.width
      me.pOwnW = me.pwidth
    else
      me.pOwnW = pTextMem.image.width
    end if
  end if
  if me.pScrolls.count > 0 then
    tHeight = pTextMem.rect.height
  else
    tHeight = me.pOwnH
  end if
  me.pImage = image(me.pOwnW, tHeight, me.pDepth, me.pPalette)
  if not voidp(me.pImage) then
    if pNeedFill then
      me.pImage.fill(me.pImage.rect, me.pFontData[#bgColor])
    end if
    me.pImage.copyPixels(pTextMem.image, me.pImage.rect, me.pImage.rect, [#ink: 8, #useFastQuads: 1])
    return 1
  else
    error(me, "Failed to create render output image(" & me.pOwnW & "," & tHeight & "," & me.pDepth & ")", #createImgFromTxt)
    return 0
  end if
end