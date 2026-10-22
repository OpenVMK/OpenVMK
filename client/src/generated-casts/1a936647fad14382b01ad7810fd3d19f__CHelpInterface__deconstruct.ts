// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpInterface / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_windowTitle"));
  if (lingoBinary("neq", tWndObj, 0)) {
  callNamed("removeWindow", callMethod("getID", tWndObj))
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_pHelpMenu"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_pHelpMenu")))
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rHelpField"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rHelpField")))
  }

  return 1;
}

