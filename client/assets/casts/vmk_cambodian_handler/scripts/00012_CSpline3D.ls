-- Script
property m_ar_controlPoints
property m_iMode

on construct me
  m_ar_controlPoints = []
  m_iMode = #CatmullRom
  return 1
end
on deconstruct me
  return 1
end
on interpolateCatmullRom t, p1, p2, p3, p4
  return t * (t * (t * (3.0 * (p2 - p3) - p1 + p4) + p1 + p1 - 5.0 * p2 + 4.0 * p3 - p4) + p3 - p1) * 0.5 + p2
end
on interpolateCubicBezier t, p1, p2, p3, p4
  u = 1.0 - t
  v = 3.0 * u * t
  return u * u * u * p1 + u * v * p2 + v * t * p3 + t * t * t * p4
end
on addControlPoint me, tKnot
  m_ar_controlPoints.append(tKnot)
end
on getNumControlPoints me
  return the count of m_ar_controlPoints
end
on SetCatmullRomInterpolation me
  m_iMode = #CatmullRom
end
on SetCubicBezierInterpolation me
  m_iMode = #CubicBezier
end
on IsOutOfBounds me, t
  if t < 0.0 then
    return 1
  end if
  if t >= m_ar_controlPoints.count - 3 then
    return 1
  end if
  return 0
end
on InterpolateAt me, t
  if me.IsOutOfBounds(t) then
    return VOID
  end if
  if m_ar_controlPoints.count < 4 then
    return VOID
  end if
  startKnot = integer(floor(t)) + 1
  fraction = t - floor(t)
  p1 = m_ar_controlPoints[startKnot]
  p2 = m_ar_controlPoints[startKnot + 1]
  p3 = m_ar_controlPoints[startKnot + 2]
  p4 = m_ar_controlPoints[startKnot + 3]
  case m_iMode of
    #CatmullRom:
      return interpolateCatmullRom(fraction, p1, p2, p3, p4)
    #CubicBezier:
      return interpolateCubicBezier(fraction, p1, p2, p3, p4)

  end case
end
on NormalAt me, t, a_side, a_plane
  if me.IsOutOfBounds(t) then
    return VOID
  end if
  if m_ar_controlPoints.count < 4 then
    return VOID
  end if
  tSampleSize = 1.2849999666214 / m_ar_controlPoints.count
  tP1 = me.InterpolateAt(t)
  tP2 = me.InterpolateAt(t + tSampleSize)
  if voidp(tP2) then
    tTemp = tP1
    tP1 = me.InterpolateAt(t - tSampleSize)
    tP2 = tTemp
  end if
  tSample = tP2 - tP1
  tSample.normalize()
  case a_plane of
    #xy:
      if a_side = #left then
        return vector(the y of tSample, the x of tSample, the z of tSample)
      else
        if a_side = #right then
          return vector(-the y of tSample, -the x of tSample, the z of tSample)
        end if
      end if
    #xz:
      if a_side = #left then
        return vector(-the z of tSample, the y of tSample, the x of tSample)
      else
        if a_side = #right then
          return vector(the z of tSample, the y of tSample, -the x of tSample)
        end if
      end if
    #yz:
      if a_side = #left then
        return vector(the x of tSample, the z of tSample, -the y of tSample)
      else
        if a_side = #right then
          return vector(the x of tSample, -the z of tSample, the y of tSample)
        end if
      end if

  end case
  return VOID
end
on TangentAt me, t
  if me.IsOutOfBounds(t) then
    return VOID
  end if
  if m_ar_controlPoints.count < 4 then
    return VOID
  end if
  tSampleSize = 1.2849999666214 / m_ar_controlPoints.count
  tP1 = me.InterpolateAt(t)
  tP2 = me.InterpolateAt(t + tSampleSize)
  if voidp(tP2) then
    tTemp = tP1
    tP1 = me.InterpolateAt(t - tSampleSize)
    tP2 = tTemp
  end if
  tSample = tP2 - tP1
  tSample.normalize()
  return tSample
end