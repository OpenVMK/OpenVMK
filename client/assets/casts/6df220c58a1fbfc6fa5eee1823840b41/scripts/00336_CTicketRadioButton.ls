-- Parent Script
property m_ar_Elements
property m_rWindow
property m_ar_image

on construct me
  m_ar_Elements = []
  m_rWindow = EMPTY
  m_ar_image = [#round: [:], #rect: [:]]
  m_ar_image.round[#Active] = member(getmemnum("button.radiobuttonb.1")).image
  m_ar_image.round[#passive] = member(getmemnum("button.radiobutton.0")).image
  m_ar_image.rect[#Active] = member(getmemnum("button.checkbox.1")).image
  m_ar_image.rect[#passive] = member(getmemnum("button.checkbox.0")).image
end
on deconstruct me
  m_ar_Elements.deleteAll()
end
on addElements me, a_ar_Elements
  if not (a_ar_Elements.ilk = #list) then
    return 0
  end if
  repeat with t_Elem in a_ar_Elements
    t_new = [:]
    t_new[#element] = t_Elem.element
    t_new[#description] = t_Elem.getaProp(#description)
    t_new[#needupdate] = 1
    t_new[#Active] = 0
    t_new[#type] = t_Elem.getaProp(#type)
    t_new[#value] = t_Elem.getaProp(#value)
    m_ar_Elements.append(t_new)
  end repeat
  return 1
end
on setParentWindow me, a_rWindow
  m_rWindow = a_rWindow
end
on inactivateOld me
  repeat with t_Elem in m_ar_Elements
    if t_Elem.Active then
      t_Elem.Active = 0
      t_Elem.needupdate = 1
    end if
  end repeat
  return 0
end
on clickElement me, i_Elem
  repeat with t_Elem in m_ar_Elements
    if t_Elem.element = i_Elem then
      me.inactivateOld()
      t_Elem.Active = 1
      t_Elem.needupdate = 1
      return 1
    end if
  end repeat
  return 0
end
on getValue me
  repeat with t_Elem in m_ar_Elements
    if t_Elem.Active then
      return t_Elem.getaProp(#value)
    end if
  end repeat
  return VOID
end
on getActiveDescription me
  repeat with t_Elem in m_ar_Elements
    if t_Elem.Active then
      return t_Elem.getaProp(#description)
    end if
  end repeat
  return EMPTY
end
on getActiveElementID me
  if m_ar_Elements[1].Active then
    return 1
  end if
  if m_ar_Elements[2].Active then
    return 2
  end if
  if m_ar_Elements[3].Active then
    return 0
  end if
  return 0
end
on updateMenu me
  repeat with t_Elem in m_ar_Elements
    if t_Elem.needupdate then
      if t_Elem.type = #rect then
        t_iType = #rect
      else
        t_iType = #round
      end if
      if t_Elem.Active then
        t_iMode = #Active
      else
        t_iMode = #passive
      end if
      t_rImg = m_ar_image[t_iType][t_iMode]
      m_rWindow.getElement(t_Elem.element).feedImage(t_rImg)
    end if
  end repeat
end