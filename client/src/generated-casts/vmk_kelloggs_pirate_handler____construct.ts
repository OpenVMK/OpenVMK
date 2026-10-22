// vmk_kelloggs_pirate_handler.cct /  / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_sKelloggsWindowTitle", "Kelloggs Treasure Window");
  callNamed("registerMessage", symbol("room_ready"), callMethod("getID", _me), symbol("initActiveItems"))
  setMeProp(_me, "m_ActiveItemSprites", new LingoList([]));
  return 1;
}

