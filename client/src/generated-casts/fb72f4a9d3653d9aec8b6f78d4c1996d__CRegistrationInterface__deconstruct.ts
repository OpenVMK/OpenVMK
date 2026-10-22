// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegistrationInterface / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rCurPageObj"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rCurPageObj")))
  setMeProp(_me, "m_rCurPageObj", undefined);
  }

  if (callNamed("windowExists", "NameRejected")) {
  callNamed("removeWindow", "NameRejected")
  }

  setMeProp(_me, "m_obj_NameRejectionWindow", undefined);
  setMeProp(_me, "m_rWindow", undefined);
  return 1;
}

