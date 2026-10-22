-- Script
property m_rWindow
property m_bDataGathered
property m_ar_AvatarData

on construct this
  m_rWindow = VOID
  m_bDataGathered = 1
  m_ar_AvatarData = VOID
  this.updateStats()
  return 1
end
on deconstruct this
  if objectp(m_rWindow) then
    this.Purge(m_rWindow)
  end if
  return 1
end
on merge this, a_rWindow
  m_rWindow = a_rWindow
  m_rWindow.merge("vmk_reg_step2.window")
  this.attachAnimation("animation", "reg_anim.ani")
  return 1
end
on Purge this, a_rWindow
  t_rAnimationManager = getObject("AnimationManager")
  if objectp(t_rAnimationManager) then
    t_rAnimationManager.ClearAll()
  end if
  if objectp(m_rWindow) then
    m_rWindow = VOID
    return a_rWindow.unmerge()
  else
    return 1
  end if
end
on updateStats this
  if textExists("reg.page2.url") then
    t_sTrackingURL = getText("reg.page2.url")
    t_iRandom = random(the milliSeconds)
    t_sNetThing = replaceChunks(t_sTrackingURL, "randomNumber", t_iRandom)
    if t_sTrackingURL.ilk = #string then
      t_ID = preloadNetThing(t_sNetThing)
    end if
  else
    return 0
  end if
end
on DataGathered this
  return m_bDataGathered
end
on update this, a_mp_kType_mp_iRef_rItem, a_kAlteredCategory
  m_ar_AvatarData = a_mp_kType_mp_iRef_rItem
  case a_kAlteredCategory of
    "AvatarCreated":
      m_bDataGathered = 1
    "AvatarNames":
      this._SuggestNames()

  end case
end
on attachAnimation me, a_sElemName, a_sAnimMemName
  t_rElem = m_rWindow.getElement(a_sElemName)
  if objectp(t_rElem) then
    t_rElem.hide()
    t_rSprite = t_rElem.getProperty(#sprite)
    if t_rSprite.spriteNum > 0 then
      t_vPos = vector(t_rSprite.locH, t_rSprite.locV - 6, t_rSprite.locZ)
      t_rAnimationManager = getObject("AnimationManager")
      if objectp(t_rAnimationManager) then
        t_rAnimationManager.ClearAll()
        t_rAnimationManager.NewAnimation(t_vPos, a_sElemName, a_sAnimMemName, #sprite)
      end if
    end if
  end if
end
on _SuggestNames
  t_ar_nameList = m_ar_AvatarData["AvatarNames"]
  t_sTxt = EMPTY
  if t_ar_nameList.count > 0 then
    repeat with i = 1 to t_ar_nameList.count
      t_sTxt = t_sTxt & TAB & t_ar_nameList[i]
    end repeat
  end if
  if m_rWindow.elementExists("reg.username.taken.hd") then
    m_rWindow.getElement("reg.username.taken.hd").setProperty(#visible, 1)
  end if
  if m_rWindow.elementExists("reg.username.list.hd") then
    m_rWindow.getElement("reg.username.list.hd").setProperty(#visible, 1)
  end if
  if m_rWindow.elementExists("reg.username.list") then
    m_rWindow.getElement("reg.username.list").setText(t_sTxt)
  end if
end
on _GatherData this
  t_txt = VOID
  if objectp(m_rWindow) then
    t_iMaxlength = 18
    t_iMinlength = 4
    tElem = m_rWindow.getElement("reg.username.input")
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
        t_txt = tElem.getText()
      end if
    end if
    t_mp_dataToServer = [:]
    t_mp_dataToServer.addProp(#string, t_txt)
    getObject(#session).set("name", t_txt)
    t_sSex = getObject(#session).get("sex")
    if t_sSex = "M" then
      t_iSex = 0
    else
      t_iSex = 1
    end if
    t_mp_dataToServer.addProp(#integer, t_iSex)
    t_ar_AvatarFigure = getObject(#session).get("figure")
    if listp(t_ar_AvatarFigure) then
      repeat with i = 1 to t_ar_AvatarFigure.count
        if i mod 2 then
          t_mp_dataToServer.addProp(#integer, t_ar_AvatarFigure[i])
          next repeat
        end if
        t_mp_dataToServer.addProp(#integer, t_ar_AvatarFigure[i])
      end repeat
    end if
    getConnection("VMK").send("CreateAvatar", t_mp_dataToServer)
  else
    t = createDialogWindow(this.getID(), "CheckName", 1, 1)
    t.show()
    t_sMsg = getText("reg.name.wrong")
    t.setText(t_sMsg, "Error", "OK")
    return 0
  end if
end
on _EventProc this, a_kEvent, a_sElem, a_vParam
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