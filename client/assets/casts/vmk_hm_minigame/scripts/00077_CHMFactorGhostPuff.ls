-- Script
property m_rAvatar
property m_bInit

on construct me
  m_bInit = 0
  return 1
end
on Init me
  t_iAvatarRef = me.getObject().GetParam("Avatar")
  t_iGhostRef = me.getObject().GetParam("Ghost")
  t_rAvatarPlayer = getThread("minigame").getComponent().GetMGObject(t_iAvatarRef)
  t_rGhost = getThread("minigame").getComponent().GetMGObject(t_iGhostRef)
  if objectp(t_rAvatarPlayer) and objectp(t_rGhost) then
    t_vPos = getThread("minigame").getComponent().GetMGObject(t_iGhostRef).GetAbsPos()
    me.getObject().SetAbsPos(t_vPos)
    m_rAvatar = getThread("room").getComponent()._AccessRoom()._AccessIndexed(t_rAvatarPlayer.GetParam("Owner"), "avatar")
    m_bInit = 1
  end if
end
on deconstruct me
  return 1
end
on update me
  if m_bInit then
    t_vDestination = m_rAvatar.GetAbsPos()
    t_vLoc = me.getObject().GetAbsPos()
    t_vDelta = t_vDestination - t_vLoc
    t_vNewPos = t_vLoc + t_vDelta / 10
    me.getObject().SetAbsPos(t_vNewPos)
  end if
end