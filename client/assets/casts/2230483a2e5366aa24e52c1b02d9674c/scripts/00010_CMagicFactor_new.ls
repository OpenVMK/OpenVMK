-- Script
property m_bTalk
property m_bFlip
property m_veAvatarLoc
property m_iMyRef
property m_sCarPantAction
property m_ar_StormImgList
property m_arFlipList
property m_iTileSize
property m_arAnimCounters
property m_arFrameList
property m_ar_SpriteList
property m_mp_Framelist
property m_iMagicFx
property m_iDir
property m_arCarpetFrameList
property m_arLightningFrameList
property m_iMagicFrameCounter
property m_iMagicBatStateCounter
property m_arBatFrameList
property m_ar_SharkTalkFrames
property m_iStormCounter
property m_FxSnd_obj
property m_iCurrendSoundPlaying
property m_i_CarPantCounter
property m_iFireworksCounter
property m_SprFuel1
property m_SprFuel2
property m_iFuelPercent
property m_bTrashCanTalkState
property m_sMyName
property m_sAvatarName
property m_bSitting
global pTemp

on construct this
  this.m_arAnimCounters = []
  this.m_arFrameList = []
  this.m_ar_SpriteList = []
  this.m_mp_Framelist = propList(#front, [], #back, [])
  this.m_arFlipList = [0, 1, 2, 3, 4, 3, 2, 1]
  this.m_iMagicFx = 0
  this.m_iDir = 0
  this.m_arCarpetFrameList = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  this.m_arLightningFrameList = [1, 2, 3, 4]
  this.m_iMagicFrameCounter = 1
  this.m_iMagicBatStateCounter = 1
  this.m_arBatFrameList = [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3]
  this.m_ar_SharkTalkFrames = ["Magic_shark_talk_", "Magic_shark_swim_"]
  this.m_ar_StormImgList = VOID
  this.m_iStormCounter = 1
  this.m_FxSnd_obj = VOID
  this.m_iCurrendSoundPlaying = 0
  this.m_i_CarPantCounter = 0
  this.m_iFireworksCounter = 0
  this.m_SprFuel1 = VOID
  this.m_SprFuel2 = VOID
  this.m_iFuelPercent = VOID
  this.m_bTrashCanTalkState = 0
  this.m_bSitting = 0
  this.m_bTalk = 0
  this.regMsgList(1)
  return 1
end
on deconstruct this
  t_iCount = this.m_ar_SpriteList.count
  if t_iCount > 0 then
    repeat with i = 1 to t_iCount
      if this.m_ar_SpriteList.count > 0 then
        releaseSprite(this.m_ar_SpriteList[i].sprite.spriteNum)
      end if
    end repeat
    this.m_ar_SpriteList = []
    if timeoutExists("FxLocator" & this.m_iMyRef) then
      removeTimeout("FxLocator" & this.m_iMyRef)
    end if
    if objectp(this.m_FxSnd_obj) then
      StopSound(this.m_FxSnd_obj)
      removeObject(this.m_FxSnd_obj.getID())
      this.m_FxSnd_obj = VOID
    end if
    if not voidp(this.m_SprFuel1) then
      releaseSprite(this.m_SprFuel1.sprite.spriteNum)
    end if
    if not voidp(this.m_SprFuel2) then
      releaseSprite(this.m_SprFuel2.sprite.spriteNum)
    end if
    this.regMsgList(0)
    return 1
  end if
end
on GetActualPos this
  t_rCon = getThread(#room).component._AccessRoom()
  if not voidp(t_rCon) then
    t_rAvatar = _AccessIndexed(t_rCon, this.m_iMyRef, "avatar")
    if voidp(t_rAvatar) then
      error(this, "Avatar not found:" & this.m_iMyRef, #_Magic)
    end if
    t_veLoc = GetScrPos(t_rAvatar)
  end if
  if this.m_iMagicFx = 17 or this.m_iMagicFx > 99 then
    UpdateFuelMeter(this)
  end if
  if not voidp(t_veLoc) then
    this.m_veAvatarLoc = t_veLoc
    return SetMagicLocation(this)
  end if
end
on SetStormFximages me, a_ar_StormImgList
  me.m_ar_StormImgList = a_ar_StormImgList
end
on SetFx me, a_iMagicFx, a_iTileSize, a_bFlip, a_iDir, a_iMyRef, a_sMyName, a_sAvatarName
  me.m_iTileSize = a_iTileSize
  me.m_bFlip = a_bFlip
  me.m_iDir = a_iDir
  me.m_iMyRef = a_iMyRef
  me.m_sMyName = a_sMyName
  me.m_sAvatarName = a_sAvatarName
  if me.m_iMagicFx <> a_iMagicFx then
    me.m_iMagicFx = a_iMagicFx
    me.m_arAnimCounters = []
    me.m_arFrameList = []
    me.m_ar_SpriteList = []
    me.m_mp_Framelist = propList(#front, [], #back, [])
    me.m_iMagicFrameCounter = 1
    me.m_iMagicBatStateCounter = 1
    me.m_ar_StormImgList = VOID
    me.m_iStormCounter = 1
    me.m_iCurrendSoundPlaying = 0
    if objectp(me.m_FxSnd_obj) then
      StopSound(me.m_FxSnd_obj)
    end if
    PrepareFx(me)
    PlayMagicSound(me, me.m_iMagicFx)
    if me.m_iMagicFx > 99 then
      executeMessage("PlayFxSound", "MFX-car-start-1")
    end if
  end if
end
on UpdateAvatarLoc me, a_veAvatarLoc, a_Img_Avat
  me.m_veAvatarLoc = a_veAvatarLoc
  update(me, a_Img_Avat)
end
on update me, a_veAvatarLoc, a_SprAvatar
  me.m_veAvatarLoc = a_veAvatarLoc
  if me.m_iMagicFx = 9 then
    if listp(me.m_ar_StormImgList) then
      t_Img = me.m_ar_StormImgList[me.m_iStormCounter]
      if me.m_iStormCounter - 1 <> me.m_arFlipList[me.m_iStormCounter] then
        t_img2 = image(80, 160, 32)
        setAlpha(t_img2, image(80, 160, 8))
        me.useAlpha = 1
        tQuad = [point(t_Img.width, 0), point(0, 0), point(0, t_Img.height), point(t_Img.width, t_Img.height)]
        copyPixels(t_img2, t_img2, t_Img, tQuad, t_Img.rect)
        t_Img = t_img2
      end if
      a_SprAvatar.member.image = t_Img
      t_iH = t_Img.width / 2
      t_iV = t_Img.height - 16
      t_pnt = point(t_iH, t_iV)
      a_SprAvatar.member.regPoint = t_pnt
      me.m_iStormCounter = me.m_iStormCounter + 1
      if me.m_iStormCounter > 8 then
        me.m_iStormCounter = 1
      end if
    end if
    t_Mem_AvatImage = a_SprAvatar.member
  end if
  if me.m_iMagicFx = 10 then
    t_ImgAvatar = DrawMagicCarpet(me, t_Mem_AvatImage)
  end if
  if me.m_iMagicFx = 11 then
    t_ImgAvatar = DrawMagicBatIn(me, t_Mem_AvatImage)
  end if
  if me.m_iMagicFx = 15 then
    t_ImgAvatar = DrawMagicBatOut(me, t_Mem_AvatImage)
  end if
  if me.m_iMagicFx = 16 then
    t_ImgAvatar = DrawPushTheTrashcan(me, t_Mem_AvatImage)
  end if
  if me.m_iMagicFx = 17 then
    t_ImgAvatar = DrawDiveEffects(me, t_Mem_AvatImage)
  end if
  if me.m_iMagicFx = 18 then
    t_ImgAvatar = DrawSpaceWalkEffects(me, t_Mem_AvatImage)
  end if
  if me.m_iMagicFx = 20 then
    t_ImgAvatar = DrawSwimming(me, t_Mem_AvatImage)
  end if
  if me.m_iMagicFx = 25 then
    t_ImgAvatar = DrawMagicSharkIn(me, t_Mem_AvatImage)
  end if
  if me.m_iMagicFx = 26 then
    t_ImgAvatar = DrawMagicSharkOut(me, t_Mem_AvatImage)
  end if
  if me.m_iMagicFx = 27 then
    t_ImgAvatar = DrawLightning(me, t_Mem_AvatImage)
  end if
  if me.m_iMagicFx = 34 then
    t_ImgAvatar = DrawConfetti(me, t_Mem_AvatImage)
  end if
  if me.m_iMagicFx = 90 then
    t_ImgAvatar = DrawLoader(me, t_Mem_AvatImage)
  end if
  if me.m_iMagicFx > 99 then
    t_ImgAvatar = DrawCarPants(me, t_Mem_AvatImage)
  end if
  t_ar_DrawList = []
  t_mp_ListBack = me.m_mp_Framelist.back
  t_mp_ListFront = me.m_mp_Framelist.front
  t_i_ListBackCount = t_mp_ListBack.count
  t_i_ListFrontCount = t_mp_ListFront.count
  if t_i_ListBackCount > 0 then
    repeat with i = 1 to t_i_ListBackCount
      if i <= t_i_ListBackCount then
        me.counter = t_mp_ListBack[i].counter + 1
        t_iFrameCount = t_mp_ListBack[i].frames.count
        if t_mp_ListBack[i].counter > t_iFrameCount then
          t_bLoop = t_mp_ListBack[i].loop
          if #useFastQuads = 1 then
            me.counter = 1
          end if
          me.counter = t_iFrameCount
        end if
        t_rMem = getProp(t_mp_ListBack[i], #frames, t_mp_ListBack[i].counter)
        t_ar_DrawList.add(t_rMem)
      end if
    end repeat
    if t_i_ListFrontCount > 0 or t_i_ListBackCount > 0 then
      if me.m_iMagicFx = 12 then
        me.m_iMagicFrameCounter = me.m_iMagicFrameCounter + 1
        if me.m_iMagicFrameCounter < 10 then
          t_ar_DrawList.add(t_Mem_AvatImage)
        end if
      end if
      t_ar_DrawList.add(t_Mem_AvatImage)
    end if
    if t_i_ListFrontCount > 0 then
      repeat with i = 1 to t_i_ListFrontCount
        if i <= t_i_ListFrontCount then
          me.counter = t_mp_ListFront[i].counter + 1
          t_iFrameCount = t_mp_ListFront[i].frames.count
          if t_mp_ListFront[i].counter > t_mp_ListFront[i].frames.count then
            t_bLoop = t_mp_ListFront[i].loop
            if t_bLoop then
              me.counter = 1
            end if
            me.counter = t_iFrameCount
          end if
          t_rMem = getProp(t_mp_ListFront[i], #frames, t_mp_ListFront[i].counter)
          t_ar_DrawList.add(t_rMem)
        end if
      end repeat
      if t_i_ListFrontCount > 0 or t_i_ListBackCount > 0 then
        t_ImgAvatar = createUnionImageFromMemberList(me, t_ar_DrawList, point(0, 0))
      end if
      if me.m_ar_SpriteList.count > 0 then
        if not timeoutExists("FxLocator" & me.m_iMyRef) then
          createTimeout("FxLocator" & me.m_iMyRef, 50, #GetActualPos, me.getID(), VOID, 0)
        end if
      end if
      return t_ImgAvatar
    end if
  end if
end
on SetPushTheTrashcanAction me, a_sCanAction
  if stringp(a_sCanAction) then
    me.m_sCarPantAction = a_sCanAction
  end if
end
on DrawPushTheTrashcan me, a_Mem_AvatImage
  t_iDir = me.m_arFlipList[me.m_iDir + 1]
  if me.m_sCarPantAction = "spk" then
    me.m_bTrashCanTalkState = me.m_sCarPantAction
    me.m_sCarPantAction = "drk"
    me.m_i_CarPantCounter = 0
  else
    if t_iDir = "blk1" then
      me.m_sCarPantAction = "blk"
      me.m_i_CarPantCounter = 0
    else
      if t_iDir = "blk2" then
        me.m_sCarPantAction = "std"
        me.m_i_CarPantCounter = 0
      else
        if t_iDir = "wav" then
          me.m_i_CarPantCounter = me.m_i_CarPantCounter + 1
          if me.m_i_CarPantCounter > 1 then
            me.m_i_CarPantCounter = 0
          end if
        end if
      end if
    end if
  end if
  if t_iDir = "wlk" then
    me.m_i_CarPantCounter = me.m_i_CarPantCounter + 1
    if me.m_i_CarPantCounter > 3 then
      me.m_i_CarPantCounter = 0
    end if
    me.m_i_CarPantCounter = 0
  end if
  t_sCarPantAction = me.m_sCarPantAction
  t_sMemName = t_sCarPantAction & "_npc_1_" & t_iDir & "_" & me.m_i_CarPantCounter
  if not me.m_bTrashCanTalkState then
    t_rMem = getMember(t_sMemName)
  end if
  return 0
  if memberExists(t_sMemName & "_a") then
    t_rAlpha = getMember(t_sMemName & "_a")
  end if
  t_rAlpha = t_rMem.image.extractAlpha()
  return [the image of t_rMem, t_rAlpha, VOID]
end
on SetCarPantAction me, a_iCarPantAction
  if a_iCarPantAction = 1 then
    me.m_sCarPantAction = "wlk"
  end if
  me.m_sCarPantAction = "std"
end
on DrawCarPants me, a_Mem_AvatImage
  t_iDir = me.m_arFlipList[me.m_iDir + 1]
  if me.m_sCarPantAction = "wlk" then
    me.m_i_CarPantCounter = me.m_i_CarPantCounter + 1
    t_sCarPantAction = "wlk"
    if me.m_iMagicFx = 115 then
      if me.m_i_CarPantCounter > 1 then
        me.m_i_CarPantCounter = 0
      end if
    end if
    if me.m_i_CarPantCounter > 3 then
      me.m_i_CarPantCounter = 0
    end if
    me.m_i_CarPantCounter = 0
  end if
  if me.m_sCarPantAction = "std" then
    t_sCarPantAction = "wlk"
    me.m_i_CarPantCounter = 0
  end if
  t_ar_Images = []
  t_sMemName1 = t_sCarPantAction & "_carback_" & me.m_iMagicFx & "_" & t_iDir & "_" & me.m_i_CarPantCounter
  if memberExists(t_sMemName1) then
    t_ar_Images.add(getMember(t_sMemName1))
  end if
  if me.m_iMagicFx <> 110 then
    if me.m_iMagicFx <> 112 then
      if me.m_iMagicFx = 115 then
        t_pnt = a_Mem_AvatImage.regPoint
        a_Mem_AvatImage.regPoint = point(t_pnt[1], t_pnt[2] - 9)
      end if
    end if
  end if
  if me.m_iMagicFx = 114 then
    t_pnt = a_Mem_AvatImage.regPoint
    a_Mem_AvatImage.regPoint = point(t_pnt[1], t_pnt[2] - 14)
  else
    if me.m_iMagicFx = 111 then
      t_pnt = a_Mem_AvatImage.regPoint
      a_Mem_AvatImage.regPoint = point(t_pnt[1], t_pnt[2] + 5)
    end if
  end if
  t_ar_Images.add(a_Mem_AvatImage)
  t_sMemName2 = t_sCarPantAction & "_carfront_" & me.m_iMagicFx & "_" & t_iDir & "_" & me.m_i_CarPantCounter
  if memberExists(t_sMemName2) then
    t_ar_Images.add(getMember(t_sMemName2))
  end if
  return createUnionImageFromMemberList(me, t_ar_Images, point(0, 0))
end
on DrawMagicCarpet me, a_Mem_AvatImage
  me.m_iMagicFrameCounter = me.m_iMagicFrameCounter + 1
  if me.m_iMagicFrameCounter > me.m_arCarpetFrameList.count then
    me.m_iMagicFrameCounter = 1
  end if
  t_iDir = me.m_arFlipList[me.m_iDir + 1]
  t_sMemName = "magic_carpet_" & t_iDir & "_" & me.m_arCarpetFrameList[me.m_iMagicFrameCounter]
  if memberExists(t_sMemName) then
    t_rMem = getMember(t_sMemName)
    return createUnionImageFromMemberList(me, [t_rMem, a_Mem_AvatImage], point(0, 0))
  end if
end
on DrawConfetti me, a_Mem_AvatImage
  me.m_iMagicFrameCounter = me.m_iMagicFrameCounter + 1
  if me.m_iMagicFrameCounter > 20 then
    me.m_iMagicFrameCounter = 1
  end if
  t_arFrameList = ["confetti_magic_1", "confetti_magic_1", "confetti_magic_2", "confetti_magic_2", "confetti_magic_3", "confetti_magic_3", "confetti_magic_4", "confetti_magic_4", "confetti_magic_5", "confetti_magic_5", "confetti_magic_6", "confetti_magic_6", "confetti_magic_7", "confetti_magic_7", "confetti_magic_8", "confetti_magic_8", "confetti_magic_9", "confetti_magic_9", "confetti_magic_10", "confetti_magic_10"]
  t_sMemName = t_arFrameList[me.m_iMagicFrameCounter]
  if memberExists(t_sMemName) then
    t_rMem = getMember(t_sMemName)
    if me.m_bSitting then
      t_Pnt_Orig = t_rMem.regPoint
      t_pnt = point(t_Pnt_Orig[1], t_Pnt_Orig[2] - 20)
      t_rMem.regPoint = t_pnt
    end if
    t_ar_MemList = [a_Mem_AvatImage, t_rMem]
    t_ImgData = createUnionImageFromMemberList(me, t_ar_MemList, point(0, 0))
    if me.m_bSitting then
      t_rMem.regPoint = t_Pnt_Orig
    end if
    return t_ImgData
  end if
end
on DrawLightning me, a_Mem_AvatImage
  me.m_iMagicFrameCounter = me.m_iMagicFrameCounter + 1
  if me.m_iMagicFrameCounter > me.m_arLightningFrameList.count then
    me.m_iMagicFrameCounter = 1
  end if
  t_iDir = me.m_arFlipList[me.m_iDir + 1]
  t_sMemName = "lightning_" & t_iDir & "_" & me.m_arLightningFrameList[me.m_iMagicFrameCounter]
  if memberExists(t_sMemName) then
    t_rMem = getMember(t_sMemName)
    return [the image of t_rMem, the image of t_rMem.extractAlpha(), VOID]
  end if
end
on SitStateForDiving me, a_bSitting
  me.m_bSitting = a_bSitting
end
on TalkStateForShark me, a_bTalk
  me.m_bTalk = a_bTalk
end
on DrawDiveEffects me, a_Mem_AvatImage
  me.m_iMagicFrameCounter = me.m_iMagicFrameCounter + 1
  if me.m_iMagicFrameCounter > 4 then
    me.m_iMagicFrameCounter = 0
  end if
  t_iDir = me.m_arFlipList[me.m_iDir + 1]
  t_sMemName = "bubbles_" & t_iDir & "_" & me.m_iMagicFrameCounter
  if memberExists(t_sMemName) then
    t_rMem = getMember(t_sMemName)
    member("t1").image = t_rMem.image
    member("t1").regPoint = t_rMem.regPoint
    if me.m_bSitting then
      t_Pnt_Orig = t_rMem.regPoint
      t_pnt = point(t_Pnt_Orig[1], t_Pnt_Orig[2] - 40)
      t_rMem.regPoint = t_pnt
    end if
    if me.m_iDir <> 0 then
      if me.m_iDir <> 1 then
        if me.m_iDir <> 2 then
          if me.m_iDir <> 6 then
            if me.m_iDir = 7 then
              t_ar_MemList = [a_Mem_AvatImage, t_rMem]
            end if
          end if
        end if
      end if
      t_ar_MemList = [t_rMem, a_Mem_AvatImage]
    end if
    t_arData = createUnionImageFromMemberList(me, t_ar_MemList, point(0, 0))
    if me.m_bSitting then
      t_rMem.regPoint = t_Pnt_Orig
    end if
    return t_arData
  end if
end
on DrawLoader me, a_Mem_AvatImage
  me.m_iMagicFrameCounter = me.m_iMagicFrameCounter + 1
  if me.m_iMagicFrameCounter > 8 then
    me.m_iMagicFrameCounter = 1
  end if
  t_ar_AnimFrames = [0, 1, 2, 3, 4, 5, 6, 7]
  t_iFrame = t_ar_AnimFrames[me.m_iMagicFrameCounter]
  t_sMemName = "magic_loadingfx_0_" & t_iFrame
  if memberExists(t_sMemName) then
    t_rMem = getMember(t_sMemName)
    t_ar_MemList = [t_rMem, a_Mem_AvatImage]
    return createUnionImageFromMemberList(me, t_ar_MemList, point(0, 0))
  end if
end
on DrawSwimming me, a_Mem_AvatImage
  me.m_iMagicFrameCounter = me.m_iMagicFrameCounter + 1
  if me.m_iMagicFrameCounter > 8 then
    me.m_iMagicFrameCounter = 1
  end if
  t_ar_AnimFrames = [0, 0, 1, 1, 2, 2, 3, 3]
  t_iFrame = t_ar_AnimFrames[me.m_iMagicFrameCounter]
  t_iDir = me.m_arFlipList[me.m_iDir + 1]
  t_sMemName = "magic_swimming_" & t_iDir & "_" & t_iFrame
  if memberExists(t_sMemName) then
    t_rMem = getMember(t_sMemName)
    t_ar_MemList = [t_rMem, a_Mem_AvatImage]
    return createUnionImageFromMemberList(me, t_ar_MemList, point(0, 0))
  end if
end
on DrawSpaceWalkEffects me, a_Mem_AvatImage
  me.m_iMagicFrameCounter = me.m_iMagicFrameCounter + 1
  if me.m_iMagicFrameCounter > 2 then
    me.m_iMagicFrameCounter = 0
  end if
  t_iDir = me.m_arFlipList[me.m_iDir + 1]
  t_sMemName = "flame_" & t_iDir & "_" & me.m_iMagicFrameCounter
  if memberExists(t_sMemName) then
    t_rMem = getMember(t_sMemName)
    if me.m_iDir <> 0 then
      if me.m_iDir <> 1 then
        if me.m_iDir <> 2 then
          if me.m_iDir <> 6 then
            if me.m_iDir = 7 then
              t_ar_MemList = [a_Mem_AvatImage, t_rMem]
            end if
          end if
        end if
      end if
      t_ar_MemList = [t_rMem, a_Mem_AvatImage]
    end if
    return createUnionImageFromMemberList(me, t_ar_MemList, point(0, 0))
  end if
end
on DrawMagicBatIn me, a_Mem_AvatImage
  me.m_iMagicBatStateCounter = me.m_iMagicBatStateCounter + 1
  me.m_iMagicFrameCounter = me.m_iMagicFrameCounter + 1
  if me.m_iMagicFrameCounter > me.m_arBatFrameList.count then
    me.m_iMagicFrameCounter = 1
  end if
  t_iDir = me.m_arFlipList[me.m_iDir + 1]
  if 1 = t_iDir then
    t_arFrameList = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5]
    t_sMemName = "magic_batcloud_" & t_arFrameList[me.m_iMagicBatStateCounter]
    if me.m_iMagicBatStateCounter <= 6 then
      t_rMem = getMember(t_sMemName)
      return createUnionImageFromMemberList(me, [a_Mem_AvatImage, t_rMem], point(0, 0))
    end if
  end if
  if memberExists(t_sMemName) = t_iDir then
    t_arFrameList = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5]
    t_sMemName = "magic_batcloud_" & t_arFrameList[me.m_iMagicBatStateCounter]
    if me.m_iMagicBatStateCounter <= 12 and me.m_iMagicBatStateCounter > 6 then
      t_rMem = getMember(t_sMemName)
      return [the image of t_rMem, the image of t_rMem.extractAlpha(), VOID]
    end if
  end if
  if memberExists(t_sMemName) = t_iDir then
    t_sMemName = "magic_bat_" & t_iDir & "_" & me.m_arBatFrameList[me.m_iMagicFrameCounter]
    if me.m_iMagicBatStateCounter > 12 then
      t_rMem = getMember(t_sMemName)
      PlayMagicSound(me, 11.5)
      return [the image of t_rMem, the image of t_rMem.extractAlpha(), VOID]
    end if
  end if
end
on DrawMagicBatOut me, a_Mem_AvatImage
  me.m_iMagicBatStateCounter = me.m_iMagicBatStateCounter + 1
  me.m_iMagicFrameCounter = me.m_iMagicFrameCounter + 1
  if me.m_iMagicFrameCounter > me.m_arBatFrameList.count then
    me.m_iMagicFrameCounter = 1
  end if
  t_iDir = me.m_arFlipList[me.m_iDir + 1]
  t_arFrameList = [5, 5, 4, 4, 3, 3, 2, 2, 1, 1, 0, 0]
  if 1 = t_iDir then
    t_ar_MemList = []
    t_sMemName = "magic_batcloud_" & t_arFrameList[me.m_iMagicBatStateCounter]
    if me.m_iMagicBatStateCounter <= 6 then
      t_rMem = getMember(t_sMemName)
      t_ar_MemList.add(t_rMem)
    end if
    t_sMemName = "magic_bat_" & t_iDir & "_" & me.m_arBatFrameList[me.m_iMagicFrameCounter]
    if memberExists(t_sMemName) then
      t_rMem = getMember(t_sMemName)
      t_ar_MemList.add(t_rMem)
    end if
    if t_ar_MemList.count > 1 then
      return createUnionImageFromMemberList(me, t_ar_MemList, point(0, 0))
    end if
  end if
  if memberExists(t_sMemName) = t_iDir then
    t_sMemName = "magic_batcloud_" & t_arFrameList[me.m_iMagicBatStateCounter]
    if me.m_iMagicBatStateCounter <= 12 and me.m_iMagicBatStateCounter > 6 then
      t_rMem = getMember(t_sMemName)
      return createUnionImageFromMemberList(me, [a_Mem_AvatImage, t_rMem], point(0, 0))
    end if
  end if
  if memberExists(t_sMemName) = t_iDir then
    return VOID
  end if
end
on DrawMagicSharkIn me, a_Mem_AvatImage
  me.m_iMagicBatStateCounter = me.m_iMagicBatStateCounter + 1
  me.m_iMagicFrameCounter = me.m_iMagicFrameCounter + 1
  if me.m_iMagicFrameCounter > me.m_arBatFrameList.count then
    me.m_iMagicFrameCounter = 1
  end if
  t_iDir = me.m_arFlipList[me.m_iDir + 1]
  if 1 = t_iDir then
    t_arFrameList = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5]
    t_sMemName = "magic_batcloud_" & t_arFrameList[me.m_iMagicBatStateCounter]
    if me.m_iMagicBatStateCounter <= 6 then
      t_rMem = getMember(t_sMemName)
      return [the image of t_rMem, the image of t_rMem.extractAlpha(), VOID]
    end if
  end if
  if memberExists(t_sMemName) = t_iDir then
    t_arFrameList = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5]
    t_sMemName = "magic_batcloud_" & t_arFrameList[me.m_iMagicBatStateCounter]
    if me.m_iMagicBatStateCounter <= 12 and me.m_iMagicBatStateCounter > 6 then
      t_rMem = getMember(t_sMemName)
      return [the image of t_rMem, the image of t_rMem.extractAlpha(), VOID]
    end if
  end if
  if t_iDir = me.m_bTalk then
    if me.m_iMagicBatStateCounter > 12 then
      if me.m_iMagicFrameCounter > 2 then
        me.m_iMagicFrameCounter = 1
      end if
      t_sName = me.m_ar_SharkTalkFrames[me.m_iMagicFrameCounter]
      t_sMemName = t_sName & t_iDir & "_" & 0
      if memberExists(t_sMemName) then
        t_rMem = getMember(t_sMemName)
        return [the image of t_rMem, the image of t_rMem.extractAlpha(), VOID]
      end if
    end if
  end if
  if memberExists(t_sMemName) = t_iDir then
    t_sMemName = "Magic_shark_swim_" & t_iDir & "_" & me.m_arBatFrameList[me.m_iMagicFrameCounter]
    if me.m_iMagicBatStateCounter > 12 then
      t_rMem = getMember(t_sMemName)
      return [the image of t_rMem, the image of t_rMem.extractAlpha(), VOID]
    end if
  end if
end
on DrawMagicSharkOut me, a_Mem_AvatImage
  me.m_iMagicBatStateCounter = me.m_iMagicBatStateCounter + 1
  me.m_iMagicFrameCounter = me.m_iMagicFrameCounter + 1
  if me.m_iMagicFrameCounter > me.m_arBatFrameList.count then
    me.m_iMagicFrameCounter = 1
  end if
  t_iDir = me.m_arFlipList[me.m_iDir + 1]
  t_arFrameList = [5, 5, 4, 4, 3, 3, 2, 2, 1, 1, 0, 0]
  if 1 = t_iDir then
    t_ar_MemList = []
    t_sMemName = "magic_batcloud_" & t_arFrameList[me.m_iMagicBatStateCounter]
    if me.m_iMagicBatStateCounter <= 6 then
      t_rMem = getMember(t_sMemName)
      t_ar_MemList.add(t_rMem)
    end if
    t_sMemName = "Magic_shark_swim_" & t_iDir & "_" & me.m_arBatFrameList[me.m_iMagicFrameCounter]
    if memberExists(t_sMemName) then
      t_rMem = getMember(t_sMemName)
      t_ar_MemList.add(t_rMem)
    end if
    if t_ar_MemList.count > 1 then
      return createUnionImageFromMemberList(me, t_ar_MemList, point(0, 0))
    end if
  end if
  if memberExists(t_sMemName) = t_iDir then
    t_sMemName = "magic_batcloud_" & t_arFrameList[me.m_iMagicBatStateCounter]
    if me.m_iMagicBatStateCounter <= 12 and me.m_iMagicBatStateCounter > 6 then
      t_rMem = getMember(t_sMemName)
      return createUnionImageFromMemberList(me, [a_Mem_AvatImage, t_rMem], point(0, 0))
    end if
  end if
  if memberExists(t_sMemName) = t_iDir then
    return VOID
  end if
end
on SetMagicLocation me
  if me.m_iMagicFx = 3 then
    me.m_iFireworksCounter = me.m_iFireworksCounter + 1
    if me.m_iFireworksCounter mod 2 = 0 then
      me.m_iFireworksCounter = 0
    end if
    return 0
  end if
  i = 1
  if i <= me.m_ar_SpriteList.count then
    if me.m_ar_SpriteList[i].count > 0 then
      me.AnimCounter = me.m_ar_SpriteList[i].AnimCounter + 1
      t_iAnimCounter = me.m_ar_SpriteList[i].AnimCounter
      t_iFrameCount = me.m_ar_SpriteList[i].framelist.count
      if t_iAnimCounter > t_iFrameCount then
        t_bLoop = me.m_ar_SpriteList[i].loop
        if t_bLoop then
          me.AnimCounter = 1
          t_iAnimCounter = 1
        end if
        me.AnimCounter = t_iFrameCount
        t_iAnimCounter = t_iFrameCount
      end if
      t_rSpr = me.m_ar_SpriteList[i].sprite
      t_mem = getProp(me.m_ar_SpriteList[i], #framelist, t_iAnimCounter)
      t_rSpr.member = t_mem
      t_rSpr.width = t_mem.width
      t_rSpr.height = t_mem.height
      if me.m_iTileSize <> 32 then
        t_iRatio = me.m_iTileSize / 32
        t_rSpr.width = t_mem.width * t_iRatio
        t_rSpr.height = t_mem.height * t_iRatio
      end if
      t_rSpr.locH = me.m_veAvatarLoc.x
      t_rSpr.locV = me.m_veAvatarLoc.y
      t_rSpr.locZ = me.m_veAvatarLoc.z + 200
      t_rSpr.ink = 33
      if me.m_iMagicFx = 35 then
        t_rSpr.ink = 0
      end if
      if me.m_iMagicFx = 3 then
        t_ar_ColorList = [rgb("FF4444"), rgb("00A5EE"), rgb("4BF254"), rgb("9F3AE7"), rgb("FF6420")]
        t_Col = t_ar_ColorList[random(5)]
        t_rSpr.locH = me.m_veAvatarLoc.x + 2
        t_rSpr.locV = me.m_veAvatarLoc.y - 40
        t_rSpr.ink = 0
        if not voidp(t_Col) then
          me.bgColor = t_Col
        end if
      end if
      t_rSpr.flipH = me.m_bFlip
    end if
    if t_rSpr.m_iMagicFx = 35 then
      t_rSpr.locV = me.m_veAvatarLoc.y + 3
      t_rSpr.flipH = me.m_bFlip
    end if
    i = 1 + i
  end if
end
on PrepareFx me
  if me.m_iMagicFx <> 1 then
    if me.m_iMagicFx <> 19 then
      if me.m_iMagicFx <> 22 then
        if me.m_iMagicFx <> 23 then
          if me.m_iMagicFx <> 24 then
            if me.m_iMagicFx = 28 then
              t_arFrameList = []
              repeat with i = 1 to 10
                if i < 10 then
                  t_mem = getMember("magic_pirate_0" & i)
                end if
                t_mem = getMember("magic_pirate_" & i)
                t_arFrameList.add(t_mem)
              end repeat
              me.m_ar_SpriteList.add(propList())
              me.m_ar_SpriteList[1].addProp(#AnimCounter, 1)
              me.m_ar_SpriteList[1].addProp(#framelist, t_arFrameList)
              t_rSpr = sprite(reserveSprite())
              me.m_ar_SpriteList[1].addProp(#sprite, t_rSpr)
              me.m_ar_SpriteList[1].addProp(#loop, 1)
            end if
          end if
        end if
        if me.m_iMagicFx = 2 then
          t_arFrameList = []
          repeat with i = 1 to 21
            if i < 10 then
              t_mem = getMember("magic_inferno_0" & i)
            end if
            t_mem = getMember("magic_inferno_" & i)
            t_arFrameList.add(t_mem)
          end repeat
          me.m_ar_SpriteList.add(propList())
          me.m_ar_SpriteList[1].addProp(#AnimCounter, 1)
          me.m_ar_SpriteList[1].addProp(#framelist, t_arFrameList)
          t_rSpr = sprite(reserveSprite())
          me.m_ar_SpriteList[1].addProp(#sprite, t_rSpr)
          me.m_ar_SpriteList[1].addProp(#loop, 1)
        end if
      end if
    end if
    if me.m_iMagicFx = 3 then
      t_arFrameList = []
      repeat with i = 1 to 14
        if i < 10 then
          t_mem = getMember("magic_fireworks_0" & i)
        end if
        t_mem = getMember("magic_fireworks_" & i)
        repeat with e = 1 to 2
          t_arFrameList.add(t_mem)
        end repeat
      end repeat
      me.m_ar_SpriteList.add(propList())
      me.m_ar_SpriteList[1].addProp(#AnimCounter, 1)
      me.m_ar_SpriteList[1].addProp(#framelist, t_arFrameList)
      t_rSpr = sprite(reserveSprite())
      me.m_ar_SpriteList[1].addProp(#sprite, t_rSpr)
      me.m_ar_SpriteList[1].addProp(#loop, 1)
    end if
  end if
  if me.m_iMagicFx = 4 then
    t_arFrameList = []
    repeat with i = 1 to 16
      if i < 10 then
        t_mem = getMember("magic_teleport_0" & i)
      end if
      t_mem = getMember("magic_teleport_" & i)
      t_arFrameList.add(t_mem)
    end repeat
    me.m_ar_SpriteList.add(propList())
    me.m_ar_SpriteList[1].addProp(#AnimCounter, 1)
    me.m_ar_SpriteList[1].addProp(#framelist, t_arFrameList)
    t_rSpr = sprite(reserveSprite())
    me.m_ar_SpriteList[1].addProp(#sprite, t_rSpr)
    me.m_ar_SpriteList[1].addProp(#loop, 1)
  else
    if me.m_iMagicFx = 5 then
      t_arFrameList = []
      repeat with i = 1 to 2
        t_mem = getMember("magic_ghost_0" & i)
        t_arFrameList.add(t_mem)
      end repeat
      me.m_ar_SpriteList.add(propList())
      me.m_ar_SpriteList[1].addProp(#AnimCounter, 1)
      me.m_ar_SpriteList[1].addProp(#framelist, t_arFrameList)
      t_rSpr = sprite(reserveSprite())
      me.m_ar_SpriteList[1].addProp(#sprite, t_rSpr)
      me.m_ar_SpriteList[1].addProp(#loop, 1)
    else
      if me.m_iMagicFx = 6 then
        t_arFrameList = []
        repeat with i = 1 to 9
          t_mem = getMember("magic_teleport_0" & i)
          repeat with e = 1 to 3
            t_arFrameList.add(t_mem)
          end repeat
        end repeat
        me.m_ar_SpriteList.add(propList())
        me.m_ar_SpriteList[1].addProp(#AnimCounter, 1)
        me.m_ar_SpriteList[1].addProp(#framelist, t_arFrameList)
        t_rSpr = sprite(reserveSprite())
        me.m_ar_SpriteList[1].addProp(#sprite, t_rSpr)
        me.m_ar_SpriteList[1].addProp(#loop, 1)
      else
        if me.m_iMagicFx = 7 then
          t_arFrameList = []
          repeat with i = 10 to 16
            t_mem = getMember("magic_teleport_" & i)
            repeat with e = 1 to 3
              t_arFrameList.add(t_mem)
            end repeat
          end repeat
          me.m_ar_SpriteList.add(propList())
          me.m_ar_SpriteList[1].addProp(#AnimCounter, 1)
          me.m_ar_SpriteList[1].addProp(#framelist, t_arFrameList)
          t_rSpr = sprite(reserveSprite())
          me.m_ar_SpriteList[1].addProp(#sprite, t_rSpr)
          me.m_ar_SpriteList[1].addProp(#loop, 1)
        else
          if me.m_iMagicFx = 8 then
            t_arFrameList = []
            repeat with i = 0 to 10
              if i < 10 then
                t_mem = getMember("magic_fallingcoin_0" & i)
              end if
              t_mem = getMember("magic_fallingcoin_" & i)
              t_arFrameList.add(t_mem)
            end repeat
            me.m_mp_Framelist.front.add(propList())
            getPropRef(me.m_mp_Framelist, #front, 1).addProp(#frames, t_arFrameList)
            getPropRef(me.m_mp_Framelist, #front, 1).addProp(#counter, 0)
            getPropRef(me.m_mp_Framelist, #front, 1).addProp(#loop, 1)
            t_arFrameList = []
            repeat with i = 1 to 5
              t_mem = getMember("magic_goldpile_BACK_" & i)
              t_arFrameList.add(t_mem)
            end repeat
            me.m_mp_Framelist.back.add(propList())
            getPropRef(me.m_mp_Framelist, #back, 1).addProp(#frames, t_arFrameList)
            getPropRef(me.m_mp_Framelist, #back, 1).addProp(#counter, 0)
            getPropRef(me.m_mp_Framelist, #back, 1).addProp(#loop, 0)
            t_arFrameList = []
            repeat with i = 1 to 5
              t_mem = getMember("magic_goldpile_FRONT_" & i)
              t_arFrameList.add(t_mem)
            end repeat
            me.m_mp_Framelist.front.add(propList())
            getPropRef(me.m_mp_Framelist, #front, 2).addProp(#frames, t_arFrameList)
            getPropRef(me.m_mp_Framelist, #front, 2).addProp(#counter, 0)
            getPropRef(me.m_mp_Framelist, #front, 2).addProp(#loop, 0)
            t_arFrameList = []
            t_mem = getMember("magic_glow")
            t_arFrameList.add(t_mem)
            me.m_ar_SpriteList.add(propList())
            me.m_ar_SpriteList[1].addProp(#AnimCounter, 1)
            me.m_ar_SpriteList[1].addProp(#framelist, t_arFrameList)
            t_rSpr = sprite(reserveSprite())
            me.m_ar_SpriteList[1].addProp(#sprite, t_rSpr)
            me.m_ar_SpriteList[1].addProp(#loop, 0)
          else
            if me.m_iMagicFx = 9 then
              t_arFrameList = []
              i = 1
              me.m_mp_Framelist.front.add(propList())
              getPropRef(me.m_mp_Framelist, #front, 1).addProp(#frames, t_arFrameList)
              getPropRef(me.m_mp_Framelist, #front, 1).addProp(#counter, 0)
              getPropRef(me.m_mp_Framelist, #front, 1).addProp(#loop, 1)
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
              me.m_mp_Framelist.front.add(propList())
              getPropRef(me.m_mp_Framelist, #front, 2).addProp(#frames, t_arFrameList)
              getPropRef(me.m_mp_Framelist, #front, 2).addProp(#counter, 0)
              getPropRef(me.m_mp_Framelist, #front, 2).addProp(#loop, 1)
              t_arFrameList = []
              repeat with i = 1 to 4
                repeat with e = 1 to 15
                  t_mem = getMember("magic_stormcloud_" & i)
                  t_arFrameList.add(t_mem)
                end repeat
              end repeat
              me.m_mp_Framelist.front.add(propList())
              getPropRef(me.m_mp_Framelist, #front, 3).addProp(#frames, t_arFrameList)
              getPropRef(me.m_mp_Framelist, #front, 3).addProp(#counter, 0)
              getPropRef(me.m_mp_Framelist, #front, 3).addProp(#loop, 1)
            else
              if me.m_iMagicFx = 10 then
                t_arFrameList = [getMember("magic_glow2")]
                me.m_ar_SpriteList.add(propList())
                me.m_ar_SpriteList[1].addProp(#AnimCounter, 1)
                me.m_ar_SpriteList[1].addProp(#framelist, t_arFrameList)
                t_rSpr = sprite(reserveSprite())
                me.m_ar_SpriteList[1].addProp(#sprite, t_rSpr)
                me.m_ar_SpriteList[1].addProp(#loop, 1)
              else
                if me.m_iMagicFx = 11 then
                else
                  if me.m_iMagicFx = 12 then
                    t_arFrameList = []
                    repeat with i = 1 to 10
                      if i < 10 then
                        t_mem = getMember("magic_snowfall_0" & i)
                      end if
                      t_mem = getMember("magic_snowfall_" & i)
                      t_arFrameList.add(t_mem)
                      t_arFrameList.add(t_mem)
                    end repeat
                    me.m_mp_Framelist.front.add(propList())
                    getPropRef(me.m_mp_Framelist, #front, 1).addProp(#frames, t_arFrameList)
                    getPropRef(me.m_mp_Framelist, #front, 1).addProp(#counter, 0)
                    getPropRef(me.m_mp_Framelist, #front, 1).addProp(#loop, 1)
                    t_arFrameList = []
                    repeat with i = 1 to 12
                      if i < 10 then
                        t_mem = getMember("magic_snowman_0" & i)
                      end if
                      t_mem = getMember("magic_snowman_" & i)
                      t_arFrameList.add(t_mem)
                      t_arFrameList.add(t_mem)
                      t_arFrameList.add(t_mem)
                      t_arFrameList.add(t_mem)
                    end repeat
                    me.m_mp_Framelist.front.add(propList())
                    getPropRef(me.m_mp_Framelist, #front, 2).addProp(#frames, t_arFrameList)
                    getPropRef(me.m_mp_Framelist, #front, 2).addProp(#counter, 0)
                    getPropRef(me.m_mp_Framelist, #front, 2).addProp(#loop, 0)
                  else
                    if me.m_iMagicFx = 13 then
                      t_arFrameList = [getMember("magic_trdet_glow")]
                      me.m_ar_SpriteList.add(propList())
                      me.m_ar_SpriteList[1].addProp(#AnimCounter, 1)
                      me.m_ar_SpriteList[1].addProp(#framelist, t_arFrameList)
                      t_rSpr = sprite(reserveSprite())
                      me.m_ar_SpriteList[1].addProp(#sprite, t_rSpr)
                      me.m_ar_SpriteList[1].addProp(#loop, 1)
                    else
                      if me.m_iMagicFx = 14 then
                        t_arFrameList = []
                        repeat with i = 0 to 12
                          if i < 10 then
                            t_mem = getMember("magic_trdet_coinsbk_0" & i)
                          end if
                          t_mem = getMember("magic_trdet_coinsbk_" & i)
                          t_arFrameList.add(t_mem)
                        end repeat
                        me.m_mp_Framelist.back.add(propList())
                        getPropRef(me.m_mp_Framelist, #back, 1).addProp(#frames, t_arFrameList)
                        getPropRef(me.m_mp_Framelist, #back, 1).addProp(#counter, 0)
                        getPropRef(me.m_mp_Framelist, #back, 1).addProp(#loop, 1)
                        repeat with i = 0 to 12
                          if i < 10 then
                            t_mem = getMember("magic_trdet_coinsfr_0" & i)
                          end if
                          t_mem = getMember("magic_trdet_coinsfr_" & i)
                          t_arFrameList.add(t_mem)
                        end repeat
                        me.m_mp_Framelist.front.add(propList())
                        getPropRef(me.m_mp_Framelist, #front, 1).addProp(#frames, t_arFrameList)
                        getPropRef(me.m_mp_Framelist, #front, 1).addProp(#counter, 0)
                        getPropRef(me.m_mp_Framelist, #front, 1).addProp(#loop, 1)
                        t_arFrameList = [getMember("magic_trdet_glow")]
                        me.m_ar_SpriteList.add(propList())
                        me.m_ar_SpriteList[1].addProp(#AnimCounter, 1)
                        me.m_ar_SpriteList[1].addProp(#framelist, t_arFrameList)
                        t_rSpr = sprite(reserveSprite())
                        me.m_ar_SpriteList[1].addProp(#sprite, t_rSpr)
                        me.m_ar_SpriteList[1].addProp(#loop, 1)
                      else
                        if me.m_iMagicFx = 32 then
                          t_arFrameList = [getMember("lightningSpell_glow")]
                          me.m_ar_SpriteList.add(propList())
                          me.m_ar_SpriteList[1].addProp(#AnimCounter, 1)
                          me.m_ar_SpriteList[1].addProp(#framelist, t_arFrameList)
                          t_rSpr = sprite(reserveSprite())
                          me.m_ar_SpriteList[1].addProp(#sprite, t_rSpr)
                          me.m_ar_SpriteList[1].addProp(#loop, 1)
                        else
                          if me.m_iMagicFx = 35 then
                            t_arFrameList = []
                            repeat with i = 1 to 11
                              t_mem = getMember("magic_levitation_" & i)
                              t_arFrameList.add(t_mem)
                            end repeat
                            me.m_ar_SpriteList.add(propList())
                            me.m_ar_SpriteList[1].addProp(#AnimCounter, 1)
                            me.m_ar_SpriteList[1].addProp(#framelist, t_arFrameList)
                            t_rSpr = sprite(reserveSprite())
                            me.m_ar_SpriteList[1].addProp(#sprite, t_rSpr)
                            me.m_ar_SpriteList[1].addProp(#loop, 1)
                          end if
                        end if
                      end if
                    end if
                  end if
                end if
              end if
            end if
          end if
        end if
      end if
    end if
  end if
end
on createUnionImageFromMemberList me, a, a1
  if voidp(pTemp) then
    pTemp = script("CMagicFactor_old").new()
  end if
  pTemp.m_bTalk = me.m_bTalk
  pTemp.m_bFlip = me.m_bFlip
  pTemp.m_veAvatarLoc = me.m_veAvatarLoc
  pTemp.m_iMyRef = me.m_iMyRef
  pTemp.m_sCarPantAction = me.m_sCarPantAction
  pTemp.m_ar_StormImgList = me.m_ar_StormImgList
  pTemp.m_arFlipList = me.m_arFlipList
  pTemp.m_iTileSize = me.m_iTileSize
  pTemp.m_arAnimCounters = me.m_arAnimCounters
  pTemp.m_arFrameList = me.m_arFrameList
  pTemp.m_ar_SpriteList = me.m_ar_SpriteList
  pTemp.m_mp_Framelist = me.m_mp_Framelist
  pTemp.m_iMagicFx = me.m_iMagicFx
  pTemp.m_iDir = me.m_iDir
  pTemp.m_arCarpetFrameList = me.m_arCarpetFrameList
  pTemp.m_arLightningFrameList = me.m_arLightningFrameList
  pTemp.m_iMagicFrameCounter = me.m_iMagicFrameCounter
  pTemp.m_iMagicBatStateCounter = me.m_iMagicBatStateCounter
  pTemp.m_arBatFrameList = me.m_arBatFrameList
  pTemp.m_ar_SharkTalkFrames = me.m_ar_SharkTalkFrames
  pTemp.m_iStormCounter = me.m_iStormCounter
  pTemp.m_FxSnd_obj = me.m_FxSnd_obj
  pTemp.m_iCurrendSoundPlaying = me.m_iCurrendSoundPlaying
  pTemp.m_i_CarPantCounter = me.m_i_CarPantCounter
  pTemp.m_iFireworksCounter = me.m_iFireworksCounter
  pTemp.m_SprFuel1 = me.m_SprFuel1
  pTemp.m_SprFuel2 = me.m_SprFuel2
  pTemp.m_iFuelPercent = me.m_iFuelPercent
  pTemp.m_bTrashCanTalkState = me.m_bTrashCanTalkState
  pTemp.m_sMyName = me.m_sMyName
  pTemp.m_sAvatarName = me.m_sAvatarName
  pTemp.m_bSitting = me.m_bSitting
  return pTemp.createUnionImageFromMemberList(a, a1)
end
on PlayMagicSound me, a_iMagicFx
  t_bFxSnd = GET(getObject(#session), "fx")
  if voidp(a_iMagicFx) then
    exit
    t_bLoop = 0
  end if
  if me.m_iCurrendSoundPlaying <> a_iMagicFx and t_bFxSnd then
    me.m_iCurrendSoundPlaying = a_iMagicFx
    if a_iMagicFx = 1 then
      t_sSoundName = "MFX-pirate-parrot-curse"
    else
      if a_iMagicFx = 2 then
        t_sSoundName = "MFX-discoinferno"
      else
        if a_iMagicFx = 3 then
          t_sSoundName = "MFX-firework"
        else
          if a_iMagicFx = 4 then
            t_sSoundName = "MFX-teleportation"
          else
            if a_iMagicFx = 5 then
              t_sSoundName = "MFX-ghost"
            else
              if a_iMagicFx = 6 then
                if me.m_sMyName = me.m_sAvatarName then
                  t_sSoundName = "teleport-2"
                end if
                return 0
              else
                if a_iMagicFx = 7 then
                  if me.m_sMyName = me.m_sAvatarName then
                    t_sSoundName = "teleport-4"
                  end if
                  return 0
                else
                  if a_iMagicFx = 8 then
                    t_sSoundName = "MFX-moneyrain"
                  else
                    if a_iMagicFx = 9 then
                      t_sSoundName = "MFX-curse-storm"
                    else
                      if a_iMagicFx = 10 then
                        t_sSoundName = "MFX-levitate"
                      else
                        if a_iMagicFx <> 11 then
                          if a_iMagicFx = 15 then
                            t_sSoundName = "MFX-bat-1"
                          end if
                        end if
                      end if
                    end if
                  end if
                end if
              end if
            end if
          end if
        end if
      end if
    end if
    if a_iMagicFx = 11.5 then
      t_sSoundName = "MFX-bat-2"
      t_bLoop = 1
    else
      if a_iMagicFx = 12 then
        t_sSoundName = "MFX-snowman"
      else
        if a_iMagicFx = 14 then
          t_sSoundName = "MFX-treasure"
        else
          if a_iMagicFx <> 100 then
            if a_iMagicFx <> 101 then
              if a_iMagicFx <> 102 then
                if a_iMagicFx <> 103 then
                  if a_iMagicFx <> 104 then
                    if a_iMagicFx <> 105 then
                      if a_iMagicFx <> 106 then
                        if a_iMagicFx <> 107 then
                          if a_iMagicFx <> 108 then
                            if a_iMagicFx <> 109 then
                              if a_iMagicFx <> 110 then
                                if a_iMagicFx <> 112 then
                                  if a_iMagicFx <> 113 then
                                    if a_iMagicFx = 114 then
                                      t_sSoundName = "MFX-car-loop-1"
                                      t_bLoop = 1
                                    end if
                                  end if
                                end if
                                if a_iMagicFx <> 111 then
                                  if a_iMagicFx = 115 then
                                    t_sSoundName = "MFX-stitch_space_ship"
                                  end if
                                end if
                              end if
                              if a_iMagicFx = 17 then
                                if me.m_sMyName = me.m_sAvatarName then
                                  t_sSoundName = "SPS-scuba-breath"
                                  t_bLoop = 1
                                end if
                              end if
                            end if
                          end if
                          if a_iMagicFx = 18 then
                            if me.m_sMyName = me.m_sAvatarName then
                              t_sSoundName = "SM-space-suit-1"
                              t_bLoop = 1
                            end if
                          end if
                        end if
                      end if
                      if a_iMagicFx = 19 then
                        if me.m_sMyName = me.m_sAvatarName then
                          t_sSoundName = "MFX-coral-1"
                          t_bLoop = 1
                        end if
                      end if
                    end if
                  end if
                  if a_iMagicFx = 34 then
                    if me.m_sMyName = me.m_sAvatarName then
                      t_sSoundName = "MFX-confette"
                      t_bLoop = 0
                    end if
                  end if
                end if
              end if
              if objectp(me.m_FxSnd_obj) then
                removeObject(me.m_FxSnd_obj.getID())
                me.m_FxSnd_obj = VOID
              end if
            end if
          end if
        end if
      end if
    end if
    return 0
    if voidp(t_sSoundName) then
      exit
    end if
    if voidp(me.m_FxSnd_obj) then
      me.m_FxSnd_obj = createObject(getUniqueID(), "CSoundObject")
      me.m_FxSnd_obj.define(t_sSoundName)
      SetSoundType(me.m_FxSnd_obj, "fx")
      if t_bLoop then
        setLoopCount(me.m_FxSnd_obj, 100)
      end if
      PlaySound(me.m_FxSnd_obj)
    end if
    StopSound(me.m_FxSnd_obj)
    me.m_FxSnd_obj.define(t_sSoundName)
    SetSoundType(me.m_FxSnd_obj, "fx")
    if t_bLoop then
      setLoopCount(me.m_FxSnd_obj, 100)
    end if
    PlaySound(me.m_FxSnd_obj)
  end if
end
on UpdateFuelMeter me
  if voidp(me.m_iFuelPercent) then
    exit
  end if
  if me.m_SprFuel1 = VOID then
    me.m_SprFuel1 = sprite(reserveSprite())
  end if
  if me.m_SprFuel2 = VOID then
    me.m_SprFuel2 = sprite(reserveSprite())
  end if
  me.member = getMember("fuel_status_bar")
  if me.m_iFuelPercent > 25 then
    me.member = getMember("fuel_status_green")
  else
    me.member = getMember("fuel_status_red")
  end if
  t_BarWidth = 45 * float(me.m_iFuelPercent) / 100
  me.width = t_BarWidth
  me.height = 2
  me.locH = me.m_veAvatarLoc.x - 9
  me.locV = me.m_veAvatarLoc.y - 99
  me.locZ = me.m_veAvatarLoc.z + 50
  me.ink = 36
  me.locH = me.m_veAvatarLoc.x - 10
  me.locV = me.m_veAvatarLoc.y - 100
  me.locZ = me.m_veAvatarLoc.z
  me.ink = 36
end
on MagicFxStatus me, tMsg
  if me.m_sMyName = me.m_sAvatarName then
    if not timeoutExists("FxLocator" & me.m_iMyRef) then
      createTimeout("FxLocator" & me.m_iMyRef, 200, #GetActualPos, me.getID(), VOID, 0)
    end if
    t_iFxCode = tMsg.connection.GetIntFrom()
    me.m_iFuelPercent = tMsg.connection.GetIntFrom()
  end if
  return 0
end
on regMsgList me, tBool
  tMsgs = propList()
  tMsgs.setaProp(2526, #MagicFxStatus)
  tCmds = propList()
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    registerCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  end if
  unregisterListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
  unregisterCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
end