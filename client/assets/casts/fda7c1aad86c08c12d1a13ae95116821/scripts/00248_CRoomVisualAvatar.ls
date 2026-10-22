-- Script
property m_rMember
property m_rCanvasSpr
property m_rShadowSpr
property m_rRenderer
property m_iTileSize
property m_veLastScr
property m_ar_AvatarOutlook
property m_sBoolAvatarOnTile

on construct this
  m_rMember = VOID
  m_rCanvasSpr = VOID
  m_rShadowSpr = VOID
  m_rRenderer = VOID
  m_iTileSize = 32
  m_veLastScr = vector()
  m_ar_AvatarOutlook = VOID
  m_sBoolAvatarOnTile = 1
  return 1
end
on deconstruct this
  if objectp(m_rRenderer) then
    m_rRenderer.deconstruct()
    m_rRenderer = VOID
  end if
  if m_rMember.ilk = #member then
    removeMember(m_rMember.name)
    m_rMember = VOID
  end if
  if objectExists("RoomEventProcessor") then
    t_rSprMgr = getObject("RoomEventProcessor")
  else
    t_rSprMgr = createObject("RoomEventProcessor", "CRoomMouseEventProcessor")
  end if
  if m_rCanvasSpr.ilk = #sprite then
    t_rSprMgr.RemoveSprite(m_rCanvasSpr)
    m_rCanvasSpr = VOID
  end if
  if m_rShadowSpr.ilk = #sprite then
    t_rSprMgr.RemoveSprite(m_rShadowSpr)
    m_rShadowSpr = VOID
  end if
  return 1
end
on SetRenderer this, a_rRenderer
  m_rRenderer = a_rRenderer
  m_iTileSize = integer(this.m_rObject.GetContext().GetParam("TILESIZE"))
  if voidp(m_rMember) then
    t_sMemName = this.getObject().GetKey() && "Canvas"
    if createMember(t_sMemName, #bitmap) then
      m_rMember = getMember(t_sMemName)
      t_iHeight = getVariable("avatarHeight", 160)
      t_iWidth = getVariable("avatarWidth", 80)
      m_rMember.image = image(t_iWidth, t_iHeight, 32)
    else
      return error(this, "Failed to create canvas resource!", #SetRenderer)
    end if
  end if
  if objectExists("RoomEventProcessor") then
    t_rSprMgr = getObject("RoomEventProcessor")
  else
    t_rSprMgr = createObject("RoomEventProcessor", "CRoomMouseEventProcessor")
  end if
  t_veScr = this.getObject().GetScrPos()
  if voidp(m_rShadowSpr) then
    m_rShadowSpr = t_rSprMgr.CreateSprite(this.getObject().GetKey(), 0)
    m_rShadowSpr.member = getMember("room_avatar_shadow")
    m_rShadowSpr.width = m_rShadowSpr.member.width
    m_rShadowSpr.height = m_rShadowSpr.member.height
    m_rShadowSpr.ink = 39
    m_rShadowSpr.blend = 50
    m_rShadowSpr.locH = t_veScr.x
    m_rShadowSpr.locV = t_veScr.y
    m_rShadowSpr.locZ = t_veScr.z
  end if
  if voidp(m_rCanvasSpr) then
    m_rCanvasSpr = t_rSprMgr.CreateSprite(this.getObject().GetKey(), 1)
    m_rCanvasSpr.member = m_rMember
    m_rCanvasSpr.width = m_rCanvasSpr.member.width
    m_rCanvasSpr.height = m_rCanvasSpr.member.height
    m_rCanvasSpr.ink = 8
    m_rCanvasSpr.locH = t_veScr.x
    m_rCanvasSpr.locV = t_veScr.y
    m_rCanvasSpr.locZ = t_veScr.z + 1
  end if
  a_rRenderer.SetSpriteLoc(t_veScr)
end
on GetRenderer this
  return m_rRenderer
end
on Actions this, a_ar_iActions
  if objectp(m_rRenderer) then
    m_rRenderer.Action(a_ar_iActions)
  else
    error(this, "Renderer not defined!", #Actions)
  end if
end
on update this
  if objectp(m_rRenderer) then
    m_rRenderer.update(m_rCanvasSpr)
    t_veScr = this.getObject().GetScrPos()
    t_iFactor = this.getObject().GetFactor().m_iFactor
    if not voidp(t_iFactor) then
      t_veScr.z = this.getObject().GetFactor().m_rZTransfer.get(t_iFactor)
    end if
    if m_veLastScr <> t_veScr then
      t_fXs = t_veScr.x
      t_fYs = t_veScr.y
      t_fZs = t_veScr.z
      m_rShadowSpr.locH = t_fXs
      m_rShadowSpr.locV = t_fYs
      m_rShadowSpr.locZ = t_fZs
      m_rCanvasSpr.locH = t_fXs
      m_rCanvasSpr.locV = t_fYs
      m_rCanvasSpr.locZ = t_fZs + 1
      m_veLastScr = t_veScr
    end if
  else
    error(this, "Renderer not defined!", #update)
  end if
end
on select this
  if objectp(m_rRenderer) then
    m_rRenderer.ShowArrow()
  end if
  return callAncestor(#select, this)
end
on Unselect this
  if objectp(m_rRenderer) then
    m_rRenderer.HideArrow()
  end if
  return callAncestor(#Unselect, this)
end
on ShowAvatarName this, a_kEvent
  if objectp(m_rRenderer) then
    m_rRenderer.ShowHideAvatarName(a_kEvent)
  end if
end
on SetOutlook this, a_ar_AvatarOutlook
  m_ar_AvatarOutlook = a_ar_AvatarOutlook
  repeat with t_iCloth in m_ar_AvatarOutlook
    getThread(#AvatarFactory).component.m_rClothAssetManager.LoadCastLibsForCloth(this, t_iCloth)
  end repeat
end
on GetOutlook this
  return m_ar_AvatarOutlook
end
on SetAvatarOnTile this, a_sBoolAvatarOnTile
  m_sBoolAvatarOnTile = a_sBoolAvatarOnTile
end
on GetAvatarOnTile this
  return m_sBoolAvatarOnTile
end
on visible this, a_sBoolAvat, a_sBoolSdw
  if not voidp(a_sBoolAvat) then
    if m_rCanvasSpr.spriteNum > 0 then
      m_rCanvasSpr.visible = a_sBoolAvat
    end if
  end if
  if not voidp(m_rShadowSpr) then
    if m_rShadowSpr.spriteNum > 0 then
      m_rShadowSpr.visible = a_sBoolSdw
    end if
  end if
end
on AssetsLoaded this, a_iCloth
  if objectp(m_rRenderer) then
    m_rRenderer.m_ObjRenderer.ClothingLoaded(a_iCloth)
  end if
end