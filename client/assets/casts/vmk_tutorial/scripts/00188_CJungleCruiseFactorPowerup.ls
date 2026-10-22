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
  tCollRadius = me.getObject().GetParam("BoundingCircleRadius")
  m_p_BoundingCircle.Init(tWorldPos.x, tWorldPos.y, tCollRadius)
  m_p_BoundingCircle.setClient(me)
  m_p_BoundingCircle.SetType(#nobody)
end
on collisionNotification me, _type
  case _type of
    #circle:
      me.getObject().SetParam("Picked", 1)
      tdata = []
      tdata.append(me.getObject().GetParam("Reference"))
      executeMessage(#SendMinigameAction, 2, tdata)
      if me.getObject().GetParam("Type") = #film then
        getThread("junglecruise").getComponent().playFx("power_up_5")
      end if
      if me.getObject().GetParam("Type") = #fuel then
        getThread("junglecruise").getComponent().playFx("power_up_6")
      end if
      if not voidp(m_p_BoundingCircle) then
        tID = m_p_BoundingCircle.getID()
        if getObject(tID) <> 0 then
          removeObject(tID)
        end if
      end if
    #edge:
    otherwise:
      put "Powerup had an unknown collision"

  end case
end
on update me
  if not m_b_collisionInited then
    me.createCollisionModifier()
    m_b_collisionInited = 1
    me.getObject().SetAbsPos(me.getObject().GetParam("WorldPosition"))
  end if
end