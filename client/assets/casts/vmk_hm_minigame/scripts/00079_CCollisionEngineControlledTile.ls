-- Script
property m_ar_BoundingObjects
property m_b_collisionInited
property m_rMinigameObject
property m_rAvatarObject
property m_iAvatarRef
property m_iLastTile
property m_iDirection
property m_iActionCounter
property m_iMoveDirection
property m_ar_directions

on construct me
  m_iActionCounter = 0
  m_ar_BoundingObjects = []
  m_b_collisionInited = 0
  m_rMinigameObject = VOID
  m_rAvatarObject = VOID
  m_iDirection = 0
  m_iMoveDirection = -1
  m_ar_directions = [0, 1, 2, 3, 4, 5, 6, 7]
  return 1
end
on deconstruct me
  removeUpdate(me.getID())
  repeat with tCollisionBoudary in m_ar_BoundingObjects
    if objectp(tCollisionBoudary) then
      removeObject(tCollisionBoudary.getID())
    end if
  end repeat
  return 1
end
on Init me, t_iAvatarRef
  m_iAvatarRef = t_iAvatarRef
  receiveUpdate(me.getID())
end
on startAction me
  m_iActionCounter = 6
end
on getCollider me
  return m_ar_BoundingObjects[1]
end
on setDirection me, t_iDirection
  m_ar_BoundingObjects[1].setDirection(t_iDirection)
end
on collisionNotification me, _type, _collisionType, _collisionObject
  tSpeed = m_ar_BoundingObjects[1].velocity.length()
  case _type of
    #circle:
    #edge:

  end case
end
on initAvatar me
  if not voidp(m_iAvatarRef) then
    if m_iAvatarRef > 0 then
      t_rAvatarObject = getThread("room").getComponent()._AccessRoom()._AccessIndexed(m_iAvatarRef, "avatar")
      if objectp(t_rAvatarObject) then
        m_rAvatarObject = t_rAvatarObject
        m_rAvatarObject.GetVisual().Actions([m_iDirection, m_iDirection, 0, 0, 0, 0, 0, 0, 0])
        t_iStatusDelay = getVariableValue("hm.editor.statusdelay")
        if voidp(t_iStatusDelay) then
          t_iStatusDelay = 300
        end if
        m_rAvatarObject.GetFactor().m_iStatusDelay = t_iStatusDelay
        tCircle = createObject("BoundingTile" & getUniqueID(), "CCollisionEngineBoundingTile")
        tCircle.Init(m_rAvatarObject.GetAbsPos())
        tCircle.setClient(me)
        m_ar_BoundingObjects.append(tCircle)
        m_b_collisionInited = 1
      end if
    end if
  end if
end
on move me, t_iDirection
  m_iDirection = t_iDirection - 1
  m_iDirection = max(m_iDirection, 0)
  if m_iActionCounter > 0 then
    m_iActionCounter = m_iActionCounter - 1
    m_iAction = 13
  else
    m_iAction = 1
  end if
  t_iTileRef = m_ar_BoundingObjects[1].getTileRef()
  if t_iTileRef <> m_iLastTile then
    m_iLastTile = t_iTileRef
    t_rTile = getThread("room").getComponent()._AccessRoom()._AccessIndexed(m_iLastTile, "tile")
    if objectp(t_rTile) then
    else
    end if
  else
  end if
end
on update me
  if not objectp(m_rAvatarObject) then
    me.initAvatar()
    return 1
  end if
  t_iLastDirection = m_iMoveDirection
  t_iDir = me.ReadKeys()[1]
  if t_iDir <> m_iMoveDirection then
    m_iMoveDirection = t_iDir
    me.setDirection(m_iMoveDirection)
    if t_iLastDirection = -1 then
      executeMessage(#ActivateCollisionEngine, 1)
    end if
  end if
  if me.ReadKeys()[2] then
    me.startAction()
  end if
end
on ReadKeys me
  case 1 of
    keyPressed(125) and keyPressed(123):
      t_iDir = m_ar_directions[1]
    keyPressed(125) and keyPressed(124):
      t_iDir = m_ar_directions[3]
    keyPressed(126) and keyPressed(124):
      t_iDir = m_ar_directions[5]
    keyPressed(126) and keyPressed(123):
      t_iDir = m_ar_directions[7]
    keyPressed(125):
      t_iDir = m_ar_directions[2]
    keyPressed(124):
      t_iDir = m_ar_directions[4]
    keyPressed(126):
      t_iDir = m_ar_directions[6]
    keyPressed(123):
      t_iDir = m_ar_directions[8]
    otherwise:
      t_iDir = -1

  end case
  t_action = _key.keyPressed(48)
  return [t_iDir, t_action or the controlDown of _key or the shiftDown of _key]
end