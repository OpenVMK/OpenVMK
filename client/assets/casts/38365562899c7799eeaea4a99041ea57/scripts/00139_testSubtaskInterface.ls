-- Behavior
on runSubTaskTest
  if getObject("QuestTaskDefinition") <> 0 then
    removeObject("QuestTaskDefinition")
  end if
  t = createObject("QuestTaskDefinition", "CQuestWindowManager")
  t.populate(["addtask"])
  t.Activate()
end
on runInQuestTest
  if getObject("InQuestDialogs") <> 0 then
    removeObject("InQuestDialogs")
  end if
  t = createObject("InQuestDialogs", "CQuestWindowManager")
  t.populate(["taskcompleted", "taskfailed", "questcancelled", "questcompleted"])
  t.Activate()
end
on testQI
  t = [#questTemplateId: 33, #official: 1, #owner: 0, #questOwnerName: "wille", #questName: "Sitting Quest", #description: "This is my first hello again", #prizingMode: 1, #visibility: 3, #taskCount: 6, #remainingQuestDurationInSecs: 887, #rating: 0, #authorRating: 0, #playerJoinCount: 1, #playerCompleteCount: 0, #taken_prize_count: 0, #remaining_prize_count: 2, #remaining_prize_array: [[#credits: 50, #categoryTime: 0, #item_count: 2, #item_array: [[#itemCode: 190], [#itemCode: 1]]], [#credits: 30, #categoryTime: 0, #item_count: 2, #item_array: [[#itemCode: 305], [#itemCode: 5]]]], #player_count: 0, #player_array: [], #officialQuestCount: 1, #officialQuestIndex: 0]
  t[#player_count] = 10
  t_player = [#player_name: "test", #completionTimeIsSecs: 100]
  repeat with i = 1 to t[#player_count]
    t[#player_array].append(t_player.duplicate())
  end repeat
  getThread(#QuestEngine).getComponent().QuestInstanceData(t)
end