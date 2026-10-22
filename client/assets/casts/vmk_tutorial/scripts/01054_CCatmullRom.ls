-- Script
property steps
property pts
property m_ar_polygon

on construct me
  steps = 2
  pts = []
  m_ar_polygon = []
  return 1
end
on deconstruct me
  return 1
end
on addPoint me, p
  pts.append(p)
end
on getPolyline me
  return m_ar_polygon
end
on setAccuracy me, i_iAccuracy
  steps = i_iAccuracy
end
on b me, i, t
  case i of
    -2:
      return ((-t + 2) * t - 1) * t / 2
    -1:
      return ((3 * t - 5) * t * t + 2) / 2
    0:
      return ((-3 * t + 4) * t + 1) * t / 2
    1:
      return (t - 1) * t * t / 2

  end case
  return 0
end
on p me, i, t
  px = 0.0
  py = 0.0
  repeat with j = -2 to 1
    px = px + me.b(j, t) * pts[i + j].locH
    py = py + me.b(j, t) * pts[i + j].locV
  end repeat
  return point(px, py)
end
on eval me
  m_ar_polygon = []
  if pts.count > 1 then
    m_ar_polygon.append(pts[2].duplicate())
    repeat with i = 3 to pts.count - 1
      repeat with j = 1 to steps
        Q = me.p(i, j / (steps * 1.0))
        m_ar_polygon.append(Q.duplicate())
      end repeat
    end repeat
  end if
  t_projection = []
  repeat with p in m_ar_polygon
    t_projection.append(ProjectAxonometricPosition(p))
  end repeat
  return m_ar_polygon
end