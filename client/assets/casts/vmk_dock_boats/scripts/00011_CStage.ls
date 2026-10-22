-- Score Script
property m_sName
property m_sRoomName
property m_sMusic
property m_sAtmos
property m_iStartTime
property m_iEndTime
property m_sDirection
property m_bUseSpot
property m_mp_animalSets
property m_splines
property m_deviation
property m_ar_hazards
property m_ar_powerups
property m_ar_leftboundary
property m_ar_rightboundary
property m_iBoundaryAccuracy
property m_ar_markers

on construct me
  m_sName = EMPTY
  m_sRoomName = EMPTY
  m_sMusic = EMPTY
  m_sAtmos = EMPTY
  m_iStartTime = 0
  m_iEndTime = 0
  m_sDirection = EMPTY
  m_bUseSpot = 0
  m_mp_animalSets = [:]
  m_splines = [VOID, VOID, VOID]
  m_deviation = 0
  m_ar_hazards = []
  m_ar_powerups = []
  m_ar_leftboundary = []
  m_ar_rightboundary = []
  m_iBoundaryAccuracy = 400
  m_ar_markers = []
  return 1
end
on deconstruct me
  if m_splines[1] <> 0 then
    removeObject(m_splines[1].getID())
  end if
  if m_splines[2] <> 0 then
    removeObject(m_splines[2].getID())
  end if
  if m_splines[3] <> 0 then
    removeObject(m_splines[3].getID())
  end if
  return 1
