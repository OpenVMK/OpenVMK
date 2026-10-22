-- Script
property m_rVisualScreen
property m_rVisualLights
property m_sMemname

on construct me
  registerMessage(#room_ready, me.getID(), #initRoom)
  m_rVisualScreen = VOID
  m_rVisualLights = VOID
  m_sMemname = "projection"
  return 1
end
on deconstruct me
  unregisterMessage(#room_ready, me.getID())
  m_rVisualScreen = VOID
  m_rVisualLights = VOID
  if memberExists(m_sMemname) then
    removeMember(m_sMemname)
  end if
  return 1
end
on initRoom me
  t_rContext = getThread(#room).component._AccessRoom()
  if objectp(t_rContext) then
    m_rVisualLights = t_rContext.Search("SPRITE", "stage beams").GetVisual()
    if objectp(m_rVisualLights) then
      m_rVisualLights.visible(0)
    end if
    m_rVisualScreen = t_rContext.Search("SPRITE", "screen").GetVisual()
    if objectp(m_rVisualScreen) then
      m_rVisualScreen.visible(0)
    end if
  end if
end
on ShowProjection me, a_img
  t_rContext = getThread(#room).component._AccessRoom()
  if objectp(t_rContext) then
    m_rVisualLights = t_rContext.Search("SPRITE", "stage beams").GetVisual()
    if objectp(m_rVisualLights) then
      m_rVisualLights.visible(1)
      executeMessage("PlayInterfaceSound", "SB-lightson")
    end if
    m_rVisualScreen = t_rContext.Search("SPRITE", "screen").GetVisual()
    if objectp(m_rVisualScreen) then
      if memberExists(m_sMemname) then
        t_rMem = getMember(m_sMemname)
        t_rMem.image = a_img
        t_rMem.regPoint = point(0, 0)
      else
        t_iMemNum = createMember(m_sMemname, #bitmap)
        t_rMem = member(t_iMemNum)
        t_rMem.image = a_img
        t_rMem.regPoint = point(0, 0)
      end if
      m_rVisualScreen.getSprite().member = t_rMem
      m_rVisualScreen.visible(1)
    end if
  end if
end
on ExitPodium me
  if objectp(m_rVisualScreen) then
    m_rVisualScreen.visible(0)
  end if
  if objectp(m_rVisualLights) then
    m_rVisualLights.visible(0)
  end if
end