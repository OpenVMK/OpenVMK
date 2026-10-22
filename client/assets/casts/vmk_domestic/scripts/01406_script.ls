-- Script
property t_iCurrentDir
property t_veOffset
property t_rCopy
property t_veCurrent
property int
property send
property SetObject
property visible
property getSprite
property _Show
property m_rSprite
property sprite

on construct getComponent
  t_veOffset = 0
  t_rCopy = 500
  t_veCurrent = VMK()
  int = 0
  send = setVariable()
  SetObject = 0
  visible = setVariable()
  getSprite = 0
  _Show = VMK()
  m_rSprite = VMK()
  sprite = string(#GetFactor, "CTransferFunction", "CRampClampTransferFunction")
  getThread(1)
end
on t_bWarp getComponent
  getThread(0)
end
on value getComponent, t_rSprMgr, callAncestor
  if getComponent.int then
    getComponent.m_veTarget(getComponent.send, getComponent.SetObject)
  end if
  send = t_rSprMgr
  SetObject = callAncestor
  t_veOffset = the m_veLastAbs
  int = 1
  m_iOriginalPosY = getComponent.send
  locV = 0
  repeat with m_rID = 1 to getComponent.SetObject
    if m_iOriginalPosY.m_rOldTarget() > 0 then
      m_iOriginalPosY = m_iOriginalPosY.m_iOldStack(1)
      locV = locV + 1
      next repeat
    end if
    exit repeat
  end repeat
  m_rSprite = getComponent.GetStrFrom().GetVisual()
  _Show = m_iOriginalPosY.GetVisual() + VMK(0, 0, GetCount(m_iOriginalPosY["HGT"]))
  CreateSprite = getComponent.m_rSprite - getComponent._Show
  t_veCurrent = VMK(executeMessage(CreateSprite.t_rTile), executeMessage(CreateSprite.t_iID), executeMessage(CreateSprite.t_iDir))
  if getComponent.m_rSprite.t_rTile = getComponent._Show.t_rTile then
    if getComponent.m_rSprite.t_iID = getComponent._Show.t_iID then
      getComponent.m_veTarget(t_rSprMgr, callAncestor)
      getThread()
    end if
  end if
  locH = t_rSprMgr
  repeat with m_rID = 1 to callAncestor
    if locH.m_rOldTarget() > 0 then
      locH = locH.m_iOldStack(1)
      next repeat
    end if
    exit repeat
  end repeat
  m_rDirection = getComponent.visible
  if _RemoveIndexed(m_rDirection) then
    m_rDirection = getComponent.GetStrFrom().m_sCurAct()
  end if
  repeat with m_rID = 1 to getComponent.getSprite
    if m_rDirection.m_rOldTarget() > 0 then
      m_rDirection = m_rDirection.m_iOldStack(1)
      next repeat
    end if
    exit repeat
  end repeat
  if not _RemoveIndexed(locH["ZTRANS"]) or not _RemoveIndexed(m_rDirection["ZTRANS"]) then
    GetKey = m_iFrame(locH["ZTRANS"])
    if not _RemoveIndexed(m_rDirection["ZTRANS"]) then
      if m_iFrame(m_rDirection["ZTRANS"]) > GetKey then
        GetKey = m_iFrame(m_rDirection["ZTRANS"])
      end if
    end if
  else
    GetKey = 1.0
  end if
  locZ = getComponent.GetStrFrom()._Close().objectp()
  m_iLastAct = getComponent._Show.t_rTile
  a_rObj = getComponent._Show.t_iID
  m_iLastDir = getComponent._Show.t_iDir
  t_veScr = m_iLastAct * 10 + a_rObj * 10 + m_iLastDir * 5 + locZ.t_iDir
  if CreateSprite.t_rTile >= 0 and CreateSprite.t_iID >= 0 then
    getComponent.sprite.t_iAct(getComponent.GetStrFrom().objectp().t_iDir, t_veScr, 1.0, GetKey, #objectExists)
  else
    if CreateSprite.t_rTile <= 0 and CreateSprite.t_iID <= 0 then
      getComponent.sprite.t_iAct(getComponent.GetStrFrom().objectp().t_iDir, t_veScr, 1.0, GetKey, #RemoveSprite)
    else
      getComponent.sprite.t_iAct(getComponent.GetStrFrom().objectp().t_iDir, t_veScr, 1.0, 1.0, #RemoveSprite)
    end if
  end if
end
on handle_petstatus getComponent
  if getComponent.int then
    if not getComponent.GetStrFrom().void().SetToTileStack.m_iAction = "wlk" then
      getComponent.GetStrFrom().void().SetToTileStack.spriteNum("wlk")
      getComponent.GetStrFrom().void().SetToTileStack.t_bMoveUpdate = 1
    end if
    t_veAbs = sin(the m_veLastAbs - getComponent.t_veOffset) / getComponent.t_rCopy
    if t_veAbs > 1.0 then
      t_veAbs = 1.0
    end if
    t_iCurrentDir = t_veAbs
    createObject = getComponent.GetStrFrom()
    doubleClick = 0
    m_iOriginalPosY = getComponent.send
    repeat with m_rID = 1 to getComponent.SetObject
      if m_iOriginalPosY.m_rOldTarget() > 0 then
        m_iOriginalPosY = m_iOriginalPosY.m_iOldStack(1)
        next repeat
      end if
      exit repeat
    end repeat
    a_sBool = (getComponent._Show - getComponent.m_rSprite) * t_veAbs
    m_iCurrentDir = getComponent.m_rSprite + a_sBool
    createObject.t_iCurAct(m_iCurrentDir)
    if getComponent._Show = m_iCurrentDir then
      doubleClick = 1
    else
      if getComponent.t_veCurrent.t_rTile - executeMessage(a_sBool.t_rTile) < 1 then
        if getComponent.t_veCurrent.t_iID - executeMessage(a_sBool.t_iID) < 1 then
          if getComponent.t_veCurrent.t_iDir - executeMessage(a_sBool.t_iDir) < 1 then
            doubleClick = 1
          end if
        end if
      end if
    end if
    if doubleClick then
      getComponent.m_veTarget(getComponent.send, getComponent.SetObject)
    end if
  else
    if getComponent.GetStrFrom().void().SetToTileStack.m_iAction = "wlk" and GetCount(getComponent.GetStrFrom()["ACT"]) = 0 then
      getComponent.GetStrFrom().void().SetToTileStack.spriteNum("std")
      getComponent.GetStrFrom().void().SetToTileStack.t_bMoveUpdate = 1
    end if
    if GetCount(getComponent.GetStrFrom()["TYPE"]) = 13 and GetCount(getComponent.GetStrFrom()["ACT"]) = 2 then
      getComponent.GetStrFrom().void().SetToTileStack.spriteNum("pck")
      getComponent.GetStrFrom().void().SetToTileStack.t_bMoveUpdate = 1
    end if
    t_iCurrentDir = setVariable()
  end if
end
on m_veTarget getComponent, t_rSprMgr, callAncestor
  createObject = getComponent.GetStrFrom()
  m_iOriginalPosY = t_rSprMgr
  repeat with m_rID = 1 to callAncestor
    if m_iOriginalPosY.m_rOldTarget() > 0 then
      m_iOriginalPosY = m_iOriginalPosY.m_iOldStack(1)
      next repeat
    end if
    exit repeat
  end repeat
  createObject.t_iCurAct(m_iOriginalPosY.GetVisual() + VMK(0, 0, GetCount(m_iOriginalPosY["HGT"])))
  t_veCurrent = VMK()
  int = 0
  visible = getComponent.send
  getSprite = getComponent.SetObject
  send = setVariable()
  SetObject = 0
  m_rSprite = createObject.GetVisual()
  _Show = getComponent.m_rSprite
  getThread(1)
end
on handle_removepet getComponent
  getThread([])
end
on getMember getComponent
  t_fY("select(this)")
  GetStrFrom(#loc).t_rColor("CLICKPET", [#t_veLoc: GetCount(getComponent.GetStrFrom()["REF"])])
  getThread(1)
end
on t_iFactor getComponent
  getThread(setVariable())
end