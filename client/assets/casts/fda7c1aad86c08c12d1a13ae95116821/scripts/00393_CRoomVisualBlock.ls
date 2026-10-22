-- Script
property m_bLoading
property m_ar_rSprites
property m_rHighLight

on construct this
  m_bLoading = 1
  m_ar_rSprites = []
  m_rHighLight = [#member: VOID, #sprite: VOID, #topZ: -400000000, #type: #select]
  return 1
end
on deconstruct this
  this.RemoveHighlighter()
  if objectExists("RoomEventProcessor") then
    t_rSprMgr = getObject("RoomEventProcessor")
  else
    t_rSprMgr = createObject("RoomEventProcessor", "CRoomMouseEventProcessor")
  end if
  repeat with t_rSprite in m_ar_rSprites
    t_rSprMgr.RemoveSprite(t_rSprite)
  end repeat
  m_ar_rSprites = []
  return 1
end
on SetSprites this
  t_rObj = this.getObject()
  t_iTileSize = t_rObj.GetContext().GetParam("TILESIZE")
  t_fItemSize = float(t_rObj.GetParam("TILESIZE"))
  if voidp(t_fItemSize) then
    t_fItemSize = 32.0
  end if
  if objectExists("RoomEventProcessor") then
    t_rSprMgr = getObject("RoomEventProcessor")
  else
    t_rSprMgr = createObject("RoomEventProcessor", "CRoomMouseEventProcessor")
  end if
  t_iTypeCode = t_rObj.GetParam("ELEMENT_TYPE")
  m_bLoading = not getObject("RoomItemAssetManager").IsItemReady(t_iTypeCode)
  if m_bLoading then
    if t_rObj.GetParam("SPRITES").count > 0 then
      t_ar_rSprites = [EMPTY: [#type: "SPR", #value: EMPTY, #param: ["GFX": "loadingfx_0", "FLP": "0", "X": "0", "Y": "0", "Z": "0", "COL": "000000", "BGC": "FFFFFF", "BLD": "100", "INK": "8"], #child: [:]]]
    else
      t_ar_rSprites = [:]
    end if
  else
    t_ar_rSprites = t_rObj.GetParam("SPRITES")
  end if
  t_veScr = t_rObj.GetScrPos()
  t_fXs = t_veScr.x
  t_fYs = t_veScr.y
  t_fZs = t_veScr.z
  m_rHighLight.topZ = -400000000
  repeat with i = 1 to t_ar_rSprites.count
    t_rStruct = t_ar_rSprites[i].param
    if m_ar_rSprites.count < i then
      if value(t_rStruct.getaProp("NOCLK")) = 1 then
        t_rSpr = sprite(reserveSprite())
        t_rSpr.scriptInstanceList = []
      else
        t_rSpr = t_rSprMgr.CreateSprite(t_rObj.GetKey(), 1)
      end if
      m_ar_rSprites.add(t_rSpr)
    else
      t_rSpr = m_ar_rSprites[i]
    end if
    t_iMember = getmemnum(t_rStruct["GFX"])
    if t_iMember < 1 then
      error(this, "Item graphics member not present:" && t_rStruct["GFX"], #SetSprites)
      t_iMember = getmemnum("null")
    end if
    t_rSpr.member = member(t_iMember)
    t_rSpr.ink = integer(t_rStruct["INK"])
    t_rSpr.color = rgb(t_rStruct["COL"])
    t_rSpr.bgColor = rgb(t_rStruct["BGC"])
    t_rSpr.flipH = integer(t_rStruct["FLP"])
    t_rSpr.blend = integer(t_rStruct["BLD"])
    t_fXPost = float(t_rStruct["X"])
    t_fYPost = float(t_rStruct["Y"])
    if t_iTileSize <> t_fItemSize then
      t_fRatio = t_iTileSize / t_fItemSize
      t_rSpr.width = integer(t_rSpr.member.image.width * t_fRatio)
      t_rSpr.height = integer(t_rSpr.member.image.height * t_fRatio)
      t_fXPost = t_fXPost * t_fRatio
      t_fYPost = t_fYPost * t_fRatio
    else
      t_rSpr.width = t_rSpr.member.width
      t_rSpr.height = t_rSpr.member.height
    end if
    t_rSpr.locH = t_fXs + integer(t_fXPost)
    t_rSpr.locV = t_fYs + integer(t_fYPost)
    t_rSpr.locZ = t_fZs + integer(t_rStruct["Z"]) + 1
    if t_rSpr.locZ > m_rHighLight.topZ then
      m_rHighLight.topZ = t_rSpr.locZ
    end if
  end repeat
  repeat while 1
    if m_ar_rSprites.count > t_ar_rSprites.count then
      if not t_rSprMgr.RemoveSprite(m_ar_rSprites.getLast()) then
        error(this, "Element's sprites are out of sync!", #SetSprites)
        exit repeat
      end if
      m_ar_rSprites.deleteAt(m_ar_rSprites.count)
      next repeat
    end if
    exit repeat
  end repeat
  if not voidp(m_rHighLight.sprite) then
    m_rHighLight.sprite.locH = t_fXs
    m_rHighLight.sprite.locV = t_fYs
    m_rHighLight.sprite.locZ = m_rHighLight.topZ + 1
  end if
end
on GetSprites this
  return m_ar_rSprites
end
on setcursor this, a_voCursor, a_ar_rSpritesToApply
  repeat with t_iSpr in a_ar_rSpritesToApply
    if t_iSpr <= m_ar_rSprites.count then
      m_ar_rSprites[t_iSpr].cursor = a_voCursor
      next repeat
    end if
    exit repeat
  end repeat
end
on IsReady this
  return not m_bLoading
end
on CreateHighlighter this
  t_rObj = this.getObject()
  t_iTileSize = t_rObj.GetContext().GetParam("TILESIZE")
  t_ar_rSprites = t_rObj.GetParam("SPRITES")
  t_veScr = t_rObj.GetScrPos()
  m_rHighLight.topZ = -400000000
  tSize = rect(0, 0, 0, 0)
  t_ar_sprSize = []
  repeat with i = 1 to t_ar_rSprites.count
    t_rStruct = t_ar_rSprites[i].param
    t_rSprSize = rect(0, 0, 0, 0)
    tmember = getMember(t_rStruct["GFX"])
    if not voidp(tmember.image) then
      tRegPoint = tmember.regPoint
      t_rSprSize.right = tmember.width
      t_rSprSize.bottom = tmember.height
      if integer(t_rStruct["FLP"]) then
        tRegPoint.locH = t_rSprSize.right - tRegPoint.locH
      end if
      t_rSprSize.left = t_rSprSize.left - tRegPoint.locH
      t_rSprSize.right = t_rSprSize.right - tRegPoint.locH
      t_rSprSize.top = t_rSprSize.top - tRegPoint.locV
      t_rSprSize.bottom = t_rSprSize.bottom - tRegPoint.locV
      if not voidp(t_rStruct.getaProp("X")) then
        tOfsX = value(t_rStruct["X"])
        t_rSprSize.left = t_rSprSize.left + tOfsX
        t_rSprSize.right = t_rSprSize.right + tOfsX
      end if
      if not voidp(t_rStruct.getaProp("Y")) then
        tOfsY = value(t_rStruct["Y"])
        t_rSprSize.top = t_rSprSize.top + tOfsY
        t_rSprSize.bottom = t_rSprSize.bottom + tOfsY
      end if
      if t_rSprSize.left < tSize.left then
        tSize.left = t_rSprSize.left
      end if
      if t_rSprSize.top < tSize.top then
        tSize.top = t_rSprSize.top
      end if
      if t_rSprSize.right > tSize.right then
        tSize.right = t_rSprSize.right
      end if
      if t_rSprSize.bottom > tSize.bottom then
        tSize.bottom = t_rSprSize.bottom
      end if
      tZ = t_veScr.z + integer(t_rStruct["Z"]) + 1
      if tZ > m_rHighLight.topZ then
        m_rHighLight.topZ = tZ
      end if
    end if
    t_ar_sprSize.append(t_rSprSize)
  end repeat
  this.RemoveHighlighter()
  m_rHighLight.member = member(createMember("HighlighterFor" & this, #bitmap))
  m_rHighLight.member.image = image(tSize.right - tSize.left, tSize.bottom - tSize.top, 32)
  t_alphaImg = image(tSize.right - tSize.left, tSize.bottom - tSize.top, 8)
  t_rFillImage = m_rHighLight.member.image.duplicate()
  t_rFillImage.fill(t_rFillImage.rect, [#shapeType: #rect, #color: rgb("#EFEFEF")])
  repeat with i = 1 to t_ar_rSprites.count
    t_rStruct = t_ar_rSprites[i].param
    t_rMember = getMember(t_rStruct["GFX"])
    if not voidp(t_rMember.image) then
      tSrcRect = t_rMember.image.rect
      tdestrect = rect(t_ar_sprSize[i].left - tSize.left, t_ar_sprSize[i].top - tSize.top, t_ar_sprSize[i].right - tSize.left, t_ar_sprSize[i].bottom - tSize.top)
      tDestquad = rectToQuad(tdestrect)
      if integer(t_rStruct["FLP"]) then
        tDestquad = flipQuadH(tDestquad)
      end if
      t_rSprAlpha = t_rMember.image.extractAlpha()
      if t_rSprAlpha <> 0 then
        ClipAlphaLowValues(t_rSprAlpha, 150)
        m_rHighLight.member.image.copyPixels(t_rFillImage, tDestquad, tSrcRect)
        t_alphaImg.copyPixels(t_rSprAlpha, tDestquad, tSrcRect, [#ink: 39, #useFastQuads: 0])
      end if
    end if
  end repeat
  t_rObj = this.getObject()
  t_iTileSize = t_rObj.GetContext().GetParam("TILESIZE")
  t_fItemSize = float(t_rObj.GetParam("TILESIZE"))
  if voidp(t_fItemSize) then
    t_fItemSize = 32.0
  end if
  m_rHighLight.member.image.setAlpha(t_alphaImg)
  m_rHighLight.member.useAlpha = 1
  m_rHighLight.sprite = sprite(reserveSprite())
  m_rHighLight.sprite.member = m_rHighLight.member
  if t_iTileSize <> t_fItemSize then
    t_fScaling = t_iTileSize / t_fItemSize
    m_rHighLight.sprite.width = m_rHighLight.sprite.member.width * t_fScaling
    m_rHighLight.sprite.height = m_rHighLight.sprite.member.height * t_fScaling
  else
    m_rHighLight.sprite.width = m_rHighLight.sprite.member.width
    m_rHighLight.sprite.height = m_rHighLight.sprite.member.height
  end if
  m_rHighLight.sprite.member.regPoint = point(-tSize.left, -tSize.top)
  m_rHighLight.sprite.locH = t_veScr.x
  m_rHighLight.sprite.locV = t_veScr.y
  m_rHighLight.sprite.locZ = m_rHighLight.topZ + 1
end
on RemoveHighlighter this
  if not voidp(m_rHighLight.sprite) then
    releaseSprite(m_rHighLight.sprite.spriteNum)
    m_rHighLight.sprite = VOID
  end if
  if not voidp(m_rHighLight.member) then
    removeMember(m_rHighLight.member.name)
    m_rHighLight.member = VOID
  end if
end
on AdjustHighlighter this, a_iBlend, a_kInk
  if not voidp(a_iBlend) then
    m_rHighLight.sprite.blend = a_iBlend
  end if
  if not voidp(a_kInk) then
    m_rHighLight.sprite.ink = a_kInk
  end if
end
on ChangeHighlighterType this, a_kType
  case a_kType of
    #select:
      t_rColor = rgb("#EFEFEF")
    #teleportpair:
      t_rColor = rgb("#7070EF")

  end case
  return error(this, "Invalid highlighter type:" && a_kType, #ChangeHighlighterType)
  m_rHighLight.type = a_kType
  t_rAlpha = m_rHighLight.sprite.member.image.extractAlpha()
  t_rImage = m_rHighLight.sprite.member.image
  t_rImage.fill(t_rImage.rect, [#shapeType: #rect, #color: t_rColor])
  t_rImage.setAlpha(t_rAlpha)
end