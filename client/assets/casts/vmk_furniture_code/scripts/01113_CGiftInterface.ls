-- Script
property m_mp_GiftObjects
property m_rWindow
property m_iRef
property m_pComposeMessage
property m_rMessageHd
property m_pRadioButtons
property m_BgType
property m_sMergedWnd
property m_bEditable
property m_sText
property m_sSender
property m_sDate
property m_sHeadline
property m_rGridLoadAnim
property m_mp_sUrl_rMember
property m_iInventoryID
property m_bLoadingImage

on construct me
  m_rWindow = VOID
  registerMessage(#room_leave, me.getID(), #leaveRoom)
  m_rGridLoadAnim = createObject(getUniqueID(), "CMainThumbGridAnimator")
  m_mp_sUrl_rMember = [:]
  m_pComposeMessage = VOID
  m_rMessageHd = VOID
  m_pRadioButtons = VOID
  m_bLoadingImage = 0
end
on deconstruct me
  unregisterMessage(#room_leave, me.getID(), #leaveRoom)
  removeCannedField(m_rWindow.getID(), "mes.messages.messageinput")
  removeCannedField(m_rWindow.getID(), "gift.message.hd")
  m_bLoadingImage = 0
  if objectp(m_rGridLoadAnim) then
    removeObject(m_rGridLoadAnim.getID())
    m_rGridLoadAnim = VOID
  end if
  if objectp(m_rWindow) then
    removeWindow(m_rWindow.getID())
  end if
end
on leaveRoom me
  removeObject(me.getID())
end
on createGiftDialog me, a_iRef, a_ar_Configuration, a_bModal
  m_iRef = a_iRef
  if listp(a_ar_Configuration) then
    m_iInventoryID = a_ar_Configuration.invId
    m_bEditable = a_ar_Configuration.editable
    m_BgType = a_ar_Configuration.backgroundCode
    m_sText = a_ar_Configuration.GiftText
    m_sSender = a_ar_Configuration.Sender
    m_sDate = a_ar_Configuration.date
    m_sHeadline = a_ar_Configuration.headline
    m_sText = replaceChars(m_sText, numToChar(10), numToChar(13))
    if m_BgType < 1 then
      m_BgType = 1
    end if
    t_ar_CardData = value(getText("giftcard." & m_BgType))
    if listp(t_ar_CardData) then
      t_sImageUrl = getVariable("imagedownload.url") & t_ar_CardData[3] & "_0.jpg"
    else
      if variableExists("imagedownload.url") then
        t_sImageUrl = getVariable("imagedownload.url") & m_BgType & "_0.jpg"
      end if
    end if
    t_sWndName = "vmk_gift_layout_" & m_BgType & ".window"
    if not memberExists(t_sWndName) then
      t_sWndName = "vmk_gift_layout_1.window"
    end if
    if m_bEditable then
      t_ar_windowDescriptions = ["vmk_gift_message_write.window", t_sWndName]
    else
      t_ar_windowDescriptions = ["vmk_gift_message_read.window", t_sWndName]
    end if
    t_sConfigurationWindowID = "GiftWnd" & a_iRef
    if a_bModal then
      t_bSuccess = createWindow(t_sConfigurationWindowID, VOID, 0, 0, #modal)
    else
      t_bSuccess = createWindow(t_sConfigurationWindowID, VOID, 0, 0)
    end if
    if t_bSuccess then
      m_rWindow = getWindow(t_sConfigurationWindowID)
      repeat with t_sWinDesc in t_ar_windowDescriptions
        t_bSuccess = m_rWindow.merge(t_sWinDesc)
        m_sMergedWnd = t_sWinDesc
      end repeat
      m_rWindow.center()
      m_rWindow.registerClient(me.getID())
      m_rWindow.registerProcedure(#_GiftEventProc, me.getID(), #mouseUp)
      m_rWindow.registerProcedure(#_GiftEventProc, me.getID(), #keyUp)
      m_rWindow.registerProcedure(#_GiftEventProc, me.getID(), #keyDown)
      if m_bEditable then
        t_rElem = m_rWindow.getElement("basic.dialog1.button1")
        if t_rElem <> 0 then
          t_rElem.setProperty(#visible, 0)
        end if
        t_rElem = m_rWindow.getElement("mes.messages.messageinput")
        if t_rElem <> 0 then
          t_rElem.setProperty(#wordWrap, 1)
        end if
        me.createRadioButtonMenu()
        m_pRadioButtons.clickElement("gift.template" & m_BgType)
        m_pRadioButtons.updateMenu()
        m_pComposeMessage = CreateCannedField(t_sConfigurationWindowID, "mes.messages.messageinput")
        m_pComposeMessage.setAllowFreeWords(0)
        m_pComposeMessage.setAllowFriendNames(1)
        m_pComposeMessage.setAllowEmpty(0)
        m_rMessageHd = CreateCannedField(t_sConfigurationWindowID, "gift.message.hd")
        m_rMessageHd.setAllowFreeWords(0)
        m_rMessageHd.setAllowFriendNames(1)
        m_rMessageHd.setAllowEmpty(0)
        if m_sSender <> EMPTY then
          t_rElem = m_rWindow.getElement("gift.editdialog.hd")
          if objectp(t_rElem) then
            t_sTxt = m_sSender && getText("gift.sender.wrote") && m_sDate
            t_rElem.setText(t_sTxt)
          end if
        end if
      else
        t_rElem = m_rWindow.getElement("basic.dialog1.button1")
        if t_rElem <> 0 then
          t_rElem.setProperty(#visible, 1)
        end if
        t_rElem = m_rWindow.getElement("gift.message.hd")
        if t_rElem <> 0 then
          t_rElem.setEdit(0)
          t_rElem.setFocus(0)
        end if
        t_rElem = m_rWindow.getElement("mes.messages.messageinput")
        if t_rElem <> 0 then
          t_rElem.setEdit(0)
          t_rElem.setFocus(0)
        end if
      end if
      t_rElem = m_rWindow.getElement("gift.image")
      if t_rElem <> 0 then
        me.LoadImageToWindowElement(t_sImageUrl, t_rElem)
      end if
      t_rElem = m_rWindow.getElement("mes.messages.sender")
      if objectp(t_rElem) then
        t_sTxt = m_sSender && getText("gift.sender.wrote") && m_sDate
        t_rElem.setText(t_sTxt)
      end if
      t_rElem = m_rWindow.getElement("mes.messages.messageinput")
      if t_rElem <> 0 then
        if m_sText = EMPTY then
          if listp(t_ar_CardData) then
            t_sText = replaceChunks(t_ar_CardData[2], "\r", RETURN)
            t_rElem.setText(t_sText)
          end if
        else
          t_sText = replaceChunks(m_sText, "\r", RETURN)
          t_rElem.setText(t_sText)
        end if
      end if
      t_rElem = m_rWindow.getElement("gift.message.hd")
      if objectp(t_rElem) then
        if m_sHeadline = EMPTY then
          if listp(t_ar_CardData) then
            t_sText = replaceChunks(t_ar_CardData[1], "\r", RETURN)
            t_rElem.setText(t_sText)
          end if
        else
          t_rElem.setText(m_sHeadline)
        end if
      end if
    end if
  end if
  t_rElem = m_rWindow.getElement("mes.messages.messageinput")
  t_rTextField = t_rElem.getProperty(#sprite).member
  t_rTextField.color = rgb("#000000")
  t_rElem = m_rWindow.getElement("gift.message.hd")
  t_rTextField = t_rElem.getProperty(#sprite).member
  t_rTextField.color = rgb("#000000")
end
on LoadImageToWindowElement this, a_sUrl, a_rElement
  t_sMemName = "GiftImage:" & m_BgType
  if memberExists(t_sMemName) then
    t_Img = getMember(t_sMemName).image
    if objectp(a_rElement) then
      a_rElement.feedImage(t_Img)
      exit
    end if
  end if
  tParamsToCallback = [#mem: t_sMemName, #element: a_rElement]
  tMemNum = queueDownload(a_sUrl, t_sMemName, #bitmap, 0)
  if tMemNum = 0 then
    return error(this, "QueueDownload failed", #LoadImageToWindowElement)
  end if
  registerDownloadCallback(tMemNum, #PushPicture, this.getID(), tParamsToCallback)
  m_mp_sUrl_rMember.setaProp(t_sMemName, member(tMemNum))
  m_rGridLoadAnim.SetBufferElement(a_rElement)
  receiveUpdate(m_rGridLoadAnim.getID())
  m_bLoadingImage = 1
end
on PushPicture this, a_mpParams
  m_rGridLoadAnim.SetBufferElement(VOID)
  removeUpdate(m_rGridLoadAnim.getID())
  m_bLoadingImage = 0
  if not (m_mp_sUrl_rMember[a_mpParams.mem].type = #bitmap) then
    return error(this, "There was a problem downloading the gift bg image, aborting.", #PushPicture)
  end if
  if objectp(a_mpParams[#element]) then
    a_mpParams[#element].feedImage(m_mp_sUrl_rMember[a_mpParams.mem].image)
  end if
end
on UpdateView me, a_sElemID
  t_iOldBg = m_BgType
  t_count = a_sElemID.char.count
  t_ibackground = a_sElemID.char[t_count]
  t_ar_CardData = value(getText("giftcard." & t_ibackground))
  t_mp_OldBg = value(getText("giftcard." & t_iOldBg))
  t_rElem = m_rWindow.getElement("mes.messages.messageinput")
  if t_rElem <> 0 then
    t_sText = t_rElem.getText()
    if listp(t_mp_OldBg) then
      t_sTextOld = t_mp_OldBg[2]
    end if
    if t_sText <> t_sTextOld then
      m_sText = t_sText
    else
      if listp(t_ar_CardData) then
        m_sText = t_ar_CardData[2]
      end if
    end if
  end if
  t_rElem = m_rWindow.getElement("gift.message.hd")
  if objectp(t_rElem) then
    t_sText = t_rElem.getText()
    if listp(t_mp_OldBg) then
      t_sTextOld = t_mp_OldBg[1]
    end if
    if t_sText <> t_sTextOld then
      m_sHeadline = t_sText
    else
      if listp(t_ar_CardData) then
        m_sHeadline = t_ar_CardData[1]
      end if
    end if
  end if
  if memberExists("vmk_gift_layout_" & t_ibackground & ".window") then
    m_rWindow.unmerge(m_sMergedWnd)
    m_rWindow.merge("vmk_gift_layout_" & t_ibackground & ".window")
    m_BgType = t_ibackground
    m_sMergedWnd = "vmk_gift_layout_" & t_ibackground & ".window"
  end if
  if listp(t_ar_CardData) then
    t_sImageUrl = getVariable("imagedownload.url") & t_ar_CardData[3] & "_0.jpg"
  else
    if variableExists("imagedownload.url") then
      t_sImageUrl = getVariable("imagedownload.url") & m_BgType & "_0.jpg"
    end if
  end if
  t_rElem = m_rWindow.getElement("gift.image")
  if t_rElem <> 0 then
    me.LoadImageToWindowElement(t_sImageUrl, t_rElem)
  end if
  t_rElem = m_rWindow.getElement("mes.messages.sender")
  if objectp(t_rElem) then
    t_sTxt = m_sSender && getText("gift.sender.wrote") && m_sDate
    t_rElem.setText(t_sTxt)
  end if
  t_rElem = m_rWindow.getElement("mes.messages.messageinput")
  if t_rElem <> 0 then
    if m_sText = EMPTY then
      if listp(t_ar_CardData) then
        t_sText = replaceChunks(t_ar_CardData[2], "\r", RETURN)
        t_rElem.setText(t_sText)
      end if
    else
      t_sText = replaceChunks(m_sText, "\r", RETURN)
      t_rElem.setText(t_sText)
    end if
  end if
  t_rElem = m_rWindow.getElement("gift.message.hd")
  if objectp(t_rElem) then
    if m_sHeadline = EMPTY then
      if listp(t_ar_CardData) then
        t_sText = replaceChunks(t_ar_CardData[1], "\r", RETURN)
        t_rElem.setText(t_sText)
      end if
    else
      t_rElem.setText(m_sHeadline)
    end if
  end if
  t_rElem = m_rWindow.getElement("basic.dialog1.button1")
  if t_rElem <> 0 then
    t_rElem.setProperty(#visible, not m_bEditable)
  end if
  removeCannedField(m_rWindow.getID(), "mes.messages.messageinput")
  m_pComposeMessage = CreateCannedField(m_rWindow.getID(), "mes.messages.messageinput")
  m_pComposeMessage.setAllowFreeWords(0)
  m_pComposeMessage.setAllowFriendNames(1)
  m_pComposeMessage.setAllowEmpty(1)
  removeCannedField(m_rWindow.getID(), "gift.message.hd")
  m_rMessageHd = CreateCannedField(m_rWindow.getID(), "gift.message.hd")
  m_rMessageHd.setAllowFreeWords(0)
  m_rMessageHd.setAllowFriendNames(1)
  m_rMessageHd.setAllowEmpty(1)
  m_pComposeMessage.updateContent()
  m_rMessageHd.updateContent()
end
on createRadioButtonMenu me
  if objectExists("GiftMenuButtons") then
    removeObject("GiftMenuButtons")
  end if
  m_pRadioButtons = createObject("GiftMenuButtons", "CRadioButtonMenu")
  t_Names = ["gift.template1", "gift.template2", "gift.template3", "gift.template4"]
  t_Descriptions = [getText("hlp.problem1"), getText("hlp.problem2"), getText("hlp.problem3"), "neljä"]
  t_Elements = []
  i = 1
  repeat with t_Name in t_Names
    t_Elem = [:]
    t_Elem[#element] = t_Name
    t_Elem[#description] = t_Descriptions[i]
    t_Elements.append(t_Elem)
    i = i + 1
  end repeat
  m_pRadioButtons.setParentWindow(m_rWindow.getID())
  m_pRadioButtons.addElements(t_Elements)
  m_pRadioButtons.clickElement("gift.template" & m_BgType)
end
on SendData me
  t_mp_dataToServer = [:]
  t_mp_dataToServer.addProp(#int, m_iInventoryID)
  t_mp_dataToServer.addProp(#int, m_iRef)
  t_mp_dataToServer.addProp(#int, integer(m_BgType))
  t_bHd = 0
  if m_rMessageHd.CheckContent() then
    t_sTxt = m_rMessageHd.GetContent()
    if stringp(t_sTxt) then
      t_sTxt = ParseCannedText(t_sTxt)
    end if
    tCannedBlock = TransformCannedToMsg(t_sTxt)
    t_Length = tCannedBlock.count
    repeat with i = 1 to t_Length
      tKey = tCannedBlock.getPropAt(i)
      tvalue = tCannedBlock[i]
      t_mp_dataToServer.addProp(tKey, tvalue)
    end repeat
    t_bHd = 1
  end if
  t_bTxt = 0
  if m_pComposeMessage.CheckContent() then
    t_sTxt = m_pComposeMessage.GetContent()
    if stringp(t_sTxt) then
      t_sTxt = ParseCannedText(t_sTxt)
    end if
    tCannedBlock = TransformCannedToMsg(t_sTxt)
    t_Length = tCannedBlock.count
    repeat with i = 1 to t_Length
      tKey = tCannedBlock.getPropAt(i)
      tvalue = tCannedBlock[i]
      t_mp_dataToServer.addProp(tKey, tvalue)
    end repeat
    t_bTxt = 1
  end if
  if t_bTxt and t_bHd then
    getConnection("VMK").send("WriteGiftMessage", t_mp_dataToServer)
    removeObject(me.getID())
  end if
end
on ConfirmData me
  t_sTxtHd = m_rWindow.getElement("gift.message.hd").getText()
  t_sTxt = m_rWindow.getElement("mes.messages.messageinput").getText()
  if t_sTxtHd = EMPTY or t_sTxt = EMPTY then
    t_rDialogWnd = createDialogWindow(me.getID(), "GiftNoText", 1, 1)
    t_rDialogWnd.show()
    t_sMsg = getText("gift.text.missing")
    t_rDialogWnd.setText(t_sMsg, getText("gift.text.missing.hd"), "OK")
    return 1
  end if
  t_bHd = 0
  if m_rMessageHd.CheckContent() then
    t_bHd = 1
  end if
  t_bTxt = 0
  if m_pComposeMessage.CheckContent() then
    t_bTxt = 1
  end if
  if t_bTxt and t_bHd then
    t_rDialogWnd = createDialogWindow(me.getID(), "ConfirGiftData", 2, 1)
    t_rDialogWnd.show()
    t_sMsg = getText("gift.are.you.sure")
    t_rDialogWnd.setText(t_sMsg, getText("gift.are.you.sure.hd"), "CANCEL", "OK")
    return 1
  end if
end
on dialogWindowEvent me, a_sDialogName, a_sDialogEvent
  case a_sDialogEvent of
    #dialogOK, #dialogOK, #dialogOK:
      me.SendData()
    #dialogCancel:

  end case
end
on _GiftEventProc me, a_kEvent, a_sElemID, a_vParam, a_sID
  if not m_bLoadingImage then
    if a_kEvent = #mouseUp then
      case a_sElemID of
        "gift.template1", "gift.template2", "gift.template3", "gift.template4":
          executeMessage("PlayInterfaceSound", "UI-click")
          m_pRadioButtons.clickElement(a_sElemID)
          m_pRadioButtons.updateMenu()
          me.UpdateView(a_sElemID)
        "close", "mes.cancelcompose.button", "basic.dialog1.button1":
          removeObject(me.getID())
        "help":
          executeMessage(#open_help_page, "help.stuff.gifts", 1)
        "mes.sendmessage.button":
          me.ConfirmData()
        otherwise:
          put a_sElemID

      end case
    end if
    if a_sElemID = "mes.messages.messageinput" or a_sElemID = "gift.message.hd" then
      if a_sElemID = "mes.messages.messageinput" then
        t_pCannedField = m_pComposeMessage
      else
        t_pCannedField = m_rMessageHd
      end if
      tElem = m_rWindow.getElement(a_sElemID)
      if a_kEvent = #keyDown then
        t_iKeyCode = the keyCode
        if the key = RETURN or the key = ENTER then
          t_iKeyCode = 36
        end if
        if t_pCannedField <> 0 and tElem.pMember.editable then
          case t_iKeyCode of
            123, 124, 125, 126:
              t_pCannedField.updateContent()
              pass()
            117, 51:
              t_pCannedField.updateContent()
              pass()
            36:
              t_pass = t_pCannedField.CheckContent()
            49:
              tSelection = tElem.pMember.selection
              tCharcount = tElem.pMember.text.char.count
              if tCharcount > 0 then
                if tElem.pMember.text.char[tSelection[2]] = " " then
                  return 1
                end if
                if tSelection[2] + 1 <= tCharcount then
                  if tElem.pMember.text.char[tSelection[2] + 1] = " " then
                    return 1
                  end if
                end if
              end if
              t_pass = t_pCannedField.CheckContent()
              if t_pass then
                t_pCannedField.updateContent()
              end if
            otherwise:
              if not t_pCannedField.updateContent() then
                return 1
              end if
              tValidKeys = "abcdefghijlkmnopqrstuvwxyz0123456789_-=+?!@<>:.,'*/()[]\#;" & QUOTE
              tAscii = charToNum(the key)
              t_allow = 0
              if tAscii > 31 and tAscii < 128 then
                if tValidKeys contains the key or tValidKeys = EMPTY then
                  t_allow = 1
                end if
              end if
              if not t_allow then
                return 1
              end if

          end case
          if tElem <> 0 then
            t_iChar = tElem.pMember.text.char.count + 1
            if tElem.pMember.charPosToLoc(t_iChar).locH >= tElem.pMember.width - 10 then
              return 1
            end if
            m_ar_lastSelection = tElem.pMember.selection
          end if
        end if
      else
        if a_kEvent = #keyUp then
          t_iKeyCode = the keyCode
          if t_pCannedField <> 0 and tElem.pMember.editable then
            case t_iKeyCode of
              36, 49:
              otherwise:
                t_pCannedField.CheckWord()

            end case
            tElem = m_rWindow.getElement(a_sElemID)
            if tElem <> 0 then
              m_ar_lastSelection = tElem.pMember.selection
            end if
          end if
        end if
      end if
    end if
  else
    if a_kEvent = #mouseUp then
      case a_sElemID of
        "close":
          removeObject(me.getID())
        "help":
          executeMessage(#open_help_page, "help.stuff.gifts", 1)

      end case
    end if
  end if
end