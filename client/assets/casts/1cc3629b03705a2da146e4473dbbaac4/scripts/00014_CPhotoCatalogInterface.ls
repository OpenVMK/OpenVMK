-- Script
property m_visible
property m_view
property m_sWindowTitle
property m_bMerged
property m_rThumblist
property m_iCurrentID
property m_iOffset
property m_pCannedField
property m_bCaptionEdited
property m_mp_lastCaption
property m_iDefaultWidth
property m_iDefaultHeight

on construct me
  m_sWindowTitle = "Photo Catalog"
  m_view = #thumbs
  m_visible = 0
  m_bMerged = 0
  m_rThumblist = VOID
  m_iCurrentID = 0
  m_iOffset = 0
  m_pCannedField = 0
  m_bCaptionEdited = 0
  m_mp_lastCaption = [:]
  m_iDefaultWidth = 332
  m_iDefaultHeight = 167
  registerMessage(#ui_photocatalog, me.getID(), #showHidePhotoCatalog)
  registerMessage(#room_leave, me.getID(), #hidePhotoCatalog)
  return 1
end
on deconstruct me
  unregisterMessage(#ui_photocatalog)
  unregisterMessage("place_poster_end", me.getID())
  return 1
end
on placePosterEnd me, t_iWall, t_veC
  put "place photo" && m_iCurrentID && "on wall" && t_iWall && "at" && t_veC
  me.getHandler().PlacePhotoOnWall(m_iCurrentID, t_iWall, integer(t_veC.x), integer(t_veC.y), integer(t_veC.z))
  getWindow(m_sWindowTitle).show()
  unregisterMessage("place_poster_end", me.getID())
end
on hidePhotoCatalog me
  return me.showHidePhotoCatalog(0)
end
on showHidePhotoCatalog me, a_visibility
  m_visible = not m_visible
  if not voidp(a_visibility) then
    m_visible = a_visibility
  end if
  tWndObj = getWindow(m_sWindowTitle)
  if m_visible then
    if tWndObj = 0 then
      if not createWindow(m_sWindowTitle, "vmk_basic.window") then
        return error(me, "Could not create photo catalog window", #showHidePhotoCatalog)
      end if
      tWndObj = getWindow(m_sWindowTitle)
      t_Elem = tWndObj.getElement("basic.window.title")
      if t_Elem <> 0 then
        t_Elem.setText(getText("fto.catalog.title"))
      end if
      me.mergeClientRect(tWndObj)
    end if
    tWndObj.center()
    tWndObj.show()
    tWndObj.registerClient(me.getID())
    tWndObj.registerProcedure(#eventProcPhotoCatalog, me.getID(), #mouseUp)
    tWndObj.registerProcedure(#eventProcPhotoCatalog, me.getID(), #keyDown)
    tWndObj.registerProcedure(#eventProcPhotoCatalog, me.getID(), #keyUp)
    me.getHandler().RequestPhotoIndex()
    me.getHandler().TestAlbumState()
    me.reDraw()
    updateStage()
  else
    if tWndObj <> 0 then
      removeWindow(m_sWindowTitle)
    end if
    if not voidp(m_rThumblist) then
      removeObject(m_rThumblist.getID())
      m_rThumblist = VOID
    end if
  end if
end
on mergeClientRect me, tWndObj
  if m_view = #thumbs then
    if not tWndObj.merge("vmk_fto_catalog_thumbs.window") then
      return error(me, "Could not merge 2nd layer client rect", #showHidePhotoCatalog)
    end if
    tDisplay = tWndObj.getElement("fto.thumbs.grid")
    m_iDefaultWidth = tDisplay.getProperty(#width)
    m_iDefaultHeight = tDisplay.getProperty(#height)
    m_bMerged = 1
  end if
  if m_view = #Full then
    if not tWndObj.merge("vmk_fto_catalog_view.window") then
      return error(me, "Could not merge 2nd layer client rect", #showHidePhotoCatalog)
    end if
    m_bMerged = 1
    if m_pCannedField = 0 then
      m_pCannedField = CreateCannedField(m_sWindowTitle, "camera.caption.input", rgb("#000000"), rgb("#FF0000"))
      if m_pCannedField <> 0 then
        m_pCannedField.setAllowErrors(1)
      end if
    end if
    if not getObject("session").get("ControlRoom") then
      tWndObj.getElement("fto.placeonwall.button").hide()
    end if
    tRoomMode = getThread("RoomInfo").getComponent().getRoomMode()
    if tRoomMode = "public" then
      tWndObj.getElement("fto.placeonwall.button").hide()
    end if
  end if
end
on changeView me, a_type
  if a_type <> #thumbs and a_type <> #Full then
    return error(me, "Invalid View type", #changeView)
  end if
  if m_view <> a_type then
    m_view = a_type
    tWndObj = getWindow(m_sWindowTitle)
    if m_bMerged then
      tWndObj.unmerge()
      if m_pCannedField <> 0 then
        removeCannedField(m_sWindowTitle, "camera.caption.input")
        m_pCannedField = 0
      end if
    end if
    me.mergeClientRect(tWndObj)
  end if
  me.reDraw()
end
on readthumbs me
  if voidp(m_rThumblist) then
    m_rThumblist = createObject("ThumbListView", "CThumbList")
    m_rThumblist.SetDimensions(m_iDefaultWidth, m_iDefaultHeight)
  end if
  if voidp(m_rThumblist) then
    return error(me, "Error creating thumbnail list view", #reDraw)
  end if
  tempMember = getMember("tempImg")
  tPhotos = me.getComponent().GetPhotos()
  m_rThumblist.clear()
  repeat with i = 1 to m_rThumblist.getMaxCount()
    if m_iOffset + i <= tPhotos.count then
      tID = tPhotos.getPropAt(m_iOffset + i)
      tThumbMedia = tPhotos.getaProp(tID).thumb
      if not voidp(tThumbMedia) then
        tempMember.media = tThumbMedia.image
        tempMember.palette = getMember("sepia_palette_catalog")
        m_rThumblist.addItem(tID, tempMember.image.duplicate())
        next repeat
      end if
      m_rThumblist.addItem(tID, getMember("loaderImg").image)
    end if
  end repeat
end
on reDraw me
  executeMessage(#photo_catalog_redraw)
  if m_visible then
    tWndObj = getWindow(m_sWindowTitle)
    me.readthumbs()
    if m_view = #thumbs then
      tWndObj.getElement("fto.thumbs.grid").feedImage(m_rThumblist.render())
    end if
    if m_view = #Full then
      tempMember = getMember("tempImg")
      tPic = me.getComponent().getPhoto(m_iCurrentID)
      if not voidp(tPic) then
        tPhotoMedia = tPic.pic
        if voidp(tPhotoMedia) then
          me.getComponent().RequestCatalogPhoto(m_iCurrentID)
          tWndObj.getElement("fto.view").feedImage(getMember("loaderImg").image)
        else
          tempMember.media = tPhotoMedia.image
          tempMember.palette = getMember("sepia_palette_catalog")
          tWndObj.getElement("fto.view").feedImage(tempMember.image)
          tWndObj.getElement("camera.caption.input").setText(me.getComponent().getPhoto(m_iCurrentID).Caption)
        end if
      end if
    end if
  end if
end
on eventProcPhotoCatalog me, tEvent, tElemID, tParm
  if tEvent = #mouseUp then
    case tElemID of
      "help":
        executeMessage("PlayInterfaceSound", "UI-click")
        executeMessage(#open_help_page, "help.stuff.camera")

    end case
    case m_view of
      #thumbs:
        case tElemID of
          "fto.thumbs.grid":
            m_iCurrentID = m_rThumblist.getClickedID(tParm)
            if not voidp(m_iCurrentID) then
              me.changeView(#Full)
            end if
          "fto.nextpage.button":
            if me.getComponent().GetPhotos().count > m_iOffset + m_rThumblist.getMaxCount() then
              m_iOffset = m_iOffset + m_rThumblist.getMaxCount()
              me.reDraw()
            end if
          "fto.previouspage.button":
            if m_iOffset >= m_rThumblist.getMaxCount() then
              m_iOffset = m_iOffset - m_rThumblist.getMaxCount()
              me.reDraw()
            end if
          "close":
            me.showHidePhotoCatalog(0)

        end case
      #Full:
        tWnd = getWindow(m_sWindowTitle)
        case tElemID of
          "fto.save.button":
            m_mp_lastCaption = TransformCannedToMsg(ParseCannedField(tWnd.getElement("camera.caption.input")), 1)
            me.getComponent().ChangeCaption(m_iCurrentID, m_mp_lastCaption)
            me.getComponent().ForcePhotoCaption(m_iCurrentID, tWnd.getElement("camera.caption.input").getText())
            m_bCaptionEdited = 0
            me.reDraw()
          "fto.publishtoalbum.button":
            if not me.getComponent().IsAlbumFull() then
              t = createDialogWindow(me.getID(), "PublishDialog", 2, 1)
              t.show()
              t.setText(getText("photocatalog_confirm_publish"), getText("photocatalog_confirm"), "NO", "YES")
            else
              t = createDialogWindow(me.getID(), "ErrorDialog", 1, 0)
              t.show()
              t.setText(getText("photocatalog_album_size_exceeded"), getText("album_full"), "OK")
            end if
            me.getHandler().TestAlbumState()
          "fto.placeonwall.button":
            registerMessage("place_poster_end", me.getID(), #placePosterEnd)
            executeMessage("place_poster_start", 3008)
            tWnd.hide()
          "fto.delete.button":
            t = createDialogWindow(me.getID(), "DeleteDialog", 2, 1)
            t.show()
            t.setText(getText("photocatalog_confirm_delete"), getText("photocatalog_confirm"), "NO", "YES")
          "fto.viewall.button":
            me.changeView(#thumbs)
          "camera.caption.input":
            m_bCaptionEdited = 1
          "fto.nextpage.button":
            if m_iCurrentID = m_rThumblist.getLastID() then
              if me.getComponent().GetPhotos().count > m_iOffset + m_rThumblist.getMaxCount() then
                m_iOffset = m_iOffset + m_rThumblist.getMaxCount()
                me.readthumbs()
                m_iCurrentID = m_rThumblist.getFirstID()
              end if
            else
              m_iCurrentID = m_rThumblist.getNextID(m_iCurrentID)
            end if
            me.changeView(#Full)
          "fto.previouspage.button":
            if m_iCurrentID = m_rThumblist.getFirstID() then
              if m_iOffset >= m_rThumblist.getMaxCount() then
                m_iOffset = m_iOffset - m_rThumblist.getMaxCount()
                me.readthumbs()
                m_iCurrentID = m_rThumblist.getLastID()
              end if
            else
              m_iCurrentID = m_rThumblist.getPrevID(m_iCurrentID)
            end if
            me.changeView(#Full)
          "close":
            me.showHidePhotoCatalog(0)

        end case

    end case
  else
    if tEvent = #keyDown then
      t_iKeyCode = the keyCode
      if m_pCannedField <> 0 then
        case t_iKeyCode of
          36, 49:
            tElem = getWindow(m_sWindowTitle).getElement(tElemID)
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
            t_pass = m_pCannedField.CheckContent()
            if t_pass then
              m_pCannedField.updateContent()
            end if
            pass()
          otherwise:
            m_pCannedField.updateContent()
            pass()

        end case
      end if
    else
      if tEvent = #keyUp then
        t_iKeyCode = the keyCode
        if m_pCannedField <> 0 then
          case t_iKeyCode of
            36, 49:
            otherwise:
              m_pCannedField.CheckWord()

          end case
        end if
      end if
    end if
  end if
end
on dialogWindowEvent me, t_dialogName, t_dialogEvent
  case t_dialogName of
    "PublishDialog":
      case t_dialogEvent of
        #dialogOK:
          me.getHandler().PublishPhoto(m_iCurrentID, 1)
          me.getHandler().RequestPhotoIndex()
          me.changeView(#thumbs)
        #dialogCancel:

      end case
    "DeleteDialog":
      case t_dialogEvent of
        #dialogOK:
          me.getComponent().DeletePhoto(m_iCurrentID)
          me.changeView(#thumbs)
        #dialogCancel:

      end case
    otherwise:
      put "Unknown Dialog Window" && t_dialogName

  end case
end