-- Score Script
property m_sWindowTitle
property m_iId
property m_iRef

on construct me
  m_sWindowTitle = "WallPhotoViewer"
  m_iId = VOID
  m_iRef = VOID
  if createWindow(m_sWindowTitle, "vmk_fto_wallview.window") then
    tWndObj = getWindow(m_sWindowTitle)
    tWndObj.registerClient(me.getID())
    tWndObj.registerProcedure(#eventProcPhotoPoster, me.getID(), #mouseUp)
    tWndObj.getElement("fto.view").feedImage(getMember("loaderImg").image)
    tWndObj.getElement("fto.taketocatalog.button").hide()
    me.regMsgList(1)
    return 1
  end if
  return 0
end
on deconstruct me
  if windowExists(m_sWindowTitle) then
    removeWindow(m_sWindowTitle)
  end if
  me.regMsgList(0)
  return 1
end
on RequestPhotoID me, a_iRef
  getConnection(getVariable("main.connection.id", "VMK")).send(768, [#int: a_iRef])
end
on RequestWallPhotoData me, a_iID
  getBinaryManager().retrieveWallPhotoData(a_iID, me.getID())
end
on wallPhotoInfo me, tdata, a_iID
  tCaption = tdata.content.word[3..tdata.content.word.count]
  tWndObj = getWindow(m_sWindowTitle)
  if tWndObj <> 0 then
    tWndObj.getElement("fto.wallview.caption").setText(tCaption)
  end if
end
on wallPhotoData me, tdata, a_iID
  getMember("PosterStore").media = tdata.image
  getMember("PosterStore").palette = getMember("sepia_palette_poster")
  tWndObj = getWindow(m_sWindowTitle)
  if tWndObj <> 0 then
    tWndObj.getElement("fto.view").feedImage(getMember("PosterStore").image)
  end if
end
on eventProcPhotoPoster me, tEvent, tElemID, tParm
  if tEvent = #mouseUp then
    case tElemID of
      "fto.taketocatalog.button":
        getConnection(getVariable("main.connection.id", "VMK")).send(765, [#int: m_iRef])
      "close":
        if windowExists(m_sWindowTitle) then
          removeWindow(m_sWindowTitle)
        end if

    end case
  end if
end
on PhotoIdOfPoster me, tMsg
  m_iRef = tMsg.connection.GetIntFrom()
  m_iId = tMsg.connection.GetIntFrom()
  me.RequestWallPhotoData(m_iId)
end
on regMsgList me, tBool
  tMsgs = [:]
  tMsgs.setaProp(2764, #PhotoIdOfPoster)
  tCmds = [:]
  tCmds.setaProp("REQUEST_PHOTO_ID_OF_POSTER", 768)
  tCmds.setaProp("REMOVE_PHOTO_FROM_WALL", 765)
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    registerCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    unregisterCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  end if
end