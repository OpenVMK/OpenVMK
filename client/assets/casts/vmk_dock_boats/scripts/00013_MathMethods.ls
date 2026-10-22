-- Behavior
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