// vmk_casual_checkers.cct / CCheckersGameList / GetSelectedGame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetSelectedGame(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rComponent"))) {
  var t_iIndex = callMethod("GetActiveComponentID", meProp(_me, "m_rComponent"));
  var t_ar_rGames = callMethod("GetGameList", _this);
  if (lingoBinary("and", lingoBinary("gt", t_iIndex, 0), lingoBinary("lte", t_iIndex, t_ar_rGames.count))) {
  return t_ar_rGames[t_iIndex];
  }

  }

  return new LingoPropList([symbol("players"), new LingoList([]), symbol("instance"), -float(1)]);
}

