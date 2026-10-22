-- Script
property m_rWindow
property m_bMusic
property m_bFx
property m_bUi
property m_iVolume
property m_bTutorial
property m_bTradeReq
property m_bChanges
property m_iPrviousVolume

on construct this
  m_rWindow = VOID
  m_bDataGathered = 0
  m_ar_AvatarData = VOID
  m_bChanges = 0
  m_bMusic = getObject(#session).get("music")
  m_bFx = getObject(#session).get("fx")
  m_bUi = getObject(#session).get("ui")
  m_iVolume = getObject(#session).get("volume")
  m_bTutorial = getObject(#session).get("tutorial")
  m_bTradeReq = getObject(#session).get("traderequests")
  m_iPrviousVolume = m_iVolume
  return 1
end
on deconstruct this
  if objectp(m_rWindow) then
    this.Purge(m_rWindow)
  end if
  return 1
end
on merge this, a_rWindow
  m_rWindow = a_rWindow
  m_rWindow.merge("vmk_set_sound.window")
  t_Img = member(getmemnum("button.checkbox." & m_bMusic)).image
  m_rWindow.getElement("set.disablemusic").feedImage(t_Img)
  t_Img = member(getmemnum("button.checkbox." & m_bFx)).image
  m_rWindow.getElement("set.disableeffects").feedImage(t_Img)
  t_Img = member(getmemnum("button.checkbox." & m_bUi)).image
  m_rWindow.getElement("set.disableui").feedImage(t_Img)
  t_Img = member(getmemnum("button.checkbox." & m_bTradeReq)).image
  m_rWindow.getElement("set.traderequests").feedImage(t_Img)
  t_Img = member(getmemnum("button.checkbox." & m_bTutorial)).image
  m_rWindow.getElement("set.tutorials").feedImage(t_Img)
  executeMessage(#set_tutorials_state, m_bTutorial)
  t_img2 = image(1, 225, 32)
  m_rWindow.getElement("set.volume").feedImage(t_img2)
  this.SetVolume()
  return 1
end
on GetVolume this
  m_iPrviousVolume = m_iVolume
  t_iPersent1 = m_rWindow.getElement("nav.scrollbar").ScrollBarPercentV()
  t_iPersent2 = 1 - t_iPersent1
  t_iVol = integer(t_iPersent2 * 255)
  m_iVolume = t_iVol
  m_bChanges = 1
end
on SetVolume this
  if m_iVolume = 0 then
    m_rWindow.getElement("nav.scrollbar").setScrollOffset(205)
  else
    t_iPersent1 = m_iVolume / 255.0
    t_iPersent2 = 1.0 - t_iPersent1
    m_rWindow.getElement("nav.scrollbar").setScrollOffset(integer(t_iPersent2 * 205))
  end if
end
on Purge this, a_rWindow
  if objectp(m_rWindow) then
    m_rWindow = VOID
    return a_rWindow.unmerge()
  else
    return 1
  end if
end
on update this, a_mp_kType_mp_iRef_rItem, a_kAlteredCategory
end
on _SendChanges this
  if m_bChanges then
    getObject(#session).set("music", m_bMusic)
    getObject(#session).set("fx", m_bFx)
    getObject(#session).set("ui", m_bUi)
    getObject(#session).set("volume", m_iVolume)
    getObject(#session).set("tutorial", m_bTutorial)
    getObject(#session).set("traderequests", m_bTradeReq)
    getThread("sound").getHandler().SetSoundSettings()
    if m_iPrviousVolume = 0 then
      executeMessage("LoadRoomSound")
    end if
  end if
  executeMessage("close_Settings")
end
on _ChangeSettings this, a_sSetting
  case a_sSetting of
    "music":
      m_bMusic = not m_bMusic
      t_Img = member(getmemnum("button.checkbox." & m_bMusic)).image
      m_rWindow.getElement("set.disablemusic").feedImage(t_Img)
      m_bChanges = 1
    "fx":
      m_bFx = not m_bFx
      t_Img = member(getmemnum("button.checkbox." & m_bFx)).image
      m_rWindow.getElement("set.disableeffects").feedImage(t_Img)
      m_bChanges = 1
    "ui":
      m_bUi = not m_bUi
      t_Img = member(getmemnum("button.checkbox." & m_bUi)).image
      m_rWindow.getElement("set.disableui").feedImage(t_Img)
      m_bChanges = 1
    "traderequests":
      m_bTradeReq = not m_bTradeReq
      t_Img = member(getmemnum("button.checkbox." & m_bTradeReq)).image
      m_rWindow.getElement("set.traderequests").feedImage(t_Img)
      m_bChanges = 1
    "tutorials":
      m_bTutorial = not m_bTutorial
      t_Img = member(getmemnum("button.checkbox." & m_bTutorial)).image
      m_rWindow.getElement("set.tutorials").feedImage(t_Img)
      m_bChanges = 1

  end case
end
on _EventProc this, a_kEvent, a_sElem, a_vParam
  if a_kEvent = #mouseDown then
    case a_sElem of
      "set.applysound.button":
        this.GetVolume()
        this._SendChanges()
      "set.sounds.cancel":
        executeMessage("close_Settings")
      "set.disablemusic":
        this._ChangeSettings("music")
      "set.disableeffects":
        this._ChangeSettings("fx")
      "set.disableui":
        this._ChangeSettings("ui")
      "set.traderequests":
        this._ChangeSettings("traderequests")
      "set.tutorials":
        this._ChangeSettings("tutorials")

    end case
  end if
end