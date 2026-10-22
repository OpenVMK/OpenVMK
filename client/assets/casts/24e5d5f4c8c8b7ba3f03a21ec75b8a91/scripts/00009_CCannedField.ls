-- Behavior
on ParseCannedField a_rElement, a_ar_symOptions
  tText = a_rElement.getText()
  return getThread("dictionary").getComponent().ParseText(tText, a_ar_symOptions)
end
on CreateCannedField
  if the paramCount < 2 then
    put "CreateCannedField(t_sWindowTitle, t_sFieldElement) called with incorrect parameters"
    return 0
  end if
  t_sWindowTitle = param(1)
  t_sFieldElement = param(2)
  if the paramCount > 2 then
    t_pNormalColor = param(3)
  end if
  if the paramCount > 3 then
    t_pErrorColor = param(4)
  end if
  return getThread("CannedField").getComponent().createNewCannedField(t_sWindowTitle, t_sFieldElement, t_pNormalColor, t_pErrorColor)
end
on removeCannedField t_sWindowTitle, t_sFieldElement
  return getThread("CannedField").getComponent().removeCannedField(t_sWindowTitle, t_sFieldElement)
end
on showCannedFields
  return getThread("CannedField").getComponent().showCannedFields()
end
on removeAllCannedFields
  return getThread("CannedField").getComponent().removeAllCannedFields()
end