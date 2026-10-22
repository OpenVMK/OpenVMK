-- Behavior
property m_pStarAnimations
property m_iSpeed
property m_iState

on construct me
  m_pStarAnimations = []
  m_iSpeed = 1
  m_iState = #stopped
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  slowCounter = 0
  fastCounter = 0
  repeat with i = 1 to 24
    t_star = createObject(#random, "CStar")
    if i mod 2 = 0 then
      t_star.Init(1)
      fastCounter = fastCounter + 1
      tName = "viuh_faded" & fastCounter
    else
      t_star.Init(2)
      slowCounter = slowCounter + 1
      tName = "viuh" & slowCounter
    end if
    tNode = tRoomContext.Search("NAME", tName)
    if tNode <> 0 then
      tSprite = tNode.GetVisual().getSprite()
      if tSprite <> 0 then
        tSprite.loc = point(-1000, -1000)
        tSprite.ink = 33
        t_star.setSprite(tSprite)
      end if
    end if
    m_pStarAnimations.append(t_star)
  end repeat
  receiveUpdate(me.getID())
  return 1
end
on deconstruct me
end
on setState me, iState
  m_iState = iState
end
on update me
  case m_iState of
    #accelerate:
      m_iSpeed = m_iSpeed + 0.954999983310699
      if m_iSpeed >= 1.5 then
        m_iSpeed = 1.5
        m_iState = #normal
      end if
    #slowspeed:
      m_iSpeed = m_iSpeed - 0.954999983310699
      if m_iSpeed <= 0 then
        m_iSpeed = 0
        m_iState = #normal
      end if

  end case
  repeat with t_star in m_pStarAnimations
    if not (m_iState = #stopped) then
      if not (m_iState = #normal) then
        t_star.setSpeed(m_iSpeed)
      end if
      t_star.update()
      t_star.render()
    end if
  end repeat
end