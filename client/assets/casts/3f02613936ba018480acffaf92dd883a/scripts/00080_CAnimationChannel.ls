-- Script
property m_rSprite
property m_ar_sprites
property m_i_frameCounter
property m_i_ActiveSpriteSpan
property m_rRegpoint
property m_rRoomObject
property m_veLastScr
property m_pLastPos
property m_iLastLocH
property m_iLastLocV
property m_bActive
property m_iDeltaLocZ

on construct me
  m_rSprite = sprite(reserveSprite(me.getID()))
  m_bInited = 0
  m_bActive = 1
  m_ar_sprites = []
  m_i_frameCounter = 0
  m_i_ActiveSpriteSpan = 0
  m_rRegpoint = point(400, 300)
  m_rRoomObject = VOID
  m_iLastLocH = 0
  m_iLastLocV = 0
  m_iDeltaLocZ = 0
  return 1
end
on deconstruct me
  releaseSprite(m_rSprite.spriteNum)
  repeat with tSprite in m_ar_sprites
    removeObject(tSprite.getID())
  end repeat
  return 1
end
on show me
  m_rSprite.visible = 1
  m_bActive = 1
end
on hide me
  m_rSprite.visible = 0
  m_bActive = 0
end
on Init me, i_spriteSpans, i_ar_spriteDefaults
  m_ar_sprites = []
  repeat with tSpriteData in i_spriteSpans
    t_rSprite = createObject(#random, "CAnimationSprite")
    t_rSprite.Init(tSpriteData, i_ar_spriteDefaults)
    m_ar_sprites.append(t_rSprite)
  end repeat
  m_bInited = 1
end
on setRegPoint me, t_iPoint
  m_rRegpoint = value(t_iPoint)
end
on setRoomObject me, i_rRoomObject
  m_rRoomObject = i_rRoomObject
end
on setDeltaLocZ me, i_iDelta
  m_iDeltaLocZ = i_iDelta
end
on getObject me
  return m_rRoomObject
end
on getSprite me
  return m_rSprite
end
on activateNextSpriteSpan me
  repeat with i = 1 to m_ar_sprites.count
    tSprite = m_ar_sprites[i]
    if tSprite.insideFrameSpan(m_i_frameCounter) then
      m_i_ActiveSpriteSpan = i
      return 1
    end if
  end repeat
  m_i_ActiveSpriteSpan = 0
  return 0
end
on checkActiveSpriteSpan me
  t_bSearchNext = 0
  if m_i_ActiveSpriteSpan <> 0 then
    tCurrentSpan = m_ar_sprites[m_i_ActiveSpriteSpan]
    if not tCurrentSpan.insideFrameSpan(m_i_frameCounter) then
      tCurrentSpan.deactivate()
      t_bSearchNext = 1
    else
    end if
  else
    t_bSearchNext = 1
  end if
  if t_bSearchNext then
    if me.activateNextSpriteSpan() then
      m_ar_sprites[m_i_ActiveSpriteSpan].Activate()
    end if
  end if
end
on update me, i_iframeHead
  if m_bActive then
    m_i_frameCounter = i_iframeHead
    me.checkActiveSpriteSpan()
    if m_i_ActiveSpriteSpan <> 0 then
      if not m_rSprite.visible then
        m_rSprite.visible = 1
      end if
      t_activeSprite = m_ar_sprites[m_i_ActiveSpriteSpan]
      t_activeSprite.update(i_iframeHead)
      tNewMember = t_activeSprite.GetParam(#member)
      if m_rSprite.member <> tNewMember and tNewMember.number > 0 then
        m_rSprite.member = t_activeSprite.GetParam(#member)
      end if
      t_activeData = m_ar_sprites[m_i_ActiveSpriteSpan].getFrameData()
      if not voidp(t_activeData) then
        repeat with i = 1 to t_activeData.count
          tProp = t_activeData.getPropAt(i)
          t_activeSprite.SetParam(tProp, t_activeData[i])
          if not (tProp = #locH) and not (tProp = #locV) then
            tOldVal = value(m_rSprite & "." & string(tProp))
            if tOldVal <> t_activeData[i] then
              case tProp of
                #width:
                  m_rSprite.width = t_activeData[i]
                #height:
                  m_rSprite.height = t_activeData[i]
                #blend:
                  m_rSprite.blend = t_activeData[i]
                #rotation:
                  m_rSprite.rotation = t_activeData[i]
                #skew:
                  m_rSprite.skew = t_activeData[i]
                #blendLevel:
                  m_rSprite.blendLevel = t_activeData[i]
                #ink:
                  m_rSprite.ink = t_activeData[i]
                #flipH:
                  m_rSprite.flipH = t_activeData[i]
                #flipV:
                  m_rSprite.flipV = t_activeData[i]
                #startFrame, #endFrame:
                  nothing()
                #locZ:
                  nothing()
                #steps:
                  nothing()
                #tweened:
                  nothing()

              end case
            end if
          end if
        end repeat
        tLocH = t_activeData.getaProp(#locH)
        if voidp(tLocH) then
          tLocH = m_iLastLocH
        else
          m_iLastLocH = tLocH
        end if
        tLocV = t_activeData.getaProp(#locV)
        if voidp(tLocV) then
          tLocV = m_iLastLocV
        else
          m_iLastLocV = tLocV
        end if
        tNewPos = point(tLocH, tLocV)
        t_veScr = me.getObject().GetScrPos()
        tVersion = me.getObject().GetParam(#version)
        if m_veLastScr <> t_veScr or tNewPos <> m_pLastPos then
          case tVersion of
            "0.1":
              t_fXs = tNewPos.locH
              t_fYs = tNewPos.locV
            "0.2":
              t_fXs = tNewPos.locH
              t_fYs = tNewPos.locV
            "0.3", "0.4":
              t_fXs = t_veScr.x + tNewPos.locH
              t_fYs = t_veScr.y + tNewPos.locV
            otherwise:
              t_fXs = t_veScr.x + tNewPos.locH
              t_fYs = t_veScr.y + tNewPos.locV

          end case
          t_fZs = t_veScr.z + m_iDeltaLocZ
          if m_rSprite.locH <> t_fXs then
            m_rSprite.locH = t_fXs
          end if
          if m_rSprite.locV <> t_fYs then
            m_rSprite.locV = t_fYs
          end if
          if m_rSprite.locZ <> t_fZs then
            m_rSprite.locZ = t_fZs
          end if
          m_veLastScr = t_veScr
          m_pLastPos = tNewPos
        end if
      end if
    else
      if m_rSprite.visible then
        m_rSprite.visible = 0
      end if
    end if
  end if
end