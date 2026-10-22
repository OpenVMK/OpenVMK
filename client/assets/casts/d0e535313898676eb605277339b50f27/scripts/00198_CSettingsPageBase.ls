-- Script
property m_rWindow
property m_rCurPageObj
property m_mp_kType_mp_iRef_rItem
property m_iCurrentPage

on construct this
  m_rWindow = VOID
  m_rCurPageObj = VOID
  m_iCurrentPage = #none
  return 1
end
on deconstruct this
  m_rCurPageObj = VOID
  m_rWindow = VOID
  return 1
end
on update this, a_mp_kType_mp_iRef_rItem, a_kAlteredCategory
  m_mp_kType_mp_iRef_rItem = a_mp_kType_mp_iRef_rItem
  if voidp(m_rWindow) then
    t_sID = getUniqueID()
    if createWindow(t_sID) then
      m_rWindow = getWindow(t_sID)
      m_rWindow.registerClient(this.getID())
      m_rWindow.registerProcedure(#_EventProc, this.getID(), #mouseUp)
      m_rWindow.registerProcedure(#_EventProc, this.getID(), #mouseDown)
      m_rWindow.registerProcedure(#_EventProc, this.getID(), #keyDown)
      m_rWindow.registerProcedure(#_EventProc, this.getID(), #keyUp)
      if m_rWindow.merge("vmk_set.window") then
        m_rWindow.center()
        m_kCurPage = #empty
        this._ChangePage(#set)
      end if
    end if
    if objectp(m_rCurPageObj) then
      m_rCurPageObj.update(m_mp_kType_mp_iRef_rItem, a_kAlteredCategory)
    end if
  end if
end
on CloseSettings this
  if objectp(m_rCurPageObj) then
    m_rCurPageObj.Purge(m_rWindow)
    removeObject(m_rCurPageObj.getID())
  end if
  if objectp(m_rWindow) then
    removeWindow(m_rWindow.getID())
    m_rWindow = VOID
    getThread(#AvatarFactory).handler.BuilderClosed()
  end if
  if windowExists("MessageBar") then
    if getWindow("MessageBar").elementExists("chat.field") then
      getWindow("MessageBar").getElement("chat.field").setFocus(1)
    end if
  end if
end
on GetWindowObj this
  return m_rWindow
end
on _ChangePage this, a_kPage
  m_iCurrentPage = a_kPage
  if objectp(m_rWindow) then
    if objectp(m_rCurPageObj) then
      m_rCurPageObj.Purge(m_rWindow)
      removeObject(m_rCurPageObj.getID())
    end if
    t_ar_kCategories = [a_kPage]
    case a_kPage of
      #set:
        t_sCls = "CSettingsPage"
        t_sTab = "sound"

    end case
    return error(this, "Unknown Catalog page!", #_ChangePage)
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
    "close":
      executeMessage("PlayInterfaceSound", "close-popup")
      getThread(#AvatarFactory).interface.CloseSettings()
    "hm.mickeydetail.button":
      executeMessage("ShowHMDetailWindow")
    "help":
      if a_kEvent = #mouseDown then
        case m_iCurrentPage of
          #set:
            executeMessage(#open_help_page, "help.music.prefs")
          otherwise:
            executeMessage(#open_help_page, "help.character.look")

        end case
      end if

  end case
  return call(#_EventProc, [m_rCurPageObj], a_kEvent, a_sElem, a_vParam)
end