-- Script
property m_bLoading
property m_ar_rSprites
property m_yState
property m_iStateStart
property m_iPopTime

on construct this
  m_bLoading = 1
  m_yState = #appearing
  m_iStateStart = 0
  m_iPopTime = 250
  m_ar_rSprites = []
  return 1
end
on deconstruct this
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
  t_iTypeCode = t_rObj.GetParam("TYPE")
  t_bLoaded = getObject("RoomItemAssetManager").IsItemReady(t_iTypeCode)
  t_iRatio = t_iTileSize / 32.0
  t_veScr = t_rObj.GetScrPos()
  t_fXs = t_veScr.x
  t_fYs = t_veScr.y
  t_fZs = t_veScr.z
  if objectExists("RoomEventProcessor") then
    t_rSprMgr = getObject("RoomEventProcessor")
  else
    t_rSprMgr = createObject("RoomEventProcessor", "CRoomMouseEventProcessor")
  end if
  if t_bLoaded then
    t_ar_rSprites = t_rObj.GetParam("SPRITES")
    m_bLoading = 0
  else
    t_ar_rSprites = [EMPTY: [#type: "SPR", #value: EMPTY, #param: ["GFX": "loadingfx_0", "FLP": "0", "X": "0", "Y": "0", "Z": "0", "COL": "000000", "BGC": "FFFFFF", "BLD": "100", "INK": "8"], #child: [:]]]
    m_bLoading = 1
  end if
  repeat with i = 1 to t_ar_rSprites.count
    t_rStruct = t_ar_rSprites[i].param
    if m_ar_rSprites.count < i then
      t_rSpr = t_rSprMgr.CreateSprite(t_rObj.GetKey(), 1)
      m_ar_rSprites.add(t_rSpr)
    else
      t_rSpr = m_ar_rSprites[i]
    end if
    t_iMember = getmemnum(t_rStruct["GFX"])
    if t_iMember < 1 then
      put "Item graphics member not present:" && t_rStruct["GFX"]
      t_iMember = getmemnum("item_placeholder")
    end if
    t_rSpr.member = member(t_iMember)
    t_rSpr.ink = integer(t_rStruct["INK"])
    t_rSpr.color = rgb(t_rStruct["COL"])
    t_rSpr.bgColor = rgb(t_rStruct["BGC"])
    t_rSpr.locH = t_fXs + integer(t_rStruct["X"])
    t_rSpr.locV = t_fYs + integer(t_rStruct["Y"])
    t_rSpr.locZ = t_fZs + integer(t_rStruct["Z"]) + 1 - 10
    t_rSpr.flipH = integer(t_rStruct["FLP"])
    t_rSpr.blend = integer(t_rStruct["BLD"])
    if t_iTileSize <> 32 and t_iTileSize <> 16 then
      t_rSpr.width = integer(t_rSpr.member.image.width * t_iRatio)
      t_rSpr.height = integer(t_rSpr.member.image.height * t_iRatio)
      next repeat
    end if
    t_rSpr.width = t_rSpr.member.width
    t_rSpr.height = t_rSpr.member.height
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
  m_iStateStart = the milliSeconds
end
on GetSprites this
  return m_ar_rSprites
end
on setcursor this, a_voCursor, a_ar_iSpritesToApply
  repeat with iSpr in a_ar_iSpritesToApply
    if iSpr <= m_ar_rSprites.count then
      m_ar_rSprites[iSpr].cursor = a_voCursor
      next repeat
    end if
    exit repeat
  end repeat
end
on IsReady this
  return not m_bLoading
end
on AssetsLoaded this
  this.SetSprites()
end
on update this
  if m_yState = #stable then
    return 1
  end if
  if m_ar_rSprites.count <= 0 then
    return 1
  end if
  tTimeNow = the milliSeconds
  tElapsedMS = tTimeNow - m_iStateStart
  if tElapsedMS > m_iPopTime then
    if m_yState = #appearing then
      m_yState = #stable
      this.ScaleSprites(1.0)
      return 1
    end if
    if m_yState = #disappearing then
      return 1
    end if
  end if
  if m_yState = #appearing then
    this.ScaleSprites(sin((PI / 2 + PI / 4) * (float(tElapsedMS) / m_iPopTime)) / 1.8017749786377)
  else
    if m_yState = #disappearing then
      this.ScaleSprites(sin(PI / 2 * (1.0 - float(tElapsedMS) / m_iPopTime)))
    end if
  end if
end
on DisAppear this
  m_iStateStart = the milliSeconds
  m_yState = #disappearing
end
on ScaleSprites this, a_fScale
  t_rObj = this.getObject()
  t_iTileSize = t_rObj.GetContext().GetParam("TILESIZE")
  t_iRatio = t_iTileSize / 32.0
  repeat with t_rSpr in m_ar_rSprites
    t_rSpr.width = integer(t_rSpr.member.image.width * t_iRatio * a_fScale)
    t_rSpr.height = integer(t_rSpr.member.image.height * t_iRatio * a_fScale)
  end repeat
end