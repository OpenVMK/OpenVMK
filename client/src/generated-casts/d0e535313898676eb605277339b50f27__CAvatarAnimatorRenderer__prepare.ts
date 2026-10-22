// d0e535313898676eb605277339b50f27.cct / CAvatarAnimatorRenderer / prepare

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function prepare(_me: LingoMe) {
  setMeProp(_me, "m_iPulseCounter", lingoBinary("add", meProp(_me, "m_iPulseCounter"), 1));
  if (lingoBinary("eq", meProp(_me, "m_iPulseCounter"), 2)) {
  setMeProp(_me, "m_iAnimCounter", lingoBinary("mod", lingoBinary("add", meProp(_me, "m_iAnimCounter"), 1), 4));
  setMeProp(_me, "m_iPulseCounter", 0);
  }

  if (meProp(_me, "m_bActCrr")) {
  setMeProp(_me, "m_bChanges", 1);
  }

  if (meProp(_me, "m_bActEat")) {
  setMeProp(_me, "m_bChanges", 1);
  }

  if (meProp(_me, "m_bActMv")) {
  setMeProp(_me, "m_bChanges", 1);
  }

  if (meProp(_me, "m_bActWav")) {
  callNamed("call", symbol("doHandWorkRight"), meProp(_me, "m_mpSortedParts"), "wav")
  setMeProp(_me, "m_bChanges", 1);
  }

  if (meProp(_me, "m_bActDnc")) {
  setMeProp(_me, "m_bAnimating", 1);
  setMeProp(_me, "m_bChanges", 1);
  }

  if (callNamed("objectp", meProp(_me, "m_Obj_Magic"))) {
  setMeProp(_me, "m_bChanges", 1);
  }

  if (meProp(_me, "m_bEyesClosed")) {
  callMethod("openEyes", _me)
  } else {
  if (lingoBinary("eq", callNamed("random", 60), 3)) {
  callMethod("closeEyes", _me)
  }

  }

  if (lingoBinary("and", meProp(_me, "m_bActTlk"), lingoBinary("gt", callNamed("random", 3), 1))) {
  if (lingoBinary("eq", meProp(_me, "m_iMagic"), 16)) {
  callMethod("SetPushTheTrashcanAction", meProp(_me, "m_Obj_Magic"), "spk")
  return;
  }

  callNamed("call", symbol("defineActMultiple"), meProp(_me, "m_mpSortedParts"), "spk", new LingoList(["fc"]))
  setMeProp(_me, "m_bChanges", 1);
  }

}

