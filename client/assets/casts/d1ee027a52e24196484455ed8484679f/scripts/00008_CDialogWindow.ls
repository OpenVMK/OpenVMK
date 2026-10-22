-- Behavior
on createDialogWindow
  if the paramCount < 2 then
    return 0
  end if
  t_iObjID = param(1)
  t_sDialogID = param(2)
  if the paramCount > 2 then
    t_iType = param(3)
  end if
  if the paramCount > 3 then
    t_bModal = param(4)
  end if
  if DialogWindowExists(t_sDialogID) then
    removeDialogWindow(t_sDialogID)
  end if
  return getThread("DialogWindow").getComponent().createDialogWindow(t_iObjID, t_sDialogID, t_iType, t_bModal)
end
on removeDialogWindow t_sID
  return getThread("DialogWindow").getComponent().removeDialogWindow(t_sID)
end
on ShowDialogWindows
  return getThread("DialogWindow").getComponent().ShowDialogWindows()
end
on RemoveAllDialogWindows
  return getThread("DialogWindow").getComponent().RemoveAllDialogWindows()
end
on DialogWindowExists t_sTitle
  return getThread("DialogWindow").getComponent().dialogExists(t_sTitle)
end
on createNPCDialogWindow
  if the paramCount < 2 then
    return 0
  end if
  t_iObjID = param(1)
  t_sDialogID = param(2)
  if the paramCount > 2 then
    t_iType = param(3)
  end if
  if the paramCount > 3 then
    t_bModal = param(4)
  end if
  if NPCDialogWindowExists(t_sDialogID) then
    RemoveNPCDialogWindow(t_sDialogID)
  end if
  return getThread("DialogWindow").getComponent().createNPCDialogWindow(t_iObjID, t_sDialogID, t_iType, t_bModal)
end
on RemoveNPCDialogWindow t_sID
  return getThread("DialogWindow").getComponent().RemoveNPCDialogWindow(t_sID)
end
on ShowNPCDialogWindows
  return getThread("DialogWindow").getComponent().ShowNPCDialogWindows()
end
on RemoveAllNPCDialogWindows
  return getThread("DialogWindow").getComponent().RemoveAllNPCDialogWindows()
end
on NPCDialogWindowExists t_sTitle
  return getThread("DialogWindow").getComponent().NPCdialogExists(t_sTitle)
end
on createTutorialWindow
  if the paramCount < 2 then
    return 0
  end if
  t_iObjID = param(1)
  t_sDialogID = param(2)
  if the paramCount > 2 then
    t_iType = param(3)
  end if
  if the paramCount > 3 then
    t_bModal = param(4)
  end if
  if TutorialWindowExists(t_sDialogID) then
    removeTutorialWindow(t_sDialogID)
  end if
  return getThread("DialogWindow").getComponent().createTutorialWindow(t_iObjID, t_sDialogID, t_iType, t_bModal)
end
on removeTutorialWindow t_sID
  return getThread("DialogWindow").getComponent().removeTutorialWindow(t_sID)
end
on showTutorialWindows
  return getThread("DialogWindow").getComponent().showTutorialWindows()
end
on removeAllTutorialWindows
  return getThread("DialogWindow").getComponent().removeAllTutorialWindows()
end
on TutorialWindowExists t_sTitle
  return getThread("DialogWindow").getComponent().tutorialExists(t_sTitle)
end