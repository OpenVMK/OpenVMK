-- Movie Script
property m_bReady
property m_bVisible
property m_rWindow
property m_rCurPageObj
property m_mp_kType_mp_iRef_rItem
property m_iCurrentPage
property m_iPageCount
property m_iLandingRoom

on construct this
  m_bReady = 0
  m_bVisible = 0
  m_rWindow = VOID
  m_rCurPageObj = VOID
  m_iCurrentPage = 0
  m_iPageCount = 3
  m_iLandingRoom = VOID
  executeMessage(#MinigameState, #running)
  return 1
end
on deconstruct this
  if m_bReady then
    unregisterMessage(#ui_registration)
    if objectp(m_rCurPageObj) then
      m_rCurPageObj.Purge(m_rWindow)
      removeObject(m_rCurPageObj.getID())
      m_rCurPageObj = VOID
    end if
    if objectp(m_rWindow) then
      removeWindow(m_rWindow.getID())
      m_rWindow = VOID
    end if
  end if
  m_iCurrentPage = 0
  m_bReady = 0
  m_bVisible = 0
  return 1
end
on open this
  if m_bReady then
    m_bVisible = m_rWindow.show()
    return m_bVisible
  else
    return error(this, "Inventory not ready yet!", #open)
  end if
end
on close this
  if m_bReady then
    m_bVisible = not m_rWindow.hide()
    return m_bVisible
  else
    return error(this, "Inventory not ready yet!", #close)
  end if
end
on update this, a_mp_kType_mp_iRef_rItem, a_kAlteredCategory
  m_mp_kType_mp_iRef_rItem = a_mp_kType_mp_iRef_rItem
  if not m_bReady then
    t_sID = getUniqueID()
    if createWindow(t_sID) then
      m_rWindow = getWindow(t_sID)
      m_rWindow.registerClient(this.getID())
      m_rWindow.registerProcedure(#_EventProc, this.getID(), #mouseUp)
      m_rWindow.registerProcedure(#_EventProc, this.getID(), #keyDown)
      m_rWindow.registerProcedure(#_EventProc, this.getID(), #keyUp)
      if m_rWindow.merge("vmk_reg.window") then
        m_rWindow.center()
        m_bReady = 1
        this._ChangePage(1)
        this.close()
      else
        return error(this, "Failed to open registration page!", #update)
      end if
    end if
    registerMessage(#ui_registration, this.getID(), #_ShowHideUI)
    this._ShowHideUI()
  end if
  if a_kAlteredCategory = "AvatarCreated" then
    m_rCurPageObj.update(m_mp_kType_mp_iRef_rItem, a_kAlteredCategory)
    this._ChangePage(2)
  else
    m_rCurPageObj.update(m_mp_kType_mp_iRef_rItem, a_kAlteredCategory)
  end if
  if a_kAlteredCategory = "LandingRoom" then
    m_iLandingRoom = m_mp_kType_mp_iRef_rItem["LandingRoom"]
  end if
  if a_kAlteredCategory = "NoEULA" then
    this._ChangePage(3)
  end if
  if a_kAlteredCategory = "LandingRoomRealID" then
    t_iLandingRoomID = m_mp_kType_mp_iRef_rItem["LandingRoomRealID"]
    getConnection(getVariable("main.connection.id", "VMK")).send(31, [#integer: t_iLandingRoomID, #integer: -1])
  end if
end
on GetSelected this
  if objectp(m_rCurPageObj) then
    return m_rCurPageObj.GetSelected()
  else
    return -1
  end if
end
on _ShowHideUI this
  if m_bVisible then
    this.close()
  else
    this.open()
  end if
end
on _ChangePage this, a_kPage
  if objectp(m_rWindow) then
    if objectp(m_rCurPageObj) then
      if m_rCurPageObj.DataGathered() then
        m_rCurPageObj.Purge(m_rWindow)
        removeObject(m_rCurPageObj.getID())
      else
        return 0
      end if
    end if
    m_iCurrentPage = a_kPage
    t_ar_kCategories = [a_kPage]
    case m_iCurrentPage of
      1:
        t_sCls = "CRegPage1"
      2:
        t_sCls = "CRegPage2"
      3:
        t_sCls = "CRegPage3"

    end case
    return error(this, "Unknown registration page!", #_ChangePage)
    m_rWindow.getElement("reg.step1.active").hide()
    m_rWindow.getElement("reg.step2.active").hide()
    m_rWindow.getElement("reg.step3.active").hide()
    m_rWindow.getElement("reg.step" & m_iCurrentPage & ".active").show()
    m_rCurPageObj = createObject(getUniqueID(), t_sCls)
    if objectp(m_rCurPageObj) then
      m_rCurPageObj.merge(m_rWindow)
      repeat with t_kCategory in t_ar_kCategories
        m_rCurPageObj.update(m_mp_kType_mp_iRef_rItem, t_kCategory)
      end repeat
    else
      return error(this, "Failed to initialize inventory page!", #_ChangePage)
    end if
  end if
end
on _EventProc this, a_kEvent, a_sElem, a_vParam
  case a_sElem of
    "reg.imready.button":
      t_MpData = m_rCurPageObj.GetData()
      if listp(t_MpData) then
        this._ChangePage(5)
        m_rCurPageObj.setData(t_MpData)
      end if
    "reg.regstep2.button":
      m_rCurPageObj.ShowConfirmName()
    "reg.regstep3.button":
      this._ChangePage(3)
    "reg.regstep4.button":
      if m_rCurPageObj.DataGathered() then
        this._ChangePage(4)
      end if
    "reg.regstep5.agree":
      m_rCurPageObj.SendData()
      this.close()
      executeMessage("show_mod_window")
      getConnection("VMK").send("NavigatorHandshake")
      if integerp(m_iLandingRoom) then
        if m_iLandingRoom > -1 then
          getConnection(getVariable("main.connection.id", "VMK")).send("InstanceInfoByTag", [#integer: m_iLandingRoom])
        end if
      end if
    "reg.regstep5.cancel":
      m_rCurPageObj.ShowConfirm()
    "close":
      this.close()
    "help":
      error(this, "Help not yet implemented!", #_EventProc)

  end case
  return call(#_EventProc, [m_rCurPageObj], a_kEvent, a_sElem, a_vParam)
end