-- Script
property m_rGameEngine
property m_score
property m_i_statebits
property m_sName
property m_bFoundExit
property m_bCaughtBySuperGhost
property m_rAvatar

on construct me
  m_rGameEngine = getObject(#minigame_component)
  m_rAvatar = VOID
  m_sName = EMPTY
  m_bFoundExit = 0
  m_bCaughtBySuperGhost = 0
  return 1
end
on deconstruct me
  return 1
end
on SetName me, a_sName
  m_sName = a_sName
end
on GetName me
  return m_sName
end
on setFoundExit me, a_bFoundExit
  m_bFoundExit = a_bFoundExit
end
on getFoundExit me
  return m_bFoundExit
end
on getCaughtBySuperGhost me
  return m_bCaughtBySuperGhost
end
on getPossessed me
  return bitAnd(m_i_statebits, 1)
end
on SetConstants me
  m_i_statebits = 0
  m_score = 0
  if not voidp(me.getObject()) then
    tMyAvatarRef = me.getObject().GetParam("Owner")
    if tMyAvatarRef = -1 then
      m_rAvatar = VOID
    else
      m_rAvatar = getThread("room").getComponent()._AccessRoom()._AccessIndexed(tMyAvatarRef, "avatar")
      if not voidp(m_rAvatar) then
        me.SetName(m_rAvatar.GetParam("NAME"))
        if m_rAvatar.GetParam("NAME") = getObject(#session).get("name") then
          getThread("hauntedmansiongame").getComponent().setOwnPlayer(me.getObject())
        end if
        m_rAvatar.GetFactor().m_iStatusDelay = 300
        me.getObject().GetVisual().initStatus(m_rAvatar)
      else
      end if
    end if
  end if
end
on move me
  if voidp(m_rAvatar) then
    me.SetConstants()
  end if
  if voidp(m_rAvatar) then
    exit
  end if
  me.getObject().SetParam("WorldPosition", intvector(0, 0, 0))
  me.getObject().SetParam("Direction", 0)
end
on AwardScore me, a_iAmount
  m_score = m_score + a_iAmount
  tScore = me.getObject().GetParam("Score")
  tScore = tScore + a_iAmount
  if tScore < 0 then
    tScore = 0
  end if
  me.getObject().SetParam("Score", tScore)
  tScoreBoard = m_rGameEngine.GetObjectsByCode(5)
  if tScoreBoard.count <> 1 then
    return error(me, "HM Scoreboard object could not be found!", #AwardScore)
  end if
  tScoreBoard[1].GetFactor().UpdateTeamScores()
  me.SyncGameParameters()
end
on SyncGameParameters me
  t_params = []
  t_params[1] = m_score
  t_params[2] = m_i_statebits
  me.getObject().SetParam("GameParams", t_params)
end
on UpdateParameters me, i_ar_data
  put "Player updates data" && i_ar_data
end
on Possess me
  t_iBitMask = 1
  if bitAnd(m_i_statebits, t_iBitMask) = 0 then
    m_i_statebits = bitXor(m_i_statebits, t_iBitMask)
  end if
  me.SyncGameParameters()
  me.getObject().GetVisual().Possess()
end
on UnPossess me
  t_iBitMask = 1
  if bitAnd(m_i_statebits, t_iBitMask) = t_iBitMask then
    m_i_statebits = bitXor(m_i_statebits, t_iBitMask)
  end if
  me.SyncGameParameters()
  me.getObject().GetVisual().UnPossess()
end
on ToggleVisibility me, i_iVisibility
  t_iBitMask = 4
  if not voidp(m_rAvatar) then
    if not voidp(m_rAvatar.GetVisual()) then
      case i_iVisibility of
        1:
          if bitAnd(m_i_statebits, t_iBitMask) = 0 then
            m_i_statebits = bitXor(m_i_statebits, t_iBitMask)
          end if
          m_rAvatar.GetVisual().m_rCanvasSpr.blend = 50
        otherwise:
          if bitAnd(m_i_statebits, t_iBitMask) = t_iBitMask then
            m_i_statebits = bitXor(m_i_statebits, t_iBitMask)
          end if
          m_rAvatar.GetVisual().m_rCanvasSpr.blend = 100

      end case
    end if
  end if
  me.SyncGameParameters()
end
on PlayerLeftGame me
  t_iBitMask = 2
  if bitAnd(m_i_statebits, t_iBitMask) = 0 then
    m_i_statebits = bitXor(m_i_statebits, t_iBitMask)
  end if
  me.SyncGameParameters()
  me.getObject().GetVisual().PlayerLeftGame()
end
on SuperGhostPossess me
  t_iBitMask = 2
  if bitAnd(m_i_statebits, t_iBitMask) = 0 then
    m_i_statebits = bitXor(m_i_statebits, t_iBitMask)
  end if
  m_bCaughtBySuperGhost = 1
  me.SyncGameParameters()
end