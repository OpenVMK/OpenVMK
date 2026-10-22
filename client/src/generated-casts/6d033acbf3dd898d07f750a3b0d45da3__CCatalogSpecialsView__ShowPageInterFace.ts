// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogSpecialsView / ShowPageInterFace

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowPageInterFace(_me: LingoMe) {
  if (callNamed("objectp", meProp(_me, "m_rWndObj"))) {
  for (var t_sItemName of meProp(_me, "m_arHidableInterface").toArray()) {
  if (callMethod("elementExists", meProp(_me, "m_rWndObj"), t_sItemName)) {
  callMethod("show", callMethod("getElement", meProp(_me, "m_rWndObj"), t_sItemName))
  }

  }

  }

}

