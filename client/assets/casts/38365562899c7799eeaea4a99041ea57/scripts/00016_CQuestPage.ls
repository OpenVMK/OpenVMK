-- Script
property m_rManager

on construct me
  return 1
end
on deconstruct me
  return 1
end
on setManager me, t_rManager
  m_rManager = t_rManager
end
on getManager me
  return m_rManager
end
on merge me, a_rWindow
  return error(me, "Calling virtual method!", #merge)
end
on Purge me, a_rWindow
  return error(me, "Calling virtual method!", #Purge)
end
on update me, a_mp_kType_mp_iRef_rItem, a_kAlteredCategory
  return error(me, "Calling virtual method!", #update)
end
on GetSelected me
  error(me, "Callin virtual method!", #GetSelected)
  return [#ref: -1, #code: -1, #state: #invalid]
end
on rawData me
  error(me, "Calling virtual method!", #rawData)
  return 0
end
on createComponentWindow me, m_rWindow, m_ar_components, t_ar_componentsPage
  repeat with i = 1 to t_ar_componentsPage.count
    t_sElemName = t_ar_componentsPage.getPropAt(i)
    t_ar_components = t_ar_componentsPage[i]
    t_rClientElement = m_rWindow.getElement(t_sElemName)
    t_rComponentsPage = createObject(getUniqueID(), "CUIComponentPage")
    t_rComponentsPage.setSize(t_rClientElement.pOwnW, t_rClientElement.pOwnH)
    t_rComponentsPage.setColor(rgb("#001F56"))
    t_rImg = t_rComponentsPage.render()
    t_rClientElement.feedImage(t_rImg)
    m_ar_components[t_sElemName] = t_rComponentsPage
  end repeat
end
on AddContentFromXML me, m_rWindow, m_ar_components, i_sDef
  tDoc = CreateXML(getMember(i_sDef).text)
  tDoc.Search("TYPE", "CONTENT", 1)
  t_sDefaultTarget = tDoc.GetParam("TARGET")
  t_sDefaultDesc = tDoc.GetParam("DESC")
  repeat with t_rChild in tDoc.GetNode().child
    if t_rChild.type = "ITEM" then
      me.parseItem(t_rChild, m_ar_components[t_sDefaultTarget], t_sDefaultDesc)
    end if
  end repeat
  t_rClientElement = m_rWindow.getElement(t_sDefaultTarget)
  if t_rClientElement <> 0 then
    t_rComponentsPage = m_ar_components.getaProp(t_sDefaultTarget)
    if objectp(t_rComponentsPage) then
      t_rImg = t_rComponentsPage.render()
      t_rClientElement.feedImage(t_rImg)
    end if
  end if
end
on parseItem me, t_rItem, t_rParentComponent, t_sDefaultDesc
  t_sDesc = t_sDefaultDesc
  if t_rItem.param["DESC"] <> EMPTY then
    t_sDesc = t_rItem.param["DESC"]
  end if
  t_rComponent = t_rParentComponent.addComponent(t_sDesc)
  repeat with t_rNode in t_rItem.child
    if t_rNode.type = "NODE" then
      me.parseNode(t_rNode, t_rComponent)
      next repeat
    end if
    if t_rNode.type = "ITEM" then
      me.parseItem(t_rNode, t_rComponent, t_sDefaultDesc)
    end if
  end repeat
end
on parseNode me, t_rNode, t_rComponent
  t_ID = value(t_rNode.param["ID"])
  t_sTxtKey = t_rNode.param["CAPTION"]
  if t_sTxtKey <> EMPTY then
    t_sCaption = getText(t_sTxtKey)
  else
    t_sCaption = EMPTY
  end if
  t_sEvent = t_rNode.param["EVENT"]
  t_sIcon = t_rNode.param["ICON"]
  t_rLayout = t_rComponent.GetLayout(t_ID)
  if objectp(t_rLayout) then
    if t_sEvent <> EMPTY then
      t_rLayout.setEvent(t_sEvent)
    end if
    if t_sCaption <> EMPTY then
      t_rLayout.setText(t_sCaption)
    end if
    if t_sIcon <> EMPTY then
      t_rLayout.setIcon(t_sIcon)
    end if
    t_rLayout.setNode(t_rNode.param.duplicate())
  end if
end
on setButtonState me, tWndObj, t_elemName, t_state
  if tWndObj <> 0 then
    t_Elem = tWndObj.getElement(t_elemName)
    if t_Elem <> 0 then
      case t_state of
        1:
          t_Elem.setProperty(#cursor, ["cursor.finger", "cursor.finger.mask"])
          t_Elem.Activate()
        0:
          t_Elem.setProperty(#cursor, #arrow)
          t_Elem.deactivate()

      end case
    end if
  end if
end
on changeImageInElement me, tWndObj, tElemName, tmember
  if objectp(tWndObj) then
    tElem = tWndObj.getElement(tElemName)
    if tElem <> 0 then
      tSprite = tElem.getProperty(#sprite)
      if tSprite <> 0 then
        tSprite.ink = 36
        tSprite.member.image = tmember.image
        tSprite.member.regPoint = tmember.regPoint
        tSprite.width = tmember.width
        tSprite.height = tmember.height
      end if
    end if
  end if
end
on setButtonTxt me, tWndObj, t_btnname, t_txt
  if not voidp(t_btnname) and not voidp(t_txt) then
    if objectp(tWndObj) then
      tBtn = tWndObj.getElement(t_btnname)
      if tBtn <> 0 then
        tBtn.pButtonText = t_txt
        tBtn.pCachedImgs = [:]
        tBtn.changeState(#up)
      end if
    end if
  end if
end
on setField me, m_rWindow, t_sFieldName, t_sText
  if objectp(m_rWindow) then
    t_rTitleElem = m_rWindow.getElement(t_sFieldName)
    if t_rTitleElem <> 0 then
      t_rTitleElem.setText(t_sText)
    end if
  end if
end
on showHideElem me, m_rWindow, t_sElemName, a_bState
  t_rElem = m_rWindow.getElement(t_sElemName)
  if t_rElem <> 0 then
    if a_bState then
      t_rElem.show()
    else
      t_rElem.hide()
    end if
  end if
end