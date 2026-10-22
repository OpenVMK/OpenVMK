// item_2355.cct / CCheckersLobbyInterface / GetGameList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetGameList(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rGameList"))) {
  return callMethod("GetGameList", meProp(_me, "m_rGameList"));
  } else {
  return new LingoList([]);
  }

}

