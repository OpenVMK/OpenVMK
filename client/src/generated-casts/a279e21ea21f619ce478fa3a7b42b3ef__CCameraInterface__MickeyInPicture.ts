// a279e21ea21f619ce478fa3a7b42b3ef.cct / CCameraInterface / MickeyInPicture

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function MickeyInPicture(_me: LingoMe, a_bState: LingoValue) {
  if ((lingoTruthy(a_bState) ? 0 : 1)) {
  setMeProp(_me, "m_view", symbol("pictitle"));
  callMethod("showCamera", _me)
  callMethod("storePicture", callMethod("getComponent", _me), "")
  callMethod("setText", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sPicTitleWindowName")), "camera.caption.input"), "")
  } else {
  setMeProp(_me, "m_view", symbol("mickeyfound"));
  callMethod("showCamera", _me)
  }

}

