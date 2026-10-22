-- Script
property m_windowTitle
property pTempPassword
property m_bLoginAllowed
property m_objLoadingWindow

on construct me
  m_windowTitle = "loginwindow"
  pTempPassword = []
  me.showLoginWindow()
  m_bLoginAllowed = 0
  m_objLoadingWindow = VOID
  return 1
end
on deconstruct me
  me.closeLoginWindow()
  return 1
end
on showLoginWindow me
  tWndObj = getWindow(m_windowTitle)
  if not objectp(tWndObj) then
    if not createWindow(m_windowTitle, VOID, 0, 0, #modal) then
      return error(me, "Failed to open login window!!!", #showLoginWindow)
    else
      tWndObj = getWindow(m_windowTitle)
      tWndObj.merge("vmk_modal.window")
      tWndObj.merge("vmk_login.window")
      tWndObj.registerClient(me.getID())
      tWndObj.registerProcedure(#eventProcLogin, me.getID(), #mouseUp)
      tWndObj.registerProcedure(#eventProcLogin, me.getID(), #keyDown)
      tWndObj.center()
      tField = tWndObj.getElement("login")
      tField.setFocus(1)
      t_rElem = tWndObj.getElement("basic.window.title")
      if t_rElem <> 0 then
        t_rElem.setText(getText("virtual_magic_kingdom", "Login"))
      end if
      if the runMode = "Author" or the runMode = "Projector" then
        t_sName = getPref("vmk_cached_name")
        if stringp(t_sName) then
          tWndObj.getElement("login").setText(t_sName)
        end if
        t_sPass = getPref("vmk_cached_pass")
        if stringp(t_sPass) then
          pTempPassword = []
          repeat with i = 1 to t_sPass.char.count
            pTempPassword.append(t_sPass.char[i])
          end repeat
          me.updatePassword()
        end if
        me.setButtonState("send_login", 0)
      end if
    end if
  end if
end
on closeLoginWindow me
  removeWindow(m_windowTitle)
end
on enableLogin me
  m_bLoginAllowed = 1
  me.setButtonState("send_login", 1)
end
on setButtonState me, t_elemName, t_state
  tWndObj = getWindow(m_windowTitle)
  if tWndObj <> 0 then
    t_Elem = tWndObj.getElement(t_elemName)
    if t_Elem <> 0 then
      case t_state of
        1:
          t_Elem.setProperty(#cursor, ["cursor.finger", "cursor.finger.mask"])
          t_Elem.Activate()
        0:
          t_Elem.setProperty(#cursor, #arrow)
          t_Elem.deactivate()

      end case
    end if
  end if
end
on SendLogin me
  tWndObj = getWindow(m_windowTitle)
  tField = tWndObj.getElement("login")
  tName = tField.getText()
  tPassword = EMPTY
  repeat with c in pTempPassword
    tPassword = tPassword & c
  end repeat
  if the runMode = "Author" or the runMode = "Projector" then
    setPref("vmk_cached_name", tName)
    setPref("vmk_cached_pass", tPassword)
  end if
  tCmd = 10
  tMsg = [#str: tName, #str: tPassword, #str: getMachineID()]
  if m_bLoginAllowed then
    getConnection(getVariable("main.connection.id", "VMK")).send(tCmd, tMsg)
    me.ShowLoginLoadingScreen()
  end if
end
on ShowLoginLoadingScreen this
  t_iTimeOut = getVariable("login.timeout", 180000)
  createTimeout("login_timer", t_iTimeOut, #LoginTimeout, this.getID(), VOID, 1)
  t_sHdTxt = getText("roomqueue.preloader.hd")
  m_objLoadingWindow = createObject("AuthorLoginAnim", "CLoadingWindow")
  t_mp_data = [#headline: t_sHdTxt, #showbutton: 0, #client: this.getID(), #modal: 1]
  if objectp(m_objLoadingWindow) then
    m_objLoadingWindow.DefineWindow(t_mp_data)
  end if
end
on LoadingWindowEvent this
  if textExists("game.exit.url") then
    t_sExitURL = getText("game.exit.url")
  else
    t_sExitURL = "https://secure.disney.go.com/vmk/en_US/index?name=LoginPage"
  end if
  gotoNetPage(t_sExitURL, "_self")
  if objectp(m_objLoadingWindow) then
    removeObject(m_objLoadingWindow.getID())
  end if
end
on LoginTimeout this
  if timeoutExists("login_timer") then
    removeTimeout("login_timer")
  end if
  if objectp(m_objLoadingWindow) then
    t_sInfoTxt = getText("roomqueue.preloadfailed.info")
    t_sButtonTxt = getText("roomqueue.preloader.ok")
    t_mp_data = [#showbutton: 1, #ButtonText: t_sButtonTxt, #infotext: t_sInfoTxt]
    m_objLoadingWindow.UpdateWindowdata(t_mp_data)
    m_objLoadingWindow.stopAnimation()
  end if
  return 1
end
on updatePassword me
  tElem = getWindow(m_windowTitle).getElement("password")
  tStr = EMPTY
  repeat with tChar in pTempPassword
    put "*" after tStr
  end repeat
  tElem.setText(tStr)
  set the selStart to pTempPassword.count
  set the selEnd to pTempPassword.count
  return 1
end
on eventProcLogin me, tEvent, tElemID, tParm
  tWndObj = getWindow(m_windowTitle)
  if tEvent = #mouseUp then
    case tElemID of
      "send_login":
        me.SendLogin()
      "roomqueue.preloader.ok":
        if textExists("game.exit.url") then
          t_sURL = getText(" game.exit.url")
        else
          t_sURL = getVariable("client.reload.url")
        end if
        if stringp(t_sURL) then
          gotoNetPage(t_sURL, "_self")
        end if

    end case
  else
    if tEvent = #keyDown then
      tKey = the key
      if tElemID = "login" then
        case tKey of
          TAB:
            tField = tWndObj.getElement("login")
            tField.setFocus(0)
            tField = tWndObj.getElement("password")
            tField.setFocus(1)
            set the selStart to 0
            set the selEnd to tField.getText().char.count
          RETURN:
            me.SendLogin()

        end case
      else
        if tElemID = "password" then
          case tKey of
            TAB:
              tField = tWndObj.getElement("password")
              tField.setFocus(0)
              tField = tWndObj.getElement("login")
              tField.setFocus(1)
              set the selStart to 0
              set the selEnd to tField.getText().char.count
            RETURN:
              me.SendLogin()

          end case
          case the keyCode of
            48:
              return 0
            49:
              return 1
            51:
              if pTempPassword.count > 0 then
                pTempPassword.deleteAt(pTempPassword.count)
              end if
            117:
              pTempPassword = []
            otherwise:
              tValidKeys = "abcdefghijlkmnopqrstuvwxyz0123456789_-=+?!@<>:.,"
              tAscii = charToNum(the key)
              tMaxLen = 36
              if tAscii > 31 and tAscii < 128 then
                if tValidKeys contains the key or tValidKeys = EMPTY then
                  if pTempPassword.count < tMaxLen then
                    pTempPassword.append(the key)
                  end if
                end if
              end if

          end case
          me.updatePassword()
          return 1
        end if
      end if
    end if
  end if
end