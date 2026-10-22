-- Script
property m_blockDistance
property m_scareDistance
property m_randomID
property m_p_BoundingCircle
property m_b_collisionInited

on construct me
  m_blockDistance = 150
  m_scareDistance = getVariableValue("junglecruise.animals.scareDistance", 100)
  m_randomID = string(the milliSeconds)
  m_p_BoundingCircle = VOID
  m_b_collisionInited = 0
  return 1
end
on deconstruct me
  tBoat = me.getObject().GetParam("Boat")
  if not voidp(tBoat.GetFactor()) then
    tBoat.GetFactor().SetBlocked(0, m_randomID)
  end if
  if not voidp(m_p_BoundingCircle) then
    tID = m_p_BoundingCircle.getID()
    if getObject(tID) <> 0 then
      removeObject(tID)
    end if
  end if
  return 1
end
on createCollisionModifier me
  m_p_BoundingCircle = createObject(#random, "CBoundingCircle")
  tWorldPos = me.getObject().GetParam("WorldPosition")
  tCollRadius = me.getObject().GetParam("BoundingCircleRadius")
  m_p_BoundingCircle.Init(tWorldPos.x, tWorldPos.y, tCollRadius)
  m_p_BoundingCircle.setClient(me)
  m_p_BoundingCircle.SetType(#static)
end
on collisionNotification me, _type
  case _type of
    #circle:
      me.leave()
    #edge:
    otherwise:
      put "Animal had an unknown collision"

  end case
end
on update me
  me.getObject().SetAbsPos(me.getObject().GetParam("WorldPosition"))
  tBlocker = me.getObject().GetParam("IsBlocker")
  tScared = me.getObject().GetParam("IsScared")
  tFrame = me.getObject().GetParam("FrameNum") + 1
  me.getObject().SetParam("FrameNum", tFrame)
  if not m_b_collisionInited then
    if tBlocker then
      me.createCollisionModifier()
    end if
    m_b_collisionInited = 1
  end if
  tstate = me.getObject().GetParam("State")
  case tstate of
    #entry:
      if tFrame > me.getObject().GetParam("Entry").count then
        me.getObject().SetParam("FrameNum", 1)
        me.getObject().SetParam("State", #loop)
      end if
    #loop:
    #leave:

  end case
  tBoat = me.getObject().GetParam("Boat")
  tDistance = (tBoat.getObject().GetAbsPos() - me.getObject().GetAbsPos()).length()
  tstate = me.getObject().GetParam("State")
  if not (tstate = #leave) then
    if tScared then
      if tDistance < m_scareDistance then
        me.leave()
      end if
    end if
  end if
end
on leave me
  if not voidp(m_p_BoundingCircle) then
    tID = m_p_BoundingCircle.getID()
    if getObject(tID) <> 0 then
      removeObject(tID)
    end if
  end if
  me.getObject().SetParam("State", #leave)
  me.getObject().SetParam("FrameNum", 1)
  me.getObject().SetParam("Time", float(me.getObject().GetParam("Leave").count) / 30.0)
end