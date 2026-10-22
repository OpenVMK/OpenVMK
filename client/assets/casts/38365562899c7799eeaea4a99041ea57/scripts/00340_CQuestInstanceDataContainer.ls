-- Script
property m_ar_data
property m_rInterface

on construct me
  m_rInterface = createObject(getUniqueID(), "CQuestWindowManager")
  m_rInterface.SetOwner(me)
  m_ar_data = [:]
  return 1
end
on deconstruct me
  if objectp(m_rInterface) then
    removeObject(m_rInterface.getID())
  end if
  return 1
end
on getInterface me
  return m_rInterface
end
on getData me
  return m_ar_data
end
on ChangePageEvent me, t_iManagerID, t_sPageName
  put "Quest Instance Change Page Event Received" && t_iManagerID && t_sPageName
  t_rCurrentPage = m_rInterface.getInterface().GetBase().getPage()
  case t_sPageName of
    "info.staff.order", "info.staff.timerace", "info.player.order", "info.player.timerace", "join.staff.order", "join.staff.timerace", "join.player.order", "join.player.timerace":
      if objectp(t_rCurrentPage) then
        repeat with i = 1 to m_ar_data[#remaining_prize_array].count
          t_ar_prizeData = m_ar_data[#remaining_prize_array][i]
          t_rCurrentPage.updatePrizeRank(t_ar_prizeData, i, m_ar_data[#taken_prize_count])
        end repeat
        t_rCurrentPage.QuestInstanceData(m_ar_data)
      end if
    otherwise:
      put "Unknown page..."

  end case
end
on QuestDialogBroadcastEvent me, t_iManagerID, t_ar_results
  put "QuestInstance.DataContainer->BroadCastEvent results:" && t_ar_results
end
on QuestInstanceData me, t_ar_data
  put "QuestInstanceData " && t_ar_data
  if listp(t_ar_data) then
    m_ar_data = t_ar_data
    case t_ar_data[#official] of
      1:
        t_sOwnerType = "staff"
      0:
        t_sOwnerType = "player"
      otherwise:
        t_sOwnerType = "staff"

    end case
    case t_ar_data[#prizingMode] of
      0:
        t_sQuestType = "order"
      1:
        t_sQuestType = "timerace"
      2:
        t_sQuestType = "order"
      otherwise:
        t_sQuestType = "order"

    end case
    if t_ar_data[#officialQuestCount] = 0 then
      t_sWindowType = "info"
      if t_sOwnerType = "player" and t_ar_data[#owner] = 0 and t_ar_data[#expired] = 0 then
        case t_ar_data[#avatarOnQuest] of
          0:
            t_sWindowType = "join"
          1:
            t_sWindowType = "info"
          otherwise:
            t_sWindowType = "join"

        end case
      end if
    else
      t_sWindowType = "join"
    end if
    t_sWindowName = t_sWindowType & "." & t_sOwnerType & "." & t_sQuestType
    m_rInterface.populate([t_sWindowName])
    m_rInterface.Activate()
  end if
end
on MoveItemIndex me, t_iRank, t_iDirection, t_iMaxItems
  if voidp(t_iMaxItems) then
    t_iMaxItems = 3
  end if
  t_iPrizeRank = t_iRank + 1
  if t_iPrizeRank > m_ar_data[#remaining_prize_array].count then
    put "Prize rank is out of boundaries" && t_iPrizeRank
    return 0
  end if
  t_iItemCount = m_ar_data[#remaining_prize_array][t_iPrizeRank][#item_array].count
  if t_iItemCount < t_iMaxItems then
    m_ar_data[#remaining_prize_array][t_iPrizeRank][#item_index] = 1
    return 0
  end if
  t_iOldIndex = m_ar_data[#remaining_prize_array][t_iPrizeRank][#item_index]
  t_iNewIndex = t_iOldIndex + t_iDirection
  if t_iNewIndex < 1 then
    return 0
  end if
  if t_iNewIndex > t_iItemCount - (t_iMaxItems - 1) then
    return 0
  end if
  m_ar_data[#remaining_prize_array][t_iPrizeRank][#item_index] = t_iNewIndex
  t_rCurrentPage = m_rInterface.getInterface().GetBase().getPage()
  t_rCurrentPage.updatePrizeRank(m_ar_data[#remaining_prize_array][t_iPrizeRank], t_iPrizeRank)
end