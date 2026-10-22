-- Script
property m_pElements
property m_gActive
property m_gPassive
property m_windowTitle

on construct me
  m_pElements = []
  m_windowTitle = EMPTY
  m_gActive = member(getmemnum("button.radiobutton.1")).image
  m_gPassive = member(getmemnum("button.radiobutton.0")).image
end
on deconstruct me
  m_pElements.deleteAll()
end
on addElements me, i_lElements
  if not (i_lElements.ilk = #list) then
    return 0
  end if
  repeat with t_Elem in i_lElements
    t_new = [:]
    t_new[#element] = t_Elem.element
    t_new[#description] = t_Elem.getaProp(#description)
    t_new[#needupdate] = 1
    t_new[#Active] = 0
    m_pElements.append(t_new)
  end repeat
  return 1
end
on setParentWindow me, t_windowTitle
  m_windowTitle = t_windowTitle
end
on inactivateOld me
  repeat with t_Elem in m_pElements
    if t_Elem.Active then
      t_Elem.Active = 0
      t_Elem.needupdate = 1
    end if
  end repeat
  return 0
end
on clickElement me, i_Elem
  repeat with t_Elem in m_pElements
    if t_Elem.element = i_Elem then
      me.inactivateOld()
      t_Elem.Active = 1
      t_Elem.needupdate = 1
      return 1
    end if
  end repeat
  return 0
end
on getActiveDescription me
  repeat with t_Elem in m_pElements
    if t_Elem.Active then
      return t_Elem.getaProp(#description)
    end if
  end repeat
  return EMPTY
end
on getActiveElementID me
  if m_pElements[1].Active then
    return 1
  end if
  if m_pElements[2].Active then
    return 2
  end if
  if m_pElements[3].Active then
    return 0
  end if
  return -1
end
on updateMenu me
  if not (m_windowTitle = EMPTY) then
    tWndObj = getWindow(m_windowTitle)
    repeat with t_Elem in m_pElements
      if t_Elem.needupdate then
        if t_Elem.Active then
          tWndObj.getElement(t_Elem.element).feedImage(m_gActive)
          next repeat
        end if
        tWndObj.getElement(t_Elem.element).feedImage(m_gPassive)
      end if
    end repeat
  end if
end