// 239fb1d2675fc448140198b03238814c.cct / CLoadingWindow / eventProcLoadingWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eventProcLoadingWindow(_me: LingoMe, _this: LingoValue, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  if (lingoBinary("and", lingoBinary("eq", tElemID, "roomqueue.preloader.ok"), lingoBinary("eq", tEvent, symbol("mouseUp")))) {
  if (callNamed("objectp", meProp(_me, "m_objClient"))) {
  callNamed("call", symbol("LoadingWindowEvent"), new LingoList([meProp(_me, "m_objClient")]), meProp(_me, "m_sButtonText"))
  } else {
  callMethod("DeleteWindow", _this)
  }

  }

}

