-- Parent Script
property m_vVelocity
property m_fAge
property m_fAgeLimit
property m_removeFlag
property m_vPosition
property m_pSpriteRef
property m_mp_spriteSeq
property m_spriteSeq_loopStart
property m_spriteSeq_loopEnd
property m_ar_spriteListRef
property m_ar_spriteListAtTime
property m_fRandomMotion

on new me, i_spriteSeq, i_velocity, i_ageLimit, i_position, i_randomAmount
  m_removeFlag = 0
  m_pSpriteRef = VOID
  m_mp_spriteSeq = [:]
  m_spriteSeq_loopStart = 0.0
  m_spriteSeq_loopEnd = 0.0
  m_fAge = 0.0
  m_fAgeLimit = 0.0
  m_fVelocity = vector(0, 0, 0)
  m_vPosition = vector(0, 0, 0)
  m_ar_spriteListRef = []
  m_ar_spriteListAtTime = []
  m_fRandomAmount = 0.0
  if the paramCount > 1 then
    if ilk(i_velocity, #vector) then
      m_vVelocity = i_velocity
    end if
    if ilk(i_ageLimit, #number) then
      m_fAgeLimit = i_ageLimit
    end if
    if ilk(i_position, #vector) then
      m_vPosition = i_position
    end if
    if ilk(i_randomAmount, #number) then
      m_fRandomMotion = i_randomAmount
    end if
    if ilk(i_spriteSeq, #linearList) then
      if i_spriteSeq.count < 1 then
        error("Sprite Sequence lenght must be 1 or more", #new)
      end if
      m_pSpriteRef = i_spriteSeq[1].getaProp(#sprite)
      m_mp_spriteSeq = i_spriteSeq
      tCurrentTime = 0.0
      repeat with tListEntry in m_mp_spriteSeq
        tLength = tListEntry.getaProp(#ms)
        if not voidp(tLength) then
          m_ar_spriteListRef.append(tListEntry.getaProp(#sprite))
          m_ar_spriteListAtTime.append(tCurrentTime)
          tCurrentTime = tCurrentTime + tLength * 0.813999950885773
          m_spriteSeq_loopEnd = tCurrentTime
          next repeat
        end if
        tLoopFrame = tListEntry.getaProp(#loop)
        repeat with i = 2 to tLoopFrame
          m_spriteSeq_loopStart = m_spriteSeq_loopStart + m_mp_spriteSeq[i].getaProp(#ms) * 0.813999950885773
        end repeat
      end repeat
      m_ar_spriteListAtTime.append(m_spriteSeq_loopEnd)
    end if
  end if
  return me
end
on floor i_fVal
  tInteger = integer(i_fVal)
  if tInteger > i_fVal then
    return float(tInteger - 1)
  else
    return float(tInteger)
  end if
end
on GetSpriteRefAtTime me, i_fX
  tSprite = m_ar_spriteListRef[1]
  tt = i_fX
  if tt > m_spriteSeq_loopEnd then
    tLoopLength = m_spriteSeq_loopEnd - m_spriteSeq_loopStart
    if tLoopLength > 0.0 then
      tOverTime = tt - m_spriteSeq_loopEnd
      tHowManyLoops = floor(tOverTime / tLoopLength)
      tt = tOverTime - tHowManyLoops * tLoopLength + m_spriteSeq_loopStart
    end if
  end if
  repeat with i = 1 to m_ar_spriteListRef.count
    t_fTimeLow = m_ar_spriteListAtTime[i]
    t_fTimeHigh = m_ar_spriteListAtTime[i + 1]
    if t_fTimeLow < tt and tt < t_fTimeHigh then
      tSprite = m_ar_spriteListRef[i]
      exit repeat
    end if
  end repeat
  return tSprite
end
on updateParticle me, i_dt, i_velocityChange
  m_fAge = m_fAge + i_dt
  if m_fAge >= m_fAgeLimit then
    m_removeFlag = 1
    exit
  end if
  m_vVelocity = m_vVelocity + i_velocityChange
  m_vPosition = m_vPosition + m_vVelocity * i_dt
  if m_fRandomMotion > 0.0 then
    m_vPosition.x = m_vPosition.x + m_fRandomMotion * float(random(1000) - 500) / 500.0
    m_vPosition.y = m_vPosition.y + m_fRandomMotion * float(random(1000) - 500) / 500.0
    m_vPosition.z = m_vPosition.z + m_fRandomMotion * float(random(1000) - 500) / 500.0
  end if
  if m_ar_spriteListRef.count > 1 then
    m_pSpriteRef = me.GetSpriteRefAtTime(m_fAge)
  end if
end
on setPosition me, i_vPos
  m_vPosition = i_vPos
end
on SetRandomMotion me, i_fVal
  m_fRandomMotion = i_fVal
end
on SetRemoveFlag me, a_bVal
  m_removeFlag = a_bVal
end
on getRemoveFlag me
  return m_removeFlag
end
on getSpriteRef me
  return m_pSpriteRef
end
on getPosition me
  return m_vPosition
end