-- Script
property m_sWindowID
property m_mp_FastPassData
property m_iFlashingTime
property m_iFlashCountdown

on construct this
  m_sWindowID = "NavFastPassWindow"
  m_mp_FastPassData = VOID
  m_iFlashingTime = getVariable("fast.pass.flash.time")
  m_iFlashCountdown = 0
  registerMessage(#ui_Fastpass, this.getID(), #BringOnTop)
  registerMessage(#MinigameState, this.getID(), #MinigameStateChange)
  return 1
end
on deconstruct this
  if timeoutExists("FlashFastPass") then
    removeTimeout("FlashFastPass")
  end if
  unregisterMessage(#MinigameState)
  removeWindow(m_sWindowID)
  return 1
end
on CreateFastPassWindow this
  if windowExists(m_sWindowID) then
    removeWindow(m_sWindowID)
  end if
  if not windowExists(m_sWindowID) then
    createWindow(m_sWindowID, "vmk_fastpass.window", 0, 0)
    t_rWndObj = getWindow(m_sWindowID)
    tElem = t_rWndObj.getElement("basic.window.title")
    if tElem <> 0 then
      tElem.setText(getText("faspass.window.hd"))
    end if
    t_rWndObj.registerClient(this.getID())
    t_rWndObj.registerProcedure(#eventProcFastPass, this.getID(), #mouseDown)
    t_rWndObj.getElement("fastpass.enter").setProperty(#blend, 50)
  end if
end
on _Close this
  if timeoutExists("FlashFastPass") then
    removeTimeout("FlashFastPass")
  end if
  m_iFlashCountdown = 0
  if windowExists(m_sWindowID) then
    removeWindow(m_sWindowID)
    m_mp_FastPassData = VOID
  end if
end
on BringOnTop me
  if windowExists(m_sWindowID) then
    t_rWndObj = getWindow(m_sWindowID)
    t_rWndObj.BringUpFront()
  end if
end
on SetFastPassData me, a_mp_FastPassData
  if listp(a_mp_FastPassData) then
    m_mp_FastPassData = a_mp_FastPassData
    t_rWndObj = getWindow(m_sWindowID)
    t_iPos = a_mp_FastPassData.queuePos
    t_sName = a_mp_FastPassData.spaceName
    t_rWndObj.getElement("fastpass.queue").setText(t_iPos + 1)
    t_rWndObj.getElement("roomqueue.destination").setText(t_sName)
  end if
end
on UpdateQueuePosition me, a_iPos
  t_rWndObj = getWindow(m_sWindowID)
  t_rWndObj.getElement("fastpass.queue").setText(a_iPos + 1)
  if listp(m_mp_FastPassData) then
    m_mp_FastPassData[#queuePos] = a_iPos
  end if
  if a_iPos = -1 then
    me.startFlashingTheButton()
  end if
end
on enterRoom me
  if listp(m_mp_FastPassData) then
    t_iSpaceID = m_mp_FastPassData.spaceid
    t_iInstanceId = m_mp_FastPassData.instanceID
    getConnection(getVariable("main.connection.id", "VMK")).send(31, [#integer: t_iSpaceID, #integer: t_iInstanceId])
  end if
end
on startFlashingTheButton me
  t_rWndObj = getWindow(m_sWindowID)
  if not timeoutExists("FlashFastPass") then
    m_iFlashCountdown = 0
    createTimeout("FlashFastPass", 500, #startFlashingTheButton, me.getID(), VOID, 40)
  else
    m_iFlashCountdown = m_iFlashCountdown + 0.5
    t_rWndObj.getElement("fastpass.enter").setProperty(#blend, 100)
    t_bVisible = t_rWndObj.getElement("fastpass.enter").getProperty(#visible)
    t_rWndObj.getElement("fastpass.enter").setProperty(#visible, not t_bVisible)
    me.setButtonTxt("fastpass.enter", getText("fastpass.enter.in") && integer(m_iFlashingTime - m_iFlashCountdown))
  end if
end
on setButtonTxt me, t_btnname, t_txt
  if not voidp(t_btnname) and not voidp(t_txt) then
    tWndObj = getWindow(m_sWindowID)
    if tWndObj <> 0 then
      tBtn = tWndObj.getElement(t_btnname)
      if tBtn <> 0 then
        tBtn.pButtonText = t_txt
        tBtn.pCachedImgs = [:]
        tBtn.changeState(#up)
      end if
    end if
  end if
end
on MinigameStateChange me, a_sState, a_sGameName
  t_rWndObj = getWindow(m_sWindowID)
  case a_sState of
    #running:
      if objectp(t_rWndObj) then
        t_rWndObj.hide()
      end if
    otherwise:
      if objectp(t_rWndObj) then
        t_rWndObj.show()
      end if

  end case
end
on eventProcFastPass this, tEvent, tElemID, tParam
  case tElemID of
    "fastpass.enter":
      this.enterRoom()
      t_rWndObj = getWindow(m_sWindowID)
      t_rWndObj.getElement("fastpass.enter").deactivate()
      t_QueueObject = getObject("Navigation.Room.Queue")
      if objectp(t_QueueObject) then
        t_QueueObject.hideLoadBar()
      end if
      getThread("navigator").interface.HideNavigator()
    "fastpass.leave":
      getConnection(getVariable("main.connection.id", "VMK")).send("DiscardFastPass")
    "help":
      executeMessage(#open_help_page, getText("help.fastpass", "help.fastpass"), 1)
    "close":
      removeWindow(m_sWindowID)
      executeMessage("PlayInterfaceSound", "close-popup")

  end case
end