-- Score Script
property m_pCannedFields

on construct me
  m_pCannedFields = [:]
  return 1
end
on deconstruct me
  removeAllCannedFields()
  return 1
end
on Initialize this
end
on createNewCannedField me, t_sWindowTitle, t_sFieldElement, t_pNormalColor, t_pErrorColor
  tWndObj = getWindow(t_sWindowTitle)
  if tWndObj <> 0 then
    tElem = tWndObj.getElement(t_sFieldElement)
    if tElem <> 0 then
      t_uniqID = t_sWindowTitle & t_sFieldElement
      t_pCannedField = createObject(#random, "CComposeCannedMessage")
      t_pCannedField.Init(t_sWindowTitle, t_sFieldElement, t_pNormalColor, t_pErrorColor)
      m_pCannedFields[t_uniqID] = t_pCannedField
      return t_pCannedField
    else
      return 0
    end if
  else
    return 0
  end if
end
on removeCannedField me, t_sWindowTitle, t_sFieldElement
  t_uniqID = t_sWindowTitle & t_sFieldElement
  if not voidp(m_pCannedFields.getaProp(t_uniqID)) then
    m_pCannedFields.deleteProp(t_uniqID)
    return 1
  end if
  return 0
end
on removeAllCannedFields me
  repeat with t_canned in m_pCannedFields
    removeObject(t_canned.getID())
  end repeat
  m_pCannedFields.deleteAll()
end
on showCannedFields me
  repeat with t_canned in m_pCannedFields
  end repeat
end