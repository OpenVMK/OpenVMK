// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogItemListing / GetCurrentLand

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetCurrentLand(_me: LingoMe, a_Pnt: LingoValue) {
  if (callNamed("voidp", meProp(_me, "m_sCurrentLand"))) {
  var t_Obj = meProp(_me, "m_mp_List")[1]._object;
  if (callNamed("objectp", t_Obj)) {
  setMeProp(_me, "m_sCurrentLand", callMethod("getLand", t_Obj));
  }

  }

  return meProp(_me, "m_sCurrentLand");
}

