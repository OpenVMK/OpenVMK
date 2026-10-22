-- Script
property m_mp_iType_rImage
property m_ar_iToBeLoaded
property m_rFurniLoader
property m_rClient
property m_kMethod
property m_rCallback

on construct this
  m_rFurniLoader = getThread(#room).component.GetFurniAssetManager()
  m_ar_iToBeLoaded = []
end
on load this, a_mp_iType_rOutput, a_rCallback, a_rClient, a_kMethod
  m_mp_iType_rImage = a_mp_iType_rOutput
  m_rCallback = a_rCallback
  m_rClient = a_rClient
  m_kMethod = a_kMethod
  t_iCount = a_mp_iType_rOutput.count
  repeat with i = 1 to t_iCount
    t_iType = a_mp_iType_rOutput.getPropAt(i)
    if t_iType > 10000 then
      t_iType = t_iType - 10000
    end if
    if m_ar_iToBeLoaded.getPos(t_iType) < 1 then
      if not m_rFurniLoader.IsItemReady(t_iType) then
        m_ar_iToBeLoaded.add(t_iType)
      end if
    end if
  end repeat
  if m_ar_iToBeLoaded.count then
    repeat with t_iType in m_ar_iToBeLoaded
      m_rFurniLoader.LoadCastLibsForType(t_iType)
    end repeat
    receiveUpdate(this.getID())
  else
    this.update()
  end if
end
on update this
  t_iCount = m_ar_iToBeLoaded.count
  repeat with i = t_iCount down to 1
    if m_rFurniLoader.IsItemReady(m_ar_iToBeLoaded[i]) then
      m_ar_iToBeLoaded.deleteAt(i)
    end if
  end repeat
  if m_ar_iToBeLoaded.count = 0 then
    removeUpdate(this.getID())
    call(m_kMethod, m_rClient, m_mp_iType_rImage, m_rCallback)
    removeObject(this.getID())
  end if
end