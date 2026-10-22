-- Movie Script
property m_bDebugOut
property m_sDebugPre
property m_iFuelPickup
property m_iFilmPickup

on construct me
  m_bDebugOut = 1
  m_sDebugPre = "[JC.handlerX.dbg]"
  tFuel = getVariableValue("junglecruise.powerUp.fuel.pickup")
  if tFuel = 0 then
    tFuel = 5
  end if
  m_iFuelPickup = tFuel
  tFilm = getVariableValue("junglecruise.powerUp.film.pickup")
  if tFilm = 0 then
    tFilm = 5
  end if
  m_iFilmPickup = tFilm
  return 1
end
on OnStartStage me
  if m_bDebugOut then
    put m_sDebugPre && "OnStartStage()"
  end if
  getThread("junglecruise").getComponent().StageStartCountDown()
end
on OnEndStage me, i_iTime, i_ar_params
  if m_bDebugOut then
    put m_sDebugPre && "OnEndStage()"
  end if
  getThread("junglecruise").getComponent().StageEndCountDown(i_iTime, i_ar_params)
end
on OnLoadStage me, i_sName
  if m_bDebugOut then
    put m_sDebugPre && "OnLoadStage()"
  end if
  getThread("minigame").getComponent().StopMinigameEngine()
  getThread("junglecruise").getComponent().LoadStage(i_sName)
end
on OnJoin me
  if m_bDebugOut then
    put m_sDebugPre && "OnJoin()"
  end if
end
on OnLeave me
  if m_bDebugOut then
    put m_sDebugPre && "OnLeave()"
  end if
end
on OnPrepareRoom me
  if m_bDebugOut then
    put m_sDebugPre && "OnPrepareRoom()"
  end if
  getThread("junglecruise").getComponent().PrepareRoom()
end
on OnEvent me, i_iEvent, i_ar_iData
  tGameEngine = getThread("minigame").getComponent()
  tJCEngine = getThread("junglecruise").getComponent()
  tJCInterface = getThread("junglecruise").getInterface()
  case i_iEvent of
    1:
      tJCEngine.GetAnimalManager().AddOneAnimal(i_ar_iData[1], i_ar_iData[2])
    2:
      ttype = #none
      case i_ar_iData[2] of
        1:
          ttype = #fuel
        2:
          ttype = #film

      end case
      tJCEngine.AddPowerup(i_ar_iData[1], ttype)
    3:
      ttype = #none
      case i_ar_iData[1] of
        1:
          tJCEngine.AwardPowerup(m_iFuelPickup, 0)
        2:
          tJCEngine.AwardPowerup(0, m_iFilmPickup)

      end case
    4:
      if m_bDebugOut then
        put m_sDebugPre && "Award Score" && i_ar_iData
      end if
      tJCEngine.AddScore(i_ar_iData[1], i_ar_iData[2])
    5:
      tBoat = tJCEngine.GetBoat()
      if not voidp(tBoat) then
        tBoat.SetParam("Fuel", i_ar_iData[1])
      end if
      tJCInterface.updatePowerups()
    6:
      if m_bDebugOut then
        put m_sDebugPre && "Game end"
      end if
      tJCInterface.updateScoreinfo()
      tJCInterface.updatePowerups()
      tJCEngine.EndGame()
    7:
      if m_bDebugOut then
        put m_sDebugPre && "Round trip bonus"
      end if
      tJCEngine.AwardPowerup(i_ar_iData[1], i_ar_iData[2])

  end case
end