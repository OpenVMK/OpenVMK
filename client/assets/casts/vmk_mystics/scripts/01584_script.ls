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

on construct t_iMagicFX
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
on deconstruct t_iMagicFX
  if objectp(t_iMagicFX.m_rRenderer) then
    t_iMagicFX.m_rRenderer.deconstruct()
    m_rRenderer = VOID
  end if
  if t_iMagicFX.m_rMember.ilk = #member then
    removeMember(t_iMagicFX.m_rMember.name)
    m_rMember = VOID
  end if
  if objectExists("RoomEventProcessor") then
    t_rSprMgr = getObject("RoomEventProcessor")
  else
    t_rSprMgr = createObject("RoomEventProcessor", "CRoomMouseEventProcessor")
  end if
  if t_iMagicFX.m_rCanvasSpr.ilk = #sprite then
    t_rSprMgr.RemoveSprite(t_iMagicFX.m_rCanvasSpr)
    m_rCanvasSpr = VOID
  end if
  if t_iMagicFX.m_rShadowSpr.ilk = #sprite then
    t_rSprMgr.RemoveSprite(t_iMagicFX.m_rShadowSpr)
    m_rShadowSpr = VOID
  end if
  if not voidp(t_iMagicFX.m_rCustomSpr) and t_iMagicFX.m_rCustomSpr.ilk = #sprite then
    t_rSprMgr.RemoveSprite(t_iMagicFX.m_rCustomSpr)
    t_iMagicFX.m_rCustomSpr = VOID
  end if
  return 1
