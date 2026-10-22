-- Script
property m_sCameraWindowName
property m_sPicTitleWindowName
property m_sMickeyWindowName
property m_view
property m_visible
property m_procedureReceiverList
property m_viewfinder
property m_rCaptionCompose

on construct me
  m_visible = 0
  m_procedureReceiverList = []
  registerMessage(#ui_camera, me.getID(), #showHideCamera)
  registerMessage(#camera_add_receiver, me.getID(), #addToReceiverList)
  m_sCameraWindowName = "CameraViewFinder"
  m_sPicTitleWindowName = "CameraPictureTitle"
  m_sMickeyWindowName = "CameraMickeyFound"
  m_rCaptionCompose = VOID
  m_view = #camera
  registerMessage("room_leave", me.getID(), #hideCamera)
  registerMessage(#MickeyInPicture, me.getID(), #MickeyInPicture)
  return 1
end
on deconstruct me
  unregisterMessage(#ui_camera, me.getID())
  unregisterMessage(#camera_add_receiver, me.getID())
  unregisterMessage("room_leave", me.getID())
  m_procedureReceiverList.deleteAll()
  return 1
end
on addToReceiverList me, _obj
  m_procedureReceiverList.append(_obj)
end
on showHideCamera me
  if m_visible then
    me.getInterface().hideCamera()
  else
    me.getInterface().showCamera()
    executeMessage("close_Emoticons")
    executeMessage("close_Magic")
    executeMessage(#hide_roominfo)
  end if
  me.getHandler().RequestFilmAmount()
  m_visible = not m_visible
end
on showCamera me
  case m_view of
    #camera:
      if windowExists(m_sPicTitleWindowName) then
        removeWindow(m_sPicTitleWindowName)
      end if
      if createWindow(m_sCameraWindowName, "vmk_photo_camera.window") then
        tWndObj = getWindow(m_sCameraWindowName)
        tWndObj.getElement("camera.picture").setProperty(#visible, 0)
        tWndObj.getElement("camera.picture").setProperty(#blend, 100)
        tWndObj.getElement("camera.picture").setProperty(#ink, 33)
        tWndObj.center()
        tWndObj.show()
        tWndObj.registerClient(me.getID())
        tWndObj.registerProcedure(#eventProcCamera, me.getID(), #mouseDown)
        tWndObj.setProperty(#boundary, rect(-12, -26, (the stage).image.width + 12, 575 + 30))
        tWndObj.getElement("camera.outoffilm").hide()
        me.DisplayFilmAmount(me.getComponent().GetFilmAmount())
        m_visible = 1
      end if
    #pictitle:
      if windowExists(m_sCameraWindowName) then
        removeWindow(m_sCameraWindowName)
      end if
      if createWindow(m_sPicTitleWindowName, "vmk_photo_picturetitle.window") then
        tWndObj = getWindow(m_sPicTitleWindowName)
        tWndObj.center()
        tWndObj.show()
        tWndObj.registerClient(me.getID())
        tWndObj.registerProcedure(#eventProcPictitle, me.getID(), #keyDown)
        tWndObj.registerProcedure(#eventProcPictitle, me.getID(), #keyUp)
        tWndObj.registerProcedure(#eventProcPictitle, me.getID(), #mouseUp)
        tWndObj.getElement("camera.picture").feedImage(me.getComponent().getImage())
        m_rCaptionCompose = CreateCannedField(m_sPicTitleWindowName, "camera.caption.input")
        m_rCaptionCompose.setAllowEmpty(1)
        m_visible = 1
      end if
    #mickeyfound:
      if windowExists(m_sMickeyWindowName) then
        removeWindow(m_sMickeyWindowName)
      end if
      if createWindow(m_sMickeyWindowName, "vmk_hidden_mickey_found.window") then
        tWndObj = getWindow(m_sMickeyWindowName)
        tWndObj.center()
        tWndObj.show()
        tWndObj.registerClient(me.getID())
        tWndObj.registerProcedure(#eventProcMickeyFound, me.getID(), #mouseUp)
        tWndObj.getElement("camera.picture").feedImage(me.getComponent().getImage())
        m_visible = 1
      end if

  end case
end
on hideCamera me
  if windowExists(m_sPicTitleWindowName) then
    removeWindow(m_sPicTitleWindowName)
  end if
  if windowExists(m_sCameraWindowName) then
    removeWindow(m_sCameraWindowName)
  end if
  if windowExists(m_sMickeyWindowName) then
    removeWindow(m_sMickeyWindowName)
  end if
  if not voidp(m_rCaptionCompose) then
    removeObject(m_rCaptionCompose.getID())
    m_rCaptionCompose = VOID
  end if
  m_visible = 0
  m_view = #camera
end
on DisplayFilmAmount me, i_iAmount
  if windowExists(m_sCameraWindowName) then
    getWindow(m_sCameraWindowName).getElement("film").setText(string(i_iAmount))
    if i_iAmount <= 0 then
      getWindow(m_sCameraWindowName).getElement("camera.takepicture.button").hide()
      getWindow(m_sCameraWindowName).getElement("camera.outoffilm").show()
    else
      getWindow(m_sCameraWindowName).getElement("camera.takepicture.button").show()
      getWindow(m_sCameraWindowName).getElement("camera.outoffilm").hide()
    end if
  end if
end
on TakePhoto me, a_rect
  me.getComponent().setLastPhotoRect(a_rect)
  hideWindows()
  tImg = image(a_rect.right - a_rect.left, a_rect.bottom - a_rect.top, 32)
  me.hideCamera()
  updateStage()
  tImg.copyPixels((the stage).image, tImg.rect, a_rect)
  tImg = me.getComponent().processImage(tImg)
  tThumb = me.getComponent().createThumb(tImg)
  me.getComponent().RegisterImage(tImg, tThumb)
  showWindows()
  me.hideCamera()
end
on MickeyInPicture me, a_bState
  if not a_bState then
    m_view = #pictitle
    me.showCamera()
    me.getComponent().storePicture(EMPTY)
    getWindow(m_sPicTitleWindowName).getElement("camera.caption.input").setText(EMPTY)
  else
    m_view = #mickeyfound
    me.showCamera()
  end if
end
on eventProcCamera me, tEvent, tElemID, tParm
  if tEvent = #mouseDown then
    case tElemID of
      "help":
        executeMessage(#open_help_page, "help.stuff.camera")
      "camera.takepicture.button":
        executeMessage("PlayInterfaceSound", "VMK-camera")
        repeat with t_receiver in m_procedureReceiverList
          t_receiver.EventProc(tEvent, tElemID, tParm)
        end repeat
        tRect = getWindow(m_sCameraWindowName).getElement("camera.picture").pSprite.rect
        me.TakePhoto(tRect)
        repeat with t_receiver in m_procedureReceiverList
          t_receiver.photoTaken()
        end repeat
        updateStage()
      "close":
        executeMessage("PlayInterfaceSound", "close-popup")
        me.hideCamera()
      otherwise:
        put "Camera" && [tEvent, tElemID, tParm]
        pass()

    end case
  end if
end
on eventProcPictitle me, tEvent, tElemID, tParm
  if tEvent = #mouseUp then
    case tElemID of
      "close":
        me.hideCamera()
        pass()
      "help":
        executeMessage(#open_help_page, "help.stuff.camera")
      "camera.save.button":
        if m_rCaptionCompose.CheckContent() then
          tField = getWindow(m_sPicTitleWindowName).getElement("camera.caption.input")
          if tField.getText().length > 0 then
            tCaption = TransformCannedToMsg(ParseCannedField(tField), 1)
            getThread("PhotoCatalog").getHandler().ChangeCaption(me.getComponent().getPhotoID(), tCaption)
          end if
          me.hideCamera()
          m_view = #camera
        end if
      otherwise:
        pass()

    end case
  else
    if tEvent = #keyDown then
      t_rWindow = getWindow(m_sPicTitleWindowName)
      if tElemID = "camera.caption.input" then
        case the keyCode of
          123, 124, 125, 126:
            m_rCaptionCompose.updateContent()
            pass()
          117, 51:
            m_rCaptionCompose.updateContent()
            pass()
          36:
            t_pass = m_rCaptionCompose.CheckContent()
            if t_pass then
              m_bRoomNAmeOK = 1
            end if
            return 1
          49:
            tElem = t_rWindow.getElement(tElemID)
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
            t_pass = m_rCaptionCompose.CheckContent()
            if t_pass then
              m_rCaptionCompose.updateContent()
            end if
          otherwise:
            if not m_rCaptionCompose.updateContent() then
              return 1
            end if
            tValidKeys = "abcdefghijlkmnopqrstuvwxyz0123456789_-=+?!@<>:.,'*/()[]\#;" & QUOTE
            tAscii = charToNum(the key)
            t_allow = 0
            if tAscii > 31 and tAscii < 128 then
              if tValidKeys contains the key or tValidKeys = EMPTY then
                t_allow = 1
              end if
            end if
            if not t_allow then
              return 1
            end if

        end case
        t_iMaxlength = 90
        tElem = t_rWindow.getElement(tElemID)
        if tElem <> 0 then
          if tElem.pMember.text.char.count >= t_iMaxlength then
            tElem.pMember.text = tElem.pMember.char[1..t_iMaxlength]
            t = createDialogWindow(me.getID(), "CaptionTooLong", 1, 1)
            t.show()
            t_sMsg = getText("camera.dialog.caption.toolong")
            t.setText(t_sMsg, "Error", "OK")
            return 1
          end if
        end if
      end if
    else
      if tEvent = #keyUp then
        if tElemID = "camera.caption.input" then
          if m_rCaptionCompose <> 0 then
            case the keyCode of
              36, 49:
              otherwise:
                m_rCaptionCompose.CheckWord()

            end case
          end if
        end if
      end if
    end if
  end if
end
on eventProcMickeyFound me, tEvent, tElemID, tParm
  if tEvent = #mouseUp then
    case tElemID of
      "help":
        executeMessage(#open_help_page, "help.stuff.camera")
      "hm.foundinfo.ok":
        executeMessage("PlayInterfaceSound", "close-popup")
        me.hideCamera()
        m_view = #camera
      otherwise:
        put "Camera" && [tEvent, tElemID, tParm]
        pass()

    end case
  end if
end