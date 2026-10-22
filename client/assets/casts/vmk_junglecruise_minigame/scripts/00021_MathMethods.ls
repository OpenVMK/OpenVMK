-- Behavior
on ExportStageDescriptions
  Files = []
  Files.append("dock")
  Files.append("cambodian")
  Files.append("indy")
  Files.append("safari")
  Files.append("tent")
  Files.append("tiki")
  repeat with tFile in Files
    repeat with i = 1 to 3
      tMemName = tFile & ".stage" & i & ".xml"
      tMem = member(tMemName)
      if not voidp(tMem) then
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
on showJCAnimalScores
  JungleCruise_AnimalNames = []
  JungleCruise_AnimalNames[1] = "parrot_a"
  JungleCruise_AnimalNames[2] = "parrot_b"
  JungleCruise_AnimalNames[3] = "parrot_c"
  JungleCruise_AnimalNames[4] = "parrot_d"
  JungleCruise_AnimalNames[5] = "parrot_e"
  JungleCruise_AnimalNames[6] = "hippo_a"
  JungleCruise_AnimalNames[7] = "hippo_b"
  JungleCruise_AnimalNames[8] = "hippo_c"
  JungleCruise_AnimalNames[9] = "hippo_d"
  JungleCruise_AnimalNames[10] = "hippo_e"
  JungleCruise_AnimalNames[11] = "gorilla_a"
  JungleCruise_AnimalNames[12] = "gorilla_b"
  JungleCruise_AnimalNames[13] = "gorilla_c"
  JungleCruise_AnimalNames[14] = "gorilla_d"
  JungleCruise_AnimalNames[15] = "gorilla_e"
  JungleCruise_AnimalNames[16] = "flamingo1_a"
  JungleCruise_AnimalNames[17] = "flamingo1_b"
  JungleCruise_AnimalNames[18] = "flamingo1_c"
  JungleCruise_AnimalNames[19] = "flamingo1_d"
  JungleCruise_AnimalNames[20] = "flamingo1_e"
  JungleCruise_AnimalNames[21] = "flamingo2_a"
  JungleCruise_AnimalNames[22] = "flamingo2_b"
  JungleCruise_AnimalNames[23] = "flamingo2_c"
  JungleCruise_AnimalNames[24] = "flamingo2_d"
  JungleCruise_AnimalNames[25] = "flamingo2_e"
  JungleCruise_AnimalNames[26] = "flamingo3_a"
  JungleCruise_AnimalNames[27] = "flamingo3_b"
  JungleCruise_AnimalNames[28] = "flamingo3_c"
  JungleCruise_AnimalNames[29] = "flamingo3_d"
  JungleCruise_AnimalNames[30] = "flamingo3_e"
  JungleCruise_AnimalNames[31] = "stork_a"
  JungleCruise_AnimalNames[32] = "stork_b"
  JungleCruise_AnimalNames[33] = "stork_c"
  JungleCruise_AnimalNames[34] = "stork_d"
  JungleCruise_AnimalNames[35] = "stork_e"
  JungleCruise_AnimalNames[36] = "monkey_hanging_a"
  JungleCruise_AnimalNames[37] = "monkey_hanging_b"
  JungleCruise_AnimalNames[38] = "monkey_hanging_c"
  JungleCruise_AnimalNames[39] = "monkey_hanging_d"
  JungleCruise_AnimalNames[40] = "monkey_hanging_e"
  JungleCruise_AnimalNames[41] = "zebra_a"
  JungleCruise_AnimalNames[42] = "zebra_b"
  JungleCruise_AnimalNames[43] = "zebra_c"
  JungleCruise_AnimalNames[44] = "zebra_d"
  JungleCruise_AnimalNames[45] = "zebra_e"
  JungleCruise_AnimalNames[46] = "rhino_a"
  JungleCruise_AnimalNames[47] = "rhino_b"
  JungleCruise_AnimalNames[48] = "rhino_c"
  JungleCruise_AnimalNames[49] = "rhino_d"
  JungleCruise_AnimalNames[50] = "rhino_e"
  JungleCruise_AnimalNames[51] = "monkey_eating_a"
  JungleCruise_AnimalNames[52] = "monkey_eating_b"
  JungleCruise_AnimalNames[53] = "monkey_eating_c"
  JungleCruise_AnimalNames[54] = "monkey_eating_d"
  JungleCruise_AnimalNames[55] = "monkey_eating_e"
  JungleCruise_AnimalNames[56] = "toucan_a"
  JungleCruise_AnimalNames[57] = "toucan_b"
  JungleCruise_AnimalNames[58] = "toucan_c"
  JungleCruise_AnimalNames[59] = "toucan_d"
  JungleCruise_AnimalNames[60] = "toucan_e"
  JungleCruise_AnimalNames[61] = "elephant_mom_a"
  JungleCruise_AnimalNames[62] = "elephant_mom_b"
  JungleCruise_AnimalNames[63] = "elephant_mom_c"
  JungleCruise_AnimalNames[64] = "elephant_mom_d"
  JungleCruise_AnimalNames[65] = "elephant_mom_e"
  JungleCruise_AnimalNames[66] = "elephant_baby1_a"
  JungleCruise_AnimalNames[67] = "elephant_baby1_b"
  JungleCruise_AnimalNames[68] = "elephant_baby1_c"
  JungleCruise_AnimalNames[69] = "elephant_baby1_d"
  JungleCruise_AnimalNames[70] = "elephant_baby1_e"
  JungleCruise_AnimalNames[71] = "elephant_baby2_a"
  JungleCruise_AnimalNames[72] = "elephant_baby2_b"
  JungleCruise_AnimalNames[73] = "elephant_baby2_c"
  JungleCruise_AnimalNames[74] = "elephant_baby2_c"
  JungleCruise_AnimalNames[75] = "elephant_baby2_e"
  JungleCruise_AnimalNames[76] = "elephant_dad_a"
  JungleCruise_AnimalNames[77] = "elephant_dad_b"
  JungleCruise_AnimalNames[78] = "elephant_dad_c"
  JungleCruise_AnimalNames[79] = "elephant_dad_d"
  JungleCruise_AnimalNames[80] = "elephant_dad_e"
  JungleCruise_AnimalNames[81] = "snake_curled_a"
  JungleCruise_AnimalNames[82] = "snake_curled_b"
  JungleCruise_AnimalNames[83] = "snake_curled_c"
  JungleCruise_AnimalNames[84] = "snake_curled_d"
  JungleCruise_AnimalNames[85] = "snake_curled_e"
  JungleCruise_AnimalNames[86] = "lion_a"
  JungleCruise_AnimalNames[87] = "lion_b"
  JungleCruise_AnimalNames[88] = "lion_c"
  JungleCruise_AnimalNames[89] = "lion_d"
  JungleCruise_AnimalNames[90] = "lion_e"
  JungleCruise_AnimalNames[91] = "crocodile_a"
  JungleCruise_AnimalNames[92] = "crocodile_b"
  JungleCruise_AnimalNames[93] = "crocodile_c"
  JungleCruise_AnimalNames[94] = "crocodile_d"
  JungleCruise_AnimalNames[95] = "crocodile_e"
  JungleCruise_AnimalNames[96] = "crocodile_shore_a"
  JungleCruise_AnimalNames[97] = "crocodile_shore_b"
  JungleCruise_AnimalNames[98] = "crocodile_shore_c"
  JungleCruise_AnimalNames[99] = "crocodile_shore_d"
  JungleCruise_AnimalNames[100] = "crocodile_shore_e"
  JungleCruise_AnimalNames[101] = "hyena_a"
  JungleCruise_AnimalNames[102] = "hyena_b"
  JungleCruise_AnimalNames[103] = "hyena_c"
  JungleCruise_AnimalNames[104] = "hyena_d"
  JungleCruise_AnimalNames[105] = "hyena_e"
  JungleCruise_AnimalNames[106] = "snake_straight_a"
  JungleCruise_AnimalNames[107] = "snake_straight_b"
  JungleCruise_AnimalNames[108] = "snake_straight_c"
  JungleCruise_AnimalNames[109] = "snake_straight_d"
  JungleCruise_AnimalNames[110] = "snake_straight_e"
  JungleCruise_AnimalNames[111] = "giraffe_a"
  JungleCruise_AnimalNames[112] = "giraffe_b"
  JungleCruise_AnimalNames[113] = "giraffe_c"
  JungleCruise_AnimalNames[114] = "giraffe_d"
  JungleCruise_AnimalNames[115] = "giraffe_e"
  m_ar_animalscores = []
  m_ar_animalscores[1] = 100
  m_ar_animalscores[2] = 100
  m_ar_animalscores[3] = 500
  m_ar_animalscores[4] = 500
  m_ar_animalscores[5] = 250
  m_ar_animalscores[6] = 250
  m_ar_animalscores[7] = 300
  m_ar_animalscores[8] = 300
  m_ar_animalscores[9] = 300
  m_ar_animalscores[10] = 300
  m_ar_animalscores[11] = 300
  m_ar_animalscores[12] = 300
  m_ar_animalscores[13] = 300
  m_ar_animalscores[14] = 350
  m_ar_animalscores[15] = 350
  m_ar_animalscores[16] = 200
  m_ar_animalscores[17] = 200
  m_ar_animalscores[18] = 500
  m_ar_animalscores[19] = 500
  m_ar_animalscores[20] = 150
  m_ar_animalscores[21] = 150
  m_ar_animalscores[22] = 100
  m_ar_animalscores[23] = 100
  m_ar_animalscores[24] = 300
  m_ar_animalscores[25] = 300
  m_ar_animalscores[26] = 200
  m_ar_animalscores[27] = 200
  m_ar_animalscores[28] = 200
  m_ar_animalscores[29] = 200
  m_ar_animalscores[30] = 400
  m_ar_animalscores[31] = 400
  m_ar_animalscores[32] = 150
  m_ar_animalscores[33] = 150
  m_ar_animalscores[34] = 450
  m_ar_animalscores[35] = 450
  m_ar_animalscores[36] = 200
  m_ar_animalscores[37] = 200
  m_ar_animalscores[38] = 300
  m_ar_animalscores[39] = 300
  m_ar_animalscores[40] = 450
  m_ar_animalscores[41] = 450
  m_ar_animalscores[42] = 350
  m_ar_animalscores[43] = 350
  m_ar_animalscores[44] = 400
  m_ar_animalscores[45] = 400
  m_ar_animalscores[46] = 300
  m_ar_animalscores[47] = 100
  m_ar_animalscores[48] = 100
  m_ar_animalscores[49] = 100
  m_ar_animalscores[50] = 500
  m_ar_animalscores[51] = 500
  m_ar_animalscores[52] = 500
  m_ar_animalscores[53] = 250
  m_ar_animalscores[54] = 250
  m_ar_animalscores[55] = 250
  m_ar_animalscores[56] = 300
  m_ar_animalscores[57] = 300
  m_ar_animalscores[58] = 300
  m_ar_animalscores[59] = 300
  m_ar_animalscores[60] = 300
  m_ar_animalscores[61] = 300
  m_ar_animalscores[62] = 300
  m_ar_animalscores[63] = 300
  m_ar_animalscores[64] = 300
  m_ar_animalscores[65] = 300
  m_ar_animalscores[66] = 300
  m_ar_animalscores[67] = 300
  m_ar_animalscores[68] = 350
  m_ar_animalscores[69] = 350
  m_ar_animalscores[70] = 350
  m_ar_animalscores[71] = 200
  m_ar_animalscores[72] = 200
  m_ar_animalscores[73] = 200
  m_ar_animalscores[74] = 500
  m_ar_animalscores[75] = 500
  m_ar_animalscores[76] = 500
  m_ar_animalscores[77] = 150
  m_ar_animalscores[78] = 150
  m_ar_animalscores[79] = 150
  m_ar_animalscores[80] = 100
  m_ar_animalscores[81] = 100
  m_ar_animalscores[82] = 100
  m_ar_animalscores[83] = 300
  m_ar_animalscores[84] = 300
  m_ar_animalscores[85] = 300
  m_ar_animalscores[86] = 200
  m_ar_animalscores[87] = 200
  m_ar_animalscores[88] = 200
  m_ar_animalscores[89] = 200
  m_ar_animalscores[90] = 200
  m_ar_animalscores[91] = 200
  m_ar_animalscores[92] = 400
  m_ar_animalscores[93] = 400
  m_ar_animalscores[94] = 400
  m_ar_animalscores[95] = 150
  m_ar_animalscores[96] = 150
  m_ar_animalscores[97] = 150
  m_ar_animalscores[98] = 450
  m_ar_animalscores[99] = 450
  m_ar_animalscores[100] = 450
  m_ar_animalscores[101] = 200
  m_ar_animalscores[102] = 200
  m_ar_animalscores[103] = 200
  m_ar_animalscores[104] = 300
  m_ar_animalscores[105] = 300
  m_ar_animalscores[106] = 300
  m_ar_animalscores[107] = 450
  m_ar_animalscores[108] = 450
  m_ar_animalscores[109] = 450
  m_ar_animalscores[110] = 350
  m_ar_animalscores[111] = 350
  m_ar_animalscores[112] = 350
  m_ar_animalscores[113] = 400
  m_ar_animalscores[114] = 400
  m_ar_animalscores[115] = 400
  if JungleCruise_AnimalNames.count = m_ar_animalscores.count then
    t_info = EMPTY
    repeat with i = 1 to JungleCruise_AnimalNames.count
      tName = JungleCruise_AnimalNames[i]
      tScore = m_ar_animalscores[i]
      t_s1 = JCreplaceChars(tName, "_", " ")
      t_sConfluenceName = JCStringToUpper(t_s1)
      put "|" & i & "|" & t_sConfluenceName & "|" & tScore & "|" & tName & "|" & RETURN after t_info
    end repeat
    put RETURN & t_info
  end if
