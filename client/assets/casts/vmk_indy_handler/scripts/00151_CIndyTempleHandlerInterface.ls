-- Script
property m_ar_rBoats
property m_iRefCounter
property m_lastTime
property m_knotspersec

on construct me
  m_iRefCounter = 1
  m_ar_rBoats = []
  m_lastTime = the milliSeconds
  m_knotspersec = 1.23999989032745
  return 1
end
on deconstruct me
  removeUpdate(me.getID())
  repeat with tBoat in m_ar_rBoats
    RemoveRoomObject("boat", tBoat.GetParam("Reference"))
  end repeat
  return 1
end
on CreateRoomObject me, a_sClass, a_iRef, a_mp_params
  t_rRoomContext = getThread("room").getComponent()._AccessRoom()
  t_rXML = CreateXML()
  t_rXML.open(getMember("empty.node.xml").text)
  t_rXML.Search("type", "NODE")
  t_rXML.SetParam("REF", a_iRef)
  t_rXML.SetParam("CLASS", a_sClass)
  t_rRoomContext._CreateIndexed(a_iRef, a_sClass, t_rXML)
  tNewObject = t_rRoomContext._AccessIndexed(a_iRef, a_sClass)
  tNewObject.SetParam("Reference", a_iRef)
  repeat with i = 1 to a_mp_params.count
    tKey = a_mp_params.getPropAt(i)
    tvalue = a_mp_params.getaProp(tKey)
    tNewObject.SetParam(tKey, tvalue)
  end repeat
  return tNewObject
end
on RemoveRoomObject me, a_sClass, a_iRef
  t_rRoomContext = getThread("room").getComponent()._AccessRoom()
  if not voidp(t_rRoomContext) then
    t_rRoomContext._RemoveIndexed(a_iRef, a_sClass)
  end if
end
on NewBoat me, a_iBoatColor, a_ar_iAvatarFigure, a_iAnimationAge
  tObject = me.CreateRoomObject("boat", m_iRefCounter, ["Reference": m_iRefCounter, "RailPosition": 0.0, "AvatarFigure": a_ar_iAvatarFigure, "Color": a_iBoatColor, "Steer": 0.0, "AvatarOn": 1, "SpotOn": 1, "Direction": "down"])
  tObject.SetAbsPos(vector(0, 0, 30000))
  t_mpList = [#figure: a_ar_iAvatarFigure, #Dir: [3, 3], #act: [100, 0], #Output: VOID]
  executeMessage("GetAvatarImage", t_mpList)
  tObject.GetVisual().SetAvatarImage(t_mpList[#Output])
  m_iRefCounter = m_iRefCounter + 1
  m_ar_rBoats.append(tObject)
  tRailpos = a_iAnimationAge / 1000.0 * m_knotspersec
  tObject.SetParam("RailPosition", tRailpos)
end
on update me
  tTime = the milliSeconds
  tDt = (tTime - m_lastTime) / 1000.0
  m_lastTime = tTime
  t_rSpline = me.getComponent().GetSpline()
  t_ar_rNewBoats = []
  repeat with tBoat in m_ar_rBoats
    tRailpos = tBoat.GetParam("RailPosition")
    if tRailpos < t_rSpline.getNumControlPoints() - 3 then
      tBoat.SetAbsPos(t_rSpline.InterpolateAt(tRailpos))
      tBoat.SetParam("RailPosition", tRailpos + tDt * m_knotspersec)
      t_ar_rNewBoats.append(tBoat)
      next repeat
    end if
    me.RemoveRoomObject("boat", tBoat.GetParam("Reference"))
  end repeat
  m_ar_rBoats = t_ar_rNewBoats
end