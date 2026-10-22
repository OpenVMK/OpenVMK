-- Parent Script
property m_stage
property m_mp_visibleAnimals
property m_mp_animalDecl
property m_lastTime
property m_roomContext
property m_boat
property m_ar_puffs
property m_iNextPuffRef
property m_mp_ar_spotsTaken

on construct me
  m_stage = VOID
  m_mp_visibleAnimals = []
  m_mp_animalDecl = [:]
  m_lastTime = the milliSeconds
  m_ar_puffs = []
  m_iNextPuffRef = 1
  m_mp_ar_spotsTaken = [:]
  dumpVariableField(getMember("animal.list"))
  t_mp_animalNames = getVariableValue("JungleCruise_AnimalNames")
  repeat with tAnimal in t_mp_animalNames
    tID = getVariableValue("Animal." & tAnimal & ".ID")
    tEntry = getVariableValue("Animal." & tAnimal & ".frames.entry")
    tLoop = getVariableValue("Animal." & tAnimal & ".frames.loop")
    tLeave = getVariableValue("Animal." & tAnimal & ".frames.leave")
    tBlocker = getVariableValue("Animal." & tAnimal & ".blocker")
    tScared = getVariableValue("Animal." & tAnimal & ".scared")
    m_mp_animalDecl.setaProp(tID, [#name: tAnimal, #entry: tEntry, #loop: tLoop, #leave: tLeave, #blocker: tBlocker, #scared: tScared])
  end repeat
  m_roomContext = VOID
  m_boat = VOID
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
on CreateRoomObject me, a_sClass, a_iRef, a_mp_params
  t_rXML = CreateXML()
  t_rXML.open(getMember("empty.node.xml").text)
  t_rXML.Search("type", "NODE")
  t_rXML.SetParam("REF", a_iRef)
  t_rXML.SetParam("CLASS", a_sClass)
  m_roomContext._CreateIndexed(a_iRef, a_sClass, t_rXML)
  tNewObject = m_roomContext._AccessIndexed(a_iRef, a_sClass)
  tNewObject.SetParam("Reference", a_iRef)
  repeat with i = 1 to a_mp_params.count
    tKey = a_mp_params.getPropAt(i)
    tValue = a_mp_params.getaProp(tKey)
    tNewObject.SetParam(tKey, tValue)
  end repeat
  return tNewObject
end
on RemoveRoomObject me, a_sClass, a_iRef
  if not voidp(m_roomContext) then
    m_roomContext._RemoveIndexed(a_iRef, a_sClass)
  end if
end
on AddOneAnimal me, i_ref, i_iType
  if voidp(m_stage) then
    return error(me, "Stage not valid!", #AddOneAnimal)
  end if
  if voidp(m_roomContext) then
    return error(me, "Room context not valid!", #AddOneAnimal)
  end if
  tSet = m_stage.GetAnimalSet(i_iType)
  if not voidp(tSet) then
    t_ar_iReserved = m_mp_ar_spotsTaken.getaProp(tSet.name)
    if voidp(t_ar_iReserved) then
      m_mp_ar_spotsTaken.setaProp(tSet.name, [])
      t_ar_iReserved = m_mp_ar_spotsTaken.getaProp(tSet.name)
    end if
    tSpotIndex = random(tSet.Spots.count)
    if t_ar_iReserved.getPos(tSpotIndex) <> 0 then
      repeat with i = 1 to tSet.Spots.count
        if t_ar_iReserved.getPos(i) = 0 then
          exit repeat
        end if
      end repeat
      if i < tSet.Spots.count then
        tSpotIndex = i
      else
        exit
      end if
    end if
    t_rXML = CreateXML()
    t_rXML.open(getMember("empty.node.xml").text)
    t_rXML.Search("type", "NODE")
    t_rXML.SetParam("REF", i_ref)
    t_rXML.SetParam("CLASS", "animal")
    m_roomContext._CreateIndexed(i_ref, "animal", t_rXML)
    tRoomObj = m_roomContext._AccessIndexed(i_ref, "animal")
    tRoomObj.SetOwner(m_roomContext)
    if voidp(tRoomObj) then
      return error(me, "FATAL ERROR : Animal object create unsuccesful", #AddOneAnimal)
    else
      tRoomObj.SetParam("Reference", i_ref)
      tRoomObj.SetParam("Type", i_iType)
      tRoomObj.SetParam("WorldPosition", tSet.Spots[tSpotIndex].pos)
      tRoomObj.SetParam("Time", float(tSet.Spots[tSpotIndex].time))
      tRoomObj.SetParam("Flip", float(tSet.Spots[tSpotIndex].flip))
      tRoomObj.SetParam("Scale", float(tSet.Spots[tSpotIndex].scale))
      tRoomObj.SetParam("FullTime", float(tSet.Spots[tSpotIndex].time))
      tRoomObj.SetParam("Entry", me.CreateMemberListFromLoop(m_mp_animalDecl.getaProp(i_iType).entry))
      tRoomObj.SetParam("Loop", me.CreateMemberListFromLoop(m_mp_animalDecl.getaProp(i_iType).loop))
      tRoomObj.SetParam("Leave", me.CreateMemberListFromLoop(m_mp_animalDecl.getaProp(i_iType).leave))
      tRoomObj.SetParam("IsBlocker", m_mp_animalDecl.getaProp(i_iType).blocker)
      tRoomObj.SetParam("IsScared", m_mp_animalDecl.getaProp(i_iType).scared)
      tRoomObj.SetParam("State", #entry)
      tRoomObj.SetParam("FrameNum", 0)
      tRoomObj.SetParam("Boat", m_boat)
      tRoomObj.SetParam("Spot", tSpotIndex)
      tRoomObj.SetParam("AnimalSet", tSet.name)
      tRadius = getVariableValue("junglecruise.collisionBoundary.radius.animal")
      if tRadius = 0 then
        tRadius = 10
      end if
      tRoomObj.SetParam("BoundingCircleRadius", tRadius)
      tVisualizer = tRoomObj.GetVisual()
      tFactor = tRoomObj.GetFactor()
    end if
    getThread("junglecruise").getComponent().playFx(tSet.sound)
    m_iNextPuffRef = m_iNextPuffRef + 1
    me.CreatePuff(tSet.Spots[tSpotIndex].pos, m_iNextPuffRef, float(tSet.Spots[tSpotIndex].scale))
    m_mp_visibleAnimals.addProp(i_ref, tRoomObj)
    t_ar_iReserved.append(tSpotIndex)
    m_mp_ar_spotsTaken.setaProp(tSet.name, t_ar_iReserved)
  end if
end
on CreateMemberListFromLoop me, _loop
  tMemList = []
  repeat with tMemName in _loop
    tMem = getMember(tMemName)
    if tMem <> 0 then
      tMemList.append(tMem)
      next repeat
    end if
    put "CAnimalManager: Could not find animation member from loop"
  end repeat
  return tMemList
end
on RemoveAnimal me, i_rObj
  tSet = m_stage.GetAnimalSet(i_rObj.GetParam("Type"))
  tSpot = i_rObj.GetParam("Spot")
  m_roomContext._RemoveIndexed(i_rObj.GetParam("Reference"), "animal")
  m_mp_ar_spotsTaken.getaProp(tSet.name).deleteOne(tSpot)
end
on ClearAll me
  repeat with tAnimal in m_mp_visibleAnimals
    me.RemoveAnimal(tAnimal)
  end repeat
  m_mp_visibleAnimals = [:]
end
on CreatePuff me, i_vPosition, i_iRef, i_fScale
  t_mp_params = ["WorldPosition": i_vPosition, "Age": 1, "Reference": i_iRef, "Scale": i_fScale]
  tObject = me.CreateRoomObject("puff", i_iRef, t_mp_params)
  m_ar_puffs.append(tObject)
end
on RemovePuff me, i_iRef
  me.RemoveRoomObject("puff", i_iRef)
end
on LeaveAnimal me, a_iRef
  tAnimal = m_mp_visibleAnimals.getaProp(a_iRef)
  tAnimal.SetParam("State", #leave)
  tAnimal.SetParam("FrameNum", 1)
  tAnimal.SetParam("Time", 0)
  m_iNextPuffRef = m_iNextPuffRef + 1
  me.CreatePuff(tAnimal.GetParam("WorldPosition"), m_iNextPuffRef, tAnimal.GetParam("Scale"))
end
on update me
  tTime = the milliSeconds
  dt = (tTime - m_lastTime) / 1000.0
  m_lastTime = tTime
  t_mp_nuVisibleList = [:]
  repeat with tAnimal in m_mp_visibleAnimals
    if not voidp(tAnimal.GetFactor()) then
      tTime = tAnimal.GetParam("Time")
      tTime = tTime - dt
      tAnimal.SetParam("Time", tTime)
      tstate = tAnimal.GetParam("State")
      if tTime * 30 < tAnimal.GetParam("Leave").count and tstate <> #leave then
        tAnimal.SetParam("State", #leave)
        tAnimal.SetParam("FrameNum", 1)
        m_iNextPuffRef = m_iNextPuffRef + 1
        me.CreatePuff(tAnimal.GetParam("WorldPosition"), m_iNextPuffRef, tAnimal.GetParam("Scale"))
      end if
      if tTime > 0.0 then
        t_mp_nuVisibleList.addProp(tAnimal.GetParam("Reference"), tAnimal)
      else
        me.RemoveAnimal(tAnimal)
      end if
      next repeat
    end if
    me.RemoveAnimal(tAnimal)
  end repeat
  m_mp_visibleAnimals = t_mp_nuVisibleList
  t_ar_newpuffs = []
  repeat with tObj in m_ar_puffs
    if not voidp(tObj.GetFactor()) then
      if tObj.GetFactor().IsRemovable() then
        me.RemovePuff(tObj.getObject().GetParam("Reference"))
        next repeat
      end if
      t_ar_newpuffs.append(tObj)
    end if
  end repeat
  m_ar_puffs = t_ar_newpuffs
end
on GetVisibleAnimalList me
  return m_mp_visibleAnimals
end
on GetFrames me, i_iID
  return the framelist of m_mp_animalDecl.getaProp(i_iID)
end
on GetAnimalID me, a_iRef
  tRoomObj = m_roomContext._AccessIndexed(a_iRef, "animal")
  return tRoomObj.GetParam("Type")
end