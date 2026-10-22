-- Script
property m_rFurniMap
property m_rcThumbRect
property m_iType_rPreviewCache
property m_iType_rThumbnailCache
property m_rPreviewQueue
property m_rFurniAssetManager
property m_sWriterA
property m_sWriterB

on construct this
  m_iType_rPreviewCache = [:]
  m_iType_rThumbnailCache = [:]
  m_rcPrevRect = rect(0, 0, 104, 128)
  m_rcThumbRect = rect(0, 0, 38, 38)
  m_rFurniMap = VOID
  m_rFurniAssetManager = getThread(#room).component.GetFurniAssetManager()
  m_sWriterA = getUniqueID()
  m_sWriterB = getUniqueID()
  t_rPlain = getStructVariable("struct.font.plain")
  t_rMetrics = [#font: t_rPlain.getaProp(#font), #fontStyle: t_rPlain.getaProp(#fontStyle), #color: rgb(250, 250, 250), #bgColor: rgb(225, 255, 255), #fixedLineSpace: 15]
  createWriter(m_sWriterA, t_rMetrics)
  t_rMetrics = [#font: t_rPlain.getaProp(#font), #fontStyle: t_rPlain.getaProp(#fontStyle), #color: rgb(2, 2, 2), #bgColor: rgb(225, 255, 255), #fixedLineSpace: 15]
  createWriter(m_sWriterB, t_rMetrics)
  registerMessage("GetFurniPreview", this.getID(), #_FetchFurniPreview)
  registerMessage("GetFurniThumbnail", this.getID(), #_FetchFurniThumbnail)
  registerMessage("GetPosterPreview", this.getID(), #_FetchPosterPreview)
  registerMessage("GetPosterThumbnail", this.getID(), #_FetchPosterThumbnail)
  registerMessage("GetPinPreview", this.getID(), #_FetchPinPreview)
  registerMessage("GetPinThumbnail", this.getID(), #_FetchPinThumbnail)
  return 1
end
on deconstruct this
  if writerExists(m_sWriterA) then
    removeWriter(m_sWriterA)
  end if
  if writerExists(m_sWriterB) then
    removeWriter(m_sWriterB)
  end if
  m_iType_rPreviewCache = [:]
  m_iType_rThumbnailCache = [:]
  m_rFurniMap = VOID
  unregisterMessage("GetFurniPreview", this.getID())
  unregisterMessage("GetFurniThumbnail", this.getID())
  unregisterMessage("GetPosterPreview", this.getID())
  unregisterMessage("GetPosterThumbnail", this.getID())
  unregisterMessage("GetPinPreview", this.getID())
  unregisterMessage("GetPinThumbnail", this.getID())
  return 1
end
on _FetchFurniPreview this, a_mp_iType_rOutput, a_rCallback
  createObject(#random, "CRoomFurniSetLoader").load(a_mp_iType_rOutput, a_rCallback, this, #_ReturnFurniPreview)
end
on _ReturnFurniPreview this, a_mp_iType_rOutput, a_rCallback
  t_iCount = a_mp_iType_rOutput.count
  repeat with i = 1 to t_iCount
    a_mp_iType_rOutput[i] = this._RenderFurniPreview(a_mp_iType_rOutput.getPropAt(i))
  end repeat
  call(a_rCallback.method, [getObject(a_rCallback.client)], a_mp_iType_rOutput)
end
on _FetchFurniThumbnail this, a_mp_iType_rOutput, a_rCallback
  createObject(#random, "CRoomFurniSetLoader").load(a_mp_iType_rOutput, a_rCallback, this, #_ReturnFurniThumbnail)
end
on _ReturnFurniThumbnail this, a_mp_iType_rOutput, a_rCallback
  t_iCount = a_mp_iType_rOutput.count
  repeat with i = 1 to t_iCount
    t_iTypeCode = a_mp_iType_rOutput.getPropAt(i)
    t_rThumb = m_iType_rThumbnailCache.getaProp(t_iTypeCode)
    if voidp(t_rThumb) then
      t_rThumb = this._ShrinkToThumbnail(this._RenderFurniPreview(t_iTypeCode))
      m_iType_rThumbnailCache.setaProp(t_iTypeCode, t_rThumb)
    end if
    a_mp_iType_rOutput[i] = t_rThumb
  end repeat
  call(a_rCallback.method, [getObject(a_rCallback.client)], a_mp_iType_rOutput, a_rCallback)
end
on _RenderFurniPreview this, a_iTypeCode
  if a_iTypeCode > 10000 then
    a_iTypeCode = a_iTypeCode - 10000
  end if
  t_rImage = m_iType_rPreviewCache.getaProp(a_iTypeCode)
  if not voidp(t_rImage) then
    return t_rImage
  end if
  t_rMember = getMember("item_" & a_iTypeCode)
  if t_rMember.number > 0 then
    t_rImage = t_rMember.image.duplicate()
    m_iType_rPreviewCache.setaProp(a_iTypeCode, t_rImage)
    return t_rImage
  end if
  if voidp(m_rFurniMap) then
    m_rFurniMap = getThread(#room).component.m_rFurniMap
  end if
  t_rStruct = m_rFurniMap.GetByTypeCode(a_iTypeCode)
  t_iDir = 5
  repeat with t_rDir in t_rStruct.child
    if integer(t_rDir.param["NUM"]) = t_iDir then
      exit repeat
    end if
  end repeat
  if voidp(t_rDir) then
    error(this, "Item definition not complete:" && a_iTypeCode && "!", #_RenderFurniPreview)
    return image(0, 0, 32)
  end if
  t_rImage = image(256, 256, 32)
  t_rImage.fill(t_rImage.rect, rgb(0, 0, 0))
  t_rAlpha = image(256, 256, 8, #grayscale)
  t_mp_iZ_rBlock = [:]
  t_iDivX = t_rImage.width / 2
  t_iDivY = t_rImage.height / 2
  t_rcDirty = rect(t_iDivX, t_iDivY, t_iDivX, t_iDivY)
  t_iItemSize = value(t_rStruct.param["TILESIZE"])
  repeat with t_rBlock in t_rDir.child
    t_iX = integer(t_rBlock.param["X"]) * t_iItemSize
    t_iY = integer(t_rBlock.param["Z"]) * t_iItemSize
    t_mp_iZ_rBlock.addProp(t_iX + t_iY, t_rBlock)
  end repeat
  t_mp_iZ_rBlock.sort()
  repeat with t_rBlock in t_mp_iZ_rBlock
    t_fX = integer(t_rBlock.param["X"]) * t_iItemSize
    t_fY = integer(t_rBlock.param["Y"]) * t_iItemSize
    t_fXs = t_fX - t_fY
    t_fYs = 0.5 * (t_fX + t_fY)
    t_iOffX = integer(t_fXs) + t_iDivX
    t_iOffY = integer(t_fYs) + t_iDivY
    repeat with t_rSpr in t_rBlock.child
      t_rMember = getMember(t_rSpr.param["GFX"])
      if voidp(t_rMember) then
        next repeat
      end if
      if t_rMember.number < 1 then
        next repeat
      end if
      t_iX = t_iOffX - t_rMember.regPoint.locH
      t_iY = t_iOffY - t_rMember.regPoint.locV
      t_iX = t_iX + t_rSpr.param["X"]
      t_iY = t_iY + t_rSpr.param["Y"]
      t_rImg = t_rMember.image
      t_iInk = integer(t_rSpr.param["INK"])
      t_iBld = integer(t_rSpr.param["BLD"])
      t_rCol = rgb(t_rSpr.param["COL"])
      t_rBgc = rgb(t_rSpr.param["BGC"])
      t_bFlp = integer(t_rSpr.param["FLP"]) > 0
      if t_iBld then
        t_rcImg = t_rImg.rect
        t_rAlp = t_rImg.extractAlpha()
        if not ilk(t_rAlp, #image) then
          t_rAlp = image(1, 1, 8, #grayscale)
        end if
        if t_bFlp then
          t_rQuad = [point(t_rImg.width, 0), point(0, 0), point(0, t_rImg.height), point(t_rImg.width, t_rImg.height)]
          t_rTmp = image(t_rImg.width, t_rImg.height, t_rImg.depth)
          t_rTmp.fill(t_rTmp.rect, rgb(0, 0, 0))
          t_rTmp.copyPixels(t_rImg, t_rQuad, t_rcImg, [#useFastQuads: 1])
          t_rImg = t_rTmp
          t_rQuad = [point(t_rAlp.width, 0), point(0, 0), point(0, t_rAlp.height), point(t_rAlp.width, t_rAlp.height)]
          t_rTmp = image(t_rAlp.width, t_rAlp.height, 8, #grayscale)
          t_rTmp.fill(t_rTmp.rect, rgb(0, 0, 0))
          t_rTmp.copyPixels(t_rAlp, t_rQuad, t_rcImg, [#useFastQuads: 1])
          t_rAlp = t_rTmp
          t_iX = t_iOffX - (t_rcImg.width - t_rMember.regPoint.locH) + t_rSpr.param["X"]
          if t_rImg.depth = 32 then
            t_rImg.setAlpha(t_rAlp)
            t_rImg.useAlpha = 1
          end if
        end if
        t_rcOff = [t_iX, t_iY, t_iX, t_iY]
        t_rImage.copyPixels(t_rImg, t_rcImg + t_rcOff, t_rcImg, [#ink: t_iInk, #blend: t_iBld, #color: t_rCol, #bgColor: t_rBgc, #useFastQuads: 1])
        t_rAlpha.copyPixels(t_rAlp, t_rcImg + t_rcOff, t_rcImg, [#ink: 39, #useFastQuads: 1])
        t_rcDirty = t_rcDirty.union(t_rcImg + t_rcOff)
      end if
    end repeat
  end repeat
  t_rImage.setAlpha(t_rAlpha)
  t_rImage.useAlpha = 1
  t_rImage = t_rImage.crop(t_rcDirty)
  m_iType_rPreviewCache.setaProp(a_iTypeCode, t_rImage)
  return t_rImage
end
on _FetchPinPreview this, a_mp_iType_rOutput, a_rCallback
  t_iCount = a_mp_iType_rOutput.count
  repeat with i = 1 to t_iCount
    t_iCode = a_mp_iType_rOutput.getPropAt(i)
    t_rThumb = m_iType_rPreviewCache.getaProp(t_iCode)
    if voidp(t_rThumb) then
      if t_iCode >= 12000 then
        t_rThumb = this._RenderPinPreview(t_iCode - 10000)
        if not voidp(t_rThumb) then
          t_rIcon = getMember("icon.singleuse_big").image
          t_rAlpha = t_rIcon.extractAlpha()
          t_rIconRect = t_rIcon.rect
          t_rAlphaRect = t_rAlpha.rect
          t_rBack = image(100, 128, 32)
          t_rAlpha2 = t_rBack.extractAlpha()
          t_rAlpha2.fill(t_rBack.rect, rgb(255, 255, 255))
          t_rBack.useAlpha = 0
          t_iOffX = (t_rBack.width - t_rThumb.width) / 2
          t_iOffY = (t_rBack.height - t_rThumb.height) / 2
          t_rAlpha2.copyPixels(t_rThumb.extractAlpha(), t_rThumb.rect + [t_iOffX, t_iOffY, t_iOffX, t_iOffY], t_rThumb.rect)
          t_rBack.copyPixels(t_rThumb, t_rThumb.rect + [t_iOffX, t_iOffY, t_iOffX, t_iOffY], t_rThumb.rect)
          t_rAlpha2.copyPixels(t_rAlpha, rect(t_rBack.width - t_rAlphaRect[3], 1, t_rBack.width, t_rAlphaRect[4] + 1), t_rAlphaRect, [#ink: 39, #useFastQuads: 1])
          t_rBack.copyPixels(t_rIcon, rect(t_rBack.width - t_rIconRect[3], 1, t_rBack.width, t_rIconRect[4] + 1), t_rIconRect, [#ink: 36, #useFastQuads: 1])
          t_rBack.setAlpha(t_rAlpha2)
          t_rBack.useAlpha = 1
          t_rThumb = t_rBack
          m_iType_rPreviewCache.setaProp(t_iCode, t_rThumb)
        end if
      else
        t_rThumb = this._RenderPinPreview(t_iCode)
      end if
    end if
    if ilk(a_mp_iType_rOutput[i]) = #propList then
      if ilk(t_rThumb) = #image then
        t_rThumb = t_rThumb.duplicate()
      else
        t_rThumb = image(1, 1, 32)
      end if
      this._RenderPinPreviewDetails(a_mp_iType_rOutput[i], t_rThumb)
    end if
    a_mp_iType_rOutput[i] = t_rThumb
  end repeat
  if not voidp(a_rCallback) then
    call(a_rCallback.method, [getObject(a_rCallback.client)], a_mp_iType_rOutput, a_rCallback)
  end if
end
on _FetchPinThumbnail this, a_mp_iType_rOutput, a_rCallback
  t_iCount = a_mp_iType_rOutput.count
  t_rIcon = getMember("icon.singleuse").image
  t_rAlpha = t_rIcon.extractAlpha()
  t_rRect = t_rIcon.rect
  t_rRectAlpha = t_rAlpha.rect
  repeat with i = 1 to t_iCount
    t_iType = a_mp_iType_rOutput.getPropAt(i)
    t_rThumb = m_iType_rThumbnailCache.getaProp(t_iType)
    if voidp(t_rThumb) then
      if t_iType >= 12000 then
        t_rThumb = this._ShrinkToThumbnail(this._RenderPinPreview(t_iType - 10000))
        if voidp(t_rThumb) then
          t_rThumb = image(1, 1, 32)
        end if
        t_rBack = image(40, 40, 32)
        t_rAlpha2 = t_rBack.extractAlpha()
        t_rAlpha2.fill(t_rBack.rect, rgb(255, 255, 255))
        t_rBack.useAlpha = 0
        t_iOffX = (t_rBack.width - t_rThumb.width) / 2
        t_iOffY = (t_rBack.height - t_rThumb.height) / 2
        t_rAlpha2.copyPixels(t_rThumb.extractAlpha(), t_rThumb.rect + [t_iOffX, t_iOffY, t_iOffX, t_iOffY], t_rThumb.rect)
        t_rBack.copyPixels(t_rThumb, t_rThumb.rect + [t_iOffX, t_iOffY, t_iOffX, t_iOffY], t_rThumb.rect)
        t_rAlpha2.copyPixels(t_rAlpha, rect(t_rThumb.width - t_rRectAlpha[3], 1, t_rThumb.width, t_rRectAlpha[4] + 1), t_rRectAlpha, [#ink: 39, #useFastQuads: 1])
        t_rBack.copyPixels(t_rIcon, rect(t_rThumb.width - t_rRect[3], 1, t_rThumb.width, t_rRect[4] + 1), t_rRect, [#ink: 36, #useFastQuads: 1])
        t_rBack.setAlpha(t_rAlpha2)
        t_rBack.useAlpha = 1
        t_rThumb = t_rBack
      else
        t_rThumb = this._ShrinkToThumbnail(this._RenderPinPreview(t_iType))
      end if
      m_iType_rThumbnailCache.setaProp(t_iType, t_rThumb)
    end if
    if ilk(a_mp_iType_rOutput[i]) = #propList then
      if ilk(t_rThumb) = #image then
        t_rThumb = t_rThumb.duplicate()
      else
        t_rThumb = image(1, 1, 32)
      end if
      this._RenderPinThumbnailDetails(a_mp_iType_rOutput[i], t_rThumb)
    end if
    a_mp_iType_rOutput[i] = t_rThumb
  end repeat
  if not voidp(a_rCallback) then
    call(a_rCallback.method, [getObject(a_rCallback.client)], a_mp_iType_rOutput, a_rCallback)
  end if
end
on _RenderPinThumbnailDetails this, a_rProps, a_rThumb
  if not voidp(a_rThumb) then
    t_iLevel = a_rProps[#level]
    if t_iLevel > 0 then
      t_rStar = getMember("inv.pin.star.thumb").image
      t_rRect = t_rStar.rect
      repeat with s = 1 to t_iLevel
        a_rThumb.copyPixels(t_rStar, t_rRect + [(s - 1) * (t_rRect.width + 1) + 3, 31, (s - 1) * (t_rRect.width + 1) + 3, 31], t_rRect, [#ink: 36, #useFastQuads: 1])
      end repeat
    else
      if t_iLevel < 0 then
        a_rThumb.useAlpha = 0
        t_sLevel = string(abs(t_iLevel))
        t_rText = getWriter(m_sWriterB).render(t_sLevel)
        t_rRect = t_rText.rect
        t_rcItemSize = a_rThumb.rect
        t_rcOff = rect(0, 0, 0, 0)
        t_rcRightCorner = t_rcOff + [t_rcItemSize[3] + 7, t_rcItemSize[4], t_rcItemSize[3] + 7, t_rcItemSize[4]]
        t_rcTextCorner = [-t_rRect[3], -t_rRect[4], -t_rRect[3], -t_rRect[4]]
        a_rThumb.copyPixels(t_rText, t_rRect + t_rcRightCorner + t_rcTextCorner, t_rRect, [#ink: 36, #useFastQuads: 1])
        t_rText = getWriter(m_sWriterA).render(t_sLevel)
        t_rRect = t_rText.rect
        t_rcTextCorner = t_rcTextCorner + [-1, -1, -1, -1]
        a_rThumb.copyPixels(t_rText, t_rRect + t_rcRightCorner + t_rcTextCorner, t_rRect, [#ink: 36, #useFastQuads: 1])
      end if
    end if
  end if
end
on _RenderPinPreview this, a_iTypeCode, a_rItem
  t_rImage = m_iType_rPreviewCache.getaProp(a_iTypeCode)
  if voidp(t_rImage) then
    t_rMember = getMember("item_" & a_iTypeCode)
    if t_rMember.number > 0 then
      t_rImage = t_rMember.image.duplicate()
      m_iType_rPreviewCache.setaProp(a_iTypeCode, t_rImage)
    end if
  end if
  return t_rImage
end
on _RenderPinPreviewDetails this, a_rProps, a_rThumb
  if not voidp(a_rThumb) then
    t_iLevel = a_rProps[#level]
    if t_iLevel > 0 then
      t_rStar = getMember("inv.pin.star.prev").image
      t_rRect = t_rStar.rect
      t_rcOff = [20, 115, 20, 115]
      repeat with s = 1 to t_iLevel
        a_rThumb.copyPixels(t_rStar, t_rRect + t_rcOff + [(s - 1) * (t_rRect.width + 2) + 3, 0, (s - 1) * (t_rRect.width + 2) + 3, 0], t_rRect, [#ink: 36, #useFastQuads: 1])
      end repeat
    else
      if t_iLevel < 0 then
        a_rThumb.useAlpha = 0
        t_sLevel = string(abs(t_iLevel))
        t_rText = getWriter(m_sWriterB).render(t_sLevel)
        t_rRect = t_rText.rect
        t_rcItemSize = a_rThumb.rect
        t_rcOff = rect(0, 0, 0, 0)
        t_rcRightCorner = t_rcOff + [t_rcItemSize[3] + 7, t_rcItemSize[4], t_rcItemSize[3] + 7, t_rcItemSize[4]]
        t_rcTextCorner = [-t_rRect[3], -t_rRect[4], -t_rRect[3], -t_rRect[4]]
        a_rThumb.copyPixels(t_rText, t_rRect + t_rcRightCorner + t_rcTextCorner, t_rRect, [#ink: 36, #useFastQuads: 1])
        t_rText = getWriter(m_sWriterA).render(t_sLevel)
        t_rRect = t_rText.rect
        t_rcTextCorner = t_rcTextCorner + [-1, -1, -1, -1]
        a_rThumb.copyPixels(t_rText, t_rRect + t_rcRightCorner + t_rcTextCorner, t_rRect, [#ink: 36, #useFastQuads: 1])
      end if
    end if
  end if
end
on _FetchPosterPreview this, a_mp_iType_rOutput, a_rCallback
  t_iTypeCode = a_mp_iType_rOutput.getPropAt(1)
  t_rImage = m_iType_rPreviewCache.getaProp(t_iTypeCode)
  if voidp(t_rImage) then
    t_rMember = getMember("item_" & t_iTypeCode & "_5")
    if t_rMember.number > 0 then
      t_rImage = t_rMember.image.duplicate()
      m_iType_rPreviewCache.setaProp(t_iTypeCode, t_rImage)
    end if
  end if
  a_mp_iType_rOutput[1] = t_rImage
  call(a_rCallback.method, [getObject(a_rCallback.client)], a_mp_iType_rOutput, a_rCallback)
end
on _FetchPosterThumbnail this, a_mp_iType_rOutput, a_rCallback
  t_iCount = a_mp_iType_rOutput.count
  repeat with i = 1 to t_iCount
    t_iTypeCode = a_mp_iType_rOutput.getPropAt(i)
    t_rImage = m_iType_rThumbnailCache.getaProp(t_iTypeCode)
    if voidp(t_rImage) then
      t_rMember = getMember("item_" & t_iTypeCode & "_5")
      if t_rMember.number > 0 then
        t_rImage = this._ShrinkToThumbnail(t_rMember.image)
        m_iType_rThumbnailCache.setaProp(t_iTypeCode, t_rImage)
      end if
    end if
    a_mp_iType_rOutput[i] = t_rImage
  end repeat
  call(a_rCallback.method, [getObject(a_rCallback.client)], a_mp_iType_rOutput, a_rCallback)
end
on _ShrinkToThumbnail this, a_rImage
  if ilk(a_rImage) = #image then
    t_rThumb = image(m_rcThumbRect.width, m_rcThumbRect.height, 32)
    t_rBlack = image(t_rThumb.width, t_rThumb.height, 8, #grayscale)
    t_rBlack.fill(t_rBlack.rect, rgb(0, 0, 0))
    t_rThumb.setAlpha(t_rBlack)
    t_rThumb.useAlpha = 1
    if voidp(t_rThumb) then
      t_rThumb = image(0, 0, 32)
    end if
    if voidp(a_rImage) then
      a_rImage = image(0, 0, 32)
    end if
    if a_rImage.width = 0 or a_rImage.height = 0 then
      return t_rThumb
    end if
    if a_rImage.width > a_rImage.height then
      t_iScale = float(t_rThumb.width) / a_rImage.width
      t_rcRect = rect(0, 0, t_rThumb.width, t_iScale * a_rImage.height)
      t_rcOff = [0, (t_rThumb.height - t_rcRect.height) / 2, 0, (t_rThumb.height - t_rcRect.height) / 2]
    else
      t_iScale = float(t_rThumb.width) / a_rImage.height
      t_rcRect = rect(0, 0, t_iScale * a_rImage.width, t_rThumb.height)
      t_rcOff = [(t_rThumb.width - t_rcRect.width) / 2, 0, (t_rThumb.width - t_rcRect.width) / 2, 0]
    end if
    t_rThumb.copyPixels(a_rImage, t_rcRect + t_rcOff, a_rImage.rect, [#useFastQuads: 1])
    return t_rThumb
  end if
end