-- Script
property m_rGameEngine
property m_bDebugOut
property m_rHauntedMansionEngine
property m_rHauntedMansionInterface

on OnPrepareRoom me
  m_rGameEngine = getThread("minigame").getComponent()
  m_rHauntedMansionEngine = getThread("hauntedmansiongame").getComponent()
  m_rHauntedMansionInterface = getThread("hauntedmansiongame").getInterface()
  m_rHauntedMansionEngine.PrepareRoom()
  m_bDebugOut = 0
end
on OnStartStage me
  if m_bDebugOut then
    put "Stage Start"
  end if
  executeMessage("PlayInterfaceSound", "1-2-3-GO")
  m_rHauntedMansionInterface.ShowWindow("GetReady")
end
on OnEndStage me, i_iTime, i_ar_params
  if m_bDebugOut then
    put "Stage End" && i_iTime && i_ar_params
  end if
  getThread("hauntedmansiongame").getComponent().m_rStage.removeRattlers()
  tScoreBoard = m_rGameEngine.GetObjectsByCode(5)
  if tScoreBoard.count <> 1 then
    return error(me, "HM Scoreboard object could not be found!", #OnEndStage)
  end if
  tScoreBoard[1].GetFactor().TeamWins(i_ar_params[1])
  m_rHauntedMansionEngine.removeAllDoors()
  m_rHauntedMansionInterface.HMGGetWindow("UI").setChattable(0)
  m_rHauntedMansionInterface.SetRoundResults(i_ar_params)
  m_rHauntedMansionInterface.ShowWindow("Results")
  m_rHauntedMansionInterface.stopAction()
end
on OnLoadStage me, i_sName, i_iVersion
  if m_bDebugOut then
    put "Load Stage" && [i_sName, i_iVersion]
  end if
  m_rHauntedMansionEngine.LoadStage(i_sName, i_iVersion)
end
on OnJoin me
end
on OnLeave me
end
on OnEvent me, i_iEvent, i_ar_iData
  case i_iEvent of
    1:
      me.CoffinRattles(i_ar_iData[1], i_ar_iData[2])
    2:
      me.CreateGhost(i_ar_iData[1], i_ar_iData[2], i_ar_iData[3], i_ar_iData[4], i_ar_iData[5])
    3:
      me.CreateSuperGhost(i_ar_iData[1], i_ar_iData[2], i_ar_iData[3], i_ar_iData[4], i_ar_iData[5])
    4:
      me.PlayerToGhost(i_ar_iData[1])
    5:
      me.PlayerGhostToPlayer(i_ar_iData[1])
    6:
      me.GhostCaught(i_ar_iData[1], i_ar_iData[2])
    7:
      me.SuperGhostCatchPlayer(i_ar_iData[1])
    8:
      me.MoveGhost(i_ar_iData[1], i_ar_iData[2], i_ar_iData[3], i_ar_iData[4], i_ar_iData[5], i_ar_iData[6])
    9:
      me.CreatePickup(i_ar_iData[1], i_ar_iData[2], i_ar_iData[3])
    10:
      me.RemoveGhost(i_ar_iData[1])
    11:
      me.PlayerCollectPickup(i_ar_iData[1])
    12:
      me.CoffinTrembles(i_ar_iData[1])
    13:
      me.PlayerCatchesGhostlyPlayer(i_ar_iData[1], i_ar_iData[2], i_ar_iData[3])
    14:
      me.GameEndingTimer(i_ar_iData[1])
    15:
      me.IdleTimerWarning(i_ar_iData[1], i_ar_iData[2])
    16:
      me.StartDoorRace()
    17:
      me.StartSuddenDeath()
    18:
      me.CorrectExit(i_ar_iData[1], i_ar_iData[2])
    19:
      me.AdvantageTimeEnds(i_ar_iData[1])
    20:
      me.SwingDoor(i_ar_iData[1])
    21:
      me.ToggleVisible(i_ar_iData[1], i_ar_iData[2])
    22:
      me.PlayerLeftGame(i_ar_iData[1])
    23:
      me.StartDoorRaceAdvantage(i_ar_iData[1], i_ar_iData[2])
    otherwise:
      put "CHMMGHandler.MISSING handler: implmement event-id:" && i_iEvent

  end case
end
on CoffinRattles me, i_iRef, i_iCoffinAction
  if m_bDebugOut then
    put "[HMDBG] Coffin" && i_iRef && "rattles"
  end if
  m_rHauntedMansionEngine.m_rStage.rattle(i_iRef, i_iCoffinAction)
  executeMessage("PlayInterfaceSound", "coffin-rattles")
end
on CreateGhost me, i_iRef, i_iTeam, t_iPlaceRef, t_iMoveDelay, t_iCoffinRef
  tParams = [:]
  tParams.setaProp(#ref, i_iRef)
  tParams.setaProp(#type, 1)
  tParams.setaProp(#owner, -1)
  tParams.setaProp(#team, i_iTeam)
  a_rContext = getThread(#room).getComponent()._AccessRoom()
  t_rTile = a_rContext._AccessIndexed(t_iPlaceRef, "tile")
  if objectp(t_rTile) then
    t_TilePos = t_rTile.GetAbsPos()
    x = t_TilePos.x
    y = t_TilePos.y
    z = t_TilePos.z
  else
    x = 0
    y = 0
    z = 0
  end if
  if m_bDebugOut then
    put "[HMDBG] Create ghost" && i_iRef && "color" && i_iTeam && "at" && vector(x, y, z)
  end if
  tNewPos = intvector(x, y, z)
  tParams.setaProp(#worldpos, tNewPos)
  tParams.setaProp(#Dir, 0)
  tParams.setaProp(#extra, [t_iMoveDelay])
  m_rGameEngine._CreateObject("Ghost" & the milliSeconds, tParams)
  executeMessage("PlayInterfaceSound", "ghost-is-created")
end
on CreateSuperGhost me, i_iRef, t_iTeam, t_iPlaceRef, t_iMoveDelay, t_iCoffinRef
  tParams = [:]
  tParams.setaProp(#ref, i_iRef)
  tParams.setaProp(#type, 2)
  tParams.setaProp(#owner, -1)
  tParams.setaProp(#team, t_iTeam)
  a_rContext = getThread(#room).getComponent()._AccessRoom()
  t_rTile = a_rContext._AccessIndexed(t_iPlaceRef, "tile")
  if objectp(t_rTile) then
    t_TilePos = t_rTile.GetAbsPos()
    x = t_TilePos.x
    y = t_TilePos.y
    z = t_TilePos.z
  else
    x = 0
    y = 0
    z = 0
  end if
  if m_bDebugOut then
    put "[HMDBG] Create super ghost" && i_iRef && " at" && vector(x, y, z)
  end if
  tNewPos = intvector(x, y, z)
  tParams.setaProp(#worldpos, tNewPos)
  tParams.setaProp(#Dir, 0)
  tParams.setaProp(#extra, [t_iMoveDelay])
  m_rGameEngine._CreateObject("SuperGhost" & the milliSeconds, tParams)
  executeMessage("PlayInterfaceSound", "super-ghost-is-created")
end
on PlayerToGhost me, i_iPlayer
  if m_bDebugOut then
    put "[HMDBG] Player" && i_iPlayer && "transforms to ghost"
  end if
  m_rGameEngine.GetMGObject(i_iPlayer).GetFactor().Possess()
  executeMessage("PlayInterfaceSound", "player-into-ghost")
  tPlayer = m_rGameEngine.GetMGObject(i_iPlayer)
  if tPlayer.GetFactor().GetName() = getObject(#session).get("name") then
    m_rHauntedMansionInterface.stopAction()
  end if
end
on PlayerGhostToPlayer me, i_iPlayer
  if m_bDebugOut then
    put "[HMDBG] Player" && i_iPlayer && "transforms to normal"
  end if
  m_rGameEngine.GetMGObject(i_iPlayer).GetFactor().UnPossess()
  executeMessage("PlayInterfaceSound", "player-into-normall")
  tPlayer = m_rGameEngine.GetMGObject(i_iPlayer)
  if tPlayer.GetFactor().GetName() = getObject(#session).get("name") then
    m_rHauntedMansionInterface.stopAction()
  end if
end
on GhostCaught me, i_iGhost, i_iPlayer
  if m_bDebugOut then
    put "[HMDBG] Ghost" && i_iGhost && "is caught by player" && i_iPlayer
  end if
  m_rHauntedMansionEngine.CreatePuff(i_iGhost, i_iPlayer)
  m_rGameEngine._MinigameDeleteObject(i_iGhost)
  m_rGameEngine.GetMGObject(i_iPlayer).GetFactor().AwardScore(1)
  executeMessage("PlayInterfaceSound", "ghost-is-catched")
end
on SuperGhostCatchPlayer me, i_iPlayer
  if m_bDebugOut then
    put "[HMDBG] Super ghost catches player" && i_iPlayer
  end if
  m_rGameEngine.GetMGObject(i_iPlayer).GetFactor().SuperGhostPossess()
  executeMessage("PlayInterfaceSound", "superghost-catches-player")
  executeMessage("StopRoomSound")
  executeMessage("LoadRoomSound", "hmg_doorraceend_")
end
on MoveGhost me, i_iGhost, i_iX, i_iY, i_iZ, i_iDirection, i_iMood
  tGhostObj = m_rGameEngine.GetMGObject(i_iGhost)
  if not voidp(tGhostObj) then
    tGhostObj.GetFactor().SetMoveTarget(intvector(i_iX, i_iY, i_iZ), i_iDirection, i_iMood)
  end if
end
on CreatePickup me, i_iPickup, i_iTile, i_iType
  if m_bDebugOut then
    put "[HMDBG] Create pickup" && i_iPickup && "of type" && i_iType && "on tile" && i_iTile
  end if
  executeMessage("PlayInterfaceSound", "create-pickup")
end
on RemoveGhost me, i_iGhost
  if m_bDebugOut then
    put "[HMDBG] Remove ghost" && i_iGhost
  end if
  m_rGameEngine._MinigameDeleteObject(i_iGhost)
end
on PlayerCollectPickup me, i_iPlayer, i_iPickup
  if m_bDebugOut then
    put "[HMDBG] Player" && i_iPlayer && "collects pickup" && i_iPickup
  end if
  executeMessage("PlayInterfaceSound", "player-collect-pickup")
end
on CoffinTrembles me, i_iCoffin
  if m_bDebugOut then
    put "[HMDBG] Coffin" && i_iCoffin && "trembles"
  end if
  m_rHauntedMansionEngine.m_rStage.tremble(i_iCoffin)
  executeMessage("PlayInterfaceSound", "HMG-coffin-tremble")
end
on PlayerCatchesGhostlyPlayer me, i_iCatcher, i_iCatchee, i_iScore
  if m_bDebugOut then
    put "[HMDBG] Player" && i_iCatcher && "catches ghostly player" && i_iCatchee && "receives" && i_iScore && "points."
  end if
  m_rGameEngine.GetMGObject(i_iCatcher).GetFactor().AwardScore(i_iScore)
  m_rGameEngine.GetMGObject(i_iCatchee).GetFactor().UnPossess()
  executeMessage("PlayInterfaceSound", "player-catch-ghostly-player")
end
on GameEndingTimer me, i_iSecondsRemaining
  m_rHauntedMansionInterface.HMGGetWindow("UI").SetTimerDisplay(i_iSecondsRemaining)
end
on IdleTimerWarning me, i_iAvatarRef, i_iSecondsToKickOut
  if m_bDebugOut then
    put "[HMDBG] Player" && i_iAvatarRef && "will be kicked out in" && i_iSecondsToKickOut && "seconds"
  end if
  tPlayer = m_rGameEngine.GetMGObject(i_iAvatarRef)
  if tPlayer.GetFactor().GetName() = getObject(#session).get("name") then
    m_rHauntedMansionInterface.ShowIdleKickWarning(i_iSecondsToKickOut)
  end if
end
on StartDoorRace me
  m_rHauntedMansionInterface.ShowWindow("Notice", "door race")
  executeMessage("PlayInterfaceSound", "doors-open")
  m_rHauntedMansionEngine.openAllDoors()
  executeMessage("StopRoomSound")
  executeMessage("LoadRoomSound", "hmg_doorrace_")
end
on StartSuddenDeath me
  if m_bDebugOut then
    put "[HMDBG] Start Sudden Death"
  end if
  m_rHauntedMansionInterface.ShowWindow("Notice", "sudden death")
  executeMessage("PlayInterfaceSound", "doors-open")
end
on CorrectExit me, i_iPlayerRef, i_iDoorRef
  if m_bDebugOut then
    put "[HMDBG] Player" && i_iPlayerRef && "enters correct door"
  end if
  executeMessage("PlayInterfaceSound", "player-collect-pickup")
  tOwnColor = 0
  tPlayerObjects = m_rGameEngine.GetObjectsByCode(3)
  repeat with tPlayer in tPlayerObjects
    if tPlayer.GetFactor().GetName() = getObject(#session).get("name") then
      tOwnColor = tPlayer.GetParam("Team")
      exit repeat
    end if
  end repeat
  t_iColor = m_rGameEngine.GetMGObject(i_iPlayerRef).GetParam("Team")
  if tOwnColor = t_iColor then
    m_rHauntedMansionEngine.activateDoorVortex(i_iDoorRef, t_iColor)
  end if
  m_rGameEngine.GetMGObject(i_iPlayerRef).GetFactor().setFoundExit(1)
  executeMessage("StopRoomSound")
  executeMessage("LoadRoomSound", "hmg_doorraceend_")
end
on AdvantageTimeEnds me, i_iWinnerTeam
  if m_bDebugOut then
    put "[HMDBG] Door Race Advantage Time Ends"
  end if
  m_rHauntedMansionInterface.ShowWindow("Notice", "fight")
  tPlayerObjects = m_rGameEngine.GetObjectsByCode(3)
  repeat with tPlayer in tPlayerObjects
    if not (tPlayer.GetParam("Team") = i_iWinnerTeam) then
      tPlayer.GetVisual().undelayed()
    end if
  end repeat
end
on SwingDoor me, i_iDoorRef
  if m_bDebugOut then
    put "[HMDBG] Swing Door" && i_iDoorRef
  end if
  executeMessage("PlayInterfaceSound", "doors-open")
  m_rHauntedMansionEngine.SwingDoor(i_iDoorRef)
end
on ToggleVisible me, i_iPlayer, i_iVisibility
  if m_bDebugOut then
    put "[HMDBG] Toggle Visibility" && i_iVisibility
  end if
  m_rGameEngine.GetMGObject(i_iPlayer).GetFactor().ToggleVisibility(i_iVisibility)
  m_rHauntedMansionInterface.HideIdleKickWarning()
end
on PlayerLeftGame me, i_iPlayer, i_iVisibility
  if m_bDebugOut then
    put "[HMDBG] Player Left Game" && i_iPlayer
  end if
  m_rGameEngine.GetMGObject(i_iPlayer).GetFactor().PlayerLeftGame(i_iVisibility)
end
on StartDoorRaceAdvantage me, i_iWinnerTeam, i_iSeconds
  tPlayerObjects = m_rGameEngine.GetObjectsByCode(3)
  repeat with tPlayer in tPlayerObjects
    if not (tPlayer.GetParam("Team") = i_iWinnerTeam) then
      tPlayer.GetVisual().delayed()
    end if
  end repeat
end