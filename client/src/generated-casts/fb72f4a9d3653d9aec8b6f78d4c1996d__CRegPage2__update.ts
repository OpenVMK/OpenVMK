// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegPage2 / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue, a_mp_kType_mp_iRef_rItem: LingoValue, a_kAlteredCategory: LingoValue) {
  setMeProp(_me, "m_ar_AvatarData", a_mp_kType_mp_iRef_rItem);
  switch (a_kAlteredCategory) {
case "AvatarCreated":
  setMeProp(_me, "m_bDataGathered", 1);
  break;
case "AvatarNames":
  callMethod("_SuggestNames", _this)
  break;
  }

}