end
on SetRenderer t_iMagicFX, a_rRenderer
  m_rRenderer = a_rRenderer
  m_iTileSize = integer(t_iMagicFX.m_rObject.GetContext().GetParam("TILESIZE"))
  if voidp(t_iMagicFX.m_rMember) then
    t_sMemName = t_iMagicFX.getObject().GetKey() && "Canvas"
    if createMember(t_sMemName, #bitmap) then
      m_rMember = getMember(t_sMemName)
      t_iWidth = getVariable("avatarHeight", 160)
      t_iHeight = getVariable("avatarWidth", 80)
      t_iMagicFX.m_rMember.image = image(t_iHeight, t_iWidth, 32)
    else
      return error(t_iMagicFX, "Failed to create canvas resource!", #SetRenderer)
    end if
  end if
  if objectExists("RoomEventProcessor") then
    t_rSprMgr = getObject("RoomEventProcessor")
  else
    t_rSprMgr = createObject("RoomEventProcessor", "CRoomMouseEventProcessor")
  end if
  t_veScr = t_iMagicFX.getObject().GetScrPos()
  if voidp(t_iMagicFX.m_rShadowSpr) then
    m_rShadowSpr = t_rSprMgr.CreateSprite(t_iMagicFX.getObject().GetKey(), 0)
    t_iMagicFX.m_rShadowSpr.member = getMember("room_avatar_shadow")
    t_iMagicFX.m_rShadowSpr.width = t_iMagicFX.m_rShadowSpr.member.width
    t_iMagicFX.m_rShadowSpr.height = t_iMagicFX.m_rShadowSpr.member.height
    t_iMagicFX.m_rShadowSpr.ink = 39
    t_iMagicFX.m_rShadowSpr.blend = 50
    t_iMagicFX.m_rShadowSpr.locH = t_veScr.x
    t_iMagicFX.m_rShadowSpr.locV = t_veScr.y
    t_iMagicFX.m_rShadowSpr.locZ = t_veScr.z
  end if
  if voidp(t_iMagicFX.m_rCanvasSpr) then
    m_rCanvasSpr = t_rSprMgr.CreateSprite(t_iMagicFX.getObject().GetKey(), 1)
    t_iMagicFX.m_rCanvasSpr.member = t_iMagicFX.m_rMember
    t_iMagicFX.m_rCanvasSpr.width = t_iMagicFX.m_rCanvasSpr.member.width
    t_iMagicFX.m_rCanvasSpr.height = t_iMagicFX.m_rCanvasSpr.member.height
    t_iMagicFX.m_rCanvasSpr.ink = 8
    t_iMagicFX.m_rCanvasSpr.locH = t_veScr.x
    t_iMagicFX.m_rCanvasSpr.locV = t_veScr.y
    t_iMagicFX.m_rCanvasSpr.locZ = t_veScr.z + 1
  end if
  a_rRenderer.SetSpriteLoc(t_veScr)
end
on GetRenderer t_iMagicFX
  return the m_rRenderer of t_iMagicFX
end
on Actions t_iMagicFX, a_ar_iActions
  if objectp(t_iMagicFX.m_rRenderer) then
    t_iMagicFX.m_rRenderer.Action(a_ar_iActions)
  else
    error(t_iMagicFX, "Renderer not defined!", #Actions)
  end if
end
on update t_iMagicFX
  t_iMagicFX.m_rFrame = t_iMagicFX.m_rFrame + 1
  if objectp(t_iMagicFX.m_rRenderer) then
    t_iMagicFX.m_rRenderer.update(t_iMagicFX.m_rCanvasSpr)
    t_veScr = t_iMagicFX.getObject().GetScrPos()
    t_fXs = t_iMagicFX.getObject().GetFactor().m_iFactor
    if not voidp(t_fXs) then
      t_veScr.z = t_iMagicFX.getObject().GetFactor().m_rZTransfer.get(t_fXs)
    end if
    t_iFactor = t_veScr.x
    t_fZs = t_veScr.y
    t_fYs = t_veScr.z
    if t_iMagicFX.m_veLastScr <> t_veScr then
      t_iMagicFX.m_rShadowSpr.locH = t_iFactor
      t_iMagicFX.m_rShadowSpr.locV = t_fZs
      t_iMagicFX.m_rShadowSpr.locZ = t_fYs
      t_iMagicFX.m_rCanvasSpr.locH = t_iFactor
      t_iMagicFX.m_rCanvasSpr.locV = t_fZs
      t_iMagicFX.m_rCanvasSpr.locZ = t_fYs + 1
      if not voidp(t_iMagicFX.m_rCustomSpr) then
        t_iMagicFX.m_rCustomSpr.locH = t_iFactor
        t_iMagicFX.m_rCustomSpr.locV = t_fZs
        t_iMagicFX.m_rCustomSpr.locZ = t_fYs + t_iMagicFX.m_rCustomRenderer.getOffsetZ()
      end if
      m_veLastScr = t_veScr
    end if
    if not voidp(t_iMagicFX.m_rCustomRenderer) then
      t_iMagicFX.m_rCustomRenderer.update()
    end if
  else
    error(t_iMagicFX, "Renderer not defined!", #update)
  end if
end
on SetMysticRenderer t_iMagicFX, a_rRenderer
  if voidp(a_rRenderer) and not voidp(t_iMagicFX.m_rCustomRenderer) then
    t_iMagicFX.m_rCustomRenderer.endMagic()
  end if
  t_iMagicFX.m_rCustomRenderer = a_rRenderer
  if not voidp(t_iMagicFX.m_rCustomSpr) and voidp(t_iMagicFX.m_rCustomRenderer) then
    if objectExists("RoomEventProcessor") then
      t_rSprMgr = getObject("RoomEventProcessor")
    else
      t_rSprMgr = createObject("RoomEventProcessor", "CRoomMouseEventProcessor")
    end if
    t_rSprMgr.RemoveSprite(t_iMagicFX.m_rCustomSpr)
    t_iMagicFX.m_rCustomSpr = VOID
    exit
  end if
  if voidp(t_iMagicFX.m_rCustomSpr) then
    if objectExists("RoomEventProcessor") then
      t_rSprMgr = getObject("RoomEventProcessor")
    else
      t_rSprMgr = createObject("RoomEventProcessor", "CRoomMouseEventProcessor")
    end if
    t_iMagicFX.m_rCustomSpr = t_rSprMgr.CreateSprite(t_iMagicFX.getObject().GetKey(), 2)
  end if
  t_iMagicFX.m_rCustomRenderer.Init(t_iMagicFX.m_rCustomSpr)
  t_veScr = t_iMagicFX.getObject().GetScrPos()
  t_iFactor = t_veScr.x
  t_fZs = t_veScr.y
  t_fYs = t_veScr.z
  if not voidp(t_iMagicFX.m_rCustomSpr) then
    t_iMagicFX.m_rCustomSpr.locH = t_iFactor
    t_iMagicFX.m_rCustomSpr.locV = t_fZs
    t_iMagicFX.m_rCustomSpr.locZ = t_fYs + t_iMagicFX.m_rCustomRenderer.getOffsetZ()
  end if
end
on select t_iMagicFX
  if objectp(t_iMagicFX.m_rRenderer) then
    t_iMagicFX.m_rRenderer.ShowArrow()
  end if
  return callAncestor(#select, t_iMagicFX)
end
on Unselect t_iMagicFX
  if objectp(t_iMagicFX.m_rRenderer) then
    t_iMagicFX.m_rRenderer.HideArrow()
  end if
  return callAncestor(#Unselect, t_iMagicFX)
end
on ShowAvatarName t_iMagicFX, a_kEvent
  if objectp(t_iMagicFX.m_rRenderer) then
    t_iMagicFX.m_rRenderer.ShowHideAvatarName(a_kEvent)
  end if
end
on SetOutlook t_iMagicFX, a_ar_AvatarOutlook
  m_ar_AvatarOutlook = a_ar_AvatarOutlook
  repeat with t_iCloth in t_iMagicFX.m_ar_AvatarOutlook
    getThread(#AvatarFactory).component.m_rClothAssetManager.LoadCastLibsForCloth(t_iMagicFX, t_iCloth)
  end repeat
end
on GetOutlook t_iMagicFX
  return the m_ar_AvatarOutlook of t_iMagicFX
end
on SetAvatarOnTile t_iMagicFX, a_sBoolAvatarOnTile
  m_sBoolAvatarOnTile = a_sBoolAvatarOnTile
end
on GetAvatarOnTile t_iMagicFX
  return the m_sBoolAvatarOnTile of t_iMagicFX
end
on visible t_iMagicFX, a_sBoolSdw, a_sBoolAvat
  if not voidp(a_sBoolSdw) then
    if t_iMagicFX.m_rCanvasSpr.spriteNum > 0 then
      t_iMagicFX.m_rCanvasSpr.visible = a_sBoolSdw
    end if
  end if
  if not voidp(t_iMagicFX.m_rShadowSpr) then
    if t_iMagicFX.m_rShadowSpr.spriteNum > 0 then
      t_iMagicFX.m_rShadowSpr.visible = a_sBoolAvat
    end if
  end if
end
on AssetsLoaded t_iMagicFX, a_iCloth
  if objectp(t_iMagicFX.m_rRenderer) then
    t_iMagicFX.m_rRenderer.m_ObjRenderer.ClothingLoaded(a_iCloth)
  end if
end