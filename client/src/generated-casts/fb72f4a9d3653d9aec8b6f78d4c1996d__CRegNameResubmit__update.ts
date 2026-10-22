// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegNameResubmit / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue, a_mp_kType_mp_iRef_rItem: LingoValue, a_kAlteredCategory: LingoValue) {
  var m_ar_AvatarData = a_mp_kType_mp_iRef_rItem;
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  switch (a_kAlteredCategory) {
case "GeneratedNames":
  callMethod("_PopulateNameList", _this, m_ar_AvatarData["GeneratedNames"])
  break;
  }

  }

}

