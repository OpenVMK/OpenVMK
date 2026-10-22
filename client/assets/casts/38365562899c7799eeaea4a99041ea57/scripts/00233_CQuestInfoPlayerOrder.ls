-- Script
property m_rWindow
property m_ar_components
property m_ar_data
property m_rHiliterCol
property m_rBorderCol

on construct me
  m_rHiliterCol = rgb(255, 204, 0)
  m_rBorderCol = rgb(80, 160, 216)
  m_ar_data = []
  m_ar_components = [:]
  m_ar_components.sort()
  m_rWindow = VOID
  return 1
end
on deconstruct me
  if objectp(m_rWindow) then
    me.Purge(m_rWindow)
  end if
  repeat with t_rComponent in m_ar_components
    removeObject(t_rComponent.getID())
  end repeat
  return 1
end
on merge me, a_rWindow
  m_rWindow = a_rWindow
  t_bSuccess = m_rWindow.merge("vmk_quest_info_player_order.window")
  me.changeImageInElement(m_rWindow, "quest.main.label", member("quest.label.info"))
  me.createComponentWindow(m_rWindow, m_ar_components, ["quest.ratingstars": [], "quest.prizes": [], "quest.halloffame": []])
  return t_bSuccess
end
on Purge me, a_rWindow
  if objectp(m_rWindow) then
    m_rWindow = VOID
    return a_rWindow.unmerge()
  else
    return 1
  end if
end
on update me, a_mp_kType_mp_iRef_rItem, a_kAlteredCategory
  if objectp(m_rWindow) then
    if a_kAlteredCategory = #step1 then
    end if
  end if
