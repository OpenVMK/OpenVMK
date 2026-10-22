-- Script
property m_ar_ClothesToLoad
property m_mp_DataList
property m_rGridLoadAnim
property m_rWindow

on construct this
  m_ar_ClothesToLoad = []
  m_mp_DataList = VOID
  m_rWindow = VOID
  return 1
end
on deconstruct this
  if objectp(m_rGridLoadAnim) then
    removeObject(m_rGridLoadAnim.getID())
    m_rGridLoadAnim = VOID
  end if
  return 1
end
on DefineAvailableSets this, a_Ar_Data
  this.ShowLoginLoadingScreen()
  m_ar_ClothesToLoad = []
  t_mp_DataList = a_Ar_Data
  t_mp_DataList.sort()
  m_mp_DataList = t_mp_DataList
  t_Obj = getThread(#AvatarFactory).component.GetClothAssetManager()
  if objectp(t_Obj) then
    repeat with i = 1 to t_mp_DataList.count
      t_iSetNum = t_mp_DataList[i]
      case 1 of
        t_iSetNum = -1:
          t_sSetName = "ht"
        t_iSetNum >= 20000 and t_iSetNum < 21000, t_iSetNum >= 30000 and t_iSetNum < 31000, t_iSetNum >= 40000 and t_iSetNum < 41000:
          t_sSetName = "hr"
        t_iSetNum >= 21000 and t_iSetNum < 22000, t_iSetNum >= 31000 and t_iSetNum < 32000, t_iSetNum >= 41000 and t_iSetNum < 42000:
          t_sSetName = "ht"
        t_iSetNum >= 22000 and t_iSetNum < 24000, t_iSetNum >= 32000 and t_iSetNum < 34000, t_iSetNum >= 42000 and t_iSetNum < 44000:
          t_sSetName = "hd"
        t_iSetNum >= 24000 and t_iSetNum < 26000, t_iSetNum >= 34000 and t_iSetNum < 36000, t_iSetNum >= 44000 and t_iSetNum < 46000:
          t_sSetName = "ch"
        t_iSetNum >= 26000 and t_iSetNum < 28000, t_iSetNum >= 36000 and t_iSetNum < 38000, t_iSetNum >= 46000 and t_iSetNum < 48000:
          t_sSetName = "pn"
        t_iSetNum >= 28000 and t_iSetNum < 30000, t_iSetNum >= 38000 and t_iSetNum < 40000, t_iSetNum >= 48000:
          t_sSetName = "sh"

      end case
      if t_sSetName <> "hr" and t_sSetName <> "hd" then
        if m_ar_ClothesToLoad.findPos(t_iSetNum) = 0 then
          if not t_Obj.IsClothReady(t_iSetNum) then
            m_ar_ClothesToLoad.add(t_iSetNum)
            t_Obj.LoadCastLibsForCloth(this, t_iSetNum)
          end if
        end if
      end if
    end repeat
  end if
  if m_ar_ClothesToLoad.count = 0 then
    m_bAllClothesLoaded = 1
    if objectp(m_rWindow) then
      if m_rWindow.elementExists("loadingscreen") then
        m_rWindow.getElement("loadingscreen").setProperty(#visible, 0)
        t_ar_elements = ["change.ht.-1", "part.ht.preview", "change.ht.1", "change.hr.-1", "part.hr.preview", "change.hr.1", "change.hd.-1", "part.hd.preview", "change.hd.1", "change.ch.-1", "part.ch.preview", "change.ch.1", "change.pn.-1", "part.pn.preview", "change.pn.1", "change.sh.-1", "part.sh.preview", "change.sh.1", "human.preview.img", "change.hr.color.-1", "part.color.hr.preview", "change.hr.color.1", "change.hd.color.-1", "part.color.hd.preview", "change.hd.color.1", "set.myslogan.hd", "set.myslogan", "set.imready.button", "set.nohats.info", "back2"]
        repeat with i = 1 to t_ar_elements.count
          t_sElemName = t_ar_elements[i]
          if m_rWindow.elementExists(t_sElemName) then
            m_rWindow.getElement(t_sElemName).setProperty(#visible, 1)
          end if
        end repeat
      end if
      if objectp(m_rGridLoadAnim) then
        m_rGridLoadAnim.SetBufferElement(VOID)
        removeUpdate(m_rGridLoadAnim.getID())
      end if
    end if
    getThread(#AvatarFactory).handler.AllClothesLoaded(m_mp_DataList)
  end if
end
on ShowLoginLoadingScreen this
  if voidp(m_rGridLoadAnim) then
    m_rGridLoadAnim = createObject(getUniqueID(), "CMainThumbGridAnimator")
  end if
  m_rWindow = getThread(#AvatarFactory).interface.GetCurrentWindow()
  t_ar_elements = ["change.ht.-1", "part.ht.preview", "change.ht.1", "change.hr.-1", "part.hr.preview", "change.hr.1", "change.hd.-1", "part.hd.preview", "change.hd.1", "change.ch.-1", "part.ch.preview", "change.ch.1", "change.pn.-1", "part.pn.preview", "change.pn.1", "change.sh.-1", "part.sh.preview", "change.sh.1", "human.preview.img", "change.hr.color.-1", "part.color.hr.preview", "change.hr.color.1", "change.hd.color.-1", "part.color.hd.preview", "change.hd.color.1", "set.myslogan.hd", "set.myslogan", "set.imready.button", "set.nohats.info", "back2"]
  if objectp(m_rWindow) then
    if m_rWindow.elementExists("loadingscreen") then
      repeat with i = 1 to t_ar_elements.count
        t_sElemName = t_ar_elements[i]
        if m_rWindow.elementExists(t_sElemName) then
          m_rWindow.getElement(t_sElemName).setProperty(#visible, 0)
        end if
      end repeat
      m_rWindow.getElement("loadingscreen").setProperty(#visible, 1)
      t_Img = m_rWindow.getElement("loadingscreen").getProperty(#image)
      t_Img.fill(t_Img.rect, rgb(39, 86, 146))
      m_rGridLoadAnim.SetBufferElement(m_rWindow.getElement("loadingscreen"))
      receiveUpdate(m_rGridLoadAnim.getID())
    end if
  end if
end
on AssetsLoaded me, a_iCloth
  if voidp(m_rGridLoadAnim) then
    exit
  end if
  t_iPos = m_ar_ClothesToLoad.findPos(a_iCloth)
  if t_iPos > 0 then
    m_ar_ClothesToLoad.deleteAt(t_iPos)
  end if
  if m_ar_ClothesToLoad.count = 0 then
    m_bAllClothesLoaded = 1
    if objectp(m_rWindow) then
      if m_rWindow.elementExists("loadingscreen") then
        m_rWindow.getElement("loadingscreen").setProperty(#visible, 0)
        t_ar_elements = ["change.ht.-1", "part.ht.preview", "change.ht.1", "change.hr.-1", "part.hr.preview", "change.hr.1", "change.hd.-1", "part.hd.preview", "change.hd.1", "change.ch.-1", "part.ch.preview", "change.ch.1", "change.pn.-1", "part.pn.preview", "change.pn.1", "change.sh.-1", "part.sh.preview", "change.sh.1", "human.preview.img", "change.hr.color.-1", "part.color.hr.preview", "change.hr.color.1", "change.hd.color.-1", "part.color.hd.preview", "change.hd.color.1", "set.myslogan.hd", "set.myslogan", "set.imready.button", "set.nohats.info", "back2"]
        repeat with i = 1 to t_ar_elements.count
          t_sElemName = t_ar_elements[i]
          if m_rWindow.elementExists(t_sElemName) then
            m_rWindow.getElement(t_sElemName).setProperty(#visible, 1)
          end if
        end repeat
      end if
      if objectp(m_rGridLoadAnim) then
        m_rGridLoadAnim.SetBufferElement(VOID)
        removeUpdate(m_rGridLoadAnim.getID())
      end if
    end if
    getThread(#AvatarFactory).handler.AllClothesLoaded(m_mp_DataList)
  end if
end