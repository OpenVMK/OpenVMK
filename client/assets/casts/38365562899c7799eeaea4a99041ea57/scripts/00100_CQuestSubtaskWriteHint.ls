-- Script
property m_rWindow
property m_ar_components
property m_ar_data
property m_iCurrentID
property m_ar_CannedFields

on construct me
  m_ar_components = [:]
  m_iCurrentID = -1
  m_ar_components.sort()
  m_rWindow = VOID
  m_ar_data = []
  m_ar_CannedFields = [:]
  registerMessage(#photo_catalog_redraw, me.getID(), #reDraw)
  return 1
end
on deconstruct me
  unregisterMessage(#photo_catalog_redraw, me.getID())
  repeat with t_rCannedField in m_ar_CannedFields
    removeObject(t_rCannedField.getID())
  end repeat
  if objectp(m_rWindow) then
    me.Purge(m_rWindow)
  end if
  repeat with t_rComponent in m_ar_components
    removeObject(t_rComponent.getID())
  end repeat
  if getObject("QuestDialogManagerAddPhoto") <> 0 then
    removeObject("QuestDialogManagerAddPhoto")
  end if
  return 1
end
on merge me, a_rWindow
  m_rWindow = a_rWindow
  t_bSuccess = m_rWindow.merge("vmk_quest_writetaskhint.window")
  t_rTitleElem = m_rWindow.getElement("quest.dialog.hd")
  if t_rTitleElem <> 0 then
    t_rTitleElem.setText(getText("quest.dialog.hd.writehint"))
  end if
  t_ar_fields = ["quest.taskhint.input"]
  repeat with t_sFieldName in t_ar_fields
    t_rCannedField = createObject(#random, "CQuestCannedField")
    t_rCannedField.Init(m_rWindow, t_sFieldName)
    m_ar_CannedFields[t_sFieldName] = t_rCannedField
  end repeat
  me.reDraw()
  updateStage()
  createTimeout("setFocus", 500, #setFocus, me.getID(), VOID, 1)
  return t_bSuccess
end
on setFocus me
  tElem = m_rWindow.getElement("quest.taskhint.input")
  if tElem <> 0 then
    tElem.setFocus(1)
    set the selStart to tElem.getText().length
    set the selEnd to tElem.getText().length
  end if
end
on reDraw me
  tempMember = getMember("tempImg")
  tPic = getThread(#PhotoCatalog).getComponent().getPhoto(m_iCurrentID)
  if not voidp(tPic) then
    m_rWindow.getElement("fto.view").show()
    tPhotoMedia = tPic.pic
    if voidp(tPhotoMedia) then
      getThread(#PhotoCatalog).getComponent().RequestCatalogPhoto(m_iCurrentID)
      m_rWindow.getElement("fto.view").feedImage(getMember("loaderImg").image)
    else
      tempMember.media = tPhotoMedia.image
      tempMember.palette = getMember("sepia_palette_catalog")
      m_rWindow.getElement("fto.view").feedImage(tempMember.image)
    end if
  else
    m_rWindow.getElement("fto.view").hide()
  end if
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
  put "Fill blanks (Write Hint)" && t_ar_data[#desc]
  t_sNewLine = numToChar(10)
  t_sReturn = numToChar(13)
  t_sDesc = replaceChunks(t_ar_data[#desc], t_sNewLine, t_sReturn)
  me.setField(m_rWindow, "quest.taskhint.input", t_sDesc)
  m_iCurrentID = t_ar_data[#photoId]
  me.reDraw()
end
on showSelectedPhoto me, a_iPhotoID
  put "Show selected photo"
end
on _EventProc me, a_kEvent, a_sElemID, a_vParam
  tWndObj = m_rWindow
  if a_kEvent = #keyUp or a_kEvent = #keyDown then
    t_sCannedFieldName = m_ar_CannedFields.getPropAt(1)
    case a_sElemID of
      t_sCannedFieldName:
        return m_ar_CannedFields[1]._EventProc(a_kEvent, a_sElemID, a_vParam)

    end case
  end if
  if a_kEvent = #mouseUp then
    case a_sElemID of
      "quest.removehint.button":
        m_iCurrentID = -1
        me.reDraw()
      "quest.addphoto.button":
        if getObject("QuestDialogManagerAddPhoto") <> 0 then
          removeObject("QuestDialogManagerAddPhoto")
        end if
        t = createObject("QuestDialogManagerAddPhoto", "CQuestWindowManager")
        t.getInterface().SetType("dialog")
        t.SetOwner(me)
        t.populate(["selectphoto"])
        t.Activate()
      "mes.accept.button":
        tElement = m_rWindow.getElement("quest.taskhint.input")
        t_sText = tElement.getText()
        t_bError = 0
        if t_sText.length = 0 and m_iCurrentID = -1 then
          t_txt = getText("quest.alert.hint.missing")
          t_title = getText("quest.alert.title")
          t_btn1 = getText("quest.alert.ok")
          t = createDialogWindow(me.getID(), "quest.alert.hint", 1, 1)
          t.setText(t_txt, t_title, t_btn1)
          t.show()
          t_bError = 1
        end if
        if not t_bError then
          if not m_ar_CannedFields[1].CheckContent() then
            t_txt = getText("quest.alert.hint.illegal")
            t_title = getText("quest.alert.title")
            t_btn1 = getText("quest.alert.ok")
            t = createDialogWindow(me.getID(), "quest.alert.hint.illegal", 1, 1)
            t.setText(t_txt, t_title, t_btn1)
            t.show()
            t_bError = 1
          end if
        end if
        t_ar_results = [:]
        if not t_bError then
          t_ar_text = ParseCannedField(tElement, [])
          t_ar_results[#hint] = t_ar_text
          t_ar_results[#photo] = m_iCurrentID
          t_rManager = me.getManager()
          if objectp(t_rManager) then
            t_rManager.appendSubResult(t_ar_results)
            t_rManager.resolveSubtask()
            t_rManager.Activate()
          end if
        end if
      "close", "quest.quit", "mes.deny.button":
        t_rManager = me.getManager()
        if objectp(t_rManager) then
          t_rManager.cancelSubtask()
          t_rManager.Activate()
        end if
      "help":
        executeMessage("PlayInterfaceSound", "UI-click")
        executeMessage(#open_help_page, getText("help.quest.writehint", getText("help.quest", "help.quest")), 1)
      otherwise:
        put "Subtask.WriteHint.event:" && a_sElemID

    end case
  end if
end
on QuestDialogBroadcastEvent me, t_iManagerID, t_ar_results
  case t_iManagerID of
    "QuestDialogManagerAddPhoto":
      if t_ar_results[#photoId] > 0 then
        m_iCurrentID = t_ar_results[#photoId]
        me.reDraw()
      end if
    otherwise:
      put "Quest Write Hint: Unknown manager"

  end case
end