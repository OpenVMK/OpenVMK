-- Script
property m_ar_rProcessQueue
property m_iCurrentProcess
property m_iProcessIdSeed

on construct this
  m_iProcessIdSeed = 0
  m_iCurrentProcess = 0
  m_ar_rProcessQueue = []
  return 1
end
on deconstruct this
  m_ar_rProcessQueue = VOID
  return 1
end
on QueueProcessTurn this
  m_iProcessIdSeed = m_iProcessIdSeed + 1
  m_ar_rProcessQueue.add(m_iProcessIdSeed)
  put "QUEUE PROCESS" && m_iProcessIdSeed
  if m_ar_rProcessQueue.count = 1 then
    this.delay(10, #ProcessReadyCallback, m_iCurrentProcess)
  end if
  return m_iProcessIdSeed
end
on ProcessReadyCallback this, a_iProcessNumber
  put "PROCESS READY" && a_iProcessNumber
  if a_iProcessNumber <> m_iCurrentProcess then
    error(this, "Process queue manager is out of sync!!!", #ProcessReadyCallback)
  end if
  if m_ar_rProcessQueue.count then
    m_iCurrentProcess = m_ar_rProcessQueue[1]
    m_ar_rProcessQueue.deleteAt(1)
    put "START PROCESS" && m_iCurrentProcess
    executeMessage("start_process_" & m_iCurrentProcess, m_iCurrentProcess)
  else
    m_iCurrentProcess = 0
  end if
end