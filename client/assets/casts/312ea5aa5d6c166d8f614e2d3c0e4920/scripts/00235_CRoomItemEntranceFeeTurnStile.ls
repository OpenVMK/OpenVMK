-- Script
property m_bActive
property m_bReady
property m_iRef
property m_iFee0
property m_iFee1
property m_iFee2
property m_iFee3
property m_sFeeText0
property m_sFeeText1
property m_sFeeText2
property m_sFeeText3
property m_iCollectableCredits

on construct this
  registerObject(getUniqueID(), this)
  m_bReady = 0
  m_iRef = 0
  m_iFee0 = getText("item.conf.turnstile.fee.0", "0").integer
  m_iFee1 = getText("item.conf.turnstile.fee.1", "1").integer
  m_iFee2 = getText("item.conf.turnstile.fee.2", "3").integer
  m_iFee3 = getText("item.conf.turnstile.fee.3", "4").integer
  t_sFeeText0 = getText("item.conf.turnstile.fee.text.0", "Free")
  t_sFeeText1 = getText("item.conf.turnstile.fee.text.1", "Credit")
  t_sFeeText2 = getText("item.conf.turnstile.fee.text.2", "Credits")
  if m_iFee0 > 1 then
    m_sFeeText0 = m_iFee0 && t_sFeeText2
  else
    if m_iFee0 = 1 then
      m_sFeeText0 = m_iFee0 && t_sFeeText1
    else
      m_sFeeText0 = t_sFeeText0
    end if
  end if
  if m_iFee1 > 1 then
    m_sFeeText1 = m_iFee1 && t_sFeeText2
  else
    if m_iFee1 = 1 then
      m_sFeeText1 = m_iFee1 && t_sFeeText1
    else
      m_sFeeText1 = t_sFeeText0
    end if
  end if
  if m_iFee2 > 1 then
    m_sFeeText2 = m_iFee2 && t_sFeeText2
  else
    if m_iFee2 = 1 then
      m_sFeeText2 = m_iFee2 && t_sFeeText1
    else
      m_sFeeText2 = t_sFeeText0
    end if
  end if
  if m_iFee3 > 1 then
    m_sFeeText3 = m_iFee3 && t_sFeeText2
  else
    if m_iFee3 = 1 then
      m_sFeeText3 = m_iFee3 && t_sFeeText1
    else
      m_sFeeText3 = t_sFeeText0
    end if
  end if
  m_iCollectableCredits = 0
  registerMessage("room_leave", this.getID(), #CloseWindows)
  return 1
end
on deconstruct this
  unregisterMessage("room_leave", this.getID())
  unregisterObject(this.getID())
  return callAncestor(#deconstruct, this)
end
on CloseWindows this
  t_sID = "vmk_turnstile_price"
  if getWindow(t_sID) <> 0 then
    removeWindow(t_sID)
  end if
  removeDialogWindow("pay_turnstile_entrance_fee")
  removeDialogWindow("configure_entrance_fee_turnstile")
  removeDialogWindow("collect_turnstile_credits")
end
on select this
  if getObject(#session).get("RoomType") = #private then
    if the doubleClick then
      t_iRef = integer(this.getObject().GetParam("REF"))
      getConnection("VMK").send("UseItem", [#int: t_iRef, #int: 0])
      return callAncestor(#select, this)
    end if
  else
    t_rEventProcessor = getObject("RoomEventProcessor")
    if t_rEventProcessor <> 0 then
      t_rEventProcessor.reset()
    end if
  end if
end
on setState this, a_iState
  if a_iState = 2 then
    executeMessage("PlayFxSound", "VMK-entrance-1")
  end if
  t_rObj = this.getObject()
  t_rObj.SetParam("STATE", string(a_iState))
  if m_bReady then
    t_fFloorSize = float(getThread(#room).component._AccessRoom().GetParam("TILESIZE"))
    t_fItemSize = float(t_rObj.GetParam("STRUCT")[#param]["TILESIZE"])
    if voidp(t_fItemSize) then
      t_fItemSize = 32.0
    end if
    t_fScaling = 1
    if t_fItemSize <> t_fFloorSize then
      t_fScaling = t_fFloorSize / t_fItemSize
    end if
    t_iDir = this.getObject().GetParam("DIR").integer
    t_rBlock = t_rObj.GetContext().GetObjByKey(this.m_ar_sKey[1])
    t_rSprite = t_rBlock.GetVisual().GetSprites()[1]
    t_sMember = t_rSprite.member.name
    delete char -30000 of t_sMember
    t_rMember = getMember(t_sMember & a_iState)
    if t_rMember.number > 0 then
      t_rSprite.member = t_rMember
      t_rSprite.width = t_rSprite.member.width * t_fScaling
      t_rSprite.height = t_rSprite.member.height * t_fScaling
    else
    end if
    t_rSprite = t_rBlock.GetVisual().GetSprites().getLast()
    t_sMember = t_rSprite.member.name
    delete char -30000 of t_sMember
    t_rMember = getMember(t_sMember & a_iState)
    if t_rMember.number > 0 then
      t_rSprite.member = t_rMember
      t_rSprite.width = t_rSprite.member.width * t_fScaling
      t_rSprite.height = t_rSprite.member.height * t_fScaling
    else
    end if
    t_rBlock = t_rObj.GetContext().GetObjByKey(this.m_ar_sKey[2])
    t_rSprite = t_rBlock.GetVisual().GetSprites()[1]
    t_sMember = t_rSprite.member.name
    delete char -30000 of t_sMember
    t_rMember = getMember(t_sMember & a_iState)
    if t_rMember.number > 0 then
      t_rSprite.member = t_rMember
      t_rSprite.width = t_rSprite.member.width * t_fScaling
      t_rSprite.height = t_rSprite.member.height * t_fScaling
    else
    end if
    t_rSprite = t_rBlock.GetVisual().GetSprites().getLast()
    t_sMember = t_rSprite.member.name
    delete char -30000 of t_sMember
    t_rMember = getMember(t_sMember & a_iState)
    if t_rMember.number > 0 then
      t_rSprite.member = t_rMember
      t_rSprite.width = t_rSprite.member.width * t_fScaling
      t_rSprite.height = t_rSprite.member.height * t_fScaling
    else
    end if
  else
    put "Turnstile not ready!" && t_rObj.GetParam("TYPE")
  end if
end
on update this
  if not m_bReady then
    this._Init()
  end if
end
on AreWeReady this
  t_ar_rBlocks = this.getObject().GetFactor().GetBlocks()
  if t_ar_rBlocks.count = 0 then
    return 0
  end if
  repeat with t_rBlock in t_ar_rBlocks
    if not t_rBlock.GetVisual().IsReady() then
      return 0
    end if
  end repeat
  return getObject("RoomItemAssetManager").IsItemReady(integer(this.getObject().GetParam("TYPE")))
end
on _Init this
  t_rObj = this.getObject()
  if this.AreWeReady() then
    if this.m_ar_sKey.count then
      t_rObj.GetVisual().SetBlockVisualCursors([getMember("cursor.finger"), getMember("cursor.finger.mask")], [[1, 2], [1, 2]])
      m_bReady = 1
      this.setState(t_rObj.GetParam("STATE"))
    end if
  end if
end
on CurrentItemConfiguration this, t_iRef, a_ar_Configuration
  m_iRef = t_iRef
  this.createCurrentItemConfigurationDialog(t_iRef, a_ar_Configuration)
end
on ItemConfiguration this, t_iRef, a_ar_Configuration
  m_iRef = t_iRef
  this.createItemConfigurationDialog(t_iRef, a_ar_Configuration)
end
on ItemConfigurationUsed this, t_iRef, t_iStatus, a_ar_Params
  if t_iRef = m_iRef then
    case t_iStatus of
      2:
        removeDialogWindow("pay_turnstile_entrance_fee")
      3:
        t_iCollected = integer(a_ar_Params["collected"])
        t_iCredits = integer(a_ar_Params["credits"])
        t = createDialogWindow(this.getID(), "collect_turnstile_credits", 1, 1)
        t.show()
        t_ar_btnOk = [#text: "OK", #eventID: #Ok, #data: [#ref: m_iRef, #data: a_ar_Params]]
        t_txt = getText("furni.conf.turnstile.collected.credits")
        t_txt = replaceChunks(t_txt, "$", t_iCollected)
        t.setText(t_txt, getText("furni.conf.turnstile.collected.title"), "OK")
      otherwise:
        put "Unknown configuration status" && t_iStatus

    end case
    m_iRef = t_iRef
  end if
end
on createCurrentItemConfigurationDialog this, i_iRef, a_ar_Configuration
  t_iCost = integer(a_ar_Configuration["fee"])
  t = createDialogWindow(this.getID(), "pay_turnstile_entrance_fee", 2)
  t.show()
  t_ar_btnOk = [#text: "OK", #eventID: #Ok, #data: [#ref: i_iRef, #data: a_ar_Configuration]]
  t_ar_btnCancel = [#text: "CANCEL", #eventID: #cancel, #data: [#ref: i_iRef, #data: a_ar_Configuration]]
  t_txt = getText("furni.conf.turnstile.fee")
  t_txt = replaceChunks(t_txt, "$", t_iCost)
  t.setText(t_txt, getText("furni.conf.turnstile.fee.required.title"), t_ar_btnCancel, t_ar_btnOk)
end
on createItemConfigurationDialog this, i_iRef, a_ar_Configuration
  t_iCost = integer(a_ar_Configuration["fee"])
  m_iCollectableCredits = integer(a_ar_Configuration["credits"])
  t_ar_windowDescriptions = ["vmk_basic.window", "vmk_turnstile_price.window"]
  t_sID = "vmk_turnstile_price"
  if getWindow(t_sID) <> 0 then
    removeWindow(t_sID)
  end if
  t_bSuccess = createWindow(t_sID, VOID, 0, 0, #modal)
  if t_bSuccess then
    t_rWindow = getWindow(t_sID)
    repeat with t_sWinDesc in t_ar_windowDescriptions
      t_bSuccess = t_rWindow.merge(t_sWinDesc)
    end repeat
    t_rWindow.center()
    t_rRadioButton = this.createRadioButton(t_sID)
    if objectp(t_rRadioButton) then
      t_sActiveRadio = "quest.duration1"
      case t_iCost of
        m_iFee0:
          t_sActiveRadio = "quest.duration1"
        m_iFee1:
          t_sActiveRadio = "quest.duration2"
        m_iFee2:
          t_sActiveRadio = "quest.duration3"
        m_iFee3:
          t_sActiveRadio = "quest.duration4"

      end case
      t_rRadioButton.clickElement(t_sActiveRadio)
      t_rRadioButton.updateMenu()
    end if
    t_rWindow.getElement("basic.window.title").setText(getText("item.configuration.title"))
    this.setButtonTxt(t_rWindow, "basic.dialog.button2", getText("mes.accept"))
    this.setButtonTxt(t_rWindow, "basic.dialog.button1", getText("mes.deny"))
    t_txt = getText("turnstile.credits.amount")
    t_txt = replaceChunks(t_txt, "%credits%", m_iCollectableCredits)
    t_rElem = t_rWindow.getElement("turnstile.collect.info")
    if objectp(t_rElem) then
      t_rElem.setText(t_txt)
    end if
    if m_iCollectableCredits = 0 then
      t_rElem = t_rWindow.getElement("turnstile.collect.button")
      if objectp(t_rElem) then
        t_rElem.deactivate()
      end if
    end if
    t_rWindow.registerClient(this.getID())
    t_rWindow.registerProcedure(#_ConfigurationEventProc, this.getID(), #mouseUp)
    return t_sID
  end if
end
on _ConfigurationEventProc me, a_kEvent, a_sElemID, a_vParam
  tWndObj = getWindow("vmk_turnstile_price")
  t_rRadioButton = getObject("vmk_turnstile_price_menu")
  if a_kEvent = #mouseUp then
    case a_sElemID of
      "quest.duration1", "quest.duration2", "quest.duration3", "quest.duration4":
        if objectp(t_rRadioButton) then
          t_rRadioButton.clickElement(a_sElemID)
          t_rRadioButton.updateMenu()
        end if
      "turnstile.collect.button":
        getConnection("VMK").send("ConfigureItem", [#int: m_iRef, #int: 1, #str: "credits", #str: string(m_iCollectableCredits)])
        m_iCollectableCredits = 0
        t_txt = getText("turnstile.credits.amount")
        t_txt = replaceChunks(t_txt, "%credits%", m_iCollectableCredits)
        t_rElem = tWndObj.getElement("turnstile.collect.info")
        if objectp(t_rElem) then
          t_rElem.setText(t_txt)
        end if
        t_rElem = tWndObj.getElement("turnstile.collect.button")
        if objectp(t_rElem) then
          t_rElem.deactivate()
        end if
      "close", "basic.dialog.button1":
        if objectp(tWndObj) then
          removeWindow(tWndObj.getID())
        end if
        if objectp(t_rRadioButton) then
          removeObject(t_rRadioButton.getID())
        end if
      "basic.dialog.button2":
        t_iFee = string(t_rRadioButton.getValue())
        getConnection("VMK").send("ConfigureItem", [#int: m_iRef, #int: 1, #str: "fee", #str: t_iFee])
        if objectp(tWndObj) then
          removeWindow(tWndObj.getID())
        end if
        if objectp(t_rRadioButton) then
          removeObject(t_rRadioButton.getID())
        end if
      "help":
        executeMessage(#open_help_page, "help.stuff.turnstile", 1)

    end case
  end if
end
on createRadioButton me, t_sWindowID
  t_rWindow = getWindow(t_sWindowID)
  if objectp(t_rWindow) then
    if objectExists(t_sWindowID & "_menu") then
      t_rRadioButton = getObject(t_sWindowID & "_menu")
    else
      t_rRadioButton = createObject(t_sWindowID & "_menu", "CQuestRadioButton")
    end if
    t_ar_elements = []
    t_ar_elements.append([#element: "quest.duration1", #description: EMPTY, #value: m_iFee0])
    t_ar_elements.append([#element: "quest.duration2", #description: EMPTY, #value: m_iFee1])
    t_ar_elements.append([#element: "quest.duration3", #description: EMPTY, #value: m_iFee2])
    t_ar_elements.append([#element: "quest.duration4", #description: EMPTY, #value: m_iFee3])
    t_rRadioButton.addElements(t_ar_elements)
    t_rRadioButton.setParentWindow(t_rWindow)
    t_rRadioButton.clickElement("quest.duration1")
    t_rRadioButton.updateMenu()
    return t_rRadioButton
  else
    return VOID
  end if
end
on dialogWindowEvent me, t_dialogName, t_dialogEvent, t_rdata
  t_iRef = m_iRef
  t_iFee = 0
  case t_dialogName of
    "pay_turnstile_entrance_fee":
      if listp(t_rdata) then
        t_iRef = t_rdata[#ref]
        a_ar_Configuration = t_rdata[#data]
        t_iFee = string(a_ar_Configuration["fee"])
      end if
      case t_dialogEvent of
        #Ok:
          executeMessage("PlayFxSound", "VMK-payentrance-1")
          getConnection("VMK").send("UseItemConfiguration", [#int: t_iRef, #int: 1, #int: 1, #str: "fee", #str: t_iFee])
        #cancel:
          getConnection("VMK").send("UseItemConfiguration", [#int: t_iRef, #int: 0, #int: 1, #str: "fee", #str: t_iFee])
        "help":
          executeMessage(#open_help_page, "help.stuff.turnstile", 1)

      end case
    "configure_entrance_fee_turnstile":
      if listp(t_rdata) then
        t_iRef = t_rdata[#ref]
        a_ar_Configuration = t_rdata[#data]
        t_iFee = string(a_ar_Configuration["fee"])
      end if
      case t_dialogEvent of
        #zeroCredits, #oneCredit, #threeCredits, #fiveCredits:
          getConnection("VMK").send("ConfigureItem", [#int: t_iRef, #int: 1, #str: "fee", #str: t_iFee])
        #Ok:
        #cancel:
        "help":
          executeMessage(#open_help_page, "help.stuff.turnstile", 1)

      end case
    "collect_turnstile_credits":
      case t_dialogEvent of
        #Ok:
        #cancel:
        "help":
          executeMessage(#open_help_page, "help.stuff.turnstile", 1)

      end case

  end case
  removeDialogWindow(t_dialogName)
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