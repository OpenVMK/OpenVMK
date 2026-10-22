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

on construct t_aParams
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
on deconstruct t_aParams
  if objectp(t_aParams.m_rRenderer) then
    t_aParams.m_rRenderer.deconstruct()
    m_rRenderer = VOID
  end if
  if t_aParams.m_rMember.ilk = #member then
    removeMember(t_aParams.m_rMember.name)
    m_rMember = VOID
  end if
  if objectExists("RoomEventProcessor") then
    t_rSprMgr = getObject("RoomEventProcessor")
  else
    t_rSprMgr = createObject("RoomEventProcessor", "CRoomMouseEventProcessor")
  end if
  if t_aParams.m_rCanvasSpr.ilk = #sprite then
    t_rSprMgr.RemoveSprite(t_aParams.m_rCanvasSpr)
    m_rCanvasSpr = VOID
  end if
  if t_aParams.m_rShadowSpr.ilk = #sprite then
    t_rSprMgr.RemoveSprite(t_aParams.m_rShadowSpr)
    m_rShadowSpr = VOID
  end if
  if not voidp(t_aParams.m_rCustomSpr) and t_aParams.m_rCustomSpr.ilk = #sprite then
    t_rSprMgr.RemoveSprite(t_aParams.m_rCustomSpr)
    t_aParams.m_rCustomSpr = VOID
  end if
  return 1
