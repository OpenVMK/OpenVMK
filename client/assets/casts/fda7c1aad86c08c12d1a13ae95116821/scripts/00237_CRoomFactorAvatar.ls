-- Script
property m_iWlkStartTime
property m_iStatusDelay
property m_veDistance
property m_bWalking
property m_veSource
property m_veTarget
property m_rTarget
property m_iTarget
property m_rZTransfer
property m_iFactor
property m_rOldTarget
property m_iOldStack

on construct this
  m_iWlkStartTime = 0
  m_iStatusDelay = 500
  m_veDistance = vector()
  m_bWalking = 0
  m_rTarget = VOID
  m_iTarget = 0
  m_rOldTarget = VOID
  m_iOldStack = 0
  m_veTarget = vector()
  m_veSource = vector()
  m_rZTransfer = createObject(#random, "CTransferFunction", "CRampClampTransferFunction")
  return 1
end
on deconstruct this
  removeObject(m_rZTransfer.getID())
  return 1
end
on WalkToTile this, a_rTile, a_iStack
  if m_bWalking then
    this.SetToTileStack(m_rTarget, m_iTarget)
  end if
  m_rTarget = a_rTile
  m_iTarget = a_iStack
  m_iWlkStartTime = the milliSeconds
  m_bWalking = 1
  t_rActual = m_rTarget
  t_iActual = 0
  repeat with i = 1 to m_iTarget
    if t_rActual.GetCount() > 0 then
      t_rActual = t_rActual[1]
      t_iActual = t_iActual + 1
      next repeat
    end if
    exit repeat
  end repeat
  m_veSource = this.getObject().GetAbsPos()
  m_veTarget = t_rActual.GetAbsPos() + vector(0, 0, integer(t_rActual.GetParam("HGT")))
  t_veDist = m_veSource - m_veTarget
  m_veDistance = vector(abs(t_veDist.x), abs(t_veDist.y), abs(t_veDist.z))
  if m_veSource.x = m_veTarget.x then
    if m_veSource.y = m_veTarget.y then
      this.SetToTileStack(a_rTile, a_iStack)
      exit
    end if
  end if
  t_rOverTarget = a_rTile
  repeat with i = 1 to a_iStack
    if t_rOverTarget.GetCount() > 0 then
      t_rOverTarget = t_rOverTarget[1]
      next repeat
    end if
    exit repeat
  end repeat
  t_rUnderMe = m_rOldTarget
  if voidp(t_rUnderMe) then
    t_rUnderMe = this.getObject().GetOwner()
  end if
  repeat with i = 1 to m_iOldStack
    if t_rUnderMe.GetCount() > 0 then
      t_rUnderMe = t_rUnderMe[1]
      next repeat
    end if
    exit repeat
  end repeat
  if not voidp(t_rOverTarget.GetParam("ZTRANS")) or not voidp(t_rUnderMe.GetParam("ZTRANS")) then
    t_fZSteepness = value(t_rOverTarget.GetParam("ZTRANS"))
    if not voidp(t_rUnderMe.GetParam("ZTRANS")) then
      if value(t_rUnderMe.GetParam("ZTRANS")) > t_fZSteepness then
        t_fZSteepness = value(t_rUnderMe.GetParam("ZTRANS"))
      end if
    end if
  else
    t_fZSteepness = 1.0
  end if
  t_veOff = this.getObject().GetContext().GetScrPos()
  t_fX = m_veTarget.x
  t_fY = m_veTarget.y
  t_fZ = m_veTarget.z
  t_fTargetZs = t_fX * 10 + t_fY * 10 + t_fZ * 5 + t_veOff.z
  if t_veDist.x >= 0 and t_veDist.y >= 0 then
    m_rZTransfer.Init(this.getObject().GetScrPos().z, t_fTargetZs, 1.0, t_fZSteepness, #late)
  else
    if t_veDist.x <= 0 and t_veDist.y <= 0 then
      m_rZTransfer.Init(this.getObject().GetScrPos().z, t_fTargetZs, 1.0, t_fZSteepness, #early)
    else
      m_rZTransfer.Init(this.getObject().GetScrPos().z, t_fTargetZs, 1.0, 1.0, #early)
    end if
  end if
end
on update this
  if m_bWalking then
    t_iFactor = float(the milliSeconds - m_iWlkStartTime) / m_iStatusDelay
    if t_iFactor > 1.0 then
      t_iFactor = 1.0
    end if
    m_iFactor = t_iFactor
    t_rObj = this.getObject()
    t_bWarp = 0
    t_rActual = m_rTarget
    repeat with i = 1 to m_iTarget
      if t_rActual.GetCount() > 0 then
        t_rActual = t_rActual[1]
        next repeat
      end if
      exit repeat
    end repeat
    t_veOffset = (m_veTarget - m_veSource) * t_iFactor
    t_veCurrent = m_veSource + t_veOffset
    t_rObj.SetAbsPos(t_veCurrent)
    if m_veTarget = t_veCurrent then
      t_bWarp = 1
    else
      if m_veDistance.x - abs(t_veOffset.x) < 1 then
        if m_veDistance.y - abs(t_veOffset.y) < 1 then
          if m_veDistance.z - abs(t_veOffset.z) < 1 then
            t_bWarp = 1
          end if
        end if
      end if
    end if
    if t_bWarp then
      this.SetToTileStack(m_rTarget, m_iTarget)
    end if
  else
    m_iFactor = VOID
  end if
end
on select this
  this.getObject().GetVisual().select()
  return callAncestor(#select, this)
end
on Unselect this
  this.getObject().GetVisual().Unselect()
  return callAncestor(#Unselect, this)
end
on SetToTileStack this, a_rTile, a_iStack
  t_rObj = this.getObject()
  t_rActual = a_rTile
  repeat with i = 1 to a_iStack
    if t_rActual.GetCount() > 0 then
      t_rActual = t_rActual[1]
      next repeat
    end if
    exit repeat
  end repeat
  t_rObj.SetAbsPos(t_rActual.GetAbsPos() + vector(0, 0, integer(t_rActual.GetParam("HGT"))))
  m_veDistance = vector()
  m_bWalking = 0
  m_rOldTarget = m_rTarget
  m_iOldStack = m_iTarget
  m_rTarget = VOID
  m_iTarget = 0
  m_veSource = t_rObj.GetAbsPos()
  m_veTarget = m_veSource
  return 1
end
on GetTheTileStack this
  t_rUnknown = this.getObject().GetOwner()
  repeat while 1
    if objectp(t_rUnknown) then
      t_sCls = t_rUnknown.GetParam("CLASS")
      if t_sCls = "tile" or t_sCls = "exit" or t_sCls = "teleport" or t_sCls = "queue" or t_sCls = "sit" then
        return t_rUnknown
      else
        t_rUnknown = t_rUnknown.GetOwner()
      end if
      next repeat
    end if
    return VOID
  end repeat
end