// d0e535313898676eb605277339b50f27.cct / CAvatarClassHauntedMansion / prepare

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function prepare(_me: LingoMe) {
  setMeProp(_me, "m_iAnimCounter", lingoBinary("mod", lingoBinary("add", meProp(_me, "m_iAnimCounter"), 1), 4));
  if (meProp(_me, "m_bEyesClosed")) {
  callMethod("openEyes", _me)
  } else {
  if (lingoBinary("eq", callNamed("random", 60), 3)) {
  callMethod("closeEyes", _me)
  }

  }

  if (lingoBinary("and", meProp(_me, "m_bActTlk"), lingoBinary("gt", callNamed("random", 3), 1))) {
  callNamed("call", symbol("defineActMultiple"), meProp(_me, "m_mpSortedParts"), "spk", new LingoList(["fc"]))
  setMeProp(_me, "m_bChanges", 1);
  }

  if (meProp(_me, "m_bActMv")) {
  setMeProp(_me, "m_bChanges", 1);
  }

  if (meProp(_me, "m_bActRtl")) {
  callNamed("call", symbol("doHandWork"), meProp(_me, "m_mpSortedParts"), "rtl", new LingoList(["ch"]))
  setMeProp(_me, "m_bChanges", 1);
  }

  if (meProp(_me, "m_bActCth")) {
  callNamed("call", symbol("doHandWork"), meProp(_me, "m_mpSortedParts"), "cth", new LingoList(["ch"]))
  setMeProp(_me, "m_bChanges", 1);
  }

}

