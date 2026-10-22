-- Script
property m_sWndTitle
property m_bVisible
property m_bValidFlag
property m_sPhotoPopupWndTitle
property m_bFlashing
property m_iLastFrameFlashColor
property m_iFlashCounter
property m_iFLASHDELAY
property m_colorInput
property m_colorNonMatch
property m_bBroadSideOn
property m_iLastBS
property m_pCannedField
property m_iGameMode

on construct me
  m_sWndTitle = "PiratesMessageBar"
  m_bVisible = 0
  m_bValidFlag = 0
  m_bFlashing = 0
  m_iLastFrameFlashColor = #red
  m_iFlashCounter = 0
  m_iFLASHDELAY = 4
  m_colorInput = rgb("#EFEFEF")
  m_colorNonMatch = rgb(255, 0, 0)
  m_colorBgr = rgb(0, 0, 0)
  m_bBroadSideOn = 0
  m_iLastBS = 1
  m_pCannedField = 0
  m_iGameMode = 0
  return me.regMsgList(1)
end
on deconstruct me
  me.hideMessageBar()
  m_cCurrWord = EMPTY
  m_bValidFlag = 0
  m_ar_cWords = []
  return me.regMsgList(0)
end
on showMessageBar me
  m_iGameMode = getThread("piratesminigame").getComponent().GetGameMode()
  put "Choose Message Bar" && m_iGameMode
  tWndObj = getWindow(m_sWndTitle)
  if not objectp(tWndObj) then
    case m_iGameMode of
      1:
        t_sWindow = "vmk_pirates_ui_ctf.window"
      2:
        t_sWindow = "vmk_pirates_ui_lms.window"
      otherwise:
        t_sWindow = "vmk_pirates_ui.window"

    end case
    if not createWindow(m_sWndTitle, t_sWindow) then
      return error(me, "Failed to open message bar window!!!", #showMessageBar)
    else
      tWndObj = getWindow(m_sWndTitle)
      tWndObj.registerClient(me.getID())
      tWndObj.registerProcedure(#eventProcPiratesMessageBar, me.getID(), #mouseUp)
      tWndObj.registerProcedure(#eventProcPiratesMessageBar, me.getID(), #keyDown)
      tWndObj.registerProcedure(#eventProcPiratesMessageBar, me.getID(), #keyUp)
      tWndObj.center()
      m_bVisible = 1
      tElement = tWndObj.getElement("pirates.chat.field")
      m_colorInput = tElement.pMember.color
      m_colorBgr = tElement.getProperty(#bgColor)
    end if
  end if
  if m_pCannedField = 0 then
    m_pCannedField = CreateCannedField(m_sWndTitle, "pirates.chat.field", rgb("#EFEFEF"), rgb(255, 0, 0))
    if m_pCannedField <> 0 then
      m_pCannedField.setAllowErrors(1)
    end if
  end if
  me.enableExitButton(0)
  me.setRedScore(0, 0)
  me.setBlueScore(0, 0)
end
on hideMessageBar me
  removeCannedField(m_sWndTitle, "pirates.chat.field")
  if objectp(getWindow(m_sWndTitle)) then
    removeWindow(m_sWndTitle)
  end if
end
on showHide me
  if not m_bVisible then
    me.showMessageBar()
  else
    me.hideMessageBar()
  end if
end
on SendMessage me
  tCmd = 560
  getConnection(getVariable("main.connection.id", "VMK")).send(tCmd, TransformCannedToMsg(m_pCannedField.m_ar_cWords, 1))
  return 1
end
on SetTimerDisplay me, a_iSeconds
  tWndObj = getWindow(m_sWndTitle)
  if objectp(tWndObj) then
    t_rElem = tWndObj.getElement("gametime")
    if objectp(t_rElem) then
      tMinutes = a_iSeconds / 60
      tSeconds = a_iSeconds - 60 * tMinutes
      tText = EMPTY
      if tMinutes < 10 then
        tText = "0" & tMinutes
      else
        tText = string(tMinutes)
      end if
      tText = tText & ":"
      if tSeconds < 10 then
        tText = tText & "0" & tSeconds
      else
        tText = tText & string(tSeconds)
      end if
      t_rElem.setText(tText)
    end if
  end if
end
on setHealthIndicator me, a_iHealth
  tWndObj = getWindow(m_sWndTitle)
  if objectp(tWndObj) then
    repeat with i = 1 to 5
      t_rElem = tWndObj.getElement("health" & i)
      t_rElem.hide()
      if a_iHealth >= i then
        t_rElem.show()
      end if
    end repeat
  end if
end
on setAmmoindicator me, a_ar_Ammo
  a_iAmmo = a_ar_Ammo.count
  tWndObj = getWindow(m_sWndTitle)
  if objectp(tWndObj) then
    repeat with i = 1 to 5
      t_rElem = tWndObj.getElement("ammo" & i)
      t_rElem.hide()
      if a_iAmmo >= i then
        t_rElem.show()
        tSprite = t_rElem.getProperty(#sprite)
        if tSprite <> 0 then
          case a_ar_Ammo[i] of
            0:
              tmember = getMember("ammo.status")
            1:
              tmember = getMember("ammo.status.golden")
            otherwise:
              tmember = getMember("ammo.status")

          end case
          tSprite.member = tmember
          tSprite.width = tmember.width
          tSprite.height = tmember.height
        end if
      end if
    end repeat
  end if
end
on setBroadSideStatus me, a_bState
  m_bBroadSideOn = a_bState
end
on getBroadsideStatus me
  return m_bBroadSideOn
end
on showVault me, a_iTeam
  put "Show Vault called"
end
on setRedScore me, a_iScore
  tWndObj = getWindow(m_sWndTitle)
  if objectp(tWndObj) then
    case m_iGameMode of
      1:
        t_rElem = tWndObj.getElement("gold.portroyal")
      2:
        t_rElem = tWndObj.getElement("gold.collected")
      otherwise:
        t_rElem = tWndObj.getElement("gold.portroyal")

    end case
    if objectp(t_rElem) then
      t_rElem.setText(a_iScore)
    end if
  end if
end
on setRedVault me, a_iVault
  tWndObj = getWindow(m_sWndTitle)
  if objectp(tWndObj) then
    case m_iGameMode of
      1:
        t_rElem = tWndObj.getElement("vault.portroyal")
      2:
        t_rElem = tWndObj.getElement("gold.vault")
      otherwise:
        t_rElem = tWndObj.getElement("vault.portroyal")

    end case
    if objectp(t_rElem) then
      t_rElem.setText(a_iVault)
    end if
  end if
end
on setBlueScore me, a_iScore
  tWndObj = getWindow(m_sWndTitle)
  if objectp(tWndObj) then
    case m_iGameMode of
      1:
        t_rElem = tWndObj.getElement("gold.pirates")
      2:
        t_rElem = tWndObj.getElement("gold.collected")
      otherwise:
        t_rElem = tWndObj.getElement("gold.pirates")

    end case
    if objectp(t_rElem) then
      t_rElem.setText(a_iScore)
    end if
  end if
end
on setBlueVault me, a_iVault
  tWndObj = getWindow(m_sWndTitle)
  if objectp(tWndObj) then
    case m_iGameMode of
      1:
        t_rElem = tWndObj.getElement("vault.pirates")
      2:
        t_rElem = tWndObj.getElement("gold.vault")
      otherwise:
        t_rElem = tWndObj.getElement("vault.pirates")

    end case
    if objectp(t_rElem) then
      t_rElem.setText(a_iVault)
    end if
  end if
end
on SetTeam1Wins me, a_iWins, a_iTeam2
  tWndObj = getWindow(m_sWndTitle)
  if objectp(tWndObj) then
    t_rElem = tWndObj.getElement("stagescores")
    if objectp(t_rElem) then
      t_rElem.setText(a_iWins && "-" && a_iTeam2)
    end if
  end if
end
on SetTeam2Wins me, a_iWins, a_iTeam1
  tWndObj = getWindow(m_sWndTitle)
  if objectp(tWndObj) then
    t_rElem = tWndObj.getElement("stagescores")
    if objectp(t_rElem) then
      t_rElem.setText(a_iTeam1 && "-" && a_iWins)
    end if
  end if
end
on enableExitButton me, a_bVisible
  tWndObj = getWindow(m_sWndTitle)
  if objectp(tWndObj) then
    if not a_bVisible then
      tWndObj.getElement("pirates.exitgame.button").hide()
    else
      tWndObj.getElement("pirates.exitgame.button").show()
    end if
    t_rElem = tWndObj.getElement("pirates.dropflag.button")
    if objectp(t_rElem) then
      if not a_bVisible then
        t_rElem.hide()
      else
        t_rElem.show()
      end if
    end if
    if not a_bVisible then
      removeDialogWindow("pirates_exit")
    end if
  end if
end
on disableInvincibility me
end
on dialogWindowEvent me, t_dialogName, t_dialogEvent
  case t_dialogName of
    "pirates_exit":
      case t_dialogEvent of
        #dialogOK:
          executeMessage(#SendMinigameAction, 7, [])
          me.hideMessageBar()
        #dialogCancel:

      end case
    otherwise:
      put "Unknown Dialog Window" && t_dialogName

  end case
end
on eventProcPiratesMessageBar me, tEvent, tElemID, tParm
  tWndObj = getWindow(m_sWndTitle)
  if tEvent = #mouseUp then
    case tElemID of
      "pirates.exitgame.button":
        if not DialogWindowExists("pirates_exit") then
          t = createDialogWindow(me.getID(), "pirates_exit", 2)
          t.show()
          t.setText("Do you want to exit?", "Pirates Of The Caribbean", "No", "Yes")
        end if
      "pirates.dropflag.button":
        t_myShip = getThread("piratesminigame").getInterface().GetMyShip()
        if objectp(t_myShip) then
          if t_myShip.GetFactor().isCarryingFlag() then
            executeMessage(#SendMinigameAction, 8, [])
          end if
        end if
      "button.invinsibility":
        executeMessage(#SendMinigameAction, 5, [])
      otherwise:
        put "Debug" && tElemID

    end case
  else
    if tEvent = #keyDown then
      t_iKeyCode = the keyCode
      if the key = RETURN or the key = ENTER then
        t_iKeyCode = 36
      end if
      if m_pCannedField <> 0 then
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
        tElem = tWndObj.getElement(tElemID)
        if tElem <> 0 then
          t_iChar = tElem.pMember.text.char.count + 1
          if tElem.pMember.charPosToLoc(t_iChar).locH >= tElem.pMember.width - 10 then
            return 1
          end if
        end if
      end if
    end if
  end if
end
on setEditable me, t_bState
  tWndObj = getWindow(m_sWndTitle)
  if tWndObj <> 0 then
    tElem = tWndObj.getElement("pirates.chat.field")
    if tElem <> 0 then
      tElem.setEdit(t_bState)
    end if
  end if
end
on setText me, t_sText
  tWndObj = getWindow(m_sWndTitle)
  if tWndObj <> 0 then
    tElem = tWndObj.getElement("pirates.chat.field")
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
    me.setText("You've been muted for" && t_iTime && "seconds.")
    t_iTime = t_iTime - 1
    createTimeout("PirateMuteTimer" & the milliSeconds, 1000, #updateMute, me.getID(), t_iTime, 1)
  else
    me.setText(EMPTY)
    me.setEditable(1)
  end if
end
on ChatAvatarMuted me, tMsg
  tMuteTime = tMsg.connection.GetIntFrom()
  me.Mute(tMuteTime)
end
on regMsgList me, tBool
  tConnection = getVariable("main.connection.id", "VMK")
  tMsgs = [:]
  tMsgs.setaProp(2561, #ChatAvatarMuted)
  if tBool then
    registerListener(tConnection, me.getID(), tMsgs)
  else
    unregisterListener(tConnection, me.getID(), tMsgs)
  end if
  return 1
end