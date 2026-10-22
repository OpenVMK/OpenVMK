-- Script
property m_sWndID
property m_iTimerA
property m_iTimerB
property m_iFrames
property m_iCurrMs

on construct this
  m_sWndID = "PerfTest"
  m_iTimerA = the milliSeconds
  m_iTimerB = the milliSeconds
  m_iFrames = 0
  m_iCurrMs = 0
  if not createWindow(m_sWndID) then
    return 0
  end if
  t_rWnd = getWindow(m_sWndID)
  t_rWnd.merge("performance.window")
  t_rWnd.center()
  t_rWnd.registerClient(this.getID())
  t_rWnd.registerProcedure(#EventProc, this.getID(), #mouseUp)
  t_rWnd.getElement("perf_per_frm").setEdit(0)
  t_rWnd.getElement("perf_total").setEdit(0)
  t_rWnd.getElement("close").setEdit(0)
  t_rWnd.getElement("close").setText("x")
  return receiveUpdate(this.getID())
end
on deconstruct this
  removeUpdate(this.getID())
  removeWindow(m_sWndID)
  return 1
end
on update this
  m_iFrames = (m_iFrames + 1) mod the frameTempo
  t_iTime = the milliSeconds - m_iTimerA
  t_rWnd = getWindow(m_sWndID)
  t_rWnd.getElement("perf_per_frm").setText(t_iTime && "ms.")
  if m_iFrames = 0 then
    t_iCurrMs = the milliSeconds - m_iTimerB
    if t_iCurrMs <> m_iCurrMs then
      m_iCurrMs = t_iCurrMs
      t_rWnd.getElement("perf_total").setText(m_iCurrMs && "ms.")
    end if
    m_iTimerB = the milliSeconds
  end if
  m_iTimerA = the milliSeconds
end
on EventProc this, a_kEvent, a_sElemID, a_vParam
  if a_sElemID = "close" then
    return removeObject(this.getID())
  else
    return 0
  end if
end