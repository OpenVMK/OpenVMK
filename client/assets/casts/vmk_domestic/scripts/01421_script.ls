-- Script
property m_iFactor
property m_iWlkStartTime
property m_iStatusDelay
property m_veDistance
property m_bWalking
property m_rTarget
property m_iTarget
property m_rOldTarget
property m_iOldStack
property m_veTarget
property m_veSource
property m_rZTransfer

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
on Unselect this
  return 0
end
on WalkToTile this, a_rTile, a_iStack
  if this.m_bWalking then
    this.SetToTileStack(this.m_rTarget, this.m_iTarget)
  end if
  m_rTarget = a_rTile
  m_iTarget = a_iStack
  m_iWlkStartTime = the milliSeconds
  m_bWalking = 1
  t_rActual = this.m_rTarget
  t_iActual = 0
  repeat with i = 1 to this.m_iTarget
    if t_rActual.GetCount() > 0 then
      t_rActual = t_rActual[1]
      t_iActual = t_iActual + 1
      next repeat
    end if
    exit repeat
  end repeat
  m_veSource = this.getObject().GetAbsPos()
  m_veTarget = t_rActual.GetAbsPos() + vector(0, 0, integer(t_rActual.GetParam("HGT")))
  t_veDist = this.m_veSource - this.m_veTarget
  m_veDistance = vector(abs(t_veDist.x), abs(t_veDist.y), abs(t_veDist.z))
  if this.m_veSource.x = this.m_veTarget.x then
    if this.m_veSource.y = this.m_veTarget.y then
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
  t_rUnderMe = this.m_rOldTarget
  if voidp(t_rUnderMe) then
    t_rUnderMe = this.getObject().GetOwner()
  end if
  repeat with i = 1 to this.m_iOldStack
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
  t_fX = this.m_veTarget.x
  t_fY = this.m_veTarget.y
  t_fZ = this.m_veTarget.z
  t_fTargetZs = t_fX * 10 + t_fY * 10 + t_fZ * 5 + t_veOff.z
  if t_veDist.x >= 0 and t_veDist.y >= 0 then
    this.m_rZTransfer.Init(this.getObject().GetScrPos().z, t_fTargetZs, 1.0, t_fZSteepness, #late)
  else
    if t_veDist.x <= 0 and t_veDist.y <= 0 then
      this.m_rZTransfer.Init(this.getObject().GetScrPos().z, t_fTargetZs, 1.0, t_fZSteepness, #early)
    else
      this.m_rZTransfer.Init(this.getObject().GetScrPos().z, t_fTargetZs, 1.0, 1.0, #early)
    end if
  end if
end
on update this
  if this.m_bWalking then
    if this.getObject().GetVisual().m_rRenderer.m_rAction = "std" then
      this.getObject().GetVisual().m_rRenderer.setAction("wlk")
      this.getObject().GetVisual().m_rRenderer.m_bDirty = 1
    end if
    t_iFactor = float(the milliSeconds - this.m_iWlkStartTime) / this.m_iStatusDelay
    if t_iFactor > 1.0 then
      t_iFactor = 1.0
    end if
    m_iFactor = t_iFactor
    t_rObj = this.getObject()
    t_bWarp = 0
    t_rActual = this.m_rTarget
    repeat with i = 1 to this.m_iTarget
      if t_rActual.GetCount() > 0 then
        t_rActual = t_rActual[1]
        next repeat
      end if
      exit repeat
    end repeat
    t_veOffset = (this.m_veTarget - this.m_veSource) * t_iFactor
    t_veCurrent = this.m_veSource + t_veOffset
    t_rObj.SetAbsPos(t_veCurrent)
    if this.m_veTarget = t_veCurrent then
      t_bWarp = 1
    else
      if this.m_veDistance.x - abs(t_veOffset.x) < 1 then
        if this.m_veDistance.y - abs(t_veOffset.y) < 1 then
          if this.m_veDistance.z - abs(t_veOffset.z) < 1 then
            t_bWarp = 1
          end if
        end if
      end if
    end if
    if t_bWarp then
      this.SetToTileStack(this.m_rTarget, this.m_iTarget)
    end if
  else
    if this.getObject().GetVisual().m_rRenderer.m_rAction = "wlk" and integer(this.getObject().GetParam("ACT")) = 0 then
      this.getObject().GetVisual().m_rRenderer.setAction("std")
      this.getObject().GetVisual().m_rRenderer.m_bDirty = 1
    end if
    m_iFactor = VOID
  end if
end
on SetToTileStack this, a_rTile, a_iStack
  t_rObj = this.getObject()
  t_rObj.SetParam("CLASS", "pointer")
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
  m_rOldTarget = this.m_rTarget
  m_iOldStack = this.m_iTarget
  m_rTarget = VOID
  m_iTarget = 0
  m_veSource = t_rObj.GetAbsPos()
  m_veTarget = this.m_veSource
  return 1
end
on GetBlocks this
  return []
end
on select this
  trace("select(this)")
  getObject(#VMK).send("CLICKPET", [#int: integer(this.getObject().GetParam("REF"))])
  return 1
end
on GetTheTileStack this
  return VOID
end