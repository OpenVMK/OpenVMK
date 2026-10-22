-- Script
property m_speed
property m_baseSteer
property m_lastTime
property m_mp_blockers
property m_collisionDisabled
property m_collMinDT
property m_lastCollision
property m_baseSpeed
property m_fSteerLimit
property m_fSteerAmount
property m_fAccelLimit
property m_fAccelAmount
property m_fBrakeLimit
property m_fBrakeAmount
property m_p_BoundingCircles
property m_i_throttle
property m_i_velocity
property m_i_steer
property m_i_collisionBounce
property m_i_collisionFriction
property m_b_collisionInited
property m_p_BindDisplacement

on construct me
  m_baseSteer = getVariableValue("river.forces.baseSteer")
  m_speed = m_baseSpeed
  m_lastTime = the milliSeconds
  m_mp_blockers = [:]
  m_collisionDisabled = 0
  m_collMinDT = 1.0
  m_lastCollision = the milliSeconds
  m_baseSpeed = getVariableValue("boat.basespeed")
  m_fSteerLimit = getVariableValue("boat.steerlimit")
  m_fSteerAmount = getVariableValue("boat.steeramount")
  m_fAccelLimit = getVariableValue("boat.accellimit")
  m_fAccelAmount = getVariableValue("boat.accelamount")
  m_fBrakeLimit = getVariableValue("boat.brakelimit")
  m_fBrakeAmount = getVariableValue("boat.brakeamount")
  m_i_throttle = getVariableValue("boat.forces.throttle")
  m_i_velocity = getVariableValue("boat.forces.velocity")
  m_i_steer = getVariableValue("boat.forces.steer")
  m_i_collisionBounce = getVariableValue("boat.forces.collisionBounce")
  m_i_collisionFriction = getVariableValue("boat.forces.collisionFriction")
  m_p_BoundingCircles = []
  tCircle = createObject("BoatBoundingCircle" & getUniqueID(), "CBoundingCircle")
  m_p_BoundingCircles.append(tCircle)
  tCircle = createObject("BoatBoundingCircle" & getUniqueID(), "CBoundingCircle")
  m_p_BoundingCircles.append(tCircle)
  m_b_collisionInited = 0
  m_p_BindDisplacement = vector(0, 0, 0)
  return 1
end
on deconstruct me
  repeat with tCollisionBoudary in m_p_BoundingCircles
    if getObject(tCollisionBoudary.getID()) <> 0 then
      removeObject(tCollisionBoudary.getID())
    end if
  end repeat
  return 1
