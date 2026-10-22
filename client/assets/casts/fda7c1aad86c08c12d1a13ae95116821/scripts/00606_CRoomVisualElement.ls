-- Script
property m_bSelected
property m_bCustomHighlighters
property m_mp_blinkStat
property m_ar_loadAnimation
property m_bAnimate
property m_bLoaded

on construct this
  m_bLoaded = 0
  m_bSelected = 0
  m_bCustomHighlighters = 0
  m_mp_blinkStat = [#cur: 0, #min: 0, #max: 50, #inc: 10]
  if not variableExists("room_load_anim_disabled") then
    setVariable("room_load_anim_disabled", 1)
  end if
  if getIntVariable("room_load_anim_disabled") then
    m_bAnimate = 0
  else
    m_bAnimate = 1
    t_rLoadStruct = GetItemAniStructure("loading")
    m_ar_loadAnimation = [#frames: VOID, #sound: VOID, #condition: VOID, #delay: 5, #current: 1]
    t_rLoadStruct.returnAnimatedBlocks(0, 3, m_ar_loadAnimation)
  end if
  return 1
end
on deconstruct this
  m_bSelected = 0
  m_bLoaded = 0
  if m_bSelected or m_bCustomHighlighters then
    this.RemoveHighlighters()
  end if
  m_ar_loadAnimation = VOID
  return 1
end
on IsReady this
  if not m_bLoaded then
    return 0
  end if
  t_ar_rBlocks = this.getObject().GetFactor().GetBlocks()
  if t_ar_rBlocks.count = 0 then
    return 0
  end if
  repeat with t_rBlock in t_ar_rBlocks
    if not t_rBlock.GetVisual().IsReady() then
      return 0
    end if
  end repeat
  return getObject("RoomItemAssetManager").IsItemReady(the integer of this.getObject().GetParam("TYPE"))
end
on AssetsLoaded this
  m_bLoaded = 1
  call(#TellVisual, this.getObject().GetFactor().GetBlocks(), #SetSprites)
end
on SetBlockVisualCursors this, a_voCursor, a_ar_ar_blockSpriteIndexes
  t_ar_rBlocks = this.getObject().GetFactor().GetBlocks()
  repeat with i = 1 to t_ar_rBlocks.count
    t_rVisual = t_ar_rBlocks[i].GetVisual()
    t_rVisual.setcursor(a_voCursor, a_ar_ar_blockSpriteIndexes[i])
  end repeat
end
on CreateHighlighters this
  call(#TellVisual, this.getObject().GetFactor().GetBlocks(), #CreateHighlighter)
end
on RemoveHighlighters this
  call(#TellVisual, this.getObject().GetFactor().GetBlocks(), #RemoveHighlighter)
end
on AdjustHighlighters this, a_iBlend, a_kInk
  call(#TellVisual, this.getObject().GetFactor().GetBlocks(), #AdjustHighlighter, a_iBlend, a_kInk)
end
on select this, a_bSelect
  m_bSelected = a_bSelect
  if not m_bSelected then
    if not m_bCustomHighlighters then
      this.RemoveHighlighters()
    end if
  else
    if not m_bCustomHighlighters then
      this.CreateHighlighters()
    end if
  end if
end
on IsSelected this
  return m_bSelected
end
on update this
  if m_bAnimate then
    if not m_bLoaded then
      t_ar_rBlocks = this.getObject().GetFactor().GetBlocks()
      repeat with t_rBlock in t_ar_rBlocks
        t_ar_rSprites = t_rBlock.GetVisual().GetSprites()
        if t_ar_rSprites.count > 0 then
          t_rSprite = t_ar_rSprites[1]
          t_iCurrent = m_ar_loadAnimation[#current]
          if t_iCurrent = 1 then
            if m_ar_loadAnimation.frames.count > 0 then
              t_ar_anim = m_ar_loadAnimation[#frames][1][#sprites][1]
              t_ar_frames = t_ar_anim.frames
              t_iIndex = t_ar_anim.index
              t_rMem = t_ar_frames[t_iIndex]
              if t_rMem <> t_rSprite.member then
                t_rSprite.member = t_rMem
                t_rSprite.width = t_rSprite.member.width
                t_rSprite.height = t_rSprite.member.height
              end if
              t_iIndex = t_iIndex + 1
              if t_iIndex > t_ar_frames.count then
                t_iIndex = 1
              end if
              t_ar_anim[#index] = t_iIndex
            end if
          end if
          t_iCurrent = t_iCurrent + 1
          if t_iCurrent > m_ar_loadAnimation.delay then
            t_iCurrent = 1
          end if
          m_ar_loadAnimation[#current] = t_iCurrent
        end if
      end repeat
    end if
  end if
  if m_bSelected or m_bCustomHighlighters then
    this.AdjustHighlighters(m_mp_blinkStat.cur)
    m_mp_blinkStat.cur = m_mp_blinkStat.cur + m_mp_blinkStat.inc
    if m_mp_blinkStat.cur <= m_mp_blinkStat.min or m_mp_blinkStat.cur >= m_mp_blinkStat.max then
      m_mp_blinkStat.inc = -m_mp_blinkStat.inc
      m_mp_blinkStat.cur = m_mp_blinkStat.cur + m_mp_blinkStat.inc
    end if
  end if
end
on SetCustomHighlighters this, a_bState, a_kType
  if a_bState then
    if getObject(#session).get("room_furnish_mode") then
      if not m_bSelected then
        this.CreateHighlighters()
      end if
      call(#TellVisual, this.getObject().GetFactor().GetBlocks(), #ChangeHighlighterType, a_kType)
      m_bCustomHighlighters = a_bState
    end if
  else
    if not m_bSelected then
      this.RemoveHighlighters()
    else
      call(#TellVisual, this.getObject().GetFactor().GetBlocks(), #ChangeHighlighterType, #select)
    end if
    m_bCustomHighlighters = a_bState
  end if
end