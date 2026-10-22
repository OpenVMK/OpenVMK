-- Script
property m_iTileSize
property m_vLocation
property m_vVelocity
property m_vDirection
property m_ar_directions
property m_bVisualizeBoundary
property m_rSprite
property m_rClient
property m_iTileRef
property m_iDirection

on construct me
  m_bVisualizeBoundary = 1
  m_rSprite = VOID
  m_iTileSize = 16
  m_vLocation = vector(0, 0, 0)
  m_vVelocity = vector(0, 0, 0)
  m_vDirection = vector(0, 0, 0)
  m_ar_directions = []
  m_ar_directions.append(vector(-1, -1, 0))
  m_ar_directions.append(vector(0, -1, 0))
  m_ar_directions.append(vector(1, -1, 0))
  m_ar_directions.append(vector(1, 0, 0))
  m_ar_directions.append(vector(1, 1, 0))
  m_ar_directions.append(vector(0, 1, 0))
  m_ar_directions.append(vector(-1, 1, 0))
  m_ar_directions.append(vector(-1, 0, 0))
  m_rClient = VOID
  m_iDirection = -1
  executeMessage(#AddTileCollisionObject, me)
  return 1
end
on deconstruct me
  executeMessage(#RemoveTileCollisionObject, me)
  if m_bVisualizeBoundary then
    removeMember(m_rSprite.member.name)
    releaseSprite(m_rSprite.spriteNum)
  end if
  return 1
end
on Init me, a_vLocation
  m_vLocation = a_vLocation
  if m_bVisualizeBoundary then
    me.visualize()
  end if
end
on update me
  if objectp(m_rClient) then
    m_rClient.move(m_iDirection)
  end if
  if m_bVisualizeBoundary then
    t_rContext = getThread("room").getComponent()._AccessRoom()
    t_veOff = t_rContext.GetScrPos()
    t_vScrPos = t_veOff + AbsToScr(me.getLocation())
    m_rSprite.loc = point(t_vScrPos.x, t_vScrPos.y)
    m_rSprite.locZ = t_vScrPos.z
  end if
end
on setDirection me, i_iDirection
  if i_iDirection >= 0 then
    m_vDirection = m_ar_directions[i_iDirection + 1]
  else
    m_vDirection = vector(0, 0, 0)
  end if
end
on collisionNotification me, _type, i_bIwashit, i_rCollisionObject
end
on setClient me, a_rClient
  m_rClient = a_rClient
end
on draw me, g
end
on moveTo me, vector2
end
on reset me
end
on visualize me
  m_s_BoundaryName = "CircleBoundary" & getUniqueID()
  tMemNum = createMember(m_s_BoundaryName, #bitmap)
  tImg = drawAxionomicCircle(m_iTileSize / 2)
  member(tMemNum).image = tImg
  m_rSprite = sprite(reserveSprite(me.getID()))
  m_rSprite.member = member(tMemNum)
  m_rSprite.loc = point(-1000, -1000)
  m_rSprite.locZ = 0
  m_rSprite.ink = 36
end
on SetLocation me, a_vLocation, a_iTileRef, a_iDirection
  if vectorp(a_vLocation) then
    m_vLocation = a_vLocation
  end if
  m_iTileRef = a_iTileRef
  m_iDirection = m_ar_directions.getPos(a_iDirection)
end
on getTileRef me
  return m_iTileRef
end
on getLocation me
  return m_vLocation
end
on getDirection me
  return m_vDirection
end
on SetTileSize me, a_iTileSize
  m_iTileSize = a_iTileSize
end