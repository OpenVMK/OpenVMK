-- Script
property m_bVisible
property m_bReady
property m_ar_hiddenStates

on construct me
  m_ar_hiddenStates = [0]
  m_bVisible = 1
  m_bReady = 0
  return 1
end
on deconstruct me
  return callAncestor(#deconstruct, me)
end
on setState me, a_iState
  t_rItem = me.getObject()
  t_bVisible = 1
  if m_ar_hiddenStates.getOne(a_iState) > 0 then
    t_bVisible = 0
  end if
  put "Hideable item" && [a_iState, "hidden:" && t_bVisible]
  if t_bVisible = not m_bVisible then
    m_bVisible = t_bVisible
    me.SetVisibility()
  end if
end
on update me
  if not m_bReady then
    me.Init()
  end if
  return callAncestor(#update, me)
end
on Init me
  if me.loadedCheck() then
    m_bReady = 1
    me.SetVisibility()
  end if
end
on SetVisibility me
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
on loadedCheck me
  t_ar_rBlocks = me.getObject().GetFactor().GetBlocks()
  if t_ar_rBlocks.count = 0 then
    return 0
  end if
  repeat with t_rBlock in t_ar_rBlocks
    if not t_rBlock.GetVisual().IsReady() then
      return 0
    end if
  end repeat
  return getObject("RoomItemAssetManager").IsItemReady(integer(me.getObject().GetParam("TYPE")))
end