-- Script
property m_roomEventSprites
property m_sHiddenMickeyWndTitle
property m_sQuestWindowTitle
property m_sHiddenMickeyDetailWindowTitle
property m_pMickeyList
property m_sHerbieWindowTitle

on construct me
  m_sHiddenMickeyWndTitle = "Hidden Mickey Central"
  m_sHiddenMickeyDetailWindowTitle = "Hidden Mickey Details"
  m_sQuestWindowTitle = "VMK Central Quest Window"
  m_sHerbieWindowTitle = "HerbieWindow"
  registerMessage(#room_ready, me.getID(), #initRoom)
  m_roomEventSprites = []
  m_pMickeyList = VOID
  t_HiddenMickeyQuest = getThread("HiddenMickeyQuest")
  if t_HiddenMickeyQuest <> 0 then
    t_HiddenMickeyQuest.getHandler().RequestHiddenMickeyStatus()
  end if
  registerMessage(#HiddenMickeyQuestStatus, me.getID(), #setMickeyQuestButtonState)
  return 1
end
on deconstruct me
  if windowExists(m_sHiddenMickeyWndTitle) then
    removeWindow(m_sHiddenMickeyWndTitle)
  end if
  if windowExists(m_sHiddenMickeyDetailWindowTitle) then
    removeWindow(m_sHiddenMickeyDetailWindowTitle)
  end if
  if windowExists(m_sQuestWindowTitle) then
    removeWindow(m_sQuestWindowTitle)
  end if
  if windowExists(m_sHerbieWindowTitle) then
    removeWindow(m_sHerbieWindowTitle)
  end if
  unregisterMessage(#room_ready, me.getID(), #initNPC)
  repeat with tSprite in m_roomEventSprites
    removeEventBroker(tSprite.spriteNum)
  end repeat
  tObject = getObject("VMKCenterMickeyDetailsList")
  if tObject <> 0 then
    removeObject(tObject.getID())
  end if
  return 1
end
on initRoom me
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  tNode = tRoomContext.Search("NAME", "central_1_cl")
  tSprite = tNode.GetVisual().getSprite()
  tSprite.loc = tSprite.loc
  t_roomEventSprite = sprite(tSprite)
  setEventBroker(t_roomEventSprite.spriteNum, "central_1_cl")
  t_roomEventSprite.registerProcedure(#eventProcRoom, me.getID(), #mouseDown)
  t_roomEventSprite.cursor = [getMember("cursor.finger"), getMember("cursor.finger.mask")]
  m_roomEventSprites.append(t_roomEventSprite)
  tNode = tRoomContext.Search("NAME", "camera_click")
  tSprite = tNode.GetVisual().getSprite()
  tSprite.loc = tSprite.loc
  t_roomEventSprite = sprite(tSprite)
  setEventBroker(t_roomEventSprite.spriteNum, "camera_click")
  t_roomEventSprite.registerProcedure(#eventProcRoom, me.getID(), #mouseDown)
  t_roomEventSprite.cursor = [getMember("cursor.finger"), getMember("cursor.finger.mask")]
  m_roomEventSprites.append(t_roomEventSprite)
  tNode = tRoomContext.Search("SPRITE", "vmk_quest_click")
  if tNode <> 0 then
    tSprite = tNode.GetVisual().getSprite()
    if tSprite <> 0 then
      tSprite.loc = tSprite.loc
      t_roomEventSprite = sprite(tSprite)
      setEventBroker(t_roomEventSprite.spriteNum, "vmk_quest_click")
      t_roomEventSprite.registerProcedure(#eventProcRoom, me.getID(), #mouseDown)
      t_roomEventSprite.cursor = [getMember("cursor.finger"), getMember("cursor.finger.mask")]
      m_roomEventSprites.append(t_roomEventSprite)
    else
      put "Could not find the quest node sprite"
    end if
  else
    put "Could not find the quest node"
  end if
  tNode = tRoomContext.Search("SPRITE", "vmk_quest_click_b")
  if tNode <> 0 then
    tSprite = tNode.GetVisual().getSprite()
    if tSprite <> 0 then
      tSprite.loc = tSprite.loc
      t_roomEventSprite = sprite(tSprite)
      setEventBroker(t_roomEventSprite.spriteNum, "vmk_quest_click_b")
      t_roomEventSprite.registerProcedure(#eventProcRoom, me.getID(), #mouseDown)
      t_roomEventSprite.cursor = [getMember("cursor.finger"), getMember("cursor.finger.mask")]
      m_roomEventSprites.append(t_roomEventSprite)
    else
      put "Could not find the quest node sprite"
    end if
  else
    put "Could not find the quest node"
  end if
end
on showQuestWindow me, a_true
  if a_true then
    if windowExists(m_sQuestWindowTitle) then
      getWindow(m_sQuestWindowTitle).setProperty(#visible, 1)
    else
      if createWindow(m_sQuestWindowTitle, "vmk_basic.window") then
        if getWindow(m_sQuestWindowTitle).merge("vmk_quest.window") then
          tWndObj = getWindow(m_sQuestWindowTitle)
          tWndObj.registerClient(me.getID())
          tWndObj.registerProcedure(#EventProcQuestWindow, me.getID(), #mouseDown)
          tElem = tWndObj.getElement("basic.window.title")
          if tElem <> 0 then
            tElem.setText(getText("quest.title"))
          end if
        else
          error(me, "Failed to merge Quest window", #showQuestWindow)
        end if
      else
        error(me, "Failed to create Quest window", #showQuestWindow)
      end if
    end if
  else
    removeWindow(m_sQuestWindowTitle)
  end if
end
on setMickeyQuestButtonState me, t_arHiddenMickeyStatus
  tWndObj = getWindow(m_sHiddenMickeyWndTitle)
  t_bShowDetails = 1
  t_txt = getText("hm.info.text")
  t_txt_append = EMPTY
  if t_arHiddenMickeyStatus.foundMickeys = 0 then
    t_bShowDetails = 0
    t_txt_append = getText("hm.info.mickeys.none")
  else
    if t_arHiddenMickeyStatus.foundMickeys = 1 then
      t_txt_append = getText("hm.info.mickeys.one")
      t_txt_append = replaceChunks(t_txt_append, "%foundMickeys%", t_arHiddenMickeyStatus.foundMickeys)
    else
      if t_arHiddenMickeyStatus.foundMickeys = t_arHiddenMickeyStatus.totalMickeys then
        t_txt_append = getText("hm.info.mickeys.all")
      else
        t_txt_append = getText("hm.info.mickeys.amount")
        t_txt_append = replaceChunks(t_txt_append, "%foundMickeys%", t_arHiddenMickeyStatus.foundMickeys)
      end if
    end if
  end if
  tElem = tWndObj.getElement("hm.info.text")
  if tElem <> 0 then
    tElem.setText(t_txt & RETURN & RETURN & t_txt_append)
  end if
  if t_bShowDetails then
    me.setButtonState(m_sHiddenMickeyWndTitle, "hm.mickeydetail.button", 1)
  else
    me.setButtonState(m_sHiddenMickeyWndTitle, "hm.mickeydetail.button", 0)
  end if
end
on showHiddenMickeyWindow me, a_true
  t_HiddenMickeyQuest = getThread("HiddenMickeyQuest")
  if t_HiddenMickeyQuest <> 0 then
    t_HiddenMickeyQuest.getHandler().RequestHiddenMickeyStatus()
  end if
  if a_true then
    if windowExists(m_sHiddenMickeyWndTitle) then
      getWindow(m_sHiddenMickeyWndTitle).setProperty(#visible, 1)
    else
      if createWindow(m_sHiddenMickeyWndTitle, "vmk_basic.window") then
        if getWindow(m_sHiddenMickeyWndTitle).merge("vmk_hidden_mickey.window") then
          tWndObj = getWindow(m_sHiddenMickeyWndTitle)
          tWndObj.registerClient(me.getID())
          tWndObj.registerProcedure(#EventProcHiddenMickey, me.getID(), #mouseDown)
          t_HMThread = getThread("HiddenMickeyQuest")
          if t_HMThread <> 0 then
            t_arHiddenMickeyStatus = t_HMThread.getComponent().getQuestStatus()
            t_txt = getText("hm.info.text")
            t_txt_append = EMPTY
            t_bShowDetails = 1
            if t_arHiddenMickeyStatus.foundMickeys = 0 then
              t_bShowDetails = 0
              t_txt_append = getText("hm.info.mickeys.none")
            else
              if t_arHiddenMickeyStatus.foundMickeys = 1 then
                t_txt_append = getText("hm.info.mickeys.one")
                t_txt_append = replaceChunks(t_txt_append, "%foundMickeys%", t_arHiddenMickeyStatus.foundMickeys)
              else
                if t_arHiddenMickeyStatus.foundMickeys = t_arHiddenMickeyStatus.totalMickeys then
                  t_txt_append = getText("hm.info.mickeys.all")
                else
                  t_txt_append = getText("hm.info.mickeys.amount")
                  t_txt_append = replaceChunks(t_txt_append, "%foundMickeys%", t_arHiddenMickeyStatus.foundMickeys)
                end if
              end if
            end if
            tElem = tWndObj.getElement("hm.info.text")
            if tElem <> 0 then
              tElem.setText(t_txt & RETURN & RETURN & t_txt_append)
            end if
            tElem = tWndObj.getElement("basic.window.title")
            if tElem <> 0 then
              tElem.setText(getText("hm.info.window.title"))
            end if
            if t_bShowDetails then
              me.setButtonState(m_sHiddenMickeyWndTitle, "hm.mickeydetail.button", 1)
            else
              me.setButtonState(m_sHiddenMickeyWndTitle, "hm.mickeydetail.button", 0)
            end if
          end if
        else
          error(me, "Failed to merge instructions to Hidden Mickey window", #showSignUpWindow)
        end if
      else
        error(me, "Failed to create Hidden Mickey window", #showSignUpWindow)
      end if
    end if
  else
    removeWindow(m_sHiddenMickeyWndTitle)
  end if
end
on setButtonState me, t_windowTitle, t_elemName, t_state
  tWndObj = getWindow(t_windowTitle)
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
on eventProcRoom me, tEvent, tElemID, tParm
  put "VMK Central mouseDown" && [tEvent, tElemID, tParm]
  if tEvent = #mouseDown then
    case tElemID of
      "vmk_quest_click", "vmk_quest_click_b":
        me.showQuestWindow(1)
      "hidden_mickey", "central_1_cl":
        me.showHiddenMickeyWindow(1)
      "camera_click":
        me.getHandler().cashRegisterClicked()
      "herbie_click_area":
        me.getHandler().RiverAdClicked()

    end case
  end if
end
on EventProcHiddenMickey me, tEvent, tElemID, tParm
  if tEvent = #mouseDown then
    case tElemID of
      "close", "hm.ok.button":
        executeMessage("PlayInterfaceSound", "close-popup")
        removeWindow(m_sHiddenMickeyWndTitle)
      "help":
        executeMessage("PlayInterfaceSound", "UI-click")
        executeMessage(#open_help_page, "help.explore.mickey")
      "hm.starthm.button":
        executeMessage("PlayInterfaceSound", "UI-click")
        put "Start the Hidden Mickey Quest"
      "hm.mickeydetail.button":
        executeMessage("ShowHMDetailWindow")
      otherwise:
        put "VMK Central Hidden Mickey window" && [tEvent, tElemID, tParm]

    end case
  end if
end
on EventProcQuestWindow me, tEvent, tElemID, tParm
  if tEvent = #mouseDown then
    case tElemID of
      "close":
        executeMessage("PlayInterfaceSound", "close-popup")
        removeWindow(m_sQuestWindowTitle)
      "help":
        executeMessage("PlayInterfaceSound", "UI-click")
        executeMessage(#open_help_page, "help.quests.central")
      "quest.vmksite":
        executeMessage("PlayInterfaceSound", "UI-click")
        t_sURL = getText("quest.vmksite.url")
        if t_sURL = 0 then
        else
          gotoNetPage(t_sURL, "_new")
        end if

    end case
  end if
end