-- Script
property m_arAnimCounters
property m_veAvatarLoc
property m_iMagicFx
property m_arFrameList
property m_ar_SpriteList
property m_iTileSize
property m_bFlip
property m_mp_Framelist
property m_arFlipList
property m_iDir
property m_iMyRef
property m_bTalk
property m_arCarpetFrameList
property m_arLightningFrameList
property m_iMagicFrameCounter
property m_iMagicBatStateCounter
property m_arBatFrameList
property m_ar_StormImgList
property m_iStormCounter
property m_sMyName
property m_sAvatarName
property m_FxSnd_obj
property m_iCurrendSoundPlaying
property m_sCarPantAction
property m_i_CarPantCounter
property m_iFireworksCounter
property m_SprFuel1
property m_SprFuel2
property m_iFuelPercent
property m_bTrashCanTalkState
property m_bSitting
property m_ar_SharkTalkFrames

on construct this
  m_arAnimCounters = []
  m_arFrameList = []
  m_ar_SpriteList = []
  m_mp_Framelist = [#front: [], #back: []]
  m_arFlipList = [0, 1, 2, 3, 4, 3, 2, 1]
  m_iMagicFx = 0
  m_iDir = 0
  m_arCarpetFrameList = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  m_arLightningFrameList = [1, 2, 3, 4]
  m_iMagicFrameCounter = 1
  m_iMagicBatStateCounter = 1
  m_arBatFrameList = [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3]
  m_ar_SharkTalkFrames = ["Magic_shark_talk_", "Magic_shark_swim_"]
  m_ar_StormImgList = VOID
  m_iStormCounter = 1
  m_FxSnd_obj = VOID
  m_iCurrendSoundPlaying = 0
  m_i_CarPantCounter = 0
  m_iFireworksCounter = 0
  m_SprFuel1 = VOID
  m_SprFuel2 = VOID
  m_iFuelPercent = VOID
  m_bTrashCanTalkState = 0
  m_bSitting = 0
  m_bTalk = 0
  this.regMsgList(1)
  return 1
end
on deconstruct this
  t_iCount = m_ar_SpriteList.count
  if t_iCount > 0 then
    repeat with i = 1 to t_iCount
      if m_ar_SpriteList[i].count > 0 then
        releaseSprite(m_ar_SpriteList[i].sprite.spriteNum)
      end if
    end repeat
  end if
  m_ar_SpriteList = []
  if timeoutExists("FxLocator" & m_iMyRef) then
    removeTimeout("FxLocator" & m_iMyRef)
  end if
  if objectp(m_FxSnd_obj) then
    m_FxSnd_obj.StopSound()
    removeObject(m_FxSnd_obj.getID())
    m_FxSnd_obj = VOID
  end if
  if not voidp(m_SprFuel1) then
    releaseSprite(m_SprFuel1.sprite.spriteNum)
  end if
  if not voidp(m_SprFuel2) then
    releaseSprite(m_SprFuel2.sprite.spriteNum)
  end if
  this.regMsgList(0)
  return 1
end
on GetActualPos this
  t_rCon = getThread(#room).component._AccessRoom()
  if not voidp(t_rCon) then
    t_rAvatar = t_rCon._AccessIndexed(m_iMyRef, "avatar")
    if voidp(t_rAvatar) then
      error(this, "Avatar not found:" && m_iMyRef, #_Magic)
    else
      t_veLoc = t_rAvatar.GetScrPos()
    end if
  end if
  if m_iMagicFx > 99 or m_iMagicFx = 17 then
    this.UpdateFuelMeter()
  end if
  if not voidp(t_veLoc) then
    m_veAvatarLoc = t_veLoc
    return this.SetMagicLocation()
  end if
end
on SetStormFximages me, a_ar_StormImgList
  m_ar_StormImgList = a_ar_StormImgList
end
on SetFx me, a_iMagicFx, a_iTileSize, a_bFlip, a_iDir, a_iMyRef, a_sMyName, a_sAvatarName
  m_iTileSize = a_iTileSize
  m_bFlip = a_bFlip
  m_iDir = a_iDir
  m_iMyRef = a_iMyRef
  m_sMyName = a_sMyName
  m_sAvatarName = a_sAvatarName
  if m_iMagicFx <> a_iMagicFx then
    m_iMagicFx = a_iMagicFx
    m_arAnimCounters = []
    m_arFrameList = []
    m_ar_SpriteList = []
    m_mp_Framelist = [#front: [], #back: []]
    m_iMagicFrameCounter = 1
    m_iMagicBatStateCounter = 1
    m_ar_StormImgList = VOID
    m_iStormCounter = 1
    m_iCurrendSoundPlaying = 0
    if objectp(m_FxSnd_obj) then
      m_FxSnd_obj.StopSound()
    end if
    me.PrepareFx()
    me.PlayMagicSound(m_iMagicFx)
    if m_iMagicFx > 99 then
      executeMessage("PlayFxSound", "MFX-car-start-1")
    end if
  end if
end
on UpdateAvatarLoc me, a_veAvatarLoc, a_Img_Avat
  m_veAvatarLoc = a_veAvatarLoc
  me.update(a_Img_Avat)
end
on update me, a_veAvatarLoc, a_SprAvatar
  m_veAvatarLoc = a_veAvatarLoc
  if m_iMagicFx = 9 then
    if listp(m_ar_StormImgList) then
      t_Img = m_ar_StormImgList[m_iStormCounter]
      if m_iStormCounter - 1 <> m_arFlipList[m_iStormCounter] then
        t_img2 = image(80, 160, 32)
        t_img2.setAlpha(image(80, 160, 8))
        t_img2.useAlpha = 1
        tQuad = [point(t_Img.width, 0), point(0, 0), point(0, t_Img.height), point(t_Img.width, t_Img.height)]
        t_img2.copyPixels(t_Img, tQuad, t_Img.rect, #useFastQuads = 1)
        t_Img = t_img2
      end if
      a_SprAvatar.member.image = t_Img
      t_iH = t_Img.width / 2
      t_iV = t_Img.height - 16
      t_pnt = point(t_iH, t_iV)
      a_SprAvatar.member.regPoint = t_pnt
      m_iStormCounter = m_iStormCounter + 1
      if m_iStormCounter > 8 then
        m_iStormCounter = 1
      end if
    end if
  end if
  t_Mem_AvatImage = a_SprAvatar.member
  if m_iMagicFx = 10 then
    t_ImgAvatar = me.DrawMagicCarpet(t_Mem_AvatImage)
  end if
  if m_iMagicFx = 11 then
    t_ImgAvatar = me.DrawMagicBatIn(t_Mem_AvatImage)
  end if
  if m_iMagicFx = 15 then
    t_ImgAvatar = me.DrawMagicBatOut(t_Mem_AvatImage)
  end if
  if m_iMagicFx = 16 then
    t_ImgAvatar = me.DrawPushTheTrashcan(t_Mem_AvatImage)
  end if
  if m_iMagicFx = 17 then
    t_ImgAvatar = me.DrawDiveEffects(t_Mem_AvatImage)
  end if
  if m_iMagicFx = 18 then
    t_ImgAvatar = me.DrawSpaceWalkEffects(t_Mem_AvatImage)
  end if
  if m_iMagicFx = 20 then
    t_ImgAvatar = me.DrawSwimming(t_Mem_AvatImage)
  end if
  if m_iMagicFx = 25 then
    t_ImgAvatar = me.DrawMagicSharkIn(t_Mem_AvatImage)
  end if
  if m_iMagicFx = 26 then
    t_ImgAvatar = me.DrawMagicSharkOut(t_Mem_AvatImage)
  end if
  if m_iMagicFx = 27 then
    t_ImgAvatar = me.DrawLightning(t_Mem_AvatImage)
  end if
  if m_iMagicFx = 90 then
    t_ImgAvatar = me.DrawLoader(t_Mem_AvatImage)
  end if
  if m_iMagicFx > 99 then
    t_ImgAvatar = me.DrawCarPants(t_Mem_AvatImage)
  end if
  t_ar_DrawList = []
  t_mp_ListBack = m_mp_Framelist.back
  t_mp_ListFront = m_mp_Framelist.front
  t_i_ListBackCount = t_mp_ListBack.count
  t_i_ListFrontCount = t_mp_ListFront.count
  if t_i_ListBackCount > 0 then
    repeat with i = 1 to t_i_ListBackCount
      if i <= t_i_ListBackCount then
        t_mp_ListBack[i].counter = t_mp_ListBack[i].counter + 1
        t_iFrameCount = t_mp_ListBack[i].frames.count
        if t_mp_ListBack[i].counter > t_iFrameCount then
          t_bLoop = t_mp_ListBack[i].loop
          if t_bLoop then
            t_mp_ListBack[i].counter = 1
          else
            t_mp_ListBack[i].counter = t_iFrameCount
          end if
        end if
        t_rMem = t_mp_ListBack[i].frames[t_mp_ListBack[i].counter]
        t_ar_DrawList.add(t_rMem)
        next repeat
      end if
      exit repeat
    end repeat
  end if
  if t_i_ListBackCount > 0 or t_i_ListFrontCount > 0 then
    if m_iMagicFx = 12 then
      m_iMagicFrameCounter = m_iMagicFrameCounter + 1
      if m_iMagicFrameCounter < 10 then
        t_ar_DrawList.add(t_Mem_AvatImage)
      end if
    else
      t_ar_DrawList.add(t_Mem_AvatImage)
    end if
  end if
  if t_i_ListFrontCount > 0 then
    repeat with i = 1 to t_i_ListFrontCount
      if i <= t_i_ListFrontCount then
        t_mp_ListFront[i].counter = t_mp_ListFront[i].counter + 1
        t_iFrameCount = t_mp_ListFront[i].frames.count
        if t_mp_ListFront[i].counter > t_mp_ListFront[i].frames.count then
          t_bLoop = t_mp_ListFront[i].loop
          if t_bLoop then
            t_mp_ListFront[i].counter = 1
          else
            t_mp_ListFront[i].counter = t_iFrameCount
          end if
        end if
        t_rMem = t_mp_ListFront[i].frames[t_mp_ListFront[i].counter]
        t_ar_DrawList.add(t_rMem)
        next repeat
      end if
      exit repeat
    end repeat
  end if
  if t_i_ListBackCount > 0 or t_i_ListFrontCount > 0 then
    t_ImgAvatar = me.createUnionImageFromMemberList(t_ar_DrawList, point(0, 0))
  end if
  if m_ar_SpriteList.count > 0 then
    if not timeoutExists("FxLocator" & m_iMyRef) then
      createTimeout("FxLocator" & m_iMyRef, 50, #GetActualPos, me.getID(), VOID, 0)
    end if
  end if
  return t_ImgAvatar
end
on SetPushTheTrashcanAction me, a_sCanAction
  if stringp(a_sCanAction) then
    m_sCarPantAction = a_sCanAction
  end if
end
on DrawPushTheTrashcan me, a_Mem_AvatImage
  t_iDir = m_arFlipList[m_iDir + 1]
  case m_sCarPantAction of
    "spk":
      m_bTrashCanTalkState = not m_bTrashCanTalkState
      m_sCarPantAction = "drk"
      m_i_CarPantCounter = 0
    "blk1":
      m_sCarPantAction = "blk"
      m_i_CarPantCounter = 0
    "blk2":
      m_sCarPantAction = "std"
      m_i_CarPantCounter = 0
    "wav":
      m_i_CarPantCounter = m_i_CarPantCounter + 1
      if m_i_CarPantCounter > 1 then
        m_i_CarPantCounter = 0
      end if
    "wlk":
      m_i_CarPantCounter = m_i_CarPantCounter + 1
      if m_i_CarPantCounter > 3 then
        m_i_CarPantCounter = 0
      end if
    otherwise:
      m_i_CarPantCounter = 0

  end case
  t_sCarPantAction = m_sCarPantAction
  t_sMemName = t_sCarPantAction & "_npc_1_" & t_iDir & "_" & m_i_CarPantCounter
  if memberExists(t_sMemName) then
    t_rMem = getMember(t_sMemName)
  else
    return 0
  end if
  if memberExists(t_sMemName & "_a") then
    t_rAlpha = getMember(t_sMemName & "_a")
  else
    t_rAlpha = t_rMem.image.extractAlpha()
  end if
  return [the image of t_rMem, t_rAlpha, VOID]
end
on SetCarPantAction me, a_iCarPantAction
  if a_iCarPantAction = 1 then
    m_sCarPantAction = "wlk"
  else
    m_sCarPantAction = "std"
  end if
end
on DrawCarPants me, a_Mem_AvatImage
  t_iDir = m_arFlipList[m_iDir + 1]
  if m_sCarPantAction = "wlk" then
    m_i_CarPantCounter = m_i_CarPantCounter + 1
    t_sCarPantAction = "wlk"
    if m_iMagicFx = 115 then
      if m_i_CarPantCounter > 1 then
        m_i_CarPantCounter = 0
      end if
    else
      if m_i_CarPantCounter > 3 then
        m_i_CarPantCounter = 0
      end if
    end if
  else
    m_i_CarPantCounter = 0
  end if
  if m_sCarPantAction = "std" then
    t_sCarPantAction = "wlk"
    m_i_CarPantCounter = 0
  end if
  t_ar_Images = []
  t_sMemName1 = t_sCarPantAction & "_carback_" & m_iMagicFx & "_" & t_iDir & "_" & m_i_CarPantCounter
  if memberExists(t_sMemName1) then
    t_ar_Images.add(getMember(t_sMemName1))
  end if
  if m_iMagicFx = 115 then
    t_pnt = a_Mem_AvatImage.regPoint
    a_Mem_AvatImage.regPoint = point(t_pnt[1], t_pnt[2] - 9)
  end if
  t_ar_Images.add(a_Mem_AvatImage)
  t_sMemName2 = t_sCarPantAction & "_carfront_" & m_iMagicFx & "_" & t_iDir & "_" & m_i_CarPantCounter
  if memberExists(t_sMemName2) then
    t_ar_Images.add(getMember(t_sMemName2))
  end if
  return me.createUnionImageFromMemberList(t_ar_Images, point(0, 0))
end
on DrawMagicCarpet me, a_Mem_AvatImage
  m_iMagicFrameCounter = m_iMagicFrameCounter + 1
  if m_iMagicFrameCounter > m_arCarpetFrameList.count then
    m_iMagicFrameCounter = 1
  end if
  t_iDir = m_arFlipList[m_iDir + 1]
  t_sMemName = "magic_carpet_" & t_iDir & "_" & m_arCarpetFrameList[m_iMagicFrameCounter]
  if memberExists(t_sMemName) then
    t_rMem = getMember(t_sMemName)
    return me.createUnionImageFromMemberList([t_rMem, a_Mem_AvatImage], point(0, 0))
  end if
end
on DrawLightning me, a_Mem_AvatImage
  m_iMagicFrameCounter = m_iMagicFrameCounter + 1
  if m_iMagicFrameCounter > m_arLightningFrameList.count then
    m_iMagicFrameCounter = 1
  end if
  t_iDir = m_arFlipList[m_iDir + 1]
  t_sMemName = "lightning_" & t_iDir & "_" & m_arLightningFrameList[m_iMagicFrameCounter]
  if memberExists(t_sMemName) then
    t_rMem = getMember(t_sMemName)
    return [the image of t_rMem, the image of t_rMem.extractAlpha(), VOID]
  end if
end
on SitStateForDiving me, a_bSitting
  m_bSitting = a_bSitting
end
on TalkStateForShark me, a_bTalk
  m_bTalk = a_bTalk
end
on DrawDiveEffects me, a_Mem_AvatImage
  m_iMagicFrameCounter = m_iMagicFrameCounter + 1
  if m_iMagicFrameCounter > 4 then
    m_iMagicFrameCounter = 0
  end if
  t_iDir = m_arFlipList[m_iDir + 1]
  t_sMemName = "bubbles_" & t_iDir & "_" & m_iMagicFrameCounter
  if memberExists(t_sMemName) then
    t_rMem = getMember(t_sMemName)
    member("t1").image = t_rMem.image
    member("t1").regPoint = t_rMem.regPoint
    if m_bSitting then
      t_Pnt_Orig = t_rMem.regPoint
      t_pnt = point(t_Pnt_Orig[1], t_Pnt_Orig[2] - 40)
      t_rMem.regPoint = t_pnt
    end if
    case m_iDir of
      0, 1, 2, 6, 7:
        t_ar_MemList = [a_Mem_AvatImage, t_rMem]
      otherwise:
        t_ar_MemList = [t_rMem, a_Mem_AvatImage]

    end case
    t_arData = me.createUnionImageFromMemberList(t_ar_MemList, point(0, 0))
    if m_bSitting then
      t_rMem.regPoint = t_Pnt_Orig
    end if
    return t_arData
  end if
end
on DrawLoader me, a_Mem_AvatImage
  m_iMagicFrameCounter = m_iMagicFrameCounter + 1
  if m_iMagicFrameCounter > 8 then
    m_iMagicFrameCounter = 1
  end if
  t_ar_AnimFrames = [0, 1, 2, 3, 4, 5, 6, 7]
  t_iFrame = t_ar_AnimFrames[m_iMagicFrameCounter]
  t_sMemName = "magic_loadingfx_0_" & t_iFrame
  if memberExists(t_sMemName) then
    t_rMem = getMember(t_sMemName)
    t_ar_MemList = [t_rMem, a_Mem_AvatImage]
    return me.createUnionImageFromMemberList(t_ar_MemList, point(0, 0))
  end if
end
on DrawSwimming me, a_Mem_AvatImage
  m_iMagicFrameCounter = m_iMagicFrameCounter + 1
  if m_iMagicFrameCounter > 8 then
    m_iMagicFrameCounter = 1
  end if
  t_ar_AnimFrames = [0, 0, 1, 1, 2, 2, 3, 3]
  t_iFrame = t_ar_AnimFrames[m_iMagicFrameCounter]
  t_iDir = m_arFlipList[m_iDir + 1]
  t_sMemName = "magic_swimming_" & t_iDir & "_" & t_iFrame
  if memberExists(t_sMemName) then
    t_rMem = getMember(t_sMemName)
    t_ar_MemList = [t_rMem, a_Mem_AvatImage]
    return me.createUnionImageFromMemberList(t_ar_MemList, point(0, 0))
  end if
end
on DrawSpaceWalkEffects me, a_Mem_AvatImage
  m_iMagicFrameCounter = m_iMagicFrameCounter + 1
  if m_iMagicFrameCounter > 2 then
    m_iMagicFrameCounter = 0
  end if
  t_iDir = m_arFlipList[m_iDir + 1]
  t_sMemName = "flame_" & t_iDir & "_" & m_iMagicFrameCounter
  if memberExists(t_sMemName) then
    t_rMem = getMember(t_sMemName)
    case m_iDir of
      0, 1, 2, 6, 7:
        t_ar_MemList = [a_Mem_AvatImage, t_rMem]
      otherwise:
        t_ar_MemList = [t_rMem, a_Mem_AvatImage]

    end case
    return me.createUnionImageFromMemberList(t_ar_MemList, point(0, 0))
  end if
end
on DrawMagicBatIn me, a_Mem_AvatImage
  m_iMagicBatStateCounter = m_iMagicBatStateCounter + 1
  m_iMagicFrameCounter = m_iMagicFrameCounter + 1
  if m_iMagicFrameCounter > m_arBatFrameList.count then
    m_iMagicFrameCounter = 1
  end if
  t_iDir = m_arFlipList[m_iDir + 1]
  case 1 of
    m_iMagicBatStateCounter <= 6:
      t_arFrameList = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5]
      t_sMemName = "magic_batcloud_" & t_arFrameList[m_iMagicBatStateCounter]
      if memberExists(t_sMemName) then
        t_rMem = getMember(t_sMemName)
        return me.createUnionImageFromMemberList([a_Mem_AvatImage, t_rMem], point(0, 0))
      end if
    m_iMagicBatStateCounter > 6 and m_iMagicBatStateCounter <= 12:
      t_arFrameList = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5]
      t_sMemName = "magic_batcloud_" & t_arFrameList[m_iMagicBatStateCounter]
      if memberExists(t_sMemName) then
        t_rMem = getMember(t_sMemName)
        return [the image of t_rMem, the image of t_rMem.extractAlpha(), VOID]
      end if
    m_iMagicBatStateCounter > 12:
      t_sMemName = "magic_bat_" & t_iDir & "_" & m_arBatFrameList[m_iMagicFrameCounter]
      if memberExists(t_sMemName) then
        t_rMem = getMember(t_sMemName)
        me.PlayMagicSound(11.5)
        return [the image of t_rMem, the image of t_rMem.extractAlpha(), VOID]
      end if

  end case
end
on DrawMagicBatOut me, a_Mem_AvatImage
  m_iMagicBatStateCounter = m_iMagicBatStateCounter + 1
  m_iMagicFrameCounter = m_iMagicFrameCounter + 1
  if m_iMagicFrameCounter > m_arBatFrameList.count then
    m_iMagicFrameCounter = 1
  end if
  t_iDir = m_arFlipList[m_iDir + 1]
  t_arFrameList = [5, 5, 4, 4, 3, 3, 2, 2, 1, 1, 0, 0]
  case 1 of
    m_iMagicBatStateCounter <= 6:
      t_ar_MemList = []
      t_sMemName = "magic_batcloud_" & t_arFrameList[m_iMagicBatStateCounter]
      if memberExists(t_sMemName) then
        t_rMem = getMember(t_sMemName)
        t_ar_MemList.add(t_rMem)
      end if
      t_sMemName = "magic_bat_" & t_iDir & "_" & m_arBatFrameList[m_iMagicFrameCounter]
      if memberExists(t_sMemName) then
        t_rMem = getMember(t_sMemName)
        t_ar_MemList.add(t_rMem)
      end if
      if t_ar_MemList.count > 1 then
        return me.createUnionImageFromMemberList(t_ar_MemList, point(0, 0))
      end if
    m_iMagicBatStateCounter > 6 and m_iMagicBatStateCounter <= 12:
      t_sMemName = "magic_batcloud_" & t_arFrameList[m_iMagicBatStateCounter]
      if memberExists(t_sMemName) then
        t_rMem = getMember(t_sMemName)
        return me.createUnionImageFromMemberList([a_Mem_AvatImage, t_rMem], point(0, 0))
      end if
    m_iMagicBatStateCounter > 12:
      return VOID

  end case
end
on DrawMagicSharkIn me, a_Mem_AvatImage
  m_iMagicBatStateCounter = m_iMagicBatStateCounter + 1
  m_iMagicFrameCounter = m_iMagicFrameCounter + 1
  if m_iMagicFrameCounter > m_arBatFrameList.count then
    m_iMagicFrameCounter = 1
  end if
  t_iDir = m_arFlipList[m_iDir + 1]
  case 1 of
    m_iMagicBatStateCounter <= 6:
      t_arFrameList = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5]
      t_sMemName = "magic_batcloud_" & t_arFrameList[m_iMagicBatStateCounter]
      if memberExists(t_sMemName) then
        t_rMem = getMember(t_sMemName)
        return [the image of t_rMem, the image of t_rMem.extractAlpha(), VOID]
      end if
    m_iMagicBatStateCounter > 6 and m_iMagicBatStateCounter <= 12:
      t_arFrameList = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5]
      t_sMemName = "magic_batcloud_" & t_arFrameList[m_iMagicBatStateCounter]
      if memberExists(t_sMemName) then
        t_rMem = getMember(t_sMemName)
        return [the image of t_rMem, the image of t_rMem.extractAlpha(), VOID]
      end if
    m_bTalk:
      if m_iMagicBatStateCounter > 12 then
        if m_iMagicFrameCounter > 2 then
          m_iMagicFrameCounter = 1
        end if
        t_sName = m_ar_SharkTalkFrames[m_iMagicFrameCounter]
        t_sMemName = t_sName & t_iDir & "_" & 0
        if memberExists(t_sMemName) then
          t_rMem = getMember(t_sMemName)
          return [the image of t_rMem, the image of t_rMem.extractAlpha(), VOID]
        end if
      end if
    m_iMagicBatStateCounter > 12:
      t_sMemName = "Magic_shark_swim_" & t_iDir & "_" & m_arBatFrameList[m_iMagicFrameCounter]
      if memberExists(t_sMemName) then
        t_rMem = getMember(t_sMemName)
        return [the image of t_rMem, the image of t_rMem.extractAlpha(), VOID]
      end if

  end case
end
on DrawMagicSharkOut me, a_Mem_AvatImage
  m_iMagicBatStateCounter = m_iMagicBatStateCounter + 1
  m_iMagicFrameCounter = m_iMagicFrameCounter + 1
  if m_iMagicFrameCounter > m_arBatFrameList.count then
    m_iMagicFrameCounter = 1
  end if
  t_iDir = m_arFlipList[m_iDir + 1]
  t_arFrameList = [5, 5, 4, 4, 3, 3, 2, 2, 1, 1, 0, 0]
  case 1 of
    m_iMagicBatStateCounter <= 6:
      t_ar_MemList = []
      t_sMemName = "magic_batcloud_" & t_arFrameList[m_iMagicBatStateCounter]
      if memberExists(t_sMemName) then
        t_rMem = getMember(t_sMemName)
        t_ar_MemList.add(t_rMem)
      end if
      t_sMemName = "Magic_shark_swim_" & t_iDir & "_" & m_arBatFrameList[m_iMagicFrameCounter]
      if memberExists(t_sMemName) then
        t_rMem = getMember(t_sMemName)
        t_ar_MemList.add(t_rMem)
      end if
      if t_ar_MemList.count > 1 then
        return me.createUnionImageFromMemberList(t_ar_MemList, point(0, 0))
      end if
    m_iMagicBatStateCounter > 6 and m_iMagicBatStateCounter <= 12:
      t_sMemName = "magic_batcloud_" & t_arFrameList[m_iMagicBatStateCounter]
      if memberExists(t_sMemName) then
        t_rMem = getMember(t_sMemName)
        return me.createUnionImageFromMemberList([a_Mem_AvatImage, t_rMem], point(0, 0))
      end if
    m_iMagicBatStateCounter > 12:
      return VOID

  end case
end
on SetMagicLocation me
  if m_iMagicFx = 3 then
    m_iFireworksCounter = m_iFireworksCounter + 1
    if m_iFireworksCounter mod 2 = 0 then
      m_iFireworksCounter = 0
    else
      return 0
    end if
  end if
  repeat with i = 1 to m_ar_SpriteList.count
    if m_ar_SpriteList[i].count > 0 then
      m_ar_SpriteList[i].AnimCounter = m_ar_SpriteList[i].AnimCounter + 1
      t_iAnimCounter = m_ar_SpriteList[i].AnimCounter
      t_iFrameCount = m_ar_SpriteList[i].framelist.count
      if t_iAnimCounter > t_iFrameCount then
        t_bLoop = m_ar_SpriteList[i].loop
        if t_bLoop then
          m_ar_SpriteList[i].AnimCounter = 1
          t_iAnimCounter = 1
        else
          m_ar_SpriteList[i].AnimCounter = t_iFrameCount
          t_iAnimCounter = t_iFrameCount
        end if
      end if
      t_rSpr = m_ar_SpriteList[i].sprite
      t_mem = m_ar_SpriteList[i].framelist[t_iAnimCounter]
      t_rSpr.member = t_mem
      t_rSpr.width = t_mem.width
      t_rSpr.height = t_mem.height
      if m_iTileSize <> 32 then
        t_iRatio = m_iTileSize / 32
        t_rSpr.width = t_mem.width * t_iRatio
        t_rSpr.height = t_mem.height * t_iRatio
      end if
      t_rSpr.locH = m_veAvatarLoc.x
      t_rSpr.locV = m_veAvatarLoc.y
      t_rSpr.locZ = m_veAvatarLoc.z + 200
      t_rSpr.ink = 33
      if m_iMagicFx = 3 then
        t_ar_ColorList = [rgb("FF4444"), rgb("00A5EE"), rgb("4BF254"), rgb("9F3AE7"), rgb("FF6420")]
        t_Col = t_ar_ColorList[random(5)]
        t_rSpr.locH = m_veAvatarLoc.x + 2
        t_rSpr.locV = m_veAvatarLoc.y - 40
        t_rSpr.ink = 0
        if not voidp(t_Col) then
          t_rSpr.bgColor = t_Col
        end if
      end if
      t_rSpr.flipH = m_bFlip
    end if
  end repeat
end
on PrepareFx me
  case m_iMagicFx of
    1, 19, 22, 23, 24, 28:
      t_arFrameList = []
      repeat with i = 1 to 10
        if i < 10 then
          t_mem = getMember("magic_pirate_0" & i)
        else
          t_mem = getMember("magic_pirate_" & i)
        end if
        t_arFrameList.add(t_mem)
      end repeat
      m_ar_SpriteList.add([:])
      m_ar_SpriteList[1].addProp(#AnimCounter, 1)
      m_ar_SpriteList[1].addProp(#framelist, t_arFrameList)
      t_rSpr = sprite(reserveSprite())
      m_ar_SpriteList[1].addProp(#sprite, t_rSpr)
      m_ar_SpriteList[1].addProp(#loop, 1)
    2:
      t_arFrameList = []
      repeat with i = 1 to 21
        if i < 10 then
          t_mem = getMember("magic_inferno_0" & i)
        else
          t_mem = getMember("magic_inferno_" & i)
        end if
        t_arFrameList.add(t_mem)
      end repeat
      m_ar_SpriteList.add([:])
      m_ar_SpriteList[1].addProp(#AnimCounter, 1)
      m_ar_SpriteList[1].addProp(#framelist, t_arFrameList)
      t_rSpr = sprite(reserveSprite())
      m_ar_SpriteList[1].addProp(#sprite, t_rSpr)
      m_ar_SpriteList[1].addProp(#loop, 1)
    3:
      t_arFrameList = []
      repeat with i = 1 to 14
        if i < 10 then
          t_mem = getMember("magic_fireworks_0" & i)
        else
          t_mem = getMember("magic_fireworks_" & i)
        end if
        repeat with e = 1 to 2
          t_arFrameList.add(t_mem)
        end repeat
      end repeat
      m_ar_SpriteList.add([:])
      m_ar_SpriteList[1].addProp(#AnimCounter, 1)
      m_ar_SpriteList[1].addProp(#framelist, t_arFrameList)
      t_rSpr = sprite(reserveSprite())
      m_ar_SpriteList[1].addProp(#sprite, t_rSpr)
      m_ar_SpriteList[1].addProp(#loop, 1)
    4:
      t_arFrameList = []
      repeat with i = 1 to 16
        if i < 10 then
          t_mem = getMember("magic_teleport_0" & i)
        else
          t_mem = getMember("magic_teleport_" & i)
        end if
        t_arFrameList.add(t_mem)
      end repeat
      m_ar_SpriteList.add([:])
      m_ar_SpriteList[1].addProp(#AnimCounter, 1)
      m_ar_SpriteList[1].addProp(#framelist, t_arFrameList)
      t_rSpr = sprite(reserveSprite())
      m_ar_SpriteList[1].addProp(#sprite, t_rSpr)
      m_ar_SpriteList[1].addProp(#loop, 1)
    5:
      t_arFrameList = []
      repeat with i = 1 to 2
        t_mem = getMember("magic_ghost_0" & i)
        t_arFrameList.add(t_mem)
      end repeat
      m_ar_SpriteList.add([:])
      m_ar_SpriteList[1].addProp(#AnimCounter, 1)
      m_ar_SpriteList[1].addProp(#framelist, t_arFrameList)
      t_rSpr = sprite(reserveSprite())
      m_ar_SpriteList[1].addProp(#sprite, t_rSpr)
      m_ar_SpriteList[1].addProp(#loop, 1)
    6:
      t_arFrameList = []
      repeat with i = 1 to 9
        t_mem = getMember("magic_teleport_0" & i)
        repeat with e = 1 to 3
          t_arFrameList.add(t_mem)
        end repeat
      end repeat
      m_ar_SpriteList.add([:])
      m_ar_SpriteList[1].addProp(#AnimCounter, 1)
      m_ar_SpriteList[1].addProp(#framelist, t_arFrameList)
      t_rSpr = sprite(reserveSprite())
      m_ar_SpriteList[1].addProp(#sprite, t_rSpr)
      m_ar_SpriteList[1].addProp(#loop, 1)
    7:
      t_arFrameList = []
      repeat with i = 10 to 16
        t_mem = getMember("magic_teleport_" & i)
        repeat with e = 1 to 3
          t_arFrameList.add(t_mem)
        end repeat
      end repeat
      m_ar_SpriteList.add([:])
      m_ar_SpriteList[1].addProp(#AnimCounter, 1)
      m_ar_SpriteList[1].addProp(#framelist, t_arFrameList)
      t_rSpr = sprite(reserveSprite())
      m_ar_SpriteList[1].addProp(#sprite, t_rSpr)
      m_ar_SpriteList[1].addProp(#loop, 1)
    8:
      t_arFrameList = []
      repeat with i = 0 to 10
        if i < 10 then
          t_mem = getMember("magic_fallingcoin_0" & i)
        else
          t_mem = getMember("magic_fallingcoin_" & i)
        end if
        t_arFrameList.add(t_mem)
      end repeat
      m_mp_Framelist.front.add([:])
      m_mp_Framelist.front[1].addProp(#frames, t_arFrameList)
      m_mp_Framelist.front[1].addProp(#counter, 0)
      m_mp_Framelist.front[1].addProp(#loop, 1)
      t_arFrameList = []
      repeat with i = 1 to 5
        t_mem = getMember("magic_goldpile_BACK_" & i)
        t_arFrameList.add(t_mem)
      end repeat
      m_mp_Framelist.back.add([:])
      m_mp_Framelist.back[1].addProp(#frames, t_arFrameList)
      m_mp_Framelist.back[1].addProp(#counter, 0)
      m_mp_Framelist.back[1].addProp(#loop, 0)
      t_arFrameList = []
      repeat with i = 1 to 5
        t_mem = getMember("magic_goldpile_FRONT_" & i)
        t_arFrameList.add(t_mem)
      end repeat
      m_mp_Framelist.front.add([:])
      m_mp_Framelist.front[2].addProp(#frames, t_arFrameList)
      m_mp_Framelist.front[2].addProp(#counter, 0)
      m_mp_Framelist.front[2].addProp(#loop, 0)
      t_arFrameList = []
      t_mem = getMember("magic_glow")
      t_arFrameList.add(t_mem)
      m_ar_SpriteList.add([:])
      m_ar_SpriteList[1].addProp(#AnimCounter, 1)
      m_ar_SpriteList[1].addProp(#framelist, t_arFrameList)
      t_rSpr = sprite(reserveSprite())
      m_ar_SpriteList[1].addProp(#sprite, t_rSpr)
      m_ar_SpriteList[1].addProp(#loop, 0)
    9:
      t_arFrameList = []
      repeat with i = 1 to 6
        t_mem = getMember("magic_tornado_" & i)
        t_arFrameList.add(t_mem)
      end repeat
      m_mp_Framelist.front.add([:])
      m_mp_Framelist.front[1].addProp(#frames, t_arFrameList)
      m_mp_Framelist.front[1].addProp(#counter, 0)
      m_mp_Framelist.front[1].addProp(#loop, 1)
      t_arFrameList = []
      repeat with i = 1 to 45
        t_arFrameList.add(VOID)
      end repeat
      repeat with i = 1 to 7
        t_arFrameList.add(getMember("magic_lightning_1"))
      end repeat
      repeat with i = 1 to 8
        t_arFrameList.add(getMember("magic_lightning_2"))
      end repeat
      m_mp_Framelist.front.add([:])
      m_mp_Framelist.front[2].addProp(#frames, t_arFrameList)
      m_mp_Framelist.front[2].addProp(#counter, 0)
      m_mp_Framelist.front[2].addProp(#loop, 1)
      t_arFrameList = []
      repeat with i = 1 to 4
        repeat with e = 1 to 15
          t_mem = getMember("magic_stormcloud_" & i)
          t_arFrameList.add(t_mem)
        end repeat
      end repeat
      m_mp_Framelist.front.add([:])
      m_mp_Framelist.front[3].addProp(#frames, t_arFrameList)
      m_mp_Framelist.front[3].addProp(#counter, 0)
      m_mp_Framelist.front[3].addProp(#loop, 1)
    10:
      t_arFrameList = [getMember("magic_glow2")]
      m_ar_SpriteList.add([:])
      m_ar_SpriteList[1].addProp(#AnimCounter, 1)
      m_ar_SpriteList[1].addProp(#framelist, t_arFrameList)
      t_rSpr = sprite(reserveSprite())
      m_ar_SpriteList[1].addProp(#sprite, t_rSpr)
      m_ar_SpriteList[1].addProp(#loop, 1)
    11:
    12:
      t_arFrameList = []
      repeat with i = 1 to 10
        if i < 10 then
          t_mem = getMember("magic_snowfall_0" & i)
        else
          t_mem = getMember("magic_snowfall_" & i)
        end if
        t_arFrameList.add(t_mem)
        t_arFrameList.add(t_mem)
      end repeat
      m_mp_Framelist.front.add([:])
      m_mp_Framelist.front[1].addProp(#frames, t_arFrameList)
      m_mp_Framelist.front[1].addProp(#counter, 0)
      m_mp_Framelist.front[1].addProp(#loop, 1)
      t_arFrameList = []
      repeat with i = 1 to 12
        if i < 10 then
          t_mem = getMember("magic_snowman_0" & i)
        else
          t_mem = getMember("magic_snowman_" & i)
        end if
        t_arFrameList.add(t_mem)
        t_arFrameList.add(t_mem)
        t_arFrameList.add(t_mem)
        t_arFrameList.add(t_mem)
      end repeat
      m_mp_Framelist.front.add([:])
      m_mp_Framelist.front[2].addProp(#frames, t_arFrameList)
      m_mp_Framelist.front[2].addProp(#counter, 0)
      m_mp_Framelist.front[2].addProp(#loop, 0)
    13:
      t_arFrameList = [getMember("magic_trdet_glow")]
      m_ar_SpriteList.add([:])
      m_ar_SpriteList[1].addProp(#AnimCounter, 1)
      m_ar_SpriteList[1].addProp(#framelist, t_arFrameList)
      t_rSpr = sprite(reserveSprite())
      m_ar_SpriteList[1].addProp(#sprite, t_rSpr)
      m_ar_SpriteList[1].addProp(#loop, 1)
    14:
      t_arFrameList = []
      repeat with i = 0 to 12
        if i < 10 then
          t_mem = getMember("magic_trdet_coinsbk_0" & i)
        else
          t_mem = getMember("magic_trdet_coinsbk_" & i)
        end if
        t_arFrameList.add(t_mem)
      end repeat
      m_mp_Framelist.back.add([:])
      m_mp_Framelist.back[1].addProp(#frames, t_arFrameList)
      m_mp_Framelist.back[1].addProp(#counter, 0)
      m_mp_Framelist.back[1].addProp(#loop, 1)
      repeat with i = 0 to 12
        if i < 10 then
          t_mem = getMember("magic_trdet_coinsfr_0" & i)
        else
          t_mem = getMember("magic_trdet_coinsfr_" & i)
        end if
        t_arFrameList.add(t_mem)
      end repeat
      m_mp_Framelist.front.add([:])
      m_mp_Framelist.front[1].addProp(#frames, t_arFrameList)
      m_mp_Framelist.front[1].addProp(#counter, 0)
      m_mp_Framelist.front[1].addProp(#loop, 1)
      t_arFrameList = [getMember("magic_trdet_glow")]
      m_ar_SpriteList.add([:])
      m_ar_SpriteList[1].addProp(#AnimCounter, 1)
      m_ar_SpriteList[1].addProp(#framelist, t_arFrameList)
      t_rSpr = sprite(reserveSprite())
      m_ar_SpriteList[1].addProp(#sprite, t_rSpr)
      m_ar_SpriteList[1].addProp(#loop, 1)
    27:
      t_arFrameList = [getMember("lightningSpell_glow")]
      m_ar_SpriteList.add([:])
      m_ar_SpriteList[1].addProp(#AnimCounter, 1)
      m_ar_SpriteList[1].addProp(#framelist, t_arFrameList)
      t_rSpr = sprite(reserveSprite())
      m_ar_SpriteList[1].addProp(#sprite, t_rSpr)
      m_ar_SpriteList[1].addProp(#loop, 1)

  end case
end
on createUnionImageFromMemberList me, i_ar_list, _setRegpoint
  if m_iMagicFx > 0 then
    tUnionList = []
    repeat with tCheckMem in i_ar_list
      if not voidp(tCheckMem) then
        if voidp(tCheckMem.member) then
          next repeat
        end if
        tUnionList.append(tCheckMem)
      end if
    end repeat
    tMaskList = []
    tUnion = rect(0, 0, 0, 0)
    repeat with tImage in tUnionList
      tMem = tImage.member
      tOffsetRect = tMem.rect - rect(tMem.regPoint, tMem.regPoint)
      tUnion = tUnion.union(tOffsetRect)
      if memberExists(tMem.name & "_a") then
        t_ImgAlpha = getMember(tMem.name & "_a").image
      else
        t_ImgAlpha = tMem.image.extractAlpha()
      end if
      tMaskList.append(t_ImgAlpha)
    end repeat
    tNewRegpoint = -1 * point(tUnion.left, tUnion.top)
    _setRegpoint.locH = tNewRegpoint.locH
    _setRegpoint.locV = tNewRegpoint.locV
    tMaskImg = image(tUnion.width, tUnion.height, 8, #grayscale)
    repeat with i = 1 to tMaskList.count
      tDeltaRegpoint = tNewRegpoint - tUnionList[i].member.regPoint
      t_ImgAlpha = tMaskList[i]
      tMaskImg.copyPixels(t_ImgAlpha, t_ImgAlpha.rect + rect(tDeltaRegpoint, tDeltaRegpoint), t_ImgAlpha.rect, [#ink: 39])
    end repeat
    tImg = image(tUnion.width, tUnion.height, 32)
    repeat with i = 1 to tUnionList.count
      tDeltaRegpoint = tNewRegpoint - tUnionList[i].member.regPoint
      t_rImg = tUnionList[i].member.image
      tImg.copyPixels(t_rImg, t_rImg.rect + rect(tDeltaRegpoint, tDeltaRegpoint), t_rImg.rect)
    end repeat
    tImg.setAlpha(tMaskImg)
    tImg.useAlpha = 1
    return [tImg, tMaskImg, _setRegpoint]
  end if
end
on PlayMagicSound me, a_iMagicFx
  t_bFxSnd = getObject(#session).get("fx")
  if voidp(a_iMagicFx) then
    exit
  end if
  t_bLoop = 0
  if t_bFxSnd and m_iCurrendSoundPlaying <> a_iMagicFx then
    m_iCurrendSoundPlaying = a_iMagicFx
    case a_iMagicFx of
      1:
        t_sSoundName = "MFX-pirate-parrot-curse"
      2:
        t_sSoundName = "MFX-discoinferno"
      3:
        t_sSoundName = "MFX-firework"
      4:
        t_sSoundName = "MFX-teleportation"
      5:
        t_sSoundName = "MFX-ghost"
      6:
        if m_sMyName = m_sAvatarName then
          t_sSoundName = "teleport-2"
        else
          return 0
        end if
      7:
        if m_sMyName = m_sAvatarName then
          t_sSoundName = "teleport-4"
        else
          return 0
        end if
      8:
        t_sSoundName = "MFX-moneyrain"
      9:
        t_sSoundName = "MFX-curse-storm"
      10:
        t_sSoundName = "MFX-levitate"
      11, 15:
        t_sSoundName = "MFX-bat-1"
      11.5:
        t_sSoundName = "MFX-bat-2"
        t_bLoop = 1
      12:
        t_sSoundName = "MFX-snowman"
      14:
        t_sSoundName = "MFX-treasure"
      100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114:
        t_sSoundName = "MFX-car-loop-1"
        t_bLoop = 1
      115:
        t_sSoundName = "MFX-stitch_space_ship"
      17:
        if m_sMyName = m_sAvatarName then
          t_sSoundName = "SPS-scuba-breath"
          t_bLoop = 1
        end if
      18:
        if m_sMyName = m_sAvatarName then
          t_sSoundName = "SM-space-suit-1"
          t_bLoop = 1
        end if
      19:
        if m_sMyName = m_sAvatarName then
          t_sSoundName = "MFX-coral-1"
          t_bLoop = 1
        end if
      otherwise:
        if objectp(m_FxSnd_obj) then
          removeObject(m_FxSnd_obj.getID())
          m_FxSnd_obj = VOID
        end if
        return 0

    end case
    if voidp(t_sSoundName) then
      exit
    end if
    if voidp(m_FxSnd_obj) then
      m_FxSnd_obj = createObject(getUniqueID(), "CSoundObject")
      m_FxSnd_obj.Define(t_sSoundName)
      m_FxSnd_obj.SetSoundType("fx")
      if t_bLoop then
        m_FxSnd_obj.setLoopCount(100)
      end if
      m_FxSnd_obj.PlaySound()
    else
      m_FxSnd_obj.StopSound()
      m_FxSnd_obj.Define(t_sSoundName)
      m_FxSnd_obj.SetSoundType("fx")
      if t_bLoop then
        m_FxSnd_obj.setLoopCount(100)
      end if
      m_FxSnd_obj.PlaySound()
    end if
  end if
end
on UpdateFuelMeter me
  if voidp(m_iFuelPercent) then
    exit
  end if
  if m_SprFuel1 = VOID then
    m_SprFuel1 = sprite(reserveSprite())
  end if
  if m_SprFuel2 = VOID then
    m_SprFuel2 = sprite(reserveSprite())
  end if
  m_SprFuel1.member = getMember("fuel_status_bar")
  if m_iFuelPercent > 25 then
    m_SprFuel2.member = getMember("fuel_status_green")
  else
    m_SprFuel2.member = getMember("fuel_status_red")
  end if
  t_BarWidth = 45 * (float(m_iFuelPercent) / 100)
  m_SprFuel2.width = t_BarWidth
  m_SprFuel2.height = 2
  m_SprFuel2.locH = m_veAvatarLoc.x - 9
  m_SprFuel2.locV = m_veAvatarLoc.y - 99
  m_SprFuel2.locZ = m_veAvatarLoc.z + 50
  m_SprFuel1.ink = 36
  m_SprFuel1.locH = m_veAvatarLoc.x - 10
  m_SprFuel1.locV = m_veAvatarLoc.y - 100
  m_SprFuel1.locZ = m_veAvatarLoc.z
  m_SprFuel2.ink = 36
end
on MagicFxStatus me, tMsg
  if m_sMyName = m_sAvatarName then
    if not timeoutExists("FxLocator" & m_iMyRef) then
      createTimeout("FxLocator" & m_iMyRef, 200, #GetActualPos, me.getID(), VOID, 0)
    end if
    t_iFxCode = tMsg.connection.GetIntFrom()
    m_iFuelPercent = tMsg.connection.GetIntFrom()
  else
    return 0
  end if
end
on regMsgList me, tBool
  tMsgs = [:]
  tMsgs.setaProp(2526, #MagicFxStatus)
  tCmds = [:]
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    registerCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    unregisterCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  end if
end