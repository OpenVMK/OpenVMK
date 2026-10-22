// eba88a10adbb7784498c2112110c5871.cct / CNavigatorFastPassWindow / UpdateQueuePosition

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateQueuePosition(_me: LingoMe, a_iPos: LingoValue) {
  var t_rWndObj = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  callMethod("setText", callMethod("getElement", t_rWndObj, "fastpass.queue"), lingoBinary("add", a_iPos, 1))
  if (callNamed("listp", meProp(_me, "m_mp_FastPassData"))) {
  meProp(_me, "m_mp_FastPassData")[symbol("queuePos")] = a_iPos;
  }

  if (lingoBinary("eq", a_iPos, -float(1))) {
  callMethod("startFlashingTheButton", _me)
  }

}