end
on _EventProc me, a_kEvent, a_sElemID, a_vParam
  tWndObj = m_rWindow
  t_rManager = me.getManager()
  if objectp(t_rManager) then
    t_rOwner = t_rManager.GetOwner()
  end if
  if a_kEvent = #mouseUp then
    case a_sElemID of
      "quest.prizes":
        t_ar_event = [#found: 0, #event: EMPTY, #client: VOID, #route: [:]]
        t_rComponentPage = m_ar_components[a_sElemID]
        t_rComponentPage.EventProc(a_vParam, t_ar_event)
        if t_ar_event.found then
          t_rClientElement = tWndObj.getElement(a_sElemID)
          case t_ar_event.event of
            "quest.prizes.less":
              t_iRank = t_rComponentPage.getComponentID(t_ar_event.route.component) - 1
              t_rOwner = me.getManager().GetOwner()
              if objectp(t_rOwner) then
                t_rOwner.MoveItemIndex(t_iRank, -1, 2)
              end if
              executeMessage("PlayInterfaceSound", "UI-click")
            "quest.prizes.more":
              t_iRank = t_rComponentPage.getComponentID(t_ar_event.route.component) - 1
              t_rOwner = me.getManager().GetOwner()
              if objectp(t_rOwner) then
                t_rOwner.MoveItemIndex(t_iRank, 1, 2)
              end if
              executeMessage("PlayInterfaceSound", "UI-click")

          end case
        end if
      "quest.tasklist":
        executeMessage("PlayInterfaceSound", "UI-click")
        t_ar_event = [#found: 0, #event: EMPTY, #client: VOID, #route: [:]]
        t_rComponent = m_ar_components[a_sElemID]
        t_rComponent.EventProc(a_vParam, t_ar_event)
        if t_ar_event.found then
          t_rClientElement = m_rWindow.getElement(a_sElemID)
          t_rImg = t_rComponent.render()
          t_rClientElement.feedImage(t_rImg)
        end if
      "quest.stop.button":
        if not m_ar_data[#owner] then
          getThread(#QuestEngine).getHandler().QuitQuest()
          if objectp(t_rOwner) then
            removeObject(t_rOwner.getID())
          end if
        else
          if objectp(t_rOwner) then
            t_ar_data = t_rOwner.getData()
            t_ID = t_ar_data[#questTemplateId]
            getThread(#QuestEngine).getHandler().TerminateQuest([t_ID])
            removeObject(t_rOwner.getID())
          end if
        end if
      "quest.starttoplay.button":
        if objectp(t_rManager) then
          t_ar_data = t_rManager.GetOwner().getData()
          if listp(t_ar_data) then
            t_ID = t_ar_data[#questTemplateId]
            getThread(#QuestEngine).getHandler().StartQuest([t_ID])
            removeObject(t_rOwner.getID())
          end if
        end if
      "quest.authorrating", "quest.authorrating.hd", "quest.top100authors.button":
        getThread(#QuestEngine).getHandler().GetQuestAuthorHallOfFame([1, 100])
      "close", "mes.accept.button":
        if objectp(t_rOwner) then
          removeObject(t_rOwner.getID())
        end if
      "help":
        executeMessage("PlayInterfaceSound", "UI-click")
        executeMessage(#open_help_page, getText("help.quest.info", getText("help.quest", "help.quest")))
      otherwise:
        put "InfoQuestStaffOrder:" && a_sElemID

    end case
  end if
end
on QuestInstanceData me, t_ar_data
  m_ar_data = t_ar_data
  put "Fill blanks (Info Player Order)"
  t_sIndex = EMPTY
  if t_ar_data[#officialQuestCount] = 0 then
    me.showHideElem(m_rWindow, "quest.next", 0)
    me.showHideElem(m_rWindow, "quest.previous", 0)
  else
    t_sIndex = t_ar_data[#officialQuestIndex] + 1 & "/" & t_ar_data[#officialQuestCount]
  end if
  me.setField(m_rWindow, "quest.author", t_ar_data[#questOwnerName])
  me.setField(m_rWindow, "quest.main.hd", t_ar_data[#questName] && t_sIndex)
  me.setField(m_rWindow, "quest.info", t_ar_data[#description])
  if t_ar_data[#remainingQuestDurationInSecs] >= 0 then
    me.setField(m_rWindow, "quest.timetotal", seconds2time(t_ar_data[#remainingQuestDurationInSecs]))
  else
    me.setField(m_rWindow, "quest.timetotal", getText("quest.task.notimelimit", "No timelimit"))
  end if
  me.setField(m_rWindow, "quest.authorrating", t_ar_data[#authorRating] && getText("quest.points"))
  t_rStarsComponentPage = m_ar_components["quest.ratingstars"]
  if objectp(t_rStarsComponentPage) then
    t_rComponent = t_rStarsComponentPage.addComponent("component.quest.ratingstars.xml", 0)
    repeat with i = 1 to 5
      t_rComponent.GetLayout(i).setIcon("icon.star")
    end repeat
    t_rStars = t_rStarsComponentPage.render().duplicate()
    repeat with i = 1 to 5
      t_rComponent.GetLayout(i).setIcon(EMPTY)
    end repeat
    repeat with i = 1 to t_ar_data[#rating]
      t_rComponent.GetLayout(i).setIcon("icon.star")
    end repeat
    t_rStars.copyPixels(t_rStarsComponentPage.render(), t_rStars.rect, t_rStars.rect, [#blend: 90])
    m_rWindow.getElement("quest.ratingstars").feedImage(t_rStars)
  end if
  repeat with t_ar_player in t_ar_data[#player_array]
    me.add_player(t_ar_player)
  end repeat
  m_rWindow.getElement("quest.halloffame").feedImage(m_ar_components["quest.halloffame"].render())
  if t_ar_data[#expired] then
    me.setButtonState(m_rWindow, "quest.starttoplay.button", 0)
    me.setButtonState(m_rWindow, "quest.stop.button", 0)
  end if
  if not t_ar_data[#owner] then
    me.setButtonState(m_rWindow, "quest.stop.button", 0)
  end if
  if t_ar_data[#avatarOnQuest] then
    me.setButtonState(m_rWindow, "quest.stop.button", 1)
    me.setButtonTxt(m_rWindow, "quest.stop.button", getText("quest.quit"))
  end if
end
on add_player me, t_ar_playerdata
  t_rComponent = m_ar_components["quest.halloffame"].addComponent("component.quest.join.halloffame.xml")
  t_sText = t_ar_playerdata[#player_name] && "(" & seconds2time(t_ar_playerdata[#completionTimeIsSecs]) & ")"
  t_rComponent.GetLayout(1).setText(t_sText)
end
on updatePrizeRank me, t_ar_data, t_iRank, a_iTaken_prize_count
  t_iMaxItemsPerRow = 2
  t_sElemName = "quest.prizes"
  t_rComponentPage = m_ar_components[t_sElemName]
  t_rClientElement = m_rWindow.getElement("quest.prizes")
  t_rComponent = t_rComponentPage.getComponentAt(t_iRank, 0)
  if not objectp(t_rComponent) then
    t_rComponent = t_rComponentPage.addComponent("component.quest.join.prizes.xml", 0)
  end if
  i = t_iRank + a_iTaken_prize_count
  t_rComponent.GetLayout(1).setText(rank2text(i) & RETURN & getText("quest.prize"))
  t_rComponent.GetLayout(2).setText(string(t_ar_data[#credits]))
  t_mp_iType_rThumb = [:]
  repeat with t_rItem in t_ar_data[#item_array]
    t_mp_iType_rThumb.setaProp(t_rItem[#itemCode], VOID)
  end repeat
  executeMessage("GetItemThumbnail", t_mp_iType_rThumb)
  if voidp(t_ar_data[#item_index]) then
    t_ar_data[#item_index] = 1
  end if
  t_index = t_ar_data[#item_index]
  t_ar_items = array_slice(t_ar_data[#item_array], t_index, t_iMaxItemsPerRow)
  repeat while t_ar_items.count < t_iMaxItemsPerRow
    t_ar_items.append([#itemReference: -1, #itemCode: -1])
  end repeat
  t_rThumbBg = image(40, 40, 32)
  t_rThumbBg.useAlpha = 1
  t_rLightBlue = rgb(39, 86, 146)
  t_rDarkBLue = rgb("#001F56")
  t_rThumbBg.fill(t_rThumbBg.rect, [#shapeType: #rect, #color: t_rLightBlue])
  repeat with i = 1 to t_ar_items.count
    t_ar_Item = t_ar_items[i]
    t_iCode = t_ar_Item[#itemCode]
    t_rLayout = t_rComponent.GetLayout(3 + i)
    if objectp(t_rLayout) then
      t_rIconImg = t_rThumbBg.duplicate()
      if t_iCode > -1 then
        t_rTempImg = t_mp_iType_rThumb.getaProp(t_iCode)
        if objectp(t_rTempImg) then
          t_rIconImg.copyPixels(t_rTempImg, t_rTempImg.rect, t_rTempImg.rect, [#maskImage: t_rTempImg.extractAlpha(), #ink: 36, #useFastQuads: 1])
        end if
      end if
      t_rIconImg.draw(t_rIconImg.rect, [#color: m_rBorderCol, #shapeType: #rect, #lineSize: 2])
      t_rLayout.setIconImage(t_rIconImg)
      t_rLayout.setNode(t_ar_Item)
    end if
  end repeat
  t_rImg = t_rComponentPage.render()
  t_rClientElement.feedImage(t_rImg)
end