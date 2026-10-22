// vmk_monorail_musicmix_handler.cct / CMusicPlayerPopup / hide

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function hide(_me: LingoMe) {
  if (lingoBinary("neq", callNamed("getWindow", meProp(_me, "m_sWindowTitle")), 0)) {
  callNamed("removeWindow", meProp(_me, "m_sWindowTitle"))
  }

  setMeProp(_me, "m_bVisible", 0);
}

