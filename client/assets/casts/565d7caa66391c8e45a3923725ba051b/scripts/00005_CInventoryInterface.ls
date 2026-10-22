-- Script
property m_bInitialized
property m_rCurPageObj

on construct this
  m_bInitialized = 0
  m_rCurPageObj = VOID
  registerMessage(#ui_inventory, this.getID(), #ShowHideInventory)
  return 1
end
on deconstruct this
  if objectp(m_rCurPageObj) then
    getThread("inventory").component.GetInventory(1).UnregisterItemListCallback(m_rCurPageObj, #update)
    removeObject(m_rCurPageObj.getID())
  end if
  return 1
end
on GetSelected this
  return [#ref: -1, #code: -1]
end
on ShowSellRequest this, a_iRef, a_iType, a_iPrice
  if objectExists("InvSellRequest") then
    getObject("InvSellRequest").setup(a_iRef, a_iType, a_iPrice)
  else
    createObject("InvSellRequest", "CInvSellRequest").setup(a_iRef, a_iType, a_iPrice)
  end if
end
on ShowSellConfirm this, a_iRef, a_iType, a_iPrice
  if objectExists("InvSellConfirm") then
    getObject("InvSellConfirm").setup(a_iRef, a_iType, a_iPrice)
  else
    createObject("InvSellConfirm", "CInvSellConfirm").setup(a_iRef, a_iType, a_iPrice)
  end if
end
on ShowHideInventory this
  if not objectp(m_rCurPageObj) then
    m_rCurPageObj = createObject(getUniqueID(), "CInvPageBase")
    m_bInitialized = objectp(m_rCurPageObj)
    if not m_bInitialized then
      return error(this, "Failed to init inventory page!", #_RefreshItemList)
    end if
    m_rCurPageObj.open()
    getThread("inventory").component.GetInventory(1).RegisterItemListCallback(m_rCurPageObj, #update)
  else
  end if
  m_rCurPageObj.open()
end
on ShowLevelRequiredScreen this, t_iItemCode, t_iRequiredLevel, t_iAvatarLevel
  t_sTxt = getText("vmks.levelrequired.text", "Level $L not reached. Your current level is $Y.")
  t_sTitle = getText("vmks.levelrequired.title", "LEVEL REQUIRED")
  t_sHead = getText("vmks.levelrequired.head", "LEVEL REQUIRED")
  t_sTxt = replaceChunks(t_sTxt, "$L", string(t_iRequiredLevel))
  t_sTxt = replaceChunks(t_sTxt, "$Y", string(t_iAvatarLevel))
  t = createDialogWindow(this.getID(), "LevelRequirementNotMet", 1, 1)
  t.show()
  t.setText(t_sTxt, t_sTitle, "OK")
end