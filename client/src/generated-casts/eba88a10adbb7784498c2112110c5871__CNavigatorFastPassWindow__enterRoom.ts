// eba88a10adbb7784498c2112110c5871.cct / CNavigatorFastPassWindow / enterRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function enterRoom(_me: LingoMe) {
  if (callNamed("listp", meProp(_me, "m_mp_FastPassData"))) {
  var t_iSpaceID = meProp(_me, "m_mp_FastPassData").spaceid;
  var t_iInstanceId = meProp(_me, "m_mp_FastPassData").instanceID;
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 31, new LingoPropList([symbol("integer"), t_iSpaceID, symbol("integer"), t_iInstanceId]))
  }

}

