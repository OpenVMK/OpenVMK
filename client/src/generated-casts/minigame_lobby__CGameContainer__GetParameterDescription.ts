// minigame_lobby.cct / CGameContainer / GetParameterDescription

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetParameterDescription(_me: LingoMe, i_ID: LingoValue) {
  var tEntry = callMethod("getaProp", meProp(_me, "m_mp_parameters"), i_ID);
  if ((lingoTruthy(callNamed("voidp", tEntry)) ? 0 : 1)) {
  return tEntry.description;
  } else {
  return undefined;
  }

}

