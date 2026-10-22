-- Script
property detectedCollisions
property collisionMap
property collisionObjects
property bounce
property friction

on construct me
  collisionMap = []
  detectedCollisions = []
  collisionObjects = []
  bounce = 0.5
  friction = 1.44999992847443
  receiveUpdate(me.getID())
  registerMessage(#addCollisionObject, me.getID(), #addCollisionObject)
  registerMessage(#removeCollisionObject, me.getID(), #removeCollisionObject)
  return 1
end
on deconstruct me
  unregisterMessage(#addCollisionObject, me.getID())
  unregisterMessage(#removeCollisionObject, me.getID())
  removeUpdate(me.getID())
  collisionMap = []
  detectedCollisions = []
  collisionObjects = []
  return 1
end
on update me
  repeat with tCollisionObject in collisionObjects
    tCollisionObject.update()
  end repeat
  me.DetectCollisions()
end
on setBounce me, _bounce
  bounce = _bounce
end
on setFriction me, _friction
  friction = _friction
end
on addCollisionObject me, _o
  collisionObjects.append(_o)
end
on removeCollisionObject me, _o
  collisionObjects.deleteOne(_o)
end
on removeAllCollisionObjects me
  collisionObjects = []
end
on resetMap me
  collisionMap = []
end
on setCollisionMap me, _l
  collisionMap = _l
end
on addToCollisionMap me, _e
  collisionMap.add(_e)
end
on draw me, g, bAxionomicProjection
  repeat with i = 1 to count(collisionMap)
    collisionMap[i].draw(g, bAxionomicProjection)
  end repeat
end
on addSplineEdges me, splineControlPoints, bReverse
  spline = createObject(#random, "CCatmullRom")
  if bReverse then
    repeat with i = splineControlPoints.count down to 1
      cKnot = splineControlPoints[i]
      spline.addPoint(point(cKnot.x, cKnot.y))
    end repeat
  else
    repeat with cKnot in splineControlPoints
      spline.addPoint(point(cKnot.x, cKnot.y))
    end repeat
  end if
  spline.eval()
  me.addMapFromPolygon(spline.getPolyline())
end
on addBoundaries me
  tW = getVariableValue("junglecruise.collisionboundaries.box.width")
  if voidp(tW) then
    tW = 800
  end if
  tH = getVariableValue("junglecruise.collisionboundaries.box.height")
  if voidp(tH) then
    tH = 600
  end if
  x1 = (800 - tW) / 2
  y1 = (600 - tH) / 2
  tW = tW + 30
  tPoints = []
  tPoints.append(point(x1, y1))
  tPoints.append(point(x1 + tW, y1))
  tPoints.append(point(x1 + tW, y1 + tH))
  tPoints.append(point(x1, y1 + tH))
  tPoints.append(point(x1, y1))
  t_ar_World = []
  repeat with i = 1 to tPoints.count
    tpoint = InverseAxonometricPosition(tPoints[i])
    t_ar_World.append(tpoint)
  end repeat
  me.addMapFromPolygon(t_ar_World, "boundary")
end
on addBoundariesTrapezoid me
  tW = 300
  tH = 300
  t = createObject(#random, "CCollisionEdge")
  t.Init(-tW / 2, -tH / 2, tW, 0)
  collisionMap.add(t)
  t = createObject(#random, "CCollisionEdge")
  t.Init(tW / 2, tH / 2, -tW, 0)
  collisionMap.add(t)
  t = createObject(#random, "CCollisionEdge")
  t.Init(-tW / 2, tH / 2, 0, -tH)
  collisionMap.add(t)
  t = createObject(#random, "CCollisionEdge")
  t.Init(tW / 2, -tH / 2, 0, tH)
  collisionMap.add(t)
end
on addMapFromPolygon me, i_ar_points, i_sName
  repeat with i = 1 to i_ar_points.count - 1
    p1 = i_ar_points[i]
    p2 = i_ar_points[i + 1]
    x1 = p1.locH
    y1 = p1.locV
    x2 = p2.locH
    y2 = p2.locV
    t = createObject(#random, "CCollisionEdge")
    t.Init(x1, y1, x2 - x1, y2 - y1)
    if not voidp(i_sName) then
      t_sName = i_sName & "_" & i
      t.SetName(t_sName)
    end if
    collisionMap.add(t)
  end repeat
end
on addForces me, g, i_direction, i_iMAX
  if voidp(i_iMAX) then
    i_iMAX = count(collisionObjects)
  end if
  repeat with i = 1 to i_iMAX
    if not (collisionObjects[i].GetType() = #static) then
      collisionObjects[i].setVelocityN(collisionObjects[i].velocity.x + i_direction.x * g, collisionObjects[i].velocity.y + i_direction.y * g)
    end if
  end repeat
end
on DetectCollisions me
  repeat with i = 1 to count(collisionObjects)
    collisionObjects[i].reset()
    keeptesting = 1
    tests = 0
    repeat while keeptesting
      keeptesting = me.Detect(collisionObjects, collisionObjects[i])
      me.Response(collisionObjects[i], me.bounce, me.friction)
      tests = tests + 1
      if tests >= 5 then
        keeptesting = 0
      end if
    end repeat
  end repeat
end
on Detect me, objectlist, _o
  detectedCollisions = []
  if _o.collisionModifiers.getOne(#circle) <> 0 then
    repeat with i = 1 to count(objectlist)
      if objectlist[i] = _o then
        next repeat
      end if
      if me.detectCircleVsCircle(_o, objectlist[i]) then
        objectlist[i].IVEBEENHIT = 1
        _o.collisionNotification(#circle, 1, objectlist[i])
        objectlist[i].collisionNotification(#circle, 0, _o)
        next repeat
      end if
    end repeat
  end if
  repeat with i = 1 to count(collisionMap)
    collisionMap[i].Active = 0
    if me.detectCircleVsEdge(_o, collisionMap[i]) then
      _o.collisionNotification(#edge, 1, collisionMap[i])
      next repeat
    end if
  end repeat
  if count(detectedCollisions) > 0 then
    return 1
  else
    return 0
  end if
end
on Response me, _o, _b, _f
  detectedCollisions.sort()
  if _o.animating then
    if count(detectedCollisions) > 0 then
      collisionType = detectedCollisions[1][2]
      if collisionType = "circle" then
        me.responseVsCircle(_o, _b, _f)
      else
        if collisionType = "edge" then
          me.responseVsEdge(_o, _b, _f)
        else
          put "Alert: Unknown Collision-type"
        end if
      end if
    else
      _o.origin.x = _o.origin.x + _o.velocity.x
      _o.origin.y = _o.origin.y + _o.velocity.y
    end if
  end if
end
on responseVsEdge me, _o, _b, _f
  distance = detectedCollisions[1][1]
  edge = detectedCollisions[1][3]
  edge.Active = 1
  _circleIntersection = detectedCollisions[1][4]
  dx = detectedCollisions[1][5]
  dy = detectedCollisions[1][6]
  dot = edge.normal.dot(_o.velocity)
  nx = edge.normal.x * dot
  ny = edge.normal.y * dot
  tX = _o.velocity.x - nx
  tY = _o.velocity.y - ny
  _b = max(1.32499992847443, min(1.86999988555908, _b))
  if dot < 0 then
    fx = tX * _f
    fy = tY * _f
    bx = nx * (1 + _b)
    by = ny * (1 + _b)
  else
    bx = 0
    by = 0
    fx = 0
    fy = 0
  end if
  finalx = _o.velocity.x - (fx + bx)
  finaly = _o.velocity.y - (fy + by)
  _o.origin.x = _o.origin.x + dx
  _o.origin.y = _o.origin.y + dy
  _o.setVelocityN(finalx, finaly)
  if not voidp(_o.getBind()) then
    _o.bind.followBind()
    _o.bind.setVelocityN(finalx, finaly)
  end if
end
on responseVsCircle me, _o, _b, _f
  d = detectedCollisions[1][3]
  distance = detectedCollisions[1][1]
  a = _o
  b = detectedCollisions[1][6]
  if a.GetType() = #nobody or b.GetType() = #nobody then
    exit
  end if
  n = vector(a.origin.x - b.origin.x, a.origin.y - b.origin.y, 0)
  n.normalize()
  a1 = a.velocity.dot(n)
  a2 = b.velocity.dot(n)
  optimisedP = 2.0 * (a1 - a2) / (a.mass + b.mass)
  v1x = a.velocity.x - optimisedP * b.mass * n.x
  v1y = a.velocity.y - optimisedP * b.mass * n.y
  v2x = b.velocity.x + optimisedP * a.mass * n.x
  v2y = b.velocity.y + optimisedP * a.mass * n.y
  a.setVelocity(d * (distance * 1.84999990463257))
  a.origin.x = a.origin.x + a.velocity.x
  a.origin.y = a.origin.y + a.velocity.y
  if a.circleType = #moving then
    a.setVelocityN(v1x, v1y)
  end if
  if b.circleType = #moving then
    b.setVelocityN(v2x, v2y)
  end if
  if not voidp(_o.getBind()) then
    _o.bind.followBind()
    _o.bind.setVelocityN(v1x, v1y)
  end if
end
on detectCircleVsEdge me, _o, _edge
  dotp = _edge.normal.dot(_o.velocity)
  if dotp >= 0.0 then
    return 0
  end if
  _o.circleIntersection.x = -1.0 * _edge.normal.x * _o.radius
  _o.circleIntersection.y = -1.0 * _edge.normal.y * _o.radius
  v1x = _o.origin.x + _o.circleIntersection.x
  v1y = _o.origin.y + _o.circleIntersection.y
  x1 = v1x * 1.0
  y1 = v1y * 1.0
  x2 = v1x * 1.0 + _o.velocity.x * 1.0
  y2 = v1y * 1.0 + _o.velocity.y * 1.0
  x3 = _edge.origin.x * 1.0
  y3 = _edge.origin.y * 1.0
  x4 = _edge.origin.x * 1.0 + _edge.direction.x * 1.0
  y4 = _edge.origin.y * 1.0 + _edge.direction.y * 1.0
  if not lineIntersection(x1, y1, x2, y2, x3, y3, x4, y4, _edge.intersection) then
    return 0
  end if
  if pointOnLineSegment(x3, y3, x4, y4, _edge.intersection) then
    dx = _edge.intersection.x - v1x
    dy = _edge.intersection.y - v1y
    distance = sqrt(dx * dx + dy * dy)
    if distance > _o.velocity.length() then
      return 0
    end if
    detectedCollisions.add([distance, "edge", _edge, [_o.circleIntersection.x, _o.circleIntersection.y], dx, dy])
    return 1
  end if
  check = lineCircleIntersection(_edge.intersection, [-_o.velocity.x * 1.0, -_o.velocity.y * 1.0], _o.origin, _o.radius, _o.circleIntersection)
  if not check then
    return 0
  end if
  cx = _o.origin.x + _o.circleIntersection.x
  cy = _o.origin.y + _o.circleIntersection.y
  dx = _edge.intersection.x - cx
  dy = _edge.intersection.y - cy
  distance = sqrt(dx * dx + dy * dy)
  if distance > _o.velocity.length() then
    return 0
  end if
  detectedCollisions.add([distance, "edge", _edge, [_o.circleIntersection.x, _o.circleIntersection.y], dx, dy])
  return 1
end
on detectCircleVsCircle me, a, b
  dist = a.origin.distanceTo(b.origin)
  sumRadii = a.radius + b.radius
  dist = dist - sumRadii
  if a.velocity.length() < dist then
    return 0
  end if
  n = a.velocity.duplicate()
  n.normalize()
  c = b.origin.duplicate() - a.origin
  d = n.dot(c)
  if d <= 0 then
    return 0
  end if
  lenC = c.length()
  f = lenC * lenC - d * d
  sumRadiiSquared = sumRadii * sumRadii
  if f >= sumRadiiSquared then
    return 0
  end if
  t = sumRadiiSquared - f
  if t < 0 then
    return 0
  end if
  distance = d - sqrt(t)
  mag = a.velocity.length()
  if mag < distance then
    return 0
  end if
  detectedCollisions.add([distance, "circle", n, distance / mag, dist, b])
  return 1
end