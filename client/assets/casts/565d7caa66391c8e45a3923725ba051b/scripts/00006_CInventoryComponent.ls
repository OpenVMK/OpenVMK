-- Score Script
property m_kState
property m_rTradeDevice
property m_bInventoryRequested
property m_mp_iRedeemPrice
property m_mp_iInventory
property m_iCredits
property m_ar_mpCreditsCallbacks

on construct this
  getObject(#session).set("user_credits", 0)
  m_rTradeDevice = VOID
  m_bInventoryRequested = 0
  m_iCredits = 0
  m_mp_iRedeemPrice = getVariableValue("redeemprices")
  if voidp(m_mp_iRedeemPrice) then
    m_mp_iRedeemPrice = [:]
  end if
  m_mp_iInventory = [:]
  m_mp_iInventory.addProp(1, createObject("mainInventory", "CInventoryContainer"))
  m_mp_iInventory.addProp(2, createObject("wornClothes", "CInventoryContainer"))
  m_mp_iInventory.addProp(3, createObject("wornPins", "CInventoryContainer"))
  m_mp_iInventory.addProp(4, createObject("questPrize", "CInventoryContainer"))
  m_mp_iInventory.addProp(5, createObject("carryOnVmks", "CInventoryContainer"))
  this._SetState(#reset)
  registerMessage("room_ready", this.getID(), #reset)
  registerMessage("room_leave", this.getID(), #TradeClose)
  m_ar_mpCreditsCallbacks = []
  return 1
end
on deconstruct this
  if objectp(m_rTradeDevice) then
    removeObject(m_rTradeDevice.getID())
    m_rTradeDevice = VOID
  end if
  unregisterMessage("room_ready", this.getID())
  return 1
end
on TradeOpen this, a_iTraderRef, i_bOppositeGender
  if voidp(m_rTradeDevice) then
    m_rTradeDevice = createObject(getUniqueID(), "CInvTrade")
    m_rTradeDevice.SetPartner(a_iTraderRef, i_bOppositeGender)
  end if
end
on TradeClose this
  if objectp(m_rTradeDevice) then
    removeObject(m_rTradeDevice.getID())
    m_rTradeDevice = VOID
  end if
  m_mp_ItemData = [#itemInventory: [:], #wornPins: [:], #worn_clothes: [:], #vmks: [:]]
  if objectExists("TradeConfirm") then
    removeObject("TradeConfirm")
  end if
  m_mp_TicketInfo = [:]
end
on _LoadInventory this
  if not m_bInventoryRequested then
    this._RequestItemList()
    m_bInventoryRequested = 1
  end if
end
on getInventoryLoaded this
  return m_bInventoryRequested
end
on TradeCancelled this
  if objectp(m_rTradeDevice) then
    t_mp_ItemsInTrade = m_rTradeDevice.UpdateInventory()
    this.TradeClose()
  else
    return 0
  end if
  if listp(t_mp_ItemsInTrade) then
    repeat with i = 1 to t_mp_ItemsInTrade.count
      t_kType = t_mp_ItemsInTrade.getPropAt(i)
      if t_mp_ItemsInTrade[i].count > 0 then
        repeat with e = 1 to t_mp_ItemsInTrade[i].count
          t_iRef = t_mp_ItemsInTrade[i].getPropAt(e)
          t_mpItem = t_mp_ItemsInTrade[i][e]
          if not voidp(t_iRef) and not voidp(t_mpItem) then
          end if
        end repeat
      end if
    end repeat
  end if
end
on TradeStatus this, a_rOwnSet, a_rHerSet
  if objectp(m_rTradeDevice) then
    m_rTradeDevice.status(a_rOwnSet, a_rHerSet)
  else
    error(this, "Trade device not found!", #TradeStatus)
  end if
end
on reset this
  this._SetState(#reset)
  m_bInventoryRequested = 0
end
on print this
end
on GetRedeemPrice this, a_iItemCode
  return m_mp_iRedeemPrice.getaProp(a_iItemCode)
end
on _RequestItemList this
  if connectionExists("VMK") then
    getConnection("VMK").send("GetItemList", [#int: 0])
  else
    error(this, "Failed to request item list!", #_RequestItemList)
  end if
end
on _RequestSpecificInventoryItemlist this, a_arInventories
  t_mpMsg = [#int: a_arInventories.count]
  repeat with i = 1 to a_arInventories.count
    t_kInventory = a_arInventories[i]
    case t_kInventory of
      #items:
        t_mpMsg.addProp(#int, 1)
      #clothes:
        t_mpMsg.addProp(#int, 2)
      #pins:
        t_mpMsg.addProp(#int, 3)
      #quest:
        t_mpMsg.addProp(#int, 4)
      #vmks:
        t_mpMsg.addProp(#int, 5)

    end case
  end repeat
  if connectionExists("VMK") then
    getConnection("VMK").send("GetItemList", t_mpMsg)
  else
    error(this, "Failed to request item list!", #_RequestItemList)
  end if
end
on GetTradeDevice this
  return m_rTradeDevice
end
on _UpdateCreditBalance this, a_iCredits
  m_iCredits = [#credits: [0: a_iCredits]]
  repeat with tCallback in m_ar_mpCreditsCallbacks
    call(tCallback[#method], tCallback[#object], m_iCredits, #credits)
  end repeat
end
on _SetState this, a_kState
  case a_kState of
    #reset:
      m_kState = a_kState
    #load:
      if m_kState = #reset then
        this._RequestItemList()
        m_kState = a_kState
      else
      end if
    #wait:
      m_kState = a_kState
    #ready:
      m_kState = a_kState
    otherwise:
      error(this, "Unknown state:" && a_kState, #_SetState)

  end case
end
on IsRoomTicket me, a_iRef, a_sCategory
  t_sTicketGoodFor = VOID
  return t_sTicketGoodFor
end
on GetInventory this, a_iID
  return m_mp_iInventory.getaProp(a_iID)
end
on RegisterCreditUpdateCallback this, a_kMethod, a_rObject
  m_ar_mpCreditsCallbacks.append([#method: a_kMethod, #object: a_rObject])
end
on UnregisterCreditUpdateCallback this, a_kMethod, a_rObject
  repeat with i = 1 to m_ar_mpCreditsCallbacks.count
    if m_ar_mpCreditsCallbacks[i].method = a_kMethod and m_ar_mpCreditsCallbacks[i].object = a_rObject then
      m_ar_mpCreditsCallbacks.deleteAt(i)
      return 1
    end if
  end repeat
  return error(this, "Tried to remove a credits update callback that was nonexistent.", #UnregisterCreditUpdateCallback)
end