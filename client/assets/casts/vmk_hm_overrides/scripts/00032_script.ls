-- Behavior
property m_iType
property m_iDirection
property m_ar_framesCache
property m_rGlow
property m_rShadowSpr
property m_sMood
property m_bFlip
property m_iFrame
property m_rSprite
property m_iTimer
property m_iScale
property m_iRotateDirection
property m_bRemoved

on construct me
  m_ar_framesCache = propList()
  m_rGlow = sprite(reserveSprite(me.getID()))
  me.m_rGlow.member = VOID
  me.m_rGlow.ink = 33
  me.m_rGlow.locZ = -49
  m_rShadowSpr = VOID
  m_rSprite = sprite(reserveSprite(me.getID()))
  me.m_rSprite.member = VOID
  me.m_rSprite.ink = 36
  me.m_rSprite.locZ = -49
  m_iColor = VOID
  m_sMood = "flee"
  me.m_iDirection = 0
  m_bFlip = 0
  m_iFrame = 0
  m_iTimer = 0
  m_iScale = 100
  m_iRotateDirection = 0
  m_bRemoved = 0
  return 1
end
on deconstruct me
  if not voidp(me.m_rSprite) then
    releaseSprite(me.m_rSprite.spriteNum)
    releaseSprite(me.m_rGlow.spriteNum)
    if not voidp(me.m_rShadowSpr) then
      releaseSprite(me.m_rShadowSpr.spriteNum)
    end if
  end if
  return 1
end
on setDirection me, i_iMood, i_iDir
  if i_iMood = 0 then
    me.m_iDirection = 0
    m_bFlip = 0
  else
    if i_iMood = 1 then
      me.m_iDirection = 1
      m_bFlip = 0
    else
      if i_iMood = 2 then
        me.m_iDirection = 2
        m_bFlip = 0
      else
        if i_iMood = 3 then
          me.m_iDirection = 3
          m_bFlip = 0
        else
          if i_iMood = 4 then
            me.m_iDirection = 4
            m_bFlip = 0
          else
            if i_iMood = 5 then
              me.m_iDirection = 3
              m_bFlip = 1
            else
              if i_iMood = 6 then
                me.m_iDirection = 2
                m_bFlip = 1
              else
                if i_iMood = 7 then
                  me.m_iDirection = 1
                  m_bFlip = 1
                else
                  me.m_iDirection = 0
                  m_bFlip = 1
                end if
              end if
            end if
          end if
        end if
      end if
    end if
  end if
end
on selectSprite me
  if me.getObject().GetParam("Team") = 1 then
    m_iType = 1
    me.m_rGlow.member = member("greenGhost_glow")
  else
    if me.getObject().GetParam("Team") = 2 then
      m_iType = 2
      me.m_rGlow.member = member("purpleGhost_glow")
    end if
  end if
  if voidp(me.m_rShadowSpr) then
    m_rShadowSpr = sprite(reserveSprite(me.getID()))
    me.m_rShadowSpr.member = getMember("room_avatar_shadow")
    me.m_rShadowSpr.ink = 39
    me.m_rShadowSpr.blend = 50
  end if
end
on update me
  if me.m_iScale <= 0 then
    exit
  end if
  if voidp(me.m_iType) then
    me.selectSprite()
  end if
  t_sMemName = me.m_sMood & "_ghst" & me.m_iType & "_" & me.m_iDirection & "_" & me.m_iFrame
  tloc = me.m_ar_framesCache.getaProp(t_sMemName)
  if voidp(tloc) then
    tloc = member(t_sMemName)
    me.m_ar_framesCache[t_sMemName] = tloc
  else
    me.m_rSprite.width = tloc.image.width
    me.m_rSprite.height = tloc.image.height
  end if
  me.m_rSprite.member = tloc
  me.m_rSprite.flipH = me.m_bFlip
  t_rMem = me.getObject().GetScrPos()
  me.m_rSprite.loc = point(t_rMem.x, t_rMem.y)
  me.m_rSprite.locZ = t_rMem.z
  me.m_rGlow.loc = point(t_rMem.x, t_rMem.y)
  me.m_rGlow.locZ = t_rMem.z + 1
  me.m_rShadowSpr.loc = point(t_rMem.x, t_rMem.y)
  me.m_rShadowSpr.locZ = t_rMem.z - 1
  m_iScale = me.m_iScale - 4
  if m_iScale <= 0 then
    releaseSprite(me.m_rSprite.spriteNum)
    releaseSprite(me.m_rGlow.spriteNum)
    if not voidp(me.m_rShadowSpr) then
      releaseSprite(me.m_rShadowSpr.spriteNum)
    end if
    me.m_rSprite = VOID
    me.m_rGlow = VOID
    me.m_rShadowSpr = VOID
    exit
  end if
  me.m_rSprite.width = tloc.width * (me.m_iScale / 100.0)
  me.m_rSprite.height = tloc.height * (me.m_iScale / 100.0)
  me.m_rGlow.width = me.m_rGlow.member.width * (me.m_iScale / 100.0)
  me.m_rGlow.height = me.m_rGlow.member.height * (me.m_iScale / 100.0)
  me.m_rShadowSpr.width = me.m_rShadowSpr.member.width * (me.m_iScale / 100.0)
  me.m_rShadowSpr.height = me.m_rShadowSpr.member.height * (me.m_iScale / 100.0)
  m_iTimer = me.m_iTimer + 1
  if me.m_iTimer mod 3 = 0 then
    m_iFrame = me.m_iFrame + 1
    if me.m_iFrame > 3 then
      m_iFrame = 0
    end if
    m_iRotateDirection = me.m_iRotateDirection + 1
    if me.m_iRotateDirection > 7 then
      m_iRotateDirection = 0
    end if
    me.setDirection(me.m_iRotateDirection)
  end if
end