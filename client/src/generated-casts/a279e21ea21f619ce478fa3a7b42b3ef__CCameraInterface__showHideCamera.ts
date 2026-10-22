// a279e21ea21f619ce478fa3a7b42b3ef.cct / CCameraInterface / showHideCamera

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showHideCamera(_me: LingoMe) {
  if (meProp(_me, "m_visible")) {
  callMethod("hideCamera", callMethod("getInterface", _me))
  } else {
  callMethod("showCamera", callMethod("getInterface", _me))
  callNamed("executeMessage", "close_Emoticons")
  callNamed("executeMessage", "close_Magic")
  callNamed("executeMessage", symbol("hide_roominfo"))
  }

  callMethod("RequestFilmAmount", callMethod("getHandler", _me))
  setMeProp(_me, "m_visible", (lingoTruthy(meProp(_me, "m_visible")) ? 0 : 1));
}

