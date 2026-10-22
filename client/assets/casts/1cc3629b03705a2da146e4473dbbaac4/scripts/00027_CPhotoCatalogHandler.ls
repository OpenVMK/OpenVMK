-- Behavior
on construct me
  me.regMsgList(1)
  registerMessage("refresh_catalog", #RequestPhotoIndex)
  return 1
end
on deconstruct me
  me.regMsgList(0)
  unregisterMessage("refresh_catalog")
  return 1
end
on regMsgList me, tBool
  tMsgs = [:]
  tMsgs.setaProp(2761, #PhotoCatalogIndex)
  tMsgs.setaProp(2763, #SuccessfullyPlacedPhotoOnWall)
  tMsgs.setaProp(2765, #SuccessfullyRemovedPhotoFromWall)
  tMsgs.setaProp(2766, #PublishPhotoResponse)
  tMsgs.setaProp(2767, #PhotoAlbumStatus)
  tCmds = [:]
  tCmds.setaProp("REQUEST_PHOTO_CATALOG_INDEX", 761)
  tCmds.setaProp("PUBLISH_PHOTO", 762)
  tCmds.setaProp("DELETE_PHOTO", 763)
  tCmds.setaProp("PLACE_PHOTO_ON_WALL", 764)
  tCmds.setaProp("REMOVE_PHOTO_FROM_WALL", 765)
  tCmds.setaProp("EDIT_CAPTION", 766)
  tCmds.setaProp("TEST_ALBUM_STATUS", 769)
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    registerCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    unregisterCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  end if
end
on PhotoCatalogIndex me, tMsg
  tCount = tMsg.connection.GetIntFrom()
  t_ar_indexes = []
  repeat with i = 1 to tCount
    t_ar_indexes.append(tMsg.connection.GetIntFrom())
  end repeat
  me.getComponent().SetIDList(t_ar_indexes)
end
on SuccessfullyPlacedPhotoOnWall me, tMsg
  tID = tMsg.connection.GetIntFrom()
  me.getComponent().removePhotoID(tID)
  me.getInterface().changeView(#thumbs)
end
on SuccessfullyRemovedPhotoFromWall me, tMsg
  tRef = tMsg.connection.GetIntFrom()
  tID = tMsg.connection.GetIntFrom()
  me.getComponent().AddID(tID)
end
on PublishPhotoResponse me, tMsg
  tAction = tMsg.connection.GetIntFrom()
  tPhotoID = tMsg.connection.GetIntFrom()
  tSuccessCode = tMsg.connection.GetIntFrom()
  if tSuccessCode = 0 then
    me.getComponent().removePhotoID(tPhotoID)
  else
    if tSuccessCode = 1 then
      t = createDialogWindow(me.getID(), "ErrorDialog", 1, 0)
      t.show()
      t.setText(getText("photocatalog_action_cannot_be_applied"), "Error", "OK")
    else
      if tSuccessCode = 2 then
        t = createDialogWindow(me.getID(), "ErrorDialog", 1, 0)
        t.show()
        t.setText(getText("photocatalog_album_size_exceeded"), getText("album_full"), "OK")
        me.getComponent().SetAlbumFull(1)
      end if
    end if
  end if
end
on PhotoAlbumStatus me, tMsg
  tPics = tMsg.connection.GetIntFrom()
  tCapacity = tMsg.connection.GetIntFrom()
  if tPics >= tCapacity then
    me.getComponent().SetAlbumFull(1)
  else
    me.getComponent().SetAlbumFull(0)
  end if
end
on RequestPhotoIndex me
  getConnection(getVariable("main.connection.id", "VMK")).send(761)
end
on PublishPhoto me, a_iID, a_iAction
  getConnection(getVariable("main.connection.id", "VMK")).send(762, [#int: a_iAction, #int: a_iID])
end
on DeletePhoto me, a_iID
  getConnection(getVariable("main.connection.id", "VMK")).send(763, [#int: a_iID])
end
on ChangeCaption me, a_iID, a_mp_cannedText
  tMsg = [#int: a_iID]
  repeat with i = 1 to a_mp_cannedText.count
    tMsg.addProp(a_mp_cannedText.getPropAt(i), a_mp_cannedText[i])
  end repeat
  getConnection(getVariable("main.connection.id", "VMK")).send(766, tMsg)
end
on PlacePhotoOnWall me, a_iID, a_iWall, a_iX, a_iY, a_iZ
  tMsg = [#int: a_iID, #int: a_iWall, #int: a_iX, #int: a_iY, #int: a_iZ]
  getConnection(getVariable("main.connection.id", "VMK")).send(764, tMsg)
end
on TestAlbumState me
  getConnection(getVariable("main.connection.id", "VMK")).send(769)
end