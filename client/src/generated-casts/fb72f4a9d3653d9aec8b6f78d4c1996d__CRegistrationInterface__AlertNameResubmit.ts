// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegistrationInterface / AlertNameResubmit

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AlertNameResubmit(_me: LingoMe, _this: LingoValue, a_sName: LingoValue) {
  if (callNamed("voidp", meProp(_me, "m_obj_NameRejectionWindow"))) {
  setMeProp(_me, "m_obj_NameRejectionWindow", callNamed("createObject", "NameRejection", "CRegNameResubmit"));
  callMethod("SetResubmitReason", meProp(_me, "m_obj_NameRejectionWindow"), "resubmit", a_sName)
  }

}