end
on JCStringToUpper t_sString
  tNuString = t_sString
  repeat with i = 1 to t_sString.word.count
    t_word = t_sString.word[i]
    t_upper = JCFirstCharToUpper(t_word)
    tNuString = JCreplaceChunks(tNuString, t_word, t_upper)
  end repeat
  return tNuString
end
on JCFirstCharToUpper a_cWord
  tNum = charToNum(a_cWord.char[1])
  if tNum >= 97 and tNum <= 122 then
    return string(numToChar(tNum - 32)) & chars(a_cWord, 2, the length of a_cWord)
  else
    return a_cWord
  end if
end
on JCreplaceChars tString, tCharA, tCharB
  if tCharA = tCharB then
    return tString
  end if
  repeat while offset(tCharA, tString) > 0
    put tCharB into char offset(tCharA, tString) of tString
  end repeat
  return tString
end
on JCreplaceChunks tString, tChunkA, tChunkB
  tStr = EMPTY
  repeat while tString contains tChunkA
    tPos = offset(tChunkA, tString) - 1
    if tPos > 0 then
      put tString.char[1..tPos] after tStr
    end if
    put tChunkB after tStr
    delete (tString).char[1..tPos + length(tChunkA)]
  end repeat
  put tString after tStr
  return tStr
end