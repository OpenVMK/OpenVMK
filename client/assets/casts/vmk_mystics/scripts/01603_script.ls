-- Script
property m_rMember
property m_rCanvasSpr
property m_rShadowSpr
property m_rCustomSpr
property m_rRenderer
property m_rMysticRenderer
property m_veLastScr
property m_iTileSize
property m_sBoolAvatarOnTile
property m_ar_AvatarOutlook
property m_rCustomRenderer
property m_rFrame

on construct this
  m_rMember = VOID
  m_rCanvasSpr = VOID
  m_rShadowSpr = VOID
  m_rCustomSpr = VOID
  m_rMysticRenderer = VOID
  m_rRenderer = VOID
  m_iTileSize = 32
  m_veLastScr = vector()
  m_ar_AvatarOutlook = VOID
  m_sBoolAvatarOnTile = 1
  m_rFrame = 0
  return 1
end
on deconstruct this
  if objectp(this.m_rRenderer) then
    this.m_rRenderer.deconstruct()
    m_rRenderer = VOID
  end if
  if this.m_rMember.ilk = #member then
    removeMember(this.m_rMember.name)
    m_rMember = VOID
  end if
  if objectExists("RoomEventProcessor") then
    t_rSprMgr = getObject("RoomEventProcessor")
  else
    t_rSprMgr = createObject("RoomEventProcessor", "CRoomMouseEventProcessor")
  end if
  if this.m_rCanvasSpr.ilk = #sprite then
    t_rSprMgr.RemoveSprite(this.m_rCanvasSpr)
    m_rCanvasSpr = VOID
  end if
  if this.m_rShadowSpr.ilk = #sprite then
    t_rSprMgr.RemoveSprite(this.m_rShadowSpr)
    m_rShadowSpr = VOID
  end if
  if not voidp(this.m_rCustomSpr) and this.m_rCustomSpr.ilk = #sprite then
    t_rSprMgr.RemoveSprite(this.m_rCustomSpr)
    this.m_rCustomSpr = VOID
  end if
  return 1
