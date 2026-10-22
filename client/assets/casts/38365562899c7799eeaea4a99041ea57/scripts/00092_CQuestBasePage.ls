-- Script
property m_bReady
property m_bVisible
property m_rWindow
property m_rCurPageObj
property m_mp_kType_mp_iRef_rItem
property m_sCurPageName
property m_rManager
property m_sType

on construct me
  m_sType = "normal"
  m_bReady = 0
  m_bVisible = 0
  m_rWindow = VOID
  m_rCurPageObj = VOID
  m_sCurPageName = #none
  return 1
end
on deconstruct me
  if m_bReady then
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
  m_bReady = 0
  m_bVisible = 0
  return 1
end
on setManager me, t_rManager
  m_rManager = t_rManager
end
on getManager me
  return m_rManager
end
on getPage me
  return m_rCurPageObj
end
on SetType me, a_sType
  m_sType = a_sType
end
on open me
  if m_bReady then
    m_rWindow.show()
    m_bVisible = 1
    return m_bVisible
  else
    m_bVisible = 0
    return error(me, "Quest Engine Subtask not ready yet!", #open)
  end if
end
on close me
  if m_bReady then
    m_rWindow.hide()
    m_bVisible = 0
    return m_bVisible
  else
    m_bVisible = 0
    return error(me, "Quest Engine Subtask not ready yet!", #close)
  end if
end
on update me, a_mp_kType_mp_iRef_rItem, a_kAlteredCategory
  m_mp_kType_mp_iRef_rItem = a_mp_kType_mp_iRef_rItem
  if not m_bReady then
    t_sID = getUniqueID()
    case m_sType of
      "dialog", "maker":
        t_bSuccess = createWindow(t_sID, VOID, 0, 0, #modal)
      "floating":
        t_bSuccess = createWindow(t_sID, VOID)
      "steps":
        t_bSuccess = createWindow(t_sID, VOID)
      otherwise:
        t_bSuccess = createWindow(t_sID, VOID)

    end case
    if t_bSuccess then
      m_rWindow = getWindow(t_sID)
      m_rWindow.registerClient(me.getID())
      m_rWindow.registerProcedure(#_EventProc, me.getID(), #mouseUp)
      m_rWindow.registerProcedure(#_EventProc, me.getID(), #mouseDown)
      m_rWindow.registerProcedure(#_EventProc, me.getID(), #keyDown)
      m_rWindow.registerProcedure(#_EventProc, me.getID(), #keyUp)
      case m_sType of
        "dialog":
          t_bSuccess = m_rWindow.merge("vmk_quest_dialog.window")
        "maker":
          t_bSuccess = m_rWindow.merge("vmk_quest_maker.window")
        "floating":
          t_bSuccess = m_rWindow.merge("vmk_quest_dialog.window")
        "steps":
          t_bSuccess = m_rWindow.merge("vmk_quest_steps.window")
        otherwise:
          t_bSuccess = m_rWindow.merge("vmk_quest_main.window")

      end case
      if t_bSuccess then
        m_rWindow.center()
        m_bReady = 1
        me._ChangePage(a_kAlteredCategory)
        me.close()
      else
        return error(me, "Failed to open Quest Engine Subtask!", #update)
      end if
    end if
  end if
  if objectp(m_rCurPageObj) then
    m_rCurPageObj.update(m_mp_kType_mp_iRef_rItem, a_kAlteredCategory)
  end if
end
on GetSelected me
  if objectp(m_rCurPageObj) then
    return m_rCurPageObj.GetSelected()
  else
    return [#ref: -1, #code: -1, #state: #invalid]
  end if
end
on _ShowHideUI me
  if m_bVisible then
    me.close()
  else
    me.open()
  end if
end
on _ChangePage me, a_kPage
  if not m_bReady then
    me.update([], a_kPage)
    exit
  end if
  m_sCurPageName = a_kPage
  if objectp(m_rWindow) then
    if objectp(m_rCurPageObj) then
      m_rCurPageObj.Purge(m_rWindow)
      removeObject(m_rCurPageObj.getID())
    end if
    t_ar_kCategories = [a_kPage]
    t_sCls = GetClsVariable("quest.class.window." & m_sCurPageName)
    if t_sCls = 0 then
      return error(me, "Unknown Quest Engine page! Subtask: " && m_sCurPageName, #_ChangePage)
    end if
    m_rCurPageObj = createObject(getUniqueID(), t_sCls)
    if objectp(m_rCurPageObj) then
      m_rCurPageObj.setManager(m_rManager)
      m_rCurPageObj.merge(m_rWindow)
      repeat with t_kCategory in t_ar_kCategories
        m_rCurPageObj.update(m_mp_kType_mp_iRef_rItem, t_kCategory)
      end repeat
    else
      return error(me, "Failed to initialize Quest Engine page!", #_ChangePage)
    end if
  end if
end
on _EventProc me, a_kEvent, a_sElem, a_vParam
  return call(#_EventProc, [m_rCurPageObj], a_kEvent, a_sElem, a_vParam)
end