-- Script
property m_rSprite
property m_rOwner
property m_rStatus
property m_rTimer
property m_rHMRenderer
property m_rAvatarRenderer

on construct me
  m_rSprite = sprite(reserveSprite(me.getID()))
  m_rSprite.member = VOID
  m_rSprite.ink = 33
  m_rSprite.locZ = -49
  m_rOwner = VOID
  m_rStatus = VOID
  m_rRenderer = VOID
  m_rAvatarRenderer = VOID
  return 1
end
on deconstruct me
  if m_rSprite.spriteNum <> 0 then
    releaseSprite(m_rSprite.spriteNum)
  end if
  if not voidp(m_rStatus) then
    removeObject(m_rStatus.getID())
  end if
  if objectp(m_rHMRenderer) then
  end if
  return 1
end
on PlayerLeftGame me
  if m_rSprite.spriteNum <> 0 then
    releaseSprite(m_rSprite.spriteNum)
  end if
  if not voidp(m_rStatus) then
    removeObject(m_rStatus.getID())
  end if
  me.SetOwner(VOID)
end
on selectSprite me
  tColor = me.getObject().GetParam("Team")
  case tColor of
    1:
    2:

  end case
end
on SetOwner me, i_rOwner
  m_rOwner = i_rOwner
end
on GetOwner me
  return m_rOwner
end
on GetStatus me
  return m_rStatus
end
on fetchOwner me
  m_rOwner = getThread("room").getComponent()._AccessRoom()._AccessIndexed(me.getObject().GetParam("Owner"), "avatar")
end
on initStatus me, i_rAvatar
  m_rOwner = i_rAvatar
  m_rAvatarRenderer = i_rAvatar.GetVisual().GetRenderer()
  t_sName = i_rAvatar.GetParam("NAME")
  m_rStatus = createObject("HMAvatar_" & t_sName & ".status", "CHMPlayerStatus")
  m_rStatus.Init(t_sName, me.getObject().GetParam("Team"))
end
on Possess me
  t_iStatus = #possessed
  if not voidp(m_rStatus) then
    m_rStatus.setStatus(t_iStatus)
  end if
  me.changeRenderer(t_iStatus)
end
on UnPossess me
  t_iStatus = #normal
  if not voidp(m_rStatus) then
    m_rStatus.setStatus(t_iStatus)
  end if
  me.changeRenderer(t_iStatus)
end
on delayed me
  t_iStatus = #delayed
  if not voidp(m_rStatus) then
    m_rStatus.setStatus(t_iStatus)
  end if
end
on undelayed me
  t_iStatus = #normal
  if not voidp(m_rStatus) then
    m_rStatus.setStatus(t_iStatus)
  end if
end
on changeRenderer me, i_status
  if not voidp(m_rOwner) then
    if i_status = #possessed then
      if voidp(m_rHMRenderer) then
        m_rHMRenderer = createObject(#random, "CHMAvatarClassPossessed")
        m_rHMRenderer.Init(me.getObject().GetParam("Team"))
      end if
      m_rAvatarRenderer.ReleaseBeam()
      if objectp(m_rOwner.GetVisual()) then
        m_rOwner.GetVisual().SetRenderer(m_rHMRenderer)
      end if
    else
      m_rHMRenderer.Release()
      if objectp(m_rOwner.GetVisual()) then
        m_rOwner.GetVisual().SetRenderer(m_rAvatarRenderer)
      end if
    end if
  end if
end
on update me
  if not voidp(m_rOwner) then
    if not voidp(m_rOwner.GetOwner()) then
      if not voidp(m_rStatus) then
        m_rStatus.updatePosition(m_rOwner.GetScrPos())
      end if
    end if
  end if
end