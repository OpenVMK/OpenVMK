// vmk_steamboat_handler.cct / CSteamBoatInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  callNamed("registerMessage", symbol("room_ready"), callMethod("getID", _me), symbol("initRoom"))
  setMeProp(_me, "m_rVisualScreen", undefined);
  setMeProp(_me, "m_rVisualLights", undefined);
  setMeProp(_me, "m_sMemname", "projection");
  return 1;
}

