-- Script
property m_windowTitle
property m_currentView
property m_pRadioButtons
property m_pHelpMenu
property m_rHelpField
property m_bModal

on construct me
  m_windowTitle = "Help Window"
  m_currentView = "vmk_hlp_topics.window"
  m_pRadioButtons = VOID
  m_pHelpMenu = VOID
  registerMessage(#Initialize, me.getID(), #InitializeObject)
  registerMessage(#open_help_page, me.getID(), #openHelpPage)
  registerMessage(#call_for_help_report, me.getID(), #callForHelpReport)
  m_rHelpField = VOID
  m_bModal = 0
  return 1
end
on deconstruct me
  tWndObj = getWindow(m_windowTitle)
  if tWndObj <> 0 then
    removeWindow(tWndObj.getID())
  end if
  if not voidp(m_pHelpMenu) then
    removeObject(m_pHelpMenu.getID())
  end if
  if not voidp(m_rHelpField) then
    removeObject(m_rHelpField.getID())
  end if
  return 1
end
on update this
  if keyPressed(BACKSPACE) then
    t_rWindow = getWindow(m_windowTitle)
    if objectp(t_rWindow) then
      t_rElement = t_rWindow.getElement("hlp.harrasser.input")
      if objectp(t_rElement) then
        t_rSprite = t_rElement.getProperty(#sprite)
        if the keyboardFocusSprite = t_rSprite.spriteNum then
          t_rField = t_rSprite.member
          t_sText = t_rField.text
          delete char -30000 of t_sText
          t_rField.text = t_sText
        end if
      end if
    end if
  end if
end
on InitializeObject me
  m_pHelpMenu = createObject("Help Menu", "CHelpMenu")
  m_pHelpMenu.pContent.setWindowTitle(m_windowTitle)
end
on showHelp me
  m_pHelpMenu.render()
  me.changeView(m_currentView)
end
on hideHelp me
  removeWindow(m_windowTitle)
end
on callForHelpReport me, t_sReportedAvatarName
  if not me.getComponent().m_visible then
    me.getComponent().showHideHelp()
  end if
  me.changeView("vmk_hlp_askmods.window")
  tWndObj = getWindow(m_windowTitle)
  if tWndObj <> 0 then
    tElem = tWndObj.getElement("hlp.harrasser.input")
    if tElem <> 0 then
      tElem.setText(t_sReportedAvatarName)
    end if
  end if
end
on openHelpPage me, t_sHelpPage, t_bModal
  m_bModal = t_bModal
  if not me.getComponent().m_visible then
    me.getComponent().showHideHelp()
  end if
  me.m_pHelpMenu.inactivateAllCategories()
  me.m_pHelpMenu.searchNode(t_sHelpPage)
  me.changeView("vmk_hlp_topics.window", t_sHelpPage)
  t_offset = me.m_pHelpMenu.getCurrentOffset()
  me.UpdateScrollBar(t_offset)
end
on changeView me, i_sWindowName, t_sHelpPage
  tWndObj = getWindow(m_windowTitle)
  tLastView = m_currentView
  if t_sHelpPage contains "trading" or m_bModal then
    if tWndObj <> 0 then
      removeWindow(m_windowTitle)
      tWndObj = 0
    end if
    t_windowMode = #modal
  else
    t_windowMode = #normal
  end if
  if tWndObj = 0 then
    if not createWindow(m_windowTitle, "vmk_hlp.window", VOID, VOID, t_windowMode) then
      return error(me, "Failed to open help window!!!", #changeView)
    else
      tWndObj = getWindow(m_windowTitle)
      tWndObj.registerClient(me.getID())
      tWndObj.registerProcedure(#eventProcHelp, me.getID(), #mouseUp)
      tWndObj.registerProcedure(#eventProcHelp, me.getID(), #mouseDown)
      tWndObj.registerProcedure(#eventProcHelp, me.getID(), #keyDown)
      tWndObj.registerProcedure(#eventProcHelp, me.getID(), #keyUp)
      tWndObj.merge(m_currentView)
      me.showSelectedTab("topics")
    end if
  else
    if tLastView <> i_sWindowName then
      tWndObj.unmerge()
    end if
  end if
  if tLastView <> i_sWindowName then
    tWndObj.merge(i_sWindowName)
  end if
  m_currentView = i_sWindowName
  case m_currentView of
    "vmk_hlp_topics.window":
      me.showSelectedTab("topics")
      tIndexField = tWndObj.getElement("hlp.topicslist")
      tContentField = tWndObj.getElement("hlp.answerslist")
      tIndexField.feedImage(m_pHelpMenu.getImage())
      tContentField.feedImage(m_pHelpMenu.pContent.getImage())
    "vmk_hlp_askmods.window":
      me.showSelectedTab("askmods")
      if voidp(m_pRadioButtons) then
        me.createRadioButtonMenu()
      end if
      m_pRadioButtons.inactivateOld()
      m_pRadioButtons.updateMenu()
      me.createWebLinks()
      if m_rHelpField = 0 then
        m_rHelpField = CreateCannedField(m_windowTitle, "hlp.describe.input")
      end if
      tWndObj.getElement("hlp.alertmod.button").deactivate()

  end case
end
on createRadioButtonMenu me
  m_pRadioButtons = createObject("Help Radio Button Menu", "CRadioButtonMenu")
  t_Names = ["hlp.problem1.button", "hlp.problem2.button", "hlp.problem3.button"]
  t_Descriptions = [getText("hlp.problem1"), getText("hlp.problem2"), getText("hlp.problem3")]
  t_Elements = []
  i = 1
  repeat with t_Name in t_Names
    t_Elem = [:]
    t_Elem[#element] = t_Name
    t_Elem[#description] = t_Descriptions[i]
    t_Elements.append(t_Elem)
    i = i + 1
  end repeat
  m_pRadioButtons.setParentWindow(m_windowTitle)
  m_pRadioButtons.addElements(t_Elements)
end
on createWebLinks me
  tWndObj = getWindow(m_windowTitle)
  t_sText = getText("hlp.questions.info")
  t_sText = replaceChunks(t_sText, "%VMK.com%", "VMK.com")
  t_sText = replaceChunks(t_sText, "%contact%", "contact")
  tWndObj.getElement("hlp.questions.info").setText(t_sText)
end
on showSelectedTab me, t_tab
  tWndObj = getWindow(m_windowTitle)
  case t_tab of
    "topics":
      removeUpdate(me.getID())
      tWndObj.getElement("hlp.tab.topics.active").show()
      tWndObj.getElement("hlp.tab.askmods.active").hide()
    "askmods":
      tWndObj.getElement("hlp.tab.topics.active").hide()
      tWndObj.getElement("hlp.tab.askmods.active").show()
      if (the environment).productVersion = "10.2" then
        if (the environment).productBuildVersion = "21" then
          receiveUpdate(me.getID())
        end if
      end if

  end case
end
on UpdateScrollBar me, t_offset
  tWndObj = getWindow(m_windowTitle)
  if not voidp(t_offset) then
    tScrollbar = tWndObj.getElement("hlp.scrollbar1")
    call(#setScrollOffset, tScrollbar, t_offset)
  end if
  tScrollbar = tWndObj.getElement("hlp.scrollbar2")
  call(#setScrollOffset, tScrollbar, 0)
end
on eventProcHelp me, tEvent, tElemID, tParm
  tWndObj = getWindow(m_windowTitle)
  if tEvent = #mouseDown then
  else
    if tEvent = #mouseUp then
      case tElemID of
        "hlp.tab.topics.passive":
          executeMessage("PlayInterfaceSound", "popup-tab-change")
          me.changeView("vmk_hlp_topics.window")
          me.UpdateScrollBar()
        "hlp.tab.askmods.passive":
          executeMessage("PlayInterfaceSound", "popup-tab-change")
          me.changeView("vmk_hlp_askmods.window")
        "hlp.nextpage.button":
          executeMessage("PlayInterfaceSound", "UI-click")
          me.m_pHelpMenu.pContent.nextPage()
          me.changeView("vmk_hlp_topics.window")
          me.UpdateScrollBar()
        "hlp.previouspage.button":
          executeMessage("PlayInterfaceSound", "UI-click")
          me.m_pHelpMenu.pContent.previousPage()
          me.changeView("vmk_hlp_topics.window")
          me.UpdateScrollBar()
        "hlp.topicslist":
          executeMessage("PlayInterfaceSound", "UI-click")
          m_pHelpMenu.clickMenu(tParm.locV)
          me.changeView("vmk_hlp_topics.window")
          me.UpdateScrollBar()
        "hlp.answerslist":
          put "Click page" && tParm
          t_clickOnLink = m_pHelpMenu.pContent.clickPage(tParm)
          if t_clickOnLink then
            me.changeView("vmk_hlp_topics.window")
          end if
        "hlp.problem1", "hlp.problem2", "hlp.problem3":
          executeMessage("PlayInterfaceSound", "UI-click")
          m_pRadioButtons.clickElement(tElemID & ".button")
          m_pRadioButtons.updateMenu()
          me.checkActivateCallforhelp()
        "hlp.problem1.button", "hlp.problem2.button", "hlp.problem3.button":
          executeMessage("PlayInterfaceSound", "UI-click")
          m_pRadioButtons.clickElement(tElemID)
          m_pRadioButtons.updateMenu()
          me.checkActivateCallforhelp()
        "hlp.cancel.button":
          executeMessage("PlayInterfaceSound", "UI-click")
          tWndObj.getElement("hlp.harrasser.input").setText(EMPTY)
          tWndObj.getElement("hlp.describe.input").setText(EMPTY)
          m_pRadioButtons.clickElement("hlp.problem3.button")
          m_pRadioButtons.updateMenu()
          executeMessage("PlayInterfaceSound", "close-popup")
          removeUpdate(me.getID())
          me.getComponent().showHideHelp()
        "hlp.alertmod.button":
          executeMessage("PlayInterfaceSound", "UI-click")
          me.checkCallForHelp()
        "close":
          executeMessage("PlayInterfaceSound", "close-popup")
          removeUpdate(me.getID())
          me.getComponent().showHideHelp()

      end case
    else
      if tEvent = #keyDown then
        if tElemID = "hlp.describe.input" then
          if m_rHelpField <> 0 then
            case the keyCode of
              123, 124, 125, 126:
                m_rHelpField.updateContent()
                pass()
              117, 51:
                m_rHelpField.updateContent()
                pass()
              36:
                t_pass = m_rHelpField.CheckContent()
                if t_pass then
                  m_rHelpField.updateContent()
                  m_bHelpContentOk = 1
                end if
              49:
                tElem = tWndObj.getElement(tElemID)
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
                t_pass = m_rHelpField.CheckContent()
                if t_pass then
                  m_rHelpField.updateContent()
                end if
              otherwise:
                if not m_rHelpField.updateContent() then
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
                tElem = tWndObj.getElement(tElemID)
                if tElem <> 0 then
                  if tElem.pMember.text.char.count >= 255 then
                    t_txt = getText("mes.msgtoolong.text")
                    t_title = getText("mes.msgtoolong.title")
                    t_btn1 = getText("mes.msgtoolong.OK")
                    t = createDialogWindow(me.getID(), "mes.msgtoolong.dialog", 1, 1)
                    t.setText(t_txt, t_title, t_btn1)
                    t.show()
                    tElem.pMember.text = tElem.pMember.char[1..255]
                    return 1
                  end if
                  me.checkActivateCallforhelp()
                end if

            end case
          end if
        end if
      else
        if tEvent = #keyUp then
          if tElemID = "hlp.describe.input" then
            if m_rHelpField <> 0 then
              case the keyCode of
                36, 49:
                otherwise:
                  m_rHelpField.CheckWord()

              end case
            end if
            me.checkActivateCallforhelp()
          end if
        end if
      end if
    end if
  end if
end
on checkActivateCallforhelp this
  tWndObj = getWindow(m_windowTitle)
  t_txt2 = tWndObj.getElement("hlp.describe.input").getText()
  if m_pRadioButtons.getActiveElementID() >= 0 and t_txt2.char.count > 0 then
    tWndObj.getElement("hlp.alertmod.button").Activate()
  else
    tWndObj.getElement("hlp.alertmod.button").deactivate()
  end if
end
on checkCallForHelp me
  tWndObj = getWindow(m_windowTitle)
  t_txt2 = tWndObj.getElement("hlp.describe.input").getText()
  if t_txt2 = EMPTY then
    t_pHelpDialog = createDialogWindow(me.getID(), "noDescriptionDialog", 1, 1)
    t_pHelpDialog.show()
    t_pHelpDialog.setText(getText("hlp.dialog.noDescription.text"), getText("hlp.dialog.noDescription.title"), getText("hlp.dialog.noDescription.btnConfirm"))
  else
    if m_rHelpField.CheckContent() then
      t_pHelpDialog = createDialogWindow(me.getID(), "call_for_help_confirm.dialog", 2, 1)
      t_pHelpDialog.show()
      t_pHelpDialog.setText(getText("hlp.dialog.confirmSend.text"), getText("hlp.dialog.confirmSend.title"), getText("hlp.dialog.confirmSend.btnCancel"), getText("hlp.dialog.confirmSend.btnConfirm"))
    else
      t_pHelpDialog = createDialogWindow(me.getID(), "IllegalWordsInDescriptionDialog", 1, 1)
      t_pHelpDialog.show()
      t_pHelpDialog.setText(getText("hlp.dialog.illegalWords.text"), getText("hlp.dialog.illegalWords.title"), getText("hlp.dialog.illegalWords.btnConfirm"))
    end if
  end if
end
on checkCallForHelpOLD me
  tWndObj = getWindow(m_windowTitle)
  t_txt2 = tWndObj.getElement("hlp.describe.input").getText()
  if t_txt2 = EMPTY then
    t_pHelpDialog = createDialogWindow(me.getID(), "noDescriptionDialog", 1, 1)
    t_pHelpDialog.show()
    t_pHelpDialog.setText(getText("hlp.dialog.noDescription.text"), getText("hlp.dialog.noDescription.title"), getText("hlp.dialog.noDescription.btnConfirm"))
  else
    t_bOK = 1
    t_oldDelim = the itemDelimiter
    the itemDelimiter = " "
    repeat with i = 1 to t_txt2.item.count
      tItem = t_txt2.item[i]
      if tItem.length > 20 then
        if tItem.char[1..7] = "http://" or tItem.char[1..4] = "www." then
          t_bOK = 1
          next repeat
        end if
        t_bOK = 0
      end if
    end repeat
    the itemDelimiter = t_oldDelim
    if t_bOK then
      t_pHelpDialog = createDialogWindow(me.getID(), "call_for_help_confirm.dialog", 2, 1)
      t_pHelpDialog.show()
      t_pHelpDialog.setText(getText("hlp.dialog.confirmSend.text"), getText("hlp.dialog.confirmSend.title"), getText("hlp.dialog.confirmSend.btnCancel"), getText("hlp.dialog.confirmSend.btnConfirm"))
    else
      t_pHelpDialog = createDialogWindow(me.getID(), "IllegalWordsInDescriptionDialog", 1, 1)
      t_pHelpDialog.show()
      t_pHelpDialog.setText(getText("hlp.dialog.illegalWords.text"), getText("hlp.dialog.illegalWords.title"), getText("hlp.dialog.illegalWords.btnConfirm"))
    end if
  end if
end
on dialogWindowEvent me, t_dialogName, t_dialogEvent
  put "Dialog Window Event" && [t_dialogName, t_dialogEvent]
  tWndObj = getWindow(m_windowTitle)
  case t_dialogName of
    "call_for_help_confirm.dialog":
      case t_dialogEvent of
        #dialogOK:
          if tWndObj <> 0 then
            t_txt1 = tWndObj.getElement("hlp.harrasser.input").getText()
            t_txt2 = m_rHelpField.GetContent()
            me.getHandler().callForHelp(m_pRadioButtons.getActiveElementID(), t_txt2, t_txt1)
            executeMessage(#open_help_page, "help.messaging.control")
          end if

      end case

  end case
end