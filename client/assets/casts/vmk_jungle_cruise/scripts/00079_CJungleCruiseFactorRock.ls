-- Script
property m_p_BoundingCircle
property m_b_collisionInited

on construct me
  m_p_BoundingCircle = VOID
  m_b_collisionInited = 0
  return 1
end
on deconstruct me
  if not voidp(m_p_BoundingCircle) then
    tID = m_p_BoundingCircle.getID()
    if getObject(tID) <> 0 then
      removeObject(tID)
    end if
  end if
  return 1
end
on createCollisionModifier me
  m_p_BoundingCircle = createObject(#random, "CBoundingCircle")
  tWorldPos = me.getObject().GetParam("WorldPosition")
  tRadius = me.getObject().GetParam("BoundingCircleRadius")
  m_p_BoundingCircle.Init(tWorldPos.x, tWorldPos.y, tRadius)
  m_p_BoundingCircle.setClient(me)
  m_p_BoundingCircle.SetType(#static)
end
on collisionNotification me, _type
  case _type of
    #circle:
      tGameEngine = getThread("minigame").getComponent()
      tHost = getThread("junglecruise").getComponent().GetHostCharacter()
      if not me.getObject().GetParam("IsHit") then
        put "collision of ship with rock"
        me.getObject().SetParam("IsHit", 1)
        tdata = []
        executeMessage(#SendMinigameAction, 5, tdata)
        getThread("junglecruise").getComponent().playFx("boat-hit-2")
        tHost.SayWatchout()
      end if
      tID = m_p_BoundingCircle.getID()
      if getObject(tID) <> 0 then
        removeObject(tID)
      end if
    #edge:
      put "Rock Collided with edge, shouldnt!!"
    otherwise:
      put "Rock had an unknown collision"

  end case
end
on update me
  if not m_b_collisionInited then
    me.createCollisionModifier()
    me.getObject().SetAbsPos(me.getObject().GetParam("WorldPosition"))
    m_b_collisionInited = 1
  end if
  tFrame = me.getObject().GetParam("FrameNum") + 1
  me.getObject().SetParam("FrameNum", tFrame)
  tstate = me.getObject().GetParam("State")
  case tstate of
    #entry:
      if tFrame > me.getObject().GetParam("Entry").count then
        me.getObject().SetParam("FrameNum", 1)
        me.getObject().SetParam("State", #loop)
      end if
    #loop:
    #leave:

  end case
end