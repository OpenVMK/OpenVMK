-- Script
property m_rWindow
property m_ar_components
property m_rGrid
property m_ar_magics

on construct me
  m_rGrid = createObject(#random, "CGenericThumbnailGrid")
  m_ar_components = [:]
  m_ar_components.sort()
  m_rWindow = VOID
  m_ar_magics = VOID
  return 1
end
on deconstruct me
  removeObject(m_rGrid.getID())
  m_rGrid = VOID
  if objectp(m_rWindow) then
    me.Purge(m_rWindow)
  end if
  repeat with t_rComponent in m_ar_components
    removeObject(t_rComponent.getID())
  end repeat
  return 1
end
on merge me, a_rWindow
  m_rWindow = a_rWindow
  t_bSuccess = m_rWindow.merge("vmk_quest_magics.window")
  t_rTitleElem = m_rWindow.getElement("quest.dialog.hd")
  if t_rTitleElem <> 0 then
    t_rTitleElem.setText(getText("quest.dialog.hd.magics"))
  end if
  m_rGrid.render([], m_rWindow.getElement("quest.magics"))
  me.cachedData([])
  return t_bSuccess
end
on Purge me, a_rWindow
  if objectp(m_rWindow) then
    m_rWindow = VOID
    return a_rWindow.unmerge()
  else
    return 1
  end if
end
on update me, a_mp_kType_mp_iRef_rItem, a_kAlteredCategory
  if objectp(m_rWindow) then
    if a_kAlteredCategory = #step2 then
    end if
  end if
end
on cachedData me, t_ar_data
  m_ar_magics = getAvailableMagics()
  t_mp_ThumbsData = [:]
  if listp(m_ar_magics) then
    repeat with i = 1 to m_ar_magics.count
      t_mp_ThumbsData.addProp(m_ar_magics[i].id, VOID)
    end repeat
  end if
  executeMessage("GetPinThumbnail", t_mp_ThumbsData, [#client: me.getID(), #method: #_PinThumbsReadyCbk])
end
on rawData me, t_ar_data
  me.cachedData([])
  t_rManager = me.getManager()
  if objectp(t_rManager) then
    t_ar_results = [:]
    t_ar_results[#taskType] = t_ar_data[#taskType]
    t_rManager.appendSubResult(t_ar_results)
  end if
end
on _PinThumbsReadyCbk this, a_mp_iType_rThumb
  if objectp(m_rWindow) then
    t_ar_rThumbs = []
    t_iCount = a_mp_iType_rThumb.count
    repeat with i = 1 to t_iCount
      t_rThumb = a_mp_iType_rThumb[i]
      t_rStar = getMember("inv.pin.star.thumb").image
      t_rRect = t_rStar.rect
      if voidp(t_rThumb) then
        t_rThumb = image(1, 1, 32)
      else
        t_rThumb = t_rThumb.duplicate()
      end if
      t_ar_rThumbs.add([#thumbnail: t_rThumb, #blend: 100])
    end repeat
    m_rGrid.render(t_ar_rThumbs, m_rWindow.getElement("quest.magics"))
  end if
end
on _EventProc me, a_kEvent, a_sElemID, a_vParam
  tWndObj = m_rWindow
  t_rManager = me.getManager()
  if a_kEvent = #mouseUp then
    case a_sElemID of
      "quest.magics":
        m_rGrid.MouseSelection(a_vParam)
      "mes.accept.button":
        t_bDataOK = 0
        t_rSelected = m_rGrid.GetSelected()
        if not voidp(t_rSelected) then
          t_ar_results = [:]
          t_ar_results[#magicEffectCode] = m_ar_magics[t_rSelected][#id]
          if objectp(t_rManager) then
            t_rManager.appendSubResult(t_ar_results)
            t_rManager.resolveSubtask()
            t_rManager.Activate()
          end if
          t_bDataOK = 1
        end if
        if not t_bDataOK then
          t_txt = getText("quest.alert.magic.missing")
          t_title = getText("quest.alert.title")
          t_btn1 = getText("quest.alert.ok")
          t = createDialogWindow(me.getID(), "quest.alert.magic", 1, 1)
          t.setText(t_txt, t_title, t_btn1)
          t.show()
        end if
      "close", "quest.quit", "mes.deny.button":
        t_rManager = me.getManager()
        if objectp(t_rManager) then
          t_rManager.cancelSubtask()
          t_rManager.Activate()
        end if
      "help":
        executeMessage("PlayInterfaceSound", "UI-click")
        executeMessage(#open_help_page, getText("help.quest.addtask", getText("help.quest", "help.quest")), 1)
      otherwise:
        put "Subtask.Magics.event:" && a_sElemID

    end case
  end if
end