-- Script
property m_rWindow
property m_ar_components
property m_iCurrentID
property m_iCurrentSelection

on construct me
  m_iCurrentID = -1
  m_iCurrentSelection = -1
  m_ar_components = [:]
  m_ar_components.sort()
  m_rWindow = VOID
  registerMessage(#photo_catalog_redraw, me.getID(), #reDraw)
  return 1
end
on deconstruct me
  unregisterMessage(#photo_catalog_redraw, me.getID())
  if objectp(getThread(#PhotoCatalog).getInterface().m_rThumblist) then
    getThread(#PhotoCatalog).getInterface().m_rThumblist.m_dimHorz = 4
  end if
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
  t_bSuccess = m_rWindow.merge("vmk_quest_selectphoto.window")
  t_rTitleElem = m_rWindow.getElement("quest.dialog.hd")
  if t_rTitleElem <> 0 then
    t_rTitleElem.setText(getText("quest.dialog.hd.selectphoto"))
  end if
  me.reDraw()
  updateStage()
  return t_bSuccess
end
on reDraw me
  getThread(#PhotoCatalog).getInterface().readthumbs()
  getThread(#PhotoCatalog).getInterface().m_rThumblist.m_dimHorz = 3
  getThread(#PhotoCatalog).getInterface().readthumbs()
  t_rThumbs = getThread(#PhotoCatalog).getInterface().m_rThumblist.render()
  t_iLower = getThread(#PhotoCatalog).getInterface().m_iOffset
  t_iUpper = t_iLower + 9
  t_rBorderCol = rgb(80, 160, 216)
  t_iTbSize = point(80, 53)
  if m_iCurrentSelection >= t_iLower and m_iCurrentSelection < t_iUpper then
    t_iSelection = m_iCurrentSelection - t_iLower
    t_pIndex = point(t_iSelection mod 3, t_iSelection / 3)
    t_pIndex[1] = t_pIndex[1] * t_iTbSize[1] + t_pIndex[1] * 4
    t_pIndex[2] = t_pIndex[2] * t_iTbSize[2] + t_pIndex[2] * 4
    t_rRect = rect(t_pIndex, t_pIndex + t_iTbSize)
    t_rThumbs.draw(t_rRect, [#color: t_rBorderCol, #shapeType: #rect, #lineSize: 2])
  end if
  m_rWindow.getElement("fto.thumbs.grid").feedImage(t_rThumbs)
end
on getClickedIndex me
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
on rawData me, t_ar_data
  put "Fill blanks (Select Photo)"
end
on _EventProc me, a_kEvent, a_sElemID, a_vParam
  tWndObj = m_rWindow
  if a_kEvent = #mouseUp then
    case a_sElemID of
      "fto.thumbs.grid":
        t_iCurrentID = getThread(#PhotoCatalog).getInterface().m_rThumblist.getClickedID(a_vParam)
        if not voidp(t_iCurrentID) then
          m_iCurrentID = t_iCurrentID
          t_iGridIndex = point(0, 0)
          t_iGridIndex[1] = a_vParam[1] / (80 + 4)
          t_iGridIndex[2] = a_vParam[2] / (53 + 4)
          t_iIndex = t_iGridIndex[1] + t_iGridIndex[2] * 3
          m_iCurrentSelection = getThread(#PhotoCatalog).getInterface().m_iOffset + t_iIndex
          me.reDraw()
        end if
      "fto.nextpage.button":
        if getThread(#PhotoCatalog).getComponent().GetPhotos().count > getThread(#PhotoCatalog).getInterface().m_iOffset + getThread(#PhotoCatalog).getInterface().m_rThumblist.getMaxCount() then
          getThread(#PhotoCatalog).getInterface().m_iOffset = getThread(#PhotoCatalog).getInterface().m_iOffset + getThread(#PhotoCatalog).getInterface().m_rThumblist.getMaxCount()
          me.reDraw()
        end if
      "fto.previouspage.button":
        if getThread(#PhotoCatalog).getInterface().m_iOffset >= getThread(#PhotoCatalog).getInterface().m_rThumblist.getMaxCount() then
          getThread(#PhotoCatalog).getInterface().m_iOffset = getThread(#PhotoCatalog).getInterface().m_iOffset - getThread(#PhotoCatalog).getInterface().m_rThumblist.getMaxCount()
          me.reDraw()
        end if
      "mes.accept.button":
        t_ar_results = [#photoId: m_iCurrentID]
        t_rManager = me.getManager()
        if objectp(t_rManager) then
          t_rManager.appendSubResult(t_ar_results)
          t_rManager.resolveSubtask()
          t_rManager.Activate()
        end if
      "close", "quest.quit", "mes.deny.button":
        t_rManager = me.getManager()
        if objectp(t_rManager) then
          t_rManager.cancelSubtask()
          t_rManager.Activate()
        end if
      "help":
        executeMessage("PlayInterfaceSound", "UI-click")
        executeMessage(#open_help_page, getText("help.quest.photo", getText("help.quest", "help.quest")), 1)
      otherwise:
        put "Subtask.SelectPhoto.event:" && a_sElemID

    end case
  end if
end