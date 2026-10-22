// vmk_fireworks_preshow_handler.cct / CFWPSInterface / dropasec

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dropasec(_me: LingoMe) {
  setMeProp(_me, "m_iTimeLeft", lingoBinary("sub", meProp(_me, "m_iTimeLeft"), 1));
  if (lingoBinary("lt", meProp(_me, "m_iTimeLeft"), 0)) {
  setMeProp(_me, "m_iTimeLeft", 0);
  }

}

