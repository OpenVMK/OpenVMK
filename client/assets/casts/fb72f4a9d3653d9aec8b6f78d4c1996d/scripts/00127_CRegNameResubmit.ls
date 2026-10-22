-- Script
property m_rWindow
property m_bDataGathered
property m_rComponentsPage
property m_sActiveName
property m_sResubmitReason
property m_sName

on construct this
  m_rComponentsPage = VOID
  m_sActiveName = EMPTY
  m_rWindow = VOID
  this.WindowCreator()
  this.GenerateNames()
  return 1
end
on deconstruct this
  if objectp(m_rWindow) then
    removeWindow(m_rWindow.getID())
  end if
  return 1
end
on SetResubmitReason this, a_sReason, a_sName
  m_sResubmitReason = a_sReason
  m_sName = a_sName
  if objectp(m_rWindow) then
    if m_sResubmitReason = "resubmit" then
      t_sTxt = getText("reg.name.resubmit.hd")
    else
      t_sTxt = getText("reg.username.refused.hd")
    end if
    t_sTxt = replaceChunks(t_sTxt, "\$", m_sName)
    m_rWindow.getElement("reg.username.refused.hd").setText(t_sTxt)
  end if
end
on WindowCreator this
  if createWindow("NameRejected", "vmk_reg_refused.window") then
    m_rWindow = getWindow("NameRejected")
    m_rWindow.registerClient(this.getID())
    m_rWindow.registerProcedure(#_EventProc, this.getID(), #mouseUp)
    m_rWindow.registerProcedure(#_EventProc, this.getID(), #keyDown)
    m_rWindow.center()
  end if
end
on update this, a_mp_kType_mp_iRef_rItem, a_kAlteredCategory
  m_ar_AvatarData = a_mp_kType_mp_iRef_rItem
  if objectp(m_rWindow) then
    case a_kAlteredCategory of
      "GeneratedNames":
        this._PopulateNameList(m_ar_AvatarData["GeneratedNames"])

    end case
  end if
end
on _GatherData this
  t_txt = VOID
  if objectp(m_rWindow) then
    if m_sActiveName <> EMPTY then
      t_txt = m_sActiveName
    else
      t_iMaxlength = 18
      t_iMinlength = 4
      tElem = m_rWindow.getElement("reg.username.input")
      t_txt = tElem.getText()
      if tElem <> 0 then
        if tElem.pMember.text.char.count >= t_iMaxlength then
          tElem.pMember.text = tElem.pMember.char[1..t_iMaxlength]
          t = createDialogWindow(this.getID(), "CheckNameLength", 1, 1)
          t.show()
          t_sMsg = getText("reg.name.toolong")
          t.setText(t_sMsg, "Error", "OK")
          return 1
        else
          if tElem.pMember.text.char.count < t_iMinlength then
            t = createDialogWindow(this.getID(), "CheckNameLength", 1, 1)
            t.show()
            t_sMsg = getText("reg.name.tooshort")
            t.setText(t_sMsg, "Error", "OK")
            return 1
          end if
        end if
      end if
    end if
    t_mp_dataToServer = [:]
    t_mp_dataToServer.addProp(#string, t_txt)
    getObject(#session).set("name", t_txt)
    getConnection("VMK").send("SendNewName", t_mp_dataToServer)
    if m_sResubmitReason = "resubmit" then
      getConnection("VMK").send("GetName")
    end if
  else
    t = createDialogWindow(this.getID(), "CheckName", 1, 1)
    t.show()
    t_sMsg = getText("reg.name.wrong")
    t.setText(t_sMsg, "Error", "OK")
    return 0
  end if
end
on ShowConfirmName this
  if objectp(m_rWindow) then
    if m_sActiveName <> EMPTY then
      t_sTxt = m_sActiveName
      t = createDialogWindow(this.getID(), "ConfirmAvatarName", 2, 1)
      t.show()
      t_sHd = getText("reg.confirm.name.hd")
      t_sTxt = replaceChunks(getText("reg.confirm.generated.name"), "%avatarName%", m_sActiveName)
      t.setText(t_sTxt, t_sHd, getText("reg.name.cancel"), getText("reg.name.ok"))
      exit
    end if
    t_iMaxlength = 18
    t_iMinlength = 4
    tElem = m_rWindow.getElement("reg.username.input")
    if tElem <> 0 then
      t_txt = tElem.getText()
      if tElem.pMember.text.char.count >= t_iMaxlength then
        tElem.pMember.text = tElem.pMember.char[1..t_iMaxlength]
        t = createDialogWindow(this.getID(), "CheckNameLength", 1, 1)
        t.show()
        t_sMsg = getText("reg.name.toolong")
        t.setText(t_sMsg, "Error", "OK")
        return 1
      else
        if tElem.pMember.text.char.count < t_iMinlength then
          t = createDialogWindow(this.getID(), "CheckNameLength", 1, 1)
          t.show()
          t_sMsg = getText("reg.name.tooshort")
          t.setText(t_sMsg, "Error", "OK")
          return 1
        else
          t = createDialogWindow(this.getID(), "ConfirmAvatarName", 2, 1)
          t.show()
          t_sHd = getText("reg.confirm.name.hd")
          t_sTxt = getText("reg.confirm.name")
          t.setText(t_sTxt, t_sHd, getText("reg.name.cancel"), getText("reg.name.ok"))
        end if
      end if
    end if
  end if
end
on _PopulateNameList this, a_ar_Names
  if objectp(m_rWindow) then
    t_rClientElement = m_rWindow.getElement("reg.namelist")
    t_rComponentsPage = createObject(getUniqueID(), "CUIComponentPage")
    t_rComponentsPage.setSize(t_rClientElement.pOwnW, t_rClientElement.pOwnH)
    t_rComponentsPage.setColor(rgb("#ffc513"))
    repeat with i = 1 to a_ar_Names.count
      t_rComponent = t_rComponentsPage.addComponent("component.registration.xml")
      t_rComponent.GetLayout(1).setEvent(string(a_ar_Names[i]))
      t_rComponent.GetLayout(1).setText(a_ar_Names[i])
      t_rComponent.GetLayout(1).SetTextColor(rgb(250, 250, 250))
    end repeat
    m_rComponentsPage = t_rComponentsPage
    t_rImg = m_rComponentsPage.render()
    t_rClientElement.feedImage(t_rImg)
  end if
end
on GenerateNames this
  getConnection("VMK").send("GenarateNames")
end
on GetActiveName this, a_sName
  m_sActiveName = a_sName
  if objectp(m_rComponentsPage) then
    if objectp(m_rWindow) then
      m_rComponentsPage.setActive(m_sActiveName)
      t_rClientElement = m_rWindow.getElement("reg.namelist")
      t_rImg = m_rComponentsPage.render()
      t_rClientElement.feedImage(t_rImg)
      m_rWindow.getElement("reg.username.input").setText(EMPTY)
    end if
  end if
end
on InactivateNameSelector this
  m_rComponentsPage.inActivate(m_sActiveName)
  m_sActiveName = EMPTY
  t_rClientElement = m_rWindow.getElement("reg.namelist")
  t_rImg = m_rComponentsPage.render()
  t_rClientElement.feedImage(t_rImg)
end
on dialogWindowEvent this, t_dialogName, t_dialogEvent
  if t_dialogName = "CheckName" then
    t_txt = m_rWindow.getElement("reg.username.input").getText()
    m_rWindow.getElement("reg.username.input").setText(t_txt)
  end if
  if t_dialogName = "ConfirmAvatarName" then
    if t_dialogEvent = #dialogOK then
      this._GatherData()
    end if
  end if
end
on _EventProc this, a_kEvent, a_sElem, a_vParam
  case 1 of
    a_sElem = "reg.playnewname":
      this.ShowConfirmName()
    a_sElem = "reg.morenames.button":
      this.GenerateNames()
    a_sElem = "reg.namelist":
      t_ar_event = [#found: 0, #event: EMPTY, #client: VOID, #route: [:]]
      m_rComponentsPage.EventProc(a_vParam, t_ar_event)
      if t_ar_event.found then
        this.GetActiveName(t_ar_event.event)
      end if

  end case
  if a_kEvent = #keyDown then
    case a_sElem of
      "reg.username.input":
        case the keyCode of
          123, 124, 125, 126:
            pass()
          117, 51:
            pass()
          36:
            return 1
          49:
            return 1
          otherwise:
            this.InactivateNameSelector()
            t_sValidKeys = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!?.-_" & QUOTE
            t_iAscii = charToNum(the key)
            t_bAllow = 0
            if t_sValidKeys contains the key or t_sValidKeys = EMPTY then
              t_bAllow = 1
            end if
            if not t_bAllow then
              t = createDialogWindow(this.getID(), "CharNotAllowed", 1, 1)
              t.show()
              t_sMsg = getText("reg.char.not.allowed")
              t.setText(t_sMsg, "Error", "OK")
              return 1
            end if
            t_txt = m_rWindow.getElement("reg.username.input").getText()
            t_iMaxlength = 18
            tElem = m_rWindow.getElement(a_sElem)
            if tElem <> 0 then
              if tElem.pMember.text.char.count >= t_iMaxlength then
                tElem.pMember.text = tElem.pMember.char[1..t_iMaxlength]
                t = createDialogWindow(this.getID(), "CheckNameLength", 1, 1)
                t.show()
                t_sMsg = getText("reg.name.toolong")
                t.setText(t_sMsg, "Error", "OK")
                return 1
              end if
            end if

        end case

    end case
  end if
end