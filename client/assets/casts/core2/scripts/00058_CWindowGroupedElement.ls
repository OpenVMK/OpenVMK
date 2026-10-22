-- Script
property pID
property pMotherId
property pType
property pBuffer
property pSprite
property pPalette
property pScaleH
property pScaleV
property pLocX
property pLocY
property pwidth
property pheight
property pDepth
property pImage
property pParams
property pProps
property pVisible

on Define me, tProps
  pID = tProps[#id]
  pMotherId = tProps[#mother]
  pType = tProps[#type]
  pBuffer = tProps[#buffer]
  pSprite = tProps[#sprite]
  pPalette = tProps[#palette]
  pScaleH = tProps[#scaleH]
  pScaleV = tProps[#scaleV]
  pLocX = tProps[#locH]
  pLocY = tProps[#locV]
  pwidth = tProps[#width]
  pheight = tProps[#height]
  pProps = tProps
  pVisible = 1
  if voidp(pPalette) then
    pPalette = #systemMac
  else
    if stringp(pPalette) then
      pPalette = member(getResourceManager().getmemnum(pPalette))
    end if
  end if
  if voidp(pProps[#member]) then
    tMemNum = 0
  else
    tMemNum = getResourceManager().getmemnum(pProps[#member])
  end if
  if tMemNum > 0 and pType <> "image" then
    tmember = member(tMemNum)
    pDepth = tmember.image.depth
    pImage = tmember.image.duplicate()
    if pImage.paletteRef <> pPalette then
      pImage.paletteRef = pPalette
    end if
  else
    pDepth = the colorDepth
    pImage = image(1, 1, pDepth, pPalette)
  end if
  if me.pProps[#flipH] then
    me.flipH()
  end if
  if me.pProps[#flipV] then
    me.flipV()
  end if
  pParams = [#useFastQuads: 1]
  if tProps[#blend] < 100 then
    pParams[#blend] = tProps[#blend]
  end if
  if tProps[#color] <> rgb(0, 0, 0) then
    pParams[#color] = tProps[#color]
  end if
  if tProps[#bgColor] <> rgb(255, 255, 255) then
    pParams[#bgColor] = tProps[#bgColor]
  end if
  if tProps[#ink] <> 0 then
    pParams[#ink] = tProps[#ink]
  end if
  return 1
end
on prepare me
end
on moveTo me, tLocX, tLocY
  pLocX = tLocX
  pLocY = tLocY
  me.render()
end
on moveBy me, tOffX, tOffY
  pLocX = pLocX + tOffX
  pLocY = pLocY + tOffY
  me.render()
end
on ResizeTo me, tX, tY
  tOffX = tX - pwidth
  tOffY = tY - pheight
  return me.ResizeBy(tOffX, tOffY)
end
on ResizeBy me, tOffH, tOffV
  case pScaleH of
    #move:
      pLocX = pLocX + tOffH
    #center:
      pLocX = pLocX + tOffH / 2
    #scale:
      pwidth = pwidth + tOffH

  end case
  case pScaleV of
    #move:
      pLocY = pLocY + tOffV
    #center:
      pLocY = pLocY + tOffV / 2
    #scale:
      pheight = pheight + tOffV

  end case
  me.render()
end
on flipH me
  tImage = image(pImage.width, pImage.height, pImage.depth, pImage.paletteRef)
  tQuad = [point(pImage.width, 0), point(0, 0), point(0, pImage.height), point(pImage.width, pImage.height)]
  tImage.copyPixels(pImage, tQuad, pImage.rect, [#useFastQuads: 1])
  me.pImage = tImage
end
on flipV me
  tImage = image(pImage.width, pImage.height, pImage.depth, pImage.paletteRef)
  tQuad = [point(0, pImage.height), point(pImage.width, pImage.height), point(pImage.width, 0), point(0, 0)]
  tImage.copyPixels(pImage, tQuad, pImage.rect, [#useFastQuads: 1])
  pImage = tImage
end
on getProperty me, tProp
  case tProp of
    #buffer:
      return pBuffer
    #sprite:
      return pSprite
    #width:
      return pwidth
    #height:
      return pheight
    #locX:
      return pLocX
    #locY:
      return pLocY
    #scaleH:
      return pScaleH
    #scaleV:
      return pScaleV
    #depth:
      return pDepth
    #palette:
      return pPalette

  end case
  return 0
end
on render me
  tTargetRect = rect(pLocX, pLocY, pLocX + pwidth, pLocY + pheight)
  tSourceRect = pImage.rect
  pBuffer.image.copyPixels(pImage, tTargetRect, tSourceRect, pParams)
end
on draw me, tRGB
  if not ilk(tRGB, #color) then
    tRGB = rgb(0, 0, 255)
  end if
  tTargetRect = rect(pLocX, pLocY, pLocX + pwidth, pLocY + pheight)
  pBuffer.image.draw(tTargetRect, [#shapeType: #rect, #color: tRGB])
end