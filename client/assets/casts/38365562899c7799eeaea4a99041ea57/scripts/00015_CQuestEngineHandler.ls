-- Script
property m_bDebug

on construct me
  m_bDebug = 0
  me.regMsgList(1)
  return 1
end
on deconstruct me
  me.regMsgList(0)
end
on parseServerMessage me, tMsgStruct, t_ar_msgDesc
  t_ar_out = [:]
  repeat with t = 1 to t_ar_msgDesc.count
    t_symProp = t_ar_msgDesc.getPropAt(t)
    t_symValue = t_ar_msgDesc[t]
    case t_symProp of
      #bool:
        t_ar_out[t_symValue] = tMsgStruct.connection.GetIntFrom()
      #int:
        t_ar_out[t_symValue] = tMsgStruct.connection.GetIntFrom()
      #str:
        t_ar_out[t_symValue] = tMsgStruct.connection.GetStrFrom()
      #canned:
        t_ar_out[t_symValue] = TransformCannedMsgToString(tMsgStruct)
      #Array:
        t_iArrayCount = t_ar_out[t_ar_out.count]
        t_sArrayParam = t_ar_out.getPropAt(t_ar_out.count).string
        t_sArrayParam = symbol(replaceChunks(t_sArrayParam, "count", EMPTY) & "array")
        t_ar_out[t_sArrayParam] = []
        repeat with t_iCounter = 1 to t_iArrayCount
          t_ar_out[t_sArrayParam].append(me.parseServerMessage(tMsgStruct, t_symValue))
        end repeat
      #tasksettings:
        if m_bDebug then
          put "Task settings...."
        end if
        t_iTaskPos = t_ar_msgDesc.getPos(#taskType)
        if t_iTaskPos > 0 then
          t_iTaskType = t_ar_out[t_iTaskPos]
          case t_iTaskType of
            1:
              t_ar_out[#entitytypeID] = tMsgStruct.connection.GetIntFrom()
            2:
              t_ar_out[#required] = tMsgStruct.connection.GetIntFrom()
              t_ar_out[#item_count] = tMsgStruct.connection.GetIntFrom()
              t_ar_items = []
              t_ar_out[#item_array] = t_ar_items
            3:
              t_ar_out[#spaceTag] = tMsgStruct.connection.GetIntFrom()
            4:
              t_ar_out[#GameID] = tMsgStruct.connection.GetIntFrom()
              t_ar_out[#score] = tMsgStruct.connection.GetIntFrom()
            5:
              t_ar_out[#magicEffectCode] = tMsgStruct.connection.GetIntFrom()
            6:
            7:
              t_ar_out[#phrase] = tMsgStruct.connection.GetStrFrom()
            8:
              t_ar_out[#amount] = tMsgStruct.connection.GetIntFrom()
            9:
              t_ar_out[#amount] = tMsgStruct.connection.GetIntFrom()
            10:
            11:
            12:
              t_ar_out[#emoticon] = tMsgStruct.connection.GetIntFrom()
            13:
            14:
            15:
              t_ar_out[#itemCode] = tMsgStruct.connection.GetIntFrom()
            16:
            17:
              t_ar_out[#correctAnswerID] = tMsgStruct.connection.GetIntFrom()
              t_iAnswerCount = tMsgStruct.connection.GetIntFrom()
              t_ar_answers = []
              repeat with i = 1 to t_iAnswerCount
                t_ar_answers.append(tMsgStruct.connection.GetStrFrom())
              end repeat
              t_ar_out[#answers] = t_ar_answers
            18:
              t_ar_out[#itemCode] = tMsgStruct.connection.GetIntFrom()
              t_ar_out[#amount] = tMsgStruct.connection.GetIntFrom()
            19:
              t_ar_out[#required] = tMsgStruct.connection.GetIntFrom()
              t_ar_out[#item_count] = tMsgStruct.connection.GetIntFrom()
              t_ar_items = []
              t_ar_out[#item_array] = t_ar_items
            20:
            otherwise:
              put "Unknown server task-type (can discard) " && t_iTaskType

          end case
        end if
      #itemCategoryData:
        t_iItemPos = t_ar_msgDesc.getPos(#itemCategory)
        if t_iItemPos > 0 then
          t_iItemType = t_ar_out[t_iItemPos]
          case t_iItemType of
            1:
              t_iCount = tMsgStruct.connection.GetIntFrom()
              if t_iCount > 0 then
                t_ar_out[#itemSubCategory] = tMsgStruct.connection.GetIntFrom()
                t_ar_ItemData = []
                repeat with i = 1 to t_iCount - 1
                  t_ar_ItemData.append(tMsgStruct.connection.GetIntFrom())
                end repeat
                t_ar_out[#itemData] = t_ar_ItemData
                if t_ar_out[#itemSubCategory] = 1 then
                  t_ar_out[#teleportID] = t_ar_ItemData[1]
                  t_ar_out[#teleportpair] = t_ar_ItemData[2]
                end if
              end if
            2:
            3:
            4:
              t_ar_out[#pinlevel] = tMsgStruct.connection.GetIntFrom()
              t_ar_out[#pinSingleUse] = tMsgStruct.connection.GetIntFrom()
              t_ar_out[#pinTimeExpire] = tMsgStruct.connection.GetIntFrom()

          end case
        end if
      otherwise:
        put "Unknown property" && t_symProp

    end case
  end repeat
  return t_ar_out
end
on createClientCommand me, t_ar_Params, t_ar_msgDesc
  t_ar_out = [:]
  repeat with t = 1 to t_ar_msgDesc.count
    t_symProp = t_ar_msgDesc.getPropAt(t)
    t_symValue = t_ar_msgDesc[t]
    case t_symProp of
      #int:
        t_ar_out.addProp(t_symProp, t_ar_Params[t])
      #str:
        t_ar_out.addProp(t_symProp, t_ar_Params[t])
      #canned:
        tCannedBlock = TransformCannedToMsg(t_ar_Params[t], 0)
        repeat with i = 1 to tCannedBlock.count
          tKey = tCannedBlock.getPropAt(i)
          tvalue = tCannedBlock[i]
          t_ar_out.addProp(tKey, tvalue)
        end repeat
      #tasksettings:
        t_iTaskPos = t_ar_msgDesc.getPos(#taskType)
        if t_iTaskPos > 0 then
          t_iTaskType = t_ar_out[t_iTaskPos]
          case t_iTaskType of
            1:
              t_ar_out.addProp(#int, t_ar_Params[t])
            2:
              t_ar_out.addProp(#int, 1)
              t_ar_out.addProp(#int, 1)
              t_ar_out.addProp(#int, t_ar_Params[t])
              t_ar_out.addProp(#int, t_ar_Params[t + 1])
            3:
              t_ar_out.addProp(#int, t_ar_Params[t])
            4:
              t_ar_out.addProp(#int, t_ar_Params[t])
              t_ar_out.addProp(#int, t_ar_Params[t + 1])
            5:
              t_ar_out.addProp(#int, t_ar_Params[t])
            6:
            7:
              tCannedBlock = TransformCannedToMsg(t_ar_Params[t], 0)
              repeat with i = 1 to tCannedBlock.count
                tKey = tCannedBlock.getPropAt(i)
                tvalue = tCannedBlock[i]
                t_ar_out.addProp(tKey, tvalue)
              end repeat
            8:
              t_ar_out.addProp(#int, t_ar_Params[t])
            9:
              t_ar_out.addProp(#int, t_ar_Params[t])
            10:
            11:
            12:
              t_ar_out.addProp(#int, t_ar_Params[t])
            13:
            14:
            15:
              t_ar_out.addProp(#int, t_ar_Params[t])
            16:
            17:
              t_ar_out.addProp(#int, t_ar_Params[t])
              t_ar_out.addProp(#int, t_ar_Params[t + 1].count)
              repeat with t_ar_CannedContent in t_ar_Params[t + 1]
                tCannedBlock = TransformCannedToMsg(t_ar_CannedContent, 0)
                repeat with i = 1 to tCannedBlock.count
                  tKey = tCannedBlock.getPropAt(i)
                  tvalue = tCannedBlock[i]
                  t_ar_out.addProp(tKey, tvalue)
                end repeat
              end repeat
            18:
              t_ar_out.addProp(#int, t_ar_Params[t])
              t_ar_out.addProp(#int, t_ar_Params[t + 1])
            19:
              t_ar_out.addProp(#int, t_ar_Params[t])
              t_ar_out.addProp(#int, t_ar_Params[t + 1].count)
              repeat with t_ar_pair in t_ar_Params[t + 1]
                t_ar_out.addProp(#int, t_ar_pair[1])
                t_ar_out.addProp(#int, t_ar_pair[2])
              end repeat
            20:
            otherwise:
              put "Unknown clien task-type" && t_iTaskType

          end case
        end if
      otherwise:
        put "Could not append unknown prop-type" && t_symProp

    end case
  end repeat
  return t_ar_out
end
on QuestTemplateData me, tMsgStruct
  t_ar_msgDesc = [#int: #questTemplateId, #str: #questName, #str: #description, #int: #prizingMode, #int: #status, #int: #questDurationInSecs, #int: #task_count, #Array: [#int: #taskType, #str: #desc, #int: #photoId, #int: #timeLimitInSecs, #tasksettings: #undefined], #int: #prize_count, #Array: [#int: #credits, #int: #item_count, #Array: [#int: #itemReference, #int: #itemCode, #int: #itemCategory, #itemCategoryData: #undefined]], #int: #testingRequired]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if m_bDebug then
    put "QuestEngine->QuestTemplateData" && t_ar_out
  end if
  me.getComponent().QuestTemplateData(t_ar_out)
end
on TaskPrepareData me, tMsgStruct
  t_ar_msgDesc = [#int: #taskType, #int: #item_count, #Array: [#int: #id]]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if m_bDebug then
    put "QuestEngine->TaskPrepareData" && t_ar_out
  end if
  me.getComponent().TaskPrepareData(t_ar_out)
end
on QuestInstanceData me, tMsgStruct
  t_ar_msgDesc = [#int: #questTemplateId, #int: #official, #int: #owner, #str: #questOwnerName, #str: #questName, #str: #description, #int: #prizingMode, #int: #visibility, #int: #taskCount, #int: #remainingQuestDurationInSecs, #int: #rating, #int: #authorRating, #int: #playerJoinCount, #int: #playerCompleteCount, #int: #taken_prize_count, #int: #remaining_prize_count, #Array: [#int: #credits, #int: #categoryTime, #int: #item_count, #Array: [#int: #itemCode]], #int: #player_count, #Array: [#str: #player_name, #int: #completionTimeIsSecs], #int: #officialQuestCount, #int: #officialQuestIndex, #int: #spaceSpecific, #int: #expired, #bool: #avatarOnQuest]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if m_bDebug then
    put "QuestEngine->QuestInstanceData" && t_ar_out
  end if
  me.getComponent().QuestInstanceData(t_ar_out)
end
on CurrentTaskData me, tMsgStruct
  t_ar_msgDesc = [#int: #questTemplateId, #str: #questName, #int: #taskNumber, #int: #totalTaskCount, #int: #remainingTaskDurationInSecs, #int: #questDurationInSecs, #str: #description, #int: #photoId, #int: #option_count, #Array: [#str: #optionText], #int: #foundMickeyColor_count, #Array: [#int: #mickeyColor, #int: #mickeyCount]]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if m_bDebug then
    put "QuestEngine->CurrentTaskData" && t_ar_out
  end if
  me.getComponent().CurrentTaskData(t_ar_out)
end
on TaskNotification me, tMsgStruct
  t_ar_msgDesc = [#int: #questTemplateId, #str: #questName, #int: #taskNumber, #int: #totalTaskCount, #int: #questDurationInSecs, #int: #failed, #int: #taskType, #int: #timedOut, #int: #solvedImmediately, #tasksettings: #undefined]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if m_bDebug then
    put "QuestEngine->TaskNotification" && t_ar_out
  end if
  me.getComponent().TaskNotification(t_ar_out)
end
on QuestCompleted me, tMsgStruct
  t_ar_msgDesc = [#int: #questTemplateId, #int: #avatarQuestId, #str: #questName, #int: #questDurationInSecs, #int: #prizingMode, #int: #rank, #int: #credits, #int: #item_count, #Array: [#int: #itemCode], #int: #remainingQuestDurationInSecs]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if m_bDebug then
    put "QuestEngine->QuestCompleted" && t_ar_out
  end if
  me.getComponent().QuestCompleted(t_ar_out)
end
on QuestTerminated me, tMsgStruct
  t_ar_msgDesc = [#int: #questTemplateId, #int: #terminationReason, #int: #official]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if m_bDebug then
    put "QuestEngine->QuestTerminated" && t_ar_out
  end if
  me.getComponent().QuestTerminated(t_ar_out)
end
on PrizeItemAdded me, tMsgStruct
  t_ar_msgDesc = [#int: #rank, #int: #itemReference, #int: #itemCode, #int: #itemCategory, #itemCategoryData: #undefined]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if m_bDebug then
    put "QuestEngine->PrizeItemAdded" && t_ar_out
  end if
  me.getComponent().PrizeItemAdded(t_ar_out)
end
on PrizeCreditsAdded me, tMsgStruct
  t_ar_msgDesc = [#int: #rank, #int: #credits]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if m_bDebug then
    put "QuestEngine->PrizeCreditsAdded" && t_ar_out
  end if
  me.getComponent().PrizeCreditsAdded(t_ar_out)
end
on PrizeItemRemoved me, tMsgStruct
  t_ar_msgDesc = [#int: #rank, #int: #itemReference]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if m_bDebug then
    put "QuestEngine->PrizeItemRemoved" && t_ar_out
  end if
  me.getComponent().PrizeItemRemoved(t_ar_out)
end
on TaskAdded me, tMsgStruct
  t_ar_msgDesc = [#int: #taskNumber, #int: #taskType, #int: #photoId, #str: #description, #tasksettings: #undefined]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if m_bDebug then
    put "QuestEngine->TaskAdded" && t_ar_out
  end if
  me.getComponent().TaskAdded(t_ar_out)
end
on TaskUpdated me, tMsgStruct
  t_ar_msgDesc = [#int: #taskNumber, #int: #taskType, #tasksettings: #undefined]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if m_bDebug then
    put "QuestEngine->TaskUpdated" && t_ar_out
  end if
  me.getComponent().TaskUpdated(t_ar_out)
end
on TaskDeleted me, tMsgStruct
  t_ar_msgDesc = [#int: #taskNumber]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if m_bDebug then
    put "QuestEngine->TaskDeleted" && t_ar_out
  end if
  me.getComponent().TaskDeleted(t_ar_out)
end
on TaskMoved me, tMsgStruct
  t_ar_msgDesc = [#int: #taskNumber, #int: #up]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if m_bDebug then
    put "QuestEngine->TaskMoved" && t_ar_out
  end if
  me.getComponent().TaskMoved(t_ar_out)
end
on TaskDescUpdated me, tMsgStruct
  t_ar_msgDesc = [#int: #taskNumber, #int: #photoId, #str: #newDesc]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if m_bDebug then
    put "QuestEngine->TaskDescUpdated" && t_ar_out
  end if
  me.getComponent().TaskDescUpdated(t_ar_out)
end
on PrizeCreditsRemoved me, tMsgStruct
  t_ar_msgDesc = [#int: #rank]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if m_bDebug then
    put "QuestEngine->PrizeCreditsRemoved" && t_ar_out
  end if
  me.getComponent().PrizeCreditsRemoved(t_ar_out)
end
on CannedTextParsingFailed me, tMsgStruct
  t_ar_msgDesc = []
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if m_bDebug then
    put "QuestEngine->CannedTextParsingFailed" && t_ar_out
  end if
  me.getComponent().CannedTextParsingFailed(t_ar_out)
end
on QuestSaved me, tMsgStruct
  t_ar_msgDesc = []
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if m_bDebug then
    put "QuestEngine->QuestSaved" && t_ar_out
  end if
  me.getComponent().QuestSaved(t_ar_out)
end
on ShowFindableItem me, tMsgStruct
  t_ar_msgDesc = [#int: #item_count, #Array: [#int: #tileReference, #int: #findableItemCode]]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if m_bDebug then
    put "QuestEngine->ShowFindableItem" && t_ar_out
  end if
  me.getComponent().ShowFindableItem(t_ar_out)
end
on HideFindableItem me, tMsgStruct
  t_ar_msgDesc = [#int: #tileReference]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if m_bDebug then
    put "QuestEngine->HideFindableItem" && t_ar_out
  end if
  me.getComponent().HideFindableItem(t_ar_out)
end
on QuestCleared me, tMsgStruct
  t_ar_msgDesc = [#int: #tasksCleared, #int: #prizesCleared, #int: #propertiesCleared]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if m_bDebug then
    put "QuestEngine->QuestCleared" && t_ar_out
  end if
  me.getComponent().QuestCleared(t_ar_out)
end
on TaskTimeLimitSet me, tMsgStruct
  t_ar_msgDesc = [#int: #taskNumber, #int: #timeLimitInSecs]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if m_bDebug then
    put "QuestEngine->TaskTimeLimitSet" && t_ar_out
  end if
  me.getComponent().TaskTimeLimitSet(t_ar_out)
end
on QuestTestSuccess me, tMsgStruct
  t_ar_msgDesc = [#int: #questTemplateId]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if m_bDebug then
    put "QuestEngine->QuestTestSuccess" && t_ar_out
  end if
  me.getComponent().QuestTestSuccess(t_ar_out)
end
on PrizeCleared me, tMsgStruct
  t_ar_msgDesc = [#int: #rank]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if m_bDebug then
    put "QuestEngine->PrizeCleared" && t_ar_out
  end if
  me.getComponent().PrizeCleared(t_ar_out)
end
on QuestAuthorHallOfFame me, tMsgStruct
  t_ar_msgDesc = [#int: #author_count, #Array: [#str: #avatarName, #int: #rating]]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if m_bDebug then
    put "QuestEngine->PrizeCleared" && t_ar_out
  end if
  me.getComponent().QuestAuthorHallOfFame(t_ar_out)
end
on QuestPrizeData me, tMsgStruct
  t_ar_msgDesc = [#int: #questTemplateId, #int: #taken_prize_count, #int: #remaining_prize_count, #Array: [#int: #credits, #int: #categoryTime, #int: #item_count, #Array: [#int: #itemCode]]]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  if m_bDebug then
    put "QuestEngine->QuestPrizeData" && t_ar_out
  end if
  me.getComponent().QuestPrizeData(t_ar_out)
end
on SaveQuest me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId, #int: #StartQuest, #int: #prizingMode, #int: #questDurationInSecs, #canned: #name, #canned: #description]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(840, t_ar_Msg)
  if m_bDebug then
    put "QuestEngine<-SaveQuest" && t_ar_Msg
  end if
end
on PrepareTask me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId, #int: #insert, #int: #taskType, #int: #taskNumber]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(841, t_ar_Msg)
  if m_bDebug then
    put "QuestEngine<-PrepareTask" && t_ar_Msg
  end if
end
on AddTask me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId, #int: #taskType, #int: #photoId, #canned: #description, #tasksettings: #undefined]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(842, t_ar_Msg)
  if m_bDebug then
    put "QuestEngine<-AddTask" && t_ar_Msg
  end if
end
on DeleteTask me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId, #int: #taskNumber]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(843, t_ar_Msg)
  if m_bDebug then
    put "QuestEngine<-DeleteTask" && t_ar_Msg
  end if
end
on UpdateTaskDesc me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId, #int: #taskNumber, #int: #photoId, #canned: #newDescription]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(844, t_ar_Msg)
  if m_bDebug then
    put "QuestEngine<-UpdateTaskDesc" && t_ar_Msg
  end if
end
on ProceedToNextTask me, t_arg
  t_ar_msgDesc = []
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(845, t_ar_Msg)
  if m_bDebug then
    put "QuestEngine<-ProceedToNextTask" && t_ar_Msg
  end if
end
on UpdateTask me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId, #int: #taskType, #int: #taskNumber, #tasksettings: #undefined]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(846, t_ar_Msg)
  if m_bDebug then
    put "QuestEngine<-UpdateTask" && t_ar_Msg
  end if
end
on MoveTask me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId, #int: #taskNumber, #int: #up]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(847, t_ar_Msg)
  if m_bDebug then
    put "QuestEngine<-MoveTask" && t_ar_Msg
  end if
end
on AddPrizeItem me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId, #int: #rank, #int: #itemReference]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(848, t_ar_Msg)
  if m_bDebug then
    put "QuestEngine<-AddPrizeItem" && t_ar_Msg
  end if
end
on AddPrizeCredits me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId, #int: #rank, #int: #credits]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(849, t_ar_Msg)
  if m_bDebug then
    put "QuestEngine<-AddPrizeCredits" && t_ar_Msg
  end if
end
on RemovePrizeItem me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId, #int: #rank, #int: #itemReference]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(850, t_ar_Msg)
  if m_bDebug then
    put "QuestEngine<-RemovePrizeItem" && t_ar_Msg
  end if
end
on StartQuest me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(851, t_ar_Msg)
  if m_bDebug then
    put "QuestEngine<-StartQuest" && t_ar_Msg
  end if
end
on GetCurrentTaskData me, t_arg
  t_ar_msgDesc = []
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(852, t_ar_Msg)
  if m_bDebug then
    put "QuestEngine<-GetCurrentTaskData" && t_ar_Msg
  end if
end
on QuitQuest me, t_arg
  t_ar_msgDesc = []
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(853, t_ar_Msg)
  if m_bDebug then
    put "QuestEngine<-QuitQuest" && t_ar_Msg
  end if
end
on RateQuest me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId, #int: #avatarQuestId, #int: #rating]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(854, t_ar_Msg)
  if m_bDebug then
    put "QuestEngine<-RateQuest" && t_ar_Msg
  end if
end
on GetOfficialQuest me, t_arg
  t_ar_msgDesc = [#int: #currentQuestTemplateId, #int: #next, #int: #spaceSpecific]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(855, t_ar_Msg)
  if m_bDebug then
    put "QuestEngine<-GetOfficialQuest" && t_ar_Msg
  end if
end
on RemovePrizeCredits me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId, #int: #rank]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(856, t_ar_Msg)
  if m_bDebug then
    put "QuestEngine<-RemovePrizeCredits" && t_ar_Msg
  end if
end
on GetQuestInstanceData me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(857, t_ar_Msg)
  if m_bDebug then
    put "QuestEngine<-GetQuestInstanceData" && t_ar_Msg
  end if
end
on ClearQuest me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId, #int: #clearTasks, #int: #clearPrizes, #int: #clearProperties]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(858, t_ar_Msg)
  if m_bDebug then
    put "QuestEngine<-ClearQuest" && t_ar_Msg
  end if
end
on TerminateQuest me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(859, t_ar_Msg)
  if m_bDebug then
    put "QuestEngine<-TerminateQuest" && t_ar_Msg
  end if
end
on UpdateTaskTimeLimit me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId, #int: #taskNumber, #int: #timeLimitInSecs]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(860, t_ar_Msg)
  if m_bDebug then
    put "QuestEngine<-UpdateTaskTimeLimit" && t_ar_Msg
  end if
end
on PublishQuest me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(861, t_ar_Msg)
  if m_bDebug then
    put "QuestEngine<-PublishQuest" && t_ar_Msg
  end if
end
on GotoQuestEngineItem me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(862, t_ar_Msg)
  if m_bDebug then
    put "QuestEngine<-GotoQuestEngineItem" && t_ar_Msg
  end if
end
on ClearPrize me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId, #int: #rank]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(863, t_ar_Msg)
  if m_bDebug then
    put "QuestEngine<-ClearPrize" && t_ar_Msg
  end if
end
on StopQuestTesting me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId, #int: #sendQuestTemplateData]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(864, t_ar_Msg)
  if m_bDebug then
    put "QuestEngine<-StopQuestTesting" && t_ar_Msg
  end if
end
on MultipleChoiseAnswer me, t_arg
  t_ar_msgDesc = [#int: #selectedOption]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(865, t_ar_Msg)
  if m_bDebug then
    put "QuestEngine<-MultipleChoiseAnswer" && t_ar_Msg
  end if
end
on RetestQuest me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(866, t_ar_Msg)
  if m_bDebug then
    put "QuestEngine<-RetestQuest" && t_ar_Msg
  end if
end
on GetQuestAuthorHallOfFame me, t_arg
  t_ar_msgDesc = [#int: #startIndex, #int: #endIndex]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(867, t_ar_Msg)
  if m_bDebug then
    put "QuestEngine<-GetQuestAuthorHallOfFame" && t_ar_Msg
  end if
end
on GetPrizeItemDetails me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId, #int: #rank, #int: #prizeIndex]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(868, t_ar_Msg)
  if m_bDebug then
    put "QuestEngine<-GetPrizeItemDetails" && t_ar_Msg
  end if
end
on regMsgList me, tBool
  tMsgs = [:]
  tMsgs.setaProp(2850, #QuestTemplateData)
  tMsgs.setaProp(2851, #TaskPrepareData)
  tMsgs.setaProp(2852, #QuestInstanceData)
  tMsgs.setaProp(2853, #CurrentTaskData)
  tMsgs.setaProp(2854, #TaskNotification)
  tMsgs.setaProp(2855, #QuestCompleted)
  tMsgs.setaProp(2856, #QuestTerminated)
  tMsgs.setaProp(2857, #PrizeItemAdded)
  tMsgs.setaProp(2858, #PrizeCreditsAdded)
  tMsgs.setaProp(2859, #PrizeItemRemoved)
  tMsgs.setaProp(2860, #TaskAdded)
  tMsgs.setaProp(2861, #TaskUpdated)
  tMsgs.setaProp(2862, #TaskDeleted)
  tMsgs.setaProp(2863, #TaskMoved)
  tMsgs.setaProp(2864, #TaskDescUpdated)
  tMsgs.setaProp(2866, #PrizeCreditsRemoved)
  tMsgs.setaProp(2867, #CannedTextParsingFailed)
  tMsgs.setaProp(2868, #QuestSaved)
  tMsgs.setaProp(2869, #ShowFindableItem)
  tMsgs.setaProp(2870, #HideFindableItem)
  tMsgs.setaProp(2871, #QuestCleared)
  tMsgs.setaProp(2872, #TaskTimeLimitSet)
  tMsgs.setaProp(2873, #QuestTestSuccess)
  tMsgs.setaProp(2874, #PrizeCleared)
  tMsgs.setaProp(2875, #QuestAuthorHallOfFame)
  tMsgs.setaProp(2876, #QuestPrizeData)
  tCmds = [:]
  if tBool then
    registerListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    registerCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  else
    unregisterListener(getVariable("main.connection.id", "VMK"), me.getID(), tMsgs)
    unregisterCommands(getVariable("main.connection.id", "VMK"), me.getID(), tCmds)
  end if
end