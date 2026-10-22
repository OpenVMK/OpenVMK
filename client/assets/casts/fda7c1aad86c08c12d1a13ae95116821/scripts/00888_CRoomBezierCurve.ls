-- Script
property m_ar_vCurve

on construct this
  m_ar_vCurve = []
  return 1
end
on clear this
  m_ar_vCurve = []
end
on AddPoint this, a_vPnt
  m_ar_vCurve.add(a_vPnt)
end
on AddTriple this, a_vA, a_vB, a_vC
  m_ar_vCurve.add(a_vA)
  m_ar_vCurve.add(a_vB)
  m_ar_vCurve.add(a_vC)
end
on AssignCurvePoints this, a_ar_vCurve
  m_ar_vCurve = a_ar_vCurve
end
on GetPointAt this, a_fTime
  if a_fTime >= 1.0 then
    return m_ar_vCurve.getLast()
  else
    t_fPos = a_fTime * (m_ar_vCurve.count - 1)
    t_iPos = floor(t_fPos)
    t_fOffset = t_fPos - t_iPos
    t_vStart = m_ar_vCurve[t_iPos + 1]
    t_vEnd = m_ar_vCurve[t_iPos + 2]
    return t_vStart + (t_vEnd - t_vStart) * t_fOffset
  end if
end
on draw this, a_rImage, a_iSteps
  if a_iSteps = VOID then
    a_iSteps = 10
  end if
  t_fStep = 1.0 / a_iSteps
  t_iCount = m_ar_vCurve.count / 3
  pt1 = point(0, 0)
  pt2 = point(0, 0)
  repeat with i = 0 to t_iCount - 1
    t_fTime = 0.0
    t_vA = m_ar_vCurve[i * 3 + 1]
    t_vB = m_ar_vCurve[i * 3 + 2]
    t_vC = m_ar_vCurve[i * 3 + 3]
    repeat with j = 1 to a_iSteps
      v = this._Interpolate(t_vA, t_vB, t_vC, t_fTime)
      pt1.locH = v.x
      pt1.locV = v.y
      v = this._Interpolate(t_vA, t_vB, t_vC, t_fTime + t_fStep)
      pt2.locH = v.x
      pt2.locV = v.y
      a_rImage.draw(pt1, pt2, rgb(255, 0, 0))
      t_fTime = t_fTime + t_fStep
    end repeat
    t_rProps = [#shapeType: #rect, #color: rgb(0, 255, 0)]
    a_rImage.draw(rect(t_vA.x - 2, t_vA.y - 2, t_vA.x + 2, t_vA.y + 2), t_rProps)
    a_rImage.draw(rect(t_vB.x - 2, t_vB.y - 2, t_vB.x + 2, t_vB.y + 2), t_rProps)
    a_rImage.draw(rect(t_vC.x - 2, t_vC.y - 2, t_vC.x + 2, t_vC.y + 2), t_rProps)
  end repeat
end
on _Interpolate this, vA, vB, vC, fT
  t1 = power(1.0 - fT, 2)
  t2 = 2.0 * fT * (1.0 - fT)
  t3 = power(fT, 2)
  return vector(t1 * the x of vA + t2 * the x of vB + t3 * the x of vC, t1 * the y of vA + t2 * the y of vB + t3 * the y of vC, t1 * the z of vA + t2 * the z of vB + t3 * the z of vC)
end