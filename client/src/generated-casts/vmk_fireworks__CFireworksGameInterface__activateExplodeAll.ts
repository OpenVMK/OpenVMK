// vmk_fireworks.cct / CFireworksGameInterface / activateExplodeAll

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function activateExplodeAll(_me: LingoMe, a_bDeActivate: LingoValue) {
  setMeProp(_me, "m_bExplodeAllActive", (lingoTruthy(a_bDeActivate) ? 0 : 1));
  if (callNamed("timeoutExists", "ExplodeAllTimeout")) {
  callNamed("removeTimeout", "ExplodeAllTimeout")
  }

  var tElemID = "fw.explode.button";
  if (callNamed("objectp", meProp(_me, "m_fireWorkSelector"))) {
  if (callNamed("objectp", callMethod("getElement", meProp(_me, "m_fireWorkSelector"), tElemID))) {
  if (a_bDeActivate) {
  callMethod("deactivate", callMethod("getElement", meProp(_me, "m_fireWorkSelector"), tElemID))
  } else {
  callMethod("Activate", callMethod("getElement", meProp(_me, "m_fireWorkSelector"), tElemID))
  }

  }

  }

}

