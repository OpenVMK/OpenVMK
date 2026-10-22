// vmk_steamboat_handler.cct / CSteamBoatInterface / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("unregisterMessage", symbol("room_ready"), callMethod("getID", _me))
  setMeProp(_me, "m_rVisualScreen", undefined);
  setMeProp(_me, "m_rVisualLights", undefined);
  if (callNamed("memberExists", meProp(_me, "m_sMemname"))) {
  callNamed("removeMember", meProp(_me, "m_sMemname"))
  }

  return 1;
}

