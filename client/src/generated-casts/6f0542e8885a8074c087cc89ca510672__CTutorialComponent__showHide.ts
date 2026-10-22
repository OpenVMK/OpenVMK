// 6f0542e8885a8074c087cc89ca510672.cct / CTutorialComponent / showHide

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showHide(_me: LingoMe) {
  if (meProp(_me, "m_visible")) {
  callMethod("hide", callMethod("getInterface", _me))
  } else {
  callMethod("show", callMethod("getInterface", _me))
  }

  setMeProp(_me, "m_visible", (lingoTruthy(meProp(_me, "m_visible")) ? 0 : 1));
}

