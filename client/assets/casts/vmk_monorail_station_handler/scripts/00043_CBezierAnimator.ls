-- Script
property pCurvePoints
property pMaxSpeed
property pFrameCount
property pTilt
property pLength
property p1
property p2
property p3
property p4
property pOffset
property pMovingOrigo

on new me
  pCurvePoints = []
  pMovingOrigo = 0
  pOffset = point(0.0, 0.0)
  pLength = 0.0
  pTilt = 0.0
  pFrameCount = 48
  pMaxSpeed = 100
  argV = []
  argC = the paramCount - 1
  repeat with i = 2 to the paramCount
    argV.append(param(i))
  end repeat
  if argC <> 0 then
    pLength = argV[1]
  end if
  if argC > 1 then
    pTilt = argV[2]
  end if
  if argC > 2 then
    pFrameCount = argV[3]
  end if
  if argC > 3 then
    pMaxSpeed = argV[4]
  end if
  if argC > 4 then
    put "Bezier: Unknow argument" && argV[5]
  end if
  me.updateControlPoints()
  return me
end
on showInfo me
  Info = [p1.locH, p1.locV, p2.locH, p2.locV, p3.locH, p3.locV, p4.locH, p4.locV, pFrameCount, pTilt]
  put Info
end
on createCurvePoints me
  x1 = p1[1]
  x2 = p2[1]
  x3 = p3[1]
  x4 = p4[1]
  y1 = p1[2]
  y2 = p2[2]
  y3 = p3[2]
  y4 = p4[2]
  pCurvePoints = [:]
  curveX = []
  curveY = []
  t = 0.0
  step = pFrameCount / (pFrameCount * pFrameCount * 1.0)
  repeat with i = 0 to pFrameCount
    t = step * i
    curveX[i + 1] = power(1 - t, 3) * x1 + 3 * t * power(1 - t, 2) * x2 + 3 * power(t, 2) * (1 - t) * x3 + power(t, 3) * x4
    curveY[i + 1] = power(1 - t, 3) * y1 + 3 * t * power(1 - t, 2) * y2 + 3 * power(t, 2) * (1 - t) * y3 + power(t, 3) * y4
  end repeat
  pCurvePoints[#x] = curveX
  pCurvePoints[#y] = curveY
  pCurvePoints[#vertexCount] = curveX.count
  me.setTilt()
end
on setTilt me
  if the paramCount > 1 then
    pTilt = param(2)
  end if
  xTilted = []
  yTilted = []
  rad = pTilt * PI / 180.0
  repeat with i = 1 to pCurvePoints.vertexCount
    xTilted[i] = pCurvePoints.x[i] * cos(rad) - pCurvePoints.y[i] * sin(rad)
    yTilted[i] = pCurvePoints.x[i] * sin(rad) + pCurvePoints.y[i] * cos(rad)
  end repeat
  pCurvePoints.x = xTilted
  pCurvePoints.y = yTilted
end
on updateControlPoints me
  p2 = point(0, 0)
  p4 = point(pLength, 0)
  if pTilt >= 0 then
    p1 = point(0, 0)
  else
    p1 = point(pTilt * pLength, 0)
  end if
  if pTilt <= 0 then
    p3 = point(pLength, 0)
  else
    p3 = point(pLength + pLength * pTilt, 0)
  end if
end
on getMousePoint me, tP
  checkList = [p2, p3, p4]
  pMovingOrigo = 0
  repeat with p in checkList
    dx = tP.locH - p.locH
    dy = tP.locV - p.locV
    if dx * dx + dy * dy < 100 then
      return p
    end if
  end repeat
  dx = tP.locH - p1.locH
  dy = tP.locV - p1.locV
  if dx * dx + dy * dy < 100 then
    pMovingOrigo = 1
    return p
  end if
  return VOID
end
on render me, g, _offset
  pOffset = _offset
  repeat with i = 1 to pCurvePoints.vertexCount
    tP = point(pCurvePoints.x[i], pCurvePoints.y[i]) + pOffset
    clr = rgb("#000000")
    g.fill(tP - point(2, 2), tP + point(2, 2), [#color: clr])
  end repeat
  checkList = [p1, p4]
  i = 8
  repeat with p in checkList
    tP = p + pOffset
    clr = rgb("#FF0000")
    g.fill(tP - point(i, i), tP + point(i, i), [#color: clr])
    i = i - 4
  end repeat
  checkList = [p2, p3]
  repeat with p in checkList
    tP = p + pOffset
    clr = rgb("#0000FF")
    g.fill(tP - point(4, 4), tP + point(4, 4), [#color: clr])
  end repeat
end
on addFrames me
  amount = 1
  if the paramCount > 1 then
    amount = max(amount, param(2))
  end if
  pFrameCount = pFrameCount + amount
  me.createCurvePoints()
end
on reduceFrames me
  amount = 1
  if the paramCount > 1 then
    amount = max(amount, param(2))
  end if
  pFrameCount = max(6, pFrameCount - amount)
  me.createCurvePoints()
end
on addTilt me
  amount = 1
  if the paramCount > 1 then
    amount = param(2)
  end if
  pTilt = pTilt + amount
  me.createCurvePoints()
end
on reduceTilt me
  amount = 1
  if the paramCount > 1 then
    amount = param(2)
  end if
  pTilt = pTilt - amount
  me.createCurvePoints()
end
on addLength me
  amount = 1
  if the paramCount > 1 then
    amount = max(amount, param(2))
  end if
  pLength = pLength + amount
  p4 = point(pLength, 0)
  me.createCurvePoints()
end
on reduceLength me
  amount = 1
  if the paramCount > 1 then
    amount = max(amount, param(2))
  end if
  pLength = max(20, pLength - amount)
  p4 = point(pLength, 0)
  me.createCurvePoints()
end
on setLength me, i_length
  pLength = i_length
end
on toString me
  objInfo = RETURN & "Object:" && me & RETURN
  hs = EMPTY
  repeat with h in me.handlers()
    hs = hs & string(h) & "() "
  end repeat
  put hs & RETURN after objInfo
  repeat with i = 1 to count(me)
    propName = getPropAt(me, i)
    propValue = getaProp(me, propName)
    put propName && ":" && propValue & RETURN after objInfo
  end repeat
  put objInfo
end