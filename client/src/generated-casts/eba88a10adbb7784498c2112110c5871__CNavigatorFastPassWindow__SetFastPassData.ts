// eba88a10adbb7784498c2112110c5871.cct / CNavigatorFastPassWindow / SetFastPassData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetFastPassData(_me: LingoMe, a_mp_FastPassData: LingoValue) {
  if (callNamed("listp", a_mp_FastPassData)) {
  setMeProp(_me, "m_mp_FastPassData", a_mp_FastPassData);
  var t_rWndObj = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  var t_iPos = a_mp_FastPassData.queuePos;
  var t_sName = a_mp_FastPassData.spaceName;
  callMethod("setText", callMethod("getElement", t_rWndObj, "fastpass.queue"), lingoBinary("add", t_iPos, 1))
  callMethod("setText", callMethod("getElement", t_rWndObj, "roomqueue.destination"), t_sName)
  }

}

