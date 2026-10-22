-- Script
property m_rStructure
property m_ar_frames
property m_iState
property m_iDir
property m_iDelay
property m_iMaxDelay
property m_bReady
property m_sCondition
property m_sSound
property m_iLoop
property m_bInteractive
property m_LoopSnd_obj
property m_rSoundSettingsListener

on construct this
  m_bInteractive = 0
  m_rStructure = VOID
  m_bReady = 0
  m_ar_frames = []
  m_iState = 0
  m_iDir = 0
  m_iDelay = 1
  m_iMaxDelay = 1
  m_sCondition = EMPTY
  m_sSound = EMPTY
  m_iLoop = 0
  m_rSoundSettingsListener = createObject(getUniqueID(), "CFurniSoundSettingsListener")
  m_rSoundSettingsListener.Init(this, #checkSoundSettings)
  return 1
end
on deconstruct me
  me.StopSound()
  m_rStructure = VOID
  m_ar_frames = []
  m_bReady = 0
  if objectp(m_rSoundSettingsListener) then
    removeObject(m_rSoundSettingsListener.getID())
    m_rSoundSettingsListener = VOID
  end if
  return callAncestor(#deconstruct, me)
end
on StopSound this
  if objectp(m_LoopSnd_obj) then
    m_LoopSnd_obj.StopSound()
    removeObject(m_LoopSnd_obj.getID())
    m_LoopSnd_obj = VOID
  end if
end
on PlaySound this
  t_bMusic = getObject(#session).get("music")
  t_bFx = getObject(#session).get("fx")
  t_bUi = getObject(#session).get("ui")
  t_iVolume = getObject(#session).get("volume")
  t_bTutorial = getObject(#session).get("tutorial")
  t_bTradeReq = getObject(#session).get("traderequests")
  t_bFriendReq = getObject(#session).get("friendrequests")
  if not (m_sSound = EMPTY) then
    if t_bFx then
      if not objectp(m_LoopSnd_obj) then
        m_LoopSnd_obj = createObject(getUniqueID(), "CSoundObject")
      end if
      m_LoopSnd_obj.Define(m_sSound)
      m_LoopSnd_obj.SetSoundType("fx")
      m_LoopSnd_obj.PlaySound()
    end if
  end if
end
on checkSoundSettings this
  t_bMusic = getObject(#session).get("music")
  t_bFx = getObject(#session).get("fx")
  t_bUi = getObject(#session).get("ui")
  t_iVolume = getObject(#session).get("volume")
  t_bTutorial = getObject(#session).get("tutorial")
  t_bTradeReq = getObject(#session).get("traderequests")
  t_bFriendReq = getObject(#session).get("friendrequests")
  if not t_bFx then
    this.StopSound()
  else
    this.PlaySound()
  end if
end
on setState me, a_iState, a_bInternal
  t_rItem = me.getObject()
  put "Set State Animation" && a_iState && t_rItem.GetParam("TYPE") && t_rItem.GetParam("DIR")
  if a_iState = 0 then
    me.reset()
  end if
  t_rItem = me.getObject()
  if a_iState <> m_iState then
    m_bReady = 0
  end if
  m_iState = a_iState
  if a_bInternal then
    me.getObject().SetParam("STATE", string(m_iState))
  end if
end
on select me
  t_rItem = me.getObject()
  if m_bInteractive then
    if the doubleClick then
      t_bConditionOK = 1
      t_iLeft = 0
      t_iRight = 0
      if not (m_sCondition = EMPTY) then
        t_ar_structLeft = value(m_sCondition.word[1])
        t_ar_structRight = value(m_sCondition.word[3])
        t_iLeft = me.getAniProp(t_ar_structLeft)
        t_iRight = me.getAniProp(t_ar_structRight)
        if not (t_iLeft = t_iRight) then
          t_bConditionOK = 0
        end if
      end if
      if t_bConditionOK then
        t_iRef = integer(me.getObject().GetParam("REF"))
        getConnection("VMK").send("UseItem", [#int: t_iRef, #int: 0])
      else
        put "Does not meet condition:" && t_iLeft && "!=" && t_iRight
      end if
    end if
  else
    put "Not interactive"
  end if
  return callAncestor(#select, me)
end
on getAniProp me, t_ar_struct
  t_iBlkNum = t_ar_struct[1]
  t_iSprNum = t_ar_struct[2]
  t_iProp = t_ar_struct[3]
  repeat with t_rBlk in m_ar_frames
    if t_rBlk[#num] = t_iBlkNum then
      repeat with t_rSpr in t_rBlk[#sprites]
        if t_rSpr[#num] = t_iSprNum then
          return t_rSpr[t_iProp]
        end if
      end repeat
    end if
  end repeat
  return VOID
end
on reset me
  t_ar_rBlocks = me.getObject().GetFactor().GetBlocks()
  repeat with t_rBlk in t_ar_rBlocks
    t_rBlk.GetVisual().SetSprites()
  end repeat
  repeat with t_rBlk in m_ar_frames
    repeat with t_rSpr in t_rBlk[#sprites]
      t_rSpr[#mode] = #playing
      t_rSpr[#index] = 1
    end repeat
  end repeat
  m_sCondition = EMPTY
  m_sSound = EMPTY
  m_iLoop = 0
  if objectp(m_LoopSnd_obj) then
    m_LoopSnd_obj.StopSound()
    removeObject(m_LoopSnd_obj.getID())
    m_LoopSnd_obj = VOID
  end if
end
on update me
  callAncestor(#update, me)
  t_iDir = me.getObject().GetParam("DIR")
  if t_iDir <> m_iDir then
    m_bReady = 0
  end if
  if not m_bReady then
    me.Init()
  end if
  if m_bReady then
    if m_iDelay = 1 then
      t_rItem = me.getObject()
      t_fFloorSize = float(getThread(#room).component._AccessRoom().GetParam("TILESIZE"))
      t_fItemSize = float(t_rItem.GetParam("STRUCT")[#param]["TILESIZE"])
      if voidp(t_fItemSize) then
        t_fItemSize = 32.0
      end if
      t_fScaling = VOID
      if t_fItemSize <> t_fFloorSize then
        t_fScaling = t_fFloorSize / t_fItemSize
      end if
      repeat with t_rBlk in m_ar_frames
        if me.m_ar_sKey.count >= t_rBlk[#num] then
          t_sKey = me.m_ar_sKey[t_rBlk[#num]]
          t_rBlock = t_rItem.GetContext().GetObjByKey(t_sKey)
          t_arSprites = t_rBlock.GetVisual().GetSprites()
          if t_arSprites.count > 0 then
            repeat with t_rSpr in t_rBlk[#sprites]
              if t_arSprites.count >= t_rSpr[#num] then
                t_rSprite = t_arSprites[t_rSpr[#num]]
                t_iCurFrame = t_rSpr[#index]
                t_rMem = t_rSpr[#frames][t_iCurFrame]
                if t_rSprite.member <> t_rMem then
                  t_rSprite.member = t_rMem
                  if t_fScaling <> VOID then
                    t_rSprite.width = t_rMem.width * t_fScaling
                    t_rSprite.height = t_rMem.height * t_fScaling
                  else
                    t_rSprite.width = t_rMem.width
                    t_rSprite.height = t_rMem.height
                  end if
                end if
                t_rSprite.blend = 100
                t_iLooped = 0
                t_sEvent = t_rSpr[#events].getaProp(string(t_iCurFrame))
                if not voidp(t_sEvent) then
                  case t_sEvent.word[1] of
                    "stop":
                      t_rSpr[#mode] = #stopped
                    "goto":
                      if t_iCurFrame = t_rSpr[#frames].count then
                        t_iLooped = 1
                      end if
                      t_iCurFrame = integer(t_sEvent.word[2]) - 1
                    "wait":
                      if t_rSpr[#mode] = #playing then
                        t_rSpr[#mode] = t_sEvent
                      end if
                      t_iTimeLeft = integer(t_rSpr[#mode].word[2]) - 1
                      if t_iTimeLeft > 0 then
                        t_rSpr[#mode] = "wait" && t_iTimeLeft
                      else
                        t_rSpr[#mode] = #playing
                      end if
                    "random":
                      t_rSpr[#mode] = #stopped
                      t_iCurFrame = random(t_rSpr[#frames].count)
                      t_rMem = t_rSpr[#frames][t_iCurFrame]
                      if t_rSprite.member <> t_rMem then
                        t_rSprite.member = t_rMem
                        t_rSprite.width = t_rMem.width
                        t_rSprite.height = t_rMem.height
                      end if
                    "sound":
                      executeMessage("PlayFxSound", t_sEvent.word[2], "cut")
                    otherwise:
                      put "Unknown item-animation event" && t_sEvent

                  end case
                end if
                if t_rSpr[#mode] = #playing then
                  t_iCurFrame = t_iCurFrame + 1
                  if t_iCurFrame > t_rSpr[#frames].count then
                    t_iCurFrame = 1
                    t_iLooped = 1
                  end if
                end if
                if t_iLooped then
                  t_rSpr[#loops] = t_rSpr[#loops] + 1
                end if
                t_rSpr[#index] = t_iCurFrame
                next repeat
              end if
              put "Furnimap and Animation out of sync!" && t_rItem.GetParam("TYPE")
            end repeat
          end if
        end if
      end repeat
    end if
    m_iDelay = m_iDelay + 1
    if m_iDelay > m_iMaxDelay then
      m_iDelay = 1
    end if
    if m_iLoop > 0 then
      if me.loopsReached() then
        me.setState(0, 1)
      end if
    end if
  end if
end
on loopsReached me
  repeat with t_rBlk in m_ar_frames
    repeat with t_rSpr in t_rBlk[#sprites]
      if t_rSpr[#loops] < m_iLoop then
        return 0
      end if
    end repeat
  end repeat
  return 1
end
on checkAniReady this
  t_ar_rBlocks = this.getObject().GetFactor().GetBlocks()
  if t_ar_rBlocks.count = 0 then
    return 0
  end if
  repeat with t_rBlock in t_ar_rBlocks
    if not t_rBlock.GetVisual().IsReady() then
      return 0
    end if
  end repeat
  return getObject("RoomItemAssetManager").IsItemReady(integer(this.getObject().GetParam("TYPE")))
end
on Init me
  m_ar_frames = []
  t_rItem = me.getObject()
  m_iDir = integer(t_rItem.GetParam("DIR"))
  if me.checkAniReady() then
    if not objectp(m_rStructure) then
      t_iType = integer(t_rItem.GetParam("TYPE"))
      m_rStructure = GetItemAniStructure(t_iType)
    end if
    t_ar_props = [#frames: VOID, #sound: VOID, #condition: VOID, #delay: m_iMaxDelay, #loop: 0]
    t_bSuccess = m_rStructure.returnAnimatedBlocks(m_iState, m_iDir, t_ar_props)
    if t_bSuccess then
      me.setFrames(t_ar_props.frames)
      me.setSound(t_ar_props.sound)
      me.setCondition(t_ar_props.condition)
      me.setDelay(t_ar_props.delay)
      me.setLoop(t_ar_props.loop)
    end if
    m_bInteractive = m_rStructure.GetInteractive()
    m_bReady = 1
  end if
end
on setLoop me, a_iLoop
  m_iLoop = value(a_iLoop)
end
on setFrames me, t_ar_frames
  if listp(t_ar_frames) then
    m_ar_frames = t_ar_frames
  end if
end
on setSound me, t_sSound
  if stringp(t_sSound) then
    m_sSound = t_sSound
  end if
  if memberExists(m_sSound) then
    me.PlaySound()
  else
    m_sSound = EMPTY
  end if
end
on setCondition me, t_sCondition
  if stringp(t_sCondition) then
    m_sCondition = t_sCondition
  end if
end
on setDelay me, t_iDelay
  if integerp(t_iDelay) then
    m_iMaxDelay = t_iDelay
  end if
end