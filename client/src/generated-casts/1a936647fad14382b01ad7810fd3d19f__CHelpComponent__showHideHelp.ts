// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpComponent / showHideHelp

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showHideHelp(_me: LingoMe) {
  if (meProp(_me, "m_visible")) {
  callMethod("hideHelp", callMethod("getInterface", _me))
  } else {
  callMethod("showHelp", callMethod("getInterface", _me))
  }

  setMeProp(_me, "m_visible", (lingoTruthy(meProp(_me, "m_visible")) ? 0 : 1));
}

