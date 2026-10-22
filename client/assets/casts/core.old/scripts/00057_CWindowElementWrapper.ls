-- Script
property pID
property pElemList
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
property pUseAlpha

on construct this
  pElemList = []
  pPalette = #systemMac
  pScaleH = #fixed
  pScaleV = #fixed
  pLocX = 0
  pLocY = 0
  pwidth = 0
  pheight = 0
  pVisible = 1
  pUseAlpha = 0
  return 1
end
on deconstruct this
  call(#deconstruct, pElemList)
  pElemList = []
  pBuffer = VOID
  pSprite = VOID
  return 1
end
on Define this, tProps
  pID = tProps[#id]
  pBuffer = tProps[#buffer]
  pSprite = tProps[#sprite]
  pLocX = tProps[#locX]
  pLocY = tProps[#locY]
  pUseAlpha = tProps[#alpha]
  pwidth = pBuffer.width
  pheight = pBuffer.height
  pPalette = pBuffer.paletteRef
  return 1
end
on add this, tElement
  if not objectp(tElement) then
    return 0
  end if
  if tElement.getProperty(#scaleH) <> #fixed then
    pScaleH = #scale
  end if
  if tElement.getProperty(#scaleV) <> #fixed then
    pScaleV = #scale
  end if
  pElemList.add(tElement)
  return 1
end
on show this
  pVisible = 1
  pSprite.visible = 1
  return 1
end
on hide this
  pVisible = 0
  pSprite.visible = 0
  return 1
end
on moveTo this, tLocX, tLocY
  tOffX = tLocX - pLocX
  tOffY = tLocY - pLocY
  this.moveBy(tOffX, tOffY)
end
on moveBy this, tOffX, tOffY
  pLocX = pLocX + tOffX
  pLocY = pLocY + tOffY
  pSprite.loc = pSprite.loc + [tOffX, tOffY]
end
on ResizeBy this, tOffW, tOffH
  if tOffW <> 0 or tOffH <> 0 then
    case pScaleH of
      #fixed:
        tOffW = 0
      #scale:
        pwidth = pwidth + tOffW
      #move:
        this.moveBy(tOffW, 0)
      #center:
        this.moveBy(tOffW / 2, 0)

    end case
    if pScaleH <> #scale then
      tOffW = 0
    end if
    case pScaleV of
      #fixed:
        tOffH = 0
      #scale:
        pheight = pheight + tOffH
      #move:
        this.moveBy(0, tOffH)
      #center:
        this.moveBy(0, tOffH / 2)

    end case
    if pScaleV <> #scale then
      tOffH = 0
    end if
    if tOffW <> 0 or tOffH <> 0 then
      if pwidth < 1 then
        pwidth = 1
      end if
      if pheight < 1 then
        pheight = 1
      end if
      pBuffer.image = image(pwidth, pheight, pBuffer.image.depth, pPalette)
      pBuffer.regPoint = point(0, 0)
      pSprite.width = pwidth
      pSprite.height = pheight
      pSprite.stretch = 0
      if pUseAlpha then
        if pBuffer.image.depth = 32 then
          pBuffer.image.useAlpha = 1
          tAlpha = image(pwidth, pheight, 8, #grayscale)
          tAlpha.fill(tAlpha.rect, rgb(255, 255, 255))
          pBuffer.image.setAlpha(tAlpha)
        end if
      end if
      call(#ResizeBy, pElemList, tOffW, tOffH)
    end if
  end if
end
on getProperty this, tProp
  case tProp of
    #image:
      return the image of pBuffer
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
      return pwidth
    #height:
      return pheight
    #depth:
      return the depth of the image of pBuffer
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
on setProperty this, tProp, tvalue
  case tProp of
    #scaleH:
      pScaleH = tvalue
    #scaleV:
      pScaleV = tvalue
    #locX:
      this.moveTo(tvalue, pLocY)
    #locY:
      this.moveTo(pLocX, tvalue)
    #locH:
      this.moveTo(tvalue, pLocY)
    #locV:
      this.moveTo(pLocX, tvalue)
    #width:
      this.ResizeBy(pwidth - tvalue, 0)
    #height:
      this.ResizeBy(0, pheight - tvalue)
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
      tRegPnt = pBuffer.regPoint
      pBuffer.image = tvalue
      pBuffer.regPoint = tRegPnt
      pSprite.width = pBuffer.width
      pSprite.height = pBuffer.height
      pwidth = pBuffer.width
      pheight = pBuffer.height
    #buffer, #member:
      pBuffer = tvalue
      pwidth = pBuffer.width
      pheight = pBuffer.height
      pPalette = pBuffer.paletteRef
      pSprite.castNum = pBuffer.number
    #palette:
      pPalette = tvalue
      pBuffer.image.paletteRef = pPalette
    #depth:
      tImage = pBuffer.image.duplicate()
      pBuffer.image = image(tImage.width, tImage.height, tvalue)
      pBuffer.image.copyPixels(tImage, tImage.rect, tImage.rect, [#useFastQuads: 1])
      pBuffer.image.paletteRef = pPalette
      if pUseAlpha then
        if tvalue = 32 and pBuffer.image.depth > 16 then
          pBuffer.image.useAlpha = 1
        end if
      end if
    #visible:
      if tvalue = 1 then
        this.show()
      else
        this.hide()
      end if

  end case
  return 0
  return 1
end
on prepare this
  call(#prepare, pElemList)
end
on render this
  if pVisible then
    call(#render, pElemList)
  end if
end
on draw this, tRGB
  call(#draw, pElemList, tRGB)
end