end
on FindBoundary me, a_rSpline, a_normalSide
  o_ar_boundary = []
  tDelta = (float(a_rSpline.getNumControlPoints() - 3) - 0.813999950885773) / m_iBoundaryAccuracy
  repeat with i = 1 to m_iBoundaryAccuracy
    o_ar_boundary[i] = [#pos: a_rSpline.InterpolateAt(i * tDelta), #normal: a_rSpline.NormalAt(i * tDelta, a_normalSide, #xy), #tangent: a_rSpline.TangentAt(i * tDelta)]
  end repeat
  return o_ar_boundary
end
on visualizeboundaries me
  repeat with i = 1 to m_ar_leftboundary.count
    m_ar_markers[i].member = member("splinemarker")
    m_ar_markers[i].width = m_ar_markers[i].member.width
    m_ar_markers[i].height = m_ar_markers[i].member.height
    m_ar_markers[i].loc = ProjectAxonometricPosition(point(m_ar_leftboundary[i].pos.x, m_ar_leftboundary[i].pos.y))
    m_ar_markers[i].locZ = 0
  end repeat
  repeat with i = 1 to m_ar_rightboundary.count
    j = i + m_iBoundaryAccuracy
    m_ar_markers[j].member = member("splinemarker")
    m_ar_markers[j].width = m_ar_markers[j].member.width
    m_ar_markers[j].height = m_ar_markers[j].member.height
    m_ar_markers[j].loc = ProjectAxonometricPosition(point(m_ar_rightboundary[i].pos.x, m_ar_rightboundary[i].pos.y))
    m_ar_markers[j].locZ = 0
  end repeat
end
on FindBoundaries me
  if me.getDirection() = "up" then
    m_ar_leftboundary = me.FindBoundary(m_splines[2], #right)
    m_ar_rightboundary = me.FindBoundary(m_splines[3], #left)
  else
    m_ar_leftboundary = me.FindBoundary(m_splines[3], #right)
    m_ar_rightboundary = me.FindBoundary(m_splines[2], #left)
  end if
end
on LoadXML me, i_sDocument
  t_rXML = CreateXML(getMember(i_sDocument).text)
  tRoot = t_rXML.GetRoot()
  if t_rXML.Search("type", "JUNGLECRUISE", 0) then
    tRootXML = CreateXML()
    tRootXML.copy(t_rXML.GetNode())
    m_sName = t_rXML.GetParam("STAGE")
    m_iStartTime = value(t_rXML.GetParam("STARTTIME"))
    m_iEndTime = value(t_rXML.GetParam("ENDTIME"))
    tRootXML.GetRoot()
    if tRootXML.Search("type", "VISUAL", 0) then
      m_sRoomName = tRootXML.GetParam("NAME")
    end if
    tRootXML.GetRoot()
    if tRootXML.Search("type", "PARAMS", 0) then
      m_sDirection = tRootXML.GetParam("DIRECTION")
      m_bUseSpot = value(tRootXML.GetParam("USESPOT"))
      m_sMusic = tRootXML.GetParam("MUSIC")
      m_sAtmos = tRootXML.GetParam("ATMOSPHERE")
    end if
    if tRootXML.Search("type", "BASERAIL", 1) then
      m_splines[1] = createObject(#random, "CSpline3D")
      tSplineType = tRootXML.GetParam("SPLINE")
      if tSplineType = "Catmull-Rom" then
        m_splines[1].SetCatmullRomInterpolation()
      end if
      if tSplineType = "CubicBezier" then
        m_splines[1].SetCubicBezierInterpolation()
      end if
      repeat with i = 1 to tRootXML.count()
        tKnot = tRootXML[i]
        m_splines[1].addControlPoint(value(tKnot[#param]["POS"]))
      end repeat
    end if
    if tRootXML.Search("type", "LEFTRAIL", 1) then
      m_splines[2] = createObject(#random, "CSpline3D")
      tSplineType = tRootXML.GetParam("SPLINE")
      if tSplineType = "Catmull-Rom" then
        m_splines[2].SetCatmullRomInterpolation()
      end if
      if tSplineType = "CubicBezier" then
        m_splines[2].SetCubicBezierInterpolation()
      end if
      repeat with i = 1 to tRootXML.count()
        tKnot = tRootXML[i]
        m_splines[2].addControlPoint(value(tKnot[#param]["POS"]))
      end repeat
    end if
    if tRootXML.Search("type", "RIGHTRAIL", 1) then
      m_splines[3] = createObject(#random, "CSpline3D")
      tSplineType = tRootXML.GetParam("SPLINE")
      if tSplineType = "Catmull-Rom" then
        m_splines[3].SetCatmullRomInterpolation()
      end if
      if tSplineType = "CubicBezier" then
        m_splines[3].SetCubicBezierInterpolation()
      end if
      repeat with i = 1 to tRootXML.count()
        tKnot = tRootXML[i]
        m_splines[3].addControlPoint(value(tKnot[#param]["POS"]))
      end repeat
    end if
    tRootXML.GetRoot()
    repeat with tChild in tRootXML[1][#child]
      if tChild[#type] = "ANIMALS" then
        tSet = tChild[#param]["SET"]
        tID = integer(tChild[#param]["ID"])
        tSound = tChild[#param]["SOUND"]
        tCurrentSet = [#name: tSet, #id: tID, #sound: tSound, #Spots: []]
        repeat with i = 1 to tChild[#child].count()
          tSpot = tChild[#child][i]
          tPosition = value(tSpot[#param]["POS"])
          tTime = value(tSpot[#param]["TIME"])
          tScale = value(tSpot[#param]["SCALE"])
          tFlip = value(tSpot[#param]["FLIP"])
          tCurrentSet.Spots.append([#pos: tPosition, #time: tTime, #scale: tScale, #flip: tFlip])
        end repeat
        m_mp_animalSets.setaProp(tID, tCurrentSet)
      end if
      if tChild[#type] = "HAZARDS" then
        repeat with i = 1 to tChild[#child].count()
          tHazard = tChild[#child][i]
          case tHazard[#type] of
            "ROCK":
              m_ar_hazards.append([#type: #rock, #pos: value(tHazard[#param]["POS"])])

          end case
        end repeat
      end if
      if tChild[#type] = "POWERUPS" then
        repeat with i = 1 to tChild[#child].count()
          tPowerup = tChild[#child][i]
          case tPowerup[#type] of
            "FUEL":
              m_ar_powerups.append([#type: #fuel, #pos: value(tPowerup[#param]["POS"])])
            "FILM":
              m_ar_powerups.append([#type: #film, #pos: value(tPowerup[#param]["POS"])])

          end case
        end repeat
      end if
    end repeat
  end if
  if not voidp(m_splines[1]) and not voidp(m_splines[2]) and not voidp(m_splines[3]) then
    me.FindBoundaries()
  end if
end
on GetName me
  return m_sName
end
on getRoomName me
  return m_sRoomName
end
on GetStartTime me
  return m_iStartTime
end
on GetEndTime me
  return m_iEndTime
end
on GetBaseSpline me
  return m_splines[1]
end
on GetLeftSpline me
  return m_splines[2]
end
on GetRightSpline me
  return m_splines[3]
end
on GetLeftBoundary me
  return m_ar_leftboundary
end
on GetRightBoundary me
  return m_ar_rightboundary
end
on GetMaxDeviation me
  return m_deviation
end
on getDirection me
  return m_sDirection
end
on GetSpot me
  return m_bUseSpot
end
on GetAnimalSets me
  return m_mp_animalSets
end
on GetAnimalSet me, i_ID
  return m_mp_animalSets.getaProp(i_ID)
end
on GetHazards me
  return m_ar_hazards
end
on GetPowerups me, i_type
  if voidp(i_type) then
    return m_ar_powerups
  else
    tOut = []
    repeat with tItem in m_ar_powerups
      if tItem.type = i_type then
        tOut.append(tItem)
      end if
    end repeat
    return tOut
  end if
end
on GetMusic me
  return m_sMusic
end
on GetAtmosphere me
  return m_sAtmos
end