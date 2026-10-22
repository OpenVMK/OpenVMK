// minigame_lobby.cct / CGameContainer / GetParameterList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetParameterList(_me: LingoMe) {
  var tOut = new LingoPropList([]);
  for (var i = 1; i <= meProp(_me, "m_mp_parameters").count; ++i) {
  var tID = callMethod("getPropAt", meProp(_me, "m_mp_parameters"), i);
  var tEntry = callMethod("getaProp", meProp(_me, "m_mp_parameters"), tID);
  callMethod("setaProp", tOut, tID, tEntry.description)
  }

  return tOut;
}

