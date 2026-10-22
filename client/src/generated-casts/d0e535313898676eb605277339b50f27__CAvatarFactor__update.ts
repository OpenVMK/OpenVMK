// d0e535313898676eb605277339b50f27.cct / CAvatarFactor / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, a_rSpr: LingoValue) {
  if (callNamed("voidp", a_rSpr)) {
  return;
  }

  if (callNamed("voidp", a_rSpr.member)) {
  return;
  }

  if (lingoBinary("eq", a_rSpr.member.name, "")) {
  return;
  }

  setMeProp(_me, "m_rAvatarSpr", a_rSpr);
  var t_LocH = a_rSpr.locH;
  var t_LocV = a_rSpr.locV;
  var t_LocZ = a_rSpr.locZ;
  setMeProp(_me, "m_veAvatarLoc", callNamed("vector", t_LocH, t_LocV, t_LocZ));
  if ((lingoTruthy(meProp(_me, "m_bNeededClothesLoaded")) ? 0 : 1)) {
  callMethod("CheckClothesLoaded", _me)
  }

  if (callNamed("objectp", meProp(_me, "m_ObjRenderer"))) {
  callMethod("update", meProp(_me, "m_ObjRenderer"), meProp(_me, "m_veAvatarLoc"), meProp(_me, "m_rAvatarSpr"))
  }

}