end
on SetRenderer this, a_rRenderer
  m_rRenderer = a_rRenderer
  m_iTileSize = integer(this.m_rObject.GetContext().GetParam("TILESIZE"))
  if voidp(this.m_rMember) then
    t_sMemName = this.getObject().GetKey() && "Canvas"
    if createMember(t_sMemName, #bitmap) then
      m_rMember = getMember(t_sMemName)
      t_iHeight = getVariable("avatarHeight", 160)
      t_iWidth = getVariable("avatarWidth", 80)
      this.m_rMember.image = image(t_iWidth, t_iHeight, 32)
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
  if voidp(this.m_rShadowSpr) then
    m_rShadowSpr = t_rSprMgr.CreateSprite(this.getObject().GetKey(), 0)
    this.m_rShadowSpr.member = getMember("room_avatar_shadow")
    this.m_rShadowSpr.width = this.m_rShadowSpr.member.width
    this.m_rShadowSpr.height = this.m_rShadowSpr.member.height
    this.m_rShadowSpr.ink = 39
    this.m_rShadowSpr.blend = 50
    this.m_rShadowSpr.locH = t_veScr.x
    this.m_rShadowSpr.locV = t_veScr.y
    this.m_rShadowSpr.locZ = t_veScr.z
  end if
  if voidp(this.m_rCanvasSpr) then
    m_rCanvasSpr = t_rSprMgr.CreateSprite(this.getObject().GetKey(), 1)
    this.m_rCanvasSpr.member = this.m_rMember
    this.m_rCanvasSpr.width = this.m_rCanvasSpr.member.width
    this.m_rCanvasSpr.height = this.m_rCanvasSpr.member.height
    this.m_rCanvasSpr.ink = 8
    this.m_rCanvasSpr.locH = t_veScr.x
    this.m_rCanvasSpr.locV = t_veScr.y
    this.m_rCanvasSpr.locZ = t_veScr.z + 1
  end if
  a_rRenderer.SetSpriteLoc(t_veScr)
end
on GetRenderer this
  return the m_rRenderer of this
end
on Actions this, a_ar_iActions
  if objectp(this.m_rRenderer) then
    this.m_rRenderer.Action(a_ar_iActions)
  else
    error(this, "Renderer not defined!", #Actions)
  end if
end
on update this
  this.m_rFrame = this.m_rFrame + 1
  if objectp(this.m_rRenderer) then
    this.m_rRenderer.update(this.m_rCanvasSpr)
    t_veScr = this.getObject().GetScrPos()
    t_iFactor = this.getObject().GetFactor().m_iFactor
    if not voidp(t_iFactor) then
      t_veScr.z = this.getObject().GetFactor().m_rZTransfer.get(t_iFactor)
    end if
    t_fXs = t_veScr.x
    t_fYs = t_veScr.y
    t_fZs = t_veScr.z
    if this.m_veLastScr <> t_veScr then
      this.m_rShadowSpr.locH = t_fXs
      this.m_rShadowSpr.locV = t_fYs
      this.m_rShadowSpr.locZ = t_fZs
      this.m_rCanvasSpr.locH = t_fXs
      this.m_rCanvasSpr.locV = t_fYs
      this.m_rCanvasSpr.locZ = t_fZs + 1
      if not voidp(this.m_rCustomSpr) then
        this.m_rCustomSpr.locH = t_fXs
        this.m_rCustomSpr.locV = t_fYs
        this.m_rCustomSpr.locZ = t_fZs + this.m_rCustomRenderer.getOffsetZ()
      end if
      m_veLastScr = t_veScr
    end if
    if not voidp(this.m_rCustomRenderer) then
      this.m_rCustomRenderer.update()
    end if
  else
    error(this, "Renderer not defined!", #update)
  end if
end
on SetMysticRenderer this, a_rRenderer
  if voidp(a_rRenderer) and not voidp(this.m_rCustomRenderer) then
    this.m_rCustomRenderer.endMagic()
  end if
  this.m_rCustomRenderer = a_rRenderer
  if not voidp(this.m_rCustomSpr) and voidp(this.m_rCustomRenderer) then
    if objectExists("RoomEventProcessor") then
      t_rSprMgr = getObject("RoomEventProcessor")
    else
      t_rSprMgr = createObject("RoomEventProcessor", "CRoomMouseEventProcessor")
    end if
    t_rSprMgr.RemoveSprite(this.m_rCustomSpr)
    this.m_rCustomSpr = VOID
    exit
  end if
  if voidp(this.m_rCustomSpr) then
    if objectExists("RoomEventProcessor") then
      t_rSprMgr = getObject("RoomEventProcessor")
    else
      t_rSprMgr = createObject("RoomEventProcessor", "CRoomMouseEventProcessor")
    end if
    this.m_rCustomSpr = t_rSprMgr.CreateSprite(this.getObject().GetKey(), 2)
  end if
  this.m_rCustomRenderer.Init(this.m_rCustomSpr)
  t_veScr = this.getObject().GetScrPos()
  t_fXs = t_veScr.x
  t_fYs = t_veScr.y
  t_fZs = t_veScr.z
  if not voidp(this.m_rCustomSpr) then
    this.m_rCustomSpr.locH = t_fXs
    this.m_rCustomSpr.locV = t_fYs
    this.m_rCustomSpr.locZ = t_fZs + this.m_rCustomRenderer.getOffsetZ()
  end if
end
on select this
  if objectp(this.m_rRenderer) then
    this.m_rRenderer.ShowArrow()
  end if
  return callAncestor(#select, this)
end
on Unselect this
  if objectp(this.m_rRenderer) then
    this.m_rRenderer.HideArrow()
  end if
  return callAncestor(#Unselect, this)
end
on ShowAvatarName this, a_kEvent
  if objectp(this.m_rRenderer) then
    this.m_rRenderer.ShowHideAvatarName(a_kEvent)
  end if
end
on SetOutlook this, a_ar_AvatarOutlook
  m_ar_AvatarOutlook = a_ar_AvatarOutlook
  repeat with t_iCloth in this.m_ar_AvatarOutlook
    getThread(#AvatarFactory).component.m_rClothAssetManager.LoadCastLibsForCloth(this, t_iCloth)
  end repeat
end
on GetOutlook this
  return the m_ar_AvatarOutlook of this
end
on SetAvatarOnTile this, a_sBoolAvatarOnTile
  m_sBoolAvatarOnTile = a_sBoolAvatarOnTile
end
on GetAvatarOnTile this
  return the m_sBoolAvatarOnTile of this
end
on visible this, a_sBoolAvat, a_sBoolSdw
  if not voidp(a_sBoolAvat) then
    if this.m_rCanvasSpr.spriteNum > 0 then
      this.m_rCanvasSpr.visible = a_sBoolAvat
    end if
  end if
  if not voidp(this.m_rShadowSpr) then
    if this.m_rShadowSpr.spriteNum > 0 then
      this.m_rShadowSpr.visible = a_sBoolSdw
    end if
  end if
end
on AssetsLoaded this, a_iCloth
  if objectp(this.m_rRenderer) then
    this.m_rRenderer.m_ObjRenderer.ClothingLoaded(a_iCloth)
  end if
end