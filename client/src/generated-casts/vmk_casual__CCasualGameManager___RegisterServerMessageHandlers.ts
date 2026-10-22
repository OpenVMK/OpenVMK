// vmk_casual.cct / CCasualGameManager / _RegisterServerMessageHandlers

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _RegisterServerMessageHandlers(_me: LingoMe, _this: LingoValue, a_bBool: LingoValue) {
  var t_sConnection = callNamed("getVariable", "main.connection.id", "VMK");
  var t_rList = new LingoPropList([]);
  callMethod("setaProp", t_rList, 2950, symbol("_OnTurnBasedGameStart"))
  callMethod("setaProp", t_rList, 2951, symbol("_OnTurnBasedGameEnd"))
  callMethod("setaProp", t_rList, 2952, symbol("_OnTurnBasedGameEvent"))
  callMethod("setaProp", t_rList, 2953, symbol("_OnNextTurnMessage"))
  callMethod("setaProp", t_rList, 2954, symbol("_OnChallengeMessage"))
  callMethod("setaProp", t_rList, 2955, symbol("_OnChallengeSentMessage"))
  callMethod("setaProp", t_rList, 2956, symbol("_OnCurrentGamesList"))
  callMethod("setaProp", t_rList, 2957, symbol("_OnHighScoreList"))
  callMethod("setaProp", t_rList, 2958, symbol("_OnGameDetails"))
  callMethod("setaProp", t_rList, 2959, symbol("_OnPlayerDetails"))
  callMethod("setaProp", t_rList, 2960, symbol("_OnNextGameStarting"))
  callMethod("setaProp", t_rList, 2961, symbol("_OnNextGameCanceled"))
  if (a_bBool) {
  callNamed("registerListener", t_sConnection, callMethod("getID", _this), t_rList)
  } else {
  callNamed("unregisterListener", t_sConnection, callMethod("getID", _this), t_rList)
  }

  t_rList = new LingoPropList([]);
  callMethod("setaProp", t_rList, "TurnBasedGameAction", 950)
  callMethod("setaProp", t_rList, "AcceptChallengeMessage", 951)
  callMethod("setaProp", t_rList, "PlayNow", 952)
  callMethod("setaProp", t_rList, "GetOngoingGames", 953)
  callMethod("setaProp", t_rList, "GetHighScores", 954)
  callMethod("setaProp", t_rList, "GoWatchGame", 955)
  callMethod("setaProp", t_rList, "GetGameDetails", 956)
  callMethod("setaProp", t_rList, "GetPlayerDetails", 957)
  if (a_bBool) {
  callNamed("registerCommands", t_sConnection, callMethod("getID", _this), t_rList)
  } else {
  callNamed("unregisterCommands", t_sConnection, callMethod("getID", _this), t_rList)
  }

  return 1;
}

