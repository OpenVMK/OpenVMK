-- Script
property m_imgBuffer
property m_arPartList
property m_mpPartIndex
property pUpdateRect
property m_iBdDir
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
property m_bActDnc
property m_bActWav
property m_bActSit
property m_bActEat
property m_bAnimating
property m_sCurrentAnim
property m_objVehicle
property m_arFlipList
property m_mpSortedParts
property m_iPulseCounter
property m_bFlipped
property m_rAlpha
property m_iAnimatedFrame
property m_iLoc
property m_iMyRef
property m_ObjAvatar
property m_sStatusLeftHand
property m_sStatusRightHand
property m_iItemLeftHand
property m_iItemRightHand
property m_sStatusLegs
property m_iCanvasHeight
property m_iCanvasWidth
property m_iTileSize
property m_rImgArrow
property m_rImgArrowAlpha
property m_bShowArrow
property m_rAvatarSpr
property m_iEmoticon
property m_iPrevEmoticon
property m_Reg_pnt
property m_Obj_Magic
property m_iMagic
property m_iMagicCounter
property m_PntMagicRegPoint
property m_mp_AvatarData
property m_ar_StormImgList
property m_Obj_Vehicle
property m_iVehicle
property m_sSPaceWalkAct
property m_iTradeState
property m_iVehicleAnimCounter
property m_rWriterName
property m_sNameTagWnd
property m_bNameTagShown

on construct me
  m_iCanvasHeight = 160
  m_iCanvasWidth = 80
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
  m_objVehicle = VOID
  m_iPulseCounter = 1
  m_iAnimCounter2 = 0
  m_iPulseCounter2 = 0
  m_iMyRef = VOID
  m_ObjAvatar = VOID
  m_iEmoticon = 0
  m_iPrevEmoticon = 0
  m_iMagic = 0
  m_iMagicCounter = 0
  m_iTradeState = 0
  m_iVehicleAnimCounter = 0
  m_Reg_pnt = VOID
  m_Obj_Magic = VOID
  m_mp_AvatarData = VOID
  m_ar_StormImgList = []
  m_iVehicle = VOID
  m_Obj_Vehicle = VOID
  m_PntMagicRegPoint = VOID
  m_sSPaceWalkAct = VOID
  m_bNameTagShown = 0
  return 1
end
on deconstruct me
  m_arPartList = []
  pShadowSpr = VOID
  pMatteSpr = VOID
  pSprite = VOID
  m_iMyRef = VOID
  m_ObjAvatar = VOID
  m_sStatusLeftHand = VOID
  m_sStatusRightHand = VOID
  m_iItemLeftHand = VOID
  m_iItemRightHand = VOID
  t_mpDelays = [:]
  t_mpDelays = me.delays
  repeat with g = 1 to t_mpDelays.count
    me.cancel(t_mpDelays.getPropAt(g))
  end repeat
  if windowExists(m_sNameTagWnd) then
    removeWindow(m_sNameTagWnd)
  end if
  if not voidp(m_rWriterName) then
    removeWriter(m_rWriterName.getID())
  end if
  return 1
