// minigame_lobby.cct / CGameContainer / SetParameter

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetParameter(_me: LingoMe, i_ID: LingoValue, i_value: LingoValue, i_sDescription: LingoValue) {
  var tEntry = callMethod("getaProp", meProp(_me, "m_mp_parameters"), i_ID);
  if (callNamed("voidp", i_sDescription)) {
  var tOldDescription = "";
  if ((lingoTruthy(callNamed("voidp", tEntry)) ? 0 : 1)) {
  tOldDescription = tEntry.description;
  }

  tEntry = new LingoPropList([symbol("value"), i_value, symbol("description"), tOldDescription]);
  } else {
  tEntry = new LingoPropList([symbol("value"), i_value, symbol("description"), i_sDescription]);
  }

  callMethod("setaProp", meProp(_me, "m_mp_parameters"), i_ID, tEntry)
}

