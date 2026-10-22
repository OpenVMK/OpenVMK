// vmk_hm_minigame.cct / CHMMGHandler / OnEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function OnEvent(_me: LingoMe, i_iEvent: LingoValue, i_ar_iData: LingoValue) {
  switch (i_iEvent) {
case 1:
  callMethod("CoffinRattles", _me, i_ar_iData[1], i_ar_iData[2])
  break;
case 2:
  callMethod("CreateGhost", _me, i_ar_iData[1], i_ar_iData[2], i_ar_iData[3], i_ar_iData[4], i_ar_iData[5])
  break;
case 3:
  callMethod("CreateSuperGhost", _me, i_ar_iData[1], i_ar_iData[2], i_ar_iData[3], i_ar_iData[4], i_ar_iData[5])
  break;
case 4:
  callMethod("PlayerToGhost", _me, i_ar_iData[1])
  break;
case 5:
  callMethod("PlayerGhostToPlayer", _me, i_ar_iData[1])
  break;
case 6:
  callMethod("GhostCaught", _me, i_ar_iData[1], i_ar_iData[2])
  break;
case 7:
  callMethod("SuperGhostCatchPlayer", _me, i_ar_iData[1])
  break;
case 8:
  callMethod("MoveGhost", _me, i_ar_iData[1], i_ar_iData[2], i_ar_iData[3], i_ar_iData[4], i_ar_iData[5], i_ar_iData[6])
  break;
case 9:
  callMethod("CreatePickup", _me, i_ar_iData[1], i_ar_iData[2], i_ar_iData[3])
  break;
case 10:
  callMethod("RemoveGhost", _me, i_ar_iData[1])
  break;
case 11:
  callMethod("PlayerCollectPickup", _me, i_ar_iData[1])
  break;
case 12:
  callMethod("CoffinTrembles", _me, i_ar_iData[1])
  break;
case 13:
  callMethod("PlayerCatchesGhostlyPlayer", _me, i_ar_iData[1], i_ar_iData[2], i_ar_iData[3])
  break;
case 14:
  callMethod("GameEndingTimer", _me, i_ar_iData[1])
  break;
case 15:
  callMethod("IdleTimerWarning", _me, i_ar_iData[1], i_ar_iData[2])
  break;
case 16:
  callMethod("StartDoorRace", _me)
  break;
case 17:
  callMethod("StartSuddenDeath", _me)
  break;
case 18:
  callMethod("CorrectExit", _me, i_ar_iData[1], i_ar_iData[2])
  break;
case 19:
  callMethod("AdvantageTimeEnds", _me, i_ar_iData[1])
  break;
case 20:
  callMethod("SwingDoor", _me, i_ar_iData[1])
  break;
case 21:
  callMethod("ToggleVisible", _me, i_ar_iData[1], i_ar_iData[2])
  break;
case 22:
  callMethod("PlayerLeftGame", _me, i_ar_iData[1])
  break;
case 23:
  callMethod("StartDoorRaceAdvantage", _me, i_ar_iData[1], i_ar_iData[2])
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "CHMMGHandler.MISSING handler: implmement event-id:", i_iEvent))
  }

}

