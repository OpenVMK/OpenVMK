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
  t_fZ = this.m_rTarget
  t_fY = 0
  repeat with t_veOff = 1 to this.m_iTarget
    if t_fZ.GetCount() > 0 then
      t_fZ = t_fZ[1]
      t_fY = t_fY + 1
      next repeat
    end if
    exit repeat
  end repeat
  m_veSource = this.getObject().GetAbsPos()
  m_veTarget = t_fZ.GetAbsPos() + vector(0, 0, integer(t_fZ.GetParam("HGT")))
  t_iActual = this.m_veSource - this.m_veTarget
  m_veDistance = vector(abs(t_iActual.x), abs(t_iActual.y), abs(t_iActual.z))
  if this.m_veSource.x = this.m_veTarget.x then
    if this.m_veSource.y = this.m_veTarget.y then
      this.SetToTileStack(a_rTile, a_iStack)
      exit
    end if
  end if
  i = a_rTile
  repeat with t_veOff = 1 to a_iStack
    if i.GetCount() > 0 then
      i = i[1]
      next repeat
    end if
    exit repeat
  end repeat
  t_rActual = this.m_rOldTarget
  if voidp(t_rActual) then
    t_rActual = this.getObject().GetOwner()
  end if
  repeat with t_veOff = 1 to this.m_iOldStack
    if t_rActual.GetCount() > 0 then
      t_rActual = t_rActual[1]
      next repeat
    end if
    exit repeat
  end repeat
  if not voidp(i.GetParam("ZTRANS")) or not voidp(t_rActual.GetParam("ZTRANS")) then
    t_veDist = value(i.GetParam("ZTRANS"))
    if not voidp(t_rActual.GetParam("ZTRANS")) then
      if value(t_rActual.GetParam("ZTRANS")) > t_veDist then
        t_veDist = value(t_rActual.GetParam("ZTRANS"))
      end if
    end if
  else
    t_veDist = 1.0
  end if
  t_rOverTarget = this.getObject().GetContext().GetScrPos()
  t_fX = this.m_veTarget.x
  t_fTargetZs = this.m_veTarget.y
  t_fZSteepness = this.m_veTarget.z
  t_rUnderMe = t_fX * 10 + t_fTargetZs * 10 + t_fZSteepness * 5 + t_rOverTarget.z
  if t_iActual.x >= 0 and t_iActual.y >= 0 then
    this.m_rZTransfer.Init(this.getObject().GetScrPos().z, t_rUnderMe, 1.0, t_veDist, #late)
  else
    if t_iActual.x <= 0 and t_iActual.y <= 0 then
      this.m_rZTransfer.Init(this.getObject().GetScrPos().z, t_rUnderMe, 1.0, t_veDist, #early)
    else
      this.m_rZTransfer.Init(this.getObject().GetScrPos().z, t_rUnderMe, 1.0, 1.0, #early)
    end if
  end if
end
on update this
  if this.m_bWalking then
    if this.getObject().GetVisual().m_rRenderer.m_rAction = "std" then
      this.getObject().GetVisual().m_rRenderer.setAction("wlk")
      this.getObject().GetVisual().m_rRenderer.m_bDirty = 1
    end if
    t_veOffset = float(the milliSeconds - this.m_iWlkStartTime) / this.m_iStatusDelay
    if t_veOffset > 1.0 then
      t_veOffset = 1.0
    end if
    m_iFactor = t_veOffset
    t_iAct = this.getObject()
    t_iFactor = 0
    t_fZ = this.m_rTarget
    repeat with t_veOff = 1 to this.m_iTarget
      if t_fZ.GetCount() > 0 then
        t_fZ = t_fZ[1]
        next repeat
      end if
      exit repeat
    end repeat
    t_veCurrent = (this.m_veTarget - this.m_veSource) * t_veOffset
    t_bWarp = this.m_veSource + t_veCurrent
    t_iAct.SetAbsPos(t_bWarp)
    if this.m_veTarget = t_bWarp then
      t_iFactor = 1
    else
      if this.m_veDistance.x - abs(t_veCurrent.x) < 1 then
        if this.m_veDistance.y - abs(t_veCurrent.y) < 1 then
          if this.m_veDistance.z - abs(t_veCurrent.z) < 1 then
            t_iFactor = 1
          end if
        end if
      end if
    end if
    if t_iFactor then
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
  t_iAct = this.getObject()
  t_iAct.SetParam("CLASS", "pointer")
  t_fZ = a_rTile
  repeat with t_veOff = 1 to a_iStack
    if t_fZ.GetCount() > 0 then
      t_fZ = t_fZ[1]
      next repeat
    end if
    exit repeat
  end repeat
  t_iAct.SetAbsPos(t_fZ.GetAbsPos() + vector(0, 0, integer(t_fZ.GetParam("HGT"))))
  m_veDistance = vector()
  m_bWalking = 0
  m_rOldTarget = this.m_rTarget
  m_iOldStack = this.m_iTarget
  m_rTarget = VOID
  m_iTarget = 0
  m_veSource = t_iAct.GetAbsPos()
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