-- Score Script
property m_mp_CatalogData

on construct this
  m_mp_CatalogData = [:]
  return 1
end
on deconstruct this
  m_mp_kType_mp_iRef_rItem = VOID
  return 1
end
on _RequestItemList this
  if connectionExists("VMK") then
    getConnection("VMK").send("GetItemList")
  else
    error(this, "Failed to request item list!", #_RequestItemList)
  end if
end
on _UpdateProductList this, a_mp_ProductList, a_sListType
  if a_sListType = "index" then
    m_mp_CatalogData = [:]
  end if
  t_iPos = m_mp_CatalogData.findPos(a_sListType)
  if voidp(t_iPos) then
    m_mp_CatalogData.addProp(a_sListType, a_mp_ProductList)
  else
    m_mp_CatalogData[a_sListType] = a_mp_ProductList
  end if
  this.interface._RefreshItemList(m_mp_CatalogData, a_sListType)
end
on GetItemList this
  return m_mp_CatalogData
end
on GetProductList this
  return m_mp_CatalogData
end
on _UpdateCreditBalance this, a_iCredits
end