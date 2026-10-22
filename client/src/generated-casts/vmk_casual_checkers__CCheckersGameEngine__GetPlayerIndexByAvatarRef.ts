// vmk_casual_checkers.cct / CCheckersGameEngine / GetPlayerIndexByAvatarRef

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetPlayerIndexByAvatarRef(_me: LingoMe, _this: LingoValue, a_iAvatarRef: LingoValue) {
  var t_iCount = meProp(_me, "m_rPlayers").count;
  for (var i = 1; i <= t_iCount; ++i) {
  if (lingoBinary("eq", callMethod("getPropAt", meProp(_me, "m_rPlayers"), i), a_iAvatarRef)) {
  return meProp(_me, "m_rPlayers")[i].index;
  break;
  }

  }

  return 0;
}

