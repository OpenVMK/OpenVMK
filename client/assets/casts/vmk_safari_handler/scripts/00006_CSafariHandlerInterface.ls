-- Movie Script
property m_ar_rBoats
property m_iRefCounter
property m_lastTime
property m_knotspersec

on construct me
  m_iRefCounter = 1
  m_ar_rBoats = []
  m_lastTime = the milliSeconds
  m_knotspersec = 1.4099999666214
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
  t_objAnimator = createObject(#temp, "CAvatarAnimator")
  t_objAnimator.setCallback(me.getID(), #ImageDone, [a_iBoatColor, a_ar_iAvatarFigure, a_iAnimationAge])
  t_mp_data = [#outlook: a_ar_iAvatarFigure, #tilesize: 32]
  t_objAnimator.Define(t_mp_data)
  t_mp_data2 = [#head: 1, #body: 1, #emoticon: 0, #LeftHand: 100, #RightHand: 100, #legs: 0, #magic: 0]
  t_objAnimator.SetAction(t_mp_data2)
end
on ImageDone me, a_img, a_mp_BoatData
  tObject = me.CreateRoomObject("boat", m_iRefCounter, ["Reference": m_iRefCounter, "RailPosition": 0.0, "AvatarFigure": a_mp_BoatData[2], "Color": a_mp_BoatData[1], "Steer": 0.0, "AvatarOn": 1, "SpotOn": 1, "Direction": "up"])
  if objectp(tObject) then
    tObject.SetAbsPos(vector(0, 0, 30000))
    tObject.GetVisual().SetAvatarImage(a_img)
    m_ar_rBoats.append(tObject)
    m_iRefCounter = m_iRefCounter + 1
    tRailpos = a_mp_BoatData[3] / 1000.0 * m_knotspersec
    tObject.SetParam("RailPosition", tRailpos)
  end if
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