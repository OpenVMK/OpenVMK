-- Script
property m_rWndObj
property m_mpCatalogData
property m_mpRooms
property m_iRoomNum
property m_iRoomsCount
property m_mp_DataToServer
property m_rRoomNameField
property m_rRoomDescField
property m_bRoomDescOK
property m_bRoomNAmeOK
property m_iMyRoomID
property m_rDialogWindow
property m_sRoomName
property m_sRoomDesc
property m_iBalance
property m_bEnoughCredits

on construct this
  m_rWndObj = VOID
  m_mpRooms = VOID
  m_iRoomNum = 0
  m_rRoomNameField = VOID
  m_rRoomDescField = VOID
  m_bRoomDescOK = VOID
  m_bRoomNAmeOK = VOID
  m_iMyRoomID = VOID
  m_rDialogWindow = VOID
  m_mp_DataToServer = [:]
  return 1
end
on deconstruct this
  m_rWndObj = VOID
  m_rRoomNameField = VOID
  m_rRoomDescField = VOID
  m_bRoomDescOK = VOID
  m_bRoomNAmeOK = VOID
  m_iMyRoomID = VOID
  m_rDialogWindow = VOID
  m_bEnoughCredits = VOID
  return 1
end
on merge this, a_rWindow
  m_rWndObj = a_rWindow
  return m_rWndObj.merge("vmk_cat_rooms.window")
end
on Purge this, a_rWindow
  if objectp(m_rWndObj) then
    m_rWndObj = VOID
    return a_rWindow.unmerge()
  else
    return 1
  end if
end
on SetCategory this, a_sTab
  put a_sTab
end
on update this, a_mpCatalogData, a_kAlteredCategory
  m_mpCatalogData = a_mpCatalogData
  t_sName = getText("cat.name.10")
  case a_kAlteredCategory of
    "balance":
      this.UpdateBalance()
    "roomId":
      m_iMyRoomID = a_mpCatalogData["roomId"].id
      this.CreateRoomCreatedWindow(m_iMyRoomID)
    VOID:
      this.UpdateBalance()

  end case
end
on SaveRooms this, a_mpRoomList
  if listp(a_mpRoomList) then
    m_mpRooms = a_mpRoomList
    m_iRoomsCount = m_mpRooms[1].count
    this._ChangeNum(1)
  end if
