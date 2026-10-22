-- Score Script
property m_pDialogWindows
property m_pNPCDialogWindows
property m_pTutorialWindows

on construct me
  m_pDialogWindows = [:]
  m_pNPCDialogWindows = [:]
  m_pTutorialWindows = [:]
  return 1
end
on deconstruct me
  return 1
end
on Initialize this
end
on createDialogWindow me, t_clientID, t_sDialogTitle, t_dialogType, t_modal
  t_dialogWindow = createObject(t_sDialogTitle, "CDialogWindow")
  if t_dialogWindow <> 0 then
    t_dialogWindow.Init(t_clientID, t_sDialogTitle, t_dialogType, t_modal)
    m_pDialogWindows[t_sDialogTitle] = t_dialogWindow
  end if
  if t_modal and objectExists("RoomObjPlacerEventAgent") then
    getObject("RoomObjectPlacer").StopPlacement(1)
  end if
  return t_dialogWindow
end
on removeDialogWindow me, t_sDialogTitle
  t_uniqID = t_sDialogTitle
  if not voidp(m_pDialogWindows.getaProp(t_uniqID)) then
    m_pDialogWindows[t_uniqID].hide()
    m_pDialogWindows.deleteProp(t_uniqID)
    if getObject(t_uniqID) <> 0 then
      removeObject(t_uniqID)
    end if
    return 1
  end if
  return 0
end
on RemoveAllDialogWindows me
end
on ShowDialogWindows me
  repeat with t_dialog in m_pDialogWindows
  end repeat
  put m_pDialogWindows
end
on dialogExists me, t_sTitle
  return not voidp(m_pDialogWindows.getaProp(t_sTitle))
end
on createNPCDialogWindow me, t_clientID, t_sDialogTitle, t_dialogType, t_modal
  t_dialogWindow = createObject(t_sDialogTitle, "CNPCDialogWindow")
  if t_dialogWindow <> 0 then
    t_dialogWindow.Init(t_clientID, t_sDialogTitle, t_dialogType, t_modal)
    m_pNPCDialogWindows[t_sDialogTitle] = t_dialogWindow
  end if
  return t_dialogWindow
end
on RemoveNPCDialogWindow me, t_sDialogTitle
  t_uniqID = t_sDialogTitle
  if not voidp(m_pNPCDialogWindows.getaProp(t_uniqID)) then
    m_pNPCDialogWindows[t_uniqID].hide()
    m_pNPCDialogWindows.deleteProp(t_uniqID)
    if getObject(t_uniqID) <> 0 then
      removeObject(t_uniqID)
    end if
    return 1
  end if
  return 0
end
on RemoveAllNPCDialogWindows me
end
on ShowNPCDialogWindows me
  repeat with t_dialog in m_pNPCDialogWindows
  end repeat
  put m_pNPCDialogWindows
end
on NPCdialogExists me, t_sTitle
  return not voidp(m_pNPCDialogWindows.getaProp(t_sTitle))
end
on createTutorialWindow me, t_clientID, t_sDialogTitle, t_dialogType, t_modal
  t_dialogWindow = createObject(t_sDialogTitle, "CTutorialWindow")
  if t_dialogWindow <> 0 then
    t_dialogWindow.Init(t_clientID, t_sDialogTitle, t_dialogType, t_modal)
    m_pTutorialWindows[t_sDialogTitle] = t_dialogWindow
  end if
  return t_dialogWindow
end
on removeTutorialWindow me, t_sDialogTitle
  t_uniqID = t_sDialogTitle
  if not voidp(m_pTutorialWindows.getaProp(t_uniqID)) then
    m_pTutorialWindows[t_uniqID].hide()
    m_pTutorialWindows.deleteProp(t_uniqID)
    if getObject(t_uniqID) <> 0 then
      removeObject(t_uniqID)
    end if
    return 1
  end if
  return 0
end
on removeAllTutorialWindows me
end
on showTutorialWindows me
  repeat with t_dialog in m_pTutorialWindows
    put "Tutorial window" && t_dialog.m_sTutorialTitle && t_dialog
  end repeat
end
on tutorialExists me, t_sTitle
  return not voidp(m_pTutorialWindows.getaProp(t_sTitle))
end