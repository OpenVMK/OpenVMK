-- Script
property m_imgBuffer
property m_arPartList
property m_mpPartIndex
property pUpdateRect
property m_iBdDir
property m_iLastDir
property m_iHeadDir
property m_iLocX
property m_iLocY
property m_iLocH
property m_iLocFix
property pXFactor
property pYFactor
property pHFactor
property m_iAnimCounter
property m_bEyesClosed
property m_iSync
property m_bChanges
property m_bActMv
property m_bActTlk
property m_bActCrr
property m_bActCth
property m_bActRtl
property m_bActSit
property m_bActEat
property m_bAnimating
property m_sCurrentAnim
property m_arFlipList
property m_mpSortedParts
property m_iShowEmoticon
property m_iPulseCounter
property m_bFlipped
property m_rAlpha
property m_iAnimatedFrame
property m_iLoc
property m_iMyRef
property m_ObjAvatar
property m_sStatusHands
property m_sStatusLegs
property m_iItemHands
property m_rBeamSpr
property m_iCanvasHeight
property m_iCanvasWidth
property m_iBeamCounter
property m_ar_FaceList
property m_ar_FaceListAlpha
property m_iTileSize
property m_mp_AvatarData

on construct me
  m_iCanvasHeight = getVariable("avatarHeight", 160)
  m_iCanvasWidth = getVariable("avatarWidth", 80)
  m_arPartList = []
  m_mpPartIndex = [:]
  m_arFlipList = [0, 1, 2, 3, 4, 3, 2, 1]
  pUpdateRect = rect(0, 0, 0, 0)
  m_iAnimCounter = 0
  m_bEyesClosed = 0
  m_iSync = 1
  m_bChanges = 1
  m_imgBuffer = image(m_iCanvasWidth, m_iCanvasHeight, 32)
  m_rAlpha = image(m_iCanvasWidth, m_iCanvasHeight, 8, #grayscale)
  m_bFlipped = 0
  m_bActMv = 0
  m_bActSit = 0
  m_bActTlk = 0
  m_bActCrr = 0
  m_bActDnc = 0
  m_bActEat = 0
  m_bActWav = 0
  m_bAnimating = 0
  m_sCurrentAnim = EMPTY
  m_iLoc = VOID
  m_sStatusLeftHand = VOID
  m_sStatusRightHand = VOID
  m_iItemLeftHand = VOID
  m_iItemRightHand = VOID
  m_sStatusLegs = VOID
  m_iPulseCounter = 1
  m_iAnimCounter2 = 0
  m_iPulseCounter2 = 0
  m_iMyRef = VOID
  m_ObjAvatar = VOID
  m_iEmoticon = 0
  m_iPrevEmoticon = 0
  return 1
end
on deconstruct me
  m_arPartList = []
  pShadowSpr = VOID
  pMatteSpr = VOID
  pSprite = VOID
  t_mpDelays = [:]
  t_mpDelays = me.delays
  repeat with g = 1 to t_mpDelays.count
    me.cancel(t_mpDelays.getPropAt(g))
  end repeat
  m_iMyRef = VOID
  m_ObjAvatar = VOID
  m_sStatusLeftHand = VOID
  m_sStatusRightHand = VOID
  m_iItemLeftHand = VOID
  m_iItemRightHand = VOID
  return 1
end
on Define me, a_mp_AvatarData
  m_arPartList = a_mp_AvatarData.objects
  m_iBdDir = a_mp_AvatarData.BodyDir
  m_iHeadDir = a_mp_AvatarData.HeadDir
  m_iMyRef = a_mp_AvatarData.MyRef
  m_bFlipped = a_mp_AvatarData.Flipped
  m_iTileSize = a_mp_AvatarData.tilesize
  m_iLastDir = 3
  me.arrangeParts()
  me.Refresh(m_iBdDir, m_iHeadDir)
  m_iSync = 0
  me.RenderFaces()
end
on Action me, a_Ar_Data
  m_mp_AvatarData = a_Ar_Data
  m_bFlipped = 0
  m_bActMv = 0
  m_bActSit = 0
  m_bActTlk = 0
  m_bActCrr = 0
  m_bAnimating = 0
  m_sCurrentAnim = EMPTY
  m_iHeadDir = m_mp_AvatarData.HeadDir
  m_iBdDir = m_mp_AvatarData.BodyDir
  t_iActHands = m_mp_AvatarData.RightHand
  me.ActHands(t_iActHands)
  me.ActFeet(m_mp_AvatarData.Feet)
  m_bFlipped = m_mp_AvatarData.Flipped
  me.Refresh(m_iHeadDir, m_iBdDir)
  if t_iActHands = 13 then
    me.updater(200)
    return 1
  end if
  if t_iActHands = 12 or t_iActHands = 1 then
    me.updater(50)
  else
    t_mpDelays = [:]
    t_mpDelays = me.delays
    repeat with g = 1 to t_mpDelays.count
      me.cancel(t_mpDelays.getPropAt(g))
    end repeat
  end if
end
on RenderFaces me
  m_ar_FaceList = []
  m_ar_FaceListAlpha = []
  t_ar_PartList = ["hd", "hr", "fc", "ey"]
  t_mpSortedParts = [:]
  repeat with i = 1 to t_ar_PartList.count
    t_sPart = t_ar_PartList[i]
    if m_arPartList.findPos(t_sPart) > 0 then
      t_mpSortedParts.addProp(t_sPart, m_arPartList[t_sPart])
    end if
  end repeat
  repeat with e = 1 to 8
    m_rAlpha = image(m_iCanvasWidth, m_iCanvasHeight, 8, #grayscale)
    m_imgBuffer = image(m_iCanvasWidth, m_iCanvasHeight, 32)
    m_imgBuffer.fill(m_imgBuffer.rect, rgb(0, 0, 0))
    m_imgBuffer.useAlpha = 0
    m_iHeadDir = e - 1
    call(#update, t_mpSortedParts)
    m_imgBuffer.setAlpha(m_rAlpha)
    m_imgBuffer.useAlpha = 1
    t_Img = m_imgBuffer.duplicate()
    t_Img_a = m_rAlpha.duplicate()
    m_ar_FaceList.add(t_Img)
    m_ar_FaceListAlpha.add(t_Img_a)
  end repeat
end
on ShowBeam me, a_iAnimcounter
  m_iBeamCounter = a_iAnimcounter
  if integerp(m_iBeamCounter) then
    if voidp(m_rBeamSpr) then
      m_rBeamSpr = sprite(reserveSprite())
    end if
    t_iLoc = m_iLoc
    t_sMemName = "cth_beam_100_" & m_arFlipList[m_iBdDir + 1] & "_" & m_iBeamCounter
    if memberExists(t_sMemName) then
      t_rMem = getMember(t_sMemName)
      m_rBeamSpr.member = t_rMem
      m_rBeamSpr.ink = 33
      m_rBeamSpr.blend = 100
      m_rBeamSpr.locV = t_iLoc.y
      m_rBeamSpr.locZ = t_iLoc.z + 500
      m_rBeamSpr.flipH = m_arFlipList[m_iBdDir + 1] <> m_iBdDir
      case m_iBdDir of
        1:
          m_rBeamSpr.locH = t_iLoc.x - 5
        2, 4:
          m_rBeamSpr.locH = t_iLoc.x - 5
        3:
          m_rBeamSpr.locH = t_iLoc.x - 5
        5:
          m_rBeamSpr.locH = t_iLoc.x + 10
          m_rBeamSpr.locV = t_iLoc.y - 2
        6:
          m_rBeamSpr.locH = t_iLoc.x + 5
        7:
          m_rBeamSpr.locH = t_iLoc.x + 5
        0:
          m_rBeamSpr.locH = t_iLoc.x - 5

      end case
      t_Img = t_rMem.image
      t_iWidth = t_Img.width / 2
      t_iHeight = t_Img.height / 2
      m_rBeamSpr.width = t_iWidth
      m_rBeamSpr.height = t_iHeight
    end if
  else
    if not voidp(m_rBeamSpr) then
      releaseSprite(m_rBeamSpr.spriteNum)
      m_rBeamSpr = VOID
      m_iBeamCounter = VOID
      t_mpDelays = [:]
      t_mpDelays = me.delays
      repeat with g = 1 to t_mpDelays.count
        me.cancel(t_mpDelays.getPropAt(g))
      end repeat
    end if
  end if
end
on ReleaseBeam me
  if not voidp(m_rBeamSpr) then
    releaseSprite(m_rBeamSpr.spriteNum)
    m_rBeamSpr = VOID
    m_iBeamCounter = VOID
    it_mpDelays = [:]
    t_mpDelays = me.delays
    repeat with g = 1 to t_mpDelays.count
      me.cancel(t_mpDelays.getPropAt(g))
    end repeat
  end if
end
on GetShirtColor me
  t_iModel = m_arPartList["ch"].GetPartModel()
  case t_iModel of
    90:
      t_Col = rgb(255, 90, 183)
    92:
      t_Col = rgb(64, 255, 49)

  end case
  return t_Col
end
on updater me
  me.Refresh(m_iHeadDir, m_iBdDir)
  me.delay(100, #updater2)
end
on updater2 me
  me.Refresh(m_iHeadDir, m_iBdDir)
  me.updater()
end
on SetSpriteLoc me, a_vSprLoc
  m_iLoc = a_vSprLoc
end
on update me, a_veAvatarLoc, a_Spr
  if voidp(a_Spr) then
    return 0
  end if
  if voidp(a_Spr.member) then
    return 0
  end if
  m_rSpr = a_Spr
  if a_Spr.member.name = EMPTY then
    return 0
  end if
  m_iSync = not m_iSync
  m_rAvatarSpr = a_Spr
  m_iLoc = a_veAvatarLoc
  me.arrangeParts()
  if m_iSync then
    me.prepare()
  else
    me.render()
    t_Obj = getThread(#room).component._AccessRoom()
    t_iRatio = float(m_iTileSize) / 32.0
    t_Img = image(m_iCanvasWidth, m_iCanvasHeight, 32)
    t_Img.fill(t_Img.rect, rgb(0, 0, 0))
    t_rAlpha = image(m_iCanvasWidth, m_iCanvasHeight, 8, #grayscale)
    t_iRect1 = (m_iCanvasWidth - m_iCanvasWidth * t_iRatio) / 2
    t_iRect2 = m_iCanvasHeight - m_iCanvasHeight * t_iRatio
    t_iRect3 = m_iCanvasWidth - t_iRect1
    t_rDestRect = rect(t_iRect1, t_iRect2, t_iRect3, m_iCanvasHeight)
    t_Img.copyPixels(m_imgBuffer, t_rDestRect, m_imgBuffer.rect, #useFastQuads = 1)
    t_rAlpha.copyPixels(m_rAlpha, t_rDestRect, m_rAlpha.rect, #useFastQuads = 1)
    t_rImg = a_Spr.member.image
    if voidp(t_rImg) then
      return 0
    end if
    t_rImg.copyPixels(t_Img, t_rImg.rect, t_Img.rect, #useFastQuads = 1)
    t_rImg.setAlpha(t_rAlpha)
    t_rImg.useAlpha = 1
    a_Spr.member.regPoint = point(40, 144)
    a_Spr.flipH = m_bFlipped
    me.ShowBeam(m_iBeamCounter)
  end if
end
on ActHands me, a_iAct
  m_bBeamState = 0
  t_sAct = "std"
  m_iItemHands = VOID
  case a_iAct of
    1:
      t_sAct = "wlk"
    12:
      t_sAct = "rtl"
      m_bActRtl = 1
    13:
      t_sAct = "cth"
      m_bActCrr = 1
      m_bActCth = 1
      m_bBeamState = 1
    otherwise:
      t_sAct = "std"
      m_bActSit = 0

  end case
  m_sStatusHands = t_sAct
  if t_sAct <> "wlk" then
    call(#defineActMultiple, m_mpSortedParts, t_sAct, ["ch", "lpn", "rpn", "ri"])
  end if
end
on ActFeet me, a_iAct
  case a_iAct of
    1:
      t_sAct = "wlk"
      m_bActDnc = 0
      me.stopAnimation()
      me.action_mv()
    2:
      t_sAct = "dnc"
      me.startAnimation("dance.aero")
      m_bActDnc = 1
    3, 4:
      t_sAct = "sit"
      m_bActDnc = 0
      me.stopAnimation()
      me.action_sit()
    otherwise:
      t_sAct = "std"
      m_bActSit = 0
      me.stopAnimation()

  end case
  m_sStatusLegs = t_sAct
  if t_sAct <> "wlk" and t_sAct <> "dnc" then
    call(#defineActMultiple, m_mpSortedParts, t_sAct, ["rpn", "lpn", "ch"])
  end if
end
on ShowArrow me
end
on HideArrow me
end
on Refresh me, tDirHead, tDirBody
  if m_bActSit then
    t_bSit = 1
  end if
  m_bActMv = 0
  m_bActTlk = 0
  m_bActRtl = 0
  m_bActCth = 0
  m_bActTlk = 0
  m_bAnimating = 0
  me.arrangeParts()
  m_iLocFix = point(-1, 2)
  call(#defineDirMultiple, m_mpSortedParts, m_iBdDir, ["ch", "lpn"])
  call(#defineDirMultiple, m_mpSortedParts, m_iHeadDir, ["hd", "hr", "ey", "fc", "ht"])
  call(#reset, m_mpSortedParts)
  m_bChanges = 1
end
on action_mv me
  m_bActSit = 0
  m_bActMv = 1
  call(#defineActMultiple, m_mpSortedParts, "wlk", ["ch", "lpn"])
end
on closeEyes me
  call(#defineActMultiple, m_mpSortedParts, "blk", ["ey"])
  m_bEyesClosed = 1
  m_bChanges = 1
end
on openEyes me
  call(#defineActMultiple, m_mpSortedParts, "std", ["ey"])
  m_bEyesClosed = 0
  m_bChanges = 1
end
on startAnimation me, tMemName
  if tMemName = m_sCurrentAnim then
    return 0
  end if
  if not memberExists(tMemName) then
    return 0
  end if
  tmember = member(getmemnum(tMemName))
  tList = tmember.text
  tTempDelim = the itemDelimiter
  the itemDelimiter = "/"
  repeat with i = 1 to tList.line.count
    tPart = tList.line[i].item[1]
    tAnim = tList.line[i].item[2]
    call(#setAnimation, m_mpSortedParts, tPart, tAnim)
  end repeat
  the itemDelimiter = tTempDelim
  m_bAnimating = 1
  m_sCurrentAnim = tMemName
end
on stopAnimation me
  m_bAnimating = 0
  m_sCurrentAnim = EMPTY
  call(#remAnimation, m_mpSortedParts)
end
on prepare me
  m_iAnimCounter = (m_iAnimCounter + 1) mod 4
  if m_bEyesClosed then
    me.openEyes()
  else
    if random(60) = 3 then
      me.closeEyes()
    end if
  end if
  if m_bActTlk and random(3) > 1 then
    call(#defineActMultiple, m_mpSortedParts, "spk", ["fc"])
    m_bChanges = 1
  end if
  if m_bActMv then
    m_bChanges = 1
  end if
  if m_bActRtl then
    call(#doHandWork, m_mpSortedParts, "rtl", ["ch"])
    m_bChanges = 1
  end if
  if m_bActCth then
    call(#doHandWork, m_mpSortedParts, "cth", ["ch"])
    m_bChanges = 1
  end if
end
on render me
  if not m_bChanges then
    exit
  end if
  m_bChanges = 0
  me.arrangeParts()
  pUpdateRect = rect(0, 0, 0, 0)
  m_rAlpha = image(m_iCanvasWidth, m_iCanvasHeight, 8, #grayscale)
  m_imgBuffer = image(m_iCanvasWidth, m_iCanvasHeight, 32)
  m_imgBuffer.fill(m_imgBuffer.rect, rgb(0, 0, 0))
  m_imgBuffer.useAlpha = 0
  call(#update, m_mpSortedParts)
  m_imgBuffer.setAlpha(m_rAlpha)
  m_imgBuffer.useAlpha = 1
  return m_imgBuffer
end
on reDraw me
  m_rAlpha = image(m_iCanvasWidth, m_iCanvasHeight, 8, #grayscale)
  m_imgBuffer = image(m_iCanvasWidth, m_iCanvasHeight, 32)
  m_imgBuffer.fill(m_imgBuffer.rect, rgb(0, 0, 0))
  me.arrangeParts()
  call(#render, m_mpSortedParts)
end
on arrangeParts me
  if m_iBdDir = 0 or m_iBdDir = 3 or m_iBdDir = 4 or m_iBdDir = 5 then
    m_mpPartIndex = ["tr", "llg", "lsh", "lpn", "rlg", "rlg", "rsh", "rpn", "lh", "li", "ls", "ch2", "rh", "ri", "rs", "hd", "fc", "ey", "hr", "ht", "ch"]
  end if
  if m_iBdDir = 1 or m_iBdDir = 2 or m_iBdDir = 6 or m_iBdDir = 7 then
    m_mpPartIndex = ["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "lh", "li", "ls", "ch2", "rh", "ri", "rs", "hd", "fc", "ey", "hr", "ht", "ch"]
  end if
  m_mpSortedParts = [:]
  repeat with i = 1 to m_mpPartIndex.count
    t_sPart = m_mpPartIndex[i]
    if m_arPartList.findPos(t_sPart) > 0 then
      m_mpSortedParts.addProp(t_sPart, m_arPartList[t_sPart])
    end if
  end repeat
end
on flipImage me, a_img
  t_Img = image(m_iCanvasWidth, m_iCanvasHeight, 32)
  t_Img.setAlpha(image(m_iCanvasWidth, m_iCanvasHeight, 8))
  t_Img.useAlpha = 1
  tQuad = [point(a_img.width, 0), point(0, 0), point(0, a_img.height), point(a_img.width, a_img.height)]
  t_Img.copyPixels(a_img, tQuad, a_img.rect, #useFastQuads = 1)
  return t_Img
end
on ClothingLoaded this, a_iCloth
  m_bChanges = 1
end