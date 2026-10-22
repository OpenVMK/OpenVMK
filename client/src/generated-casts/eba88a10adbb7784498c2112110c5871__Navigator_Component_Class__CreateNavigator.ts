// eba88a10adbb7784498c2112110c5871.cct / Navigator Component Class / CreateNavigator

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateNavigator(_me: LingoMe, a_mp_Data: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", a_mp_Data.spaces)) ? 0 : 1)) {
  setMeProp(_me, "m_ar_NavSubs", a_mp_Data.spaces);
  }

  callMethod("NavigatorReady", callMethod("getInterface", _me))
}

