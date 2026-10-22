-- Script
property m_stage
property m_ar_visiblePowerups
property m_lastTime
property m_roomContext
property m_boat
property m_ar_fueloccupied
property m_ar_filmoccupied

on construct me
  m_stage = VOID
  m_ar_visiblePowerups = []
  m_lastTime = the milliSeconds
  m_roomContext = VOID
  m_boat = VOID
  m_ar_fueloccupied = []
  m_ar_filmoccupied = []
  return 1
end
on deconstruct me
  return 1
end
on SetStage me, i_rStage
  m_stage = i_rStage
end
on SetRoomContext me, i_rRoomContext
  m_roomContext = i_rRoomContext
end
on SetBoat me, a_rBoat
  m_boat = a_rBoat
end
on AddOnePowerup me, i_ref, i_type
  if voidp(m_stage) then
    return error(me, "Stage not valid!", #AddOneAnimal)
  end if
  if voidp(m_roomContext) then
    return error(me, "Room context not valid!", #AddOneAnimal)
  end if
  tSpots = m_stage.GetPowerups(i_type)
  tSpotIndex = random(tSpots.count)
  tSpotFree = 0
  case i_type of
    #film:
      if m_ar_filmoccupied.getOne(tSpotIndex) = 0 then
        tSpotFree = 1
        m_ar_filmoccupied.append(tSpotIndex)
      end if
    #fuel:
      if m_ar_fueloccupied.getOne(tSpotIndex) = 0 then
        tSpotFree = 1
        m_ar_fueloccupied.append(tSpotIndex)
      end if

  end case
  if tSpots.count > 0 and tSpotFree then
    t_rXML = CreateXML()
    t_rXML.open(getMember("empty.node.xml").text)
    t_rXML.Search("type", "NODE")
    t_rXML.SetParam("REF", i_ref)
    t_rXML.SetParam("CLASS", "powerup")
    m_roomContext._CreateIndexed(i_ref, "powerup", t_rXML)
    tRoomObj = m_roomContext._AccessIndexed(i_ref, "powerup")
    tRoomObj.SetOwner(m_roomContext)
    if voidp(tRoomObj) then
      return error(me, "FATAL ERROR : Powerup object create unsuccesful", #AddOnePowerup)
    else
      tRoomObj.SetParam("Reference", i_ref)
      tRoomObj.SetParam("Type", i_type)
      tRoomObj.SetParam("WorldPosition", tSpots[tSpotIndex].pos)
      tRoomObj.SetParam("Picked", 0)
      tRoomObj.SetParam("BoundsType", #circle)
      tRadius = getVariableValue("junglecruise.collisionBoundary.radius.powerUp." & i_type)
      if tRadius = 0 then
        tRadius = 10
      end if
      tRoomObj.SetParam("BoundingCircleRadius", tRadius)
      tRoomObj.SetParam("Boat", m_boat)
      tRoomObj.SetParam("SpotIndex", tSpotIndex)
      tVisualizer = tRoomObj.GetVisual()
      tFactor = tRoomObj.GetFactor()
    end if
    m_ar_visiblePowerups.append(tRoomObj)
    return 1
  end if
  return 0
end
on RemovePowerup me, i_rObj
  ttype = i_rObj.GetParam("type")
  tSpotIndex = i_rObj.GetParam("SpotIndex")
  case ttype of
    #film:
      m_ar_filmoccupied.deleteOne(tSpotIndex)
    #fuel:
      m_ar_fueloccupied.deleteOne(tSpotIndex)

  end case
  m_roomContext._RemoveIndexed(i_rObj.GetParam("Reference"), "powerup")
end
on ClearAll me
  repeat with tPowerup in m_ar_visiblePowerups
    me.RemovePowerup(tPowerup)
  end repeat
  m_ar_fueloccupied = []
  m_ar_filmoccupied = []
end
on update me
  tTime = the milliSeconds
  dt = (tTime - m_lastTime) / 1000.0
  m_lastTime = tTime
  t_ar_nuVisibleList = []
  repeat with tPowerup in m_ar_visiblePowerups
    if not tPowerup.GetParam("Picked") then
      t_ar_nuVisibleList.append(tPowerup)
      next repeat
    end if
    me.RemovePowerup(tPowerup)
  end repeat
  m_ar_visiblePowerups = t_ar_nuVisibleList
end
on GetVisiblePowerupList me
  return m_ar_visiblePowerups
end