end
on Define me, a_mp_AvatarData
  m_arPartList = a_mp_AvatarData.objects
  m_iBdDir = a_mp_AvatarData.BodyDir
  m_iHeadDir = a_mp_AvatarData.HeadDir
  m_iMyRef = a_mp_AvatarData.MyRef
  m_bFlipped = a_mp_AvatarData.Flipped
  m_iTileSize = a_mp_AvatarData.tilesize
  t_sName = a_mp_AvatarData.avatarName
  me.arrangeParts()
  me.Refresh(m_iBdDir, m_iHeadDir)
  m_iSync = 0
  m_iMagicCounter = 0
  if memberExists("avatar.arrow.32.inside") then
    if t_sName <> VOID then
      t_Img = getMember("avatar.arrow.32.inside").image
      t_rImgArrow = t_Img.duplicate()
      t_ShirtCol = me.GetShirtColor()
      t_Img = image(t_rImgArrow.width, t_rImgArrow.height, 32)
      t_Img.copyPixels(t_rImgArrow, t_rImgArrow.rect, t_rImgArrow.rect, [#bgColor: t_ShirtCol])
      t_rImgInside = getMember("avatar.arrow.32").image
      t_Img.copyPixels(t_rImgInside, rect(2, 2, 28, 23), t_rImgInside.rect)
      m_rImgArrow = t_Img
      m_rImgArrowAlpha = t_rImgArrow.extractAlpha()
    end if
  end if
end
on Action me, a_mp_AvatarData
  m_mp_AvatarData = a_mp_AvatarData
  m_iPrevEmoticon = m_iEmoticon
  m_Obj_Vehicle = m_mp_AvatarData.VehicleObj
  m_iVehicle = m_mp_AvatarData.Feet
  m_Obj_Magic = m_mp_AvatarData.MagicObj
  m_iMagic = m_mp_AvatarData.magic
  m_objVehicle = m_mp_AvatarData.VehicleObj
  m_iTradeState = m_mp_AvatarData.TradeState
  if m_iMagic = 9 then
    if m_ar_StormImgList.count = 0 then
      return me.CacheStormFxImages()
    else
      if objectp(m_Obj_Magic) then
        m_Obj_Magic.SetStormFximages(m_ar_StormImgList)
      end if
    end if
  end if
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
  m_iHeadDir = m_mp_AvatarData.HeadDir
  m_iBdDir = m_mp_AvatarData.BodyDir
  me.Refresh(m_iBdDir, m_iHeadDir)
  m_iSync = 0
  m_bChanges = 1
  m_iEmoticon = m_mp_AvatarData.emoticon
  me.ActEyes(m_mp_AvatarData.Eyes)
  me.ActMouth(m_mp_AvatarData.Mouth)
  me.ActLeftHand(m_mp_AvatarData.LeftHand)
  me.ActRightHand(m_mp_AvatarData.RightHand)
  me.ActLeftFoot(m_mp_AvatarData.Feet)
  me.ActRightFoot(m_mp_AvatarData.Feet)
  m_bFlipped = m_mp_AvatarData.Flipped
  m_iCanvasHeight = 160
  m_iCanvasWidth = 80
  if m_iTradeState = 1 then
    m_iEmoticon = 1000
  end if
  if m_iEmoticon = 0 and m_iPrevEmoticon <> 0 then
    if m_iTileSize = 32 and not voidp(m_rAvatarSpr) then
      m_rAvatarSpr.member.image = image(m_iCanvasWidth, m_iCanvasHeight, 32)
    end if
  end if
end
on updatePreviewImage me
  m_iSync = not m_iSync
  me.arrangeParts()
  if m_iSync then
    me.prepare()
  else
    me.render()
    t_Img = image(m_iCanvasWidth, m_iCanvasHeight, 32)
    t_Img.fill(t_Img.rect, rgb(0, 0, 0))
    t_rAlpha = image(m_iCanvasWidth, m_iCanvasHeight, 8, #grayscale)
    t_rDestRect = rect(10, 0, 70, 160)
    t_Img.copyPixels(m_imgBuffer, t_rDestRect, m_imgBuffer.rect, #useFastQuads = 1)
    t_rAlpha.copyPixels(m_rAlpha, t_rDestRect, m_rAlpha.rect, #useFastQuads = 1)
    t_Img.setAlpha(t_rAlpha)
    t_Img.useAlpha = 1
    if m_bFlipped then
      me.flipImage(t_Img)
    end if
    return m_imgBuffer
  end if
end
on SetAvatarInfo me, a_ObjAvatar
  if objectp(a_ObjAvatar) then
    m_ObjAvatar = a_ObjAvatar
    m_iMyRef = value(a_ObjAvatar.GetParam("REF"))
  end if
end
on ArrowHide me
  if m_bShowArrow then
    t_rContext = getThread(#room).component._AccessRoom()
    t_rObj = t_rContext._AccessIndexed(m_iMyRef, "avatar")
    if objectp(t_rObj) then
      t_rObj.GetVisual().Unselect()
    end if
  end if
end
on update me, a_veAvatarLoc, a_Spr
  if voidp(a_Spr) then
    return 0
  end if
  if voidp(a_Spr.member) then
    return 0
  end if
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
    if m_bChanges then
      me.render()
      a_Spr.member.image = image(80, 160, 32)
      t_rImg = a_Spr.member.image
      if voidp(t_rImg) then
        return 0
      end if
      if m_bActSit then
        t_iH = t_rImg.width / 2
        t_iV = t_rImg.height - 45
      else
        t_iH = t_rImg.width / 2
        t_iV = t_rImg.height - 16
      end if
      if m_iMagic > 99 then
        t_iV = t_rImg.height - 25
      end if
      if objectp(m_Obj_Magic) then
        case m_iMagic of
          17:
            m_Obj_Magic.SitStateForDiving(m_bActSit)
          25:
            m_Obj_Magic.TalkStateForShark(m_bActTlk)

        end case
      end if
      t_pnt = point(t_iH, t_iV)
      a_Spr.member.regPoint = t_pnt
      if objectp(m_Obj_Magic) then
        m_iMagicCounter = m_iMagicCounter + 1
        me.DrawMagic(a_Spr, a_veAvatarLoc)
      else
        a_Spr.blend = 100
      end if
      if objectp(m_Obj_Vehicle) then
        case m_iVehicle of
          5:
            t_iV = t_rImg.height - 19
            t_iH = t_iH - 1
            case m_iBdDir of
              1, 7:
                t_iV = t_rImg.height - 14
                t_iH = t_iH - 3

            end case
          6:
            t_iV = t_rImg.height - 25
          7:
            t_iV = t_rImg.height - 12
          8, 9:
            t_iV = t_rImg.height - 16
          10:
            t_iV = t_rImg.height - 20
          11:
            m_iVehicleAnimCounter = m_iVehicleAnimCounter + 1
            if m_iVehicleAnimCounter > 20 then
              m_iVehicleAnimCounter = 1
            end if
            t_ar_FloatingPoints = [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 2, 2, 2, 2, 1, 1, -1, -1]
            t_iFloatPoint = t_ar_FloatingPoints[m_iVehicleAnimCounter]
            t_iV = t_rImg.height - (17 + t_iFloatPoint)

        end case
        a_Spr.member.regPoint = point(t_iH, t_iV)
        me.DrawVehicle(a_Spr)
      end if
      if m_iEmoticon > 0 then
        me.DrawEmoticons(a_Spr)
      end if
      if m_bShowArrow and not m_bNameTagShown then
        me.DrawArrows(a_Spr)
      end if
      t_iCanvasWidth = m_imgBuffer.width
      t_iCanvasHeight = m_imgBuffer.height
      t_iRatio = float(m_iTileSize) / 32.0
      t_Img = image(t_iCanvasWidth, t_iCanvasHeight, 32)
      t_Img.fill(t_Img.rect, rgb(0, 0, 0))
      t_rAlpha = image(t_iCanvasWidth, t_iCanvasHeight, 8, #grayscale)
      t_iRect1 = (t_iCanvasWidth - t_iCanvasWidth * t_iRatio) / 2
      t_iRect2 = t_iCanvasHeight - t_iCanvasHeight * t_iRatio
      t_iRect3 = t_iCanvasWidth - t_iRect1
      t_rDestRect = rect(t_iRect1, t_iRect2, t_iRect3, t_iCanvasHeight)
      t_Img.copyPixels(m_imgBuffer, t_rDestRect, m_imgBuffer.rect, #useFastQuads = 1)
      t_rAlpha.copyPixels(m_rAlpha, t_rDestRect, m_rAlpha.rect, #useFastQuads = 1)
      t_iWidth = t_Img.width
      t_iHeight = t_Img.height
      if m_bActSit then
        t_iH = t_iWidth / 2
        t_iV = t_iHeight - 45
      else
        t_iH = t_iWidth / 2
        t_iV = t_iHeight - 16
      end if
      if m_iMagic = 16 then
        case 1 of
          m_bActSit:
            t_iV = t_iHeight - 15
          m_bActTlk:
            t_iV = t_iHeight - 18

        end case
      end if
      if objectp(m_Obj_Vehicle) then
        if m_iVehicle = 5 then
          t_iV = t_iHeight - 35
        else
          if m_iVehicle = 7 then
            t_iV = t_iHeight - 15
          else
            t_iV = t_iHeight - 30
          end if
          if m_iVehicle = 11 then
            t_ar_FloatingPoints = [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 2, 2, 2, 2, 1, 1, -1, -1]
            t_iFloatPoint = t_ar_FloatingPoints[m_iVehicleAnimCounter]
            t_iV = t_iHeight + (10 + t_iFloatPoint)
          end if
          if m_iVehicle = 10 then
            t_iV = t_iHeight - 15
          end if
        end if
      end if
      case m_iMagic of
        10:
          t_iV = t_iV + 30 + random(3)
        11:
          if m_iMagicCounter > 6 then
            t_iV = t_iV + 80
          end if
        17:
          if m_iMagicCounter > 15 then
            m_iMagicCounter = 1
          end if
          t_arHeightList = [0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 0]
          t_iV = t_iV + 6 + t_arHeightList[m_iMagicCounter]
        18:
          if m_iMagicCounter > 15 then
            m_iMagicCounter = 1
          end if
          t_arHeightList = [0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 0]
          if m_sSPaceWalkAct = "wlk" then
            t_iV = t_iV + 6 + t_arHeightList[m_iMagicCounter]
          else
            t_iV = t_iV + 6 + t_arHeightList[m_iMagicCounter]
          end if
        25:
          t_iV = t_iV + 20
        8, 9, 10, 11, 12, 14, 15, 19, 22, 23, 24, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115:
          if VOID <> m_PntMagicRegPoint then
            t_iH = m_PntMagicRegPoint[1]
            t_iV = m_PntMagicRegPoint[2]
            if m_iEmoticon > 0 and m_bShowArrow and not m_bNameTagShown then
              t_iV = m_PntMagicRegPoint[2] + 75
            else
              if m_iEmoticon > 0 then
                t_iV = m_PntMagicRegPoint[2] + 40
              else
                if m_bShowArrow and not m_bNameTagShown then
                  t_iV = m_PntMagicRegPoint[2] + 34
                end if
              end if
            end if
          end if

      end case
      t_pnt = point(t_iH, t_iV)
      a_Spr.width = t_iWidth
      a_Spr.height = t_iHeight
      a_Spr.member.image = image(t_iWidth, t_iHeight, 32)
      t_rImg = a_Spr.member.image
      t_rImg.copyPixels(t_Img, t_rImg.rect, t_Img.rect, #useFastQuads = 1)
      t_rImg.setAlpha(t_rAlpha)
      t_rImg.useAlpha = 1
      a_Spr.member.regPoint = t_pnt
      a_Spr.flipH = m_bFlipped
    end if
  end if
  return 1
end
on DrawMagic me, a_Spr, a_veAvatarLoc
  t_rImg = a_Spr.member.image
  a_Spr.blend = 100
  case m_iMagic of
    8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 22, 23, 24, 25, 26, 27, 28, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115:
      t_iRatio = 1
      t_Img = image(80, 160, 32)
      t_Img.fill(t_Img.rect, rgb(0, 0, 0))
      t_rAlpha = image(80, 160, 8, #grayscale)
      t_Img.copyPixels(m_imgBuffer, m_imgBuffer.rect, m_imgBuffer.rect, #useFastQuads = 1)
      t_rAlpha.copyPixels(m_rAlpha, m_rAlpha.rect, m_rAlpha.rect, #useFastQuads = 1)
      t_rImg.copyPixels(t_Img, t_rImg.rect, t_Img.rect, #useFastQuads = 1)
      t_rImg.setAlpha(t_rAlpha)
      t_rImg.useAlpha = 1
      t_ImgAvatar = m_Obj_Magic.update(a_veAvatarLoc, a_Spr)
      if listp(t_ImgAvatar) then
        m_imgBuffer = t_ImgAvatar[1]
        m_rAlpha = t_ImgAvatar[2]
        m_PntMagicRegPoint = t_ImgAvatar[3]
        m_iCanvasWidth = m_imgBuffer.width
        m_iCanvasHeight = m_imgBuffer.height
        t_Img = image(m_iCanvasWidth, m_iCanvasHeight, 32)
        t_Img.fill(t_Img.rect, rgb(0, 0, 0))
        t_rAlpha = image(m_iCanvasWidth, m_iCanvasHeight, 8, #grayscale)
        a_Spr.member.image = image(m_iCanvasWidth, m_iCanvasHeight, 32)
        t_rImg = a_Spr.member.image
      end if
    1, 2, 3, 13:
      if objectp(m_Obj_Magic) then
        m_Obj_Magic.update(a_veAvatarLoc, a_Spr)
      end if
    4, 6, 7:
      if objectp(m_Obj_Magic) then
        m_Obj_Magic.update(a_veAvatarLoc, a_Spr)
        a_Spr.blend = 50
      end if
    5:
      if objectp(m_Obj_Magic) then
        m_Obj_Magic.update(a_veAvatarLoc, a_Spr)
        a_Spr.blend = 35
      end if

  end case
end
on DrawArrows me, a_Spr
  t_iArrowHeight = m_rImgArrow.height
  if m_iEmoticon > 0 then
    t_sEmoticonName = "emoticon_" & m_iEmoticon
    if memberExists(t_sEmoticonName) then
      t_iHeightVariable = getMember("emoticon_1").height + 20
    end if
  else
    t_iHeightVariable = 10
  end if
  t_Img = image(m_iCanvasWidth, m_iCanvasHeight + (t_iArrowHeight + t_iHeightVariable), 32)
  t_Img.fill(t_Img.rect, rgb(0, 0, 0))
  t_rAlpha = image(m_iCanvasWidth, m_iCanvasHeight + (t_iArrowHeight + t_iHeightVariable), 8, #grayscale)
  t_iWidthPos = (m_iCanvasWidth - m_rImgArrow.width) / 2
  t_iPos = t_Img.height - m_imgBuffer.height
  t_Img.copyPixels(m_imgBuffer, rect(0, t_iPos, t_Img.width, t_Img.height), m_imgBuffer.rect, #useFastQuads = 1)
  t_rAlpha.copyPixels(m_rAlpha, rect(0, t_iPos, t_Img.width, t_Img.height), m_rAlpha.rect, #useFastQuads = 1)
  t_Img.copyPixels(m_rImgArrow, rect(t_iWidthPos, 0, m_rImgArrow.width + t_iWidthPos, m_rImgArrow.height), m_rImgArrow.rect, #useFastQuads = 1)
  t_rAlpha.copyPixels(m_rImgArrowAlpha, rect(t_iWidthPos, 0, m_rImgArrowAlpha.width + t_iWidthPos, m_rImgArrowAlpha.height), m_rImgArrowAlpha.rect, #useFastQuads = 1)
  m_imgBuffer = t_Img
  m_rAlpha = t_rAlpha
end
on DrawEmoticons me, a_Spr
  t_sEmoticonName = "emoticon_" & m_iEmoticon
  if memberExists(t_sEmoticonName) then
    t_ImgEmoticon = getMember(t_sEmoticonName).image
    t_ImgEmoticonAlpha = t_ImgEmoticon.extractAlpha()
  else
    return 0
  end if
  m_iCanvasHeight = m_imgBuffer.height
  t_iEmoticonHeight = t_ImgEmoticon.height
  t_iHeight = t_iEmoticonHeight + 10
  t_Img = image(m_iCanvasWidth, m_iCanvasHeight + t_iHeight, 32)
  t_Img.fill(t_Img.rect, rgb(0, 0, 0))
  t_rAlpha = image(m_iCanvasWidth, m_iCanvasHeight + t_iHeight, 8, #grayscale)
  t_iWidthPos = (m_iCanvasWidth - t_ImgEmoticon.width) / 2
  t_i = t_iHeight
  t_Img.copyPixels(m_imgBuffer, rect(0, t_i, t_Img.width, t_Img.height), m_imgBuffer.rect, #useFastQuads = 1)
  t_rAlpha.copyPixels(m_rAlpha, rect(0, t_i, t_Img.width, t_Img.height), m_rAlpha.rect, #useFastQuads = 1)
  t_Img.copyPixels(t_ImgEmoticon, rect(t_iWidthPos, 0, t_ImgEmoticon.width + t_iWidthPos, t_ImgEmoticon.height), t_ImgEmoticon.rect, #useFastQuads = 1)
  t_rAlpha.copyPixels(t_ImgEmoticonAlpha, rect(t_iWidthPos, 0, t_ImgEmoticonAlpha.width + t_iWidthPos, t_ImgEmoticonAlpha.height), t_ImgEmoticonAlpha.rect, #useFastQuads = 1)
  m_imgBuffer = t_Img
  m_rAlpha = t_rAlpha
  return 1
end
on DrawVehicle me, a_Spr
  t_rImg = a_Spr.member.image
  t_iRatio = 1
  t_Img = image(80, 160, 32)
  t_Img.fill(t_Img.rect, rgb(0, 0, 0))
  t_rAlpha = image(80, 160, 8, #grayscale)
  t_Img.copyPixels(m_imgBuffer, m_imgBuffer.rect, m_imgBuffer.rect, #useFastQuads = 1)
  t_rAlpha.copyPixels(m_rAlpha, m_rAlpha.rect, m_rAlpha.rect, #useFastQuads = 1)
  t_rImg.copyPixels(t_Img, t_rImg.rect, t_Img.rect, #useFastQuads = 1)
  t_rImg.setAlpha(t_rAlpha)
  t_rImg.useAlpha = 1
  t_ShirtCol = me.GetShirtColor()
  t_ImgAvatar = m_Obj_Vehicle.update(a_Spr, t_ShirtCol)
  if voidp(t_ImgAvatar) then
    exit
  end if
  m_imgBuffer = t_ImgAvatar[1]
  m_rAlpha = t_ImgAvatar[2]
  m_iCanvasWidth = m_imgBuffer.width
  m_iCanvasHeight = m_imgBuffer.height
  t_Img = image(m_iCanvasWidth, m_iCanvasHeight, 32)
  t_Img.fill(t_Img.rect, rgb(0, 0, 0))
  t_rAlpha = image(m_iCanvasWidth, m_iCanvasHeight, 8, #grayscale)
  a_Spr.member.image = image(m_iCanvasWidth, m_iCanvasHeight, 32)
  t_rImg = a_Spr.member.image
end
on ActLeftHand me, a_iAct
  if m_iMagic = 18 and a_iAct = 1 then
    m_sStatusLeftHand = "std"
    exit
  end if
  t_sAct = "std"
  m_iItemLeftHand = VOID
  case a_iAct of
    1:
      t_sAct = "wlk"
      if m_iMagic = 16 then
        m_Obj_Magic.SetPushTheTrashcanAction("wlk")
        exit
      end if
    2:
      t_sAct = "crr"
      m_bActCrr = 1
      m_iItemLeftHand = 1
    3:
      t_sAct = "drk"
      m_iItemLeftHand = 1
      m_bActEat = 1
      if m_iMagic = 16 then
        m_Obj_Magic.SetPushTheTrashcanAction("drk")
        exit
      end if
    4:
      t_sAct = "crr"
      m_bActCrr = 1
      m_iItemLeftHand = 2
    5:
      t_sAct = "drk"
      m_iItemLeftHand = 2
      m_bActEat = 1
      if m_iMagic = 16 then
        m_Obj_Magic.SetPushTheTrashcanAction("drk")
        exit
      end if
    6:
      t_sAct = "crr"
      m_bActCrr = 1
      m_iItemLeftHand = 3
    11:
      t_sAct = "crr"
      m_bActCrr = 1
      if m_iBdDir <> 0 then
        m_iItemLeftHand = 50
      end if
    10:
      t_sAct = "dnc"
    24:
      t_sAct = "wav"
      m_bActWav = 1
      if m_iMagic = 16 then
        m_Obj_Magic.SetPushTheTrashcanAction("wav")
        exit
      end if
    18:
      t_sAct = "crr"
      m_bActCrr = 1
      m_iItemLeftHand = 4
    19:
      t_sAct = "drk"
      m_iItemLeftHand = 4
      m_bActEat = 1
    100:
      t_sAct = "crr"
      m_bActCrr = 1
    101:
      t_sAct = "wav2"
    otherwise:
      t_sAct = "std"
      m_bActSit = 0
      if m_iMagic = 16 then
        m_Obj_Magic.SetPushTheTrashcanAction("wav")
        exit
      end if

  end case
  m_sStatusLeftHand = t_sAct
  if t_sAct <> "wlk" then
    call(#defineActMultiple, m_mpSortedParts, t_sAct, ["lh", "ls", "li"])
  end if
end
on ActRightHand me, a_iAct
  if m_iMagic = 18 and a_iAct = 1 then
    m_sStatusRightHand = "std"
    exit
  end if
  t_sAct = "std"
  m_iItemRightHand = VOID
  case a_iAct of
    1:
      t_sAct = "wlk"
      if m_iMagic = 16 then
        m_Obj_Magic.SetPushTheTrashcanAction("wlk")
      end if
    2:
      t_sAct = "crr"
      m_bActCrr = 1
      m_iItemRightHand = 1
    3:
      t_sAct = "drk"
      m_iItemRightHand = 1
      m_bActEat = 1
      if m_iMagic = 16 then
        m_Obj_Magic.SetPushTheTrashcanAction("drk")
        exit
      end if
    4:
      t_sAct = "crr"
      m_bActCrr = 1
      m_iItemRightHand = 2
    5:
      t_sAct = "drk"
      m_iItemRightHand = 2
      m_bActEat = 1
    6:
      t_sAct = "crr"
      m_bActCrr = 1
      m_iItemRightHand = 3
    11:
      t_sAct = "crr"
      m_bActCrr = 1
      if m_iBdDir <> 0 then
        m_iItemRightHand = 50
      end if
    10:
      t_sAct = "dnc"
    24:
      t_sAct = "wav"
      m_bActWav = 1
      if m_iMagic = 16 then
        m_Obj_Magic.SetPushTheTrashcanAction("wav")
        exit
      end if
    100:
      t_sAct = "crr"
      m_bActCrr = 1
    otherwise:
      t_sAct = "std"
      m_bActSit = 0
      if m_iMagic = 16 then
        m_Obj_Magic.SetPushTheTrashcanAction("std")
        exit
      end if

  end case
  m_sStatusRightHand = t_sAct
  if t_sAct <> "wlk" then
    call(#defineActMultiple, m_mpSortedParts, t_sAct, ["rh", "rs", "ri"])
  end if
end
on ActLeftFoot me, a_iAct
  if m_iMagic = 18 and a_iAct = 1 then
    m_sStatusLegs = "std"
    exit
  end if
  if m_iMagic > 99 then
    call(#defineActMultiple, m_mpSortedParts, "null", ["llg", "lpn", "lsh"])
    return 1
  end if
  case a_iAct of
    1:
      t_sAct = "wlk"
      m_bActDnc = 0
      me.stopAnimation()
      m_bActSit = 0
      m_bActMv = 1
      call(#defineActMultiple, m_mpSortedParts, "wlk", ["lh", "ls", "llg", "lpn", "lsh", "rh", "rs", "rlg", "rpn", "rsh"])
    2:
      t_sAct = "dnc"
      me.startAnimation("dance.aero")
      m_bActDnc = 1
    3, 4:
      t_sAct = "sit"
      m_bActDnc = 0
      m_bActMv = 0
      me.stopAnimation()
      m_bActSit = 1
      call(#defineActMultiple, m_mpSortedParts, "sit", ["tr"])
    5, 7, 10, 11:
      t_sAct = "null"
    6, 8, 9:
      t_sAct = "sit"
      m_bActDnc = 0
      me.stopAnimation()
      m_bActSit = 1
      call(#defineActMultiple, m_mpSortedParts, "sit", ["tr"])
    otherwise:
      t_sAct = "std"
      m_bActSit = 0
      me.stopAnimation()

  end case
  m_sStatusLegs = t_sAct
  if t_sAct <> "wlk" and t_sAct <> "dnc" then
    call(#defineActMultiple, m_mpSortedParts, t_sAct, ["llg", "lpn", "lsh"])
  end if
end
on ActRightFoot me, a_iAct
  if m_iMagic = 18 then
    if a_iAct = 1 or a_iAct = 2 then
      m_sSPaceWalkAct = "wlk"
    else
      m_sSPaceWalkAct = VOID
    end if
  end if
  if m_iMagic > 99 then
    call(#defineActMultiple, m_mpSortedParts, "null", ["rlg", "rpn", "rsh"])
    return 1
  end if
  case a_iAct of
    1:
      t_sAct = "wlk"
    2:
      t_sAct = "dnc"
    3, 4, 6, 8, 9:
      t_sAct = "sit"
    5, 7, 10, 11:
      t_sAct = "null"
    otherwise:
      t_sAct = "std"

  end case
  if m_iMagic > 99 then
    t_sAct = "null"
  end if
  if t_sAct <> "wlk" and t_sAct <> "dnc" then
    call(#defineActMultiple, m_mpSortedParts, t_sAct, ["rlg", "rpn", "rsh"])
  end if
end
on ActEyes me, a_iAct
end
on ActMouth me, a_iAct
  case a_iAct of
    1:
      m_bActTlk = 1
    2:
      m_bActTlk = 1
    3:
      t_sAct = "sit"

  end case
end
on ShowHideAvatar me, a_bAvatar, a_bSdw
  t_rContext = getThread(#room).component._AccessRoom()
  t_rObj = t_rContext._AccessIndexed(m_iMyRef, "avatar").GetVisual()
  t_rObj.visible(a_bAvatar, a_bSdw)
end
on ShowArrow me
  m_bShowArrow = 1
  m_bChanges = 1
end
on HideArrow me
  m_bShowArrow = 0
  m_bChanges = 1
  if m_iTileSize = 32 then
    if not voidp(m_rAvatarSpr) then
      m_rAvatarSpr.member.image = image(m_iCanvasWidth, m_iCanvasHeight, 32)
    end if
  end if
end
on ShowName me, a_sAvatarName, a_bState
  m_bNameTagShown = a_bState
  if a_sAvatarName <> VOID then
    t_ShirtCol = me.GetShirtColor()
    m_sNameTagWnd = "NameTag" & a_sAvatarName
    if not windowExists(m_sNameTagWnd) then
      createWindow(m_sNameTagWnd)
      t_rWnd = getWindow(m_sNameTagWnd)
      t_rWnd.registerClient(me.getID())
      t_rWnd.merge("vmk_mouseover.window")
    else
      t_rWnd = getWindow(m_sNameTagWnd)
    end if
    t_rWnd.setProperty(#visible, a_bState)
    t_rWnd.getElement("bubble.color").getProperty(#sprite).bgColor = t_ShirtCol
    if not writerExists("NameTagWriter" & a_sAvatarName) then
      tBold = getStructVariable("struct.font.chat.bold")
      tMetrics = [#font: tBold.getaProp(#font), #fontStyle: tBold.getaProp(#fontStyle), #color: rgb(250, 250, 250), #fixedLineSpace: 12]
      createWriter("NameTagWriter" & a_sAvatarName, tMetrics)
      m_rWriterName = getWriter("NameTagWriter" & a_sAvatarName)
      t_ChatImg = m_rWriterName.render(SPACE & a_sAvatarName)
      t_iWidht = t_ChatImg.width
      t_iHeight = t_ChatImg.height
      t_rChatImg = image(t_iWidht + 4, t_iHeight, 32)
      t_rChatImg.copyPixels(t_ChatImg, rect(3, 0, t_iWidht + 2, t_iHeight), t_ChatImg.rect)
      t_rImgElem = t_rWnd.getElement("avatar.mouseover")
      t_iCurWidth = t_rImgElem.getProperty(#width)
      t_iCurHeight = t_rImgElem.getProperty(#height)
      t_iOffWidth = t_rChatImg.width - t_iCurWidth
      t_iOffHeight = t_rChatImg.height - t_iCurHeight
      t_rWnd.ResizeBy(t_iOffWidth, t_iOffHeight)
      t_rImgElem.feedImage(t_rChatImg)
    end if
    if a_bState then
      if not voidp(m_iLoc) then
        t_rImgElem = t_rWnd.getElement("avatar.mouseover")
        t_iCurWidth = t_rImgElem.getProperty(#width)
        if m_bActSit then
          t_iV = m_iLoc.y - m_iTileSize * 2.32999992370605 + 29
        else
          t_iV = m_iLoc.y - m_iTileSize * 2.32999992370605
        end if
        t_rWnd.moveTo(m_iLoc.x - (t_iCurWidth / 2 + 6), t_iV)
      end if
    end if
    if m_bShowArrow then
      me.ShowArrow()
    end if
  end if
end
on Refresh me, tDirHead, tDirBody
  if m_bActDnc then
    tDirHead = tDirBody
  end if
  if m_bActSit then
    t_bSit = 1
  end if
  m_bActMv = 0
  m_bActDnc = 0
  m_bActTlk = 0
  m_bActCrr = 0
  m_bActWav = 0
  m_BactTrade = 0
  m_bAnimating = 0
  m_bActSlp = 0
  me.arrangeParts()
  m_iLocFix = point(-1, 2)
  call(#defineDirMultiple, m_mpSortedParts, tDirBody, ["llg", "lsh", "lpn", "tr", "rlg", "rsh", "rpn", "lh", "ls", "ch", "ch2", "rh", "rs"])
  call(#defineDirMultiple, m_mpSortedParts, tDirHead, ["hd", "hr", "ey", "fc", "ht"])
  call(#reset, m_mpSortedParts)
  m_bChanges = 1
end
on getProperty me, tPropID
  case tPropID of
    #dancing:
      return m_bActDnc
    #carrying:
      return m_bActCrr

  end case
  return 0
end
on closeEyes me
  call(#defineActMultiple, m_mpSortedParts, "blk", ["ey"])
  m_bEyesClosed = 1
  m_bChanges = 1
  if m_iMagic = 16 then
    m_Obj_Magic.SetPushTheTrashcanAction("blk1")
  end if
end
on openEyes me
  call(#defineActMultiple, m_mpSortedParts, "std", ["ey"])
  m_bEyesClosed = 0
  m_bChanges = 1
  if m_iMagic = 16 then
    m_Obj_Magic.SetPushTheTrashcanAction("blk2")
  end if
end
on GetShirtColor me
  t_Col = m_arPartList["ch"].GetPartColor()
  return t_Col
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
  m_iPulseCounter = m_iPulseCounter + 1
  if m_iPulseCounter = 2 then
    m_iAnimCounter = (m_iAnimCounter + 1) mod 4
    m_iPulseCounter = 0
  end if
  if m_bActCrr then
    m_bChanges = 1
  end if
  if m_bActEat then
    m_bChanges = 1
  end if
  if m_bActMv then
    m_bChanges = 1
  end if
  if m_bActWav then
    call(#doHandWorkRight, m_mpSortedParts, "wav")
    m_bChanges = 1
  end if
  if m_bActDnc then
    m_bAnimating = 1
    m_bChanges = 1
  end if
  if objectp(m_Obj_Magic) then
    m_bChanges = 1
  end if
  if m_bEyesClosed then
    me.openEyes()
  else
    if random(60) = 3 then
      me.closeEyes()
    end if
  end if
  if m_bActTlk and random(3) > 1 then
    if m_iMagic = 16 then
      m_Obj_Magic.SetPushTheTrashcanAction("spk")
      exit
    end if
    call(#defineActMultiple, m_mpSortedParts, "spk", ["fc"])
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
  if m_iTileSize <> 32 then
    t_iRatio = float(m_iTileSize) / 32.0
    t_Img = image(m_iCanvasWidth, m_iCanvasHeight, 32)
    t_iRect1 = m_iCanvasWidth - m_iCanvasWidth * t_iRatio / 2
    t_iRect2 = m_iCanvasHeight - m_iCanvasHeight * t_iRatio
    t_iRect3 = m_iCanvasWidth - t_iRect1
    t_rDestRect = rect(t_iRect1, t_iRect2, t_iRect3, m_iCanvasHeight)
    t_Img.copyPixels(m_imgBuffer, t_rDestRect, m_imgBuffer.rect, #useFastQuads = 1)
    return t_Img
  end if
  return m_imgBuffer
end
on CacheStormFxImages me
  m_ar_StormImgList = []
  t_iTileSize = m_iTileSize
  repeat with i = 0 to 7
    t_dir = i
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
    m_iTileSize = 32
    m_iHeadDir = t_dir
    m_iBdDir = t_dir
    me.Refresh(m_iHeadDir, m_iBdDir)
    me.ActLeftHand(0)
    me.ActRightHand(0)
    me.ActLeftFoot(0)
    me.ActRightFoot(0)
    m_bChanges = 1
    t_Img = me.render()
    if not voidp(t_Img) then
      m_ar_StormImgList.add(t_Img)
    end if
  end repeat
  m_iTileSize = t_iTileSize
  me.Action(m_mp_AvatarData)
  if objectp(m_Obj_Magic) then
    m_Obj_Magic.SetStormFximages(m_ar_StormImgList)
  end if
end
on reDraw me
  m_rAlpha = image(m_iCanvasWidth, m_iCanvasHeight, 8, #grayscale)
  m_imgBuffer = image(m_iCanvasWidth, m_iCanvasHeight, 32)
  m_imgBuffer.fill(m_imgBuffer.rect, rgb(0, 0, 0))
  me.arrangeParts()
  call(#render, m_mpSortedParts)
end
on flipImage me, a_img
  t_Img = image(m_iCanvasWidth, m_iCanvasHeight, 32)
  t_Img.setAlpha(image(m_iCanvasWidth, m_iCanvasHeight, 8))
  t_Img.useAlpha = 1
  tQuad = [point(a_img.width, 0), point(0, 0), point(0, a_img.height), point(a_img.width, a_img.height)]
  t_Img.copyPixels(a_img, tQuad, a_img.rect, #useFastQuads = 1)
  return t_Img
end
on arrangeParts me
  m_mpPartIndex = VOID
  case 1 of
    m_bActDnc = 1:
      if m_iBdDir = 3 and m_bActWav = 1 then
        m_mpPartIndex = ["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "lh", "li", "ls", "ch", "ch2", "hd", "ey", "hr", "fc", "ht", "rh", "ri", "rs"]
      else
        if m_iBdDir = 0 or m_iBdDir = 1 or m_iBdDir = 2 or m_iBdDir = 6 or m_iBdDir = 7 then
          m_mpPartIndex = ["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "lh", "li", "ls", "ch", "ch2", "rh", "ri", "rs", "hd", "fc", "ey", "hr", "ht"]
        end if
        if m_iBdDir = 3 or m_iBdDir = 4 or m_iBdDir = 5 then
          m_mpPartIndex = ["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "lh", "li", "ls", "ch", "ch2", "rh", "ri", "rs", "hd", "fc", "ey", "hr", "ht"]
        end if
      end if
    m_bActWav = 1:
      if m_iBdDir = 0 or m_iBdDir = 1 or m_iBdDir = 7 then
        m_mpPartIndex = ["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "ch", "lh", "li", "ls", "ri", "rh", "rs", "ch2", "hd", "fc", "ey", "hr", "ht"]
      end if
      if m_iBdDir = 2 or m_iBdDir = 6 then
        m_mpPartIndex = ["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "lh", "li", "ls", "ch", "ch2", "hd", "fc", "ey", "hr", "ht", "ri", "rh", "rs"]
      end if
      if m_iBdDir = 4 then
        m_mpPartIndex = ["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "ch", "ch2", "hd", "fc", "ey", "hr", "ht", "ri", "rh", "rs", "lh", "li", "ls"]
      end if
      if m_iBdDir = 3 or m_iBdDir = 5 then
        if m_bActSit = 1 then
          m_mpPartIndex = ["tr", "lh", "li", "llg", "lpn", "lsh", "rlg", "ch", "ls", "rpn", "ch2", "rsh", "hd", "fc", "ey", "hr", "ht", "rh", "ri", "rs"]
        else
          m_mpPartIndex = ["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "lh", "li", "ls", "ch", "ch2", "hd", "ey", "hr", "fc", "ht", "rh", "ri", "rs"]
        end if
      end if
    m_bActEat = 1, m_bActCrr = 1:
      if m_iBdDir = 0 then
        m_mpPartIndex = ["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "lh", "li", "ch", "ls", "ch2", "rh          ", "ri", "rs", "hd", "fc", "ey", "hr", "ht"]
      end if
      if m_iBdDir = 5 or m_iBdDir = 4 then
        m_mpPartIndex = ["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "lh", "ch", "ch2", "li", "ls", "rh", "ri", "rs", "hd", "fc", "ey", "hr", "ht"]
      end if
      if m_iBdDir = 1 or m_iBdDir = 2 or m_iBdDir = 3 or m_iBdDir = 6 or m_iBdDir = 7 then
        m_mpPartIndex = ["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "lh", "li", "ls", "ch", "ch2", "rh", "ri", "rs", "hd", "fc", "ey", "hr", "ht"]
      end if
    m_bActMv = 0 and m_bActSit = 0:
      if m_iBdDir = 0 or m_iBdDir = 3 or m_iBdDir = 4 or m_iBdDir = 5 then
        m_mpPartIndex = ["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "lh", "li", "ls", "ch", "ch2", "rh", "ri", "rs", "hd", "fc", "ey", "hr", "ht"]
      end if
      if m_iBdDir = 1 or m_iBdDir = 2 or m_iBdDir = 6 or m_iBdDir = 7 then
        m_mpPartIndex = ["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "lh", "li", "ls", "ch", "ch2", "rh", "ri", "rs", "hd", "fc", "ey", "hr", "ht"]
      end if
    m_bActSit = 1:
      if m_iBdDir = 1 then
        m_mpPartIndex = ["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "lh", "li", "ls", "ch", "ch2", "rh", "ri", "rs", "hd", "fc", "ey", "hr", "ht"]
      end if
      if m_iBdDir = 3 or m_iBdDir = 5 then
        m_mpPartIndex = ["tr", "lh", "li", "llg", "lpn", "lsh", "rlg", "ch", "ls", "rpn", "ch2", "rsh", "rh", "ri", "rs", "hd", "fc", "ey", "hr", "ht"]
      end if
    m_bActMv = 1:
      if m_iBdDir = 1 or m_iBdDir = 2 or m_iBdDir = 6 or m_iBdDir = 7 then
        m_mpPartIndex = ["tr", "llg", "lsh", "lh", "li", "ls", "lpn", "rlg", "rsh", "rpn", "ch", "ch2", "rh", "ri", "rs", "hd", "fc", "ey", "hr", "ht"]
      end if
      if m_iBdDir = 0 and (m_iAnimCounter + 1 = 2 or m_iAnimCounter + 1 = 3) then
        m_mpPartIndex = ["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "rh", "ri", "rs", "ch", "lh", "li", "ls", "ch2", "hd", "fc", "ey", "hr", "ht"]
      end if
      if m_iBdDir = 0 and (m_iAnimCounter = 3 or m_iAnimCounter = 0) then
        m_mpPartIndex = ["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "rh", "ri", "rs", "lh", "li", "ls", "ch", "ch2", "hd", "fc", "ey", "hr", "ht"]
      end if
      if m_iBdDir = 0 and (m_iAnimCounter = 1 or m_iAnimCounter = 2) then
        m_mpPartIndex = ["tr", "lh", "li", "ls", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "ch", "rh", "ri", "rs", "ch2", "hd", " fc", "ey", "hr", "ht"]
      end if
      if m_iBdDir = 4 and m_iAnimCounter = 0 then
        m_mpPartIndex = ["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "lh", "li", "ls", "ch", "ch2", "rh", "ri", "rs", "hd", "fc", "ey", "hr", "ht"]
      end if
      if m_iBdDir = 4 and (m_iAnimCounter = 1 or m_iAnimCounter = 2 or m_iAnimCounter = 3) then
        m_mpPartIndex = ["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "ch", "lh", "li", "ls", "ch2", "rh", "ri", "rs", "hd", "fc", "ey", "hr", "ht"]
      end if
      if m_iBdDir = 3 or m_iBdDir = 5 then
        m_mpPartIndex = ["tr", "lh", "ls", "li", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "ch", "ch2", "rh", "rs", "ri", "hd", "fc", "ey", "hr", "ht"]
      end if

  end case
  if voidp(m_mpPartIndex) then
    if m_iBdDir = 0 or m_iBdDir = 3 or m_iBdDir = 4 or m_iBdDir = 5 then
      m_mpPartIndex = ["tr", "llg", "lsh", "lpn", "rlg", "rlg", "rsh", "rpn", "lh", "li", "ls", "ch", "ch2", "rh", "ri", "rs", "hd", "fc", "ey", "hr", "ht"]
    end if
    if m_iBdDir = 1 or m_iBdDir = 2 or m_iBdDir = 6 or m_iBdDir = 7 then
      m_mpPartIndex = ["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "lh", "li", "ls", "ch", "ch2", "rh", "ri", "rs", "hd", "fc", "ey", "hr", "ht"]
    end if
  end if
  m_mpSortedParts = [:]
  repeat with i = 1 to m_mpPartIndex.count
    t_sPart = m_mpPartIndex[i]
    if m_arPartList.findPos(t_sPart) > 0 then
      m_mpSortedParts.addProp(t_sPart, m_arPartList[t_sPart])
    end if
  end repeat
end