-- Script
property origin
property direction
property normal
property intersection
property intersected
property Active
property m_pColor
property m_sName

on construct me
  origin = vector(0, 0, 0)
  direction = vector(0, 0, 0)
  intersection = vector(0, 0, 0)
  normal = direction.cross(vector(0, 0, -1))
  normal.normalize()
  m_sName = EMPTY
  Active = 0
  return 1
end
on deconstruct me
  return 1
end
on SetName me, i_sName
  m_sName = i_sName
end
on GetName me
  return m_sName
end
on Init me, _x1, _y1, _x2, _y2
  origin = vector(_x1, _y1, 0)
  direction = vector(_x2, _y2, 0)
  normal = direction.cross(vector(0, 0, -1))
  normal.normalize()
end
on draw me, g, bAxionomicProjection
  me.setColor(rgb("#FFFF00"))
  p1 = point(origin.x, origin.y)
  p2 = point(origin.x + direction.x, origin.y + direction.y)
  if bAxionomicProjection then
    p1 = ProjectAxonometricPosition(p1)
    p2 = ProjectAxonometricPosition(p2)
  end if
  me.drawLine(g, p1, p2)
  mx = (origin.x + (origin.x + direction.x)) / 2
  my = (origin.y + (origin.y + direction.y)) / 2
  p1 = point(mx, my)
  p2 = point(mx + normal.x * 20, my + normal.y * 20)
  if bAxionomicProjection then
    p1 = ProjectAxonometricPosition(p1)
    p2 = ProjectAxonometricPosition(p2)
  end if
  me.setColor(rgb(0, 255, 255))
  me.drawLine(g, p1, p2)
end
on setColor me, clr
  m_pColor = clr
end
on drawLine me, g, p1, p2
  g.draw(p1, p2, [#shapeType: #line, #lineSize: 1, #color: m_pColor])
end