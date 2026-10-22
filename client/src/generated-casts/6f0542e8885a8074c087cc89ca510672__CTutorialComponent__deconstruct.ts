// 6f0542e8885a8074c087cc89ca510672.cct / CTutorialComponent / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("unregisterMessage", symbol("ui_tutorial"), callMethod("getID", _me))
  callNamed("unregisterMessage", symbol("get_tutorials_state"), callMethod("getID", _me))
  callNamed("unregisterMessage", symbol("set_tutorials_state"), callMethod("getID", _me))
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_pTutorialsData"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_pTutorialsData")))
  }

  setMeProp(_me, "m_pTutorialsData", undefined);
  setMeProp(_me, "m_iNavCode", undefined);
}