end
on ShowRooms this
  if listp(m_mpRooms) then
    t_RoomID = m_mpRooms[1][m_iRoomNum].code
    if memberExists("rooms.bg." & t_RoomID) then
      t_Img = getMember("rooms.bg." & t_RoomID).image.duplicate()
    end if
    if not voidp(t_Img) then
      m_rWndObj.getElement("cat.rooms.preview").feedImage(t_Img)
    else
      put "Missing :" && "rooms.bg." & t_RoomID
    end if
    t_sPrice = string(m_mpRooms[1][m_iRoomNum].price)
    m_rWndObj.getElement("cat.item.prize").setText(t_sPrice)
    t_sInfoHd = getText("RoomDescHd." & t_RoomID)
    m_rWndObj.getElement("cat.room.infohd").setText(t_sInfoHd)
    t_sInfoTxt = getText("RoomDescTxt." & t_RoomID)
    m_rWndObj.getElement("cat.room.info").setText(t_sInfoTxt)
    if textExists("roomLand." & t_RoomID) then
      t_sLandName = getText("roomLand." & t_RoomID)
      t_img2 = getMember("logo." & t_sLandName)
    end if
    if not voidp(t_Img) and not voidp(t_img2) then
      t_Img = t_img2.image.duplicate()
      t_iDestW = m_rWndObj.getElement("land.logo").getProperty(#width)
      t_iDestH = m_rWndObj.getElement("land.logo").getProperty(#height)
      t_img2 = image(t_iDestW, t_iDestH, 32)
      t_img2.copyPixels(t_Img, t_img2.rect, t_Img.rect)
      m_rWndObj.getElement("land.logo").feedImage(t_img2)
    end if
  end if
end
on UpdateBalance this
  if objectp(m_rWndObj) then
    if listp(m_mpCatalogData) then
      m_iBalance = m_mpCatalogData["balance"]
      if not voidp(m_iBalance) then
        t_sTxt = string(m_iBalance) && getText("cat.credits")
        m_rWndObj.getElement("cat.credits.amount").setText(t_sTxt)
      else
        getConnection(getVariable("main.connection.id", "VMK")).send("RequestBalance")
      end if
    end if
  end if
end
on _ChangeNum this, a_iDir
  m_iRoomNum = m_iRoomNum + a_iDir
  if m_iRoomNum > m_iRoomsCount then
    m_iRoomNum = 1
  end if
  if m_iRoomNum < 1 then
    m_iRoomNum = m_iRoomsCount
  end if
  this.ShowRooms()
end
on _BuyRoom this
  t_iPrice = m_mpRooms[1][m_iRoomNum].price
  if m_iBalance - t_iPrice >= 0 then
    m_bEnoughCredits = 1
  else
    m_bEnoughCredits = 0
  end if
  if m_bEnoughCredits = 0 then
    t_rDialogWnd = createDialogWindow(this.getID(), "NotEnoughCredits", 1, 1)
    t_rDialogWnd.show()
    t_sMsg = getText("cat.not.enough.credits")
    t_rDialogWnd.setText(t_sMsg, getText("cat.not.enough.credits.hd"), "OK")
    return 1
  end if
  m_mp_DataToServer = [:]
  t_ID = m_mpRooms[1][m_iRoomNum].code
  t_CatID = value(m_mpRooms.getPropAt(1))
  m_mp_DataToServer.addProp(#int, t_ID)
  m_mp_DataToServer.addProp(#int, t_CatID)
  this.CreateRoomNameWindow()
end
on CancelRoomBuy
  t_sWndName = "RoomNameWnd"
  if windowExists(t_sWndName) then
    removeWindow(t_sWndName)
  end if
end
on CreateRoomNameWindow this
  t_sWndName = "RoomNameWnd"
  if not createWindow(t_sWndName, "vmk_modal.window", 0, 0, #modal) then
    return error(this, "Failed to create room name window!!!", #CreateRoomNameWindow)
  else
    t_rWindow = getWindow(t_sWndName)
    t_rWindow.merge("vmk_cat_rooms_step1.window")
    t_rWindow.registerClient(this.getID())
    t_rWindow.registerProcedure(#_EventProc, this.getID(), #mouseDown)
    t_rWindow.registerProcedure(#_EventProc, this.getID(), #keyDown)
  end if
  t_sTxt = getText("create.room.hd")
  t_rWindow.getElement("basic.window.title").setText(t_sTxt)
  m_rRoomNameField = CreateCannedField(t_sWndName, "reg.roomname.input")
  m_rRoomDescField = CreateCannedField(t_sWndName, "reg.roomdescription.input")
  m_rRoomNameField.setAllowFreeWords(0)
  m_rRoomDescField.setAllowFreeWords(0)
  m_rRoomNameField.setAllowFriendNames(0)
  m_rRoomDescField.setAllowFriendNames(0)
  m_rRoomNameField.setAllowOwnName(1)
  m_rRoomDescField.setAllowOwnName(1)
end
on CreateRoomCreatedWindow this, a_mp_RoomData
  t_sWndName = "RoomNameWnd"
  if not createWindow(t_sWndName, "vmk_modal.window", 0, 0, #modal) then
    return error(this, "Failed to create room name window!!!", #CreateRoomCreatedWindow)
  else
    t_rWindow = getWindow(t_sWndName)
    t_rWindow.merge("vmk_cat_rooms_step2.window")
    t_rWindow.registerClient(this.getID())
    t_rWindow.registerProcedure(#_EventProc, this.getID(), #mouseDown)
    t_rWindow.getElement("cat.createroom.name").setText(m_sRoomName)
    t_rWindow.getElement("cat.roomdescription.text").setText(m_sRoomDesc)
    t_sName = getObject(#session).get("name")
    t_rWindow.getElement("cat.username").setText(t_sName)
    t_sTxt = getText("room.created.hd")
    t_rWindow.getElement("basic.window.title").setText(t_sTxt)
  end if
end
on _GoToNewRoom this
  if not voidp(m_iMyRoomID) then
    getConnection(getVariable("main.connection.id", "VMK")).send(31, [#integer: m_iMyRoomID, #integer: -1])
    t_rWindow = getWindow("RoomNameWnd")
    t_rWindow.close()
    executeMessage(#ui_catalog)
  else
    put "No room ID!!"
  end if
end
on _NextStep this
  t_sWndName = "RoomNameWnd"
  t_rWindow = getWindow("RoomNameWnd")
  if t_rWindow.elementExists("reg.roomname.input") then
    t_sRoomName = t_rWindow.getElement("reg.roomname.input").getText()
    if t_sRoomName.length > 30 then
      t = createDialogWindow(this.getID(), "CheckRoomNameLength", 1, 1)
      t.show()
      t_sMsg = getText("reg.roomname.toolong")
      t.setText(t_sMsg, "Error", "OK")
      m_rRoomNameField.CheckContent()
      m_rRoomDescField.CheckContent()
      return 0
    end if
  end if
  if t_rWindow.elementExists("reg.roomdescription.input") then
    t_sRoomDesc = t_rWindow.getElement("reg.roomdescription.input").getText()
    if t_sRoomDesc.length > 255 and t_sRoomDesc <> EMPTY then
      t = createDialogWindow(this.getID(), "CheckRoomNameLength", 1, 1)
      t.show()
      t_sMsg = getText("reg.roomdesc.toolong")
      t.setText(t_sMsg, "Error", "OK")
      m_rRoomNameField.CheckContent()
      m_rRoomDescField.CheckContent()
      return 0
    end if
  end if
  i = 0
  m_rRoomDescField.setAllowEmpty(1)
  m_bRoomNAmeOK = m_rRoomNameField.CheckContent()
  m_bRoomDescOK = m_rRoomDescField.CheckContent()
  m_rDialogWindow = createDialogWindow(this.getID(), "RoomCreationError", 1, 1)
  if m_bRoomNAmeOK then
    i = i + 1
  else
    t_sTxt = getText("cat.check.name")
    m_rDialogWindow.show()
    m_rDialogWindow.setText(t_sTxt, "Room Creation Error", "OK")
    m_rRoomNameField.CheckContent()
    m_rRoomDescField.CheckContent()
  end if
  if m_bRoomDescOK then
    i = i + 1
  else
    t_sTxt = getText("cat.check.desc")
    m_rDialogWindow.show()
    m_rDialogWindow.setText(t_sTxt, "Room Creation Error", "OK")
    m_rRoomNameField.CheckContent()
    m_rRoomDescField.CheckContent()
  end if
  if i >= 2 then
    t_rWindow = getWindow(t_sWndName)
    t_rElementName = t_rWindow.getElement("reg.roomname.input")
    t_rElementDesc = t_rWindow.getElement("reg.roomdescription.input")
    m_sRoomName = t_rElementName.getText()
    m_sRoomDesc = t_rElementDesc.getText()
    t_sTxtName = m_rRoomNameField.GetContent()
    if stringp(t_sTxtName) then
      t_sTxtName = ParseCannedText(t_sTxtName)
    end if
    t_arName = m_rRoomNameField.GetContent()
    t_iNameCount = t_sTxtName.count
    tCannedBlock = TransformCannedToMsg(t_sTxtName)
    repeat with i = 1 to tCannedBlock.count
      tKey = tCannedBlock.getPropAt(i)
      tvalue = tCannedBlock[i]
      m_mp_DataToServer.addProp(tKey, tvalue)
    end repeat
    t_sTxtDesc = m_rRoomDescField.GetContent()
    if stringp(t_sTxtDesc) then
      t_sTxtDesc = ParseCannedText(t_sTxtDesc)
    end if
    t_sTxtDesc = m_rRoomDescField.GetContent()
    t_iDescCount = t_sTxtDesc.count
    tCannedBlock2 = TransformCannedToMsg(t_sTxtDesc)
    repeat with i = 1 to tCannedBlock2.count
      tKey2 = tCannedBlock2.getPropAt(i)
      tValue2 = tCannedBlock2[i]
      m_mp_DataToServer.addProp(tKey2, tValue2)
    end repeat
    t_rWindow.close()
    if windowExists("MessageBar") then
      if getWindow("MessageBar").elementExists("chat.field") then
      end if
    end if
    getConnection(getVariable("main.connection.id", "VMK")).send("BUY_ROOM", m_mp_DataToServer)
  end if
end
on dialogWindowEvent this, t_dialogName, t_dialogEvent
  removeDialogWindow("RoomCreationError")
end
on _EventProc this, a_kEvent, a_sElem, a_vParam
  t_rWindow = getWindow("RoomNameWnd")
  if a_kEvent = #mouseDown then
    case a_sElem of
      "cat.previous.button":
        this._ChangeNum(-1)
      "cat.next.button":
        this._ChangeNum(1)
      "cat.buy.button":
        this._BuyRoom()
      "cat.rooms.nextstep.button":
        this._NextStep()
      "cat.rooms.goto.button":
        this._GoToNewRoom()
      "cat.rooms.dontbuy.button":
        this.CancelRoomBuy()
      "cat.rooms.continue.button":
        removeWindow("RoomNameWnd")

    end case
  end if
  if a_kEvent = #keyDown then
    if a_sElem = "reg.roomname.input" then
      case the keyCode of
        123, 124, 125, 126:
          m_rRoomNameField.updateContent()
          pass()
        117, 51:
          m_rRoomNameField.updateContent()
          pass()
        36:
          t_pass = m_rRoomNameField.CheckContent()
          if t_pass then
            m_bRoomNAmeOK = 1
          end if
          return 1
        49:
          tElem = t_rWindow.getElement(a_sElem)
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
          t_pass = m_rRoomNameField.CheckContent()
          if t_pass then
            m_rRoomNameField.updateContent()
          end if
        otherwise:
          if not m_rRoomNameField.updateContent() then
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
      t_iMaxlength = 30
      tElem = t_rWindow.getElement(a_sElem)
      if tElem <> 0 then
        if tElem.pMember.text.char.count >= t_iMaxlength then
          tElem.pMember.text = tElem.pMember.char[1..t_iMaxlength]
          t = createDialogWindow(this.getID(), "CheckNameLength", 1, 1)
          t.show()
          t_sMsg = getText("reg.roomname.toolong")
          t.setText(t_sMsg, "Error", "OK")
          m_rRoomNameField.CheckContent()
          m_rRoomDescField.CheckContent()
          return 1
        end if
      end if
    end if
    if a_sElem = "reg.roomdescription.input" then
      case the keyCode of
        123, 124, 125, 126:
          m_rRoomDescField.updateContent()
          pass()
        117, 51:
          m_rRoomDescField.updateContent()
          pass()
        36:
          t_pass = m_rRoomDescField.CheckContent()
          if t_pass then
            m_bRoomDescOK = 1
          end if
          return 1
        49:
          tElem = t_rWindow.getElement(a_sElem)
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
          t_pass = m_rRoomDescField.CheckContent()
          if t_pass then
            m_rRoomDescField.updateContent()
          end if
        otherwise:
          if not m_rRoomDescField.updateContent() then
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
      t_iMaxlength = 255
      tElem = t_rWindow.getElement(a_sElem)
      if tElem <> 0 then
        if tElem.pMember.text.char.count >= t_iMaxlength then
          tElem.pMember.text = tElem.pMember.char[1..t_iMaxlength]
          t = createDialogWindow(this.getID(), "CheckNameLength", 1, 1)
          t.show()
          t_sMsg = getText("reg.roomdesc.toolong")
          t.setText(t_sMsg, "Error", "OK")
          m_rRoomNameField.CheckContent()
          m_rRoomDescField.CheckContent()
          return 1
        end if
      end if
    end if
  else
    if a_kEvent = #keyUp then
      if a_sElem = "reg.roomname.input" then
        if m_rRoomNameField <> 0 then
          case the keyCode of
            36, 49:
            otherwise:
              m_rRoomNameField.CheckWord()

          end case
        end if
      end if
      if a_sElem = "reg.roomdescription.input" then
        if m_rRoomDescField <> 0 then
          case the keyCode of
            36, 49:
            otherwise:
              m_rRoomDescField.CheckWord()

          end case
        end if
      end if
    end if
  end if
end