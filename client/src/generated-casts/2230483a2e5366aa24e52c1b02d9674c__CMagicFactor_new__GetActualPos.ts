// 2230483a2e5366aa24e52c1b02d9674c.cct / CMagicFactor_new / GetActualPos

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetActualPos(_me: LingoMe, _this: LingoValue) {
  /* global */ var pTemp = globalVar("pTemp");
  var t_rCon = callMethod("_AccessRoom", callNamed("getThread", symbol("room")).component);
  if ((lingoTruthy(callNamed("voidp", t_rCon)) ? 0 : 1)) {
  var t_rAvatar = callNamed("_AccessIndexed", t_rCon, _this.m_iMyRef, "avatar");
  if (callNamed("voidp", t_rAvatar)) {
  callNamed("error", _this, lingoBinary("join", "Avatar not found:", _this.m_iMyRef), symbol("_Magic"))
  }

  var t_veLoc = callNamed("GetScrPos", t_rAvatar);
  }

  if (lingoBinary("or", lingoBinary("eq", _this.m_iMagicFx, 17), lingoBinary("gt", _this.m_iMagicFx, 99))) {
  callNamed("UpdateFuelMeter", _this)
  }

  if ((lingoTruthy(callNamed("voidp", t_veLoc)) ? 0 : 1)) {
  setThePropOf(_this, "m_veAvatarLoc", t_veLoc);
  return callNamed("SetMagicLocation", _this);
  }

}

