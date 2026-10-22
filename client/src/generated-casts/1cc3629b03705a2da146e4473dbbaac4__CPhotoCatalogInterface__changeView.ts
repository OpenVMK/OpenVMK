// 1cc3629b03705a2da146e4473dbbaac4.cct / CPhotoCatalogInterface / changeView

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function changeView(_me: LingoMe, a_type: LingoValue) {
  if (lingoBinary("and", lingoBinary("neq", a_type, symbol("thumbs")), lingoBinary("neq", a_type, symbol("Full")))) {
  return callNamed("error", _me, "Invalid View type", symbol("changeView"));
  }

  if (lingoBinary("neq", meProp(_me, "m_view"), a_type)) {
  setMeProp(_me, "m_view", a_type);
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  if (meProp(_me, "m_bMerged")) {
  callMethod("unmerge", tWndObj)
  if (lingoBinary("neq", meProp(_me, "m_pCannedField"), 0)) {
  callNamed("removeCannedField", meProp(_me, "m_sWindowTitle"), "camera.caption.input")
  setMeProp(_me, "m_pCannedField", 0);
  }

  }

  callMethod("mergeClientRect", _me, tWndObj)
  }

  callMethod("reDraw", _me)
}

