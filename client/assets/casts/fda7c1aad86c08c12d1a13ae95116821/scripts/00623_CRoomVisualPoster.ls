-- Script
property m_ar_rSprites
property m_rHighLight
property m_mp_blinkStat
property m_bSelected

on construct this
  m_ar_rSprites = []
  m_rHighLight = [#member: VOID, #sprite: VOID, #topZ: -400000000, #lastDir: -1]
  m_mp_blinkStat = [#cur: 0, #min: 0, #max: 50, #inc: 10]
  m_bSelected = 0
  return 1
end
on deconstruct this
  this.RemoveHighlighters()
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
on SetBlend this, a_iBlend
  repeat with t_rSprite in m_ar_rSprites
    t_rSprite.blend = a_iBlend
  end repeat
end
on SetSprites this
  t_rObj = this.getObject()
  t_ar_rSprites = t_rObj.GetParam("SPRITES")
  t_veRel = t_rObj.GetRelPos()
  t_veScr = t_rObj.GetScrPos()
  t_fXs = t_veScr.x
  t_fYs = t_veScr.y
  t_fZs = t_veScr.z
  if voidp(m_ar_rSprites) then
    m_ar_rSprites = []
  end if
  if objectExists("RoomEventProcessor") then
    t_rSprMgr = getObject("RoomEventProcessor")
  else
    t_rSprMgr = createObject("RoomEventProcessor", "CRoomMouseEventProcessor")
  end if
  repeat with i = 1 to t_ar_rSprites.count
    t_rStruct = t_ar_rSprites[i].param
    if m_ar_rSprites.count < i then
      t_rSpr = t_rSprMgr.CreateSprite(t_rObj.GetKey(), 1)
      m_ar_rSprites.add(t_rSpr)
    else
      t_rSpr = m_ar_rSprites[i]
    end if
    t_rSpr.member = getMember(t_rStruct["GFX"])
    t_rSpr.width = t_rSpr.member.width
    t_rSpr.height = t_rSpr.member.height
    t_rSpr.ink = integer(t_rStruct["INK"])
    t_rSpr.color = rgb(t_rStruct["COL"])
    t_rSpr.bgColor = rgb(t_rStruct["BGC"])
    t_rSpr.locH = t_fXs + integer(t_rStruct["X"])
    t_rSpr.locV = t_fYs + integer(t_rStruct["Y"])
    t_rSpr.locZ = t_fZs + integer(t_rStruct["Z"]) + 1
    t_rSpr.flipH = integer(t_rStruct["FLP"])
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
end
on setcursor this, a_voCursor, a_ar_spritesToApply
  repeat with iSpr in a_ar_spritesToApply
    m_ar_rSprites[iSpr].cursor = a_voCursor
  end repeat
end
on update this, a_rObj
  t_rObj = this.getObject()
  if the runMode = "Author" then
    t_vePos = t_rObj.GetAbsPos()
    t_veOff = t_rObj.GetContext().GetScrPos()
    t_rRGB = rgb(20, 255, 20)
    t_iDir = integer(t_rObj.GetParam("DIR"))
    t_rStruct = t_rObj.GetParam("STRUCT")
    repeat with t_rDir in t_rStruct.child
      if integer(t_rDir.param["NUM"]) = t_iDir then
        t_rBlocks = t_rDir.child
        exit repeat
      end if
    end repeat
    t_rBlock = t_rBlocks[1]
    t_iXD = integer(t_rBlock.param["XD"])
    t_iYD = integer(t_rBlock.param["YD"])
    t_iZD = integer(t_rBlock.param["ZD"])
    if t_iDir = 3 then
      t_veA = t_veOff + AbsToScr(t_vePos + vector(0, t_iYD, t_iZD))
      t_veB = t_veOff + AbsToScr(t_vePos + vector(0, 0, t_iZD))
      t_veC = t_veOff + AbsToScr(t_vePos)
      t_veD = t_veOff + AbsToScr(t_vePos + vector(0, t_iYD, 0))
    else
      t_veA = t_veOff + AbsToScr(t_vePos + vector(0, 0, t_iZD))
      t_veB = t_veOff + AbsToScr(t_vePos + vector(t_iXD, 0, t_iZD))
      t_veC = t_veOff + AbsToScr(t_vePos + vector(t_iXD, 0, 0))
      t_veD = t_veOff + AbsToScr(t_vePos)
    end if
    t_ptA = point(t_veA.x, t_veA.y)
    t_ptB = point(t_veB.x, t_veB.y)
    t_ptC = point(t_veC.x, t_veC.y)
    t_ptD = point(t_veD.x, t_veD.y)
    t_rImage = (the stage).image
    t_rImage.draw(t_ptA, t_ptB, rgb(255, 20, 20))
    t_rImage.draw(t_ptB, t_ptC, rgb(255, 20, 20))
    t_rImage.draw(t_ptC, t_ptD, rgb(255, 20, 20))
    t_rImage.draw(t_ptD, t_ptA, rgb(255, 20, 20))
  end if
  if m_bSelected then
    t_iDir = integer(t_rObj.GetParam("DIR"))
    if t_iDir <> m_rHighLight.lastDir then
      this.CreateHighlighters()
      m_rHighLight.lastDir = t_iDir
    end if
    this.AdjustHighlighters(m_mp_blinkStat.cur)
    m_mp_blinkStat.cur = m_mp_blinkStat.cur + m_mp_blinkStat.inc
    if m_mp_blinkStat.cur <= m_mp_blinkStat.min or m_mp_blinkStat.cur >= m_mp_blinkStat.max then
      m_mp_blinkStat.inc = -m_mp_blinkStat.inc
      m_mp_blinkStat.cur = m_mp_blinkStat.cur + m_mp_blinkStat.inc
    end if
    t_rObj = this.getObject()
    t_veScr = t_rObj.GetScrPos()
    m_rHighLight.sprite.locH = t_veScr.x
    m_rHighLight.sprite.locV = t_veScr.y
    m_rHighLight.sprite.locZ = t_veScr.z + 2
  end if
end
on select this, a_bSel
  m_bSelected = a_bSel
  if m_bSelected then
    this.CreateHighlighters()
  else
    this.RemoveHighlighters()
  end if
end
on IsSelected this
  return m_bSelected
end
on CreateHighlighters this
  t_rObj = this.getObject()
  t_ar_rSprites = t_rObj.GetParam("SPRITES")
  t_veScr = t_rObj.GetScrPos()
  m_rHighLight.topZ = -400000000
  tSize = rect(0, 0, 0, 0)
  t_ar_sprSize = []
  repeat with i = 1 to t_ar_rSprites.count
    t_rStruct = t_ar_rSprites[i].param
    tSprSize = rect(0, 0, 0, 0)
    tmember = getMember(t_rStruct["GFX"])
    if not voidp(tmember.image) then
      tRegPoint = tmember.regPoint
      tSprSize.right = tmember.width
      tSprSize.bottom = tmember.height
      if integer(t_rStruct["FLP"]) then
        tRegPoint.locH = tSprSize.right - tRegPoint.locH
      end if
      tSprSize.left = tSprSize.left - tRegPoint.locH
      tSprSize.right = tSprSize.right - tRegPoint.locH
      tSprSize.top = tSprSize.top - tRegPoint.locV
      tSprSize.bottom = tSprSize.bottom - tRegPoint.locV
      if tSprSize.left < tSize.left then
        tSize.left = tSprSize.left
      end if
      if tSprSize.top < tSize.top then
        tSize.top = tSprSize.top
      end if
      if tSprSize.right > tSize.right then
        tSize.right = tSprSize.right
      end if
      if tSprSize.bottom > tSize.bottom then
        tSize.bottom = tSprSize.bottom
      end if
      tZ = t_veScr.z + integer(t_rStruct["Z"]) + 1
      if tZ > m_rHighLight.topZ then
        m_rHighLight.topZ = tZ
      end if
    end if
    t_ar_sprSize.append(tSprSize)
  end repeat
  this.RemoveHighlighters()
  m_rHighLight.member = member(createMember("HighlighterFor" & this, #bitmap))
  m_rHighLight.member.image = image(tSize.right - tSize.left, tSize.bottom - tSize.top, 32)
  t_alphaImg = image(tSize.right - tSize.left, tSize.bottom - tSize.top, 8)
  tFillImage = m_rHighLight.member.image.duplicate()
  tFillImage.fill(tFillImage.rect, [#shapeType: #rect, #color: rgb("#EFEFEF")])
  repeat with i = 1 to t_ar_rSprites.count
    t_rStruct = t_ar_rSprites[i].param
    tmember = getMember(t_rStruct["GFX"])
    if not voidp(tmember.image) then
      tSrcRect = tmember.image.rect
      tdestrect = rect(t_ar_sprSize[i].left - tSize.left, t_ar_sprSize[i].top - tSize.top, t_ar_sprSize[i].right - tSize.left, t_ar_sprSize[i].bottom - tSize.top)
      tDestquad = rectToQuad(tdestrect)
      if integer(t_rStruct["FLP"]) then
        tDestquad = flipQuadH(tDestquad)
      end if
      t_sprAlpha = tmember.image.extractAlpha()
      if t_sprAlpha <> 0 then
        ClipAlphaLowValues(t_sprAlpha, 150)
        m_rHighLight.member.image.copyPixels(tFillImage, tDestquad, tSrcRect)
        t_alphaImg.copyPixels(t_sprAlpha, tDestquad, tSrcRect, [#ink: 39, #useFastQuads: 0])
      end if
    end if
  end repeat
  m_rHighLight.member.image.setAlpha(t_alphaImg)
  m_rHighLight.member.useAlpha = 1
  m_rHighLight.sprite = sprite(reserveSprite())
  m_rHighLight.sprite.member = m_rHighLight.member
  m_rHighLight.sprite.width = m_rHighLight.sprite.member.width
  m_rHighLight.sprite.height = m_rHighLight.sprite.member.height
  m_rHighLight.sprite.member.regPoint = point(-tSize.left, -tSize.top)
  m_rHighLight.sprite.locH = t_veScr.x
  m_rHighLight.sprite.locV = t_veScr.y
  m_rHighLight.sprite.locZ = m_rHighLight.topZ + 1
  m_rHighLight.lastDir = integer(t_rObj.GetParam("DIR"))
end
on RemoveHighlighters this
  if not voidp(m_rHighLight.sprite) then
    releaseSprite(m_rHighLight.sprite.spriteNum)
    m_rHighLight.sprite = VOID
  end if
  if not voidp(m_rHighLight.member) then
    removeMember(m_rHighLight.member.name)
    m_rHighLight.member = VOID
  end if
end
on AdjustHighlighters this, a_blend, a_ink
  if not voidp(a_blend) then
    m_rHighLight.sprite.blend = a_blend
  end if
  if not voidp(a_ink) then
    m_rHighLight.sprite.ink = a_ink
  end if
end