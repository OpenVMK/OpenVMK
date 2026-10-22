-- Script
property collisionModifiers
property IVEBEENHIT
property origin
property radius
property clr
property mass
property circleIntersection
property velocity
property normal
property animating
property circleType
property maxSpeed
property minSpeed
property bind
property follower
property bindDistance
property m_pSprite
property m_bVisualizeBoundary
property m_s_BoundaryName
property m_pVelocityModifier
property m_pForce
property m_iClientID

on construct me
  circleIntersection = vector(0, 0, 0)
  collisionModifiers = []
  origin = vector(0, 0, 0)
  radius = 0
  IVEBEENHIT = 0
  velocity = vector(0.0, 0.0, 0)
  normal = vector(0.0, 0.0, 0)
  m_pForce = vector(0, 0, 0)
  m_pVelocityModifier = 1.0
  circleType = #moving
  animating = 0
  mass = 1.0
  minSpeed = 0
  maxSpeed = 2.0
  bind = VOID
  follower = 0
  m_s_BoundaryName = EMPTY
  m_iClientID = VOID
  bindDistance = vector(0, 0, 0)
  me.setColor(rgb("#FFFFFF"))
  me.reset()
  m_bVisualizeBoundary = getVariableValue("junglecruise.collisionboundaries.visible")
  executeMessage(#addCollisionObject, me)
  return 1
end
on deconstruct me
  executeMessage(#removeCollisionObject, me)
  if m_bVisualizeBoundary then
    if not voidp(m_pSprite) then
      releaseSprite(m_pSprite.spriteNum)
    end if
    if getmemnum(m_s_BoundaryName) <> 0 then
      removeMember(m_s_BoundaryName)
    end if
  end if
  return 1
end
on update me
  if animating then
    velocity = velocity * m_pVelocityModifier
    velocity = velocity + m_pForce
  end if
  if m_bVisualizeBoundary then
    if not voidp(m_pSprite) then
      m_pSprite.loc = ProjectAxonometricPosition(point(origin.x, origin.y))
    end if
  end if
end
on collisionNotification me, _type, i_bIwashit, i_rCollisionObject
  if not voidp(m_iClientID) then
    passEvent = 1
    tObject = m_iClientID
    if voidp(tObject) then
      passEvent = 0
    else
      if tObject.handlers().getOne(#collisionNotification) = 0 then
        passEvent = 0
      end if
    end if
    if passEvent then
      call(#collisionNotification, tObject, _type, i_bIwashit, i_rCollisionObject)
    end if
  else
    put "Bounding Circle collision detected, not passing further down the pipe"
  end if
end
on setClient me, _clientID
  m_iClientID = _clientID
end
on setDrag me, _drag
  m_pVelocityModifier = _drag
end
on setForce me, _force
  m_pForce = _force
end
on Init me, _x, _y, _r
  origin = vector(_x, _y, 0)
  radius = _r
  if m_bVisualizeBoundary then
    m_pSprite = sprite(reserveSprite(me.getID()))
    me.visualize()
  end if
  return me
end
on addCollisionModifier me, _modifier
  collisionModifiers.append(_modifier)
end
on draw me, g
  g.setColor(clr)
  g.drawCircle(origin.x, origin.y, radius)
end
on moveTo me, vector2
  origin.x = vector2.x
  origin.y = vector2.y
end
on setColor me, _clr
  clr = _clr
end
on followBind me
  follower = 1
  origin = bind.origin - bindDistance
end
on reset me
  follower = 0
end
on setBind me, tCircle
  bind = tCircle
  bindDistance = tCircle.origin - origin
end
on getBind me
  return bind
end
on GetType me
  return circleType
end
on SetType me, t_type
  case t_type of
    #nobody:
      circleType = #nobody
      mass = 0
    #static:
      circleType = #static
      mass = 2
    #moving:
      circleType = #moving
      mass = 1
      animating = 1

  end case
end
on showInfo me
  put "Loc" && integer(me.origin.x) && integer(me.origin.y)
  put "Vel" && integer(me.velocity.x) && integer(me.velocity.y)
end
on changeVelocity me, t_direction, i_vec_direction, t_amount
  tX = velocity.x + t_direction * i_vec_direction.x * t_amount
  tY = velocity.y + t_direction * i_vec_direction.y * t_amount
  me.setVelocityN(tX, tY)
end
on setVelocity me, v
  me.setVelocityN(v.x, v.y)
end
on setVelocityN me, _x, _y
  velocity.x = _x
  velocity.y = _y
  normal = velocity.cross(vector(0, 0, -1))
  normal.normalize()
end
on visualize me
  m_s_BoundaryName = "CircleBoundary" & getUniqueID()
  tMemNum = createMember(m_s_BoundaryName, #bitmap)
  tImg = drawAxionomicCircle(radius)
  member(tMemNum).image = tImg
  m_pSprite.member = member(tMemNum)
  m_pSprite.width = m_pSprite.member.width
  m_pSprite.height = m_pSprite.member.height
  m_pSprite.loc = InverseAxonometricPosition(point(origin.x, origin.y))
  m_pSprite.locZ = 0
  m_pSprite.ink = 36
end