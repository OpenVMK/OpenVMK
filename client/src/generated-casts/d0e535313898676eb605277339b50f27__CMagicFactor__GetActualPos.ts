// d0e535313898676eb605277339b50f27.cct / CMagicFactor / GetActualPos

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetActualPos(_me: LingoMe, _this: LingoValue) {
  var t_rCon = callMethod("_AccessRoom", callNamed("getThread", symbol("room")).component);
  if ((lingoTruthy(callNamed("voidp", t_rCon)) ? 0 : 1)) {
  var t_rAvatar = callMethod("_AccessIndexed", t_rCon, meProp(_me, "m_iMyRef"), "avatar");
  if (callNamed("voidp", t_rAvatar)) {
  callNamed("error", _this, lingoBinary("joinPad", "Avatar not found:", meProp(_me, "m_iMyRef")), symbol("_Magic"))
  } else {
  var t_veLoc = callMethod("GetScrPos", t_rAvatar);
  }

  }

  if (lingoBinary("or", lingoBinary("gt", meProp(_me, "m_iMagicFx"), 99), lingoBinary("eq", meProp(_me, "m_iMagicFx"), 17))) {
  callMethod("UpdateFuelMeter", _this)
  }

  if ((lingoTruthy(callNamed("voidp", t_veLoc)) ? 0 : 1)) {
  setMeProp(_me, "m_veAvatarLoc", t_veLoc);
  return callMethod("SetMagicLocation", _this);
  }

}

