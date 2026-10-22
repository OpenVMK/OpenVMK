-- Script
property m_rCurPageObj
property m_rCurPageObj2
property m_rWindow
property m_rWindow2
property m_mpAvatarData
property m_sMiniGameName

on construct this
  m_rCurPageObj = VOID
  m_rCurPageObj2 = VOID
  m_mpAvatarData = VOID
  registerMessage("room_leave", this.getID(), #closeAll)
  registerMessage("ui_AvatarBuilder", this.getID(), #OpenCloseAvatarBuilder)
  registerMessage("close_AvatarBuilder", this.getID(), #CloseAvatarBuilder)
  registerMessage("ui_Settings", this.getID(), #OpenCloseSettings)
  registerMessage("close_Settings", this.getID(), #CloseSettings)
  registerMessage(#Initialize, this.getID(), #AllCastsDone)
  registerMessage(#MinigameState, this.getID(), #MinigameStateChange)
  m_rWindow = VOID
  m_rWindow2 = VOID
  return 1
end
on deconstruct this
  if objectp(m_rCurPageObj) then
    removeObject(m_rCurPageObj.getID())
    m_rCurPageObj = VOID
  end if
  if objectp(m_rCurPageObj2) then
    removeObject(m_rCurPageObj2.getID())
    m_rCurPageObj2 = VOID
  end if
  removeObject("EmoticonMenu")
  removeObject("MagicMenu")
  unregisterMessage("ui_AvatarBuilder", this.getID())
  unregisterMessage("close_AvatarBuilder", this.getID())
  unregisterMessage("ui_Settings", this.getID())
  unregisterMessage("close_Settings", this.getID())
  unregisterMessage("room_leave", this.getID())
  unregisterMessage(#MinigameState, this.getID())
  return 1
end
on AllCastsDone this
  createObject("EmoticonMenu", "CEmoticons")
  createObject("MagicMenu", "CMagicMenu")
  m_rCurPageObj = createObject(getUniqueID(), "CAvatarBuilderPageBase")
  m_rCurPageObj2 = createObject(getUniqueID(), "CSettingsPageBase")
end
on OpenCloseAvatarBuilder this
  if voidp(m_rWindow) then
    t_Obj = getThread(#room).component._AccessRoom()
    if objectp(t_Obj) then
      getConnection(getVariable("main.connection.id", "VMK")).send("REQUESTDATA")
    else
      return 0
    end if
  else
    if objectp(m_rCurPageObj) then
      m_rCurPageObj.CloseSettings()
      m_rWindow = VOID
      m_iPageToShow = VOID
      if objectExists("AvatarBuilderClothesLoader") then
        removeObject("AvatarBuilderClothesLoader")
      end if
    end if
  end if
end
on CloseAvatarBuilder this
  if objectp(m_rCurPageObj) then
    m_rCurPageObj.CloseSettings()
    m_rWindow = VOID
    m_iPageToShow = VOID
  end if
  if objectExists("AvatarBuilderClothesLoader") then
    removeObject("AvatarBuilderClothesLoader")
  end if
end
on closeAll this
  this.CloseAvatarBuilder()
  this.CloseSettings()
  if objectExists("AvatarBuilderClothesLoader") then
    removeObject("AvatarBuilderClothesLoader")
  end if
end
on MinigameStateChange me, a_sState, a_sGameName
  m_sMiniGameName = a_sGameName
end
on AvatarDataReceived this, a_mpAvatarData
  if listp(a_mpAvatarData) and m_sMiniGameName <> "jungle_cruise" then
    m_mpAvatarData = a_mpAvatarData
    this._RefreshSettingList(m_mpAvatarData, "MyAvatar")
    m_rWindow = m_rCurPageObj.GetWindowObj()
    getConnection(getVariable("main.connection.id", "VMK")).send("GETFIGURELIST")
  end if
end
on AvailableSetsReceived this, a_mpAvailableSets
  if listp(a_mpAvailableSets) then
    m_rCurPageObj.update(a_mpAvailableSets, "AvailableSets")
  end if
end
on SloganChanged this, a_iFromHK
  if a_iFromHK then
    t_sMsg = getText("set.slogan.changed.by.staff")
  else
    t_sMsg = getText("set.slogan.changed")
  end if
  t = createDialogWindow(this.getID(), "SloganChanged", 1, 1)
  t.show()
  t.setText(t_sMsg, "Slogan changed", "OK")
  this.CloseSettings()
end
on OpenCloseSettings this
  if voidp(m_rWindow2) then
    m_rCurPageObj2.update(VOID, VOID)
    m_rWindow2 = m_rCurPageObj2.GetWindowObj()
  else
    if objectp(m_rCurPageObj2) then
      m_rCurPageObj2.CloseSettings()
      m_rWindow2 = VOID
    end if
  end if
end
on CloseSettings this
  if objectp(m_rCurPageObj2) then
    m_rCurPageObj2.CloseSettings()
    m_rWindow2 = VOID
  end if
end
on GetCurrentWindow this
  return m_rWindow
end
on _RefreshSettingList this, a_mp_kType_mp_iRef_rItem, a_kAlteredCategory
  m_rCurPageObj.update(a_mp_kType_mp_iRef_rItem, a_kAlteredCategory)
end