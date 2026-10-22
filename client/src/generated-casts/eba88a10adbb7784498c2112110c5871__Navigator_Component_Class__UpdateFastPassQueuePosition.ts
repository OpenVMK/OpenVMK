// eba88a10adbb7784498c2112110c5871.cct / Navigator Component Class / UpdateFastPassQueuePosition

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateFastPassQueuePosition(_me: LingoMe, a_iPos: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_obj_FastPassWindow"))) {
  callMethod("UpdateQueuePosition", meProp(_me, "m_obj_FastPassWindow"), a_iPos)
  }

}

