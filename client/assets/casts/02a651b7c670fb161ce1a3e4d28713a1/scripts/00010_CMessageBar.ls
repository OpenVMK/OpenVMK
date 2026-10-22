-- Script
property m_sWndTitle
property m_sPhotoPopupWndTitle
property m_bVisible
property m_pCannedField
property m_mp_ButtonElements
property m_ar_lastSelection

on construct me
  m_sWndTitle = "MessageBar"
  m_sPhotoPopupWndTitle = "PhotoPopup"
  m_pCannedField = 0
  m_bVisible = 0
  registerMessage("SetButtonStates", me.getID(), #MessageBarStates)
  m_mp_ButtonElements = [#Info: "chatbar.info", #navigator: "chatbar.navigator", #inventory: "chatbar.inventory", #Messenger: "chatbar.messenger", #shop: "chatbar.shop", #emoticon: "chatbar.emoticons", #magic: "chatbar.magics", #camera: "chatbar.camera", #avatar: "chatbar.avatar", #settings: "chatbar.settings", #Help: "chatbar.help", #exit: "chatbar.exit", #chat: "chat.field", #quest: "chatbar.quest"]
  registerMessage("room_tile_selection", me.getID(), #ClosePhotoPopup)
  registerMessage(#hide_camera, me.getID(), #ClosePhotoPopup)
  registerMessage(#room_leave, me.getID(), #ClosePhotoPopup)
  return 1
end
on deconstruct me
  unregisterMessage("room_tile_selection", me.getID())
  unregisterMessage(#hide_camera, me.getID())
  unregisterMessage("SetButtonStates")
  unregisterMessage(#room_leave)
  me.hideMessageBar()
  return 1
end
on update this
  if (the environment).productVersion = "10.2" then
    if (the environment).productBuildVersion = "21" then
      if keyPressed(BACKSPACE) then
        this.HandleKeyPressed(BACKSPACE)
      end if
      if keyPressed(123) then
        this.HandleKeyPressed(123)
      end if
      if keyPressed(124) then
        this.HandleKeyPressed(124)
      end if
      if keyPressed(126) then
        this.HandleKeyPressed(126)
      end if
      if keyPressed(125) then
        this.HandleKeyPressed(125)
      end if
    end if
  end if
end
on showMessageBar me
  getConnection(getVariable("main.connection.id", "VMK")).send(767)
  tWndObj = getWindow(m_sWndTitle)
  if not objectp(tWndObj) then
    if not createWindow(m_sWndTitle, "vmk_chatbar.window") then
      return error(me, "Failed to open message bar window!!!", #showMessageBar)
    else
      tWndObj = getWindow(m_sWndTitle)
      tWndObj.registerClient(me.getID())
      tWndObj.registerProcedure(#eventProcMessageBar, me.getID(), #mouseUp)
      tWndObj.registerProcedure(#eventProcMessageBar, me.getID(), #keyDown)
      tWndObj.registerProcedure(#eventProcMessageBar, me.getID(), #keyUp)
      tWndObj.moveTo(0, (the stage).image.height - 28)
      m_bVisible = 1
    end if
  end if
  if m_pCannedField = 0 then
    m_pCannedField = CreateCannedField(m_sWndTitle, "chat.field", rgb("#EFEFEF"), rgb(255, 0, 0))
    if m_pCannedField <> 0 then
      m_pCannedField.setAllowErrors(1)
    end if
  end if
  if (the environment).productVersion = "10.2" then
    if (the environment).productBuildVersion = "21" then
      receiveUpdate(me.getID())
    end if
  end if
end
on TogglePhotoPopup me
  if not windowExists(m_sPhotoPopupWndTitle) then
    if not createWindow(m_sPhotoPopupWndTitle, "vmk_photo_popup.window") then
      return error(me, "Failed to open photo popup window!!!", #showMessageBar)
    else
      tWndObj = getWindow(m_sPhotoPopupWndTitle)
      tWndObj.registerClient(me.getID())
      tWndObj.registerProcedure(#eventProcPhotoPopup, me.getID(), #mouseUp)
      tWndObj.moveTo(661, 500)
      tWndObj.show()
      executeMessage("close_Magic")
      executeMessage("close_Emoticons")
    end if
  else
    removeWindow(m_sPhotoPopupWndTitle)
  end if
end
on ClosePhotoPopup me
  if windowExists(m_sPhotoPopupWndTitle) then
    removeWindow(m_sPhotoPopupWndTitle)
  end if
end
on hideMessageBar me
  removeWindow(m_sWndTitle)
  me.ClosePhotoPopup()
  removeUpdate(me.getID())
end
on showHide me
  if not m_bVisible then
    me.showMessageBar()
  else
    me.hideMessageBar()
  end if
end
on MessageBarStates me, a_mp_States
  if windowExists(m_sWndTitle) then
    t_r_WndObj = getWindow(m_sWndTitle)
    if a_mp_States.getPropAt(1) = #all then
      t_iState = a_mp_States[1]
      repeat with e = 1 to m_mp_ButtonElements.count
        t_sID = m_mp_ButtonElements.getPropAt(e)
        t_sElem = m_mp_ButtonElements[e]
        if t_sID = #chat then
          t_r_WndObj.getElement(t_sElem).setEdit(t_iState)
          if t_iState = 1 then
            t_r_WndObj.getElement(t_sElem).pMember.selection = m_ar_lastSelection
          else
            t_r_WndObj.getElement(t_sElem).setFocus(0)
          end if
          next repeat
        end if
        if t_iState = 1 then
          t_r_WndObj.getElement(t_sElem).Activate()
          next repeat
        end if
        t_r_WndObj.getElement(t_sElem).deactivate()
      end repeat
    else
      repeat with i = 1 to a_mp_States.count
        t_sID = a_mp_States.getPropAt(i)
        t_sElem = m_mp_ButtonElements[t_sID]
        if t_r_WndObj.elementExists(t_sElem) then
          if t_sID = #chat then
            t_r_WndObj.getElement(t_sElem).setEdit(a_mp_States[i])
            if a_mp_States[i] = 1 then
              t_r_WndObj.getElement(t_sElem).pMember.selection = m_ar_lastSelection
            else
              t_r_WndObj.getElement(t_sElem).setFocus(0)
            end if
            next repeat
          end if
          if a_mp_States[i] = 1 then
            t_r_WndObj.getElement(t_sElem).Activate()
            next repeat
          end if
          t_r_WndObj.getElement(t_sElem).deactivate()
        end if
      end repeat
    end if
  end if
end
on setEditable me, t_bState
  if not (getObject(#session).get("IsTrading") = 1) then
    tWndObj = getWindow(m_sWndTitle)
    if tWndObj <> 0 then
      tElem = tWndObj.getElement("chat.field")
      if tElem <> 0 then
        tElem.setEdit(t_bState)
        if t_bState then
          tElem.pMember.selection = m_ar_lastSelection
        else
          tElem.setFocus(0)
        end if
      end if
    end if
  end if
end
on setText me, t_sText
  tWndObj = getWindow(m_sWndTitle)
  if tWndObj <> 0 then
    tElem = tWndObj.getElement("chat.field")
    if tElem <> 0 then
      tElem.setText(t_sText)
    end if
  end if
end
on Mute me, t_iTime
  me.updateMute(t_iTime)
  me.setEditable(0)
end
on updateMute me, t_iTime
  if t_iTime > 0 then
    me.setText("You're typing text too fast, continue in" && t_iTime && "seconds.")
    t_iTime = t_iTime - 1
    createTimeout(#executeOnce & the milliSeconds, 1000, #updateMute, me.getID(), t_iTime, 1)
  else
    me.setText(EMPTY)
    me.setEditable(1)
  end if
end
on eventProcPhotoPopup me, tEvent, tElemID, tParm
  tWndObj = getWindow(m_sPhotoPopupWndTitle)
  if tEvent = #mouseUp then
    case tElemID of
      "camera.takephoto.button":
        executeMessage(#ui_camera)
        me.TogglePhotoPopup()
      "camera.opencatalog.button":
        executeMessage(#ui_photocatalog)
        me.TogglePhotoPopup()
      "close":
        me.TogglePhotoPopup()
      "help":
        executeMessage(#open_help_page, "help.stuff.camera")

    end case
  end if
end
on ConfirmExit me
  t_rDialogWnd = createDialogWindow(me.getID(), "ConfirmExit", 2, 1)
  t_rDialogWnd.show()
  t_sMsg = getText("exit.vmk.confirm")
  t_sBtn1 = getText("exit.ok")
  t_sBtn2 = getText("exit.cancel")
  t_rDialogWnd.setText(t_sMsg, getText("exit.vmk.confirm.hd"), t_sBtn2, t_sBtn1)
end
on dialogWindowEvent this, a_sDialogName, a_sDialogEvent
  if a_sDialogName = "ConfirmExit" then
    case a_sDialogEvent of
      #dialogOK:
        if textExists("game.exit.url") then
          t_sExitURL = getText("game.exit.url")
          gotoNetPage(t_sExitURL, "_self")
        end if
      #dialogCancel:

    end case
  end if
end
on SendMessage me, t_ar_cWords
  tCmd = 560
  getConnection(getVariable("main.connection.id", "VMK")).send(tCmd, TransformCannedToMsg(t_ar_cWords, 1))
  return 1
end
on eventProcMessageBar me, tEvent, tElemID, tParm
  tWndObj = getWindow(m_sWndTitle)
  tElem = tWndObj.getElement(tElemID)
  if tEvent = #mouseUp then
    case tElemID of
      "chatbar.info":
        executeMessage(#ui_roominfo)
      "chatbar.avatar":
        executeMessage("ui_AvatarBuilder")
      "chatbar.settings":
        executeMessage("ui_Settings")
      "chatbar.inventory":
        executeMessage(#ui_inventory)
      "chatbar.messenger":
        executeMessage(#ui_messenger)
      "chatbar.navigator":
        executeMessage(#ui_navigator)
      "chatbar.help":
        executeMessage(#ui_help)
      "chatbar.camera":
        me.TogglePhotoPopup()
      "chatbar.emoticons":
        executeMessage("ui_Emoticons")
      "chatbar.magics":
        executeMessage("ui_Magic")
      "chatbar.shop":
        executeMessage("ui_catalog")
      "chatbar.quest":
        executeMessage("ui_questengine")
      "chatbar.exit":
        me.ConfirmExit()

    end case
  else
    if tEvent = #keyDown then
      t_iKeyCode = the keyCode
      if the key = RETURN or the key = ENTER then
        t_iKeyCode = 36
      end if
      if m_pCannedField <> 0 and tElem.pMember.editable then
        case t_iKeyCode of
          123, 124, 125, 126:
            m_pCannedField.updateContent()
            pass()
          117, 51:
            m_pCannedField.updateContent()
            pass()
          36:
            t_pass = m_pCannedField.CheckContent()
            if t_pass then
              me.SendMessage(m_pCannedField.m_ar_cWords)
              m_pCannedField.reset()
            end if
            return 1
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
            t_pass = m_pCannedField.CheckContent()
            if t_pass then
              m_pCannedField.updateContent()
            end if
          otherwise:
            if not m_pCannedField.updateContent() then
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
      if tEvent = #keyUp then
        t_iKeyCode = the keyCode
        if m_pCannedField <> 0 and tElem.pMember.editable then
          case t_iKeyCode of
            36, 49:
            otherwise:
              m_pCannedField.CheckWord()

          end case
          tElem = tWndObj.getElement(tElemID)
          if tElem <> 0 then
            m_ar_lastSelection = tElem.pMember.selection
          end if
        end if
      end if
    end if
  end if
end
on HandleKeyPressed this, a_iKey
  if windowExists(m_sWndTitle) then
    t_rWndObj = getWindow(m_sWndTitle)
    t_rField = t_rWndObj.getElement(m_mp_ButtonElements.chat).pMember
    if t_rField.editable then
      if m_pCannedField <> 0 then
        case a_iKey of
          BACKSPACE:
            t_sText = t_rField.text
            delete char -30000 of t_sText
            t_rField.text = t_sText
            m_pCannedField.updateContent()
          123:
            m_pCannedField.updateContent()
          124:
            m_pCannedField.updateContent()
          125:
            m_pCannedField.updateContent()
          126:
            m_pCannedField.updateContent()

        end case
      end if
    end if
  end if
end
on hideCameraIcon me
  tWndObj = getWindow(m_sWndTitle)
  if tWndObj <> 0 then
    tWndObj.getElement("chatbar.camera").hide()
  end if
end
on ShowCameraIcon me
  tWndObj = getWindow(m_sWndTitle)
  if tWndObj <> 0 then
    tWndObj.getElement("chatbar.camera").show()
  end if
end