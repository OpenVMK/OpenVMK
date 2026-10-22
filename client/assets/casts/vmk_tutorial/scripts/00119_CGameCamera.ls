-- Script
property m_graphic
property m_rSprBase
property m_rSprLock
property m_rSprLED
property m_filmWindTime
property m_frameSwitchDelay
property m_constraints
property m_bLock
property m_memViewFinder
property m_memLock
property m_memRedLED
property m_memGreenLED
property m_bActive

on construct me
  m_rSprBase = sprite(reserveSprite(me.getID()))
  m_rSprLock = sprite(reserveSprite(me.getID()))
  m_rSprLED = sprite(reserveSprite(me.getID()))
  m_memViewFinder = getMember("cam_viewfinder")
  m_memLock = getMember("cam_viewfinder_lock")
  m_memRedLED = getMember("led.red")
  m_memGreenLED = getMember("led.green")
  m_frameSwitchDelay = 0.5
  m_filmWindTime = the milliSeconds
  m_constraints = rect(0, 0, (the stage).image.width, (the stage).image.height)
  m_bLock = 0
  m_bActive = 1
  return 1
end
on deconstruct me
  releaseSprite(m_rSprBase.spriteNum)
  releaseSprite(m_rSprLock.spriteNum)
  releaseSprite(m_rSprLED.spriteNum)
  return 1
end
on Activate me
  m_bActive = 1
  m_rSprBase.visible = m_bActive
  m_rSprLock.visible = m_bActive
  m_rSprLED.visible = m_bActive
end
on inActivate me
  m_bActive = 0
  m_rSprBase.visible = m_bActive
  m_rSprLock.visible = m_bActive
  m_rSprLED.visible = m_bActive
end
on GetActive me
  return m_bActive
end
on SetFrameSize me, i_fSize
  m_fSize = i_fSize
end
on SetConstraints me, a_left, a_top, a_right, a_bottom
  m_constraints = rect(a_left, a_top, a_right, a_bottom)
end
on SetLock me, a_val
  m_bLock = a_val
end
on render me
  m_rSprBase.member = m_memViewFinder
  tloc = the mouseLoc
  if tloc.locH < m_constraints.left + m_rSprBase.width / 2 then
    tloc.locH = m_constraints.left + m_rSprBase.width / 2
  end if
  if tloc.locH > m_constraints.right - m_rSprBase.width / 2 then
    tloc.locH = m_constraints.right - m_rSprBase.width / 2
  end if
  if tloc.locV < m_constraints.top + m_rSprBase.height / 2 then
    tloc.locV = m_constraints.top + m_rSprBase.height / 2
  end if
  if tloc.locV > m_constraints.bottom - m_rSprBase.height / 2 then
    tloc.locV = m_constraints.bottom - m_rSprBase.height / 2
  end if
  if m_bLock then
    m_rSprLock.member = m_memLock
  else
    m_rSprLock.member = VOID
  end if
  if me.ready() then
    m_rSprLED.member = m_memGreenLED
  else
    m_rSprLED.member = m_memRedLED
  end if
  m_rSprBase.loc = tloc
  m_rSprBase.locZ = 5000
  m_rSprLock.loc = tloc
  m_rSprLock.locZ = 5001
  m_rSprLED.loc = tloc
  m_rSprLED.locZ = 5001
end
on getSprite me
  return m_rSprBase
end
on StartFilmWind me
  m_filmWindTime = the milliSeconds
end
on ready me
  if m_bActive then
    tDeltaTime = (the milliSeconds - m_filmWindTime) / 1000.0
    if tDeltaTime < m_frameSwitchDelay then
      return 0
    else
      return 1
    end if
  else
    return 0
  end if
end
on GetHideables me
  return [the spriteNum of m_rSprBase, the spriteNum of m_rSprLock, the spriteNum of m_rSprLED]
end