-- Script
property m_bReady
property m_LoopSnd_obj
property m_iType
property m_sSoundName

on construct this
  m_bReady = 0
  m_LoopSnd_obj = VOID
  m_iType = VOID
  m_sSoundName = EMPTY
  registerObject(getUniqueID(), this)
  registerMessage("close_Settings", this.getID(), #checkSoundSettings)
  registerMessage("countSoundItems", this.getID(), #countSoundItems)
  return 1
end
on deconstruct this
  this.StopSound()
  t_ar_check = []
  executeMessage("countSoundItems", t_ar_check)
  if t_ar_check.count = 1 then
    executeMessage("ControlRoomMusic", 1)
  end if
  unregisterObject(this.getID())
  callAncestor(#deconstruct, this)
  return 1
end
on StopSound this
  if objectp(m_LoopSnd_obj) then
    m_LoopSnd_obj.StopSound()
    removeObject(m_LoopSnd_obj.getID())
    m_LoopSnd_obj = VOID
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
  if not t_bMusic then
    this.StopSound()
  else
    this.PlaySound()
  end if
end
on PlaySound this
  m_sSoundName = "item." & m_iType & ".sound"
  if memberExists(m_sSoundName) then
    executeMessage("ControlRoomMusic", 0)
    if not objectp(m_LoopSnd_obj) then
      m_LoopSnd_obj = createObject(getUniqueID(), "CSoundObject")
    end if
    m_LoopSnd_obj.Define(m_sSoundName)
    m_LoopSnd_obj.SetSoundType("fx")
    t_bMusic = getObject(#session).get("music")
    if t_bMusic then
      m_LoopSnd_obj.PlaySound()
    end if
  else
    m_sSoundName = EMPTY
    put "sound member missing:" && m_sSoundName
  end if
end
on update this
  if voidp(m_iType) or m_sSoundName = EMPTY then
    m_iType = value(this.getObject().GetParam("TYPE"))
    this.PlaySound()
  end if
end
on countSoundItems this, a_ar_counter
  a_ar_counter.add(this)
end