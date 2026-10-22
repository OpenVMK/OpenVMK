-- Behavior
on construct me
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
            otherwise:
              put "Unknown server task-type (can discard) " && t_iTaskType

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
          tValue = tCannedBlock[i]
          t_ar_out.addProp(tKey, tValue)
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
                tValue = tCannedBlock[i]
                t_ar_out.addProp(tKey, tValue)
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
                  tValue = tCannedBlock[i]
                  t_ar_out.addProp(tKey, tValue)
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
  t_ar_msgDesc = [#int: #questTemplateId, #str: #questName, #str: #description, #int: #prizingMode, #int: #status, #int: #questDurationInSecs, #int: #task_count, #Array: [#int: #taskType, #str: #desc, #int: #photoId, #int: #timeLimitInSecs, #tasksettings: #undefined], #int: #prize_count, #Array: [#int: #credits, #int: #item_count, #Array: [#int: #itemReference, #int: #itemCode]], #int: #testingRequired]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  put "QuestEngine->QuestTemplateData" && t_ar_out
  me.getComponent().QuestTemplateData(t_ar_out)
end
on TaskPrepareData me, tMsgStruct
  t_ar_msgDesc = [#int: #taskType, #int: #item_count, #Array: [#int: #id]]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  me.getComponent().TaskPrepareData(t_ar_out)
end
on QuestInstanceData me, tMsgStruct
  t_ar_msgDesc = [#int: #questTemplateId, #int: #official, #int: #owner, #str: #questOwnerName, #str: #questName, #str: #description, #int: #prizingMode, #int: #visibility, #int: #taskCount, #int: #remainingQuestDurationInSecs, #int: #rating, #int: #authorRating, #int: #playerJoinCount, #int: #playerCompleteCount, #int: #taken_prize_count, #int: #remaining_prize_count, #Array: [#int: #credits, #int: #categoryTime, #int: #item_count, #Array: [#int: #itemCode]], #int: #player_count, #Array: [#str: #player_name, #int: #completionTimeIsSecs], #int: #officialQuestCount, #int: #officialQuestIndex, #int: #spaceSpecific, #int: #expired, #bool: #avatarOnQuest]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  me.getComponent().QuestInstanceData(t_ar_out)
end
on CurrentTaskData me, tMsgStruct
  t_ar_msgDesc = [#int: #questTemplateId, #str: #questName, #int: #taskNumber, #int: #totalTaskCount, #int: #remainingTaskDurationInSecs, #int: #questDurationInSecs, #str: #description, #int: #photoId, #int: #option_count, #Array: [#str: #optionText]]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  me.getComponent().CurrentTaskData(t_ar_out)
end
on TaskNotification me, tMsgStruct
  t_ar_msgDesc = [#int: #questTemplateId, #str: #questName, #int: #taskNumber, #int: #totalTaskCount, #int: #questDurationInSecs, #int: #failed, #int: #taskType, #int: #timedOut, #int: #solvedImmediately, #tasksettings: #undefined]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  me.getComponent().TaskNotification(t_ar_out)
end
on QuestCompleted me, tMsgStruct
  t_ar_msgDesc = [#int: #questTemplateId, #int: #avatarQuestId, #str: #questName, #int: #questDurationInSecs, #int: #prizingMode, #int: #rank, #int: #credits, #int: #item_count, #Array: [#int: #itemCode], #int: #remainingQuestDurationInSecs]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  me.getComponent().QuestCompleted(t_ar_out)
end
on QuestTerminated me, tMsgStruct
  t_ar_msgDesc = [#int: #questTemplateId, #int: #terminationReason, #int: #official]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  me.getComponent().QuestTerminated(t_ar_out)
end
on PrizeItemAdded me, tMsgStruct
  t_ar_msgDesc = [#int: #rank, #int: #itemReference, #int: #itemCode]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  me.getComponent().PrizeItemAdded(t_ar_out)
end
on PrizeCreditsAdded me, tMsgStruct
  t_ar_msgDesc = [#int: #rank, #int: #credits]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  me.getComponent().PrizeCreditsAdded(t_ar_out)
end
on PrizeItemRemoved me, tMsgStruct
  t_ar_msgDesc = [#int: #rank, #int: #itemReference]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  me.getComponent().PrizeItemRemoved(t_ar_out)
end
on TaskAdded me, tMsgStruct
  t_ar_msgDesc = [#int: #taskNumber, #int: #taskType, #int: #photoId, #str: #description, #tasksettings: #undefined]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  me.getComponent().TaskAdded(t_ar_out)
end
on TaskUpdated me, tMsgStruct
  t_ar_msgDesc = [#int: #taskNumber, #int: #taskType, #tasksettings: #undefined]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  me.getComponent().TaskUpdated(t_ar_out)
end
on TaskDeleted me, tMsgStruct
  t_ar_msgDesc = [#int: #taskNumber]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  me.getComponent().TaskDeleted(t_ar_out)
end
on TaskMoved me, tMsgStruct
  t_ar_msgDesc = [#int: #taskNumber, #int: #up]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  me.getComponent().TaskMoved(t_ar_out)
end
on TaskDescUpdated me, tMsgStruct
  t_ar_msgDesc = [#int: #taskNumber, #int: #photoId, #str: #newDesc]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  me.getComponent().TaskDescUpdated(t_ar_out)
end
on PrizeCreditsRemoved me, tMsgStruct
  t_ar_msgDesc = [#int: #rank]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  me.getComponent().PrizeCreditsRemoved(t_ar_out)
end
on CannedTextParsingFailed me, tMsgStruct
  t_ar_msgDesc = []
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  me.getComponent().CannedTextParsingFailed(t_ar_out)
end
on QuestSaved me, tMsgStruct
  t_ar_msgDesc = []
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  me.getComponent().QuestSaved(t_ar_out)
end
on ShowFindableItem me, tMsgStruct
  t_ar_msgDesc = [#int: #item_count, #Array: [#int: #tileReference, #int: #findableItemCode]]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  me.getComponent().ShowFindableItem(t_ar_out)
end
on HideFindableItem me, tMsgStruct
  t_ar_msgDesc = [#int: #tileReference]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  put "QuestEngine->HideFindableItem" && t_ar_out
  me.getComponent().HideFindableItem(t_ar_out)
end
on QuestCleared me, tMsgStruct
  t_ar_msgDesc = [#int: #tasksCleared, #int: #prizesCleared, #int: #propertiesCleared]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  me.getComponent().QuestCleared(t_ar_out)
end
on TaskTimeLimitSet me, tMsgStruct
  t_ar_msgDesc = [#int: #taskNumber, #int: #timeLimitInSecs]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  me.getComponent().TaskTimeLimitSet(t_ar_out)
end
on QuestTestSuccess me, tMsgStruct
  t_ar_msgDesc = [#int: #questTemplateId]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  me.getComponent().QuestTestSuccess(t_ar_out)
end
on PrizeCleared me, tMsgStruct
  t_ar_msgDesc = [#int: #rank]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  me.getComponent().PrizeCleared(t_ar_out)
end
on QuestAuthorHallOfFame me, tMsgStruct
  t_ar_msgDesc = [#int: #author_count, #Array: [#str: #avatarName, #int: #rating]]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  me.getComponent().QuestAuthorHallOfFame(t_ar_out)
end
on QuestPrizeData me, tMsgStruct
  t_ar_msgDesc = [#int: #taken_prize_count, #int: #remaining_prize_count, #Array: [#int: #credits, #int: #categoryTime, #int: #item_count, #Array: [#int: #itemCode]]]
  t_ar_out = me.parseServerMessage(tMsgStruct, t_ar_msgDesc)
  me.getComponent().QuestPrizeData(t_ar_out)
end
on SaveQuest me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId, #int: #StartQuest, #int: #prizingMode, #int: #questDurationInSecs, #canned: #name, #canned: #description]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(840, t_ar_Msg)
end
on PrepareTask me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId, #int: #insert, #int: #taskType, #int: #taskNumber]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(841, t_ar_Msg)
end
on AddTask me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId, #int: #taskType, #int: #photoId, #canned: #description, #tasksettings: #undefined]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(842, t_ar_Msg)
  put "QuestEngine<-AddTask" && t_ar_Msg
end
on DeleteTask me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId, #int: #taskNumber]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(843, t_ar_Msg)
end
on UpdateTaskDesc me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId, #int: #taskNumber, #int: #photoId, #canned: #newDescription]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(844, t_ar_Msg)
end
on ProceedToNextTask me, t_arg
  t_ar_msgDesc = []
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(845, t_ar_Msg)
end
on UpdateTask me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId, #int: #taskType, #int: #taskNumber, #tasksettings: #undefined]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(846, t_ar_Msg)
end
on MoveTask me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId, #int: #taskNumber, #int: #up]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(847, t_ar_Msg)
end
on AddPrizeItem me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId, #int: #rank, #int: #itemReference]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(848, t_ar_Msg)
end
on AddPrizeCredits me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId, #int: #rank, #int: #credits]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(849, t_ar_Msg)
end
on RemovePrizeItem me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId, #int: #rank, #int: #itemReference]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(850, t_ar_Msg)
end
on StartQuest me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(851, t_ar_Msg)
end
on GetCurrentTaskData me, t_arg
  t_ar_msgDesc = []
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(852, t_ar_Msg)
end
on QuitQuest me, t_arg
  t_ar_msgDesc = []
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(853, t_ar_Msg)
end
on RateQuest me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId, #int: #avatarQuestId, #int: #rating]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(854, t_ar_Msg)
end
on GetOfficialQuest me, t_arg
  t_ar_msgDesc = [#int: #currentQuestTemplateId, #int: #next, #int: #spaceSpecific]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(855, t_ar_Msg)
end
on RemovePrizeCredits me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId, #int: #rank]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(856, t_ar_Msg)
end
on GetQuestInstanceData me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(857, t_ar_Msg)
end
on ClearQuest me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId, #int: #clearTasks, #int: #clearPrizes, #int: #clearProperties]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(858, t_ar_Msg)
end
on TerminateQuest me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(859, t_ar_Msg)
end
on UpdateTaskTimeLimit me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId, #int: #taskNumber, #int: #timeLimitInSecs]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(860, t_ar_Msg)
end
on PublishQuest me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(861, t_ar_Msg)
end
on GotoQuestEngineItem me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(862, t_ar_Msg)
end
on ClearPrize me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId, #int: #rank]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(863, t_ar_Msg)
end
on StopQuestTesting me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId, #int: #sendQuestTemplateData]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(864, t_ar_Msg)
end
on MultipleChoiseAnswer me, t_arg
  t_ar_msgDesc = [#int: #selectedOption]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(865, t_ar_Msg)
end
on RetestQuest me, t_arg
  t_ar_msgDesc = [#int: #questTemplateId]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(866, t_ar_Msg)
end
on GetQuestAuthorHallOfFame me, t_arg
  t_ar_msgDesc = [#int: #startIndex, #int: #endIndex]
  t_ar_Msg = me.createClientCommand(t_arg, t_ar_msgDesc)
  getConnection(getVariable("main.connection.id", "VMK")).send(867, t_ar_Msg)
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