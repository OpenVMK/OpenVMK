-- Script
property m_stage
property m_ar_visibleHazards
property m_lastTime
property m_roomContext
property m_boat
property m_mp_elementDecl

on construct me
  m_stage = VOID
  m_ar_visibleHazards = []
  m_lastTime = the milliSeconds
  m_roomContext = VOID
  m_boat = VOID
  dumpVariableField(getMember("JC.Elements.list"))
  t_mp_aElementNames = getVariableValue("JungleCruise_ElementNames")
  m_mp_elementDecl = []
  repeat with tElement in t_mp_aElementNames
    tID = getVariableValue("JC.Element." & tElement & ".ID")
    tEntry = getVariableValue("JC.Element." & tElement & ".frames.entry")
    tLoop = getVariableValue("JC.Element." & tElement & ".frames.loop")
    tLeave = getVariableValue("JC.Element." & tElement & ".frames.leave")
    m_mp_elementDecl.setaProp(tID, [#name: tElement, #entry: tEntry, #loop: tLoop, #leave: tLeave])
  end repeat
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
on AddAllHazards me
  if voidp(m_stage) then
    return error(me, "Stage not valid!", #AddAllHazards)
  end if
  if voidp(m_roomContext) then
    return error(me, "Room context not valid!", #AddAllHazards)
  end if
  i = 1
  i_iType = 1
  repeat with tHazard in m_stage.GetHazards()
    case tHazard[#type] of
      #rock:
        t_rXML = CreateXML()
        t_rXML.open(getMember("empty.node.xml").text)
        t_rXML.Search("type", "NODE")
        t_rXML.SetParam("REF", i)
        t_rXML.SetParam("CLASS", "rock")
        m_roomContext._CreateIndexed(i, "rock", t_rXML)
        tRock = m_roomContext._AccessIndexed(i, "rock")
        tRock.SetParam("Reference", i)
        tRock.SetParam("WorldPosition", tHazard[#pos])
        tRock.SetParam("BoundsType", #circle)
        tRadius = getVariableValue("junglecruise.collisionBoundary.radius.hazard")
        if tRadius = 0 then
          tRadius = 10
        end if
        tRock.SetParam("BoundingCircleRadius", tRadius)
        tRock.SetParam("Boat", m_boat)
        tRock.SetParam("IsHit", 0)
        tRock.SetParam("Entry", me.CreateMemberListFromLoop(m_mp_elementDecl.getaProp(i_iType).entry))
        tRock.SetParam("Loop", me.CreateMemberListFromLoop(m_mp_elementDecl.getaProp(i_iType).loop))
        tRock.SetParam("Leave", me.CreateMemberListFromLoop(m_mp_elementDecl.getaProp(i_iType).leave))
        tRock.SetParam("State", #loop)
        tRock.SetParam("FrameNum", 0)
        m_ar_visibleHazards.append(tRock)

    end case
    i = i + 1
  end repeat
  return 1
end
on CreateMemberListFromLoop me, _loop
  tMemList = []
  repeat with tMemName in _loop
    tMem = getMember(tMemName)
    if tMem <> 0 then
      tMemList.append(tMem)
      next repeat
    end if
    put "CHazardManager: Could not find animation member from loop"
  end repeat
  return tMemList
end
on RemoveHazard me, i_rObj
  put "Remove Hazard" && i_rObj
  m_roomContext._RemoveIndexed(i_rObj.GetParam("Reference"), "rock")
end
on ClearAll me
  repeat with tHazard in m_ar_visibleHazards
    me.RemoveHazard(tHazard)
  end repeat
  m_ar_fueloccupied = []
  m_ar_filmoccupied = []
end
on update me
  t_ar_nuVisibleList = []
  repeat with tHazard in m_ar_visibleHazards
    if not tHazard.GetParam("IsHit") then
      t_ar_nuVisibleList.append(tHazard)
      next repeat
    end if
    me.RemoveHazard(tHazard)
  end repeat
  m_ar_visibleHazards = t_ar_nuVisibleList
end
on GetVisibleHazardList me
  return m_ar_visibleHazards
end