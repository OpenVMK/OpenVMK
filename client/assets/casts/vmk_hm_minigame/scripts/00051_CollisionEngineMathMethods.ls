-- Behavior
on RipFurni a_ar_mp_elemProps, a_mp_mp_furniMap, t_mp_specialCodes
  tRoomContext = getThread("room").getComponent()._AccessRoom()
  t_mp_sElements = tRoomContext.m_mp_sCls_mp_iRef_sKey["element"]
  t_mp_mp_map = [:]
  if voidp(t_mp_sElements) then
    exit
  end if
  repeat with tID in t_mp_sElements
    tElement = tRoomContext.m_rChilds[tID]
    if tElement.m_rParams["CLASS"] <> "element" then
      put "ABORT! INVALID ELEMENT!"
      return 0
    end if
    tCode = value(tElement.m_rParams["TYPE"])
    tdir = value(tElement.m_rParams["DIR"])
    tTile = value(tElement.m_rFactor.m_rTile.m_rParams["REF"])
    tPos = tElement.GetAbsPos()
    ttype = #Furni
    if not voidp(t_mp_specialCodes.getaProp(tCode)) then
      ttype = t_mp_specialCodes.getaProp(tCode)
    end if
    tExtra = [:]
    t_HauntedMansionType = tElement.m_rParams["HAUNTEDMANSION_TYPE"]
    case t_HauntedMansionType of
      "DOOR", "LOOP":
        if not voidp(tElement.m_rParams["HM_NAME"]) then
          t_val = tElement.m_rParams["HM_NAME"]
          if t_val.length > 0 then
            tExtra["NAME"] = t_val
          end if
        end if

    end case
    tStruct = tElement.m_rParams["STRUCT"]
    tDir3 = VOID
    repeat with tChild in tStruct[#child]
      if tChild[#type] = "DIR" and tChild[#param]["NUM"] = "3" then
        tDir3 = tChild[#child]
      end if
    end repeat
    if voidp(a_mp_mp_furniMap.getaProp(tCode)) then
      t_ar_map = []
      if not voidp(tDir3) then
        repeat with tBlk in tDir3
          t_ar_map.append(["X": tBlk[#param]["X"], "Y": tBlk[#param]["Y"]])
        end repeat
      else
        t_ar_map.append(["X": 0, "Y": 0])
      end if
      a_mp_mp_furniMap.setaProp(tCode, [#map: t_ar_map, #code: tCode])
    end if
    a_ar_mp_elemProps.append([#code: tCode, #Dir: tdir, #tile: tTile, #type: ttype, #pos: tPos, #extra: tExtra])
  end repeat
end
on rotateBlk a_blk, a_iDir, a_iMaxX, a_iMaxY
  t_rRotBlk = [#x: a_blk.x, #y: a_blk.y]
  case a_iDir of
    1, "1":
      t_rRotBlk.x = a_blk.y
      t_rRotBlk.y = a_iMaxX - a_blk.x
    7, "7":
      t_rRotBlk.x = a_iMaxX - a_blk.x
      t_rRotBlk.y = a_iMaxY - a_blk.y
    5, "5":
      t_rRotBlk.x = a_iMaxY - a_blk.y
      t_rRotBlk.y = a_blk.x

  end case
  return t_rRotBlk
end
on rotateText a_sMemname, a_iDir
  textMem = member(a_sMemname)
  if textMem.number <= 0 then
    return 0
  end if
  if voidp(a_iDir) then
    a_iDir = 3
  end if
  t_ar_findMax = []
  t_ar_blocks = []
  repeat with tY = 1 to textMem.line.count
    repeat with tX = 1 to textMem.line[tY].char.count
      t_ar_blocks.append([#x: tX - 1, #y: tY - 1, #char: textMem.line[tY].char[tX]])
      t_ar_findMax.append(tX - 1)
      t_ar_findMax.append(tY - 1)
    end repeat
  end repeat
  t_iMax = t_ar_findMax.max()
  t_ar_rotated = []
  repeat with t_blk in t_ar_blocks
    t_rotBlk = rotateBlk(t_blk, a_iDir, t_iMax)
    t_ar_rotated.append(t_rotBlk)
  end repeat
  outMem = new(#field)
  repeat with i = 1 to t_iMax + 1
    outMem.line[i].char[i] = " "
  end repeat
  repeat with t_blk in t_ar_rotated
    outMem.line[t_blk.y + 1].char[t_blk.x + 1] = t_blk.char
  end repeat
  put RETURN & textMem.text & RETURN & RETURN & outMem.text & RETURN
end
on ExportStageHMGDescriptions
  cst = "vmk_minigame/vmk_hm_stages"
  repeat with i = 1 to castLib(cst).member.count
    tMem = member(i, cst)
    if tMem.number > 0 then
      tMemName = tMem.name
      f = xtra("FileIO").new()
      tPath = _movie.path
      tMedia = VOID
      if objectp(f) then
        f.createFile(tPath & tMemName)
        if f.error(f.status()) = "OK" then
          f.openfile(tPath & tMemName, 2)
          if f.error(f.status()) = "OK" then
            f.writeString(tMem.text)
            f.closeFile()
          else
            put f.status() && f.error(f.status())
          end if
        else
          put f.status() && f.error(f.status())
        end if
        next repeat
      end if
      put f.status() && f.error(f.status())
    end if
  end repeat
end
on ProjectAxonometricPosition i_pPos
  tVecX = vector(1.0, 1.0, 0.0)
  tVecY = vector(-1.0, 1.0, 0.0)
  t_pCenter = point(400, 300)
  tOut = tVecX * i_pPos.locH + tVecY * i_pPos.locV
  tOut.y = tOut.y * 0.5
  return point(the x of tOut + the locH of t_pCenter, the y of tOut + the locV of t_pCenter)
end
on InverseAxonometricPosition i_pClick
  t_pCenter = point(400, 300)
  tOgPoint = vector(i_pClick.locH - t_pCenter.locH, (i_pClick.locV - t_pCenter.locV) * 2, 0)
  tVecX = vector(1.0, 1.0, 0.0)
  tVecY = vector(-1.0, 1.0, 0.0)
  tX = tVecX.dot(tOgPoint) / (tVecX.length * tVecX.length)
  tY = tVecY.dot(tOgPoint) / (tVecY.length * tVecY.length)
  return point(integer(tX), integer(tY))
end
on arcCos i_val
  return PI / 2 - atan(i_val / sqrt(1.0 - i_val * i_val))
end
on DirectionFromVector i_vVector
  tOperator = i_vVector
  tOperator.normalize()
  tUp = vector(0.0, -1.0, 0.0)
  tCosAlpha = tOperator.dot(tUp)
  if tCosAlpha = -1 then
    return 180
  else
    if tCosAlpha = 1 then
      return 0
    end if
  end if
  tRight = vector(1.0, 0.0, 0.0)
  tAngle = 0.0
  if tOperator.dot(tRight) > 0.0 then
    tAngle = arcCos(tCosAlpha) * (180.0 / PI)
  else
    tAngle = 360.0 - arcCos(tCosAlpha) * (180.0 / PI)
  end if
  return integer(tAngle)
end
on floor i_fVal
  tInteger = integer(i_fVal)
  if tInteger > i_fVal then
    return float(tInteger - 1)
  else
    return float(tInteger)
  end if
end
on lineCircleIntersection rO, rV, sO, sr, _dest
  x1 = 1.0 * (rO.x - sO.x)
  y1 = 1.0 * (rO.y - sO.y)
  x2 = 1.0 * (rO.x + rV[1] - sO.x)
  y2 = 1.0 * (rO.y + rV[2] - sO.y)
  r = sr
  x0 = sO
  y0 = sO
  a = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)
  b = 2 * x1 * (x2 - x1) + 2 * y1 * (y2 - y1)
  c = x1 * x1 + y1 * y1 - r * r
  if a = 0 then
    _dest.x = 0
    _dest.y = 0
    return 0
  end if
  decriminator = b * b - 4 * a * c
  if decriminator < 0 then
    _dest.x = 0
    _dest.y = 0
    return 0
  else
    if decriminator = 0 then
      u = -1 * b / (2 * a)
      x0 = x1 + u * (x2 - x1)
      y0 = y1 + u * (y2 - y1)
      _dest.x = x0
      _dest.y = y0
      return 1
    else
      u1 = -(b + sqrt(decriminator)) / (2 * a)
      u2 = -(b - sqrt(decriminator)) / (2 * a)
      s1x = x1 + u1 * (x2 - x1)
      s1y = y1 + u1 * (y2 - y1)
      s2x = x1 + u2 * (x2 - x1)
      s2y = y1 + u2 * (y2 - y1)
      d1x = rO.x - s1x - sO.x
      d1y = rO.y - s1y - sO.y
      d1 = d1x * d1x + d1y * d1y
      d2x = rO.x - s2x - sO.x
      d2y = rO.y - s2y - sO.y
      d2 = d2x * d2x + d2y * d2y
      if d1 < d2 then
        _dest.x = s1x
        _dest.y = s1y
        return 1
      else
        _dest.x = s2x
        _dest.y = s2y
      end if
    end if
  end if
  return 0
end
on lineIntersection x1, y1, x2, y2, x3, y3, x4, y4, _vec
  x0 = 0
  y0 = 0
  if x2 - x1 = 0 and x4 - x3 = 0 then
    _vec.x = x0
    _vec.y = y0
    return 0
  end if
  if x2 - x1 = 0 then
    x0 = x1
    u = (x0 - x3) / (x4 - x3)
    y0 = y3 + u * (y4 - y3)
  else
    if x4 - x3 = 0 then
      x0 = x3
      u = (x0 - x1) / (x2 - x1)
      y0 = y1 + u * (y2 - y1)
    else
      k1 = (y2 - y1) / (x2 - x1)
      k2 = (y4 - y3) / (x4 - x3)
      if k1 - k2 <> 0 then
        x0 = (k1 * x1 - y1 - k2 * x3 + y3) / (k1 - k2)
        y0 = k1 * (x0 - x1) + y1
      else
      end if
    end if
  end if
  _vec.x = x0
  _vec.y = y0
  return 1
end
on pointOnLineSegment x1, y1, x2, y2, _point
  x3 = _point.x
  y3 = _point.y
  if x2 - x1 <> 0 then
    u = (x3 - x1) / (x2 - x1)
  else
    if y2 - y1 <> 0 then
      u = (y3 - y1) / (y2 - y1)
    end if
  end if
  if u < 0 then
    _point.x = x1
    _point.y = y1
    return 0
  else
    if u > 1 then
      _point.x = x2
      _point.y = y2
      return 0
    else
      _point.x = x3
      _point.y = y3
      return 1
    end if
  end if
end
on createArc _s, _a, _x, _y, _r, _p, _d, _axonometric
  if voidp(_p) then
    _p = 10
  end if
  anglestep = _a / _p
  srad = _s * PI / 180
  radstep = anglestep * PI / 180.0
  pnts = []
  ax = _r * cos(srad)
  ay = _r * sin(srad)
  if _axonometric then
    tP = ProjectAxonometricPosition(point(ax, ay)) - point(400, 300)
    ax = tP.locH
    ay = tP.locV
  end if
  pnts.add(point(ax, ay))
  if _d then
    updateStage()
  end if
  repeat with i = 1 to _p
    ax = _r * cos(srad + radstep * i)
    ay = _r * sin(srad + radstep * i)
    if _axonometric then
      tP = ProjectAxonometricPosition(point(ax, ay)) - point(400, 300)
      ax = tP.locH
      ay = tP.locV
    end if
    pnts.add(point(ax, ay))
    if _d then
      _movie.stage.image.setPixel(_x + ax, _y + ay, rgb(255, 255, 255))
    end if
  end repeat
  if _d then
    updateStage()
  end if
  return pnts
end
on drawAxionomicCircle _radius, _debug
  tdim = (ProjectAxonometricPosition(point(_radius, 0)) - point(400, 300)) * 3
  tImg = image(tdim.locH, tdim.locV, 32)
  if _debug then
    tImg.fill(tImg.rect, [#shapeType: #rect, #color: rgb(200, 200, 200)])
  end if
  i_ar_points = createArc(0, 360.0, 0, 0, _radius, 24, 0, 1)
  if _debug then
  end if
  repeat with i = 1 to i_ar_points.count - 1
    p1 = i_ar_points[i] + tdim / 2
    p2 = i_ar_points[i + 1] + tdim / 2
    if _debug then
    end if
    tImg.draw(p1, p2, [#shapeType: #line, #lineSize: 1, #color: rgb("#EEEEEE")])
  end repeat
  if _debug then
    repeat with i = 1 to i_ar_points.count
      p1 = i_ar_points[i] + tdim / 2
      put p1
      tImg.setPixel(integer(p1.locH), integer(p1.locV), rgb(255, 0, 0))
    end repeat
    p1 = i_ar_points[1] + tdim / 2
    tImg.setPixel(integer(p1.locH), integer(p1.locV), rgb(0, 255, 0))
  end if
  if _debug then
    tMem = new(#bitmap, member(castLib(2).member.count + 1, 2))
    tMem.name = "test"
    tMem.image = tImg
  end if
  return tImg
end