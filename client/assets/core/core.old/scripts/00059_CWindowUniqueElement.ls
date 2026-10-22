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
property pVisible
property pDepth
property pImage
property pParams
property pProps
property pUseAlpha

on Define me, tProps
  pID = tProps[#id]
  pMotherId = tProps[#mother]
  pType = tProps[#type]
  pScaleH = tProps[#scaleH]
  pScaleV = tProps[#scaleV]
  pBuffer = tProps[#buffer]
  pSprite = tProps[#sprite]
  pLocX = tProps[#locH]
  pLocY = tProps[#locV]
  pwidth = tProps[#width]
  pheight = tProps[#height]
  pPalette = tProps[#palette]
  pUseAlpha = tProps[#alpha]
  pProps = tProps
  pDepth = (the stage).image.depth
  pVisible = 1
  if voidp(pPalette) then
    pPalette = #systemMac
  else
    if stringp(pPalette) then
      pPalette = member(getResourceManager().getmemnum(pPalette))
    end if
  end if
  tMemNum = getResourceManager().getmemnum(pProps[#member])
  if tMemNum > 0 then
    tmember = member(tMemNum)
    if tmember.type = #bitmap then
      pImage = tmember.image.duplicate()
      pDepth = tmember.image.depth
      if pImage.paletteRef <> pPalette then
        pImage.paletteRef = pPalette
      end if
      if pUseAlpha then
        if pDepth >= 32 then
          pImage.useAlpha = tmember.image.useAlpha
        end if
      end if
    end if
  end if
  if voidp(pImage) then
    pDepth = (the stage).image.depth
    pImage = image(1, 1, pDepth, pPalette)
  end if
  if pProps[#flipH] then
    me.flipH()
  end if
  if pProps[#flipV] then
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
on show me
  pVisible = 1
  pSprite.visible = 1
  return 1
end
on hide me
  pVisible = 0
  pSprite.visible = 0
  return 1
end
on moveTo me, tLocX, tLocY
  tOffX = tLocX - pLocX
  tOffY = tLocY - pLocY
  pLocX = tLocX
  pLocY = tLocY
  pSprite.loc = pSprite.loc + [tOffX, tOffY]
end
on moveBy me, tOffX, tOffY
  pLocX = pLocX + tOffX
  pLocY = pLocY + tOffY
  pSprite.loc = pSprite.loc + [tOffX, tOffY]
end
on ResizeTo me, tX, tY
  tOffX = tX - pSprite.width
  tOffY = tY - pSprite.height
  return me.ResizeBy(tOffX, tOffY)
end
on ResizeBy me, tOffH, tOffV
  if tOffH <> 0 or tOffV <> 0 then
    case pScaleH of
      #move:
        me.moveBy(tOffH, 0)
      #scale:
        pSprite.width = pSprite.width + tOffH
      #center:
        me.moveBy(tOffH / 2, 0)

    end case
    case pScaleV of
      #move:
        me.moveBy(0, tOffV)
      #scale:
        pSprite.height = pSprite.height + tOffV
      #center:
        me.moveBy(0, tOffV / 2)

    end case
    pwidth = pSprite.width
    pheight = pSprite.height
    me.render()
  end if
end
on flipH me
  tImage = image(pImage.width, pImage.height, pImage.depth)
  tQuad = [point(pImage.width, 0), point(0, 0), point(0, pImage.height), point(pImage.width, pImage.height)]
  tImage.copyPixels(pImage, tQuad, pImage.rect, [#useFastQuads: 1])
  if tImage.depth > 16 then
    tImage.useAlpha = pImage.useAlpha
  end if
  pImage = tImage
end
on flipV me
  tImage = image(pImage.width, pImage.height, pImage.depth)
  tQuad = [point(0, pImage.height), point(pImage.width, pImage.height), point(pImage.width, 0), point(0, 0)]
  tImage.copyPixels(pImage, tQuad, pImage.rect, [#useFastQuads: 1])
  if tImage.depth > 16 then
    tImage.useAlpha = pImage.useAlpha
  end if
  pImage = tImage
end
on getProperty me, tProp
  case tProp of
    #image:
      return pImage
    #buffer:
      return pBuffer
    #member:
      return pBuffer
    #sprite:
      return pSprite
    #scaleH:
      return pScaleH
    #scaleV:
      return pScaleV
    #locX:
      return pLocX
    #locY:
      return pLocY
    #locH:
      return pLocX
    #locV:
      return pLocY
    #locZ:
      return the locZ of pSprite
    #width:
      return the width of pSprite
    #height:
      return the height of pSprite
    #rect:
      return the rect of pSprite
    #depth:
      return the depth of pImage
    #color:
      return the color of pSprite
    #bgColor:
      return the bgColor of pSprite
    #blend:
      return the blend of pSprite
    #ink:
      return the ink of pSprite
    #palette:
      return pPalette
    #visible:
      return pVisible
    #cursor:
      return the cursor of pSprite

  end case
  return 0
end
on setProperty me, tProp, tvalue
  case tProp of
    #scaleH:
      pScaleH = tvalue
    #scaleV:
      pScaleV = tvalue
    #locX:
      me.moveTo(tvalue, pLocY)
    #locY:
      me.moveTo(pLocX, tvalue)
    #locH:
      me.moveTo(tvalue, pLocY)
    #locV:
      me.moveTo(pLocX, tvalue)
    #width:
      me.ResizeTo(tvalue, pheight)
    #height:
      me.ResizeTo(pwidth, tvalue)
    #color:
      pSprite.color = tvalue
    #bgColor:
      pSprite.bgColor = tvalue
    #blend:
      pSprite.blend = tvalue
    #ink:
      pSprite.ink = tvalue
    #cursor:
      pSprite.setcursor(tvalue)
    #image:
      pImage = tvalue
      me.render()
    #buffer, #member:
      pSprite.member = tvalue
      pSprite.width = pSprite.member.width
      pSprite.height = pSprite.member.height
    #palette:
      pPalette = tvalue
      pImage.paletteRef = pPalette
    #depth:
      pDepth = tvalue
      tImage = pImage.duplicate()
      pImage = image(pImage.width, pImage.height, pDepth)
      pImage.copyPixels(tImage, tImage.rect, tImage.rect, [#useFastQuads: 1])
      pImage.paletteRef = pPalette
    #visible:
      if tvalue = 1 then
        me.show()
      else
        me.hide()
      end if
    #image:
      pImage = tvalue
      me.render()

  end case
  return 0
  return 1
end
on render me
  pBuffer.image.copyPixels(pImage, pBuffer.image.rect, pImage.rect, pParams)
end
on draw me, tRGB
  if not ilk(tRGB, #color) then
    tRGB = rgb(255, 0, 0)
  end if
  pBuffer.image.draw(pBuffer.image.rect, [#shapeType: #rect, #color: tRGB])
end