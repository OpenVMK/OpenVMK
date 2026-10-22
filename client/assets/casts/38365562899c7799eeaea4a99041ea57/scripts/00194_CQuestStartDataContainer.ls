-- Parent Script
property m_ar_dataContainer
property m_rInterface

on construct me
  m_rInterface = createObject(getUniqueID(), "CQuestWindowManager")
  m_rInterface.SetOwner(me)
  m_ar_dataContainer = [:]
  return 1
end
on deconstruct me
  if objectp(m_rInterface) then
    removeObject(m_rInterface.getID())
  end if
  return 1
end
on getInterface me
  return m_rInterface
end
on getData me
  return m_ar_dataContainer
end
on QuestDialogBroadcastEvent me, t_iManagerID, t_ar_results
  put "QuestInfo.Start.Container->BroadCastEvent results:" && t_ar_results
end
on CurrenTaskData me, t_ar_data
  if listp(t_ar_data) then
    m_ar_dataContainer = t_ar_data
    m_rInterface.populate(["info"])
    m_rInterface.Activate()
    t_rCurrentPage = m_rInterface.getInterface().GetBase().getPage()
    t_rCurrentPage.CurrenTaskData(t_ar_data)
  end if
end