-- Script
property m_pMickeyList
property m_sHiddenMickeyDetailWindowTitle

on construct this
  m_pMickeyList = VOID
  m_sHiddenMickeyDetailWindowTitle = "Hidden Mickey Details"
  registerMessage("ShowHMDetailWindow", this.getID(), #showHiddenMickeyDetailsWindow)
  return 1
end
on deconstruct this
  unregisterMessage("ShowHMDetailWindow", this.getID())
  return 1
end
on showHiddenMickeyDetailsWindow me, a_true
  a_true = 1
  if a_true then
    if windowExists(m_sHiddenMickeyDetailWindowTitle) then
      getWindow(m_sHiddenMickeyDetailWindowTitle).setProperty(#visible, 1)
    else
      if createWindow(m_sHiddenMickeyDetailWindowTitle, "vmk_basic.window") then
        if getWindow(m_sHiddenMickeyDetailWindowTitle).merge("vmk_hidden_mickey_details.window") then
          tWndObj = getWindow(m_sHiddenMickeyDetailWindowTitle)
          tWndObj.registerClient(me.getID())
          tWndObj.registerProcedure(#EventProcHMDetails, me.getID(), #mouseDown)
          tWndObj.center()
          if voidp(m_pMickeyList) then
            m_pMickeyList = createObject("VMKCenterMickeyDetailsList", "HMMickeyDetailsList")
          end if
          if voidp(m_pMickeyList) then
            return 0
          else
            m_pMickeyList.SetItemWidth(tWndObj.getElement("hm.details").getProperty(#width))
            m_pMickeyList.SetItemHeight(16)
            m_pMickeyList.setClientElement(tWndObj.getElement("hm.details"))
            me.DrawHMDetailsList()
          end if
          tElem = tWndObj.getElement("basic.window.title")
          if tElem <> 0 then
            tElem.setText(getText("hm.info.window.title"))
          end if
        else
          error(me, "Failed to merge HM Details window", #showHiddenMickeyDetailsWindow)
        end if
      else
        error(me, "Failed to create HM Details window", #showHiddenMickeyDetailsWindow)
      end if
    end if
    getConnection("VMK").send("RequestHiddenMickeyList")
  else
    removeWindow(m_sHiddenMickeyDetailWindowTitle)
  end if
end
on DrawHMDetailsList me
  if not voidp(m_pMickeyList) then
    m_pMickeyList.render()
    tWndObj = getWindow(m_sHiddenMickeyDetailWindowTitle)
    if tWndObj <> 0 then
      tWndObj.getElement("hm.details").feedImage(m_pMickeyList.getImage())
    end if
  end if
end
on updateMickeyList me, i_ar_FoundMickeys
  if not voidp(m_pMickeyList) then
    m_pMickeyList.createTopics(i_ar_FoundMickeys)
    me.DrawHMDetailsList()
  end if
end
on EventProcHMDetails me, tEvent, tElemID, tParm
  t_rWindow = getWindow(m_sHiddenMickeyDetailWindowTitle)
  if tEvent = #mouseDown then
    case tElemID of
      "close", "hm.ok.button", "hm.cancel.button":
        executeMessage("PlayInterfaceSound", "close-popup")
        removeWindow(m_sHiddenMickeyDetailWindowTitle)
      "help":
        executeMessage("PlayInterfaceSound", "UI-click")
        executeMessage(#open_help_page, "help.explore.mickey")
      "hm.details":
        m_pMickeyList.click(tParm)
        me.DrawHMDetailsList()
      otherwise:
        put tElemID

    end case
  end if
end