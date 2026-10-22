-- Script
property m_bInitialized
property m_rCurPageObj
property m_obj_NameRejectionWindow
property m_mp_SavedDataWhileLoading
property m_bAllClothesLoaded
property m_rWindow

on construct this
  m_rWindow = VOID
  m_bInitialized = 0
  m_rCurPageObj = VOID
  m_bAllClothesLoaded = 0
  m_mp_SavedDataWhileLoading = VOID
  m_obj_NameRejectionWindow = VOID
  return 1
end
on deconstruct this
  if objectp(m_rCurPageObj) then
    removeObject(m_rCurPageObj.getID())
    m_rCurPageObj = VOID
  end if
  if windowExists("NameRejected") then
    removeWindow("NameRejected")
  end if
  m_obj_NameRejectionWindow = VOID
  m_rWindow = VOID
  return 1
end
on AllClothesLoaded this
  m_bAllClothesLoaded = 1
end
on CreateAvatar this
  if variableExists("AllAvailableSets") then
    getConnection("VMK").send("GetNewAvatarSets", [#int: 0])
    if timeoutExists("WaitAvatarParse") then
      removeTimeout("WaitAvatarParse")
    end if
  else
    if not timeoutExists("WaitAvatarParse") then
      createTimeout("WaitAvatarParse", 1000, #CreateAvatar, this.getID(), VOID, 0)
    end if
  end if
end
on NameRejected this, a_sName
  if voidp(m_obj_NameRejectionWindow) then
    m_obj_NameRejectionWindow = createObject("NameRejection", "CRegNameResubmit")
    m_obj_NameRejectionWindow.SetResubmitReason("rejected", a_sName)
  end if
end
on AlertNameRejection this, a_iReason, a_sInfo
  t_wnd = createDialogWindow(this.getID(), "NameNotAccepted", 1, 1)
  t_wnd.show()
  t_sMsg = getText("reg.name.not.accepted") & RETURN & getText("reg.name.rejection." & a_iReason) & RETURN & a_sInfo
  t_wnd.setText(t_sMsg, "Error", "OK")
end
on AlertNameResubmit this, a_sName
  if voidp(m_obj_NameRejectionWindow) then
    m_obj_NameRejectionWindow = createObject("NameRejection", "CRegNameResubmit")
    m_obj_NameRejectionWindow.SetResubmitReason("resubmit", a_sName)
  end if
end
on _RefreshRegList this, a_mp_kType_mp_iRef_rItem, a_kAlteredCategory
  if objectp(m_obj_NameRejectionWindow) and (a_kAlteredCategory = "AvatarNames" or a_kAlteredCategory = "GeneratedNames") then
    m_obj_NameRejectionWindow.update(a_mp_kType_mp_iRef_rItem, a_kAlteredCategory)
    exit
  end if
  if m_bAllClothesLoaded then
    if not m_bInitialized then
      m_rCurPageObj = createObject(getUniqueID(), "CRegPageBase")
      m_bInitialized = objectp(m_rCurPageObj)
    end if
    m_rCurPageObj.update(a_mp_kType_mp_iRef_rItem, a_kAlteredCategory)
    if listp(m_mp_SavedDataWhileLoading) then
      repeat with i = 1 to m_mp_SavedDataWhileLoading.count
        m_rCurPageObj.update(m_mp_SavedDataWhileLoading, m_mp_SavedDataWhileLoading.getPropAt(i))
      end repeat
      m_mp_SavedDataWhileLoading = VOID
    end if
  else
    m_mp_SavedDataWhileLoading = a_mp_kType_mp_iRef_rItem
  end if
end