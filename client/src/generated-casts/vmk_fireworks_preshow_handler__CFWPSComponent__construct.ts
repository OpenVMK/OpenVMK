// vmk_fireworks_preshow_handler.cct / CFWPSComponent / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_particleSystem", undefined);
  setMeProp(_me, "m_disabled", 0);
  callNamed("registerMessage", symbol("room_ready"), callMethod("getID", _me), symbol("initEngine"))
  return 1;
}

