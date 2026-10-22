-- Script
property m_rCallback
property m_mp_iType_rOutput
property m_mp_kCategory_mp_iType_rImage

on construct this
  m_rCallback = VOID
  m_mp_iType_rOutput = VOID
  m_mp_kCategory_mp_iType_rImage = [#item: [:], #poster: [:], #pin: [:], #cloth: [:], #room: [:]]
  return 1
end
on deconstruct this
  m_rCallback = VOID
  m_mp_iType_rOutput = VOID
  m_mp_kCategory_mp_iType_rImage = VOID
  return 1
end
on LoadImageAssets this, a_mp_iType_rOutput, a_rCallback, a_sThumbnaimOrPreview
  m_rCallback = a_rCallback
  m_mp_iType_rOutput = a_mp_iType_rOutput
  if a_mp_iType_rOutput.count = 0 then
    call(m_rCallback[#method], [getObject(m_rCallback[#client])], m_mp_iType_rOutput, m_rCallback)
    removeObject(this.getID())
    exit
  end if
  t_rPlaceHolder = image(0, 0, 32)
  t_iCount = a_mp_iType_rOutput.count
  repeat with i = 1 to t_iCount
    t_iType = a_mp_iType_rOutput.getPropAt(i)
    case 1 of
      t_iType < 2000:
        t_kCategory = #item
      t_iType > 2000 and t_iType < 3001:
        t_kCategory = #pin
      t_iType > 3000 and t_iType < 4001:
        t_kCategory = #poster
      t_iType > 20000 and t_iType < 50000:
        t_kCategory = #cloth
      t_iType > 5000 and t_iType < 6000:
        t_kCategory = #room
      t_iType > 6000 and t_iType < 8000:
        t_kCategory = #pin
      t_iType > 10000 and t_iType < 12001:
        t_kCategory = #item
      t_iType > 12000 and t_iType < 13001:
        t_kCategory = #pin
      otherwise:
        error(this, "Unknow item category for item number" && t_iType & "!", #LoadThumbnailAssets)
        next repeat

    end case
    if m_mp_kCategory_mp_iType_rImage[t_kCategory].getaProp(t_iType) = VOID then
      m_mp_kCategory_mp_iType_rImage[t_kCategory].addProp(t_iType, t_rPlaceHolder)
    end if
  end repeat
  if m_mp_kCategory_mp_iType_rImage[#item].count then
    executeMessage("GetFurni" & a_sThumbnaimOrPreview, m_mp_kCategory_mp_iType_rImage[#item], [#client: this.getID(), #method: #_AssetsLoadedCbk])
  end if
  if not this.valid then
    exit
  end if
  if m_mp_kCategory_mp_iType_rImage[#pin].count then
    executeMessage("GetPin" & a_sThumbnaimOrPreview, m_mp_kCategory_mp_iType_rImage[#pin], [#client: this.getID(), #method: #_AssetsLoadedCbk])
  end if
  if not this.valid then
    exit
  end if
  if m_mp_kCategory_mp_iType_rImage[#poster].count then
    executeMessage("GetPoster" & a_sThumbnaimOrPreview, m_mp_kCategory_mp_iType_rImage[#poster], [#client: this.getID(), #method: #_AssetsLoadedCbk])
  end if
  if not this.valid then
    exit
  end if
  if m_mp_kCategory_mp_iType_rImage[#cloth].count then
    executeMessage("GetCloth" & a_sThumbnaimOrPreview, m_mp_kCategory_mp_iType_rImage[#cloth], [#client: this.getID(), #method: #_AssetsLoadedCbk])
  end if
  if not this.valid then
    exit
  end if
  if m_mp_kCategory_mp_iType_rImage[#room].count then
    executeMessage("GetRoom" & a_sThumbnaimOrPreview, m_mp_kCategory_mp_iType_rImage[#room], [#client: this.getID(), #method: #_AssetsLoadedCbk])
  end if
end
on _AssetsLoadedCbk this, a_mp_iType_rOutput
  t_iType = a_mp_iType_rOutput.getPropAt(1)
  case 1 of
    t_iType < 2000:
      t_kCategory = #item
    t_iType > 2000 and t_iType < 3001:
      t_kCategory = #pin
    t_iType > 3000 and t_iType < 4001:
      t_kCategory = #poster
    t_iType > 20000 and t_iType < 50000:
      t_kCategory = #cloth
    t_iType > 5000 and t_iType < 6000:
      t_kCategory = #room
    t_iType > 6000 and t_iType < 8000:
      t_kCategory = #pin
    t_iType > 10000 and t_iType < 12001:
      t_kCategory = #item
    t_iType > 12000 and t_iType < 13001:
      t_kCategory = #pin
    otherwise:
      error(this, "Unknow item category for item number" && t_iType & "!", #_AssetsLoadedCbk)
      exit

  end case
  t_iCount = m_mp_iType_rOutput.count
  repeat with i = 1 to t_iCount
    t_iType = m_mp_iType_rOutput.getPropAt(i)
    t_rImage = a_mp_iType_rOutput.getaProp(t_iType)
    if not voidp(t_rImage) then
      m_mp_iType_rOutput[i] = t_rImage
    end if
  end repeat
  m_mp_kCategory_mp_iType_rImage[t_kCategory] = [:]
  this._CheckIfReady()
end
on _CheckIfReady this
  if m_mp_kCategory_mp_iType_rImage[#item].count = 0 then
    if m_mp_kCategory_mp_iType_rImage[#pin].count = 0 then
      if m_mp_kCategory_mp_iType_rImage[#poster].count = 0 then
        if m_mp_kCategory_mp_iType_rImage[#cloth].count = 0 then
          if m_mp_kCategory_mp_iType_rImage[#room].count = 0 then
            call(m_rCallback[#method], [getObject(m_rCallback[#client])], m_mp_iType_rOutput, m_rCallback)
            removeObject(this.getID())
          end if
        end if
      end if
    end if
  end if
end