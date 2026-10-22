-- Script
property m_iTileSize
property m_ObjRenderer
property m_ar_ClothesToLoad
property m_bAllClothesLoaded
property m_mp_ParsedData
property m_mp_ActionData
property m_rSpr
property m_bJustImage
property m_mp_CallBackData
property m_memAnimator

on construct me
  m_ClsPartObj = VOID
  m_ar_ClothesToLoad = []
  m_bAllClothesLoaded = 0
  m_mp_ParsedData = VOID
  m_mp_ActionData = VOID
  m_rSpr = VOID
  m_mp_CallBackData = VOID
end
on deconstruct me
  if not voidp(m_rSpr) then
    releaseSprite(m_rSpr.spriteNum)
  end if
end
on Define me, a_mp_DataList
  registerObject(getUniqueID(), me)
  m_bAllClothesLoaded = 0
  t_ar_ClothesToLoad = [:]
  m_mp_ParsedData = getThread(#AvatarFactory).component.ParseFigure(a_mp_DataList.outlook)
  m_iTileSize = a_mp_DataList.tilesize
  m_ObjRenderer = createObject(#temp, "CAvatarFactor")
  m_ObjRenderer.Define(m_mp_ParsedData)
  m_ObjRenderer.SetAnimatingState()
  m_ObjRenderer.SetTileSize(m_iTileSize)
  t_Obj = getThread(#AvatarFactory).component.GetClothAssetManager()
  if objectp(t_Obj) then
    t_mp_DataList = a_mp_DataList.outlook
    repeat with i = 1 to t_mp_DataList.count
      if i mod 2 then
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
              t_ar_ClothesToLoad.addProp(t_iSetNum, VOID)
            end if
          end if
        end if
      end if
    end repeat
    if t_ar_ClothesToLoad.count > 0 then
      t_mp_Data1 = [#client: me.getID(), #method: #ClothesThumbsLoaded]
      executeMessage("GetClothThumbnail", t_ar_ClothesToLoad, t_mp_Data1)
    else
      m_bAllClothesLoaded = 1
    end if
  end if
  if a_mp_DataList.findPos(#sprite) > 0 then
    me.SetSprite(a_mp_DataList.sprite)
  else
    me.SetSprite()
  end if
end
on ClothesThumbsLoaded me, a_mpItemList
  m_bAllClothesLoaded = 1
  me.AllClothesReady()
end
on setCallback me, a_sObjName, a_sMethod, a_mp_Data
  if not voidp(a_sObjName) then
    m_mp_CallBackData = [#object: getObject(a_sObjName), #method: a_sMethod, #data: a_mp_Data]
  end if
end
on SetSprite me, a_Spr
  m_memAnimator = createMember(getUniqueID(), #bitmap)
  if voidp(a_Spr) then
    if voidp(m_rSpr) then
      m_rSpr = sprite(reserveSprite())
    end if
    m_rSpr.member = m_memAnimator
    m_bJustImage = 1
  else
    m_rSpr = a_Spr
    m_rSpr.member = m_memAnimator
    m_bJustImage = 0
  end if
end
on AllClothesReady me
  if objectp(m_ObjRenderer) then
    m_ObjRenderer.Define(m_mp_ParsedData)
    m_bAllClothesLoaded = 1
  end if
end
on SetAction me, a_mp_Data
  if a_mp_Data <> VOID then
    m_mp_ActionData = a_mp_Data
  end if
  if m_bAllClothesLoaded then
    if objectp(m_ObjRenderer) and listp(m_mp_ActionData) then
      t_mp = m_mp_ActionData
      if t_mp.findPos(#Weapon) > 0 then
        t_iWeapon = t_mp.Weapon
      else
        t_iWeapon = 0
      end if
      if t_mp.findPos(#onlyhead) > 0 then
        t_bOnlyHead = t_mp.onlyhead
      else
        t_iOnlyHead = 0
      end if
      t_ar_ActionList = [t_mp.head, t_mp.body, t_mp.emoticon, 0, 0, t_mp.LeftHand, t_mp.RightHand, t_mp.legs, 0, t_mp.magic, t_iWeapon]
      m_ObjRenderer.Action(t_ar_ActionList)
      if t_bOnlyHead then
        m_ObjRenderer.DrawOnlyHead()
      end if
      t_LocH = m_rSpr.locH
      t_LocV = m_rSpr.locV
      t_LocZ = m_rSpr.locZ
      t_vLoc = vector(t_LocH, t_LocV, t_LocZ)
      m_ObjRenderer.update(m_rSpr, t_vLoc)
      t_Img = VOID
      repeat while t_Img = VOID
        m_ObjRenderer.update(m_rSpr, t_vLoc)
        t_Img = m_rSpr.member.image
        if not voidp(t_Img) then
          exit repeat
        end if
      end repeat
      if t_bOnlyHead then
        t_img2 = image(80, 100, 32)
        t_Alpha2 = image(80, 100, 8, #grayscale)
        t_Alpha2.copyPixels(t_Img.extractAlpha(), t_img2.rect, rect(0, 20, 80, 120), #useFastQuads = 1)
        t_img2.copyPixels(t_Img, t_img2.rect, rect(0, 20, 80, 120), #useFastQuads = 1)
        t_img2.setAlpha(t_Alpha2)
        t_img2.useAlpha = 1
        t_Img = t_img2
      end if
      if m_bJustImage then
        if voidp(m_mp_CallBackData) then
          return t_Img
        else
          t_Obj = m_mp_CallBackData.object
          if objectp(t_Obj) then
            call(m_mp_CallBackData.method, [t_Obj], t_Img, m_mp_CallBackData.data)
            unregisterObject(me.getID())
          end if
        end if
      end if
    end if
  else
    me.delay(300, #SetAction)
  end if
end
on update me
  if objectp(m_ObjRenderer) then
    t_vLoc = vector(0, 0, 0)
    m_ObjRenderer.update(m_rSpr, t_vLoc)
    t_Img = VOID
    repeat while t_Img = VOID
      m_ObjRenderer.update(m_rSpr, t_vLoc)
      t_Img = m_rSpr.member.image
      if not voidp(t_Img) then
        exit repeat
      end if
    end repeat
    if m_bJustImage then
      if voidp(m_mp_CallBackData) then
        return t_Img
      else
        t_Obj = m_mp_CallBackData.object
        if objectp(t_Obj) then
          call(m_mp_CallBackData.method, t_Obj, t_Img, m_mp_CallBackData.data)
        end if
      end if
      unregisterObject(me.getID())
    end if
  end if
end
on setAnimation me, a_sAnim
  if objectp(m_ObjRenderer) then
    m_ObjRenderer.setAnimation(a_sAnim)
    if not timeoutExists("AnimatorBattleTimer") then
      createTimeout("AnimatorBattleTimer", 250, #update, me.getID(), VOID, 0)
    end if
  end if
end
on AssetsLoaded me, a_iCloth
  t_iPos = m_ar_ClothesToLoad.findPos(a_iCloth)
  if t_iPos > 0 then
    m_ar_ClothesToLoad.deleteAt(t_iPos)
  end if
  if m_ar_ClothesToLoad.count = 0 then
    m_bAllClothesLoaded = 1
    me.AllClothesReady()
  end if
end