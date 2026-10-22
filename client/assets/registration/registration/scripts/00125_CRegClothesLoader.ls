-- Script
property m_objLoadingWindow
property m_ar_ClothesToLoad

on construct this
  m_objLoadingWindow = VOID
  m_ar_ClothesToLoad = []
  return 1
end
on deconstruct this
  if objectp(m_objLoadingWindow) then
    removeObject(m_objLoadingWindow.getID())
  end if
  return 1
end
on DefineAvailableSets this, a_Ar_Data
  this.ShowLoginLoadingScreen()
  t_Obj = getThread(#AvatarFactory).component.GetClothAssetManager()
  if objectp(t_Obj) then
    t_mp_DataList = a_Ar_Data
    t_mp_DataList.sort()
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
          m_ar_ClothesToLoad.add(t_iSetNum)
          t_Obj.LoadCastLibsForCloth(this, t_iSetNum)
        end if
      end if
    end repeat
  end if
end
on ShowLoginLoadingScreen this
  t_sHdTxt = getText("reg.clothes.loading.hd")
  m_objLoadingWindow = createObject(getUniqueID(), "CLoadingWindow")
  t_mp_data = [#headline: t_sHdTxt, #showbutton: 0, #client: this.getID(), #modal: 1]
  if objectp(m_objLoadingWindow) then
    m_objLoadingWindow.DefineWindow(t_mp_data)
  end if
end
on AssetsLoaded me, a_iCloth
  t_iPos = m_ar_ClothesToLoad.findPos(a_iCloth)
  if t_iPos > 0 then
    m_ar_ClothesToLoad.deleteAt(t_iPos)
  end if
  if m_ar_ClothesToLoad.count = 0 then
    m_bAllClothesLoaded = 1
    if objectp(m_objLoadingWindow) then
      removeObject(m_objLoadingWindow.getID())
    end if
    getThread(#registration).handler.AllClothesLoaded()
  end if
end