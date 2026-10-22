-- Score Script
property m_ar_sounds
property m_ar_animContainers
property m_ar_pAnimations
property m_ar_pNodes
property m_iState
property m_iFrame
property m_anistarttime
property m_iRunningLength
property m_sName

on construct me
  m_ar_sounds = [:]
  m_ar_animContainers = []
  m_ar_pAnimations = []
  m_ar_pNodes = []
  m_iState = #stop
  m_iFrame = 1
  m_anistarttime = the milliSeconds
  m_iRunningLength = 0
  m_sName = EMPTY
  return 1
end
on deconstruct me
  me.removeAllAnimations()
  return 1
end
on removeAllAnimations me
  repeat with tAnim in m_ar_pAnimations
    tID = tAnim.getID()
    if tID <> 0 then
      removeObject(tID)
    end if
  end repeat
  if listp(m_ar_pAnimations) then
    m_ar_pAnimations.deleteAll()
  end if
end
on SetName me, i_sName
  m_sName = i_sName
end
on getRunningLength me
  t_totalLengths = []
  repeat with i = 1 to m_ar_animContainers.count
    t_len = (m_ar_animContainers[i].offset + m_ar_pAnimations[i].m_ar_framelist.count) * m_ar_animContainers[i].fpsdivider
    t_loopLen = 0
    if m_ar_pAnimations[i].m_iLoopCount > 1 then
      t_loopLen = (m_ar_pAnimations[i].m_iLoopEnd - m_ar_pAnimations[i].m_iLoopStart + 1) * (m_ar_pAnimations[i].m_iLoopCount + 1) * m_ar_animContainers[i].fpsdivider
      t_len = t_len + t_loopLen
    end if
    t_totalLengths.append(t_len)
  end repeat
  m_iRunningLength = t_totalLengths.max()
  return t_totalLengths.max()
end
on LoadArrangement me, i_ar_animContainers
  m_ar_sounds = [:]
  m_ar_animContainers = []
  m_ar_pAnimations = []
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  t_total_offset = 0
  repeat with tContainer in i_ar_animContainers
    t_type = tContainer.getaProp(#type)
    if t_type = "sound" then
      m_ar_sounds[string(tContainer.offset)] = [#name: tContainer.name, #playcount: 0]
      next repeat
    end if
    tNewAnim = createObject(#random, "CAnimation")
    t_mp_loop = getVariableValue(tContainer.loop)
    tNewAnim.load(t_mp_loop.framelist.duplicate(), t_mp_loop.loopstart, t_mp_loop.loopend, t_mp_loop.loopCount, t_mp_loop.freeze, t_mp_loop.getaProp(#sounds))
    m_ar_pAnimations.append(tNewAnim)
    m_ar_pNodes.append(tRoomContext.Search("NAME", tContainer.node))
    m_ar_animContainers.append(tContainer)
  end repeat
  me.getRunningLength()
end
on GetNAnimations me
  return the count of m_ar_animContainers
end
on GetOffset me, i_anim
  return the offset of m_ar_animContainers[i_anim]
end
on GetLoop me, i_anim
  return the loop of m_ar_animContainers[i_anim]
end
on GetAnimFrame me, i_anim
  tFrame = EMPTY
  t_iFrame = m_iFrame / m_ar_animContainers[i_anim].fpsdivider - m_ar_animContainers[i_anim].offset
  if not voidp(m_ar_sounds.getaProp(string(t_iFrame))) then
    snd = m_ar_sounds[string(t_iFrame)]
    if snd.playcount < 1 then
      snd.playcount = snd.playcount + 1
      executeMessage("PlayFxSound", snd.name)
    end if
  end if
  if t_iFrame > 0 then
    tFrame = m_ar_pAnimations[i_anim][t_iFrame]
  end if
  return tFrame
end
on GetAnimFrameToni me, i_anim
  tFrame = EMPTY
  t_iFrame = m_iFrame / m_ar_animContainers[i_anim].fpsdivider
  if t_iFrame < 1 then
    t_iFrame = 1
  end if
  if m_ar_animContainers[i_anim].offset <= t_iFrame then
    tFrame = m_ar_pAnimations[i_anim][t_iFrame]
  end if
  return tFrame
end
on play me, i_iFrameIndex
  if voidp(i_iFrameIndex) then
    i_iFrameIndex = 1
  end if
  m_anistarttime = the milliSeconds
  m_iState = #play
  t_iFrame = max(1, min(integer(i_iFrameIndex), m_iRunningLength - 1))
  m_iFrame = t_iFrame
end
on stop me
  repeat with snd in m_ar_sounds
    snd[#playcount] = 0
  end repeat
  repeat with anim in m_ar_pAnimations
    anim.resetSounds()
  end repeat
  m_iState = #stop
end
on update me
  if m_iState = #play then
    m_iFrame = m_iFrame + 1
    if m_iFrame > m_iRunningLength then
      executeMessage(#animation_ready, m_sName)
      me.stop()
    end if
  end if
end
on render me
  if m_iState = #play then
    repeat with i = 1 to m_ar_animContainers.count
      tSprite = m_ar_pNodes[i].GetVisual().getSprite()
      if not voidp(tSprite) then
        if tSprite.spriteNum <> 0 then
          tmember = VOID
          tFrame = me.GetAnimFrame(i)
          if tFrame <> EMPTY then
            tmember = getMember(tFrame)
          end if
          if not voidp(tmember) then
            tSprite.member = tmember
            tSprite.width = tmember.image.width
            tSprite.height = tmember.image.height
          end if
        end if
      end if
    end repeat
  end if
end