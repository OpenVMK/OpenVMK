-- Script
property m_iVehicle
property m_iDir
property m_iAnimCounter
property m_FxSnd_obj
property m_iCurrendSoundPlaying
property m_sMyName
property m_sAvatarName
property m_ar_ALiceColors
property m_ar_PeterPanColor

on construct this
  m_iVehicle = 0
  m_iDir = 0
  m_iAnimCounter = 0
  m_FxSnd_obj = VOID
  m_iCurrendSoundPlaying = 0
  registerMessage(#set_FxOff, this.getID(), #setFxOff)
  registerMessage("room_leave", this.getID(), #setFxOff)
  registerMessage("close_Settings", this.getID(), #checkSoundSettings)
  t_ar_ColorList = [["61FF9C", "00A3A5"], ["E597FF", "9B1FDB"], ["FFF297", "EDB200"], ["97D9FF", "0D79DE"]]
  m_ar_ALiceColors = t_ar_ColorList[random(t_ar_ColorList.count)]
  t_ar_List = ["1374E2", "E2AF13", "13E296"]
  m_ar_PeterPanColor = rgb(t_ar_List[random(3)])
  return 1
end
on deconstruct this
  if objectp(m_FxSnd_obj) then
    m_FxSnd_obj.StopSound()
    removeObject(m_FxSnd_obj.getID())
    m_FxSnd_obj = VOID
  end if
  unregisterMessage(#set_FxOff, this.getID())
  unregisterMessage("room_leave", this.getID())
  unregisterMessage("close_Settings", this.getID())
  return 1
end
on SetVehicle me, a_iVehicle, a_iDir, a_sMyName, a_sAvatarName
  m_iDir = a_iDir
  m_sMyName = a_sMyName
  m_sAvatarName = a_sAvatarName
  if m_iVehicle <> a_iVehicle then
    m_iVehicle = a_iVehicle
    if objectp(m_FxSnd_obj) then
      m_FxSnd_obj.StopSound()
      m_iCurrendSoundPlaying = 0
    end if
    me.PlayVehicleSound(a_iVehicle)
  end if
end
on update me, a_SprAvatar, a_rShirtColor
  t_Mem_AvatImage = a_SprAvatar.member
  t_arFlipList = [0, 1, 2, 3, 4, 3, 2, 1]
  t_iDir = t_arFlipList[m_iDir + 1]
  m_iAnimCounter = m_iAnimCounter + 1
  t_ar_DrawList = []
  t_mp_ColorizationList = [:]
  case m_iVehicle of
    5:
      t_sMemName = "log_" & t_iDir
      if memberExists(t_sMemName) then
        t_rMem = getMember(t_sMemName)
        t_ar_DrawList.add(t_rMem)
        t_ar_DrawList.add(t_Mem_AvatImage)
      end if
    6:
      t_sMemName = "magic_everestcar_back_" & t_iDir
      if memberExists(t_sMemName) then
        t_rMem = getMember(t_sMemName)
        t_ar_DrawList.add(t_rMem)
      end if
      t_ar_DrawList.add(t_Mem_AvatImage)
      t_sMemName = "magic_everestcar_front_" & t_iDir
      if memberExists(t_sMemName) then
        t_rMem = getMember(t_sMemName)
        t_ar_DrawList.add(t_rMem)
      end if
    7:
      t_sMemName = "magic_rocket_back_" & t_iDir
      if memberExists(t_sMemName) then
        t_rMem = getMember(t_sMemName)
        t_ar_DrawList.add(t_rMem)
      end if
      t_Pnt_Orig = t_rMem.regPoint
      t_pnt = point(t_Pnt_Orig[1], t_Pnt_Orig[2] + 5)
      t_rMem.regPoint = t_pnt
      t_ar_DrawList.add(t_Mem_AvatImage)
      t_sMemName = "magic_rocket_front_" & t_iDir
      if memberExists(t_sMemName) then
        t_rMem1 = getMember(t_sMemName)
        t_ar_DrawList.add(t_rMem1)
      end if
      t_Pnt_Orig1 = t_rMem1.regPoint
      t_Pnt1 = point(t_Pnt_Orig1[1], t_Pnt_Orig1[2] + 5)
      t_rMem1.regPoint = t_Pnt1
    8:
      if m_iAnimCounter > 10 then
        m_iAnimCounter = 1
      end if
      t_ar_AnimFrames = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4]
      t_iAnimFrame = t_ar_AnimFrames[m_iAnimCounter]
      t_sMemName = "magic_donuttl_back_" & t_iDir & "_" & t_iAnimFrame
      if memberExists(t_sMemName) then
        t_rBackMem = getMember(t_sMemName)
      end if
      t_sMemName = "magic_donuttl_front_" & t_iDir & "_" & t_iAnimFrame
      if memberExists(t_sMemName) then
        t_rFrontMem = getMember(t_sMemName)
      end if
      if VOID <> t_rBackMem and VOID <> t_rFrontMem and VOID <> t_Mem_AvatImage then
        if t_iDir = 4 then
          t_ar_DrawList = [t_rBackMem, t_rFrontMem, t_Mem_AvatImage]
        else
          t_ar_DrawList = [t_rBackMem, t_Mem_AvatImage, t_rFrontMem]
        end if
      end if
    9:
      if m_iAnimCounter > 10 then
        m_iAnimCounter = 1
      end if
      t_ar_AnimFrames = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4]
      t_iAnimFrame = t_ar_AnimFrames[m_iAnimCounter]
      t_sMemName = "magic_donutbb_back_" & t_iDir & "_" & t_iAnimFrame
      if memberExists(t_sMemName) then
        t_rBackMem = getMember(t_sMemName)
      end if
      t_sMemName = "magic_donutbb_front_" & t_iDir & "_" & t_iAnimFrame
      if memberExists(t_sMemName) then
        t_rFrontMem = getMember(t_sMemName)
      end if
      if VOID <> t_rBackMem and VOID <> t_rFrontMem and VOID <> t_Mem_AvatImage then
        if t_iDir = 4 then
          t_ar_DrawList = [t_rBackMem, t_rFrontMem, t_Mem_AvatImage]
        else
          t_ar_DrawList = [t_rBackMem, t_Mem_AvatImage, t_rFrontMem]
        end if
      end if
    10:
      t_sMemName = "alicecar_back_0_" & t_iDir
      if memberExists(t_sMemName) then
        t_rMem = getMember(t_sMemName)
        t_ar_DrawList.add(t_rMem)
        t_mp_ColorizationList.addProp(t_rMem, rgb(m_ar_ALiceColors[2]))
      end if
      t_sMemName = "alicecar_back_1_" & t_iDir
      if memberExists(t_sMemName) then
        t_rMem = getMember(t_sMemName)
        t_ar_DrawList.add(t_rMem)
        t_mp_ColorizationList.addProp(t_rMem, rgb(m_ar_ALiceColors[1]))
      end if
      t_ar_DrawList.add(t_Mem_AvatImage)
      t_sMemName = "alicecar_front_0_" & t_iDir
      if memberExists(t_sMemName) then
        t_rMem = getMember(t_sMemName)
        t_ar_DrawList.add(t_rMem)
        t_mp_ColorizationList.addProp(t_rMem, rgb(m_ar_ALiceColors[2]))
      end if
      t_sMemName = "alicecar_front_1_" & t_iDir
      if memberExists(t_sMemName) then
        t_rMem = getMember(t_sMemName)
        t_ar_DrawList.add(t_rMem)
        t_mp_ColorizationList.addProp(t_rMem, rgb(m_ar_ALiceColors[1]))
      end if
    11:
      if a_rShirtColor = rgb(238, 238, 238) then
        a_rShirtColor = m_ar_PeterPanColor
      end if
      t_sMemName = "ppship_back_0_" & t_iDir
      if memberExists(t_sMemName) then
        t_rMem = getMember(t_sMemName)
        t_ar_DrawList.add(t_rMem)
      end if
      t_sMemName = "ppship_back_1_" & t_iDir
      if memberExists(t_sMemName) then
        t_rMem = getMember(t_sMemName)
        t_ar_DrawList.add(t_rMem)
        t_mp_ColorizationList.addProp(t_rMem, a_rShirtColor)
      end if
      t_ar_DrawList.add(t_Mem_AvatImage)
      t_sMemName = "ppship_front_0_" & t_iDir
      if memberExists(t_sMemName) then
        t_rMem = getMember(t_sMemName)
        t_ar_DrawList.add(t_rMem)
      end if
      t_sMemName = "ppship_front_1_" & t_iDir
      if memberExists(t_sMemName) then
        t_rMem = getMember(t_sMemName)
        t_ar_DrawList.add(t_rMem)
        t_mp_ColorizationList.addProp(t_rMem, a_rShirtColor)
      end if
    12:
      if m_iAnimCounter > 6 then
        m_iAnimCounter = 1
      end if
      t_ar_AnimFrames = [0, 0, 0, 1, 1, 1]
      t_iAnimFrame = t_ar_AnimFrames[m_iAnimCounter]
      t_sMemName = "magic_raftbb_back_" & t_iDir & "_" & t_iAnimFrame
      if memberExists(t_sMemName) then
        t_rBackMem = getMember(t_sMemName)
      end if
      t_sMemName = "magic_raftbb_front_" & t_iDir & "_" & t_iAnimFrame
      if memberExists(t_sMemName) then
        t_rFrontMem = getMember(t_sMemName)
      end if
      if VOID <> t_rBackMem and VOID <> t_rFrontMem and VOID <> t_Mem_AvatImage then
        if t_iDir = 4 then
          t_ar_DrawList = [t_rBackMem, t_rFrontMem, t_Mem_AvatImage]
        else
          t_ar_DrawList = [t_rBackMem, t_Mem_AvatImage, t_rFrontMem]
        end if
      end if
    13:
      if m_iAnimCounter > 6 then
        m_iAnimCounter = 1
      end if
      t_ar_AnimFrames = [0, 0, 0, 1, 1, 1]
      t_iAnimFrame = t_ar_AnimFrames[m_iAnimCounter]
      t_sMemName = "magic_rafttl_back_" & t_iDir & "_" & t_iAnimFrame
      if memberExists(t_sMemName) then
        t_rBackMem = getMember(t_sMemName)
      end if
      t_sMemName = "magic_rafttl_front_" & t_iDir & "_" & t_iAnimFrame
      if memberExists(t_sMemName) then
        t_rFrontMem = getMember(t_sMemName)
      end if
      if VOID <> t_rBackMem and VOID <> t_rFrontMem and VOID <> t_Mem_AvatImage then
        if t_iDir = 4 then
          t_ar_DrawList = [t_rBackMem, t_rFrontMem, t_Mem_AvatImage]
        else
          t_ar_DrawList = [t_rBackMem, t_Mem_AvatImage, t_rFrontMem]
        end if
      end if

  end case
  if t_ar_DrawList.count > 1 then
    t_ar_AvatarData = me.createUnionImageFromMemberList(t_ar_DrawList, point(0, 0), t_mp_ColorizationList)
    if m_iVehicle = 7 then
      t_rMem.regPoint = t_Pnt_Orig
      t_rMem1.regPoint = t_Pnt_Orig1
    end if
    return t_ar_AvatarData
  end if
end
on createUnionImageFromMemberList me, i_ar_list, _setRegpoint, a_mp_ColorizationList
  if m_iVehicle > 0 then
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
      tMaskList.append(tMem.image.extractAlpha())
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
      t_iPos = a_mp_ColorizationList.findPos(tUnionList[i].member)
      if t_iPos > 0 then
        t_rShirtColor = a_mp_ColorizationList[t_iPos]
        tImg.copyPixels(t_rImg, t_rImg.rect + rect(tDeltaRegpoint, tDeltaRegpoint), t_rImg.rect, [#bgColor: t_rShirtColor, #ink: 41])
        next repeat
      end if
      tImg.copyPixels(t_rImg, t_rImg.rect + rect(tDeltaRegpoint, tDeltaRegpoint), t_rImg.rect)
    end repeat
    tImg.setAlpha(tMaskImg)
    tImg.useAlpha = 1
    return [tImg, tMaskImg]
  end if
end
on PlayVehicleSound me, a_iMagicFx
  t_bFxSnd = getObject(#session).get("fx")
  if voidp(a_iMagicFx) then
    exit
  end if
  t_bLoop = 0
  if t_bFxSnd and m_iCurrendSoundPlaying <> a_iMagicFx then
    m_iCurrendSoundPlaying = a_iMagicFx
    case a_iMagicFx of
      7:
        if m_sMyName = m_sAvatarName then
          t_sSoundName = "VMK-scifi-ride-loop-1"
          t_bLoop = 1
        else
          return 0
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
        m_FxSnd_obj.setLoopCount(1000)
      end if
      m_FxSnd_obj.PlaySound()
    else
      m_FxSnd_obj.StopSound()
      m_FxSnd_obj.Define(t_sSoundName)
      m_FxSnd_obj.SetSoundType("fx")
      if t_bLoop then
        m_FxSnd_obj.setLoopCount(1000)
      end if
      m_FxSnd_obj.PlaySound()
    end if
  end if
end
on setFxOff me
  if objectp(m_FxSnd_obj) then
    m_FxSnd_obj.StopSound()
  end if
end
on checkSoundSettings me
  t_bFx = getObject(#session).get("fx")
  if not t_bFx then
    me.setFxOff()
  end if
end