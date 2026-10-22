-- Parent Script
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
  tWndObj = getWindow(m_sWndTitle)
  if not objectp(tWndObj) then
    if not createWindow(m_sWndTitle, "vmk_pirates_ui.window") then
      return error(me, "Failed to open message bar window!!!", #showMessageBar)
    else
      tWndObj = getWindow(m_sWndTitle)
      tWndObj.registerClient(me.getID())
      tWndObj.registerProcedure(#eventProcPiratesMessageBar, me.getID(), #mouseUp)
      tWndObj.registerProcedure(#eventProcPiratesMessageBar, me.getID(), #keyDown)
      tWndObj.registerProcedure(#eventProcPiratesMessageBar, me.getID(), #keyUp)
      tWndObj.moveTo(1, (the stage).image.height - 34)
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
  me.setRedScore(0)
  me.setBlueScore(0)
end
on hideMessageBar me
  removeCannedField(m_sWndTitle, "pirates.chat.field")
  removeWindow(m_sWndTitle)
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
on setHealthIndicator me, a_iHealth
  tWndObj = getWindow(m_sWndTitle)
  if not voidp(tWndObj) then
    case a_iHealth of
      0:
        tWndObj.getElement("health1").hide()
        tWndObj.getElement("health2").hide()
        tWndObj.getElement("health3").hide()
        tWndObj.getElement("health4").hide()
        tWndObj.getElement("health5").hide()
      1:
        tWndObj.getElement("health1").show()
        tWndObj.getElement("health2").hide()
        tWndObj.getElement("health3").hide()
        tWndObj.getElement("health4").hide()
        tWndObj.getElement("health5").hide()
      2:
        tWndObj.getElement("health1").show()
        tWndObj.getElement("health2").show()
        tWndObj.getElement("health3").hide()
        tWndObj.getElement("health4").hide()
        tWndObj.getElement("health5").hide()
      3:
        tWndObj.getElement("health1").show()
        tWndObj.getElement("health2").show()
        tWndObj.getElement("health3").show()
        tWndObj.getElement("health4").hide()
        tWndObj.getElement("health5").hide()
      4:
        tWndObj.getElement("health1").show()
        tWndObj.getElement("health2").show()
        tWndObj.getElement("health3").show()
        tWndObj.getElement("health4").show()
        tWndObj.getElement("health5").hide()
      5:
        tWndObj.getElement("health1").show()
        tWndObj.getElement("health2").show()
        tWndObj.getElement("health3").show()
        tWndObj.getElement("health4").show()
        tWndObj.getElement("health5").show()

    end case
  end if
end
on setAmmoindicator me, a_iAmmo
  tWndObj = getWindow(m_sWndTitle)
  if not voidp(tWndObj) then
    case a_iAmmo of
      0:
        tWndObj.getElement("ammo1").hide()
        tWndObj.getElement("ammo2").hide()
        tWndObj.getElement("ammo3").hide()
        tWndObj.getElement("ammo4").hide()
        tWndObj.getElement("ammo5").hide()
      1:
        tWndObj.getElement("ammo1").show()
        tWndObj.getElement("ammo2").hide()
        tWndObj.getElement("ammo3").hide()
        tWndObj.getElement("ammo4").hide()
        tWndObj.getElement("ammo5").hide()
      2:
        tWndObj.getElement("ammo1").show()
        tWndObj.getElement("ammo2").show()
        tWndObj.getElement("ammo3").hide()
        tWndObj.getElement("ammo4").hide()
        tWndObj.getElement("ammo5").hide()
      3:
        tWndObj.getElement("ammo1").show()
        tWndObj.getElement("ammo2").show()
        tWndObj.getElement("ammo3").show()
        tWndObj.getElement("ammo4").hide()
        tWndObj.getElement("ammo5").hide()
      4:
        tWndObj.getElement("ammo1").show()
        tWndObj.getElement("ammo2").show()
        tWndObj.getElement("ammo3").show()
        tWndObj.getElement("ammo4").show()
        tWndObj.getElement("ammo5").hide()
      5:
        tWndObj.getElement("ammo1").show()
        tWndObj.getElement("ammo2").show()
        tWndObj.getElement("ammo3").show()
        tWndObj.getElement("ammo4").show()
        tWndObj.getElement("ammo5").show()

    end case
  end if
end
on setBroadSideStatus me, a_bState
  m_bBroadSideOn = a_bState
end
on getBroadsideStatus me
  return m_bBroadSideOn
end
on setRedScore me, a_iScore
  tWndObj = getWindow(m_sWndTitle)
  if not voidp(tWndObj) then
    tWndObj.getElement("score.red").setText(a_iScore)
  end if
end
on setBlueScore me, a_iScore
  tWndObj = getWindow(m_sWndTitle)
  if not voidp(tWndObj) then
    tWndObj.getElement("score.blue").setText(a_iScore)
  end if
end
on enableExitButton me, a_bVisible
  tWndObj = getWindow(m_sWndTitle)
  if not voidp(tWndObj) then
    if not a_bVisible then
      tWndObj.getElement("pirates.exitgame.button").hide()
    else
      tWndObj.getElement("pirates.exitgame.button").show()
    end if
  end if
end
on disableInvincibility me
  getWindow(m_sWndTitle).getElement("button.invinsibility").deactivate()
end
on dialogWindowEvent me, t_dialogName, t_dialogEvent
  case t_dialogName of
    "pirates_exit":
      case t_dialogEvent of
        #dialogOK:
          executeMessage(#SendMinigameAction, 7, [])
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
      "button.invinsibility":
        executeMessage(#SendMinigameAction, 5, [])

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