end
on SetRenderer t_aParams, a_rRenderer
  m_rRenderer = a_rRenderer
  m_iTileSize = integer(t_aParams.m_rObject.GetContext().GetParam("TILESIZE"))
  if voidp(t_aParams.m_rMember) then
    t_iHeight = t_aParams.getObject().GetKey() && "Canvas"
    if createMember(t_iHeight, #bitmap) then
      m_rMember = getMember(t_iHeight)
      t_iWidth = getVariable("avatarHeight", 160)
      t_sMemName = getVariable("avatarWidth", 80)
      t_aParams.m_rMember.image = image(t_sMemName, t_iWidth, 32)
    else
      return error(t_aParams, "Failed to create canvas resource!", #SetRenderer)
    end if
  end if
  if objectExists("RoomEventProcessor") then
    t_rSprMgr = getObject("RoomEventProcessor")
  else
    t_rSprMgr = createObject("RoomEventProcessor", "CRoomMouseEventProcessor")
  end if
  t_veScr = t_aParams.getObject().GetScrPos()
  if voidp(t_aParams.m_rShadowSpr) then
    m_rShadowSpr = t_rSprMgr.CreateSprite(t_aParams.getObject().GetKey(), 0)
    t_aParams.m_rShadowSpr.member = getMember("room_avatar_shadow")
    t_aParams.m_rShadowSpr.width = t_aParams.m_rShadowSpr.member.width
    t_aParams.m_rShadowSpr.height = t_aParams.m_rShadowSpr.member.height
    t_aParams.m_rShadowSpr.ink = 39
    t_aParams.m_rShadowSpr.blend = 50
    t_aParams.m_rShadowSpr.locH = t_veScr.x
    t_aParams.m_rShadowSpr.locV = t_veScr.y
    t_aParams.m_rShadowSpr.locZ = t_veScr.z
  end if
  if voidp(t_aParams.m_rCanvasSpr) then
    m_rCanvasSpr = t_rSprMgr.CreateSprite(t_aParams.getObject().GetKey(), 1)
    t_aParams.m_rCanvasSpr.member = t_aParams.m_rMember
    t_aParams.m_rCanvasSpr.width = t_aParams.m_rCanvasSpr.member.width
    t_aParams.m_rCanvasSpr.height = t_aParams.m_rCanvasSpr.member.height
    t_aParams.m_rCanvasSpr.ink = 8
    t_aParams.m_rCanvasSpr.locH = t_veScr.x
    t_aParams.m_rCanvasSpr.locV = t_veScr.y
    t_aParams.m_rCanvasSpr.locZ = t_veScr.z + 1
  end if
  a_rRenderer.SetSpriteLoc(t_veScr)
end
on GetRenderer t_aParams
  return the m_rRenderer of t_aParams
end
on Actions t_aParams, a_ar_iActions
  if objectp(t_aParams.m_rRenderer) then
    t_aParams.m_rRenderer.Action(a_ar_iActions)
  else
    error(t_aParams, "Renderer not defined!", #Actions)
  end if
end
on update t_aParams
  t_aParams.m_rFrame = t_aParams.m_rFrame + 1
  if objectp(t_aParams.m_rRenderer) then
    t_aParams.m_rRenderer.update(t_aParams.m_rCanvasSpr)
    t_veScr = t_aParams.getObject().GetScrPos()
    t_iFactor = t_aParams.getObject().GetFactor().m_iFactor
    if not voidp(t_iFactor) then
      t_veScr.z = t_aParams.getObject().GetFactor().m_rZTransfer.get(t_iFactor)
    end if
    t_fXs = t_veScr.x
    t_fYs = t_veScr.y
    t_fZs = t_veScr.z
    if t_aParams.m_veLastScr <> t_veScr then
      t_aParams.m_rShadowSpr.locH = t_fXs
      t_aParams.m_rShadowSpr.locV = t_fYs
      t_aParams.m_rShadowSpr.locZ = t_fZs
      t_aParams.m_rCanvasSpr.locH = t_fXs
      t_aParams.m_rCanvasSpr.locV = t_fYs
      t_aParams.m_rCanvasSpr.locZ = t_fZs + 1
      if not voidp(t_aParams.m_rCustomSpr) then
        t_aParams.m_rCustomSpr.locH = t_fXs
        t_aParams.m_rCustomSpr.locV = t_fYs
        t_aParams.m_rCustomSpr.locZ = t_fZs + t_aParams.m_rCustomRenderer.getOffsetZ()
      end if
      m_veLastScr = t_veScr
    end if
    if not voidp(t_aParams.m_rCustomRenderer) then
      t_aParams.m_rCustomRenderer.update()
    end if
  else
    error(t_aParams, "Renderer not defined!", #update)
  end if
end
on SetMysticRenderer t_aParams, a_rRenderer
  if voidp(a_rRenderer) and not voidp(t_aParams.m_rCustomRenderer) then
    t_aParams.m_rCustomRenderer.endMagic()
  end if
  t_aParams.m_rCustomRenderer = a_rRenderer
  if not voidp(t_aParams.m_rCustomSpr) and voidp(t_aParams.m_rCustomRenderer) then
    if objectExists("RoomEventProcessor") then
      t_rSprMgr = getObject("RoomEventProcessor")
    else
      t_rSprMgr = createObject("RoomEventProcessor", "CRoomMouseEventProcessor")
    end if
    t_rSprMgr.RemoveSprite(t_aParams.m_rCustomSpr)
    t_aParams.m_rCustomSpr = VOID
    exit
  end if
  if voidp(t_aParams.m_rCustomSpr) then
    if objectExists("RoomEventProcessor") then
      t_rSprMgr = getObject("RoomEventProcessor")
    else
      t_rSprMgr = createObject("RoomEventProcessor", "CRoomMouseEventProcessor")
    end if
    t_aParams.m_rCustomSpr = t_rSprMgr.CreateSprite(t_aParams.getObject().GetKey(), 2)
  end if
  t_aParams.m_rCustomRenderer.Init(t_aParams.m_rCustomSpr)
  t_veScr = t_aParams.getObject().GetScrPos()
  t_fXs = t_veScr.x
  t_fYs = t_veScr.y
  t_fZs = t_veScr.z
  if not voidp(t_aParams.m_rCustomSpr) then
    t_aParams.m_rCustomSpr.locH = t_fXs
    t_aParams.m_rCustomSpr.locV = t_fYs
    t_aParams.m_rCustomSpr.locZ = t_fZs + t_aParams.m_rCustomRenderer.getOffsetZ()
  end if
end
on select t_aParams
  if objectp(t_aParams.m_rRenderer) then
    t_aParams.m_rRenderer.ShowArrow()
  end if
  return callAncestor(#select, t_aParams)
end
on Unselect t_aParams
  if objectp(t_aParams.m_rRenderer) then
    t_aParams.m_rRenderer.HideArrow()
  end if
  return callAncestor(#Unselect, t_aParams)
end
on ShowAvatarName t_aParams, a_kEvent
  if objectp(t_aParams.m_rRenderer) then
    t_aParams.m_rRenderer.ShowHideAvatarName(a_kEvent)
  end if
end
on SetOutlook t_aParams, a_ar_AvatarOutlook
  m_ar_AvatarOutlook = a_ar_AvatarOutlook
  repeat with t_iCloth in t_aParams.m_ar_AvatarOutlook
    getThread(#AvatarFactory).component.m_rClothAssetManager.LoadCastLibsForCloth(t_aParams, t_iCloth)
  end repeat
end
on GetOutlook t_aParams
  return the m_ar_AvatarOutlook of t_aParams
end
on SetAvatarOnTile t_aParams, a_sBoolAvatarOnTile
  m_sBoolAvatarOnTile = a_sBoolAvatarOnTile
end
on GetAvatarOnTile t_aParams
  return the m_sBoolAvatarOnTile of t_aParams
end
on visible t_aParams, a_sBoolAvat, a_sBoolSdw
  if not voidp(a_sBoolAvat) then
    if t_aParams.m_rCanvasSpr.spriteNum > 0 then
      t_aParams.m_rCanvasSpr.visible = a_sBoolAvat
    end if
  end if
  if not voidp(t_aParams.m_rShadowSpr) then
    if t_aParams.m_rShadowSpr.spriteNum > 0 then
      t_aParams.m_rShadowSpr.visible = a_sBoolSdw
    end if
  end if
end
on AssetsLoaded t_aParams, a_iCloth
  if objectp(t_aParams.m_rRenderer) then
    t_aParams.m_rRenderer.m_ObjRenderer.ClothingLoaded(a_iCloth)
  end if
end