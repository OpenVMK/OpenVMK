-- Behavior
property m_rDialogWnd

on construct me
  m_rDialogWnd = VOID
  me.regMsgList(1)
  return 1
end
on deconstruct me
  return 1
end
on _ReceiveBalance me, a_rMsg
  me.getComponent()._UpdateProductList(a_rMsg.connection.GetIntFrom(), "balance")
end
on CatalogIndex me, a_rMsg
  t_iSuperCatCount = a_rMsg.connection.GetIntFrom()
  t_mpCatIndex = [:]
  repeat with i = 1 to t_iSuperCatCount
    t_iName = a_rMsg.connection.GetIntFrom()
    t_sName = getText("cat.name." & t_iName)
    t_iCatCount = a_rMsg.connection.GetIntFrom()
    t_mpCatIndex[t_sName] = [:]
    t_mpCurCat = t_mpCatIndex[t_sName]
    t_mpCurCat.addProp(#state, 0)
    t_mpCurCat.addProp(#id, t_iName)
    t_mpCurCat.addProp(#name, t_sName)
    if t_iCatCount > 0 then
      repeat with e = 1 to t_iCatCount
        t_iID = a_rMsg.connection.GetIntFrom()
        t_sTitle = a_rMsg.connection.GetStrFrom()
        t_bSpecial = a_rMsg.connection.GetIntFrom()
        t_mpCurCat.addProp(t_sTitle, [:])
        t_mpCurSubCat = t_mpCurCat[t_sTitle]
        t_mpCurSubCat.addProp(#id, t_iID)
        t_mpCurSubCat.addProp(#state, 0)
        t_mpCurSubCat.addProp(#special, t_bSpecial)
      end repeat
    end if
  end repeat
  me.getComponent()._UpdateProductList(t_mpCatIndex, "index")
end
on GetCatalogCategory me, a_rMsg
  t_iID = a_rMsg.connection.GetIntFrom()
  t_iName = a_rMsg.connection.GetStrFrom()
  t_iLayOut = a_rMsg.connection.GetIntFrom()
  t_iProdCount = a_rMsg.connection.GetIntFrom()
  t_mpProdList = [:]
  t_mpProdList.addProp(string(t_iID), [])
  if t_iProdCount > 0 then
    repeat with i = 1 to t_iProdCount
      t_mp_data = [:]
      t_mp_data.addProp(#code, a_rMsg.connection.GetIntFrom())
      t_mp_data.addProp(#price, a_rMsg.connection.GetIntFrom())
      tKeyPairCount = a_rMsg.connection.GetIntFrom()
      t_ar_keypairs = [:]
      repeat with j = 1 to tKeyPairCount
        t_sKey = a_rMsg.connection.GetStrFrom()
        t_sValue = a_rMsg.connection.GetStrFrom()
        t_ar_keypairs[t_sKey] = t_sValue
      end repeat
      if tKeyPairCount > 0 then
        t_mp_data.addProp(#param, t_ar_keypairs)
      end if
      t_mp_data.addProp(#categoryId, t_iID)
      t_mpProdList[string(t_iID)].add(t_mp_data)
    end repeat
  else
  end if
  if t_iLayOut = 3 then
    me.interface._SaveRoomList(t_mpProdList)
  else
    me.getComponent()._UpdateProductList(t_mpProdList, "category")
  end if
end
on PurchaseOk me, a_rMsg
  t_iPrOductId = a_rMsg.connection.GetIntFrom()
  getConnection(getVariable("main.connection.id", "VMK")).send("RequestBalance")
  if voidp(m_rDialogWnd) then
    m_rDialogWnd = createDialogWindow(me.getID(), "CatalogOk", 1, 1)
  end if
  m_rDialogWnd.show()
  activateWindow("CatalogOk")
  if textExists("product." & t_iPrOductId) then
    t_sTxt = getText("product." & t_iPrOductId)
  else
    t_sTxt = getText("item." & t_iPrOductId)
  end if
  t_sMsg = getText("cat.purchaseOk") & RETURN & t_sTxt
  m_rDialogWnd.setText(t_sMsg, getText("cat.purchase.hd"), "OK")
end
on dialogWindowEvent this, a_sDialogName, a_sDialogEvent
  case a_sDialogEvent of
    #dialogCancel:
      m_rDialogWnd.hide()
      m_rDialogWnd = VOID

  end case
end
on RoomPurchaseOk me, a_rMsg
  t_mp_RoomIds = [:]
  t_mp_RoomIds.addProp(#code, a_rMsg.connection.GetIntFrom())
  t_mp_RoomIds.addProp(#id, a_rMsg.connection.GetIntFrom())
  me.getComponent()._UpdateProductList(t_mp_RoomIds, "roomId")
end
on HandleCatalogError me, a_rMsg
  put a_rMsg
end
on regMsgList me, tBool
  tMsgs = [:]
  tMsgs.setaProp(2014, #_ReceiveBalance)
  tMsgs.setaProp(2701, #CatalogIndex)
  tMsgs.setaProp(2016, #GetCatalogCategory)
  tMsgs.setaProp(2017, #PurchaseOk)
  tMsgs.setaProp(2700, #RoomPurchaseOk)
  tMsgs.setaProp(4015, #HandleCatalogError)
  tMsgs.setaProp(4016, #HandleCatalogError)
  tMsgs.setaProp(4017, #HandleCatalogError)
  tMsgs.setaProp(4018, #HandleCatalogError)
  tMsgs.setaProp(4700, #HandleCatalogError)
  tMsgs.setaProp(4701, #HandleCatalogError)
  tCmds = [:]
  tCmds.setaProp("RequestBalance", 14)
  tCmds.setaProp("CAT_INDEX_REQUEST", 15)
  tCmds.setaProp("CAT_CATEGORY_REQUEST", 16)
  tCmds.setaProp("BUY", 17)
  tCmds.setaProp("BUY_ROOM", 700)
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    registerCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    unregisterCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  end if
end