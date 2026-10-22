-- Script
property m_rWindow
property m_objClient
property m_sButtonText
property m_sSoundName
property m_LoopSnd_obj

on construct this
  t_rWindow = VOID
  m_objClient = VOID
  m_sButtonText = EMPTY
  m_sSoundName = EMPTY
  m_LoopSnd_obj = VOID
  return 1
end
on deconstruct this
  this.DeleteWindow()
  return 1
end
on DefineWindow this, a_mp_Parameters
  if memberExists("vmk_preloader.window") then
    t_sID = getUniqueID()
    if a_mp_Parameters.findPos(#modal) > 0 then
      if a_mp_Parameters.modal then
        createWindow(t_sID, "vmk_preloader.window", 0, 0, #modal)
      else
        createWindow(t_sID, "vmk_preloader.window")
      end if
    else
      createWindow(t_sID, "vmk_preloader.window")
    end if
    if windowExists(t_sID) then
      m_rWindow = getWindow(t_sID)
      m_rWindow.registerClient(this.getID())
      m_rWindow.registerProcedure(#eventProcLoadingWindow, this.getID(), #mouseUp)
      m_rWindow.center()
      if a_mp_Parameters.findPos(#client) > 0 then
        m_objClient = getObject(a_mp_Parameters.client)
      end if
      if a_mp_Parameters.findPos(#ButtonText) > 0 then
        m_sButtonText = a_mp_Parameters.ButtonText
        m_rWindow.getElement("roomqueue.preloader.ok").pButtonText = m_sButtonText
        m_rWindow.getElement("roomqueue.preloader.ok").pCachedImgs = [:]
        m_rWindow.getElement("roomqueue.preloader.ok").createButtonImg(m_sButtonText, #up)
        m_rWindow.getElement("roomqueue.preloader.ok").changeState(#up)
      end if
      if a_mp_Parameters.findPos(#headline) > 0 then
        m_rWindow.getElement("roomqueue.preloader.hd").setText(a_mp_Parameters.headline)
      else
        m_rWindow.getElement("roomqueue.preloader.hd").setText(EMPTY)
      end if
      if a_mp_Parameters.findPos(#infotext) > 0 then
        m_rWindow.getElement("roomqueue.preloadfailed").setText(a_mp_Parameters.infotext)
      else
        m_rWindow.getElement("roomqueue.preloadfailed").setText(EMPTY)
      end if
      if a_mp_Parameters.findPos(#showbutton) > 0 then
        t_bVisibe = a_mp_Parameters.showbutton
      else
        t_bVisibe = 0
      end if
      if a_mp_Parameters.findPos(#soundloop) > 0 then
        m_sSoundName = a_mp_Parameters.soundloop
        this.EnableLoadingSound(m_sSoundName)
      end if
      m_rWindow.getElement("roomqueue.preloader.ok").setProperty(#visible, t_bVisibe)
      t_rElem = m_rWindow.getElement("animation")
      if objectp(t_rElem) then
        t_rElem.show()
        t_rSprite = t_rElem.getProperty(#sprite)
        if t_rSprite.spriteNum > 0 then
          t_vPos = vector(t_rSprite.locH, t_rSprite.locV, t_rSprite.locZ)
          t_rAnimationManager = getObject("AnimationManager")
          if objectp(t_rAnimationManager) then
            t_rAnimationManager.RemoveAnimation("animation")
            t_rAnimationManager.NewAnimation(t_vPos, "animation", "preloader.ani", #sprite)
          end if
        end if
      end if
    end if
  end if
end
on stopAnimation this
  t_rAnimationManager = getObject("AnimationManager")
  if objectp(t_rAnimationManager) then
    t_rAnimationManager.RemoveAnimation("animation")
  end if
end
on EnableLoadingSound this, a_sSoundName
  if getObject(#session).get("fx") then
    executeMessage("StopRoomSound")
    if voidp(m_LoopSnd_obj) then
      m_LoopSnd_obj = createObject(getUniqueID(), "CSoundObject")
      m_LoopSnd_obj.Define(a_sSoundName)
      m_LoopSnd_obj.SetSoundType("music")
      m_LoopSnd_obj.setLoopCount(1000)
      m_LoopSnd_obj.PlaySound()
    else
      m_LoopSnd_obj.StopSound()
      m_LoopSnd_obj.Define(a_sSoundName)
      m_LoopSnd_obj.SetSoundType("music")
      m_LoopSnd_obj.setLoopCount(1000)
      m_LoopSnd_obj.PlaySound()
    end if
  end if
end
on StopLoadingSound this, a_sSoundName
  if objectp(m_LoopSnd_obj) then
    m_LoopSnd_obj.StopSound()
    executeMessage("LoadRoomSound")
  end if
end
on UpdateWindowdata this, a_mp_Parameters
  if objectp(m_rWindow) then
    if a_mp_Parameters.findPos(#headline) > 0 then
      m_rWindow.getElement("roomqueue.preloader.hd").setText(a_mp_Parameters.headline)
    end if
    if a_mp_Parameters.findPos(#infotext) > 0 then
      m_rWindow.getElement("roomqueue.preloadfailed").setText(a_mp_Parameters.infotext)
    end if
    if a_mp_Parameters.findPos(#showbutton) > 0 then
      t_bVisibe = a_mp_Parameters.showbutton
    else
      t_bVisibe = 0
    end if
    if a_mp_Parameters.findPos(#soundloop) > 0 then
      m_sSoundName = a_mp_Parameters.soundloop
      this.EnableLoadingSound(m_sSoundName)
    end if
    m_rWindow.getElement("roomqueue.preloader.ok").setProperty(#visible, t_bVisibe)
    if a_mp_Parameters.findPos(#ButtonText) > 0 then
      m_sButtonText = a_mp_Parameters.ButtonText
      m_rWindow.getElement("roomqueue.preloader.ok").pButtonText = m_sButtonText
      m_rWindow.getElement("roomqueue.preloader.ok").pCachedImgs = [:]
      m_rWindow.getElement("roomqueue.preloader.ok").createButtonImg(m_sButtonText, #up)
      m_rWindow.getElement("roomqueue.preloader.ok").changeState(#up)
    end if
  end if
end
on DeleteWindow this
  if objectp(m_rWindow) then
    removeWindow(m_rWindow.getID())
    t_rAnimationManager = getObject("AnimationManager")
    if objectp(t_rAnimationManager) then
      t_rAnimationManager.RemoveAnimation("animation")
    end if
    if objectp(m_LoopSnd_obj) then
      m_LoopSnd_obj.StopSound()
      removeObject(m_LoopSnd_obj.getID())
      executeMessage("LoadRoomSound")
    end if
    t_rWindow = VOID
    m_objClient = VOID
    m_LoopSnd_obj = VOID
  end if
end
on eventProcLoadingWindow this, tEvent, tElemID, tParm
  if tElemID = "roomqueue.preloader.ok" and tEvent = #mouseUp then
    if objectp(m_objClient) then
      call(#LoadingWindowEvent, [m_objClient], m_sButtonText)
    else
      this.DeleteWindow()
    end if
  end if
end