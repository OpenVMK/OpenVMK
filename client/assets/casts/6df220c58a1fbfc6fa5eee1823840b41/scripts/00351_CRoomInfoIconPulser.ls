-- Script
property m_pElements
property m_gNormal
property m_gPressed
property m_gComposite
property m_windowTitle
property m_bActive
property m_iCounter
property m_iSpeed

on construct me
  m_pElements = []
  m_windowTitle = EMPTY
  m_gPressed = VOID
  m_gNormal = VOID
  m_gComposite = VOID
  me.setParentWindow("MessageBar")
  me.addElements(["chatbar.info"])
  m_bActive = 0
  m_iCounter = 0
  m_iSpeed = 10
  receiveUpdate(me.getID())
  return 1
end
on build me
  m_gNormal = member(getmemnum("button.info.active")).image
  m_gPressed = member(getmemnum("button.info.pressed")).image
  m_gComposite = image(m_gNormal.rect.width, m_gNormal.rect.height, 32)
end
on deconstruct me
  m_pElements.deleteAll()
  removeUpdate(me.getID())
  return 1
end
on Activate me
  m_iCounter = 0
  if voidp(m_gPressed) then
    me.build()
  end if
  m_bActive = 1
end
on deactivate me
  tWndObj = getWindow(m_windowTitle)
  if tWndObj <> 0 then
    if m_pElements.count() > 0 then
      tElem = tWndObj.getElement(m_pElements[1].element)
      if tElem <> 0 then
        tElem.pImage = m_gNormal
        tElem.render()
      end if
    end if
  end if
  m_bActive = 0
end
on setParentWindow me, t_windowTitle
  m_windowTitle = t_windowTitle
end
on addElements me, i_lElements
  if not (i_lElements.ilk = #list) then
    return 0
  end if
  repeat with t_Elem in i_lElements
    t_new = [:]
    t_new[#element] = t_Elem
    t_new[#needupdate] = 1
    m_pElements.append(t_new)
  end repeat
  return 1
end
on update me
  if m_bActive then
    t_error = 1
    tWndObj = getWindow(m_windowTitle)
    if tWndObj <> 0 then
      if m_pElements.count() > 0 then
        tElem = tWndObj.getElement(m_pElements[1].element)
        if tElem <> 0 then
          t_error = 0
        end if
      end if
    end if
    if not t_error then
      m_iCounter = m_iCounter + m_iSpeed
      m_gComposite.copyPixels(m_gNormal, m_gNormal.rect, m_gNormal.rect)
      t_blend = sin(m_iCounter * PI / 180.0)
      m_gComposite.copyPixels(m_gPressed, m_gPressed.rect, m_gPressed.rect, [#blendLevel: t_blend * 127 + 127])
      tElem.pImage = m_gComposite
      tElem.render()
    end if
  end if
end