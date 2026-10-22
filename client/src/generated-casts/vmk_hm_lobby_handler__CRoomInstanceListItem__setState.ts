// vmk_hm_lobby_handler.cct / CRoomInstanceListItem / setState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setState(_me: LingoMe, a_bState: LingoValue) {
  if (callNamed("voidp", a_bState)) {
  setMeProp(_me, "m_bState", (lingoTruthy(meProp(_me, "m_bState")) ? 0 : 1));
  callMethod("ResolveImage", _me)
  callMethod("render", _me)
  } else {
  setMeProp(_me, "m_bState", a_bState);
  callMethod("ResolveImage", _me)
  callMethod("render", _me)
  }

  return 1;
}

