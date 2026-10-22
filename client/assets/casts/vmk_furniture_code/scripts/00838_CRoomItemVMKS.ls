-- Script
property m_bVisible
property m_bAnimation
property m_sAnimName
property m_bReady

on construct me
  m_bVisible = 1
  m_bAnimation = 0
  m_sAnimName = getUniqueID()
  m_bReady = 0
  return 1
end
on deconstruct me
  if m_bAnimation then
    getObject("AnimationManager").RemoveAnimation(m_sAnimName)
  end if
  return callAncestor(#deconstruct, me)
end
on update me
  if not m_bReady then
    me.Init()
  end if
  return callAncestor(#update, me)
end
on Init me
  if me.checkVMKSReady() then
    m_bReady = 1
    me.showVMKS()
  end if
end
on checkVMKSReady this
  t_ar_rBlocks = this.getObject().GetFactor().GetBlocks()
  if t_ar_rBlocks.count = 0 then
    return 0
  end if
  repeat with t_rBlock in t_ar_rBlocks
    if not t_rBlock.GetVisual().IsReady() then
      return 0
    end if
  end repeat
  return getObject("RoomItemAssetManager").IsItemReady(integer(this.getObject().GetParam("TYPE")))
end
on setState me, a_iState
  t_rItem = me.getObject()
  case a_iState of
    -2:
      put "hide"
      t_bVisible = 0
      t_bAnimation = 0
    0:
      put "normal"
      t_bVisible = 1
      t_bAnimation = 0
    otherwise:
      t_bVisible = 0
      t_bAnimation = 1
      if m_bAnimation then
        getObject("AnimationManager").RemoveAnimation(m_sAnimName)
        m_bAnimation = 0
      end if

  end case
  if t_bVisible = not m_bVisible then
    m_bVisible = t_bVisible
    me.showVMKS()
  end if
  if not t_bAnimation and m_bAnimation then
    t_rAnimationManager = getObject("AnimationManager")
    t_rAnimationManager.RemoveAnimation(m_sAnimName)
  end if
  if t_bAnimation and not m_bAnimation then
    m_bAnimation = 1
    t_rAnimationManager = getObject("AnimationManager")
    tWorldPos = t_rItem.GetAbsPos()
    if a_iState > 0 then
      t_sEnemyAnimation = "enemy_" & a_iState & ".ani"
      t_rAnimationManager.NewAnimation(tWorldPos, m_sAnimName, t_sEnemyAnimation)
    end if
    t_iCurrentTileSize = me.getObject().GetContext().GetParam("TILESIZE") * 1.0
    getObject("AnimationManager").getAnimation(m_sAnimName).GetVisual().setScale(t_iCurrentTileSize / 32.0)
  end if
end
on showVMKS me
  t_rItem = me.getObject()
  t_ar_rBlocks = t_rItem.GetFactor().GetBlocks()
  repeat with i = 1 to t_ar_rBlocks.count
    t_rBlock = t_ar_rBlocks[i]
    t_ar_rSprites = t_rBlock.GetVisual().GetSprites()
    repeat with t_rSpr in t_ar_rSprites
      t_rSpr.visible = m_bVisible
    end repeat
  end repeat
end