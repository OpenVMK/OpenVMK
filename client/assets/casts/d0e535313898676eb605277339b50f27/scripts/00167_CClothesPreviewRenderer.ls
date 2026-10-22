-- Script
property m_ar_SetsForRenderer
property m_mp_ThumbList
property m_ar_ClothesToLoad
property m_bAllClothesLoaded
property m_mp_ObjectPool
property m_objThumbsRenderer
property m_objThumbCache
property m_rCallback
property m_sImageType
property m_rcThumbRect

on construct this
  m_ar_SetsForRenderer = getVariable("AllAvailableSets")
  m_ar_rSetContents = getVariable("SetContents")
  m_bAllClothesLoaded = 0
  m_mp_ThumbList = VOID
  m_objThumbsRenderer = VOID
  m_ar_ClothesToLoad = []
  m_mp_ObjectPool = [:]
  m_rcThumbRect = rect(0, 0, 38, 38)
  m_objThumbCache = getObject("ClothesThumbCache")
  this.CreteObjectsPool()
  return 1
end
on deconstruct this
  return 1
end
on CreteObjectsPool me
  t_ar_Parts = ["ht", "hd", "hr", "fc", "ey", "tr", "rh", "ri", "lh", "li", "llg", "rlg", "ls", "rs", "ch", "ch2", "lsh", "rsh", "lpn", "rpn"]
  repeat with i = 1 to t_ar_Parts.count
    t_sName = t_ar_Parts[i]
    case t_sName of
      "llg", "rlg", "lsh", "rsh", "lpn", "rpn":
        t_sName = "lg"
      "ls":
        t_sName = "llg"
      "rs":
        t_sName = "rlg"

    end case
    t_sObjectName = "CBodypartClass_" & t_sName
    if memberExists(t_sObjectName) then
      t_PartObj = createObject(#temp, t_sObjectName)
    else
      t_PartObj = createObject(#temp, "CBodypartClass")
    end if
    m_mp_ObjectPool.addProp(t_ar_Parts[i], t_PartObj)
  end repeat
end
on Define me, a_mp_ItemList, a_rCallback, a_sType
  m_rCallback = a_rCallback
  m_sImageType = a_sType
  me.RenderClothes(a_mp_ItemList)
end
on RenderClothes me, a_mp_ClothesList
  m_bAllClothesLoaded = 0
  m_ar_ClothesToLoad = []
  m_mp_ThumbList = a_mp_ClothesList
  t_Obj = getThread(#AvatarFactory).component.GetClothAssetManager()
  repeat with i = 1 to a_mp_ClothesList.count
    t_iSetNum = a_mp_ClothesList.getPropAt(i)
    t_sSetName = me.GetSetName(t_iSetNum)
    if t_sSetName <> "hr" and t_sSetName <> "hd" then
      if m_ar_ClothesToLoad.findPos(t_iSetNum) = 0 then
        t_mp_CachedList = m_objThumbCache.GetCachedItem(t_iSetNum)
        if listp(t_mp_CachedList) then
          if m_sImageType = "Preview" then
            m_mp_ThumbList[string(t_iSetNum)] = t_mp_CachedList.preview
          else
            m_mp_ThumbList[string(t_iSetNum)] = t_mp_CachedList.thumb
          end if
          next repeat
        end if
        m_ar_ClothesToLoad.add(t_iSetNum)
        t_Obj.LoadCastLibsForCloth(me, t_iSetNum)
      end if
    end if
  end repeat
  if m_ar_ClothesToLoad.count = 0 then
    m_bAllClothesLoaded = 1
  end if
  me.StartWaiting()
end
on StartWaiting me
  if not m_bAllClothesLoaded or m_ar_ClothesToLoad.count > 0 then
    me.delay(200, #StartWaiting)
  else
    call(m_rCallback[#method], [getObject(m_rCallback[#client])], m_mp_ThumbList, m_rCallback)
    removeObject(me.getID())
  end if
end
on RenderClothesPreview me, a_iPartID
  if a_iPartID = -1 then
    exit
  end if
  t_arSetPieces = []
  t_iPartNum = a_iPartID
  t_sSetName = me.GetSetName(t_iPartNum)
  if voidp(t_sSetName) then
    exit
  end if
  t_Img = image(200, 200, 32)
  t_Alpha = image(200, 200, 8, #grayscale)
  t_arSetPieces = []
  t_Img = VOID
  t_iPos = m_ar_SetsForRenderer[t_sSetName].findPos(t_iPartNum)
  if t_iPos > 0 then
    t_mp_partMems = m_ar_SetsForRenderer[t_sSetName][t_iPos][1]
    t_partCol = rgb(m_ar_SetsForRenderer[t_sSetName][t_iPos][2][1])
  else
    put "No such set :" && t_iPartNum
    exit
  end if
  case 1 of
    t_iPartNum >= 24000 and t_iPartNum < 26000, t_iPartNum >= 34000 and t_iPartNum < 36000, t_iPartNum >= 44000 and t_iPartNum < 46000:
      t_iDir = 4
    otherwise:
      t_iDir = 3

  end case
  repeat with i = 1 to t_mp_partMems.count
    t_sPart = t_mp_partMems.getPropAt(i)
    t_iModel = t_mp_partMems[i]
    t_mem = "std_" & t_sPart & "_" & t_iModel & "_" & t_iDir & "_0"
    if not memberExists(t_mem) then
      t_mem = "std_" & t_sPart & "_" & t_iModel & "_" & 3 & "_0"
    end if
    t_Img = image(200, 200, 32)
    t_Alpha = image(200, 200, 8, #grayscale)
    t_PartObj = m_mp_ObjectPool[t_sPart]
    t_PartObj.Define(t_sPart, t_iModel, t_partCol, t_iDir, "std", me)
    t_arSetPieces.add(t_PartObj)
  end repeat
  if not voidp(t_Img) then
    repeat with u = 1 to t_arSetPieces.count
      call(#copyPicture, [t_arSetPieces[u]], t_Img, t_iDir, "std")
      call(#copyAlpha, [t_arSetPieces[u]], t_Alpha, t_iDir, "std", VOID)
    end repeat
    t_img2 = image(400, 400, 32)
    t_Alpha2 = image(400, 400, 8, #grayscale)
    tdestrect = t_img2.rect - t_Img.rect * 2
    tMargins = rect(0, 5, 0, 5)
    tdestrect = rect(0, tdestrect.bottom, t_Img.width * 2, t_img2.rect.bottom) + tMargins
    t_img2.copyPixels(t_Img, tdestrect, t_Img.rect)
    t_Alpha2.copyPixels(t_Alpha, tdestrect, t_Alpha.rect, [#ink: 39])
    t_img2.setAlpha(t_Alpha2)
    t_img2.useAlpha = 1
    t_img2 = t_img2.trimWhiteSpace()
    if t_img2.width > 0 and t_img2.height > 0 then
      t_rThumb = image(m_rcThumbRect.width, m_rcThumbRect.height, 32)
      t_rThumbAlpha = image(m_rcThumbRect.width, m_rcThumbRect.height, 8, #grayscale)
      if t_img2.width > t_img2.height then
        t_iScale = float(t_rThumb.width) / t_img2.width
        t_rcRect = rect(0, 0, t_rThumb.width, t_iScale * t_img2.height)
        t_rcOff = [0, (t_rThumb.height - t_rcRect.height) / 2, 0, (t_rThumb.height - t_rcRect.height) / 2]
      else
        t_iScale = float(t_rThumb.width) / t_img2.height
        t_rcRect = rect(0, 0, t_iScale * t_img2.width, t_rThumb.height)
        t_rcOff = [(t_rThumb.width - t_rcRect.width) / 2, 0, (t_rThumb.width - t_rcRect.width) / 2, 0]
      end if
      t_Alpha3 = t_img2.extractAlpha()
      t_rThumb.copyPixels(t_img2, t_rcRect + t_rcOff, t_img2.rect, [#useFastQuads: 1])
      t_rThumbAlpha.copyPixels(t_Alpha3, t_rcRect + t_rcOff, t_img2.rect, [#useFastQuads: 1])
      t_rThumb.setAlpha(t_rThumbAlpha)
      t_rThumb.useAlpha = 1
      t_mp_CachedImages = [:]
      t_mp_CachedImages.addProp(#preview, t_img2)
      t_mp_CachedImages.addProp(#thumb, t_rThumb)
      m_objThumbCache.AddItemToCache(t_iPartNum, t_mp_CachedImages)
      if m_sImageType = "Preview" then
        m_mp_ThumbList[string(t_iPartNum)] = t_img2
      else
        m_mp_ThumbList[string(t_iPartNum)] = t_rThumb
      end if
    end if
  end if
end
on GetSetName me, a_iPartNum
  t_iSetNum = a_iPartNum
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
  return t_sSetName
end
on AssetsLoaded me, a_iCloth
  t_iPos = m_ar_ClothesToLoad.findPos(a_iCloth)
  if t_iPos > 0 then
    m_ar_ClothesToLoad.deleteAt(t_iPos)
    me.RenderClothesPreview(a_iCloth)
  end if
  if m_ar_ClothesToLoad.count = 0 then
    m_bAllClothesLoaded = 1
  end if
end