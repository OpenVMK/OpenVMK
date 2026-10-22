-- Script
property m_bInitialized
property m_rPageBase
property m_rManager
property m_sType

on construct me
  m_sType = "normal"
  m_bInitialized = 0
  m_rPageBase = VOID
  return 1
end
on deconstruct me
  m_bInitialized = 0
  if objectp(m_rPageBase) then
    removeObject(m_rPageBase.getID())
    m_rPageBase = VOID
  end if
  return 1
end
on setManager me, t_rManager
  m_rManager = t_rManager
end
on getManager me
  return m_rManager
end
on GetSelected me
  if objectp(m_rPageBase) then
    return m_rPageBase.GetSelected()
  else
    return [#ref: -1, #code: -1]
  end if
end
on open me
  if not m_bInitialized then
    me._InitPageBase()
  end if
  if m_bInitialized then
    m_rPageBase.open()
  end if
end
on close me
  if m_bInitialized then
    m_rPageBase.close()
  end if
end
on GetBase me
  return m_rPageBase
end
on SetType me, t_sType
  m_sType = t_sType
end
on GetType me
  return m_sType
end
on _InitPageBase me
  m_rPageBase = createObject(getUniqueID(), "CQuestBasePage")
  m_bInitialized = objectp(m_rPageBase)
  if not m_bInitialized then
    return error(me, "Failed to init Quest Engine Interface!", #_InitPageBase)
  else
    m_rPageBase.SetType(m_sType)
    m_rPageBase.setManager(m_rManager)
  end if
end
on _ChangePage me, a_iPage
  if not m_bInitialized then
    me._InitPageBase()
  end if
  if m_bInitialized then
    m_rPageBase._ChangePage(a_iPage)
  end if
end
on _RefreshItemList me, a_mp_kType_mp_iRef_rItem, a_kAlteredCategory
  if not m_bInitialized then
    me._InitPageBase()
  end if
  if m_bInitialized then
    m_rPageBase.update(a_mp_kType_mp_iRef_rItem, a_kAlteredCategory)
  end if
  return 1
end