-- Behavior
on ProjectAxonometricPosition i_pPos
  tVecX = intvector(1, 1, 0)
  tVecY = intvector(-1, 1, 0)
  t_pCenter = point(400, 300)
  tOut = tVecX.multiply(i_pPos.locH).add(tVecY.multiply(i_pPos.locV))
  tOut.y = tOut.y * 0.5
  return point(the x of tOut / 100 + the locH of t_pCenter, the y of tOut / 100 + the locV of t_pCenter)
end
on InverseAxonometricPosition i_pClick
  t_pCenter = point(400, 300)
  tOgPoint = vector(i_pClick.locH - t_pCenter.locH, (i_pClick.locV - t_pCenter.locV) * 2, 0)
  tVecX = vector(1, 1, 0)
  tVecY = vector(-1, 1, 0)
  tX = tVecX.dot(tOgPoint) / (tVecX.length() * tVecX.length())
  tY = tVecY.dot(tOgPoint) / (tVecY.length() * tVecY.length())
  return point(integer(tX * 100), integer(tY * 100))
end
on arcCos i_val
  if i_val = 1 then
    return 0
  end if
  return PI / 2 - atan(i_val / sqrt(1.0 - i_val * i_val))
end
on DirectionFromVector i_vVector
  tOperator = vector(i_vVector.x, i_vVector.y, i_vVector.z)
  tOperator.normalize()
  tUp = vector(0.0, -1.0, 0.0)
  tCosAlpha = tOperator.dot(tUp)
  tRight = vector(1.0, 0.0, 0.0)
  tAngle = 0.0
  if tOperator.dot(tRight) > 0.0 then
    if tCosAlpha = -1.0 then
      tAngle = 180.0
    else
      tAngle = arcCos(tCosAlpha) * (180.0 / PI)
    end if
  else
    if tCosAlpha = -1.0 then
      tAngle = 180.0
    else
      tAngle = 360.0 - arcCos(tCosAlpha) * (180.0 / PI)
    end if
  end if
  return integer(tAngle)
end
on AngleBetweenVectors i_vVec1, i_vVec2
  tTestVec1 = vector(i_vVec1.x, i_vVec1.y, i_vVec1.z)
  tTestVec2 = vector(i_vVec2.x, i_vVec2.y, i_vVec2.z)
  tCosAlpha = tTestVec1.dot(tTestVec2) / (tTestVec1.length() * tTestVec2.length())
  tAngle = arcCos(tCosAlpha) * (180.0 / PI)
  return integer(tAngle)
end
on TestShipToCMap i_rShip, i_rMap
  tpoint = point(i_rShip.GetParam("WorldPosition").x, i_rShip.GetParam("WorldPosition").y)
  return i_rMap.TestPointToCMap(tpoint)
end
on AdjustDirection i_current, i_difference
  i_current = i_current + i_difference
  if i_current > 359 then
    i_current = i_current mod 360
  end if
  if i_current < 0 then
    i_current = 360 - -i_current mod 360
  end if
  return i_current
end