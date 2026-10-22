-- Score Script
property m_sWindowTitle
property m_iCurrentID

on construct me
  m_sWindowTitle = "PhotoAlbumViewer"
  if createWindow(m_sWindowTitle, "vmk_basic.window") then
    tWndObj = getWindow(m_sWindowTitle)
    if tWndObj.merge("vmk_fto_album.window") then
      tWndObj.registerClient(me.getID())
      tWndObj.registerProcedure(#eventProcPhotoAlbum, me.getID(), #mouseUp)
      m_iCurrentID = -1
      me.RequestNextPhoto(m_iCurrentID)
      tWndObj.getElement("fto.view").feedImage(getMember("loaderimg").image)
      tWndObj.getElement("fto.nextphoto.button").deactivate()
      tWndObj.getElement("fto.previousphoto.button").deactivate()
      if not getObject("session").get("ControlRoom") then
        tWndObj.getElement("fto.taketocatalog.button").hide()
      else
        tWndObj.getElement("fto.taketocatalog.button").deactivate()
      end if
      return 1
    end if
  end if
  return 0
end
on deconstruct me
  if windowExists(m_sWindowTitle) then
    removeWindow(m_sWindowTitle)
  end if
  return 1
end
on RequestNextPhoto me, a_iID
  getBinaryManager().retrieveNextAlbumPhotoData(a_iID, me.getID())
end
on RequestPrevPhoto me, a_iID
  getBinaryManager().retrievePreviousAlbumPhotoData(a_iID, me.getID())
end
on albumPhotoInfo me, tdata, a_iID
  m_iCurrentID = value(tdata.content.word[1])
  tCaption = tdata.content.word[3..tdata.content.word.count]
  tWndObj = getWindow(m_sWindowTitle)
  if tWndObj <> 0 then
    tWndObj.getElement("fto.view.caption").setText(tCaption)
  end if
end
on albumPhotoData me, tdata, a_iID
  getMember("AlbumStore").media = tdata.image
  getMember("AlbumStore").palette = getMember("sepia_palette_album")
  tWndObj = getWindow(m_sWindowTitle)
  if tWndObj <> 0 then
    tWndObj.getElement("fto.view").feedImage(getMember("AlbumStore").image)
    tWndObj.getElement("fto.nextphoto.button").Activate()
    tWndObj.getElement("fto.previousphoto.button").Activate()
    tWndObj.getElement("fto.taketocatalog.button").Activate()
  end if
end
on albumEmpty me, tdata, a_iID
  t = createDialogWindow(me.getID(), "AlbumEmpty", 1, 1)
  t.show()
  t.setText(getText("photo_album_empty"), "Photo Album", "OK")
  removeWindow(m_sWindowTitle)
end
on PublishPhoto me, a_iID, a_iAction
  getConnection(getVariable("main.connection.id", "VMK")).send(762, [#int: a_iAction, #int: a_iID])
end
on eventProcPhotoAlbum me, tEvent, tElemID, tParm
  if tEvent = #mouseUp then
    case tElemID of
      "fto.nextphoto.button":
        me.RequestNextPhoto(m_iCurrentID)
      "fto.previousphoto.button":
        me.RequestPrevPhoto(m_iCurrentID)
      "fto.taketocatalog.button":
        me.PublishPhoto(m_iCurrentID, 0)
        executeMessage("refresh_catalog")
        if windowExists(m_sWindowTitle) then
          removeWindow(m_sWindowTitle)
        end if
      "close":
        if windowExists(m_sWindowTitle) then
          removeWindow(m_sWindowTitle)
        end if
      "help":
        executeMessage(#open_help_page, "help.stuff.camera")

    end case
  end if
end