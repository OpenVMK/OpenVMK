// vmk_casual.cct / CCasualGameModule / OnCreateGame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function OnCreateGame(_me: LingoMe, _this: LingoValue, a_iGameID: LingoValue, a_rMsg: LingoValue) {
  if (callNamed("voidp", callMethod("getaProp", meProp(_me, "m_mp_iRef_rEngine"), a_iGameID))) {
  var t_rInstance = callNamed("createObject", callNamed("getUniqueID"), meProp(_me, "m_ar_sEngineClass"));
  callMethod("setup", t_rInstance, a_iGameID, callMethod("_AccessRoom", callNamed("getThread", symbol("room")).component))
  callMethod("setaProp", meProp(_me, "m_mp_iRef_rEngine"), a_iGameID, t_rInstance)
  } else {
  callNamed("error", _this, lingoBinary("joinPad", lingoBinary("joinPad", "Game instance with given id", a_iGameID), "already exists!"), symbol("OnCreateGame"))
  }

}

