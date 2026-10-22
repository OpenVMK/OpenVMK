-- Movie Script
on OnPrepareRoom me, a_iRoomCode
  getThread("fireworks").getComponent().PrepareRoom()
end
on OnStartStage me, i_iTime
  getThread("fireworks").getComponent().StageStart(i_iTime)
end
on OnEndStage me, i_iTime, i_ar_params
  getThread("fireworks").getComponent().StageEnd(i_iTime, i_ar_params)
end
on OnLoadStage me, i_sName, i_iVersion, i_ar_params
  t_ar_stageData = [:]
  if listp(i_ar_params["intArray"]) then
    t_ar_intVector = script("CVectorStruct").new(i_ar_params["intArray"])
    t_ar_stageData[#score] = t_ar_intVector.Shift()
    t_ar_bonusCombinations = []
    t_iBonusCount = t_ar_intVector.Shift()
    repeat with j = 1 to t_iBonusCount
      t_ar_bonusCombinations.append(t_ar_intVector.Shift())
    end repeat
    t_ar_stageData[#bonus] = t_ar_bonusCombinations
    t_ar_shots = []
    t_iShotCount = t_ar_intVector.Shift()
    repeat with j = 1 to t_iShotCount
      t_ar_shot = [:]
      t_ar_shot[#shotTimeInMsecs] = t_ar_intVector.Shift()
      t_ar_shot[#shotId] = t_ar_intVector.Shift()
      t_ar_shot[#type] = t_ar_intVector.Shift()
      t_ar_shot[#x] = t_ar_intVector.Shift()
      t_ar_shot[#y] = t_ar_intVector.Shift()
      t_ar_shot[#z] = t_ar_intVector.Shift()
      t_ar_shots.append(t_ar_shot)
    end repeat
    t_ar_stageData.addProp(#shots, t_ar_shots)
    t_ar_intVector = VOID
  end if
  getThread("fireworks").getComponent().LoadStage(i_sName, i_iVersion, t_ar_stageData)
end
on OnJoin me
end
on OnLeave me
end
on OnEvent me, i_iEvent, i_ar_iData
  tFireworks = getThread("Fireworks").getComponent()
  case i_iEvent of
    1:
      tFireworks.EndGame()
    otherwise:
      put "Unknown Fireworks Event"

  end case
end
on OnGameInfoUpdate me, a_rInput
  t_iScoreCount = a_rInput.GetIntFrom()
  tList = []
  repeat with i = 1 to t_iScoreCount
    t_iAvatarRef = a_rInput.GetIntFrom()
    t_iRank = a_rInput.GetIntFrom()
    t_iScore = a_rInput.GetIntFrom()
    t_ar_score = [#ref: t_iAvatarRef, #rank: t_iRank, #score: t_iScore]
    tList.append(t_ar_score)
  end repeat
  getThread("fireworks").getInterface().updateScores(tList)
  getThread("fireworks").getComponent().SendScore()
end