// d0e535313898676eb605277339b50f27.cct / CAvatarFactor / SetAvatarRenderer

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetAvatarRenderer(_me: LingoMe) {
  switch (1) {
case meProp(_me, "m_bAnimating"):
  if (lingoBinary("neq", meProp(_me, "m_sRenderer"), "animator")) {
  setMeProp(_me, "m_ObjRenderer", callNamed("createObject", symbol("temp"), "CAvatarAnimatorRenderer"));
  setMeProp(_me, "m_sRenderer", "animator");
  if (callNamed("objectp", meProp(_me, "m_ObjRenderer"))) {
  callNamed("call", symbol("SetAncestor"), meProp(_me, "m_mp_PartList"), meProp(_me, "m_ObjRenderer"))
  callMethod("Define", meProp(_me, "m_ObjRenderer"), meProp(_me, "m_mp_AvatarData"))
  }

  }

  break;
case lingoBinary("and", meProp(_me, "m_bMinigameRunning"), lingoBinary("eq", meProp(_me, "m_sMiniGameRunning"), "hauntedmansion")):
  if (lingoBinary("neq", meProp(_me, "m_sRenderer"), "HmGame")) {
  setMeProp(_me, "m_ObjRenderer", callNamed("createObject", symbol("temp"), "CAvatarClassHauntedMansion"));
  setMeProp(_me, "m_sRenderer", "HmGame");
  if (callNamed("objectp", meProp(_me, "m_ObjRenderer"))) {
  callNamed("call", symbol("SetAncestor"), meProp(_me, "m_mp_PartList"), meProp(_me, "m_ObjRenderer"))
  callMethod("Define", meProp(_me, "m_ObjRenderer"), meProp(_me, "m_mp_AvatarData"))
  }

  }

  return;
case (lingoTruthy(meProp(_me, "m_bNeededClothesLoaded")) ? 0 : 1):
  if (lingoBinary("neq", meProp(_me, "m_sRenderer"), "Loader")) {
  setMeProp(_me, "m_ObjRenderer", callNamed("createObject", symbol("temp"), "CLoaderAvatarRender"));
  setMeProp(_me, "m_sRenderer", "Loader");
  var t_mp_PartList = new LingoPropList([]);
  var t_ar_Parts = new LingoList(["ht", "hd", "hr", "fc", "ey"]);
  for (var i = 1; i <= t_ar_Parts.count; ++i) {
  var t_sPrt = t_ar_Parts[i];
  callMethod("addProp", t_mp_PartList, t_sPrt, meProp(_me, "m_mp_PartList")[t_sPrt])
  }

  if (callNamed("objectp", meProp(_me, "m_ObjRenderer"))) {
  callNamed("call", symbol("SetAncestor"), t_mp_PartList, meProp(_me, "m_ObjRenderer"))
  callMethod("Define", meProp(_me, "m_ObjRenderer"), meProp(_me, "m_mp_AvatarData"))
  }

  callMethod("render", meProp(_me, "m_ObjRenderer"))
  }

  return;
  default:
  if (lingoBinary("and", lingoBinary("eq", meProp(_me, "m_iCurrentMagic"), 20), meProp(_me, "m_bNeededClothesLoaded"))) {
  if (lingoBinary("neq", meProp(_me, "m_sRenderer"), "Swim")) {
  setMeProp(_me, "m_ObjRenderer", callNamed("createObject", symbol("temp"), "CSwimmerAvatarRender"));
  setMeProp(_me, "m_sRenderer", "Swim");
  t_mp_PartList = new LingoPropList([]);
  t_ar_Parts = new LingoList(["ht", "hd", "hr", "fc", "ey"]);
  for (var i = 1; i <= t_ar_Parts.count; ++i) {
  t_sPrt = t_ar_Parts[i];
  callMethod("addProp", t_mp_PartList, t_sPrt, meProp(_me, "m_mp_PartList")[t_sPrt])
  }

  if (callNamed("objectp", meProp(_me, "m_ObjRenderer"))) {
  callNamed("call", symbol("SetAncestor"), t_mp_PartList, meProp(_me, "m_ObjRenderer"))
  callMethod("Define", meProp(_me, "m_ObjRenderer"), meProp(_me, "m_mp_AvatarData"))
  }

  }

  return;
  }

  if (lingoBinary("neq", meProp(_me, "m_sRenderer"), "rooms")) {
  setMeProp(_me, "m_ObjRenderer", callNamed("createObject", symbol("temp"), "CAvatarRenderer"));
  setMeProp(_me, "m_sRenderer", "rooms");
  if (callNamed("objectp", meProp(_me, "m_ObjRenderer"))) {
  callNamed("call", symbol("SetAncestor"), meProp(_me, "m_mp_PartList"), meProp(_me, "m_ObjRenderer"))
  callMethod("Define", meProp(_me, "m_ObjRenderer"), meProp(_me, "m_mp_AvatarData"))
  }

  }

  }

  if (lingoBinary("and", lingoBinary("and", callNamed("objectp", meProp(_me, "m_ObjRenderer")), lingoBinary("eq", meProp(_me, "m_sRenderer"), "rooms")), meProp(_me, "m_bAvatarReseted"))) {
  setMeProp(_me, "m_iResetCounter", lingoBinary("add", meProp(_me, "m_iResetCounter"), 1));
  setMeProp(_me, "m_sRenderer", undefined);
  if (lingoBinary("eq", meProp(_me, "m_iResetCounter"), 3)) {
  setMeProp(_me, "m_bAvatarReseted", 0);
  setMeProp(_me, "m_iResetCounter", 0);
  }

  }

}

