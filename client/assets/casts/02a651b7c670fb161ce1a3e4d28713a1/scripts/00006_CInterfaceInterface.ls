-- Script
property m_pAppButtons
property m_pMessageBar
property m_rPopulusTest

on construct this
  m_pMessageBar = createObject("message bar", "CMessageBar")
  m_rPopulusTest = createObject("popula", "CRoomPopulus")
  registerMessage(#ui_show, this.getID(), #ShowInterface)
  registerMessage(#ui_hide, this.getID(), #HideInterface)
  return 1
end
on deconstruct this
  removeObject(m_pMessageBar.getID())
  removeObject(m_rPopulusTest.getID())
  unregisterMessage(#ui_show, this.getID())
  unregisterMessage(#ui_hide, this.getID())
  return 1
end
on ShowInterface me
  me.showMessageBar(1)
end
on HideInterface me
  me.showMessageBar(0)
end
on showMessageBar me, i_state
  if i_state then
    m_pMessageBar.showMessageBar()
  else
    m_pMessageBar.hideMessageBar()
  end if
end
on getMessageBar me
  return m_pMessageBar
end
on GetPopulation me
  return m_rPopulusTest
end