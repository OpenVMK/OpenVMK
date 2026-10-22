// vmk_pirates2_game_preshow_handler.cct / CPPSInterface / findGameByID

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function findGameByID(_me: LingoMe, a_iID: LingoValue) {
  var tGames = callMethod("GetGameList", meProp(_me, "m_rLobby"));
  for (var i = 1; i <= tGames.count; ++i) {
  if (lingoBinary("eq", callMethod("getPropAt", tGames, i), a_iID)) {
  return i;
  }

  }

  return 0;
}

