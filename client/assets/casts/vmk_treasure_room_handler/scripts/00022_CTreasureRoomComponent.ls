-- Movie Script
property m_bReady

on construct me
  m_bReady = 1
  return 1
end
on deconstruct me
  return 1
end
on TreasureChestClosed me, a_iAnimRef
  if m_bReady then
    case a_iAnimRef of
      1:
        executeMessage(#changeAnimationState, "vmk_anim_5", #goto, "left_chest_idle")
      2:
        executeMessage(#changeAnimationState, "vmk_anim_6", #goto, "mid_chest_idle")
      0:
        executeMessage(#changeAnimationState, "vmk_anim_7", #goto, "right_chest_idle")
      otherwise:
        put "TODO close all treasure chests" && a_iAnimRef

    end case
  end if
end
on TreasureChestOpenWithTreasure me, a_iAnimRef
  executeMessage("PlayFxSound", "VMK-treasurechest-1")
  if m_bReady then
    case a_iAnimRef of
      1:
        executeMessage(#changeAnimationState, "vmk_anim_5", #goto, "left_chest_treasure")
      2:
        executeMessage(#changeAnimationState, "vmk_anim_6", #goto, "mid_chest_treasure")
      0:
        executeMessage(#changeAnimationState, "vmk_anim_7", #goto, "right_chest_treasure")
      otherwise:
        error(me, "Unknown animation ref", #TreasureChestOpenWithTreasure)

    end case
  end if
end
on TreasureChestOpenEmpty me, a_iAnimRef
  executeMessage("PlayFxSound", "VMK-treasurechest-1")
  if m_bReady then
    case a_iAnimRef of
      1:
        executeMessage(#changeAnimationState, "vmk_anim_5", #goto, "left_chest_empty")
      2:
        executeMessage(#changeAnimationState, "vmk_anim_6", #goto, "mid_chest_empty")
      0:
        executeMessage(#changeAnimationState, "vmk_anim_7", #goto, "right_chest_empty")
      otherwise:
        error(me, "Unknown animation ref", #TreasureChestOpenEmpty)

    end case
  end if
end