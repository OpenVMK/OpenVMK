// d0e535313898676eb605277339b50f27.cct / CAvatarFactor / ShowArrow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowArrow(_me: LingoMe) {
  if (lingoBinary("eq", meProp(_me, "m_iCurrentMagic"), 16)) {
  callNamed("executeMessage", "close_profile")
  return;
  }

  if (callNamed("objectp", meProp(_me, "m_ObjRenderer"))) {
  callMethod("ShowArrow", meProp(_me, "m_ObjRenderer"))
  }

}