end
on initCollisionBoundaries me
  tWorldPos = me.getObject().GetParam("WorldPosition")
  tCollRadius = me.getObject().GetParam("BoundingCircleRadius")
  tDirection = me.getObject().GetParam("Direction")
  case tDirection of
    "up":
      m_p_BindDisplacement = vector(0, 50, 0)
    "down":
      m_p_BindDisplacement = vector(-50, 0, 0)

  end case
  m_p_BoundingCircles[1].Init(tWorldPos.x, tWorldPos.y, tCollRadius)
  m_p_BoundingCircles[1].setClient(me)
  m_p_BoundingCircles[1].setDrag(m_i_velocity)
  m_p_BoundingCircles[1].SetType(#moving)
  m_p_BoundingCircles[1].addCollisionModifier(#circle)
  m_p_BoundingCircles[2].Init(tWorldPos.x + m_p_BindDisplacement.x, tWorldPos.y + m_p_BindDisplacement.y, tCollRadius)
  m_p_BoundingCircles[2].setClient(me)
  m_p_BoundingCircles[2].setDrag(m_i_velocity)
  m_p_BoundingCircles[2].SetType(#moving)
  m_p_BoundingCircles[2].addCollisionModifier(#circle)
  m_p_BoundingCircles[1].setBind(m_p_BoundingCircles[2])
  m_p_BoundingCircles[2].setBind(m_p_BoundingCircles[1])
  m_b_collisionInited = 1
end
on force me, a_fSteer, a_fThrottle, a_direction
  case a_direction of
    "up":
      tBaseVector = vector(0, -1.64999997615814, 0)
      tSteerVector = vector(1.57499992847443, 0, 0)
    "down":
      tBaseVector = vector(1.64999997615814, 0, 0)
      tSteerVector = vector(0, 1.57499992847443, 0)

  end case
  return tBaseVector * (a_fThrottle + m_baseSpeed) + tSteerVector * a_fSteer * m_baseSteer
end
on update me
  tStage = me.getObject().GetParam("Stage")
  tDirection = me.getObject().GetParam("Direction")
  tThrottle = me.getObject().GetParam("Throttle")
  tSteer = me.getObject().GetParam("Steer")
  tVelocity = me.getObject().GetParam("Velocity")
  if not voidp(tStage) then
    if not m_b_collisionInited then
      me.initCollisionBoundaries()
    end if
    tForce = me.force(tSteer, tThrottle, tDirection)
    m_p_BoundingCircles[1].setForce(tForce)
    m_p_BoundingCircles[2].setForce(tForce)
    tSteer = tSteer * m_i_steer
    tThrottle = tThrottle * m_i_throttle
    me.getObject().SetParam("Steer", tSteer)
    me.getObject().SetParam("Throttle", tThrottle)
    me.getObject().SetParam("Velocity", m_p_BoundingCircles[1].velocity)
    me.getObject().SetParam("WorldPosition", m_p_BoundingCircles[1].origin)
    tPos = me.getObject().GetParam("WorldPosition")
    me.getObject().SetAbsPos(tPos)
  end if
end
on collisionNotification me, _type, _collisionType, _collisionObject
  t_bResponse = 1
  tSpeed = m_p_BoundingCircles[1].velocity.length()
  case _type of
    #circle:
      if _collisionObject.GetType() = #nobody then
        t_bResponse = 0
      end if
    #edge:
      t_sEdgeName = _collisionObject.GetName()
      if t_sEdgeName contains "boundary" then
        case t_sEdgeName of
          "boundary_3", "boundary_2":
            me.getObject().SetParam("StageOver", 1)
            t_bResponse = 0

        end case
      end if
      if tSpeed > 3.5 then
        if the milliSeconds - m_lastCollision > m_collMinDT * 1000 then
          m_lastCollision = the milliSeconds
        else
          t_bResponse = 0
        end if
      else
        t_bResponse = 0
      end if

  end case
  if t_bResponse then
    tHost = getThread("junglecruise").getComponent().GetHostCharacter()
    getThread("junglecruise").getComponent().playFx("JC-crash")
    tHost.SayWatchout()
    executeMessage(#SendMinigameAction, 5, [])
    me.getObject().GetVisual().collisionNotification(_type, _collisionType, _collisionObject)
  end if
end
on GoLeft me
  tStage = me.getObject().GetParam("Stage")
  if not voidp(tStage) then
    tSteer = me.getObject().GetParam("Steer")
    tSteer = tSteer - m_fSteerAmount
    if tSteer < -m_fSteerLimit then
      tSteer = -m_fSteerLimit
    end if
    if tSteer > m_fSteerLimit then
      tSteer = m_fSteerLimit
    end if
    me.getObject().SetParam("Steer", tSteer)
  end if
end
on GoRight me
  tStage = me.getObject().GetParam("Stage")
  if not voidp(tStage) then
    tSteer = me.getObject().GetParam("Steer")
    tSteer = tSteer + m_fSteerAmount
    if tSteer < -m_fSteerLimit then
      tSteer = -m_fSteerLimit
    end if
    if tSteer > m_fSteerLimit then
      tSteer = m_fSteerLimit
    end if
    me.getObject().SetParam("Steer", tSteer)
  end if
end
on GoUp me
  tThrottle = me.getObject().GetParam("Throttle")
  tThrottle = tThrottle + m_fAccelAmount
  if tThrottle >= m_fAccelLimit then
    tThrottle = m_fAccelLimit
  else
    tdata = [3]
    executeMessage(#SendMinigameAction, 4, tdata)
  end if
  me.getObject().SetParam("Throttle", tThrottle)
end
on GoDown me
  tThrottle = me.getObject().GetParam("Throttle")
  tThrottle = tThrottle - m_fBrakeAmount
  if tThrottle <= -m_fBrakeLimit then
    tThrottle = -m_fBrakeLimit
  else
    tdata = [1]
    executeMessage(#SendMinigameAction, 4, tdata)
  end if
  me.getObject().SetParam("Throttle", tThrottle)
end
on getSpeed me
  return me.getObject().GetParam("Throttle")
end
on IsBlocked me
  repeat with tBlockState in m_mp_blockers
    if tBlockState then
      return 1
    end if
  end repeat
  return 0
end
on SetBlocked me, a_bState, a_blockerID
  if not me.IsBlocked() and a_bState then
    getThread("junglecruise").getComponent().GetHostCharacter().SayWatchout()
  end if
  m_mp_blockers.setaProp(a_blockerID, a_bState)
end
on DisableCollision me
  m_collisionDisabled = 1
end