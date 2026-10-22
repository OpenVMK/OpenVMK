// vmk_casual.cct / CCasualGameManager / _OnCurrentGamesList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _OnCurrentGamesList(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  if (_this.valid) {
  var t_ar_rGames = new LingoList([]);
  var t_iGameCode = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iCount = callMethod("GetIntFrom", a_rMsg.connection);
  for (var i = 1; i <= t_iCount; ++i) {
  var t_rGame = new LingoPropList([symbol("players"), new LingoList([]), symbol("instance"), callMethod("GetIntFrom", a_rMsg.connection)]);
  var t_iPlayers = callMethod("GetIntFrom", a_rMsg.connection);
  for (var j = 1; j <= t_iPlayers; ++j) {
  var t_sPlayer = callMethod("GetStrFrom", a_rMsg.connection);
  var t_iScore = callMethod("GetIntFrom", a_rMsg.connection);
  callMethod("add", t_rGame.players, new LingoPropList([symbol("name"), t_sPlayer, symbol("score"), t_iScore]))
  }

  callMethod("add", t_ar_rGames, t_rGame)
  }

  var t_rModule = callMethod("getaProp", meProp(_me, "m_mp_iCode_rModule"), t_iGameCode);
  if (callNamed("voidp", t_rModule)) {
  callNamed("error", _this, lingoBinary("joinPad", lingoBinary("joinPad", "Module for game type", t_iGameCode), "not found!"), symbol("_OnCurrentGamesList"))
  } else {
  var t_rInterface = callMethod("GetGameListInterface", t_rModule);
  if (callNamed("objectp", t_rInterface)) {
  callMethod("SetGameList", t_rInterface, t_ar_rGames)
  }

  }

  }

}

