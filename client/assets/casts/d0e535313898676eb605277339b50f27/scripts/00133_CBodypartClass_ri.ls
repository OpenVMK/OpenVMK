-- Script
property ancestor
property m_sPart
property m_iModel
property m_iBodyDir
property m_mpDrawProps
property m_sAction
property m_sActionLh
property m_sActionRh
property m_sMem
property m_iXFix
property m_iYFix
property m_imgCache
property m_imgCacheAlpha
property m_rCacheRectA
property m_rCacheRectB
property m_rImageCache
property m_bAnimation
property m_iAnimFrame
property m_iTotalFrame
property m_MyAlpha
property m_iYcorrection
property m_iXcorrection
property m_Color
property m_sSetID
property m_arFlipList
property m_sSetAnimFrame

on deconsturct me
  ancestor = VOID
  return 1
end
on Define me, tPart, tmodel, tColor, tDirection, tAction, tAncestor
  ancestor = tAncestor
  m_sPart = tPart
  m_iModel = tmodel
  m_mpDrawProps = [#maskImage: 0, #ink: 0, #bgColor: 0]
  m_imgCache = 0
  m_rCacheRectA = rect(0, 0, 0, 0)
  m_rCacheRectB = rect(0, 0, 0, 0)
  m_iBodyDir = tDirection
  m_sAction = tAction
  m_sActionLh = tAction
  m_sActionRh = tAction
  m_sMem = EMPTY
  m_iXFix = 0
  m_iYFix = 0
  m_bAnimation = 0
  m_iAnimFrame = 1
  m_iTotalFrame = 1
  m_iXcorrection = 0
  m_iYcorrection = 0
  m_rImageCache = getThread(#AvatarFactory).component.GetClothAssetManager().GetImageCache()
  m_mpDrawProps[#ink] = 8
  me.setColor(tColor)
  m_Color = tColor
  m_sSetID = VOID
  m_sSetAnimFrame = VOID
  m_arFlipList = [0, 1, 2, 3, 4, 3, 2, 1]
  return 1
end
on SetAncestor me, a_obj
  ancestor = a_obj
end
on update me
  if not objectp(ancestor) then
    exit
  end if
  tAnimCntr = 0
  tAction = m_sAction
  tPart = m_sPart
  m_iXFix = 0
  m_iYFix = 0
  t_sActLeftHand = me.m_sStatusLeftHand
  t_sActRightHand = me.m_sStatusRightHand
  t_sStatusLegs = me.m_sStatusLegs
  m_iBodyDir = me.m_iBdDir
  tdir = m_arFlipList[m_iBodyDir + 1]
  if m_iBodyDir = tdir then
    t_bFlipped = 0
  else
    t_bFlipped = 1
  end if
  if tAction = "drk" then
    tAnimCntr = me.m_iAnimCounter mod 2
  end if
  t_sAction = VOID
  m_iModel = me.m_iItemRightHand
  if not t_bFlipped then
    if t_sActLeftHand = "drk" then
      tAnimCntr = me.m_iAnimCounter mod 2
      tMemString = "drk_rfood_" & m_iModel & "_" & tdir & "_" & tAnimCntr
    else
      if t_sActLeftHand = "crr" then
        tAnimCntr = 0
        tAction = "drk"
      end if
      tMemString = "drk_lfood_" & m_iModel & "_" & tdir & "_" & tAnimCntr
    end if
  else
    if t_sActRightHand = "drk" then
      tAnimCntr = me.m_iAnimCounter mod 2
      tMemString = "drk_lfood_" & m_iModel & "_" & tdir & "_" & tAnimCntr
    else
      if t_sActRightHand = "crr" then
        tAnimCntr = 0
        tAction = "drk"
      end if
      tMemString = "drk_lfood_" & m_iModel & "_" & tdir & "_" & tAnimCntr
    end if
  end if
  if tAction = "wlk" then
    tAnimCntr = me.m_iAnimCounter
  end if
  if me.m_iWeapon > 0 then
    tMemString = tAction & "_weapon_" & m_iModel & "_" & tdir & "_" & tAnimCntr
  end if
  if me.m_bAnimating then
    if me.m_iAnimCounter mod 2 = 1 then
      tMemString = me.animate()
    end if
  end if
  if VOID <> m_sSetAnimFrame then
    tMemString = m_sSetAnimFrame
  end if
  if m_sMem <> tMemString then
    t_mp_rCacheData = m_rImageCache[tMemString]
    if not voidp(t_mp_rCacheData) then
      tRegPnt = t_mp_rCacheData.point
      tX = -tRegPnt[1] + 40
      tY = me.m_imgBuffer.rect.height - tRegPnt[2] - 20
      me.pUpdateRect = union(me.pUpdateRect, m_rCacheRectA)
      m_imgCache = t_mp_rCacheData.image
      m_rCacheRectA = rect(tX, tY, tX + m_imgCache.width, tY + m_imgCache.height) + [m_iXFix, m_iYFix, m_iXFix, m_iYFix] + rect(me.m_iLocFix, me.m_iLocFix)
      m_rCacheRectB = m_imgCache.rect
      me.pUpdateRect = union(me.pUpdateRect, m_rCacheRectA)
      me.m_imgBuffer.copyPixels(m_imgCache, m_rCacheRectA, m_rCacheRectB, m_mpDrawProps)
      t_ImgAlpha = t_mp_rCacheData.alpha
      if not voidp(t_ImgAlpha) then
        me.m_rAlpha.copyPixels(t_ImgAlpha, m_rCacheRectA, m_rCacheRectB, [#ink: 39])
      end if
      if VOID <> m_sSetAnimFrame then
        m_sSetAnimFrame = VOID
      end if
    end if
  end if
end
on render me
  t_mp_rCacheData = m_rImageCache[m_sMem]
  if not voidp(t_mp_rCacheData) then
    me.m_imgBuffer.copyPixels(m_rCacheRectB, m_rCacheRectA, m_rCacheRectB, m_mpDrawProps)
  end if
end
on SetSetID me, a_sID
  m_sSetID = a_sID
end
on copyPicture me, tImg, tdir, tAction, tAnimFrame
  if voidp(tdir) then
    tdir = "2"
  end if
  if voidp(tAction) then
    tAction = "std"
  end if
  if voidp(tAnimFrame) then
    tAnimFrame = "0"
  end if
  t_sMemName = tAction & "_" & m_sPart & "_" & m_iModel & "_" & tdir & "_" & tAnimFrame
  t_mp_rCacheData = m_rImageCache[t_sMemName]
  if not voidp(t_mp_rCacheData) then
    tImage = t_mp_rCacheData.image
    tRegPnt = t_mp_rCacheData.point
    tX = -tRegPnt[1] + 25
    tY = tImg.rect.height - tRegPnt[2] - 15
    tRect = rect(tX, tY, tX + tImage.width, tY + tImage.height)
    tImg.copyPixels(tImage, tRect, tImage.rect, m_mpDrawProps)
    return 1
  end if
  return 0
end
on copyAlpha me, tImg, tdir, tAction, tAnimFrame
  if voidp(tdir) then
    tdir = "2"
  end if
  if voidp(tAction) then
    tAction = "std"
  end if
  if voidp(tAnimFrame) then
    tAnimFrame = "0"
  end if
  t_sMemName = tAction & "_" & m_sPart & "_" & m_iModel & "_" & tdir & "_" & tAnimFrame
  t_mp_rCacheData = m_rImageCache[t_sMemName]
  if not voidp(t_mp_rCacheData) then
    tImage = t_mp_rCacheData.alpha
    tRegPnt = t_mp_rCacheData.point
    tX = -tRegPnt[1] + 25
    tY = tImg.rect.height - tRegPnt[2] - 15
    tRect = rect(tX, tY, tX + tImage.width, tY + tImage.height)
    tImg.copyPixels(tImage, tRect, tImage.rect, [#ink: 39])
    return 1
  end if
  return 0
end
on defineAnimFrame me, a_mp_AnimData, tTargetPartList
  if tTargetPartList.getOne(m_sPart) then
    if a_mp_AnimData.findPos(#Dir) > 0 then
      tdir = a_mp_AnimData.Dir
    else
      tdir = m_arFlipList[m_iBodyDir + 1]
    end if
    if a_mp_AnimData.findPos(#whole) > 0 then
      tMemString = a_mp_AnimData.whole
    else
      tMemString = a_mp_AnimData.act & m_sPart & "_" & m_iModel & "_" & tdir & "_" & a_mp_AnimData.frame
    end if
    m_sSetAnimFrame = tMemString
  end if
end
on setItemObj me, tmodel
  if m_sPart = "ri" or m_sPart = "li" then
    m_iModel = tmodel
  end if
end
on defineDir me, tdir, tPart
  if voidp(tPart) or tPart = m_sPart then
    m_iBodyDir = tdir
  end if
end
on defineDirMultiple me, tdir, tTargetPartList
  if tTargetPartList.getOne(m_sPart) then
    m_iBodyDir = tdir
  end if
end
on defineAct me, tAct, tTargetPartList
  if m_sAction = "std" then
    m_sAction = tAct
  end if
end
on defineActMultiple me, tAct, tTargetPartList
  if tTargetPartList.getOne(m_sPart) then
    if m_sAction = "std" then
      m_sAction = tAct
    end if
    if m_sPart = "ey" and tAct = "std" then
      m_sAction = "std"
    end if
  end if
end
on defineInk me, tInk
end
on setModel me, tmodel
  m_iModel = tmodel
end
on setColor me, tColor
  if voidp(tColor) then
    return 0
  end if
  if tColor = EMPTY then
    return 0
  end if
  if tColor.ilk = #color then
    m_mpDrawProps[#bgColor] = tColor
  else
    m_mpDrawProps[#bgColor] = rgb(255, 255, 255)
  end if
  if m_sPart = "ch2" then
    m_mpDrawProps[#bgColor] = rgb(255, 255, 255)
  end if
  if m_sPart = "lsh" and tColor = 0 then
    m_mpDrawProps[#bgColor] = rgb(255, 255, 255)
  end if
  if m_sPart = "rsh" and tColor = 0 then
    m_mpDrawProps[#bgColor] = rgb(255, 255, 255)
  end if
  if m_sPart = "ey" and tColor = 0 then
    m_mpDrawProps[#bgColor] = rgb(255, 255, 255)
  end if
  return 1
end
on doHandWork me, tAct
  if (["lh", "ls", "li", "rh", "rs", "ri"]).getOne(m_sPart) <> 0 then
    m_sAction = tAct
  end if
end
on doHandWorkLeft me, tAct
  m_sActionLh = tAct
end
on doHandWorkRight me, tAct
  m_sActionRh = tAct
end
on reset me
  m_sAction = "std"
  m_sActionLh = VOID
  m_sActionRh = VOID
end
on GetPartColor me
  return m_Color
end
on setAnimation me, tPart, tAnim
  if tPart <> m_sPart then
    exit
  end if
  m_bAnimation = value(tAnim)
  m_iTotalFrame = m_bAnimation[1].count
  m_iAnimFrame = 1
end
on remAnimation me
  m_bAnimation = 0
  m_iAnimFrame = 1
  m_iTotalFrame = 1
end
on animate me
  if not m_bAnimation then
    return EMPTY
  end if
  tdir = m_arFlipList[m_iBodyDir + 1] + m_bAnimation[#offD][m_iAnimFrame]
  if tdir > 7 then
    tdir = tdir - tdir mod 7
  else
    if tdir < 0 then
      tdir = 7 + tdir + 1
    end if
  end if
  me.m_iAnimatedFrame = m_iAnimFrame
  tdir = m_arFlipList[tdir + 1]
  m_iXFix = m_bAnimation[#offX][m_iAnimFrame]
  m_iYFix = m_bAnimation[#offY][m_iAnimFrame]
  tMemName = m_bAnimation[#act][m_iAnimFrame] & "_" & m_sPart & "_" & m_iModel & "_" & tdir & "_" & m_bAnimation[#frm][m_iAnimFrame]
  m_iAnimFrame = m_iAnimFrame + 1
  if m_iAnimFrame > m_iTotalFrame then
    m_iAnimFrame = 1
  end if
  return tMemName
end